# Miguel Zuluaga's portfolio

[Español](README.md) · **English**

Bilingual (ES/EN) personal site with the projects and experience of Miguel Zuluaga, a
software developer focused on AI agents.

## What is different about it

- **Case studies backed by evidence:** real screenshots, a "How it fails" section with dated,
  sourced figures, and an animated trace that explains how a message travels through Cautelia.
- **Motion on a budget:** GSAP, ScrollTrigger and Lenis on a single clock, `transform` and
  `opacity` only, no WebGL, and `prefers-reduced-motion` respected. Measurements are in
  [docs/03-decisiones.md](docs/03-decisiones.md) (in Spanish).
- **Typed content in two languages:** `src/content/es.ts` and `en.ts` satisfy the same type and a
  test checks they have the same shape, with no long dashes or banned wording.

## Stack

Next.js 16 (App Router), React 19, strict TypeScript, Tailwind 4, GSAP, Lenis, Vitest.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck && pnpm lint && pnpm test
```

## Layout

```
src/app/[locale]/   /es and /en routes
src/content/        typed content per language
src/features/       one folder per section
src/lib/motion/     GSAP, ScrollTrigger and Lenis
docs/               content, visual direction and decisions
```
