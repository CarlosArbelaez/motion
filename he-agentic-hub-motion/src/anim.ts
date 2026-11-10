import { Easing, interpolate } from "remotion";

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** 0→1 entre start y start+dur (fotogramas), con easing. */
export const prog = (frame: number, start: number, dur: number, ease = easeOut) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Entrada: opacidad + desplazamiento vertical. */
export const rise = (frame: number, start: number, dur = 14, dist = 24) => {
  const p = prog(frame, start, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` };
};

/** Salida al final de una escena (fotogramas locales). */
export const exitFade = (frame: number, start: number, dur = 12) =>
  1 - prog(frame, start, dur, easeInOut);
