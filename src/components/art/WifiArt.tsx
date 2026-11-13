/**
 * Agente Experto Wi-Fi: un router al centro que emite en dos bandas hacia los
 * dos lados, y un cliente que sigue al cursor sin poder cruzar el router.
 * Cerca del router el cliente pasa a 5 GHz (Band Steering); lejos, se queda en
 * 2,4 GHz. La leyenda va debajo del router. La lógica vive en
 * lib/motion/scenes.ts (data-wifi).
 */
import { WIFI } from "./geometry";

function arc(r: number, side: 1 | -1, maxHalf = 125) {
  const half = Math.min(52, (Math.asin(Math.min(1, maxHalf / r)) * 180) / Math.PI);
  const a = (half * Math.PI) / 180;
  const f = (n: number) => n.toFixed(1);
  const x1 = WIFI.cx + side * r * Math.cos(a);
  const y1 = WIFI.cy - r * Math.sin(a);
  const y2 = WIFI.cy + r * Math.sin(a);
  // En el lado derecho se dibuja de arriba abajo (sentido horario); en el izquierdo, al revés.
  return `M${f(x1)} ${f(y1)} A${r} ${r} 0 0 ${side === 1 ? 1 : 0} ${f(x1)} ${f(y2)}`;
}

/** Sin los arcos más cercanos al router, para que ninguno lo toque. */
const FIVE = [88, 118];
const TWO = [160, 200, 240];

export function WifiArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIFI.width} ${WIFI.height}`}
      className={className}
      style={{ ["--band" as string]: "var(--alert)" }}
      aria-hidden="true"
      focusable="false"
      data-art="wifi"
      data-wifi
      data-art-once
    >
      {([1, -1] as const).map((side) => (
        <g key={side}>
          {TWO.map((r, i) => (
            <path
              key={`t${r}`}
              data-from-scale="0.5"
              data-from-opacity="0"
              data-origin={`${WIFI.cx} ${WIFI.cy}`}
              data-at={0.3 + i * 0.12}
              data-dur="0.6"
              d={arc(r, side)}
              fill="none"
              stroke="var(--alert)"
              strokeWidth="6"
              strokeLinecap="round"
              opacity={1 - i * 0.28}
            />
          ))}
          {FIVE.map((r, i) => (
            <path
              key={`f${r}`}
              data-from-scale="0.5"
              data-from-opacity="0"
              data-origin={`${WIFI.cx} ${WIFI.cy}`}
              data-at={i * 0.12}
              data-dur="0.6"
              d={arc(r, side)}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              opacity={1 - i * 0.28}
            />
          ))}
        </g>
      ))}

      <g>
        <line x1="292" y1="150" x2="282" y2="100" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        <line x1="348" y1="150" x2="358" y2="100" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        <rect x="272" y="148" width="96" height="34" rx="8" fill="var(--ink)" />
        <circle cx="294" cy="165" r="3.5" fill="var(--accent)" />
        <circle cx="308" cy="165" r="3.5" fill="var(--alert)" />
        <circle cx="322" cy="165" r="3.5" fill="var(--surface)" />
      </g>

      {/* Leyenda centrada debajo del router. */}
      <g transform="translate(243 274)" fontSize="14" fontWeight="600" fill="var(--ink-2)">
        <rect x="0" y="0" width="13" height="13" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2" />
        <text x="21" y="12">5 GHz</text>
        <rect x="88" y="0" width="13" height="13" fill="var(--alert)" stroke="var(--ink)" strokeWidth="2" />
        <text x="109" y="12">2.4 GHz</text>
      </g>

      <g data-client transform={`translate(${WIFI.home.x} ${WIFI.home.y})`}>
        <circle r="22" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
        <circle r="10" fill="var(--band)" stroke="var(--ink)" strokeWidth="3" />
        <text x="32" y="5" fontSize="14" fontWeight="600" fill="var(--ink)" data-band-label>
          2.4 GHz
        </text>
      </g>
    </svg>
  );
}
