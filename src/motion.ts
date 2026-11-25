import { Easing, interpolate } from "remotion";

// Desaceleración natural, sin rebote.
export const salida = Easing.bezier(0.16, 1, 0.3, 1);
export const entradaSalida = Easing.bezier(0.65, 0, 0.35, 1);

// Progreso 0..1 entre dos fotogramas, con easing y sin pasarse.
export const avance = (frame: number, desde: number, dur: number, easing = salida) =>
  interpolate(frame, [desde, desde + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
