import type { Content } from "./types";

/*
 * Fuentes: CV en español (corregido el 2026-11-12), README de Cautelia leído el
 * 2026-11-12 (corrida del 2026-10-15) y README del Agente Experto Wi-Fi.
 * Todo número lleva su fuente en este comentario o junto al dato.
 */
export const es: Content = {
  meta: {
    title: "Miguel Zuluaga | Desarrollador de Software",
    description:
      "Desarrollador de Software en Medellín, Colombia. Sistemas de agentes de IA en producción: LLMs, RAG, MCP, backend, interfaz e infraestructura.",
    ogLocale: "es_CO",
    skip: "Saltar al contenido",
  },
  nav: {
    about: "Sobre mí",
    work: "Trabajo",
    experience: "Experiencia",
    stack: "Stack",
    contact: "Contacto",
    switchTo: "English",
    switchHref: "/en",
    theme: "Cambiar tema",
    home: "Inicio",
    cv: "CV",
    cvLabel: "Descargar CV en PDF",
    cvHref: "/cv/miguel-zuluaga-cv-es.pdf",
  },
  hero: {
    title: "Desarrollador de Software",
    stackline: "LLMs, RAG, MCP y agentes de IA",
    ctaWork: "Ver el trabajo",
    ctaContact: "Contacto",
    scroll: "Desplázate",
    aboutLabel: "Sobre mí",
    photoAlt: "Retrato de Miguel Zuluaga",
    about: [
      "Sistemas de agentes de IA, del modelo al despliegue.",
      "Soy Miguel, Desarrollador de Software en Medellín. Creo sistemas de agentes de IA de principio a fin: orquestación con LLMs, backend, interfaz e infraestructura, con arquitectura limpia, pruebas y despliegue continuo a producción.",
      "Convierto procesos que hoy se hacen a mano, como revisar hojas de vida o analizar una captura de red, en agentes de IA con límites claros. Más de 2 años de experiencia profesional, proyectos en producción y tres proyectos premiados como el mejor de su semestre.",
    ],
    quote: {
      text: "Solo podemos ver un trecho corto hacia adelante, pero allí vemos mucho por hacer.",
      by: "Alan Turing, Computing Machinery and Intelligence, 1950 (traducción libre)",
    },
  },
  work: {
    heading: "Trabajo",
    kicker: "3 casos",
    labels: {
      stack: "Stack",
      decision: "Decisión central",
      fails: "Cómo falla",
      facts: "En números y controles",
      context: "Contexto",
      viewCase: "Ver caso",
      back: "Volver al trabajo",
      nextCase: "Siguiente caso",
    },
    cautelia: {
      name: "Cautelia",
      year: "2026",
      tagline:
        "Agente de IA que atiende reportes de choques y preguntas sobre la póliza, por chat o por voz, en español e inglés.",
      context:
        "Proyecto de portafolio. Las tres aseguradoras, sus pólizas y las personas que aparecen son ficticias.",
      decision:
        "Un modelo de lenguaje entiende cada mensaje, pero solo puede proponer acciones de una lista cerrada. El código las valida contra el caso, y las reglas de cada aseguradora, que son archivos versionados, deciden el rumbo. Las decisiones de cobertura las toma un ajustador de IA separado, que muestra sus pasos y las fuentes de cada uno.",
      stack:
        "React, TypeScript, FastAPI, Python, LangGraph, Claude Haiku 5.5, PostgreSQL (RLS, pgvector), Deepgram, Cartesia, Langfuse, guardrails de entrada y salida, servidor MCP propio, Docker, Google Cloud Run",
      facts: [
        "Más de 4.000 pruebas automáticas con un piso de cobertura del 80 %.",
        "Aseguradoras aisladas con seguridad a nivel de fila, y una prueba que falla si alguna tabla no la tiene.",
        "Gasto con límites firmes: saldos prepagados, un tope en la aplicación y límites diarios por visitante.",
      ],
      failsLines: [
        "Evaluación: 258 casos registrados en la última corrida completa (15 de octubre de 2026). Ninguno falló.",
        "Latencia del chat, desde que el servidor recibe el mensaje hasta la primera palabra: p50 1,6 s y p95 2,3 s en español (87 turnos); p50 1,5 s y p95 2,2 s en inglés (85 turnos).",
        "Latencia de voz: no medida.",
        "No está conectada a ninguna aseguradora real. La voz funciona solo en el navegador, con un límite de llamadas por día.",
      ],
      traceHeading: "Cómo viaja un mensaje",
      turn: {
        title: "Un turno: reporte de un choque",
        spans: {
          turn: { label: "turno", note: "" },
          guardIn: {
            label: "guardia de entrada",
            note: "Reconoce órdenes de ignorar las reglas y mensajes fuera de tema antes de llamar a ningún modelo.",
          },
          agent: {
            label: "agente (Claude Haiku 5.5)",
            note: "Entiende el mensaje y redacta la respuesta. Solo puede proponer acciones de una lista cerrada.",
          },
          caseFlow: {
            label: "flujo del caso (LangGraph)",
            note: "El código valida cada acción propuesta contra el caso, en un flujo fijo.",
          },
          rules: {
            label: "reglas de la aseguradora",
            note: "Archivos versionados, uno por aseguradora, cada regla con su prueba. Las reglas, no el modelo, deciden hacia dónde va el caso.",
          },
          policy: {
            label: "búsqueda en la póliza (pgvector)",
            note: "Cita la cláusula exacta. Un verificador comprueba que existe, que es de esa póliza y que está vigente.",
          },
          adjuster: {
            label: "ajustador de IA",
            note: "Toma los casos que las reglas no cierran, decide y explica cada paso. La agente nunca decide cobertura ni pagos.",
          },
          guardOut: {
            label: "guardia de salida",
            note: "Revisa cada mensaje, en los dos idiomas, antes de que lo vea la persona.",
          },
        },
      },
      offTopic: {
        title: "Otro turno: pregunta ajena a la aseguradora",
        spans: {
          turn: { label: "turno", note: "" },
          guardIn: {
            label: "guardia de entrada",
            note: "Responde con una frase fija del catálogo, en los dos idiomas, sin una segunda llamada al modelo.",
          },
        },
      },
      shotBanner: {
        alt: "Dos carros con faros cobre y azul avanzan de noche por una carretera mojada",
        caption: "Portada de Cautelia",
      },
      shotHome: {
        alt: "Pantalla de inicio de Cautelia con las tres aseguradoras ficticias y los botones para chatear, llamar o ver pólizas",
        caption: "Inicio: elegir aseguradora y reportar por chat o por voz",
      },
      demo: "Probar la demo",
      repo: "Ver el código",
    },
    issi: {
      name: "ISSI HR",
      year: "2026",
      tagline:
        "Plataforma SaaS multiempresa de reclutamiento y gestión de empleados, con la conversación por WhatsApp automatizada.",
      context:
        "Construida y operada en 3C Community, de abril a octubre de 2026. El producto pertenece a la empresa.",
      points: [
        "Vacantes, análisis de hojas de vida con IA, evaluación de desempeño, clima organizacional y comunicación interna.",
        "Conversación con candidatos y empleados por WhatsApp, con agentes de IA y ranking semántico de hojas de vida.",
        "Identidad y control de accesos con Keycloak (OIDC), y aislamiento de datos por empresa con Row Level Security de PostgreSQL.",
        "Despliegue continuo a producción con Docker y GitHub Actions.",
      ],
      stack:
        "Next.js, TypeScript, FastAPI, Python, PostgreSQL (RLS), Redis/Celery, Qdrant, Keycloak, Backblaze B2, Cloudflare Tunnel, Hetzner, Docker, GitHub Actions, APIs de WhatsApp (Meta/Twilio), RAG, LiteLLM, multiagente, Langfuse",
      scope:
        "Solo se muestra la página de inicio. Las pantallas internas y la arquitectura pertenecen a 3C Community.",
      shot: {
        alt: "Página de inicio pública de ISSI HR",
        caption: "Página de inicio pública de ISSI HR",
      },
      visit: "Ver la página",
    },
    wifi: {
      name: "Agente Experto Wi-Fi",
      year: "2026",
      tagline:
        "Analizador web multiagente y multimodal que convierte capturas de Wireshark en diagnósticos de roaming y Band Steering (802.11k/v/r).",
      context:
        "El código fuente es privado y pertenece a Tigo Colombia. El repositorio público muestra la arquitectura y capturas del sistema.",
      decision:
        "Un despachador clasifica cada consulta antes de procesarla y enruta entre Groq (Llama 3.3), Gemini 2.0 Flash y GPT-4o según costo y calidad. Cada operación registra costo, latencia y traza por modelo.",
      stack:
        "React, TailwindCSS, FastAPI, Python, TShark, Qdrant, Redis, LiteLLM (Groq/Gemini/OpenAI), MCP, Langfuse, FalkorDB, Docker",
      pipelineHeading: "Qué pasa con una captura",
      steps: {
        capture: {
          label: "captura .pcap / .pcapng",
          note: "El usuario sube el archivo y elige fabricante, proyecto y dirección MAC del cliente.",
        },
        tshark: {
          label: "tshark",
          note: "Extrae las tramas 802.11: balizas, BTM, asociación, reasociación y desautenticación.",
        },
        btm: {
          label: "analizador de BTM",
          note: "Calcula las métricas de Band Steering: latencia de transición, tasa de aceptación y verificación de 802.11k/v/r.",
        },
        llm: {
          label: "análisis con LLM",
          note: "Evalúa el cumplimiento, identifica anomalías y propone mejoras.",
        },
        store: {
          label: "persistencia en tres bases",
          note: "PostgreSQL para el análisis, Qdrant para la búsqueda semántica y FalkorDB para la topología.",
        },
      },
      shotChart: {
        alt: "Gráfica de la señal RSSI en el tiempo con los cambios entre las bandas de 2,4 y 5 GHz y los eventos BTM (BSS Transition Management)",
        caption: "Cambios de banda a lo largo de la captura, con los eventos BTM (BSS Transition Management, 802.11v)",
      },
      shotObservability: {
        alt: "Panel de observabilidad con trazas, inversión en LLM y el chat del asistente Pipe",
        caption: "Observabilidad: trazas, costo y latencia por operación",
      },
      repo: "Ver el repositorio",
    },
  },
  earlier: {
    heading: "Trabajo anterior",
    kicker: "Premiados",
    items: [
      {
        id: "talky",
        name: "Talky",
        year: "2025",
        description:
          "Asistente virtual educativo para practicar inglés básico con interacción conversacional y lecciones guiadas.",
        stack: "React, Java Spring Boot, N8N, AWS, TailwindCSS",
        award: "Mejor Proyecto Pedagógico Integrador, cuarto semestre",
      },
      {
        id: "kakureya",
        name: "Kakureya",
        year: "2025",
        description:
          "Aplicación web para la gestión de pedidos y despachos de comida japonesa a domicilio.",
        stack: "Python, Django, JavaScript, Bootstrap, AWS, API de Wompi, PostgreSQL",
        award: "Mejor Proyecto Pedagógico Integrador, tercer semestre",
      },
      {
        id: "forest",
        name: "Forest Custodian",
        year: "2024",
        description:
          "Videojuego 2D que promueve la conciencia ambiental mediante dinámicas educativas y retos simbólicos.",
        stack: "Python, Pygame",
        award: "Mejor Proyecto Pedagógico Integrador, primer semestre",
      },
    ],
  },
  experience: {
    heading: "Experiencia",
    kicker: "2024 a 2026",
    chartLabel: "Cada barra es un empleo, sobre una línea de tiempo de tres años.",
    more: "Ver más",
    less: "Ver menos",
    jobs: {
      threec: {
        role: "Desarrollador de Software",
        company: "3C Community S.A.S.",
        place: "Remoto",
        bullets: [
          "Desarrollo y operación de un SaaS B2B multiempresa para MiPymes colombianas: selección de personal, gestión de empleados, evaluación de desempeño y clima organizacional.",
          "Automatización de la conversación con candidatos y empleados por WhatsApp, con agentes de IA y ranking semántico de hojas de vida.",
          "Identidad y control de accesos con Keycloak (OIDC) y aislamiento de datos por empresa con Row Level Security de PostgreSQL.",
          "Despliegue continuo a producción con Docker y GitHub Actions.",
        ],
      },
      tigo: {
        role: "Desarrollador de Software, prácticas profesionales",
        company: "Tigo Colombia",
        place: "Medellín, presencial",
        bullets: [
          "Diseño de agentes inteligentes con LLMs para automatizar procesos técnicos complejos.",
          "Implementación bajo Clean Architecture, separando el dominio de la infraestructura.",
          "Orquestación multimodelo con fallback automático para garantizar la resiliencia del servicio.",
        ],
      },
      audit: {
        role: "Asistente de Desarrollo Tecnológico",
        company: "Audit Integral Advisors S.A.S.",
        place: "Remoto",
        bullets: [
          "Desarrollo de soluciones tecnológicas y automatización de procesos internos de la empresa.",
          "Extracción y procesamiento de datos con Python para sistemas de información de auditoría y gestión organizacional.",
          "Análisis desarrollados y documentados en Jupyter Notebook, con código, resultados y explicaciones en un mismo entorno.",
          "Visualización de datos en Jupyter Notebook para apoyar el análisis y la toma de decisiones en los procesos de auditoría.",
          "Automatización de tareas repetitivas de recolección y consolidación de información, con menos trabajo manual y menos errores.",
          "Presentación de resultados claros a los equipos de auditoría y de gestión organizacional para facilitar su interpretación.",
        ],
      },
    },
  },
  stack: {
    heading: "Stack",
    kicker: "Lo que uso",
    groups: [
      {
        label: "Lenguajes y frameworks",
        items: [
          "Python",
          "TypeScript",
          "Java",
          "SQL",
          "FastAPI",
          "Spring Boot",
          "React",
          "Next.js",
          "TailwindCSS",
        ],
      },
      {
        label: "IA y agentes",
        items: [
          "Sistemas multiagente",
          "Skills, Tools y Judge System",
          "Model Context Protocol (MCP)",
          "Function Calling",
          "RAG",
          "LangChain / LangGraph",
          "LiteLLM",
          "Langfuse",
          "IA de voz (Deepgram, Cartesia)",
          "Guardrails",
          "Evaluación de LLMs y de agentes",
        ],
      },
      {
        label: "Datos",
        items: [
          "PostgreSQL (Row Level Security)",
          "SQLAlchemy",
          "Qdrant",
          "FalkorDB",
          "Redis",
          "Celery",
          "pgvector",
          "Jupyter Notebook",
        ],
      },
      {
        label: "DevOps y herramientas",
        items: [
          "Docker",
          "GitHub Actions (CI/CD)",
          "pytest",
          "Vitest",
          "Playwright",
          "Keycloak (OIDC)",
          "Cloudflare",
          "TShark (Wireshark)",
          "APIs de WhatsApp (Meta/Twilio)",
          "Google Cloud Run",
        ],
      },
    ],
    education: {
      heading: "Educación",
      items: [
        { degree: "Ingeniería de Software, en curso (sexto semestre)", school: "Corporación Universitaria Minuto de Dios" },
        { degree: "Técnico en Programación de Sistemas de Información", school: "Politécnico Colombiano Jaime Isaza Cadavid" },
        { degree: "Full Stack Web Developer, de febrero a julio de 2023", school: "Henry" },
      ],
    },
    languages: {
      heading: "Idiomas",
      items: ["Español: nativo", "Inglés: C1 avanzado (certificado EF SET, 61/100)"],
      certificate: "Ver certificado EF SET",
    },
  },
  contact: {
    heading: "Contacto",
    lead: "Escríbeme por el medio que prefieras.",
    hello: "Hola!",
    rows: { email: "Correo", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub" },
    copy: "Copiar",
    copied: "Copiado",
  },
  footer: "Medellín, Colombia",
};
