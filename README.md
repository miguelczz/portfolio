# Portafolio de Miguel Zuluaga

**Español** · [English](README.en.md)

Sitio personal bilingüe (ES/EN) con los proyectos y la experiencia de Miguel Zuluaga,
Desarrollador de Software enfocado en agentes de IA.

## Qué tiene de particular

- **Casos de estudio con evidencia:** capturas reales, una sección "Cómo falla" con datos
  fechados y su fuente, y una traza animada que explica cómo viaja un mensaje por Cautelia.
- **Movimiento con presupuesto:** GSAP, ScrollTrigger y Lenis con un solo reloj, solo
  `transform` y `opacity`, sin WebGL y respetando `prefers-reduced-motion`. Las mediciones están
  en [docs/03-decisiones.md](docs/03-decisiones.md).
- **Contenido tipado en dos idiomas:** `src/content/es.ts` y `en.ts` cumplen el mismo tipo y una
  prueba comprueba que tengan la misma forma, sin guiones largos ni textos prohibidos.

## Stack

Next.js 16 (App Router), React 19, TypeScript estricto, Tailwind 4, GSAP, Lenis, Vitest.

## Cómo correrlo

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck && pnpm lint && pnpm test
```

## Estructura

```
src/app/[locale]/   rutas /es y /en
src/content/        contenido tipado por idioma
src/features/       una carpeta por sección
src/lib/motion/     GSAP, ScrollTrigger y Lenis
docs/               contenido, dirección visual y decisiones
```
