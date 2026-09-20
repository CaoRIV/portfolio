import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(scriptDir);
const vitePath = path.join(root, "node_modules", "vite", "bin", "vite.js");
const outDir = path.join(root, "test-results");
const url = "http://127.0.0.1:4173";
const viewports = [
  { width: 1440, height: 1000 },
  { width: 1024, height: 900 },
  { width: 390, height: 844 }
];
const revealSelectors = [
  ".hero-copy",
  ".system-panel",
  ".project-chapter",
  ".capabilities-intro",
  ".capability-row",
  ".credentials-intro",
  ".credential-row",
  ".method-intro",
  ".method-step",
  ".changelog-copy",
  ".changelog-row",
  ".contact-shell"
];
const layoutSelectors = [
  ".nav-shell",
  ".hero-copy",
  ".system-panel",
  ".project-copy",
  ".project-artifact",
  ".capability-row",
  ".credential-row",
  ".method-step",
  ".changelog-row",
  ".contact-shell",
  ".contact-form",
  ".site-footer"
];

function browserOptions() {
  for (const variable of ["PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH", "CHROME_PATH"]) {
    const executablePath = process.env[variable];
    if (executablePath) {
      if (!existsSync(executablePath)) {
        throw new Error(`${variable} points to a browser that does not exist: ${executablePath}`);
      }
      return [{ executablePath }];
    }
  }

  const candidates = process.platform === "win32"
    ? [
        path.join(process.env.PROGRAMFILES || "C:/Program Files", "Google/Chrome/Application/chrome.exe"),
        path.join(process.env["PROGRAMFILES(X86)"] || "C:/Program Files (x86)", "Google/Chrome/Application/chrome.exe"),
        path.join(process.env.LOCALAPPDATA || "C:/Users/Public/AppData/Local", "Google/Chrome/Application/chrome.exe"),
        path.join(process.env.PROGRAMFILES || "C:/Program Files", "Microsoft/Edge/Application/msedge.exe"),
        path.join(process.env["PROGRAMFILES(X86)"] || "C:/Program Files (x86)", "Microsoft/Edge/Application/msedge.exe")
      ]
    : process.platform === "darwin"
      ? [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
        ]
      : [
          "/usr/bin/google-chrome",
          "/usr/bin/google-chrome-stable",
          "/usr/bin/chromium",
          "/usr/bin/chromium-browser",
          "/usr/bin/microsoft-edge"
        ];
  return [...candidates.filter((candidate) => existsSync(candidate)).map((executablePath) => ({ executablePath })), {}];
}

async function launchBrowser() {
  const failures = [];
  for (const options of browserOptions()) {
    try {
      return await chromium.launch({ ...options, headless: true });
    } catch (error) {
      failures.push(`${options.executablePath || "Playwright-managed Chromium"}: ${error.message}`);
    }
  }
  throw new Error(
    `Could not launch Chromium. Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH or CHROME_PATH to a usable browser, or install a Playwright-managed Chromium browser. ${failures.join(" | ")}`
  );
}

async function waitForServer(server, getOutput) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Vite exited before startup. ${getOutput()}`);
    }
    if (getOutput().includes(url)) {
      try {
        if ((await fetch(url)).ok) return;
      } catch {
        // Vite has announced the URL but is not accepting requests yet.
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Vite did not respond at ${url}. ${getOutput()}`);
}

function watchConsole(page) {
  const problems = [];
  page.on("console", (message) => {
    if (["warning", "error"].includes(message.type())) {
      problems.push({ type: message.type(), text: message.text(), url: message.location().url });
    }
  });
  page.on("pageerror", (error) => problems.push({ type: "pageerror", text: error.message, url: "" }));
  return problems;
}

async function checkReveals(page, label) {
  let checked = 0;
  for (const selector of revealSelectors) {
    const targets = page.locator(selector);
    const count = await targets.count();
    assert.ok(count > 0, `${label}: missing reveal target ${selector}`);
    for (let index = 0; index < count; index += 1) {
      const target = targets.nth(index);
      await target.scrollIntoViewIfNeeded();
      const handle = await target.elementHandle();
      await page.waitForFunction(
        (node) => Number.parseFloat(getComputedStyle(node).opacity || "0") > 0.8,
        handle,
        { timeout: 6000 }
      );
      const visible = await target.evaluate((node) => {
        const box = node.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight;
      });
      assert.equal(visible, true, `${label}: ${selector}[${index}] did not become visible`);
      checked += 1;
    }
  }
  return checked;
}

async function checkStructure(page, label) {
  const expected = {
    "main h1": 1,
    ".project-chapter": 4,
    ".project-artifact": 4,
    ".capability-row": 4,
    ".credential-row": 2,
    ".method-step": 4,
    ".changelog-row": 3,
    "#contact form": 1
  };
  for (const [selector, count] of Object.entries(expected)) {
    assert.equal(await page.locator(selector).count(), count, `${label}: ${selector} count`);
  }
  for (const id of ["work", "capabilities", "credentials", "changelog", "contact"]) {
    assert.equal(await page.locator(`#${id}`).count(), 1, `${label}: missing #${id} target`);
    assert.equal(await page.locator(`.nav-links a[href="#${id}"]`).count(), 1, `${label}: missing #${id} navigation link`);
  }
}

async function checkLayout(page, label) {
  const metrics = await page.evaluate((selectors) => {
    const boxes = selectors.flatMap((selector) => {
      const nodes = Array.from(document.querySelectorAll(selector));
      return nodes.map((node, index) => {
        const box = node.getBoundingClientRect();
        return { selector: `${selector}[${index}]`, width: box.width, height: box.height, left: box.left, right: box.right };
      });
    });
    return {
      innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      boxes
    };
  }, layoutSelectors);

  assert.ok(metrics.documentWidth <= metrics.innerWidth + 2, `${label}: document horizontal overflow ${JSON.stringify(metrics)}`);
  assert.ok(metrics.bodyWidth <= metrics.innerWidth + 2, `${label}: body horizontal overflow ${JSON.stringify(metrics)}`);
  for (const selector of layoutSelectors) {
    assert.ok(metrics.boxes.some((box) => box.selector.startsWith(`${selector}[`)), `${label}: missing layout target ${selector}`);
  }
  const badBoxes = metrics.boxes.filter((box) =>
    box.width <= 0 || box.height <= 0 || box.left < -2 || box.right > metrics.innerWidth + 2
  );
  assert.deepEqual(badBoxes, [], `${label}: out-of-viewport boxes`);
}

async function checkHeroMotion(page, label, reduced) {
  const node = page.locator(".system-node-a");
  const first = await node.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(600);
  const second = await node.evaluate((element) => getComputedStyle(element).transform);
  if (reduced) assert.equal(second, first, `${label}: hero node moved with reduced motion`);
  else assert.notEqual(second, first, `${label}: hero node did not move`);
}

async function checkProjectLinks(page, label) {
  const links = await page.locator(".project-chapter .text-link").evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("href"))
  );
  assert.equal(links.length, 4, `${label}: project link count`);
  assert.equal(new Set(links).size, 4, `${label}: duplicate project destinations`);
  for (const href of links) {
    const destination = new URL(href);
    assert.equal(destination.protocol, "https:", `${label}: project link must use HTTPS`);
    assert.equal(destination.hostname, "github.com", `${label}: project link must go to GitHub`);
    assert.ok(destination.pathname.split("/").filter(Boolean).length >= 2, `${label}: project link must identify a repository`);
  }
}

async function checkCredentialLinks(page, label) {
  const links = page.locator(".credential-row");
  assert.equal(await links.count(), 2, label + ": credential link count");
  const destinations = [];
  for (let index = 0; index < await links.count(); index += 1) {
    const link = links.nth(index);
    const href = await link.getAttribute("href");
    const destination = new URL(href);
    destinations.push(destination.href);
    assert.equal(destination.protocol, "https:", label + ": credential link must use HTTPS");
    assert.equal(destination.hostname, "www.coursera.org", label + ": credential link must go to Coursera");
    assert.match(destination.pathname, /^\/account\/accomplishments\/verify\/[A-Z0-9]+$/, label + ": invalid Coursera verification path");
    assert.equal(await link.getAttribute("target"), "_blank", label + ": credential link target");
    assert.match(await link.locator(".credential-status").textContent(), /Verified/i, label + ": credential status");
  }
  assert.equal(new Set(destinations).size, 2, label + ": duplicate credential destinations");
}

async function checkEvidenceLinks(page, label) {
  const links = page.locator(".capability-row");
  for (let index = 0; index < await links.count(); index += 1) {
    const link = links.nth(index);
    const href = await link.getAttribute("href");
    assert.match(href || "", /^#[a-z0-9-]+$/, `${label}: evidence link must be an anchor`);
    assert.equal(await page.locator(`.project-chapter${href}`).count(), 1, `${label}: evidence target ${href} missing`);
    await link.click();
    await page.waitForFunction((hash) => location.hash === hash, href);
    await page.waitForFunction((hash) => {
      const box = document.querySelector(hash).getBoundingClientRect();
      return box.bottom > 0 && box.top < innerHeight;
    }, href);
  }
}

async function checkActiveNav(page, label) {
  for (const id of ["work", "capabilities", "credentials", "changelog", "contact"]) {
    await page.evaluate((targetId) => {
      const target = document.getElementById(targetId);
      const top = target.getBoundingClientRect().top + scrollY - innerHeight * 0.1;
      scrollTo({ top, behavior: "instant" });
    }, id);
    try {
      await page.waitForFunction(
        (targetId) => document.querySelector(`.nav-links a[href="#${targetId}"]`)?.getAttribute("aria-current") === "page",
        id,
        { timeout: 5000 }
      );
    } catch (error) {
      const state = await page.evaluate(() => ({
        scrollY,
        innerHeight,
        active: Array.from(document.querySelectorAll(".nav-links a[aria-current]")).map((link) => link.getAttribute("href")),
        sections: ["work", "capabilities", "credentials", "changelog", "contact"].map((sectionId) => {
          const box = document.getElementById(sectionId).getBoundingClientRect();
          return { id: sectionId, top: box.top, bottom: box.bottom, height: box.height };
        })
      }));
      throw new Error(`${label}: active navigation did not select ${id}: ${JSON.stringify(state)}`, { cause: error });
    }
  }
}

async function checkMobileMenu(page, label) {
  const toggle = page.locator(".menu-toggle");
  const nav = page.locator("#mobile-navigation");
  assert.equal(await toggle.isVisible(), true, `${label}: menu button hidden`);
  const box = await toggle.boundingBox();
  assert.ok(box.width >= 44 && box.height >= 44, `${label}: menu button smaller than 44x44`);
  assert.equal(await toggle.getAttribute("aria-expanded"), "false");
  assert.equal(await nav.isVisible(), false, `${label}: closed menu visible`);
  const closedIcon = await toggle.locator("span").first().evaluate((node) => getComputedStyle(node).transform);

  await toggle.click();
  assert.equal(await toggle.getAttribute("aria-expanded"), "true");
  assert.equal(await nav.isVisible(), true, `${label}: open menu hidden`);
  await page.waitForTimeout(230);
  const openIcon = await toggle.locator("span").first().evaluate((node) => getComputedStyle(node).transform);
  assert.notEqual(openIcon, closedIcon, `${label}: menu icon did not change`);

  await page.keyboard.press("Escape");
  assert.equal(await toggle.getAttribute("aria-expanded"), "false", `${label}: Escape did not close menu`);
  assert.equal(await nav.isVisible(), false, `${label}: menu stayed visible after Escape`);

  await toggle.click();
  await nav.locator('a[href="#work"]').click();
  assert.equal(await toggle.getAttribute("aria-expanded"), "false", `${label}: selecting link did not close menu`);
  assert.equal(await nav.isVisible(), false, `${label}: menu stayed visible after link selection`);
  assert.equal(new URL(page.url()).hash, "#work", `${label}: mobile link did not navigate`);
}

async function checkContactForm(page, label, problems) {
  const form = page.locator("#contact form");
  const button = form.locator('button[type="submit"]');
  const name = form.locator('input[name="name"]');
  const email = form.locator('input[name="email"]');
  const message = form.locator('textarea[name="message"]');

  await button.click();
  assert.match(await form.getByRole("alert").textContent(), /Complete all fields before sending\./, `${label}: empty form validation`);
  await name.fill("Visual Check");
  await email.fill("invalid-email");
  await message.fill("Testing the contact flow.");
  await button.click();
  assert.match(await form.getByRole("alert").textContent(), /Enter a valid email address\./, `${label}: invalid email validation`);

  let sent;
  await page.route("**/api/contact", async (route) => {
    sent = { method: route.request().method(), body: route.request().postDataJSON() };
    await new Promise((resolve) => setTimeout(resolve, 350));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Message received. I will reply by email." })
    });
  });
  await email.fill("visual@example.com");
  await button.click();
  assert.equal(await button.isDisabled(), true, `${label}: button enabled while pending`);
  assert.match(await button.textContent(), /Transmitting/, `${label}: pending button label`);
  assert.match(await form.getByRole("status").textContent(), /Transmitting/, `${label}: pending announcement`);
  await form.getByRole("status").filter({ hasText: "Message received. I will reply by email." }).waitFor();
  assert.equal(sent.method, "POST", `${label}: contact request method`);
  assert.deepEqual(sent.body, {
    name: "Visual Check",
    email: "visual@example.com",
    message: "Testing the contact flow.",
    company: ""
  }, `${label}: contact request payload`);
  assert.equal(await name.inputValue(), "", `${label}: name not reset after success`);
  assert.equal(await email.inputValue(), "", `${label}: email not reset after success`);
  assert.equal(await message.inputValue(), "", `${label}: message not reset after success`);
  await page.unroute("**/api/contact");
  assert.deepEqual(problems, [], `${label}: console or page errors before simulated failure`);

  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Please use the direct email link." })
    });
  });
  await name.fill("Retry Sender");
  await email.fill("retry@example.com");
  await message.fill("Keep this message available for retry.");
  await button.click();
  await form.getByRole("alert").filter({ hasText: "Please use the direct email link." }).waitFor();
  assert.equal(await name.inputValue(), "Retry Sender", `${label}: name lost after API failure`);
  assert.equal(await email.inputValue(), "retry@example.com", `${label}: email lost after API failure`);
  assert.equal(await message.inputValue(), "Keep this message available for retry.", `${label}: message lost after API failure`);
  assert.equal(await page.locator('a.contact-email[href^="mailto:"]').isVisible(), true, `${label}: direct email fallback hidden`);
  await page.unroute("**/api/contact");

  // Chromium reports the deliberately mocked 503 as a resource error.
  const expectedHttpFailure = problems.filter((problem) =>
    problem.type === "error" &&
    problem.text.includes("503 (Service Unavailable)") &&
    problem.url.endsWith("/api/contact")
  );
  assert.ok(expectedHttpFailure.length <= 1, `${label}: multiple contact API resource errors`);
  const unexpected = problems.filter((problem) => !expectedHttpFailure.includes(problem));
  assert.deepEqual(unexpected, [], `${label}: unexpected console or page errors`);
}

async function checkViewport(browser, viewport) {
  const label = `${viewport.width}x${viewport.height}`;
  const page = await browser.newPage({ viewport });
  const problems = watchConsole(page);
  try {
    await page.goto(url, { waitUntil: "networkidle" });
    await checkStructure(page, label);
    const revealCount = await checkReveals(page, label);
    await checkLayout(page, label);
    await checkCredentialLinks(page, label);
    if (viewport.width > 740) {
      await checkHeroMotion(page, label, false);
      await checkProjectLinks(page, label);
      await checkActiveNav(page, label);
      await checkEvidenceLinks(page, label);
    } else {
      await checkMobileMenu(page, label);
    }
    await page.screenshot({ path: path.join(outDir, `viewport-${label}.png`), fullPage: true });
    await checkContactForm(page, label, problems);
    await checkLayout(page, label);
    console.log(`PASS ${label}: structure, ${revealCount} reveals, layout, interactions, contact form`);
  } finally {
    await page.close();
  }
}

async function checkReducedMotion(browser, viewport) {
  const label = `${viewport.width}x${viewport.height} reduced motion`;
  const page = await browser.newPage({ viewport });
  const problems = watchConsole(page);
  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "networkidle" });
    await checkHeroMotion(page, label, true);
    assert.equal(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
      "auto",
      `${label}: document scroll behavior`
    );
    const revealCount = await checkReveals(page, label);
    await checkLayout(page, label);
    const knownWarning = "You have Reduced Motion enabled on your device.";
    assert.deepEqual(
      problems.filter((problem) => !(problem.type === "warning" && problem.text.startsWith(knownWarning))),
      [],
      `${label}: unexpected console or page errors`
    );
    console.log(`PASS ${label}: stationary hero, auto scrolling, ${revealCount} visible reveals (${problems.length} known Framer Motion warning)`);
  } finally {
    await page.close();
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });
  let serverOutput = "";
  const server = spawn(process.execPath, [vitePath, "--host", "127.0.0.1", "--port", "4173", "--strictPort"], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });
  server.stdout.on("data", (data) => { serverOutput += data.toString(); });
  server.stderr.on("data", (data) => { serverOutput += data.toString(); });

  let browser;
  try {
    await waitForServer(server, () => serverOutput);
    browser = await launchBrowser();
    for (const viewport of viewports) {
      await checkViewport(browser, viewport);
      await checkReducedMotion(browser, viewport);
    }
    console.log("PASS visual-check: all three viewports and reduced-motion checks passed.");
  } finally {
    try {
      await browser?.close();
    } finally {
      server.kill();
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
