import type { ReactNode } from "react";

/** Marco de una ilustración. */
export function ArtFrame({ children }: { children: ReactNode }) {
  return (
    <figure data-reveal>
      <div className="art-frame">{children}</div>
    </figure>
  );
}
