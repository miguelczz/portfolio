"use client";

import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

type Props = { value: string; label: string; doneLabel: string };

/** Copia un texto al portapapeles y confirma durante un instante. */
export function CopyButton({ value, label, doneLabel }: Props) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      // Algunos navegadores bloquean el portapapeles: el texto sigue visible.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="label inline-flex shrink-0 items-center gap-2 rounded-sm border border-line px-4 py-2.5 text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {done ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span aria-live="polite">{done ? doneLabel : label}</span>
    </button>
  );
}
