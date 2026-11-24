# 01. Contenido

Inventario de lo que el sitio puede decir y con qué evidencia. Fuentes: CV ES y EN (corregidos
el 2026-11-12), README de Cautelia en `~/Proyectos/untangle` y los textos de perfil público de
`~/Proyectos/cvs_automate/perfil-publico`. Nada de esto está publicado.

## Estructura del sitio (una página por idioma)

| Orden | Sección | Qué responde |
|---|---|---|
| 1 | Hero | Quién es, qué construye, una prueba y cómo ver el trabajo |
| 2 | Trabajo destacado | Tres casos: Cautelia, ISSI HR, Agente Experto Wi-Fi |
| 3 | Experiencia | 3C Community, Tigo Colombia, Audit Integral Advisors |
| 4 | Stack | Agrupado y corto; solo lo que se puede defender en entrevista |
| 5 | Trabajo anterior | Talky, Kakureya, Forest Custodian, con sus premios |
| 6 | Contacto | Una sola llamada a la acción |

Más adelante, y solo si A mide bien: el mini-agente (dirección C) dentro del hero o como sección.

## Casos

| Proyecto | Enlaces | Qué se puede mostrar | Datos verificados disponibles |
|---|---|---|---|
| **Cautelia** (2026) | cautelia.app, github.com/miguelczz/cautelia | Todo: demo, repo, arquitectura, fallos | README: 258 casos de evaluación en la última corrida, "ningún caso falló en esa corrida"; latencia del chat desde que el servidor recibe el mensaje hasta la primera palabra: ES p50 1,6 s / p95 2,3 s (87 turnos), EN p50 1,5 s / p95 2,2 s (85 turnos). Latencia de voz: no medida. |
| **ISSI HR** (2026) | issiagent.com | **Solo capturas de la landing.** Sin arquitectura ni pantallas internas | Ninguna cifra pública. Describir con las viñetas del CV (multiempresa, Keycloak, RLS, WhatsApp, CI/CD) sin detalles internos |
| **Agente Experto Wi-Fi** (2026) | github.com/miguelczz/wifi_expert_agent | Todo lo del repositorio (decisión de Miguel, 2026-11-12) | Se leen del README al construir el caso |
| **Talky**, **Kakureya**, **Forest Custodian** | repos en GitHub | Trabajo anterior con premios de proyecto integrador | Premios del CV: mejor proyecto pedagógico integrador de 4.º, 3.er y 1.er semestre |

Los números de Cautelia salen de una sección generada de su README: **se leen de nuevo y se
fechan al construir cada caso**. Son datos del autor sobre su propia evaluación, y así se dice.

## Titulares por idioma (decisión previa de Miguel)

- ES: "Desarrollador de Software | LLMs, RAG, MCP y agentes de IA"
- EN: "Full Stack AI Developer"

Distintos a propósito: encajan con cada mercado. El hero repite el del idioma activo.

## Decisiones tomadas (2026-11-12)

- **Contacto:** todo visible: correo, WhatsApp (número del CV), LinkedIn y GitHub. Las
  referencias no se publican.
- **Formulario:** no en la v1. Con cuatro vías directas el formulario añade spam, un servicio
  de correo y un backend por mantener, y casi no suma. Si se quiere después: función de Vercel,
  un proveedor de correo y protección anti-bots.
- **Alojamiento:** Vercel, con dominio propio `miguelzuluaga.dev` (registrado en Cloudflare, 2026-11-24). Las
  direcciones `.vercel.app` anteriores redirigen al dominio nuevo (`next.config.ts`).
- **Agente Experto Wi-Fi:** se puede mostrar todo lo del repositorio.
- **Foto:** esta versión no lleva; el CV ya se mantiene sin foto.

## Pendientes

1. **Paleta y tipografía:** elegir con el artefacto de paleta (`docs/02-direccion-visual.md`).
2. **Dirección C:** dónde corre el backend del mini-agente (ruta de Next o el FastAPI de
   Cautelia), qué modelo y cuál es el tope mensual de gasto. Se decide después de A.
3. **Dominio:** cuando haya uno, actualizar `hreflang`, sitemap y metadatos.

## Stack acotado (2026-11-13, decisión de Miguel)

Stack pasó de 45 a 38 tecnologías (39 en EN): se volvió a incluir Java y Spring Boot y se quitó JavaScript (queda TypeScript), por pedido de Miguel. Criterio: lo que se afirma en "Lo que uso" debe poder
explicarse en dos minutos con un ejemplo propio. Se quitaron 6 de las 8 que solo vienen de proyectos
académicos (Django, Bootstrap, Pygame, n8n, AWS, API de Wompi; Java y Spring Boot se quedaron): siguen visibles en
"Trabajo anterior", junto a su proyecto. El CV conserva la lista completa (lo leen filtros por
palabras clave). Pendiente de Miguel: decidir sobre las que no aparecen en otra parte de la página
(Skills y Judge System, Function Calling, SQLAlchemy, pytest, Vitest, Playwright).
