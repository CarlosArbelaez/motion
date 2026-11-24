import {Easing, interpolate} from "remotion";
import words from "./data/words.json";

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

// La locución empieza 0,8 s después del inicio del video.
export const VO_OFFSET_FRAMES = 24;
/** Convierte un segundo del audio de locución en frame del video. */
export const f = (voSeconds: number) => Math.round(voSeconds * FPS) + VO_OFFSET_FRAMES;

const clean = (w: string) => w.replace(/[.,:;]/g, "");
/**
 * Segundo en que la locución dice `palabra` (n-ésima aparición, distingue mayúsculas), más un ajuste `d`.
 * Todas las animaciones se anclan así a la voz: al cambiar la locución basta regenerar src/data/words.json.
 */
export const t = (palabra: string, n = 1, d = 0) => {
  const hits = (words as {text: string; start: number; end: number}[]).filter((w) => clean(w.text) === palabra);
  if (hits.length < n) throw new Error(`La locución no contiene "${palabra}" (${n})`);
  return hits[n - 1].start + d;
};
const VO_END = (words as {end: number}[])[(words as unknown[]).length - 1].end;

// Límites de escena: inicio de cada párrafo de la locución.
const cuts = [0, f(t("Lúmina", 2, -0.2)), f(t("El", 1, -0.15)), f(t("En", 1, -0.2)), f(t("En", 2, -0.15)), f(t("En", 3, -0.2)), f(t("Nuestro", 1, -0.2)), f(t("Esta", 1, -0.15)), f(t("En", 4, -0.15)), f(VO_END) + Math.round(2.6 * FPS)];
export const SCENES = {
  s1: {from: cuts[0], to: cuts[1]},
  s2: {from: cuts[1], to: cuts[2]},
  s3: {from: cuts[2], to: cuts[3]},
  s4: {from: cuts[3], to: cuts[4]},
  s5: {from: cuts[4], to: cuts[5]},
  s6: {from: cuts[5], to: cuts[6]},
  s7: {from: cuts[6], to: cuts[7]},
  s8: {from: cuts[7], to: cuts[8]},
  s9: {from: cuts[8], to: cuts[9]},
};
export const VO_END_FRAME = f(VO_END);
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
