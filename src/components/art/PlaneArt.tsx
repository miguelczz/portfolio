/**
 * Contacto: un avión de papel que sigue al cursor (con ratón) y una carta con su
 * sello. En reposo el avión queda en el aire a medio camino de la carta.
 * La lógica del vuelo vive en lib/motion/scenes.ts (data-plane).
 */

import { PLANE } from "./geometry";

export function PlaneArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${PLANE.width} ${PLANE.height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      data-art="plane"
      data-plane-root
      data-art-once
    >
      <g data-from-opacity="0" data-from-scale="0.6" data-origin="110 90" data-at="0.1" data-dur="0.6">
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

      <g data-from-x="-90" data-from-opacity="0" data-at="0.5" data-dur="0.8">
        <g data-plane transform={`translate(${PLANE.home.x} ${PLANE.home.y}) rotate(${PLANE.home.deg})`}>
          <path d="M-40 -4 L40 -28 L14 10 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M-40 -4 L14 10 L-6 30 Z" fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}
