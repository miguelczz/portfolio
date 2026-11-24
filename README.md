# Portafolio de Miguel Zuluaga

**Español** · [English](README.en.md)

Sitio personal bilingüe (ES/EN) con los proyectos y la experiencia de Miguel Zuluaga,
Desarrollador de Software enfocado en agentes de IA. Publicado en
[miguelzuluaga.dev](https://miguelzuluaga.dev); cada cambio en `main` se despliega solo en Vercel.

## Qué tiene de particular

- **Casos de estudio con evidencia:** capturas reales, una sección "Cómo falla" con datos
  fechados y su fuente, y una traza animada que explica cómo viaja un mensaje por Cautelia.
- **Movimiento con presupuesto:** GSAP, ScrollTrigger y Lenis con un solo reloj, solo
  `transform` y `opacity`, sin WebGL y respetando `prefers-reduced-motion`. Las mediciones de CPU
  están en [docs/03-decisiones.md](docs/03-decisiones.md).
- **Interacción solo donde hay ratón:** el avión de papel de Contacto es el cursor con puntero fino
  y no existe en táctil; el robot del héroe sigue al cursor solo con ratón.
- **Contenido tipado en dos idiomas:** `src/content/es.ts` y `en.ts` cumplen el mismo tipo y una
  prueba comprueba que tengan la misma forma, sin guiones largos ni textos prohibidos.
- **Sin cifras inventadas:** todo dato sale del CV o de un README público, con su fuente.

## Stack

Next.js 16 (App Router), React 19, TypeScript estricto, Tailwind 4, GSAP, Lenis, Phosphor Icons,
tipografía Archivo autoalojada. Páginas estáticas (`/es`, `/en`) en Vercel. Pruebas con Vitest.

## Arquitectura

```
src/app/[locale]/   rutas /es y /en, metadatos y hreflang
src/content/        contenido tipado por idioma
src/features/       una carpeta por sección (héroe, sobre mí, trabajo, experiencia, stack, contacto)
src/components/     piezas compartidas e ilustraciones SVG
src/lib/motion/     GSAP, ScrollTrigger y Lenis, con un solo reloj
docs/               contenido, dirección visual y decisiones
```

Los componentes de sección son Server Components; el movimiento lo declaran atributos `data-*` en
el marcado y lo activa una sola isla de cliente. El porqué de cada decisión está en
[docs/03-decisiones.md](docs/03-decisiones.md).
