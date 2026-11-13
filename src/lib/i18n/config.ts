export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

/** Idioma cuando el navegador no pide ninguno de los soportados. */
export const defaultLocale: Locale = "en";

/** Cookie con la última elección explícita de idioma. */
export const localeCookie = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Elige idioma: primero la cookie, luego `Accept-Language` respetando los
 * pesos q, y si nada coincide, el idioma por defecto.
 */
export function pickLocale(acceptLanguage: string | null, cookie?: string): Locale {
  if (cookie && isLocale(cookie)) return cookie;
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number.parseFloat(q.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return defaultLocale;
}
