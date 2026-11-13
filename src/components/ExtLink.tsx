import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; variant?: "btn" | "outline" | "link" };

/** Enlace externo: abre en otra pestaña sin pasar la referencia. */
export function ExtLink({ href, children, variant = "link" }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={variant === "outline" ? "btn-outline" : variant}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
