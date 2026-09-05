# Hybrid Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing one-page AI Engineer portfolio with an editorial Framer-inspired Hero and case-study presentation while retaining Cao Van Ha's real project data and accessible interactions.

**Architecture:** Keep the application as a single React route backed by the existing `profile` object. Replace the current neo-brutalist section markup with focused section components and a reusable `ProjectCaseStudy`; keep all styling in the established global stylesheet and extend the existing Playwright smoke test to validate the new structure and responsive layout.

**Tech Stack:** React 19, Vite 6, Framer Motion 12, plain CSS, Playwright Core

**Spec:** `docs/superpowers/specs/2026-09-06-hybrid-portfolio-redesign-design.md`

**Status:** Implemented and verified on 2026-09-06. Production build and all responsive visual checks pass.

## Global Constraints

- Preserve all real personal details, project URLs, project descriptions, and existing social links.
- Do not invent project performance metrics, testimonials, employers, or client logos.
- Preserve skip navigation, active section state, focus visibility, form validation announcements, and reduced-motion support.
- Use the existing dependency set; do not add a UI framework or icon package.
- Keep the site responsive at 1440x1000, 1024x900, and 390x844 without horizontal overflow.

---

### Task 1: Lock The New Page Contract In The Visual Smoke Test

**Files:**
- Modify: `scripts/visual-check.mjs`
- Test: `scripts/visual-check.mjs`

**Interfaces:**
- Consumes: Vite page at `http://127.0.0.1:5173`.
- Produces: viewport results for `.hero-system`, `.practice-strip`, `.project-case`, `.process-step`, `.skill-index`, `.experience-row`, and `.contact-shell`.

- [ ] **Step 1: Replace old structural selectors with the new contract**

Set the motion sample selector to `.system-node-a`, the hover selector to `.project-case`, and the reveal list to:

```js
const revealSelectors = [
  ".practice-strip",
  "#work .project-case",
  "#process .process-step",
  "#skills .skill-index",
  "#experience .experience-row",
  "#contact .contact-shell"
];
```

Use this layout selector list inside `page.evaluate`:

```js
const selectors = [
  ".nav-shell",
  ".hero-copy",
  ".hero-system",
  ".practice-strip",
  ".project-case",
  ".process-step",
  ".skill-index",
  ".experience-row",
  ".contact-shell"
];
```

Add a structural summary with `projectCount`, `processCount`, `hasMainHeading`, and `hasContactForm`, and fail unless it reports four projects, four process steps, one H1, and a contact form.

- [ ] **Step 2: Run the visual check to verify the contract fails**

Run: `node scripts/visual-check.mjs`

Expected: FAIL because `.system-node-a`, `.practice-strip`, and `.project-case` do not exist in the current implementation.

- [ ] **Step 3: Commit the failing contract**

```bash
git add scripts/visual-check.mjs
git commit -m "test: define hybrid portfolio layout contract"
```

### Task 2: Rebuild Content And Component Structure

**Files:**
- Modify: `src/main.jsx`
- Test: `scripts/visual-check.mjs`

**Interfaces:**
- Consumes: `profile`, `fadeUp`, Framer Motion hooks, and the existing contact form validation.
- Produces: `Nav`, `Hero`, `PracticeStrip`, `ProjectCaseStudy`, `Projects`, `Process`, `Skills`, `Experience`, `Contact`, and `Footer` components with the selectors defined in Task 1.

- [ ] **Step 1: Refine profile data without inventing claims**

Add these top-level fields:

```js
eyebrow: "AI engineering / RAG / Vietnamese NLP",
statement: "I design and build AI systems that turn complex knowledge into useful, grounded products.",
practice: ["RAG architecture", "Vietnamese NLP", "AI product engineering", "Full-stack delivery"],
process: [
  { number: "01", title: "Discover", body: "Clarify the user problem, available knowledge, and what a trustworthy answer must contain." },
  { number: "02", title: "Design", body: "Shape retrieval, model, data, and interface decisions into one testable system." },
  { number: "03", title: "Build", body: "Implement the backend, evaluation flow, and product surface as a coherent delivery." },
  { number: "04", title: "Validate", body: "Test answer quality, failure cases, usability, and operational behavior before iteration." }
]
```

Add a factual `category` and `outcome` to each project based only on its current description, for example `category: "Education / RAG"` and `outcome: "Faculty-grounded answers"` for IT Smart Assistant.

- [ ] **Step 2: Replace the old section hierarchy**

Render this order inside `<main>`:

```jsx
<Hero reduceMotion={reduceMotion} />
<PracticeStrip />
<Projects />
<Process />
<Skills />
<Experience />
<Contact />
```

Update navigation links to `work`, `process`, `skills`, `experience`, and `contact`. Keep the existing `IntersectionObserver`, skip link, and `aria-current` behavior.

- [ ] **Step 3: Implement the editorial Hero and system visual**

Create `.hero-copy` with the eyebrow, `profile.name`, `profile.role`, statement, location, and two anchors. Create `.hero-system` containing three animated `.system-node` elements, a central core label, and the current profile metrics. Mark decorative connectors with `aria-hidden="true"` and label the overall visual `aria-label="Applied AI engineering system"`.

- [ ] **Step 4: Implement reusable project case-study bands**

Create `ProjectCaseStudy({ project, index })`. Its root must be `.project-case`; its visual side must map `project.visual.flow` into numbered nodes; its copy side must show category, title, description, role, stack, outcome, and the existing external link. Alternate layout with a class derived from odd indices, not duplicated JSX.

- [ ] **Step 5: Implement Process, Skills, Experience, Contact, and Footer**

Map `profile.process` to four `.process-step` articles. Map each skill group to `.skill-index`. Rename Timeline to `Experience` with `.experience-row` items and `id="experience"`. Preserve the exact contact validation logic and status roles, but wrap the section in `.contact-shell` and use the new editorial CTA copy.

- [ ] **Step 6: Run a production build**

Run: `pnpm build`

Expected: PASS with a generated `dist` bundle and no React compile errors.

- [ ] **Step 7: Commit the component rebuild**

```bash
git add src/main.jsx
git commit -m "feat: restructure portfolio as editorial case studies"
```

### Task 3: Replace The Visual System And Responsive Layout

**Files:**
- Modify: `src/styles.css`
- Modify: `index.html`
- Test: `scripts/visual-check.mjs`

**Interfaces:**
- Consumes: component class names produced by Task 2.
- Produces: the warm editorial palette, typography, responsive bands, motion states, visible focus states, and mobile navigation required by the spec.

- [ ] **Step 1: Establish design tokens and global behavior**

Replace the current palette with:

```css
:root {
  color-scheme: light;
  --paper: #f2f0e9;
  --surface: #faf9f5;
  --ink: #151817;
  --muted: #666a65;
  --line: #c9ccc5;
  --signal: #c6f04d;
  --steel: #7896a5;
  --warm: #d56b4f;
  --display: Georgia, "Times New Roman", serif;
  --sans: Inter, "Segoe UI", Arial, sans-serif;
}
```

Set body copy to `var(--sans)`, headings to `var(--display)`, retain `scroll-behavior: smooth`, and preserve the skip-link and focus-visible rules.

- [ ] **Step 2: Style navigation and Hero**

Use a quiet fixed navigation bar with a text brand, thin border, and compact links. Make Hero a two-column first viewport with the statement as the dominant text and `.hero-system` as an unframed, high-contrast technical scene. The first viewport must reveal the top edge of `.practice-strip` at 1440x1000.

- [ ] **Step 3: Style full-width project case studies**

Create alternating two-column `.project-case` bands with no outer card shadow. Give `.project-visual` a stable `aspect-ratio: 16 / 10`, data-driven pipeline nodes, subtle grids, and a clear outcome footer. Keep project copy compact enough that the project title never collides with metadata.

- [ ] **Step 4: Style supporting editorial sections**

Use a horizontal bordered strip for practice, a four-column process grid, ruled skill index rows, and an editorial experience list. Make Contact a dark full-width band with a two-column layout and a calm form surface rather than a nested card.

- [ ] **Step 5: Add responsive constraints**

At `max-width: 980px`, collapse Hero and project bands to one column and normalize alternating order. At `max-width: 700px`, create a compact horizontally scrollable navigation area, stack process steps, reduce section padding, and ensure every fixed-format visual uses explicit `min-height` or `aspect-ratio`.

- [ ] **Step 6: Update browser theme color**

Change the `theme-color` in `index.html` from `#fff8e7` to `#f2f0e9` so browser chrome matches the redesign.

- [ ] **Step 7: Run build and visual checks**

Run: `pnpm build`

Expected: PASS.

Run: `node scripts/visual-check.mjs`

Expected: PASS at all three viewports with four projects, four process steps, no console errors, no horizontal overflow, visible reveal targets, moving Hero animation, and desktop project hover feedback.

- [ ] **Step 8: Inspect generated screenshots**

Open `test-results/viewport-1440x1000.png`, `test-results/viewport-1024x900.png`, and `test-results/viewport-390x844.png`. Confirm the Hero framing, project order, form width, navigation fit, and absence of text collisions.

- [ ] **Step 9: Commit the completed visual redesign**

```bash
git add src/styles.css index.html scripts/visual-check.mjs
git commit -m "feat: apply hybrid editorial portfolio design"
```

### Task 4: Refresh Documentation And Final Verification

**Files:**
- Modify: `README.md`
- Test: `scripts/visual-check.mjs`

**Interfaces:**
- Consumes: the finished page structure and visual behavior.
- Produces: project documentation that accurately describes the redesigned sections and verification workflow.

- [ ] **Step 1: Update README section and design descriptions**

Document the new section order, four featured projects, AI product process, editorial design direction, responsive behavior, and the commands `pnpm build` and `node scripts/visual-check.mjs`. Remove the outdated statement that the portfolio contains only one featured project.

- [ ] **Step 2: Run whitespace and repository checks**

Run: `git diff --check`

Expected: no output.

Run: `git status --short`

Expected: only `README.md` and the implementation-plan checklist state are modified before the final documentation commit.

- [ ] **Step 3: Run final verification**

Run: `pnpm build`

Expected: PASS.

Run: `node scripts/visual-check.mjs`

Expected: PASS with an empty `failures` array.

- [ ] **Step 4: Commit documentation**

```bash
git add README.md docs/superpowers/plans/2026-09-06-hybrid-portfolio-redesign.md
git commit -m "docs: describe hybrid portfolio experience"
```
