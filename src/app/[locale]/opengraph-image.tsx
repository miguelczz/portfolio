import { getContent } from "@/content";
import { person } from "@/content/shared";
import { isLocale, locales } from "@/lib/i18n/config";
import { homeCard, ogContentType, ogSize } from "@/lib/og-card";

/** Imagen de vista previa de la portada, una por idioma (ver `lib/og-card`). */
export const alt = "Miguel Zuluaga: portafolio / portfolio";
export const size = ogSize;
export const contentType = ogContentType;

/** Una imagen por idioma, generada al construir el sitio. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });
  const c = getContent(locale);
  return homeCard({ name: person.name, title: c.hero.title, stackline: c.hero.stackline });
}
