"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { scrollTargetFor, takeScrollSpot } from "../scroll-memory";
import {
  artScenes,
  bars,
  blink,
  groups,
  headings,
  heroIntro,
  draws,
  jumpTo,
  magnetic,
  parallax,
  planeFollow,
  pointerArt,
  progress,
  reveals,
  stack,
  startLenis,
  traces,
  wifiSteer,
  words,
} from "./scenes";

/**
 * Tras cambiar de idioma, vuelve al mismo lugar de la página (ver LangSwitch).
 * Se reintenta mientras cargan fuentes e imágenes, salvo que la persona ya haya
 * empezado a desplazarse.
 */
function restoreScroll() {
  const spot = takeScrollSpot();
  if (!spot) return;

  let touched = false;
  const stop = () => {
    touched = true;
  };
  window.addEventListener("wheel", stop, { once: true, passive: true });
  window.addEventListener("touchstart", stop, { once: true, passive: true });
  window.addEventListener("keydown", stop, { once: true });

  const place = () => {
    if (touched) return;
    const y = scrollTargetFor(spot);
    if (y !== null) jumpTo(y);
  };
  place();
  void document.fonts.ready.then(place);
  window.addEventListener("load", place, { once: true });
  window.setTimeout(place, 600);
  window.setTimeout(place, 1600);
}

/**
 * Isla de cliente única que activa el movimiento de toda la página.
 * Con `prefers-reduced-motion: reduce` no crea nada: el CSS muestra todo y las
 * ilustraciones se quedan en su estado final.
 * Lenis y las ilustraciones que siguen al cursor solo se activan con puntero fino.
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        finePointer: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const fine = Boolean(context.conditions?.finePointer);
        const cleanups: Array<() => void> = [];

        if (fine) {
          cleanups.push(startLenis());
          cleanups.push(pointerArt());
          cleanups.push(wifiSteer());
          cleanups.push(planeFollow());
          cleanups.push(magnetic());
        }
        cleanups.push(blink());
        heroIntro();
        headings();
        parallax();
        reveals();
        groups();
        words();
        draws();
        bars();
        traces();
        stack();
        artScenes();
        progress();

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        void document.fonts.ready.then(refresh);
        cleanups.push(() => window.removeEventListener("load", refresh));

        return () => cleanups.forEach((fn) => fn());
      },
    );

    // Después de crear los ScrollTrigger: moverse antes provoca un error dentro de GSAP.
    restoreScroll();

    // Avisa al script de cabecera de que el movimiento arrancó (o no hace falta).
    root.dataset.motion = "ready";
    return () => mm.revert();
  }, []);

  return null;
}
