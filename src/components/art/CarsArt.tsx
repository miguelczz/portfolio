/**
 * Cautelia: dos carros que se acercan y se detienen ante una guardia, y el
 * reporte que aparece entre ellos. Con data-art-scrub avanza con el scroll.
 * El marcado en reposo es el estado final (carros detenidos).
 */

function Car({ body, light }: { body: string; light: string }) {
  const wheel = (cx: number) => (
    <g transform={`translate(${cx} -15)`}>
      <g data-from-rot="-720">
        <circle r="15" fill="var(--ink)" />
        <circle r="6" fill="var(--surface)" />
        <line x1="-6" y1="0" x2="6" y2="0" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </g>
  );

  return (
    <>
      <polygon points="150,-40 218,-60 218,-12" fill={light} opacity="0.16" />
      <rect x="0" y="-50" width="150" height="30" rx="7" fill={body} stroke="var(--ink)" strokeWidth="3" />
      <path d="M28 -50 L50 -80 H106 L128 -50 Z" fill={body} stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M57 -74 H99 L112 -55 H44 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      {wheel(36)}
      {wheel(114)}
      <circle cx="146" cy="-36" r="5" fill={light} stroke="var(--ink)" strokeWidth="2" />
    </>
  );
}

export function CarsArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 240"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-art="cars"
      data-art-scrub
    >
      <line x1="0" y1="196" x2="640" y2="196" stroke="var(--ink)" strokeWidth="3" />
      <line x1="0" y1="216" x2="640" y2="216" stroke="var(--line)" strokeWidth="3" strokeDasharray="16 14" />

      <g transform="translate(80 196)">
        <g data-from-x="-300" data-dur="1">
          <Car body="var(--accent)" light="var(--accent)" />
        </g>
      </g>
      <g transform="translate(560 196) scale(-1 1)">
        <g data-from-x="300" data-dur="1">
          <Car body="var(--alert)" light="var(--alert)" />
        </g>
      </g>

      <line
        data-from-sy="0"
        data-origin="320 196"
        data-at="0.7"
        data-dur="0.4"
        x1="320"
        y1="76"
        x2="320"
        y2="196"
        stroke="var(--alert)"
        strokeWidth="3"
        strokeDasharray="6 8"
      />

      <g data-from-scale="0.4" data-from-opacity="0" data-origin="320 70" data-at="0.9" data-dur="0.4">
        <rect x="236" y="14" width="168" height="56" rx="14" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="254" y="30" width="112" height="7" rx="3.5" fill="var(--line)" />
        <rect x="254" y="46" width="76" height="7" rx="3.5" fill="var(--line)" />
        <circle cx="404" cy="20" r="14" fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" />
        <path d="M397 20 l5 5.5 l9 -11" fill="none" stroke="var(--on-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
