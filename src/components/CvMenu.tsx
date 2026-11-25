"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";

type Option = { label: string; href: string; filename: string };

type Props = {
  /** Texto corto del botón ("CV"). */
  label: string;
  /** Nombre accesible del botón, por ejemplo "Descargar CV en PDF". */
  ariaLabel: string;
  options: readonly Option[];
};

/**
 * Botón de CV con un menú de idiomas. Se abre con clic o teclado, se cierra con Escape,
 * con un clic fuera o al elegir una opción. Cada opción es un enlace de descarga normal,
 * así que sigue funcionando sin necesidad de más código del cliente.
 */
export function CvMenu({ label, ariaLabel, options }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        root.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="cv-menu">
      <button
        type="button"
        className="cv-link label"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <DownloadSimple size={16} weight="bold" aria-hidden="true" />
      </button>
      {open ? (
        <ul id={panelId} className="cv-panel">
          {options.map((option) => (
            <li key={option.href}>
              <a
                className="cv-option label"
                href={option.href}
                download={option.filename}
                onClick={() => setOpen(false)}
              >
                {option.label}
                <DownloadSimple size={14} weight="bold" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
