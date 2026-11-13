/**
 * Contacto: sello, estela y carta, sin marco, para que la composición respire.
 * El avión de papel es aparte (Plane.tsx) porque vuela por toda la sección.
 */

export function PlaneArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" className={className} aria-hidden="true" focusable="false" data-art="plane" data-art-once>
      <g data-from-opacity="0" data-from-scale="0.6" data-origin="110 92" data-at="0.1" data-dur="0.6">
        <circle cx="110" cy="92" r="46" fill="none" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="110" cy="92" r="32" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
        <path d="M164 78 q14 -12 28 0 t28 0 t28 0" fill="none" stroke="var(--ink-2)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M164 96 q14 -12 28 0 t28 0 t28 0" fill="none" stroke="var(--ink-2)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M164 114 q14 -12 28 0 t28 0 t28 0" fill="none" stroke="var(--ink-2)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <path
        d="M56 318 C 110 218, 190 292, 244 196"
        fill="none"
        stroke="var(--ink-2)"
        strokeWidth="2.5"
        strokeDasharray="3 10"
        strokeLinecap="round"
      />

      <g data-from-y="26" data-from-opacity="0" data-at="0.2" data-dur="0.7">
        <rect x="262" y="226" width="170" height="108" rx="9" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
        <path d="M262 236 L347 292 L432 236" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        <rect x="396" y="238" width="26" height="30" fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="409" cy="253" r="6" fill="var(--on-accent)" opacity="0.9" />
      </g>
    </svg>
  );
}
