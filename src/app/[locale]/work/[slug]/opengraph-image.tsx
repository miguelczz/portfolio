import { getContent } from "@/content";
import { caseSlugs } from "@/features/work/Cases";
import { isLocale, locales } from "@/lib/i18n/config";
import { caseCard, ogContentType, ogSize } from "@/lib/og-card";

/** Imagen de vista previa de cada caso, por idioma (ver `lib/og-card`). */
export const alt = "Miguel Zuluaga: caso de estudio / case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return locales.flatMap((locale) => caseSlugs.map((slug) => ({ locale, slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !(caseSlugs as readonly string[]).includes(slug)) return new Response(null, { status: 404 });
  const c = getContent(locale);
  const key = slug as (typeof caseSlugs)[number];
  const a = c.work[key];
  return caseCard({ slug: key, name: a.name, tagline: a.tagline });
}
