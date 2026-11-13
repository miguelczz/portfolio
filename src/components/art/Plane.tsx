/**
 * Avión de papel del contacto. Con ratón es el cursor dentro de la sección (ver
 * planeFollow en lib/motion/scenes.ts); sin ratón (táctil) no se muestra. La punta
 * apunta a +x, para que el giro coincida con el rumbo.
 */
export function Plane() {
  return (
    <div className="plane" data-plane aria-hidden="true">
      <svg viewBox="-48 -34 96 68" focusable="false" data-art-once>
        <g data-from-opacity="0" data-from-x="-60" data-at="0.4" data-dur="0.8">
          <polygon points="42,0 -34,-26 -18,0" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="42,0 -18,0 -34,26" fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
