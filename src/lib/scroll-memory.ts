/**
 * Recuerda en qué punto de la página se estaba leyendo, para volver al mismo
 * punto después de cambiar de idioma. Como las dos versiones comparten la misma
 * estructura de DOM, el lugar se guarda como "camino de hijos desde <main>" más
 * la fracción recorrida de ese elemento; así aguanta que los textos midan distinto.
 */
const KEY = "scroll-restore";
/** Altura bajo la cabecera donde se toma la referencia. */
const PROBE = 104;

type Spot = { end: true } | { path: number[]; frac: number };

function pathFromMain(el: Element, main: Element): number[] | null {
  const path: number[] = [];
  let node: Element | null = el;
  while (node && node !== main) {
    const parent: Element | null = node.parentElement;
    if (!parent) return null;
    path.unshift(Array.prototype.indexOf.call(parent.children, node));
    node = parent;
  }
  return node === main ? path : null;
}

/** Los elementos "sticky" se quedan fijos mientras se desplaza: no sirven de referencia. */
function inSticky(el: Element, main: Element): boolean {
  for (let node: Element | null = el; node && node !== main; node = node.parentElement) {
    if (getComputedStyle(node).position === "sticky") return true;
  }
  return false;
}

/** Guarda el lugar actual. Devuelve false si no se pudo (entonces se empieza arriba). */
export function saveScrollSpot(): boolean {
  try {
    const main = document.querySelector("main");
    if (!main) return false;
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) {
      sessionStorage.setItem(KEY, JSON.stringify({ end: true } satisfies Spot));
      return true;
    }
    let best: { path: number[]; frac: number } | null = null;
    for (const xf of [0.2, 0.35, 0.5, 0.65, 0.8]) {
      const el = document.elementFromPoint(innerWidth * xf, PROBE);
      if (!el || !main.contains(el) || el === main || inSticky(el, main)) continue;
      const path = pathFromMain(el, main);
      if (!path || (best && path.length <= best.path.length)) continue;
      const r = el.getBoundingClientRect();
      best = { path, frac: r.height > 0 ? Math.min(1, Math.max(0, (PROBE - r.top) / r.height)) : 0 };
    }
    if (!best) return false;
    sessionStorage.setItem(KEY, JSON.stringify(best satisfies Spot));
    return true;
  } catch {
    return false;
  }
}

/** Lee y borra el lugar guardado. */
export function takeScrollSpot(): Spot | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    return JSON.parse(raw) as Spot;
  } catch {
    return null;
  }
}

/** Posición de scroll que deja el lugar guardado bajo la cabecera, con el diseño actual. */
export function scrollTargetFor(spot: Spot): number | null {
  if ("end" in spot) return document.documentElement.scrollHeight;
  const main = document.querySelector("main");
  if (!main) return null;
  let el: Element = main;
  for (const index of spot.path) {
    const next = el.children[index];
    if (!next) break; // la estructura difiere un poco: nos quedamos en el último nivel común
    el = next;
  }
  const r = el.getBoundingClientRect();
  return r.top + scrollY - PROBE + spot.frac * r.height;
}
