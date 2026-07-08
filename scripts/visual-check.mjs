import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");

const root = "D:/Personal_Portfolio";
const nodePath =
  "C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe";
const vitePath = path.join(root, "node_modules/vite/bin/vite.js");
const url = "http://127.0.0.1:5173";
const outDir = path.join(root, "test-results");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await wait(500);
    }
  }
  throw new Error("Vite server did not respond on port 5173.");
}

async function checkViewport(browser, viewport) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleErrors.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  const initialMotion = await page.locator(".stage-card-a").evaluate((node) => {
    return getComputedStyle(node).transform;
  });
  await page.waitForTimeout(1200);
  const laterMotion = await page.locator(".stage-card-a").evaluate((node) => {
    return getComputedStyle(node).transform;
  });

  await page.locator(".project-panel").first().hover();
  await page.waitForTimeout(260);
  const hoverTransform = await page.locator(".project-panel").first().evaluate((node) => {
    return getComputedStyle(node).transform;
  });

  const revealSelectors = [
    "#about .section-intro",
    "#skills .skill-cluster",
    "#projects .project-panel",
    ".timeline-section .timeline-item",
    "#contact .contact-card"
  ];

  const revealResults = [];
  for (const selector of revealSelectors) {
    const target = page.locator(selector).first();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    revealResults.push(
      await target.evaluate((node, currentSelector) => {
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        return {
          selector: currentSelector,
          opacity: Number.parseFloat(style.opacity || "0"),
          visible:
            rect.width > 0 &&
            rect.height > 0 &&
            rect.bottom > 0 &&
            rect.top < window.innerHeight &&
            Number.parseFloat(style.opacity || "0") > 0.8
        };
      }, selector)
    );
  }

  await page.locator("#top").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const metrics = await page.evaluate(() => {
    const selectors = [
      ".nav-shell",
      ".hero-copy",
      ".story-stage",
      ".trait-tile",
      ".skill-cluster",
      ".project-panel",
      ".timeline-item",
      ".contact-card"
    ];
    const boxes = selectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector)).map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          selector,
          width: rect.width,
          height: rect.height,
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom
        };
      })
    );
    const badBoxes = boxes.filter((box) => {
      return (
        box.width <= 0 ||
        box.height <= 0 ||
        box.left < -2 ||
        box.right > window.innerWidth + 2
      );
    });
    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      badBoxes
    };
  });

  await page.screenshot({
    path: path.join(outDir, `viewport-${viewport.width}x${viewport.height}.png`),
    fullPage: true
  });

  await page.close();

  return {
    viewport,
    consoleErrors,
    pageErrors,
    overflow:
      metrics.scrollWidth > viewport.width + 2 ||
      metrics.bodyScrollWidth > viewport.width + 2,
    badBoxes: metrics.badBoxes,
    animationMoved: initialMotion !== laterMotion,
    hoverMoved: hoverTransform !== "none",
    revealResults
  };
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const server = spawn(nodePath, [vitePath, "--host", "127.0.0.1", "--port", "5173"], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });

  let serverOutput = "";
  server.stdout.on("data", (data) => {
    serverOutput += data.toString();
  });
  server.stderr.on("data", (data) => {
    serverOutput += data.toString();
  });

  try {
    await waitForServer();
    const browser = await chromium.launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
    });
    const viewports = [
      { width: 1440, height: 1000 },
      { width: 1024, height: 900 },
      { width: 390, height: 844 }
    ];
    const results = [];
    for (const viewport of viewports) {
      results.push(await checkViewport(browser, viewport));
    }
    await browser.close();

    const failures = results.flatMap((result) => {
      const prefix = `${result.viewport.width}x${result.viewport.height}`;
      const items = [];
      if (result.consoleErrors.length) items.push(`${prefix} console: ${result.consoleErrors.join(" | ")}`);
      if (result.pageErrors.length) items.push(`${prefix} pageerror: ${result.pageErrors.join(" | ")}`);
      if (result.overflow) items.push(`${prefix} has horizontal overflow`);
      if (result.badBoxes.length) items.push(`${prefix} has out-of-viewport boxes: ${JSON.stringify(result.badBoxes)}`);
      if (!result.animationMoved) items.push(`${prefix} floating animation did not move`);
      if (!result.hoverMoved) items.push(`${prefix} project hover transform did not apply`);
      const failedReveals = result.revealResults.filter((item) => !item.visible);
      if (failedReveals.length) items.push(`${prefix} failed reveal checks: ${JSON.stringify(failedReveals)}`);
      return items;
    });

    console.log(JSON.stringify({ serverOutput, results, failures }, null, 2));
    if (failures.length) process.exitCode = 1;
  } finally {
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
