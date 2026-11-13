/**
 * Medalla de "mejor proyecto". Con el cursor se inclina (data-rot) y, al pasar
 * sobre ella, crece un poco y destella (CSS). Es decorativa.
 */

const STAR = Array.from({ length: 10 }, (_, i) => {
  const angle = -Math.PI / 2 + (i * Math.PI) / 5;
  const r = i % 2 ? 8.5 : 19;
  return `${(60 + Math.cos(angle) * r).toFixed(1)},${(56 + Math.sin(angle) * r).toFixed(1)}`;
}).join(" ");

export function Medal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 150"
      className={`medal ${className}`}
      aria-hidden="true"
      focusable="false"
      data-pointer
      data-art-once
    >
      <g data-rot="-7" data-rot-origin="50% 0%">
        <path d="M34 80 L18 142 L40 130 L50 148 L64 88 Z" fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M86 80 L102 142 L80 130 L70 148 L56 88 Z" fill="var(--alert)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g data-rot="9" data-from-scale="0.5" data-from-opacity="0" data-origin="50% 50%" data-at="0.1" data-dur="0.6">
        <circle cx="60" cy="56" r="44" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="60" cy="56" r="34" fill="none" stroke="var(--line)" strokeWidth="3" />
        <polygon points={STAR} fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <path
        className="twinkle"
        d="M100 12 L103 21 L112 24 L103 27 L100 36 L97 27 L88 24 L97 21 Z"
        fill="var(--ink)"
      />
    </svg>
  );
}
