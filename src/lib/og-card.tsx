import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactElement, ReactNode } from "react";
import { CarsArt } from "@/components/art/CarsArt";
import { HiringArt } from "@/components/art/HiringArt";
import { WifiArt } from "@/components/art/WifiArt";

/**
 * Imágenes de vista previa (LinkedIn, Discord, WhatsApp, TechToJob). Se ven como el propio sitio: fondo
 * oscuro, el nombre enorme en la misma Archivo condensada del héroe y nada más (sin etiquetas ni adornos).
 * La portada lleva al robot; cada caso, su ilustración. Se generan al construir el sitio.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const color = {
  bg: "#0e1015",
  surface: "#161920",
  ink: "#e8eaf0",
  ink2: "#9ba1b0",
  line: "#262a35",
  accent: "#7c95f5",
  alert: "#f0733a",
  onAccent: "#0e1015",
} as const;
const fontDir = join(process.cwd(), "src/app/fonts/og");

async function render(content: ReactElement) {
  const [heavy, semi, medium] = await Promise.all([
    readFile(join(fontDir, "Archivo-Condensed800.ttf")),
    readFile(join(fontDir, "Archivo-Condensed600.ttf")),
    readFile(join(fontDir, "Archivo-Medium.ttf")),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 0 0 84px",
          color: color.ink,
          fontFamily: "Archivo",
          backgroundColor: color.bg,
          backgroundImage: `radial-gradient(circle at 76% 50%, rgba(124,149,245,0.16), rgba(14,16,21,0) 55%)`,
        }}
      >
        {content}
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo", data: heavy, weight: 800, style: "normal" },
        { name: "Archivo", data: semi, weight: 600, style: "normal" },
        { name: "Archivo", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}

/** El robot del héroe, estático (mismas formas que `components/art/Observer`). */
function Robot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400">
      <line x1="200" y1="96" x2="200" y2="54" stroke={color.ink} strokeWidth="6" strokeLinecap="round" />
      <rect x="22" y="190" width="30" height="76" rx="12" fill={color.ink} />
      <rect x="348" y="190" width="30" height="76" rx="12" fill={color.ink} />
      <rect x="52" y="96" width="296" height="244" rx="76" fill={color.surface} stroke={color.ink} strokeWidth="3" />
      <circle cx="200" cy="42" r="16" fill={color.alert} stroke={color.ink} strokeWidth="3" />
      <rect x="88" y="132" width="224" height="158" rx="46" fill={color.bg} stroke={color.ink} strokeWidth="3" />
      <rect x="138" y="164" width="42" height="64" rx="21" fill={color.ink} />
      <rect x="220" y="164" width="42" height="64" rx="21" fill={color.ink} />
      <path d="M172 256 Q200 276 228 256" fill="none" stroke={color.accent} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

type HomeCardProps = { name: string; title: string; stackline: string };

/** Portada: el nombre enorme en dos líneas, el título, las tecnologías y el robot. */
export function homeCard({ name, title, stackline }: HomeCardProps) {
  const [first, ...rest] = name.split(" ");
  return render(
    <>
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, width: 631 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: 800,
            fontSize: 200,
            lineHeight: 0.86,
            letterSpacing: "-0.02em",
          }}
        >
          <span>{first}</span>
          <span>{rest.join(" ")}</span>
        </div>
        <div style={{ display: "flex", marginTop: 38, fontWeight: 800, fontSize: 60, lineHeight: 1 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 22 }}>
          <div style={{ display: "flex", width: 56, height: 4, backgroundColor: color.accent, marginRight: 18 }} />
          <div style={{ display: "flex", fontWeight: 600, fontSize: 30, color: color.accent }}>{stackline}</div>
        </div>
      </div>
      {/* El robot va a continuación, pegado al margen derecho: columna izquierda de ancho fijo y nada que se encoja. */}
      <div style={{ display: "flex", flexShrink: 0, width: 410, height: 410, marginTop: 42 }}>
        <Robot size={410} />
      </div>
    </>,
  );
}

const arts = { issi: HiringArt, cautelia: CarsArt, wifi: WifiArt } as const;
export type OgCaseSlug = keyof typeof arts;

const escapeText = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const attrName = (key: string) => (key === "viewBox" ? key : key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`));

/**
 * Convierte un árbol de elementos de React (las ilustraciones son funciones puras) en texto SVG.
 * No usa `react-dom/server`, que Next no permite aquí. Omite lo que no pinta: `data-*`, `aria-*`,
 * `className`, `style` y `key`.
 */
function toSvg(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return escapeText(String(node));
  if (Array.isArray(node)) return node.map(toSvg).join("");
  const el = node as ReactElement<Record<string, unknown>>;
  if (typeof el.type === "function") return toSvg((el.type as (props: unknown) => ReactNode)(el.props));
  if (typeof el.type === "symbol") return toSvg(el.props.children as ReactNode);
  const { children, ...props } = el.props;
  const attrs = Object.entries(props)
    .filter(([key, value]) => value !== undefined && value !== null && !/^(data-|aria-)/.test(key) && !["className", "style", "focusable", "hidden"].includes(key))
    .map(([key, value]) => ` ${attrName(key)}="${escapeText(String(value)).replace(/"/g, "&quot;")}"`)
    .join("");
  return `<${String(el.type)}${attrs}>${toSvg(children as ReactNode)}</${String(el.type)}>`;
}

/** La ilustración del caso como imagen estática, con los colores del tema oscuro. */
function artDataUri(slug: OgCaseSlug, width: number) {
  const Art = arts[slug];
  const palette: Record<string, string> = {
    ink: color.ink,
    "ink-2": color.ink2,
    surface: color.surface,
    bg: color.bg,
    line: color.line,
    accent: color.accent,
    alert: color.alert,
    "on-accent": color.onAccent,
    band: color.alert,
  };
  let svg = toSvg(<Art />).replace(/var\(--([\w-]+)\)/g, (_m, name: string) => palette[name] ?? color.ink);
  const viewBox = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
  const height = viewBox ? Math.round((width * Number(viewBox[2])) / Number(viewBox[1])) : width / 2.6;
  svg = svg.replace("<svg ", `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" `);
  return { src: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, width, height };
}

type CaseCardProps = { slug: OgCaseSlug; name: string; tagline: string };

/** Parte un nombre largo en dos líneas lo más parejas posible. */
function nameLines(name: string): string[] {
  const words = name.split(" ");
  if (name.length <= 10 || words.length < 2) return [name];
  let best = [name];
  let gap = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    if (Math.abs(a.length - b.length) < gap) {
      gap = Math.abs(a.length - b.length);
      best = [a, b];
    }
  }
  return best;
}

/** Un caso: su nombre enorme y su descripción a la izquierda; su ilustración a la derecha. */
export function caseCard({ slug, name, tagline }: CaseCardProps) {
  const lines = nameLines(name);
  const longest = Math.max(...lines.map((line) => line.length));
  const size = Math.min(230, Math.floor(560 / (longest * 0.43)));
  const art = artDataUri(slug, 420);
  return render(
    <>
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, width: 564 }}>
        <div style={{ display: "flex", flexDirection: "column", fontWeight: 800, fontSize: size, lineHeight: 0.9, letterSpacing: "-0.02em" }}>
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div style={{ display: "flex", width: 56, height: 4, backgroundColor: color.accent, marginTop: 34 }} />
        <div style={{ display: "flex", marginTop: 24, fontWeight: 500, fontSize: 30, lineHeight: 1.28, color: color.ink2 }}>{tagline}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 22,
          backgroundColor: color.surface,
          border: `2px solid ${color.line}`,
          borderRadius: 4,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={art.src} alt="" style={{ width: art.width, height: art.height }} />
      </div>
    </>,
  );
}
