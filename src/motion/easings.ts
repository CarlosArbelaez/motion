import { Easing } from "remotion";

export type Ease = (t: number) => number;

export const EASE = {
  // Entradas: rápido al inicio, frena suave
  outSoft: Easing.bezier(0.25, 1, 0.5, 1),
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  // Salidas: arranca suave, acelera
  inSoft: Easing.bezier(0.5, 0, 0.75, 0),
  inExpo: Easing.bezier(0.7, 0, 0.84, 0),
  // Entre dos estados visibles
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  inOutExpo: Easing.bezier(0.87, 0, 0.13, 1),
  // Overshoot: se pasa del destino y regresa
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  overshootStrong: Easing.bezier(0.3, 2.1, 0.6, 1),
  // Anticipación: retrocede antes de salir
  anticipate: Easing.bezier(0.36, 0, 0.66, -0.56),
} satisfies Record<string, Ease>;

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
