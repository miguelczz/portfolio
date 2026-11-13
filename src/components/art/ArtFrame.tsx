import type { ReactNode } from "react";

/** Marco de una ilustración, con una nota opcional que solo se muestra con ratón. */
export function ArtFrame({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <figure data-reveal>
      <div className="art-frame">{children}</div>
      {hint ? <figcaption className="label hint-hover mt-2">{hint}</figcaption> : null}
    </figure>
  );
}
