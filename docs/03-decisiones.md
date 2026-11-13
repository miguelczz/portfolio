# 03. Decisiones

Registro corto de decisiones técnicas, con el motivo y lo que se descartó.

## D1. i18n propio en lugar de next-intl

- **Decisión:** rutas `/es` y `/en`, `proxy.ts` para la redirección, y contenido tipado en
  `content/es.ts` y `content/en.ts` (mismo tipo `Content`).
- **Por qué:** son dos idiomas y la guía oficial de Next 16 para i18n describe exactamente
  este patrón (proxy + diccionarios). Una dependencia menos, nada de APIs que dependan de la
  versión, y el compilador obliga a que los dos idiomas tengan la misma forma.
- **Descartado:** next-intl. Tiene sentido con muchos idiomas, formatos o mensajes con
  plurales; aquí no.

## D2. Sin `cacheComponents` ni `partialPrefetching`

- **Decisión:** se quitaron del `next.config.ts` que generó `create-next-app`.
- **Por qué:** el sitio es estático (`generateStaticParams`, sin datos dinámicos). No hay nada
  que cachear por componente. La dirección C (mini-agente) usará una ruta de servidor, que no
  lo necesita.

## D3. Movimiento declarativo con una sola isla de cliente

- **Decisión:** el marcado lleva atributos `data-*` y `MotionRoot` los activa con GSAP y
  ScrollTrigger; Lenis corre dentro de `gsap.ticker` (`autoRaf: false`).
- **Por qué:** los componentes siguen siendo Server Components, hay un solo reloj, y
  `gsap.matchMedia()` limpia todo al cambiar `prefers-reduced-motion`.
- **Seguridad de la página:** los estados iniciales ocultos solo existen con la clase `js`
  (la pone un script de cabecera). Si el movimiento no arranca en 5 s, la clase se retira y la
  página queda visible. Con `prefers-reduced-motion: reduce` no se oculta nada.
- **Lenis:** solo con puntero fino (`(hover: hover) and (pointer: fine)`), no en táctil.

## D4. Solo `transform` y `opacity`

Las únicas animaciones ligadas al scroll son la traza de Cautelia (escala de barras y opacidad
de texto), la barra de progreso de la cabecera y un desplazamiento vertical de la captura del
héroe. Todo lo demás ocurre una vez. No hay cursor personalizado, ni WebGL, ni `will-change`
manual.

## D5. Capturas reales, sin maquetas

Las imágenes son capturas de los propios proyectos, convertidas a WebP (`scripts/optimize-images.mjs`):
Cautelia (caso y telemetría), la página pública de ISSI HR y el Agente Experto Wi-Fi (del repo
público). Cada texto alternativo describe lo que muestra.

## D6. Ilustraciones declarativas y baratas

- **Decisión:** las ilustraciones son SVG con atributos `data-*` (`data-from-x`, `data-depth`,
  `data-look`, `data-art-scrub`, `data-art-once`...) que `scenes.ts` convierte en tweens de GSAP.
  El marcado en reposo ya es el estado final, así que sin JavaScript se ven completas.
- **Cursor:** un solo `pointermove` pasivo en `window`, solo con ratón (`pointerType`) y solo
  para las ilustraciones visibles (IntersectionObserver). Se anima con `gsap.quickTo`, que
  solo trabaja mientras el cursor se mueve; no hay bucle propio.
- **Costo conocido:** el parpadeo del observador (cada 4 a 9 s, solo a la vista) mueve un
  atributo SVG durante unos 9 cuadros, lo que se nota en las métricas de reposo.
- **Trampa encontrada:** GSAP lee un `translateY(108%)` del CSS como píxeles; si el tween solo
  fija `yPercent`, ese desplazamiento sobrevive y la línea queda oculta por la máscara.
  Las animaciones de línea fijan `y: 0` de forma explícita.

## Medición (2026-11-12, Chromium sin interfaz, 1440x900 a 2x, build de producción)

Segunda medición, ya con las ilustraciones (la primera, sin ellas, dio 1,2 % en reposo y 9,2 %
con scroll):

| Situación | Hilo principal ocupado | Script |
|---|---|---|
| Reposo, 10 s tras la animación de entrada | 2,0 % | 0,5 % |
| Scroll continuo con rueda, 20 s | 11,4 % | 2,3 % |
| Reposo de nuevo, abajo en la página, 6 s | 2,7 % | n/d |

Es un indicio, no una garantía: sin GPU real ni teléfono.

### Primera medición (sin ilustraciones)

Mediciones con el protocolo de Chrome (`Performance.getMetrics`) en este Mac. Son un indicio,
no una garantía: no incluyen GPU real ni un teléfono.

| Situación | Hilo principal ocupado | Script |
|---|---|---|
| Reposo, 10 s tras la animación de entrada | 1,2 % | 0,3 % |
| Scroll continuo con rueda, 20 s | 9,2 % | 1,8 % |
| Reposo de nuevo, abajo en la página, 6 s | 2,0 % | n/d |

- Sin recálculos de estilo ni layouts en reposo.
- Hay dos bucles `requestAnimationFrame` a 60 Hz incluso en reposo: el ticker de GSAP y uno
  interno de ScrollTrigger (un arreglo para navegadores móviles; no se puede desactivar sin
  parchearlo). Cada uno hace casi nada, pero no es "cero". Si se quiere bajar más, se puede
  dormir `gsap.ticker` cuando no hay scroll.
- Pendiente: Lighthouse CI en GitHub Actions y una prueba en un móvil real.
