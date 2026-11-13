import type { Locale } from "@/lib/i18n/config";
import { en } from "./en";
import { es } from "./es";
import type { Content } from "./types";

const byLocale: Record<Locale, Content> = { es, en };

export function getContent(locale: Locale): Content {
  return byLocale[locale];
}

export { es, en };
export type { Content };
