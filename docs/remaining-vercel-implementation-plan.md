# Remaining Portfolio Implementation Plan

## Handoff contract

Continue from the repository at `D:/Personal_Portfolio`.

Current state:

- Working tree was clean when this plan was written.
- Latest commit: `a857261 fix: polish responsive layout and reduced motion`.
- Completed UI: navigation, hero, four project chapters, capability matrix, operating model, changelog, contact presentation, responsive layouts, and reduced-motion support.
- The approved visual direction is dark developer/system-console: graphite surfaces, off-white typography, acid-green signal color, mono metadata, technical diagrams, and restrained motion.
- Preserve the current visual design. Do not introduce purple/blue AI gradients, glassmorphism, generic card grids, or a fake IDE interface.
- Preserve all real personal information, repository URLs, project claims, accessibility behavior, and responsive layouts.
- Answer the user in Vietnamese even when the user writes in English.
- Complete exactly one task at a time, verify it, then stop so the user can commit. Do not continue to the next task until the user confirms the commit.

Important existing files:

- `src/App.jsx`: page composition and global `MotionConfig`.
- `src/data/profile.js`: portfolio content and project data.
- `src/components/Nav.jsx`: active navigation and mobile menu.
- `src/components/Hero.jsx`: hero and AI system map.
- `src/components/Work.jsx`: four case-study chapters and technical artifacts.
- `src/components/Capabilities.jsx`: evidence-based capability matrix.
- `src/components/Journey.jsx`: method, changelog, current mailto contact form, and footer.
- `src/animation.js`: shared reveal variants.
- `src/styles.css`: complete visual system and responsive rules.
- `scripts/visual-check.mjs`: old visual smoke test; its paths, selectors, and assertions are outdated.

Do not modify generated or ignored artifacts in `dist/`, `test-results/`, `.pnpm-store/`, or Vite log files except when a verification command generates them.

---

## Task 1 — Connect the contact form to a Vercel Function

### Goal

Replace the current valid-submit `mailto:` behavior with a real same-origin POST to `/api/contact`, delivered through Resend. Keep the direct email link as a fallback. Never show a success state unless the API confirms delivery.

### Files

Create:

- `api/contact.js`
- `.env.example`

Modify:

- `src/components/Journey.jsx`

Do not add a Resend package unless necessary. Node's built-in `fetch` is sufficient for the Resend REST API.

### Server function contract

Implement `api/contact.js` as a Vercel Node function exporting a default async handler.

Accept only `POST`:

- Non-POST request: set `Allow: POST`; return HTTP `405` with `{ "error": "Method not allowed." }`.
- Parse either an already-parsed object body or a JSON string body.
- Invalid JSON: HTTP `400`.

Expected body:

```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "company": "string"
}
```

Validation:

- Trim all user strings.
- `name`, `email`, and `message` are required.
- Validate email with the same observable rule used by the client.
- Maximum lengths:
  - name: 80
  - email: 160
  - message: 4000
- Reject oversize payloads with HTTP `400`.
- `company` is a hidden honeypot. If populated, return a generic HTTP `200` without calling Resend.
- Remove CR/LF characters from values used in email headers.

Environment variables:

```dotenv
RESEND_API_KEY=
RESEND_FROM_EMAIL=Portfolio <portfolio@your-verified-domain.com>
CONTACT_TO_EMAIL=caov77029@gmail.com
```

Behavior when configuration is missing:

- If `RESEND_API_KEY` or `RESEND_FROM_EMAIL` is missing, return HTTP `503`.
- The response must tell the user to use the direct email address.
- Never silently pretend delivery succeeded.

Resend request:

- Endpoint: `https://api.resend.com/emails`
- Method: `POST`
- Header: `Authorization: Bearer ${RESEND_API_KEY}`
- JSON fields: `from`, `to`, `reply_to`, `subject`, `text`.
- Default `CONTACT_TO_EMAIL` to `caov77029@gmail.com` only when the variable is absent.
- Resend non-2xx or network failure: return HTTP `502` with a safe user-facing error; do not expose secrets or raw provider responses.
- Successful delivery: HTTP `200` with `{ "message": "Message received. I will reply by email." }`.

### Client form changes

Update `Contact` in `src/components/Journey.jsx`:

- Make `handleSubmit` async.
- Preserve current empty-field and invalid-email validation messages.
- Add hidden honeypot input named `company`, removed from focus order and autocomplete.
- POST JSON to `/api/contact`.
- Add form states: `idle`, `pending`, `success`, `error`.
- While pending:
  - disable the submit button;
  - change its label to `Transmitting`;
  - announce status with `role="status"`.
- API error:
  - render the server message with `role="alert"`;
  - keep form content intact so the user can retry or copy it.
- API success:
  - show the returned message with `role="status"`;
  - reset the form.
- Preserve the visible direct `mailto:` link as fallback.
- Remove the current valid-submit `window.location.href = mailto:...` behavior.

### Verification

Use a throwaway Node script or inline Node command; do not add a permanent test file solely for coverage.

Verify the server handler directly with mocked request/response objects:

1. Empty fields return `400`.
2. Invalid email returns `400`.
3. Valid payload with missing environment configuration returns `503`.
4. Honeypot payload returns `200` and does not call provider fetch.
5. Valid payload with a mocked successful Resend fetch returns `200`.
6. Mocked Resend failure returns `502`.

Run the application and verify the actual contact UI:

1. Empty submit shows an alert.
2. Invalid email shows an alert.
3. Intercept `/api/contact` in the browser and return a successful JSON response.
4. Valid submit shows a real API-confirmed success state and resets the fields.
5. Intercept a failed response and confirm the error is visible while entered values remain.
6. No console errors and no layout overflow at desktop and mobile widths.

Run a production build after implementation.

### Stop and commit

Suggested commit:

```bash
git add api/contact.js .env.example src/components/Journey.jsx
git commit -m "feat: connect contact form to vercel email function"
```

Stop after verification and wait for the user to confirm the commit.

---

## Task 2 — Replace the visual smoke-test contract

### Goal

Update the existing Playwright smoke script for the redesigned page, remove machine-specific paths, and cover the new responsive, interaction, form, and reduced-motion contracts.

### Files

Modify:

- `scripts/visual-check.mjs`
- `package.json`

### Portability changes

Remove these hardcoded assumptions from `scripts/visual-check.mjs`:

- `D:/Personal_Portfolio`
- Codex-specific Node executable path
- A single hardcoded Windows Chrome executable path

Use:

- `fileURLToPath(import.meta.url)` and `path.dirname` to calculate the script directory and project root.
- `process.execPath` to launch Vite.
- A fixed smoke-test URL such as `http://127.0.0.1:4173`.
- Start Vite directly with:

```js
spawn(process.execPath, [vitePath, "--host", "127.0.0.1", "--port", "4173"], ...)
```

Browser executable selection:

1. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`
2. `CHROME_PATH`
3. Known Chrome locations selected by `process.platform`, guarded with `existsSync`
4. No `executablePath` option when a Playwright-managed browser is available

Give a clear error when no usable browser is available.

Always close the browser and stop the Vite process in `finally` blocks.

### Package scripts

Update `package.json`:

```json
{
  "packageManager": "pnpm@11.9.0",
  "scripts": {
    "visual-check": "node scripts/visual-check.mjs"
  }
}
```

Keep the existing `dev`, `build`, and `preview` scripts.

### Required viewports

Run sequentially at:

- `1440 × 1000`
- `1024 × 900`
- `390 × 844`

Store screenshots under the ignored `test-results/` directory.

### New structure contract

Assert observable page structure:

- exactly one main `h1`;
- four `.project-chapter` elements;
- four `.project-artifact` elements;
- four `.capability-row` elements;
- four `.method-step` elements;
- three `.changelog-row` elements;
- one `#contact form`;
- navigation targets exist for Work, Capabilities, Changelog, and Contact.

Do not assert source strings or implementation details.

### Layout contract

For important visible elements, verify:

- positive width and height;
- no element extends beyond the viewport by more than 2px;
- `documentElement.scrollWidth` and `body.scrollWidth` do not exceed the viewport width by more than 2px.

Include at minimum:

- `.nav-shell`
- `.hero-copy`
- `.system-panel`
- `.project-copy`
- `.project-artifact`
- `.capability-row`
- `.method-step`
- `.changelog-row`
- `.contact-shell`
- `.contact-form`
- `.site-footer`

Scroll each reveal target into view individually and wait until opacity exceeds `0.8`.

### Interaction contract

Desktop/tablet:

- Hero system node moves when reduced motion is not enabled.
- Project links have valid GitHub destinations.
- Capability evidence links navigate to their corresponding project chapters.
- Active navigation state updates while scrolling.

Mobile:

- Menu button is visible and at least `44 × 44px`.
- Clicking it sets `aria-expanded="true"` and reveals navigation.
- The icon changes to its open/close state.
- Pressing Escape closes the menu.
- Selecting a navigation link closes the menu.

Reduced motion:

- Use Playwright media emulation with `prefers-reduced-motion: reduce`.
- Hero system node transform must remain unchanged over time.
- Computed document `scroll-behavior` must be `auto`.
- Important content remains visible; reduced motion must not leave reveal elements hidden.

### Contact form contract

The Vite dev server does not execute Vercel functions. Intercept `/api/contact` in Playwright for UI checks.

Verify:

1. Empty submit shows `role="alert"` with the existing empty-field message.
2. Invalid email shows `role="alert"` with the existing invalid-email message.
3. Intercept a successful API response; valid submit shows `role="status"` and resets fields.
4. Intercept a failed API response; the alert is visible and values remain.

The server function itself is verified separately in Task 1. Do not claim a mocked browser response proves real email delivery.

### Verification

Run:

```bash
pnpm visual-check
```

Expected result:

- no browser console warnings/errors;
- no page errors;
- no overflow or out-of-viewport boxes;
- every required reveal visible;
- every structural and interaction assertion passes;
- screenshots generated at all three viewports.

### Stop and commit

Suggested commit:

```bash
git add package.json scripts/visual-check.mjs
git commit -m "test: update responsive visual smoke contract"
```

Stop after verification and wait for the user to confirm the commit.

---

## Task 3 — Final production verification and documentation

### Goal

Prove the complete production behavior, align public documentation and social preview with the redesigned site, and leave a clean Vercel-ready repository.

### Files

Modify only where required:

- `README.md`
- `public/og-preview.svg`
- Any file with a defect found by final verification

Do not add `vercel.json` for the current single-page anchor site unless an actual routing or function-runtime requirement is demonstrated. Vercel detects Vite and `/api` functions without it.

### README updates

Document the actual current system:

- Developer Systems Portfolio visual direction.
- Current page sections: Hero, Work, Capabilities, Operating Model, Changelog, Contact.
- Contact delivery through Vercel Function + Resend.
- Direct email fallback.
- Required environment variables.
- Local commands: dev, build, preview, visual-check.
- Deployment settings:
  - framework: Vite;
  - build command: `pnpm build`;
  - output directory: `dist`.
- Note that plain `pnpm dev` does not execute Vercel `/api` functions; use `vercel dev` when end-to-end local function execution is needed.
- Remove stale descriptions of the previous editorial design.
- Confirm there are no Git conflict markers.

### Open Graph preview

Redesign `public/og-preview.svg` to match the current portfolio:

- 1200 × 630.
- Graphite background.
- Off-white `Cao Van Ha / AI Engineer` identity.
- Acid-green `AI SYSTEMS` emphasis.
- Restrained system/grid motif.
- Large readable text at social-preview size.
- No unsupported external fonts or external image URLs.

Keep `index.html` references to `/og-preview.svg`.

### Final verification sequence

1. Confirm working tree changes belong only to this task.
2. Run the standard production build:

```bash
pnpm build
```

If Windows reports `EPERM` while deleting an old `dist` asset:

- stop any Vite/preview process holding the file;
- remove only the generated `dist/` directory;
- rerun the standard build;
- do not treat an alternate output directory as the final proof when the normal build can be repaired.

3. Run:

```bash
pnpm visual-check
```

4. Run the Task 1 server-function smoke scenarios again.
5. Inspect the actual page in a browser at desktop, tablet, and mobile sizes.
6. Inspect the updated Open Graph SVG visually.
7. Search the repository for unresolved conflict markers.
8. Confirm no hardcoded local machine paths remain in executable source/scripts.
9. Confirm `git status --short` contains only intended final-task changes before commit.

### Acceptance criteria

- Standard `pnpm build` succeeds.
- Visual smoke script reports zero failures at all three viewports.
- Contact UI handles empty, invalid, pending, API failure, and API success states.
- Contact server validates input and maps provider/configuration failures to correct HTTP responses.
- No horizontal overflow from 320px upward.
- Reduced-motion users receive no continuous hero animation.
- All navigation anchors resolve.
- README matches real behavior.
- OG preview matches the approved dark developer visual system.
- No unresolved conflict markers, absolute workstation paths, placeholders, or fake success behavior.

### Stop and commit

Suggested commit:

```bash
git add README.md public/og-preview.svg
# Add any verified defect-fix files from this task explicitly.
git commit -m "docs: finalize vercel-ready portfolio release"
```

Stop after verification and wait for the user to confirm the commit.

---

## Optional Task 4 — Vercel preview deployment

Only perform this after Tasks 1–3 are committed.

1. Configure these variables in the Vercel project:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
2. `RESEND_FROM_EMAIL` must use a Resend-verified domain.
3. Create a preview deployment first, not production:

```bash
vercel deploy . -y
```

4. Return the preview URL to the user.
5. Do not promote to production unless the user explicitly requests production deployment.
6. After the user approves the preview, production deployment can use:

```bash
vercel deploy . --prod -y
```

Recommended final delivery report:

- preview/production URL;
- commit used for deployment;
- build result;
- visual-check result;
- required environment variables configured or still missing;
- known limitations, if any.
