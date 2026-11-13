import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PLANE, WIFI } from "@/components/art/geometry";

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

/** Scroll suave con Lenis, alimentado por el ticker de GSAP. Devuelve su limpieza. */
export function startLenis(): () => void {
  const lenis = new Lenis({ autoRaf: false, anchors: { offset: -56 } });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
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
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: Number(el.dataset.delay ?? 0),
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
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
};

/** Lee data-from-* de un elemento: de dónde parte y a dónde llega (su estado en reposo). */
function artTween(el: ArtEl) {
  const d = el.dataset;
  const from: gsap.TweenVars = {};
  const to: gsap.TweenVars = {};
  for (const [key, prop] of Object.entries(FROM_KEYS)) {
    if (d[key] === undefined) continue;
    from[prop] = Number(d[key]);
    to[prop] = prop === "x" || prop === "y" || prop === "rotation" ? 0 : 1;
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

const ART_FROM = "[data-from-x],[data-from-y],[data-from-scale],[data-from-rot],[data-from-opacity],[data-from-sx],[data-from-sy]";

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
    /** Coloca el seguidor sin animar. */
    jump(next: Point) {
      stop();
      pos = { ...next };
      target = { ...next };
    },
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

/** Contacto: el avión de papel vuela hacia el cursor y gira según su dirección. */
export function planeFollow(): () => void {
  const cleanups = all<SVGSVGElement>("[data-plane-root]").map((svg) => {
    const plane = svg.querySelector<SVGElement>("[data-plane]");
    if (!plane) return () => {};
    const { width, height, home } = PLANE;
    let angle: number = home.deg;

    const follower = createFollower({
      start: { x: home.x, y: home.y },
      smooth: 0.03,
      onFrame: (p, v) => {
        if (Math.hypot(v.x, v.y) > 0.6) {
          const heading = (Math.atan2(v.y, v.x) * 180) / Math.PI;
          const diff = ((heading - angle + 540) % 360) - 180;
          angle += diff * 0.16;
        }
        plane.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
      },
    });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const p = svgPoint(svg, event, width);
      follower.goTo({ x: clamp(p.x, 44, width - 44), y: clamp(p.y, 44, height - 44) });
    };
    const onLeave = () => follower.goTo({ x: home.x, y: home.y });

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
 * Al salir del héroe aparece un agente pequeño que persigue al cursor sin
 * acercarse más de `gap`: si el cursor viene hacia él, se aparta. No recibe
 * clics (pointer-events: none) y se queda quieto cuando el cursor se detiene.
 */
export function companion(): () => void {
  const el = document.querySelector<HTMLElement>("[data-companion]");
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!el || !hero) return () => {};

  const size = 64;
  const gap = 96;
  const margin = 44;
  const topLimit = 84; // debajo de la cabecera
  let side: Point = { x: 1, y: 1 };
  const start = { x: window.innerWidth * 0.82, y: window.innerHeight * 0.72 };
  const place = (p: Point) => {
    el.style.transform = `translate3d(${(p.x - size / 2).toFixed(1)}px, ${(p.y - size / 2).toFixed(1)}px, 0)`;
  };
  place(start);

  const follower = createFollower({ start, smooth: 0.01, onFrame: place });
  let pastHero = false;
  let moved = false;
  const sync = () => {
    if (pastHero && moved) el.setAttribute("data-on", "");
    else el.removeAttribute("data-on");
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const cursor = { x: event.clientX, y: event.clientY };
    if (!moved) {
      // Primer movimiento: aparece junto al cursor, no en una esquina.
      moved = true;
      const first = { x: clamp(cursor.x + gap, margin, window.innerWidth - margin), y: clamp(cursor.y + gap, topLimit, window.innerHeight - margin) };
      follower.jump(first);
      place(first);
      sync();
    }
    if (!pastHero) return;
    const pos = follower.position();
    const dx = pos.x - cursor.x;
    const dy = pos.y - cursor.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 1) side = { x: dx / dist, y: dy / dist };
    follower.goTo({
      x: clamp(cursor.x + side.x * gap, margin, window.innerWidth - margin),
      y: clamp(cursor.y + side.y * gap, topLimit, window.innerHeight - margin),
    });
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const trigger = ScrollTrigger.create({
    trigger: hero,
    start: "bottom 35%",
    end: "max",
    onToggle: (self) => {
      pastHero = self.isActive;
      sync();
    },
  });

  return () => {
    follower.stop();
    trigger.kill();
    window.removeEventListener("pointermove", onMove);
    el.removeAttribute("data-on");
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
