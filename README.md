<div align="center">

An editorial one-page portfolio for Cao Van Ha, an AI Engineer focused on RAG systems, Vietnamese NLP, educational technology, and full-stack AI products.

The experience pairs large case-study storytelling with technical system diagrams. It is inspired by premium product-design portfolios while keeping the content, workflow, and visual language specific to AI engineering.

## Sections

- Hero with a concise engineering position, availability, and animated AI system map.
- Current practice strip covering RAG architecture, Vietnamese NLP, AI product engineering, and full-stack delivery.
- Four featured project case studies: IT Smart Assistant, MathRAG THPT, V-Fashion Insight, and AnimalDex.
- Four-step process: Discover, Design, Build, and Validate.
- Grouped capability index for AI, product engineering, and infrastructure.
- Experience timeline covering learning, research, and current focus.
- Contact section with direct links and client-side form validation.

## Design Direction

The interface uses a warm editorial base, large serif headings, compact sans-serif metadata, restrained signal colors, thin rules, and full-width project bands. Technical pipeline diagrams are generated from the project data, so the visual story remains connected to each system instead of relying on generic stock imagery.

Framer Motion provides entrance reveals and a subtle looping Hero animation. Reduced-motion preferences are respected, and the layout adapts across desktop, tablet, and mobile without horizontal page overflow.

## Tech Stack

- React 19
- Vite 6
- Framer Motion 12
- Plain CSS
- Playwright Core for visual smoke testing

## Development

Install dependencies and start the local site:

```bash
pnpm install
pnpm dev
```

Create a production build:

```bash
pnpm build
```

Run the responsive visual and interaction checks:

```bash
node scripts/visual-check.mjs
```

The visual check covers `1440x1000`, `1024x900`, and `390x844`. It verifies structure, responsive bounds, reveal animations, project hover feedback, contact form validation, browser errors, and horizontal overflow. Screenshots are written to `test-results/`.
