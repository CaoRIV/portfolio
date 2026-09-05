# Hybrid Editorial Portfolio Redesign

## Goal

Transform Cao Van Ha's existing AI Engineer portfolio into an editorial, premium presentation inspired by the provided Framer reference while preserving the portfolio's real content, project links, accessibility behavior, and technical identity.

## Direction

Use a hybrid design:

- Hero and featured projects follow the reference's spacious editorial rhythm, strong typography, large visual fields, and case-study storytelling.
- Skills, experience, and contact remain tailored to an AI Engineer rather than copying a product designer template.
- The result should feel confident and polished without reproducing the reference's branding, creator promotions, or placeholder content.

## Information Architecture

The page remains a single React route with these sections:

1. Sticky navigation: Work, Process, Skills, Experience, Contact.
2. Hero: name, role, concise positioning, availability, primary project CTA, and a large AI-system visual.
3. Practice strip: key capabilities and current focus.
4. Featured work: four full-width case-study bands using the existing projects.
5. Process: Discover, Design, Build, Validate, expressed for AI product development.
6. Skills: compact grouped capability index.
7. Experience: editorial timeline using the existing milestones.
8. Contact: high-contrast closing statement, direct email, social links, and the existing validated form.

## Data Model

Keep portfolio content in a single `profile` object. Enrich project entries with concise outcome labels and category metadata where needed. Do not invent business metrics or claims that cannot be supported by the current project data. Technical pipeline visuals remain data-driven from each project's existing `visual.flow` field.

## Visual System

- Palette: warm off-white, near-black, restrained signal green, muted steel blue, and one warm accent. Avoid the current multi-color neo-brutalist palette.
- Typography: expressive editorial display type paired with a neutral sans-serif body face, loaded from a web font provider with system fallbacks.
- Layout: broad horizontal bands, asymmetric grids, generous whitespace, thin rules, and large project media. Avoid nested cards.
- Project visuals: abstract technical diagrams built from HTML/CSS and real project pipeline data. They act as product imagery without requiring unsupported screenshots.
- Motion: restrained fades, parallax, and staggered project reveals via Framer Motion. Respect `prefers-reduced-motion`.
- Responsive behavior: preserve hierarchy on mobile, collapse multi-column bands into a single reading flow, and keep navigation usable without horizontal overflow.

## Component Boundaries

- `Nav`: active-section state and anchor navigation.
- `Hero`: positioning, primary actions, and system overview visual.
- `PracticeStrip`: compact expertise summary.
- `Projects`: maps project data to reusable `ProjectCaseStudy` bands.
- `Process`: four-step AI engineering workflow.
- `Skills`: grouped capabilities.
- `Timeline`: existing milestones.
- `Contact`: existing validation behavior and direct contact links.
- `Footer`: identity and back-to-top action.

The implementation can remain in `src/main.jsx` because the application is small, but repeated project markup must be isolated in its own component.

## Interaction And Accessibility

- Preserve the skip link, semantic landmarks, visible focus states, active navigation state, and form status announcements.
- Keep all external links explicit and safe with `rel="noreferrer"`.
- Decorative visuals must be hidden from assistive technology; technical diagrams need meaningful accessible labels.
- Avoid animation-dependent content and ensure all sections remain visible without JavaScript motion support.

## Verification

- Run the production build.
- Run the existing Playwright visual check at desktop, tablet, and mobile sizes.
- Inspect screenshots for overflow, text collisions, blank visual regions, and responsive ordering.
- Confirm project links, navigation anchors, form validation, and reduced-motion behavior remain intact.

## Out Of Scope

- New case-study detail routes.
- A CMS, backend form delivery, blog, proposal, or calculator pages.
- Invented testimonials, employment history, project performance metrics, or client logos.
- Copying the reference template's branding or promotional content.
