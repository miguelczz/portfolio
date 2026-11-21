/**
 * Datos que no cambian con el idioma: enlaces, fechas y la geometría de las
 * trazas. El texto de cada idioma vive en `es.ts` y `en.ts`.
 */

export const person = {
  name: "Miguel Zuluaga",
  email: "miguelzuluaga201@gmail.com",
  phoneDisplay: "+57 311 293 9462",
  whatsappUrl: "https://wa.me/573112939462",
  linkedinUrl: "https://www.linkedin.com/in/miguelzuluaga",
  githubUrl: "https://github.com/miguelczz",
} as const;

export const links = {
  cauteliaDemo: "https://cautelia.app",
  cauteliaRepo: "https://github.com/miguelczz/cautelia",
  issi: "https://issiagent.com",
  wifiRepo: "https://github.com/miguelczz/wifi_expert_agent",
  talky: "https://github.com/miguelczz/Talky",
  kakureya: "https://github.com/miguelczz/Kakureya",
  forest: "https://github.com/miguelczz/ForestCustodian",
  efset: "https://cert.efset.org/en/YNg43c",
} as const;

/** Tecnologías que se muestran en la fila de cada caso de la portada. */
export const caseTags = {
  issi: ["Next.js", "FastAPI", "PostgreSQL", "Keycloak"],
  cautelia: ["LangGraph", "FastAPI", "PostgreSQL", "MCP"],
  wifi: ["LiteLLM", "Qdrant", "MCP", "FastAPI"],
} as const;

export type JobId = "threec" | "tigo" | "audit";

/** Meses inclusivos, formato AAAA-MM. Fuente: CV (corregido el 2026-11-12). */
export const jobDates: Record<JobId, { start: string; end: string }> = {
  threec: { start: "2026-04", end: "2026-10" },
  tigo: { start: "2025-10", end: "2026-04" },
  audit: { start: "2024-02", end: "2025-08" },
};

/** Eje de la línea de tiempo: tres años calendario completos. */
export const axis = { startYear: 2024, years: 3 } as const;

export type SpanKind = "root" | "ok" | "fail";
export type SpanSpec<K extends string> = {
  key: K;
  depth: 0 | 1 | 2;
  /** Posición y ancho en %, ilustrativos: no son tiempos medidos. */
  start: number;
  width: number;
  kind: SpanKind;
};

export type TurnKey =
  | "turn"
  | "guardIn"
  | "agent"
  | "caseFlow"
  | "rules"
  | "policy"
  | "adjuster"
  | "guardOut";
export type OffTopicKey = "turn" | "guardIn";

export const turnSpans: readonly SpanSpec<TurnKey>[] = [
  { key: "turn", depth: 0, start: 0, width: 100, kind: "root" },
  { key: "guardIn", depth: 1, start: 1, width: 9, kind: "ok" },
  { key: "agent", depth: 1, start: 11, width: 22, kind: "ok" },
  { key: "caseFlow", depth: 1, start: 34, width: 28, kind: "ok" },
  { key: "rules", depth: 2, start: 37, width: 9, kind: "ok" },
  { key: "policy", depth: 2, start: 47, width: 12, kind: "ok" },
  { key: "adjuster", depth: 1, start: 63, width: 24, kind: "ok" },
  { key: "guardOut", depth: 1, start: 88, width: 11, kind: "ok" },
];

export const offTopicSpans: readonly SpanSpec<OffTopicKey>[] = [
  { key: "turn", depth: 0, start: 0, width: 18, kind: "root" },
  { key: "guardIn", depth: 1, start: 1, width: 16, kind: "fail" },
];

export type WifiStepKey = "capture" | "tshark" | "btm" | "llm" | "store";
export const wifiSteps: readonly WifiStepKey[] = ["capture", "tshark", "btm", "llm", "store"];

export const images = {
  cauteliaBanner: { src: "/projects/cautelia/banner.webp", width: 1600, height: 680 },
  cauteliaHome: { src: "/projects/cautelia/home.webp", width: 1440, height: 900 },
  issi: { src: "/projects/issi/issi-landing.webp", width: 1440, height: 900 },
  wifiChart: { src: "/projects/wifi/band_chart.webp", width: 1437, height: 1095 },
  wifiObservability: { src: "/projects/wifi/observability.webp", width: 1800, height: 1125 },
} as const;
