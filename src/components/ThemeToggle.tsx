"use client";

import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";

/**
 * Alterna claro y oscuro. El tema inicial lo fija un script en la cabecera
 * antes de pintar; aquí solo se cambia y se recuerda la elección.
 */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Sin almacenamiento: el cambio vale solo para esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-sm border border-line text-ink transition-colors hover:border-ink2"
    >
      <Sun className="icon-sun" size={20} aria-hidden="true" />
      <Moon className="icon-moon" size={20} aria-hidden="true" />
    </button>
  );
}
