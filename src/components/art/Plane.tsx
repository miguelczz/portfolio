/**
 * Avión de papel del contacto. Con ratón es el cursor dentro de la sección (ver
 * planeFollow en lib/motion/scenes.ts). Sin ratón (táctil) no hay cursor que seguir:
 * ahí se muestra quieto, en el flujo de la página (`PlaneStatic`). La punta apunta a +x,
 * para que el giro coincida con el rumbo.
 */
function Shape() {
  return (
    <svg viewBox="-48 -34 96 68" focusable="false" data-art-once>
      <g data-from-opacity="0" data-from-x="-60" data-at="0.4" data-dur="0.8">
        <polygon points="42,0 -34,-26 -18,0" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="42,0 -18,0 -34,26" fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** El avión que sigue al ratón (solo con puntero fino). */
export function Plane() {
  return (
    <div className="plane" data-plane aria-hidden="true">
      <Shape />
    </div>
  );
}

/** El avión quieto, centrado bajo las tarjetas, solo cuando no hay ratón. */
export function PlaneStatic() {
  return (
    <div className="plane-static" aria-hidden="true">
      <Shape />
    </div>
  );
}
