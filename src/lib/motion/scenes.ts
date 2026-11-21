import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { WIFI } from "@/components/art/geometry";

gsap.registerPlugin(ScrollTrigger);

/**
 * Escenas de movimiento. Reglas del proyecto (ver CLAUDE.md):
 *  - un solo reloj: Lenis corre dentro de gsap.ticker, sin otro rAF permanente;
 *  - solo transform y opacity;
 *  - cada animación de entrada ocurre una vez; las únicas ligadas al scroll
 *    son la traza de Cautelia y la barra de progreso.
 * El marcado declara qué se anima con atributos data-*; nada de esto vive en
 * los componentes de servidor.
 */

const all = <T extends Element = HTMLElement>(selector: string, scope?: Element) =>
  gsap.utils.toArray<T>(selector, scope);

type ArtEl = HTMLElement | SVGElement;
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Deja el elemento en su estado final real y retira los estilos de GSAP. */
function settle(el: Element) {
  el.classList.add("is-in");
  gsap.set(el, { clearProps: "opacity,transform,visibility" });
}

let activeLenis: Lenis | null = null;

/** Salta a una posición sin animar. Con Lenis activo hay que pasar por él, o la deshace. */
export function jumpTo(y: number) {
  if (activeLenis) activeLenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
}

/** Scroll suave con Lenis, alimentado por el ticker de GSAP. Devuelve su limpieza. */
export function startLenis(): () => void {
  const lenis = new Lenis({ autoRaf: false, anchors: { offset: -56 } });
  activeLenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    activeLenis = null;
  };
}

/** Entrada del nombre: cada línea sube desde su máscara. */
export function heroIntro() {
  const lines = all("[data-hero] [data-line]");
  // y: 0 explícito: GSAP lee el translateY(108%) del CSS como píxeles y, si no se
  // fija y, ese desplazamiento sobrevive y deja la línea oculta por la máscara.
  gsap.fromTo(
    lines,
    { yPercent: 108, y: 0 },
    {
      yPercent: 0,
      y: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.09,
      delay: 0.05,
      onComplete: () => lines.forEach(settle),
    },
  );
}

/** Títulos de sección: la línea sube desde su máscara al entrar en pantalla. */
export function headings() {
  all("[data-heading]").forEach((heading) => {
    const line = heading.querySelector<HTMLElement>("[data-line]");
    if (!line) return;
    gsap.fromTo(
      line,
      { yPercent: 108, y: 0 },
      {
        yPercent: 0,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: heading, start: "top 90%", once: true },
        onComplete: () => settle(line),
      },
    );
  });
}

/** Palabras que suben una a una desde su máscara al entrar el bloque en pantalla. */
export function words() {
  all("[data-words]").forEach((root) => {
    const items = all("[data-word]", root);
    if (!items.length) return;
    gsap.fromTo(
      items,
      { yPercent: 110, y: 0 },
      {
        yPercent: 0,
        y: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.045,
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
        onComplete: () => items.forEach(settle),
      },
    );
  });
}

/** Líneas divisorias que se dibujan de izquierda a derecha al llegar a ellas. */
export function draws() {
  all("[data-draw]").forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: line, start: "top 92%", once: true },
        onComplete: () => settle(line),
      },
    );
  });
}

/** Botones que se inclinan hacia el cursor (máximo 8 px). Solo con ratón; usa la propiedad `translate`. */
export function magnetic(): () => void {
  const cleanups = all(".btn, .btn-outline, .cv-link").map((el) => {
    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = clamp((event.clientX - (box.left + box.width / 2)) * 0.22, -8, 8);
      const y = clamp((event.clientY - (box.top + box.height / 2)) * 0.3, -6, 6);
      el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };
    const leave = () => {
      el.style.translate = "";
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.style.translate = "";
    };
  });
  return () => cleanups.forEach((fn) => fn());
}

/** Desplazamiento suave de la captura del héroe respecto al scroll (solo transform). */
export function parallax() {
  all("[data-parallax]").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 5 },
      {
        yPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}

/** Aparición única de bloques sueltos. */
export function reveals() {
  all("[data-reveal]").forEach((el) => {
    // En el héroe parte de 1 % de opacidad, no de 0: Chrome no cuenta como pintado un elemento
    // invisible y el texto del héroe (el LCP) solo contaría al terminar la animación.
    gsap.fromTo(
      el,
      { opacity: el.closest("[data-hero]") ? 0.01 : 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: Number(el.dataset.delay ?? 0),
        scrollTrigger: { trigger: el, start: el.closest("[data-hero]") ? "top bottom" : "top 92%", once: true },
        onComplete: () => settle(el),
      },
    );
  });
}

/** Aparición escalonada de listas y cuadrículas. */
export function groups() {
  all("[data-group]").forEach((group) => {
    const items = all("[data-item]").filter((item) => group.contains(item) && item.closest("[data-group]") === group);
    if (items.length === 0) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: "top 88%", once: true },
        onComplete: () => items.forEach(settle),
      },
    );
  });
}

/** Barras de la línea de tiempo y subrayados: crecen desde la izquierda una vez. */
export function bars() {
  all("[data-bar]").forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onComplete: () => settle(el),
      },
    );
  });
}

/** Trazas de Cautelia: cada fila se dibuja al avanzar el scroll. */
export function traces() {
  all("[data-trace]").forEach((trace) => {
    const rows = all("[data-trace-row]").filter((row) => trace.contains(row));
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: trace, start: "top 82%", end: "bottom 62%", scrub: 0.6 },
    });
    rows.forEach((row, i) => {
      const bar = row.querySelector("[data-trace-bar]");
      const text = row.querySelectorAll("[data-trace-text]");
      if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1 }, i * 0.7);
      if (text.length) tl.fromTo(text, { opacity: 0.18 }, { opacity: 1, duration: 0.5 }, i * 0.7);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Ilustraciones (src/components/art)                                  */
/* ------------------------------------------------------------------ */

const FROM_KEYS: Record<string, string> = {
  fromX: "x",
  fromY: "y",
  fromScale: "scale",
  fromRot: "rotation",
  fromOpacity: "opacity",
  fromSx: "scaleX",
  fromSy: "scaleY",
  fromDraw: "strokeDashoffset",
};

/** Lee data-from-* de un elemento: de dónde parte y a dónde llega (su estado en reposo). */
function artTween(el: ArtEl) {
  const d = el.dataset;
  const from: gsap.TweenVars = {};
  const to: gsap.TweenVars = {};
  for (const [key, prop] of Object.entries(FROM_KEYS)) {
    if (d[key] === undefined) continue;
    from[prop] = Number(d[key]);
    to[prop] = prop === "x" || prop === "y" || prop === "rotation" || prop === "strokeDashoffset" ? 0 : 1;
  }
  if (Object.keys(from).length === 0) return null;
  if (d.origin) {
    const key = d.origin.includes("%") ? "transformOrigin" : "svgOrigin";
    from[key] = d.origin;
    to[key] = d.origin;
  }
  to.duration = Number(d.dur ?? 0.8);
  to.ease = "power3.out";
  return { from, to, at: Number(d.at ?? 0) };
}

const ART_FROM = "[data-from-x],[data-from-y],[data-from-scale],[data-from-rot],[data-from-opacity],[data-from-sx],[data-from-sy],[data-from-draw]";

/**
 * Entrada de las ilustraciones. data-art-scrub avanza con el scroll;
 * data-art-once se reproduce una vez al entrar. El marcado en reposo ya es el
 * estado final, así que sin JavaScript la ilustración se ve completa.
 */
export function artScenes() {
  all<SVGElement>("[data-art-scrub], [data-art-once]").forEach((root) => {
    const scrub = root.hasAttribute("data-art-scrub");
    const tl = gsap.timeline({
      scrollTrigger: scrub
        ? { trigger: root, start: "top 88%", end: "center 48%", scrub: 0.6 }
        : { trigger: root, start: "top 92%", once: true },
    });
    all<ArtEl>(ART_FROM, root).forEach((el) => {
      const tween = artTween(el);
      if (tween) tl.fromTo(el, tween.from, tween.to, tween.at);
    });
  });
}

/**
 * Las capas con data-depth se desplazan según el cursor, y el iris
 * (data-look) lo mira. Solo se actualiza lo que está en pantalla y solo con
 * ratón; no hay bucle propio: gsap.quickTo anima únicamente mientras se mueve.
 */
export function pointerArt(): () => void {
  const items = all<SVGElement>("[data-pointer]").map((root) => ({
    root,
    visible: false,
    layers: all<ArtEl>("[data-depth]", root).map((el) => ({
      depth: Number(el.dataset.depth),
      x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
    })),
    rots: all<ArtEl>("[data-rot]", root).map((el) => {
      gsap.set(el, { transformOrigin: el.dataset.rotOrigin ?? "50% 50%" });
      return { mult: Number(el.dataset.rot), q: gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3.out" }) };
    }),
    looks: all<ArtEl>("[data-look]", root).map((el) => ({
      radius: Number(el.dataset.look),
      x: gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" }),
    })),
  }));

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const item = items.find((i) => i.root === entry.target);
      if (item) item.visible = entry.isIntersecting;
    }
  });
  items.forEach((item) => observer.observe(item.root));

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    for (const item of items) {
      if (!item.visible) continue;
      const box = item.root.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, dist / (box.width * 0.55));
      const nx = clamp(dx / (window.innerWidth / 2), -1, 1);
      const ny = clamp(dy / (window.innerHeight / 2), -1, 1);
      for (const layer of item.layers) {
        layer.x(nx * layer.depth * 24);
        layer.y(ny * layer.depth * 24);
      }
      for (const rot of item.rots) rot.q(nx * rot.mult);
      for (const look of item.looks) {
        look.x((dx / dist) * reach * look.radius);
        look.y((dy / dist) * reach * look.radius);
      }
    }
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  return () => {
    window.removeEventListener("pointermove", onMove);
    observer.disconnect();
  };
}

/** El observador parpadea cada pocos segundos, solo si está a la vista. */
export function blink(): () => void {
  const eyes = all<SVGElement>("[data-eye]");
  let pending: gsap.core.Tween | undefined;
  const inView = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  };
  const schedule = () => {
    pending = gsap.delayedCall(4 + Math.random() * 5, () => {
      const open = eyes.filter(inView);
      if (open.length) {
        gsap.to(open, { scaleY: 0.06, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1, ease: "power1.inOut" });
      }
      schedule();
    });
  };
  schedule();
  return () => pending?.kill();
}

type Point = { x: number; y: number };

/**
 * Seguidor suavizado: acerca una posición a su objetivo en cada cuadro y avisa
 * con onFrame. Solo está en gsap.ticker mientras hay algo que mover, así que en
 * reposo no cuesta nada. `resolve` permite corregir la posición (colisiones).
 */
function createFollower(opts: {
  start: Point;
  smooth?: number;
  resolve?: (next: Point, deltaMs: number) => Point;
  onFrame: (pos: Point, velocity: Point) => void;
}) {
  let pos = { ...opts.start };
  let target = { ...opts.start };
  let running = false;
  const smooth = opts.smooth ?? 0.0015;

  const stop = () => {
    if (!running) return;
    gsap.ticker.remove(step);
    running = false;
  };
  function step(_time: number, deltaMs: number) {
    const k = 1 - Math.pow(smooth, deltaMs / 1000);
    let next = { x: pos.x + (target.x - pos.x) * k, y: pos.y + (target.y - pos.y) * k };
    if (opts.resolve) next = opts.resolve(next, deltaMs);
    const velocity = { x: next.x - pos.x, y: next.y - pos.y };
    pos = next;
    opts.onFrame(pos, velocity);
    if (Math.hypot(target.x - pos.x, target.y - pos.y) < 0.4 && Math.hypot(velocity.x, velocity.y) < 0.05) stop();
  }
  return {
    goTo(next: Point) {
      target = next;
      if (!running) {
        running = true;
        gsap.ticker.add(step);
      }
    },
    stop,
    position: () => pos,
    target: () => target,
  };
}

/** Posición del puntero en coordenadas del viewBox de un SVG. */
function svgPoint(svg: SVGSVGElement, event: PointerEvent, width: number): Point {
  const box = svg.getBoundingClientRect();
  const k = width / box.width;
  return { x: (event.clientX - box.left) * k, y: (event.clientY - box.top) * k };
}

/**
 * Band Steering: el cliente sigue al cursor por todo el dibujo, pero no puede
 * tocar el router; si el cursor está al otro lado, lo rodea por arriba o por
 * abajo. Cerca del router pasa a 5 GHz y lejos se queda en 2,4 GHz.
 */
export function wifiSteer(): () => void {
  const cleanups = all<SVGSVGElement>("[data-wifi]").map((svg) => {
    const client = svg.querySelector<SVGElement>("[data-client]");
    const label = svg.querySelector<SVGTextElement>("[data-band-label]");
    if (!client || !label) return () => {};

    const { box, cx, cy, home, width } = WIFI;
    const radius = 22;
    const pad = 8;
    const left = box.x1 - radius - pad;
    const right = box.x2 + radius + pad;
    const top = box.y1 - radius - pad;
    const bottom = box.y2 + radius + pad;
    const midY = (box.y1 + box.y2) / 2;
    let band = "2.4";
    let labelLeft = false;

    const inside = (p: Point) => p.x > left && p.x < right && p.y > top && p.y < bottom;
    /** Saca un punto de la zona prohibida por el borde más cercano. */
    const pushOut = (p: Point): Point => {
      if (!inside(p)) return p;
      const m = Math.min(p.x - left, right - p.x, p.y - top, bottom - p.y);
      if (m === p.x - left) return { x: left, y: p.y };
      if (m === right - p.x) return { x: right, y: p.y };
      return m === p.y - top ? { x: p.x, y: top } : { x: p.x, y: bottom };
    };

    const follower = createFollower({
      start: home,
      // Si el cliente choca de lado, además se desliza hacia arriba o abajo hasta rodear el router.
      resolve: (next, dt) => {
        if (!inside(next)) return next;
        const side = next.y < midY ? -1 : 1;
        const slide = 0.2 * dt * side;
        const m = Math.min(next.x - left, right - next.x);
        const vertical = Math.min(next.y - top, bottom - next.y);
        if (vertical < m) return pushOut(next);
        return { x: next.x - left < right - next.x ? left : right, y: next.y + slide };
      },
      onFrame: (p) => {
        client.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
        const nextBand = Math.hypot(p.x - cx, p.y - cy) < 150 ? "5" : "2.4";
        if (nextBand !== band) {
          band = nextBand;
          svg.style.setProperty("--band", band === "5" ? "var(--accent)" : "var(--alert)");
          label.textContent = `${band} GHz`;
        }
        const flip = p.x > width - 110;
        if (flip !== labelLeft) {
          labelLeft = flip;
          label.setAttribute("x", flip ? "-32" : "32");
          label.setAttribute("text-anchor", flip ? "end" : "start");
        }
      },
    });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const p = svgPoint(svg, event, width);
      follower.goTo(
        pushOut({ x: clamp(p.x, radius + 4, width - radius - 4), y: clamp(p.y, radius + 4, WIFI.maxClientY) }),
      );
    };
    const onLeave = () => follower.goTo({ ...home });

    svg.addEventListener("pointermove", onMove, { passive: true });
    svg.addEventListener("pointerleave", onLeave);
    return () => {
      follower.stop();
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
    };
  });
  return () => cleanups.forEach((fn) => fn());
}

/**
 * Contacto: con ratón, el avión de papel ES el cursor. Dentro de la sección se oculta el
 * cursor del sistema y la punta del avión queda exactamente en el puntero; gira hacia
 * donde se mueve y conserva el último rumbo al detenerse. No hay bucle ni seguimiento
 * retardado: se coloca en cada evento del puntero (y del scroll, para que no se despegue
 * mientras la página se desplaza). No captura el ratón, así que las tarjetas se pulsan
 * igual. Al salir del puntero de la sección, el avión vuelve a su sitio de reposo.
 */
export function planeFollow(): () => void {
  const zone = document.querySelector<HTMLElement>("[data-plane-zone]");
  const plane = zone?.querySelector<HTMLElement>("[data-plane]");
  if (!zone || !plane) return () => {};

  const REST_ANGLE = -14;
  let angle = REST_ANGLE;
  let active = false;
  let last: Point | null = null; // último punto desde el que se calculó el rumbo
  let client: Point | null = null; // última posición conocida del puntero
  let glideTimer: number | undefined;

  // La punta del dibujo está a 42 de 96 unidades del centro (ver components/art/Plane.tsx).
  const tipLength = () => (plane.offsetWidth / 96) * 42;
  const home = (): Point => ({ x: zone.clientWidth * 0.78, y: zone.clientHeight * 0.4 });
  const place = (p: Point) => {
    plane.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${angle.toFixed(1)}deg)`;
  };
  /** Coloca el avión de modo que su punta quede sobre el puntero. */
  const placeAtPointer = (pt: Point) => {
    const box = zone.getBoundingClientRect();
    const rad = (angle * Math.PI) / 180;
    const tip = tipLength();
    place({ x: pt.x - box.left - Math.cos(rad) * tip, y: pt.y - box.top - Math.sin(rad) * tip });
  };
  /** Transición corta solo al entrar y al salir; mientras sigue al puntero no hay ninguna. */
  const glide = (ms: number) => {
    window.clearTimeout(glideTimer);
    plane.style.transition = `transform ${ms}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    glideTimer = window.setTimeout(() => {
      plane.style.transition = "";
    }, ms + 30);
  };

  // A partir de aquí la posición la lleva JS; antes la fijaba el CSS en su sitio de reposo.
  plane.style.left = "0";
  plane.style.top = "0";
  place(home());

  const enter = (event: PointerEvent) => {
    active = true;
    zone.classList.add("plane-cursor");
    client = { x: event.clientX, y: event.clientY };
    last = client;
    glide(180);
    placeAtPointer(client);
  };
  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    if (!active) enter(event);
    client = { x: event.clientX, y: event.clientY };
    if (last) {
      const dx = client.x - last.x;
      const dy = client.y - last.y;
      // Con movimientos muy cortos se acumula la distancia para no temblar.
      if (Math.hypot(dx, dy) >= 6) {
        const heading = (Math.atan2(dy, dx) * 180) / Math.PI;
        angle += (((heading - angle + 540) % 360) - 180) * 0.35;
        last = client;
      }
    }
    placeAtPointer(client);
  };
  const onLeave = () => {
    if (!active) return;
    active = false;
    zone.classList.remove("plane-cursor");
    angle = REST_ANGLE;
    glide(600);
    place(home());
  };
  const onScroll = () => {
    if (active && client) placeAtPointer(client);
  };
  const onResize = () => {
    if (!active) place(home());
  };

  zone.addEventListener("pointermove", onMove, { passive: true });
  zone.addEventListener("pointerleave", onLeave);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  return () => {
    window.clearTimeout(glideTimer);
    zone.removeEventListener("pointermove", onMove);
    zone.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    zone.classList.remove("plane-cursor");
    plane.style.left = "";
    plane.style.top = "";
    plane.style.transform = "";
    plane.style.transition = "";
  };
}

/**
 * Stack: las columnas llegan escalonadas (más abajo cuanto más a la derecha) y
 * suben a su sitio con el scroll, como una cascada; las tecnologías de cada
 * columna aparecen una a una.
 */
export function stack() {
  all("[data-stack]").forEach((root) => {
    all("[data-stack-col]", root).forEach((col, i) => {
      gsap.fromTo(
        col,
        { y: 24 + i * 28 },
        { y: 0, ease: "none", scrollTrigger: { trigger: root, start: "top 92%", end: "top 28%", scrub: true } },
      );
      const items = all("[data-stack-item]", col);
      gsap.fromTo(
        items,
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.035,
          scrollTrigger: { trigger: col, start: "top 85%", once: true },
          onComplete: () => items.forEach(settle),
        },
      );
    });
  });
}

/** Barra de progreso en la cabecera y nombre de la sección actual. */
export function progress() {
  const bar = document.querySelector<HTMLElement>("[data-progress]");
  const label = document.querySelector<HTMLElement>("[data-section-label]");

  if (bar) {
    gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
  }
  all("[data-section]").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive && label) label.textContent = section.dataset.label ?? "";
      },
    });
  });
}
