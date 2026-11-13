# 02. Dirección visual (propuesta, pendiente de aprobación)

Nada de esto está fijado. Siguiendo el proceso que Miguel ya usó en Cautelia y CV Copilot, la
paleta y la tipografía se eligen con él antes de escribir interfaz.

## Idea

Dirección A, "La traza". El trabajo de Miguel son agentes con observabilidad, así que el sitio
se lee como la traza de una petición: cada sección es un tramo (*span*) y los diagramas de
arquitectura se dibujan al hacer scroll. El color cuenta la historia:

- **Verde:** tramo sano (lo que funciona).
- **Naranja:** tramo que falla o guardia activada. Aparece solo en los diagramas y en los
  bloques "Cómo falla" de cada caso.
- **Tinta y gris:** todo lo demás. Un solo acento por pantalla.

## Corrección a mi propuesta anterior

Había mencionado "papel cálido con tipografía serif de display". Eso choca con las reglas de
Miguel (prohíben cualquier serif display y "crema con terracota" como elección por defecto) y es
justo el aspecto de sitio hecho por IA que se quiere evitar. Se reemplaza por papel **frío**
(gris verdoso muy claro) y sans de display.

## Paleta propuesta ("Traza")

Contrastes calculados con la fórmula WCAG (script propio, 2026-11-12).

| Token | Claro | Oscuro |
|---|---|---|
| Fondo de página | `#EEF0EC` | `#0F1311` |
| Superficie | `#F8F9F6` | `#171D1A` |
| Texto | `#14181A` (15,6:1) | `#E6EBE7` (15,5:1) |
| Texto secundario | `#4F5753` (6,5:1) | `#9AA7A0` (7,5:1) |
| Línea | `#C9CFC9` | `#27302C` |
| Acento (verde traza) | `#0B6B4F` (5,7:1) | `#4FB58A` (7,4:1) |
| Texto sobre el acento | `#F4FAF7` (6,2:1) | `#08140E` (7,4:1) |
| Alerta (naranja) | `#B7410E` (4,9:1) | `#F0733A` (6,4:1) |

- Sin `#000` ni `#fff`. Grises de una sola temperatura (verdosa fría).
- Modo claro y oscuro con interruptor; sin preferencia guardada, sigue al sistema.
- El naranja de Cautelia (cobre sobre casi negro) y el de CV Copilot ya existen. Aquí el naranja
  es solo el color de "falla", no la marca.

**Alternativa:** acento cobalto (`#2446B8` claro, `#7C95F5` oscuro; 6,9:1 y 6,7:1). Más
neutral, pero el azul es el color por defecto de las herramientas de IA; la recomendación es
el verde.

## Tipografía (decidida el 2026-11-12)

Miguel aprobó la paleta y el fondo, y descartó la tipografía propuesta (Bricolage Grotesque
con JetBrains Mono). Lo que quedó:

- **Archivo** variable (OFL), con su eje de ancho: títulos en ancho 62-68 % y peso 800, que da
  un aire de rotulación industrial y se aleja de las grotescas redondeadas que usan los sitios
  generados por defecto; texto en ancho normal.
- **Sin monoespaciada.** Una primera versión usó Martian Mono para etiquetas y datos, y
  Miguel señaló que ese tipo de letra, en verde y tamaño chico, delata a un sitio hecho con IA.
  Se quitó. Las etiquetas ahora son Archivo en ancho expandido (118 %) y peso medio, y el texto
  técnico corrido va en Archivo normal.
- Se autoaloja en `src/app/fonts` (con su licencia) mediante `next/font/local`, solo
  subconjunto latino. Escala en `rem`, tamaños de título con `clamp`.

## Ilustraciones (2026-11-12)

Miguel pidió ilustraciones con animación y que sigan al cursor, porque el contenido se veía
plano. Estilo: geometría plana con contorno de tinta de 3 px, los colores de la paleta y nada de
degradados, para que cambien bien entre modo claro y oscuro. Son SVG dibujados en el código
(`src/components/art`), decorativos (`aria-hidden`), y la información sigue en el texto.

- **El observador** (héroe y contacto): un ojo dentro de un dial con los tres tramos de la
  traza. El iris sigue al cursor, las capas se mueven con distinta profundidad y parpadea cada
  4 a 9 s mientras está a la vista. Juega con la observabilidad: lo que se observa también mira.
- **Cautelia:** dos carros que se acercan con el scroll y se detienen ante la guardia, con el
  reporte (el chat) y el visto bueno entre ellos.
- **ISSI HR:** cuatro hojas de vida que se ordenan por puntaje al hacer scroll, y una
  conversación de WhatsApp que va apareciendo.
- **Agente Experto Wi-Fi:** un router con las dos bandas; el cliente sigue al cursor y pasa a
  5 GHz si está cerca del router o a 2,4 GHz si está lejos (Band Steering).
- El tamaño del nombre en el héroe también se limita por altura (`33vh`) para que la primera
  pantalla muestre quién es y la prueba (la captura de Cautelia).

## Movimiento (presupuesto en `CLAUDE.md`)

- Dibujo de líneas SVG ligado al scroll (`stroke-dashoffset`, solo `transform`/`opacity` donde se
  pueda) con ScrollTrigger y `scrub` de 1.
- Texto que entra por palabras una sola vez; 150 a 250 ms en la interfaz, curva
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- Sin cursor personalizado, sin parallax continuo, sin bucles infinitos.
- Tarjetas y enlaces con hover solo bajo `@media (hover: hover) and (pointer: fine)`.

## Segunda ronda (2026-11-12)

Cambios pedidos por Miguel tras ver la primera versión navegable:

- **Se quitó la regla con marcas** bajo el nombre y **el logo de las tres líneas** (también
  de dentro del ojo). La marca ahora es el propio ojo reducido a un círculo, un iris y una
  pupila (`components/Mark.tsx` y `app/icon.svg`). En el observador, las líneas se
  reemplazaron por tres satélites sobre el aro, uno por color de la paleta.
- **Héroe:** bajo el nombre ya no va Cautelia, sino una presentación: titular y llamadas a la
  acción a la izquierda, y "Sobre mí" con cuatro datos (ubicación, estudios, idiomas,
  reconocimientos) a la derecha. Todo sale del CV y de su texto de LinkedIn.
- **Imágenes de proyectos:** se eligieron las más atractivas y se descartaron las de puro texto.
  Cautelia: portada (los dos carros de noche) e inicio con las tres aseguradoras. Wi-Fi: la
  gráfica de señal con los cambios de banda y el panel de observabilidad. ISSI HR: la landing.
- **Ilustración Wi-Fi:** el router va al centro, con las dos bandas hacia ambos lados. El
  cliente sigue al cursor por todo el dibujo pero no puede tocar el router: lo rodea por arriba
  o por abajo (comprobado en 842 cuadros: despeje mínimo de 30 px con un aro de 22 px).
- **Contacto:** cuatro tarjetas ordenadas (el correo ocupa el ancho completo, con su botón de
  copiar) y un avión de papel que sigue al cursor, en lugar del ojo.
- **Stack:** las columnas llegan en cascada con el scroll, la raya de cada título se dibuja y
  las tecnologías aparecen una a una; al pasar el cursor, cada una se desplaza y toma el acento.
- **Acento cobalto** en prueba (`#2446B8` claro, `#7C95F5` oscuro).
- **Tipografía:** pendiente. Hay un artefacto con siete alternativas para elegir.

## Tercera ronda (2026-11-12)

- **Cobalto aprobado** y neutrales fríos: Miguel percibía el fondo verdoso porque los grises de
  la paleta anterior llevaban tinte verde. Ahora son azul grisáceo (claro `#EDEFF3` y tinta
  `#14171C`; oscuro `#0E1015` y `#E8EAF0`). Contrastes calculados: texto secundario 6,6:1 en
  claro y 7,4:1 en oscuro; acento 6,9:1 y 6,8:1; naranja 4,8:1 y 6,5:1.
- **Etiquetas:** pasaron de Archivo expandida a Archivo condensada (78 %, peso 600). Miguel
  señaló que la expandida también se notaba hecha con IA.
- **Logo:** el ojo se descartó porque parece un "ojo turco". La marca es el monograma MZ.
- **El agente** reemplaza al ojo del héroe: una cabeza con pantalla, dos ojos que miran al
  cursor y parpadean, sonrisa cobalto y antena naranja. Los tres puntos sobre el aro se
  quitaron porque parecían granos. Con ratón, al salir del héroe aparece una versión pequeña
  que persigue al cursor sin acercarse a menos de 96 px (si el cursor viene hacia ella, se
  aparta), no recibe clics y se oculta al volver arriba. En táctil y con movimiento reducido no
  existe.
- **Wi-Fi:** la leyenda de las bandas va centrada debajo del router, y se quitó el primer arco
  de cada banda para que ninguno toque el router. El cliente no baja a la zona de la leyenda.
- **Trabajo anterior:** medalla interactiva junto al título (se inclina con el cursor y
  destella al pasar encima).
- **Stack:** sin raya bajo los títulos, que ahora van en cobalto. Educación con la institución
  en otra línea y en cobalto, y enlace al certificado EF SET (`cert.efset.org/en/YNg43c`,
  tomado del hipervínculo del CV).
- **Botones:** uno relleno y otro con borde, con un relleno que entra desde la izquierda al
  pasar el cursor, el icono que se desplaza y una leve elevación. Se usan en el héroe y en
  Cautelia; ISSI HR y Wi-Fi llevan el relleno.
- **Contacto:** valores de las tarjetas pequeñas en una sola línea.
- **Nombre del héroe:** más separación vertical entre "Miguel" y "Zuluaga".
