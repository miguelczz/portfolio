import type { ReactNode } from "react";

type Props = { title: string; kicker?: string; aside?: ReactNode; className?: string };

/** Título de sección: línea enmascarada que sube al entrar y una etiqueta al margen. */
export function SectionHeading({ title, kicker, aside, className = "mb-10 md:mb-14" }: Props) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-2 max-lg:flex-col max-lg:items-center max-lg:text-center ${className}`}>
      <h2 className="h-section" data-heading>
        <span className="name-line">
          <span data-line className="block">
            {title}
          </span>
        </span>
      </h2>
      {kicker || aside ? (
        <div className="flex items-center gap-4 max-lg:justify-center">
          {kicker ? (
            <p className="label" data-reveal data-delay="0.1">
              {kicker}
            </p>
          ) : null}
          {aside}
        </div>
      ) : null}
    </div>
  );
}
