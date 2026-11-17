import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { person } from "@/content/shared";
import { isLocale, locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";

/**
 * Imagen que acompaña al enlace cuando se comparte (LinkedIn, Discord, WhatsApp).
 * Se genera al construir el sitio, una por idioma, con la paleta oscura y la
 * tipografía Archivo del portafolio. El texto sale del mismo contenido que la
 * página, así no puede quedar desactualizado.
 */
export const alt = "Miguel Zuluaga: portafolio / portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const color = {
  bg: "#0e1015",
  ink: "#e8eaf0",
  ink2: "#9ba1b0",
  line: "#262a35",
  accent: "#7c95f5",
};

const fontDir = join(process.cwd(), "src/app/fonts/og");

/** Una imagen por idioma, generada al construir el sitio. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });
  const c = getContent(locale);
  const [first, ...rest] = person.name.split(" ");
  const [bold, medium] = await Promise.all([
    readFile(join(fontDir, "Archivo-Bold.ttf")),
    readFile(join(fontDir, "Archivo-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: color.bg,
          color: color.ink,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `2px solid ${color.line}`,
            paddingBottom: 28,
            fontWeight: 500,
            fontSize: 28,
            color: color.ink2,
          }}
        >
          <div style={{ display: "flex", color: color.ink, fontWeight: 700, fontSize: 36 }}>
            <span>MZ</span>
            <span style={{ color: color.accent, marginLeft: 12 }}>/</span>
          </div>
          <span>{siteUrl().host}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: 700,
              fontSize: 124,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
            }}
          >
            <span>{first}</span>
            <span>{rest.join(" ")}</span>
          </div>
          <div style={{ display: "flex", width: 72, height: 6, background: color.accent, marginTop: 32 }} />
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontWeight: 700,
              fontSize: 46,
              color: color.accent,
            }}
          >
            {c.hero.title}
          </div>
          <div style={{ display: "flex", marginTop: 10, fontWeight: 500, fontSize: 32, color: color.ink2 }}>
            {c.hero.stackline}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: bold, weight: 700, style: "normal" },
        { name: "Archivo", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
