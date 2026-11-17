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

## Cuarta ronda (2026-11-13)

- **Se quitó el robot que persigue al cursor** (el agente pequeño): tapaba el contenido.
- **Logo:** la M y la Z, ambas en cobalto (también en el ícono de la pestaña).
- **Medallas:** una más pequeña en cada fila de "Trabajo anterior", junto al texto del premio;
  se quitó la del título.
- **Avión de papel:** su punta ahora apunta al rumbo (antes el dibujo no era simétrico y giraba
  raro). Vuela por toda la sección de contacto, no solo en un cuadro, y pasa por detrás de las
  tarjetas y del texto. La composición (sello, estela y carta) ya no lleva marco.
- **Contacto:** la tarjeta del correo tiene el mismo diseño que las demás; el botón de copiar
  va junto a la flecha.
- **Etiquetas quitadas:** "Orden ilustrativo...", la fuente del README en "Cómo falla", la nota
  del Wi-Fi sobre el cursor y la palabra "Alcance" en ISSI HR. Las fuentes de los números quedan
  en el comentario del archivo de contenido, no en pantalla.
- **Contenido:** "Sobre mí" abre con el recorrido (de la auditoría a los agentes);
  Claude Haiku 5.5 en Cautelia (`claude-haiku-5-5` en su configuración y su línea base de
  evaluación); clima organizacional en ISSI HR y 3C Community; seis viñetas en Audit Integral
  Advisors (Jupyter Notebook, según su ficha del Servicio Público de Empleo); Jupyter Notebook en
  el stack; Henry (Full Stack Web Developer, febrero a julio de 2023) en educación; BTM
  explicado en la leyenda de la gráfica del Wi-Fi.

## Quinta ronda (2026-11-13): red de agentes (descartada)

Miguel eligió la opción B y se hizo un diagrama de nodos (`NetworkArt`). Lo rechazó: "ultra
genérico". Se eliminó junto con sus etiquetas (`hero.net`).

## Sexta ronda (2026-11-13): personaje arma un robot, integrado al nombre

Pidió un personaje arreglando o creando un robot, no un cuadro "puesto a la fuerza", y fácil de
entender (poco detalle). Resultado (`components/art/MakerScene.tsx`, animación `makerScene()`):

- Formas planas con los colores del sitio, sin marco ni fondo. Va dentro del `h1`, medida en `em`
  del título (`.name-scene`), con los pies sobre la línea base de "Miguel", a la derecha de la "l".
- Entrada: las piezas del robot caen y rebotan en orden, la persona entra, aprieta un perno tres
  veces (chispa), el robot enciende los ojos y saluda. Con ratón: sus ojos siguen al cursor y
  saluda al pasar por él. Sin JS o con movimiento reducido se ve terminado.
- Favicon (`app/icon.svg`): solo las letras MZ, sin fondo, cobalto (claro en modo oscuro).

### Ajuste de la sexta ronda (2026-11-13)

Le gustó la escena y la animación (incluida la de después de la entrada); pidió cambiar los
personajes: la persona ya no es de palitos sino una figura plana al estilo de Storyset (camiseta
naranja, pantalón, zapatos, pelo, sonrisa) y **mide lo mismo que las dos líneas del nombre**
(de arriba de "Miguel" a la base de "Zuluaga"). El robot es **pequeño, de una línea de alto**
(apoyado en la base de "Miguel") y con otro diseño: orugas, cabeza de pantalla con ojos cobalto,
orejas naranja y antena. Sin contornos; los colores del robot salen de los tokens del sitio (se
ve bien en claro y oscuro) y los de la persona son fijos. Escala: 1 unidad del viewBox = 0.01em.
El héroe lleva `overflow-x-clip` para que la entrada deslizante no cause scroll horizontal.

## Séptima ronda (2026-11-13): héroe de una sola pantalla (descartada la ilustración nueva)

Se probaron un busto de robot con elementos flotantes y luego un robot de cuerpo completo basado en un
boceto; ninguno convenció ("no se pudo"). Miguel pidió volver al estilo anterior.

**Resultado final** (`features/hero/Hero.tsx`, `components/art/Observer.tsx`):

- Vuelve el nombre enorme (Zuluaga desplazado) con el robot de pantalla original a la derecha de
  "Miguel" (ojos que siguen al cursor, parpadeo, entrada de una sola vez).
- El héroe ocupa exactamente `100svh` menos el header: el tamaño del nombre sale de
  `min(24vw, (alto libre - franja del rol) / 2.12)`. No asoma texto de la sección siguiente.
- Abajo, una franja con filete superior: el título ("Desarrollador de Software" / "Full Stack AI
  Developer") en grande y debajo, en cobalto con un filete corto, las tecnologías ("LLMs, RAG, MCP y
  agentes de IA"); los dos botones a la derecha. En angosto se apila: nombre, robot, rol.
- Sin frase de "quién soy", sin íconos de redes y sin saludo ("Hola, soy"). "Quién soy" vive en
  "Sobre mí" (`features/about/About.tsx`), sección propia en el menú, con una descripción
  profesional (no una historia).
- Fuera del proyecto: `HeroRobot`, `MakerScene` y `makerScene()`; `hero.statement` y `hero.hello`.

## Octava ronda (2026-11-13): héroe en dos columnas, botones a "Sobre mí"

El héroe anterior (nombre gigante, robot pequeño al costado y franja inferior con filete y botones)
se veía desbalanceado: el nombre lo llenaba todo y el rol quedaba pegado al borde.

- Dos columnas desde 1024 px: a la izquierda nombre, título y tecnologías agrupados; a la derecha el
  robot grande (máx. 32 rem) centrado en vertical. Tamaño del nombre:
  `min(15vw, (alto libre - 17rem) / 2.1, 15rem)`. Sin desplazamiento de "Zuluaga".
- Se quitaron del héroe el filete superior y los botones. "Ver el trabajo" y "Contacto" viven ahora
  bajo los párrafos de "Sobre mí", y se quitó el filete sobre los datos de la derecha.
- En angosto se apila: nombre y rol arriba, robot debajo.

## Novena ronda (2026-11-13): "Sobre mí" con jerarquía y aire hacia "Trabajo"

- El texto se divide en frase principal (grande, `.about-lead`), detalle en tono secundario y los dos
  botones. Mismo contenido que antes, solo partido en tres cadenas (`hero.about[0]` es la frase).
- Los datos de la derecha pasan a una sola columna, sin líneas, ordenados por utilidad para quien
  recluta: Ubicación, Idiomas, Estudios, Reconocimientos. Reconocimientos es el más débil y se
  puede quitar sin que se note.
- Ritmo de secciones: `About` y `Work` usan el mismo respiro que las demás (`py-16 md:py-24`).

## Décima ronda (2026-11-13): medallas de "Trabajo anterior" y datos de "Sobre mí"

- La medalla es una celda propia de cada fila, a la derecha (junto a la flecha), más grande
  (4,75 rem en escritorio, 3 rem en móvil) y centrada en la altura de la fila, no del texto.
  El texto del premio queda sin icono, en cobalto, bajo las tecnologías.
- Se quitó "Reconocimientos" de los datos de "Sobre mí" (decisión de Miguel): el premio ya se ve
  en cada proyecto de "Trabajo anterior".

## Undécima ronda (2026-11-13): ficha de "Sobre mí", pista de scroll y barra discreta

- **Ficha de datos** (fuente: CV ES/EN, sin referencias de terceros): Ubicación, Idiomas,
  Experiencia ("Desde febrero de 2024, en tres empresas"), Modalidad (remoto y presencial),
  Estudios y Formación técnica. En escritorio va pegada al texto (columnas `40rem` + resto) en dos
  columnas; en angosto el orden es texto, ficha y botones. Reconocimientos sigue fuera.
- El texto de detalle sube a casi tinta plena (`.about-body`, 88 % de `--ink`).
- **Pista de scroll** en el héroe (`.hero-scroll`, "Desplázate" + flecha de Phosphor): abajo a la
  izquierda, la flecha se mueve solo tres veces (CSS, sin bucle) y no se anima con
  `prefers-reduced-motion`.
- **Barra de scroll** del navegador: `scrollbar-width: thin` y pulgar al 22 % de la tinta sobre
  pista transparente. La progresión ya la marca la barra de la cabecera.

## Duodécima ronda (2026-11-13): ficha sin educación y avión por encima

- **Ficha de "Sobre mí":** se quitaron Estudios y Formación técnica (ya aparecen más abajo), y
  también Experiencia (la línea de tiempo está justo debajo). Quedan cuatro datos que no se repiten
  en otra sección: Ubicación, Zona horaria (UTC-5 todo el año; dato general, no del CV), Idiomas
  (con puntaje y año del certificado EF SET, del CV) y Modalidad. Pendiente de Miguel: Disponibilidad
  y tipo de rol que busca; no están en el CV y no se inventan.
- **Avión de papel:** ahora vuela por encima de las tarjetas (`.plane` con `z-index: 5`, sigue sin
  capturar el ratón). Cambia la decisión anterior de dejarlo detrás; a cambio puede tapar el texto
  que queda bajo el cursor.

## Decimotercera ronda (2026-11-13): disponibilidad y avión como cursor

- **Ficha de "Sobre mí":** quedan Disponibilidad ("Disponible de inmediato", dato de Miguel),
  Ubicación y Modalidad. Se quitaron Idiomas (ya está completo en Stack, con el certificado) y
  Zona horaria (Miguel lo descartó). Miguel quiere pensar si se añade otro dato.
- **Avión de papel = cursor** (`planeFollow` en `lib/motion/scenes.ts`): con ratón, dentro de la
  sección de contacto se oculta el cursor del sistema (`.plane-cursor`) y la punta del avión queda
  exactamente en el puntero; gira hacia donde se mueve. Sin seguimiento retardado ni bucle: se coloca
  en cada evento de puntero y de scroll. Mide 56 px, no captura el ratón y las tarjetas se pulsan igual.
  Con táctil o `prefers-reduced-motion` queda quieto en su sitio de reposo. Reemplaza el vuelo
  suavizado de la ronda anterior.

- **Cabecera (2026-11-13):** se quitó el nombre; queda el monograma MZ, una barra "/" y la sección
  actual. El enlace del monograma conserva `aria-label` ("Inicio") para lectores de pantalla.

## Decimocuarta ronda (2026-11-13): frase en "Sobre mí" y zona horaria adaptable

- **Ficha:** vuelve Zona horaria, pero sin dato literal: "Me adapto a la zona horaria que se requiera"
  (decisión de Miguel). Quedan Disponibilidad, Ubicación, Zona horaria y Modalidad.
- **Frase** bajo la ficha, en el color de acento y con un icono de comillas de Phosphor (sin
  filetes): "Any fool can write code that a computer can understand. Good programmers write code
  that humans can understand." Martin Fowler, *Refactoring*, 2nd edition. Verificada en el texto del
  libro (capítulo de renombrado de variables); la versión en español es traducción libre y así se
  indica. Datos en `hero.quote` (ES y EN). No inventar ni parafrasear citas: citar solo si se puede
  comprobar en la fuente.

## Decimoquinta ronda (2026-11-13): frase a lo ancho y sin juicio

- **Zona horaria:** "UTC-5. Adaptado a la zona horaria que se requiera" (EN: "UTC-5. Adaptable to
  whatever time zone is required"). Sin primera persona, a pedido de Miguel.
- **Frase:** se reemplaza la de Fowler (hablaba de "tontos" y de código que otros entienden, y
  podía usarse en su contra) por una que no evalúa a nadie: "The best way to predict the future is
  to invent it." Alan Kay. Según su propio relato (correo de 1998), la dijo en 1971 en una reunión de
  Xerox PARC; no hay documento de la época con las palabras exactas, así que se atribuye solo a Kay,
  sin fecha. ES: "La mejor manera de predecir el futuro es inventarlo." (traducción libre).
- **Diseño:** la frase ocupa una fila propia a todo el ancho, debajo de texto, ficha y botones, en
  acento, con comillas de Phosphor. En angosto va al final. Regla: no usar frases sobre errores,
  fallos o capacidad de otras personas; citar solo lo comprobable.

- **Frase (ajuste, 2026-11-13):** vuelve a la columna derecha, bajo los datos (la fila a todo el ancho
  no convenció), pero ahora ocupa todo el ancho de la columna y un cuerpo algo mayor (`clamp(1.45rem,
  2.3vw, 2rem)`) en lugar de la medida estrecha anterior. Miguel está eligiendo la frase definitiva;
  la de Alan Kay es provisional.

- **Frase definitiva (2026-11-13), elegida por Miguel:** Alan Turing, "Computing Machinery and Intelligence"
  (Mind, 1950): "We can only see a short distance ahead, but we can see plenty there that needs to be
  done." Verificada palabra por palabra como última frase del artículo en dos copias del original
  (cs.ox.ac.uk y eliassi.org). ES: "Solo podemos ver un trecho corto hacia adelante, pero allí vemos
  mucho por hacer." (traducción libre, así se indica). Reemplaza a la de Alan Kay.

## Decimosexta ronda (2026-11-13): correcciones de móvil

- **Línea de tecnologías del héroe** ("LLMs, RAG, MCP y agentes de IA"): una regla la ocultaba con
  `max-height: 700px` en pantallas angostas. En muchos celulares la altura visible con la barra del
  navegador es menor a 700 px, así que desaparecía y volvía al hacer scroll (cuando la barra se
  encoge). Se quitó la regla; ahora el robot cede espacio (probado en 320x568, 390x664 y 390x844).
- **Avión de papel:** sin puntero fino (`hover: none` o `pointer: coarse`) no se muestra, porque
  no hay cursor que ser y, fijo, tapaba la tarjeta de WhatsApp. Sustituye a "queda quieto".
- **Auditoría:** sin desbordes horizontales en 320, 390; el año central de la línea de tiempo de
  Experiencia se oculta a propósito en pantallas angostas.
- **Limpieza:** se eliminaron cinco SVG de plantilla de Next en `public/` que nada usaba. README
  (ES y EN) sin la sección de cómo correrlo: es un sitio publicado, no una librería.
- **Imagen social (Open Graph):** `src/app/[locale]/opengraph-image.tsx` genera una de 1200x630 por idioma al
  construir el sitio, con la paleta oscura, Archivo y el mismo texto del héroe. Usa copias estáticas de
  Archivo (Bold y Medium, en `src/app/fonts/og/`) porque el generador no lee WOFF2. La dirección que muestra
  sale de `SITE_URL`: al cambiar de dominio se define esa variable en Vercel y la imagen se actualiza sola.
