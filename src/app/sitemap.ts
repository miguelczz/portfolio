import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, new URL(`/${locale}`, base).toString()]),
  );
  return locales.map((locale) => ({
    url: new URL(`/${locale}`, base).toString(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
