"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import {
  artScenes,
  bars,
  blink,
  companion,
  groups,
  headings,
  heroIntro,
  parallax,
  planeFollow,
  pointerArt,
  progress,
  reveals,
  stack,
  startLenis,
  traces,
  wifiSteer,
} from "./scenes";

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
          cleanups.push(blink());
          cleanups.push(companion());
        }
        heroIntro();
        headings();
        parallax();
        reveals();
        groups();
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

    // Avisa al script de cabecera de que el movimiento arrancó (o no hace falta).
    root.dataset.motion = "ready";
    return () => mm.revert();
  }, []);

  return null;
}
