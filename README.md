# Cao Van Ha — Developer Systems Portfolio

A one-page portfolio for Cao Van Ha, AI Engineer. Its visual system uses graphite surfaces, off-white type, acid-green signals, technical diagrams, and restrained motion to present real AI engineering work.

## Page structure

- **Hero:** focus on grounded AI systems.
- **Work:** four project chapters covering educational retrieval, Vietnamese NLP, and computer vision.
- **Capabilities:** technical strengths linked to project evidence.
- **Operating Model:** discover, design, build, and validate.
- **Changelog:** current learning and project milestones.
- **Contact:** a message form and a direct email link.

## Run locally

Requires Node.js and pnpm. Install dependencies with `pnpm install`.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Vite development server. |
| `pnpm build` | Create the production site in `dist/`. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm visual-check` | Run the Playwright responsive and interaction smoke check. |

The contact form posts to `/api/contact`, a Vercel Function that validates submissions and sends email through Resend. Plain `pnpm dev` does not execute Vercel functions; use `vercel dev` for a local end-to-end function check. The visible [direct email link](mailto:caov77029@gmail.com) remains available when the form cannot send.

## Contact configuration

Configure these environment variables in Vercel, using [.env.example](.env.example) as the reference:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key used only by the server function. |
| `RESEND_FROM_EMAIL` | Sender address on a Resend-verified domain. |
| `CONTACT_TO_EMAIL` | Recipient address; defaults to `caov77029@gmail.com` when unset. |

The form reports success only after the API confirms the Resend request. Configuration or delivery failures return an error and leave the entered text available to retry.

## Vercel deployment

Use the **Vite** framework preset, `pnpm build` as the build command, and `dist` as the output directory. Set the contact environment variables for each environment where the form should work.

Built with React, Framer Motion, Vite, and a Vercel Node function.
