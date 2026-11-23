import {Easing, interpolate} from "remotion";

// ── Identidad BEES (Brand Guidelines): colores primarios y de acento ──
export const C = {
  yellow: "#FFFF00",
  black: "#000000",
  white: "#FFFFFF",
  blue: "#9CFFFD",
  orange: "#FFB042",
  red: "#FF6F71",
  grey: "#F0ECFC",
  ink60: "#4A4A4A",
};

// Titulares: Barlow Semi Condensed SemiBold · Cuerpo: Work Sans (manual BEES, pág. Typography)
export const HEAD = "Barlow Semi Condensed";
export const BODY = "Work Sans";

export const FPS = 30;
export const W = 1920;
export const H = 1080;

// La locución empieza 1,5 s después del inicio del video.
export const VO_OFFSET_FRAMES = 45;
/** Convierte un segundo del audio de locución en frame del video. */
export const f = (voSeconds: number) => Math.round(voSeconds * FPS) + VO_OFFSET_FRAMES;

// Límites de escena, en segundos de la locución (pausas reales entre párrafos).
export const SCENES = {
  s1: {from: 0, to: f(4.2)},
  s2: {from: f(4.2), to: f(15.0)},
  s3: {from: f(15.0), to: f(25.65)},
  s4: {from: f(25.65), to: f(41.45)},
  s5: {from: f(41.45), to: f(56.8)},
  s6: {from: f(56.8), to: f(75.0)},
  s7: {from: f(75.0), to: f(89.7)},
  s8: {from: f(89.7), to: f(112.1)},
  s9: {from: f(112.1), to: f(122.72) + 4 * FPS},
};
export const TOTAL_FRAMES = SCENES.s9.to;

const ease = Easing.bezier(0.16, 1, 0.3, 1);
/** Progreso 0→1 de una entrada que empieza en `at` y dura `dur` frames. */
export const ap = (frame: number, at: number, dur = 16) =>
  interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
/** Estilo de entrada: aparece subiendo levemente. */
export const rise = (frame: number, at: number, dist = 36, dur = 16) => {
  const p = ap(frame, at, dur);
  return {opacity: p, translate: `0px ${(1 - p) * dist}px`};
};
/** Estilo de entrada tipo "pop". */
export const pop = (frame: number, at: number, dur = 14) => {
  const p = ap(frame, at, dur);
  return {opacity: p, scale: String(0.86 + 0.14 * p)};
};

export const h1 = (size: number): React.CSSProperties => ({
  fontFamily: HEAD,
  fontWeight: 600,
  fontSize: size,
  lineHeight: 1.12,
  letterSpacing: "-0.005em",
  color: C.black,
  margin: 0,
});
export const body = (size: number, weight = 500): React.CSSProperties => ({
  fontFamily: BODY,
  fontWeight: weight,
  fontSize: size,
  lineHeight: 1.25,
  color: C.black,
  margin: 0,
});
// Esquinas del "highlight device" BEES: superior izquierda e inferior derecha redondeadas.
export const beesRadius = (r: number) => `${r}px 0 ${r}px 0`;
