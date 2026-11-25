import { interpolate } from "remotion";
import { EASE } from "./motion";

// Curvas de la casa, tomadas de la librería de movimiento (src/motion).
export const salida = EASE.outExpo; // entradas: rápido al inicio, frena suave
export const entradaSalida = EASE.inOut; // entre dos estados visibles
export const suave = EASE.outSoft; // fundidos
export const escape = EASE.inExpo; // salidas

// Progreso 0..1 entre dos fotogramas, con easing y sin pasarse.
export const avance = (frame: number, desde: number, dur: number, easing = salida) =>
  interpolate(frame, [desde, desde + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easing });
