/**
 * El agente: una cabeza de pantalla con dos ojos que miran al cursor y parpadean,
 * una sonrisa y una antena. Es decorativo. El movimiento lo declaran los data-*:
 *  - data-pointer / data-depth: las capas se desplazan distinto con el cursor;
 *  - data-look: la cara (ojos y sonrisa) se desplaza hacia el cursor;
 *  - data-eye: cada ojo parpadea de vez en cuando;
 *  - data-from-*: entrada una sola vez (ver lib/motion/scenes.ts).
 */
export function Observer({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-art="observer"
      data-pointer
      data-art-once
    >
      <g data-depth="0.3">
        <g data-from-y="26" data-from-opacity="0" data-at="0.1" data-dur="0.7">
          <line x1="200" y1="96" x2="200" y2="54" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
          <rect x="22" y="190" width="30" height="76" rx="12" fill="var(--ink)" />
          <rect x="348" y="190" width="30" height="76" rx="12" fill="var(--ink)" />
          <rect x="52" y="96" width="296" height="244" rx="76" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
        </g>
        <circle
          data-from-scale="0"
          data-origin="200 42"
          data-at="0.5"
          data-dur="0.4"
          cx="200"
          cy="42"
          r="16"
          fill="var(--alert)"
          stroke="var(--ink)"
          strokeWidth="3"
        />
      </g>

      <g data-depth="0.7">
        <rect x="88" y="132" width="224" height="158" rx="46" fill="var(--bg)" stroke="var(--ink)" strokeWidth="3" />
      </g>

      <g data-depth="1">
        <g data-look="14">
          <rect
            data-eye
            data-from-sy="0.05"
            data-origin="50% 50%"
            data-at="0.3"
            data-dur="0.5"
            x="138"
            y="164"
            width="42"
            height="64"
            rx="21"
            fill="var(--ink)"
          />
          <rect
            data-eye
            data-from-sy="0.05"
            data-origin="50% 50%"
            data-at="0.34"
            data-dur="0.5"
            x="220"
            y="164"
            width="42"
            height="64"
            rx="21"
            fill="var(--ink)"
          />
          <path d="M172 256 Q200 276 228 256" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
