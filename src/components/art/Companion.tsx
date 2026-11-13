import { Observer } from "./Observer";

/**
 * El agente pequeño que, al salir del héroe, sigue al cursor a cierta distancia.
 * Es fijo, no recibe clics y solo existe con ratón y movimiento permitido
 * (ver `.companion` en globals.css y `companion()` en lib/motion/scenes.ts).
 */
export function Companion() {
  return (
    <div className="companion" data-companion aria-hidden="true">
      <Observer />
    </div>
  );
}
