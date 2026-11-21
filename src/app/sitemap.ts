import type { MetadataRoute } from "next";
import { caseSlugs } from "@/features/work/Cases";
import { locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const urlFor = (locale: string, path: string) => new URL(`/${locale}${path}`, base).toString();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: urlFor(locale, path),
      changeFrequency: "monthly",
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, urlFor(l, path)])) },
    }));
  return [...entry("", 1), ...caseSlugs.flatMap((slug) => entry(`/work/${slug}`, 0.7))];
}
