# Miguel Zuluaga's portfolio

[Español](README.md) · **English**

Bilingual (ES/EN) personal site with the projects and experience of Miguel Zuluaga, a
software developer focused on AI agents. Live at
[mzuluaga.vercel.app](https://mzuluaga.vercel.app); every change on `main` deploys automatically on Vercel.

## What is different about it

- **Case studies backed by evidence:** real screenshots, a "How it fails" section with dated,
  sourced figures, and an animated trace that explains how a message travels through Cautelia.
- **Motion on a budget:** GSAP, ScrollTrigger and Lenis on a single clock, `transform` and
  `opacity` only, no WebGL, and `prefers-reduced-motion` respected. CPU measurements are in
  [docs/03-decisiones.md](docs/03-decisiones.md) (in Spanish).
- **Interaction only where there is a mouse:** the paper plane in Contact is the cursor on fine
  pointers and does not exist on touch screens; the hero robot follows the cursor only with a mouse.
- **Typed content in two languages:** `src/content/es.ts` and `en.ts` satisfy the same type and a
  test checks they have the same shape, with no long dashes or banned wording.
- **No invented figures:** every data point comes from the CV or a public README, with its source.

## Stack

Next.js 16 (App Router), React 19, strict TypeScript, Tailwind 4, GSAP, Lenis, Phosphor Icons,
self-hosted Archivo typeface. Static pages (`/es`, `/en`) on Vercel. Tests with Vitest.

## Architecture

```
src/app/[locale]/   /es and /en routes, metadata and hreflang
src/content/        typed content per language
src/features/       one folder per section (hero, about, work, experience, stack, contact)
src/components/     shared pieces and SVG illustrations
src/lib/motion/     GSAP, ScrollTrigger and Lenis, on a single clock
docs/               content, visual direction and decisions
```

Section components are Server Components; motion is declared with `data-*` attributes in the
markup and activated by a single client island. The reasoning behind each decision is in
[docs/03-decisiones.md](docs/03-decisiones.md) (in Spanish).
