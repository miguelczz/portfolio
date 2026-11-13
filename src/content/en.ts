import type { Content } from "./types";

/*
 * Sources: English CV (corrected 2026-11-12), Cautelia README read on 2026-11-12
 * (run of 2026-10-15) and the Wi-Fi Expert Agent README.
 * Every figure carries its source in this comment or next to the data.
 */
export const en: Content = {
  meta: {
    title: "Miguel Zuluaga | Full Stack AI Developer",
    description:
      "Full Stack AI Developer in Medellín, Colombia. AI agent systems in production: LLMs, RAG, MCP, backend, interface and infrastructure.",
    ogLocale: "en_US",
    skip: "Skip to content",
  },
  nav: {
    work: "Work",
    experience: "Experience",
    stack: "Stack",
    contact: "Contact",
    switchTo: "Español",
    switchHref: "/es",
    theme: "Toggle theme",
    home: "Home",
  },
  hero: {
    title: "Full Stack AI Developer",
    stackline: "LLMs, RAG, MCP and AI agents",
    statement:
      "Building and operating AI agent systems in production: orchestration, backend, interface and infrastructure.",
    ctaWork: "See the work",
    ctaContact: "Contact",
    aboutLabel: "About",
    about: [
      "Experience at a multi-tenant SaaS with AI agents over WhatsApp (3C Community), building LLM agents for technical processes (Tigo Colombia) and automating data work for auditing (Audit Integral Advisors).",
      "Self-taught, focused on code quality, operational security and what happens after the demo: evaluating and observing agents in production, and tests that catch real regressions.",
    ],
    facts: [
      { label: "Location", value: "Medellín, Colombia" },
      { label: "Education", value: "Software Engineering, sixth semester (in progress)" },
      { label: "Languages", value: "Spanish native, English C1 (EF SET certified)" },
      { label: "Recognition", value: "Best Capstone Project in three different semesters" },
    ],
  },
  work: {
    heading: "Work",
    kicker: "3 cases",
    labels: {
      stack: "Stack",
      decision: "Core decision",
      fails: "How it fails",
      facts: "In numbers and controls",
      scope: "Scope",
      illustrative: "Illustrative order, not measured timings.",
      context: "Context",
    },
    cautelia: {
      name: "Cautelia",
      year: "2026",
      tagline:
        "AI agent that takes car-accident reports and answers questions about the auto policy, by chat or by voice, in Spanish and English.",
      context:
        "Portfolio project. The three insurers, their policies and every person shown are fictional.",
      decision:
        "A language model reads each message but can only propose actions from a closed list. Code validates them against the case, and each insurer's rules, which are versioned files, decide where the case goes. Coverage decisions belong to a separate AI adjuster that shows its steps and the sources for each one.",
      stack:
        "React, TypeScript, FastAPI, Python, LangGraph, Claude, PostgreSQL (RLS, pgvector), Deepgram, Cartesia, Langfuse, input and output guardrails, custom MCP server, Docker, Google Cloud Run",
      facts: [
        "More than 4,000 automated tests with an 80% coverage floor.",
        "Insurers isolated with row-level security, and a test that fails if any table lacks it.",
        "Hard spending limits: prepaid balances, an application-level ceiling and daily limits per visitor.",
      ],
      failsLines: [
        "Evaluation: 258 cases recorded in the latest full run (October 15, 2026). None failed.",
        "Chat latency, from the moment the server receives the message to the first word: p50 1.6 s and p95 2.3 s in Spanish (87 turns); p50 1.5 s and p95 2.2 s in English (85 turns).",
        "Voice latency: not measured.",
        "It is not connected to any real insurer. Voice works in the browser only, with a daily call limit.",
      ],
      failsSource:
        "Source: Cautelia README, generated from the run of October 15, 2026 and read on November 12, 2026.",
      traceHeading: "How a message travels",
      turn: {
        title: "One turn: reporting a crash",
        spans: {
          turn: { label: "turn", note: "" },
          guardIn: {
            label: "input guard",
            note: "Recognizes orders to ignore the rules and off-topic messages before any model is called.",
          },
          agent: {
            label: "agent (Claude)",
            note: "Understands the message and writes the reply. It can only propose actions from a closed list.",
          },
          caseFlow: {
            label: "case workflow (LangGraph)",
            note: "Code validates every proposed action against the case, along a fixed workflow.",
          },
          rules: {
            label: "insurer rules",
            note: "Versioned files, one per insurer, each rule with its own test. The rules, not the model, decide where the case goes.",
          },
          policy: {
            label: "policy search (pgvector)",
            note: "Cites the exact clause. A verifier checks that it exists, belongs to that policy and is in force.",
          },
          adjuster: {
            label: "AI adjuster",
            note: "Takes the cases the rules do not close, decides and explains each step. The agent never decides coverage or payments.",
          },
          guardOut: {
            label: "output guard",
            note: "Checks every message, in both languages, before the person sees it.",
          },
        },
      },
      offTopic: {
        title: "Another turn: a question unrelated to insurance",
        spans: {
          turn: { label: "turn", note: "" },
          guardIn: {
            label: "input guard",
            note: "Answers with a fixed phrase from the catalog, in both languages, with no second model call.",
          },
        },
      },
      shotBanner: {
        alt: "Two cars with copper and blue headlights drive through the night on a wet road",
        caption: "Cautelia cover art",
      },
      shotHome: {
        alt: "Cautelia home screen with the three fictional insurers and the buttons to chat, call or view policies",
        caption: "Home: pick an insurer and report by chat or by voice",
      },
      demo: "Try the demo",
      repo: "View the code",
    },
    issi: {
      name: "ISSI HR",
      year: "2026",
      tagline:
        "Multi-tenant SaaS platform for recruitment and employee management, with automated WhatsApp conversations.",
      context:
        "Built and operated at 3C Community, from April to October 2026. The product belongs to the company.",
      points: [
        "Job postings, AI-powered CV screening, performance management and internal communication.",
        "Automated candidate and employee conversations over WhatsApp, with AI agents and semantic CV ranking.",
        "Identity and access control with Keycloak (OIDC), and per-tenant data isolation with PostgreSQL Row Level Security.",
        "Continuous deployment to production with Docker and GitHub Actions.",
      ],
      stack:
        "Next.js, TypeScript, FastAPI, Python, PostgreSQL (RLS), Redis, Celery, Qdrant, Keycloak, Backblaze B2, Cloudflare Tunnel, Docker, Hetzner, GitHub Actions, WhatsApp APIs (Meta/Twilio), RAG, LiteLLM, multi-agent system, Langfuse",
      scope:
        "Only the home page is shown. The internal screens and the architecture belong to 3C Community.",
      shot: {
        alt: "Public home page of ISSI HR",
        caption: "Public home page of ISSI HR",
      },
      visit: "Visit the page",
    },
    wifi: {
      name: "Wi-Fi Expert Agent",
      year: "2026",
      tagline:
        "Multi-agent, multimodal web analyzer that turns Wireshark captures into roaming and Band Steering diagnostics (802.11k/v/r).",
      context:
        "The source code is private and belongs to Tigo Colombia. The public repository shows the architecture and screenshots of the system.",
      decision:
        "A dispatcher classifies each query before processing it and routes between Groq (Llama 3.3), Gemini 2.0 Flash and GPT-4o by cost and quality. Every operation records cost, latency and trace per model.",
      stack:
        "React, TailwindCSS, FastAPI, Python, TShark, Qdrant, Redis, LiteLLM (Groq/Gemini/OpenAI), MCP, Langfuse, FalkorDB, Docker",
      pipelineHeading: "What happens to a capture",
      hint: "Move the cursor over the illustration: close to the router, the client steers to 5 GHz (Band Steering).",
      steps: {
        capture: {
          label: "capture .pcap / .pcapng",
          note: "The user uploads the file and picks the vendor, project and client MAC address.",
        },
        tshark: {
          label: "tshark",
          note: "Extracts the 802.11 frames: beacons, BTM, association, reassociation and deauthentication.",
        },
        btm: {
          label: "BTM analyzer",
          note: "Computes the Band Steering metrics: transition latency, acceptance rate and 802.11k/v/r verification.",
        },
        llm: {
          label: "LLM analysis",
          note: "Evaluates compliance, identifies anomalies and proposes improvements.",
        },
        store: {
          label: "persistence in three databases",
          note: "PostgreSQL for the analysis, Qdrant for semantic search and FalkorDB for the topology.",
        },
      },
      shotChart: {
        alt: "RSSI signal chart over time with the switches between the 2.4 and 5 GHz bands and the BTM events",
        caption: "Band changes across the capture, with the BTM events",
      },
      shotObservability: {
        alt: "Observability dashboard with traces, LLM spend and the Pipe assistant chat",
        caption: "Observability: traces, cost and latency per operation",
      },
      repo: "View the repository",
    },
  },
  earlier: {
    heading: "Earlier work",
    kicker: "Award-winning",
    items: [
      {
        id: "talky",
        name: "Talky",
        year: "2025",
        description:
          "Educational virtual assistant for practicing basic English through conversation and guided lessons.",
        stack: "React, Java Spring Boot, N8N, AWS, TailwindCSS",
        award: "Best Capstone Project, fourth semester",
      },
      {
        id: "kakureya",
        name: "Kakureya",
        year: "2025",
        description:
          "Web application for managing orders and deliveries for a Japanese food delivery service.",
        stack: "Python, Django, JavaScript, Bootstrap, AWS, Wompi API, PostgreSQL",
        award: "Best Capstone Project, third semester",
      },
      {
        id: "forest",
        name: "Forest Custodian",
        year: "2024",
        description:
          "2D video game promoting environmental awareness through educational mechanics and symbolic challenges.",
        stack: "Python, Pygame",
        award: "Best Capstone Project, first semester",
      },
    ],
  },
  experience: {
    heading: "Experience",
    kicker: "2024 to 2026",
    chartLabel: "Each bar is a job, on a three-year timeline.",
    jobs: {
      threec: {
        role: "Software Developer",
        company: "3C Community S.A.S.",
        place: "Remote",
        bullets: [
          "Development and operation of a multi-tenant B2B SaaS platform for Colombian SMEs, covering recruitment, employee management and performance reviews.",
          "Automated candidate and employee conversations over WhatsApp, with AI agents and semantic CV ranking.",
          "Identity and access control with Keycloak (OIDC) and per-tenant data isolation with PostgreSQL Row Level Security.",
          "Continuous deployment to production with Docker and GitHub Actions.",
        ],
      },
      tigo: {
        role: "Software Developer Intern",
        company: "Tigo Colombia",
        place: "Medellín, on-site",
        bullets: [
          "Designed intelligent agents using LLMs to automate complex technical processes.",
          "Implemented following Clean Architecture, keeping the domain separate from infrastructure.",
          "Multi-model orchestration with automatic fallback to ensure service reliability.",
        ],
      },
      audit: {
        role: "Technology Development Assistant",
        company: "Audit Integral Advisors S.A.S.",
        place: "Remote",
        bullets: [
          "Developed technology solutions and automated internal processes.",
          "Data extraction and visualization in Python for auditing and organizational management information systems.",
        ],
      },
    },
  },
  stack: {
    heading: "Stack",
    kicker: "What I use",
    groups: [
      {
        label: "Languages and frameworks",
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
        label: "AI and agents",
        items: [
          "Multi-agent systems",
          "Skills and Judge System architecture",
          "Model Context Protocol (MCP)",
          "Function Calling",
          "Agentic Tools",
          "RAG",
          "LangChain / LangGraph",
          "LiteLLM",
          "Langfuse",
          "Voice AI (Deepgram, Cartesia)",
          "Guardrails",
          "LLM and agent evaluation",
        ],
      },
      {
        label: "Data",
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
        label: "DevOps and tools",
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
          "WhatsApp APIs (Meta/Twilio)",
          "Wompi API",
          "Google Cloud Run",
        ],
      },
    ],
    education: {
      heading: "Education",
      items: [
        { degree: "Software Engineering, in progress (sixth semester)", school: "Corporación Universitaria Minuto de Dios" },
        { degree: "Information Systems Programming Technician", school: "Politécnico Colombiano Jaime Isaza Cadavid" },
      ],
    },
    languages: {
      heading: "Languages",
      items: ["Spanish: native", "English: C1 Advanced (EF SET certificate, 61/100)"],
      certificate: "View EF SET certificate",
    },
  },
  contact: {
    heading: "Contact",
    lead: "Write to me through whichever channel you prefer.",
    rows: { email: "Email", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub" },
    copy: "Copy",
    copied: "Copied",
  },
  footer: "Medellín, Colombia",
};
