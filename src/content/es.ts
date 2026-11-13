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
    work: "Trabajo",
    experience: "Experiencia",
    stack: "Stack",
    contact: "Contacto",
    switchTo: "English",
    switchHref: "/en",
    theme: "Cambiar tema",
    home: "Inicio",
  },
  hero: {
    title: "Desarrollador de Software",
    stackline: "LLMs, RAG, MCP y agentes de IA",
    statement:
      "Construcción y operación de sistemas de agentes de IA en producción: orquestación, backend, interfaz e infraestructura.",
    ctaWork: "Ver el trabajo",
    ctaContact: "Contacto",
    aboutLabel: "Sobre mí",
    about: [
      "Experiencia en un SaaS multiempresa con agentes de IA por WhatsApp (3C Community), en agentes con LLMs para procesos técnicos (Tigo Colombia) y en automatización de datos para auditoría (Audit Integral Advisors).",
      "Autodidacta, con foco en la calidad del código, la seguridad operativa y en lo que pasa después de la demo: la evaluación y la observabilidad de los agentes en producción, y pruebas que detectan regresiones reales.",
    ],
    facts: [
      { label: "Ubicación", value: "Medellín, Colombia" },
      { label: "Estudios", value: "Ingeniería de Software, sexto semestre (en curso)" },
      { label: "Idiomas", value: "Español nativo, inglés C1 (certificado EF SET)" },
      { label: "Reconocimientos", value: "Mejor Proyecto Pedagógico Integrador en tres semestres" },
    ],
  },
  work: {
    heading: "Trabajo",
    kicker: "3 casos",
    labels: {
      stack: "Stack",
      decision: "Decisión central",
      fails: "Cómo falla",
      facts: "En números y controles",
      scope: "Alcance",
      illustrative: "Orden ilustrativo, no son tiempos medidos.",
      context: "Contexto",
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
        "React, TypeScript, FastAPI, Python, LangGraph, Claude, PostgreSQL (RLS, pgvector), Deepgram, Cartesia, Langfuse, guardrails de entrada y salida, servidor MCP propio, Docker, Google Cloud Run",
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
      failsSource:
        "Fuente: README de Cautelia, generado desde la corrida del 15 de octubre de 2026 y leído el 12 de noviembre de 2026.",
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
            label: "agente (Claude)",
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
        "Vacantes, análisis de hojas de vida con IA, evaluación de desempeño y comunicación interna.",
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
      hint: "Mueve el cursor sobre la ilustración: cerca del router, el cliente pasa a 5 GHz (Band Steering).",
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
        alt: "Gráfica de la señal RSSI en el tiempo con los cambios entre las bandas de 2,4 y 5 GHz y los eventos BTM",
        caption: "Cambios de banda a lo largo de la captura, con los eventos BTM",
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
    jobs: {
      threec: {
        role: "Desarrollador de Software",
        company: "3C Community S.A.S.",
        place: "Remoto",
        bullets: [
          "Desarrollo y operación de un SaaS B2B multiempresa para MiPymes colombianas: selección de personal, gestión de empleados y evaluación de desempeño.",
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
          "Desarrollo de soluciones tecnológicas y automatización de procesos internos.",
          "Extracción y visualización de datos en Python para sistemas de información de auditoría y gestión organizacional.",
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
          "JavaScript",
          "Java",
          "SQL",
          "FastAPI",
          "Django",
          "Spring Boot",
          "React",
          "Next.js",
          "TailwindCSS",
          "Bootstrap",
          "Pygame",
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
          "AWS",
          "Cloudflare",
          "n8n",
          "TShark (Wireshark)",
          "APIs de WhatsApp (Meta/Twilio)",
          "API de Wompi",
          "Google Cloud Run",
        ],
      },
    ],
    education: {
      heading: "Educación",
      items: [
        { degree: "Ingeniería de Software, en curso (sexto semestre)", school: "Corporación Universitaria Minuto de Dios" },
        { degree: "Técnico en Programación de Sistemas de Información", school: "Politécnico Colombiano Jaime Isaza Cadavid" },
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
    rows: { email: "Correo", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub" },
    copy: "Copiar",
    copied: "Copiado",
  },
  footer: "Medellín, Colombia",
};
