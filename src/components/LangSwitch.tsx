"use client";

import type { Locale } from "@/lib/i18n/config";
import { localeCookie } from "@/lib/i18n/config";
import { saveScrollSpot } from "@/lib/scroll-memory";

type Props = { href: string; label: string; target: Locale };

/**
 * Cambia de idioma sin perder el lugar: guarda el punto de lectura (ver
 * lib/scroll-memory.ts) y `MotionRoot` lo recupera al cargar.
 */
export function LangSwitch({ href, label, target }: Props) {
  function remember() {
    saveScrollSpot();
    try {
      document.cookie = `${localeCookie}=${target}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // Sin cookies: el cambio de idioma funciona igual.
    }
  }

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      onClick={remember}
      data-locale-switch
      className="label grid h-10 place-items-center rounded-sm border border-line px-3 text-ink transition-colors hover:border-ink2"
    >
      {label}
    </a>
  );
}
