/** Medidas de las ilustraciones interactivas, compartidas con lib/motion/scenes.ts. */

export const WIFI = {
  width: 640,
  height: 300,
  cx: 320,
  cy: 140,
  /** Caja que ocupa el router con sus antenas, para impedir que el cliente la toque. */
  box: { x1: 272, y1: 96, x2: 368, y2: 184 },
  home: { x: 520, y: 140 },
  /** El cliente no baja de aquí: debajo va la leyenda de las bandas. */
  maxClientY: 248,
} as const;

export const PLANE = {
  width: 480,
  height: 360,
  home: { x: 250, y: 170, deg: -14 },
} as const;
