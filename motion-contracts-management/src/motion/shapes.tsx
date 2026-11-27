import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, EASE } from "./easings";
import { useProgress } from "./progress";

/** Trazo SVG que se dibuja; al terminar puede rellenarse. `d` usa las coordenadas de `viewBox`. */
export const DrawPath: React.FC<{
  d: string; viewBox?: string; width?: number | string; height?: number | string; stroke?: string; strokeWidth?: number;
  fill?: string; delay?: number; duration?: number; style?: React.CSSProperties;
}> = ({ d, viewBox = "0 0 100 100", width = 300, height = 300, stroke = "#ffffff", strokeWidth = 3, fill, delay = 0, duration = 1, style }) => {
  const p = useProgress(delay, duration, EASE.inOut);
  const fillIn = useProgress(delay + duration * 0.8, 0.4, EASE.outSoft);
  return (
    <svg viewBox={viewBox} width={width} height={height} style={{ overflow: "visible", ...style }}>
      <path d={d} fill={fill ?? "none"} fillOpacity={fill ? fillIn : 0} stroke={stroke} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={p > 0 ? 1 : 0} />
    </svg>
  );
};

/** Explosión de confeti desde un punto (en % del cuadro). Empieza en `at` (s). */
export const Confetti: React.FC<{ at?: number; count?: number; colors?: string[]; originX?: number; originY?: number; power?: number; seed?: string }> = ({
  at = 0, count = 80, colors = ["#ffd400", "#ff5a36", "#2b59ff", "#0a9396", "#ffffff"], originX = 50, originY = 60, power = 1, seed = "confetti",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps - at;
  if (t < 0 || t > 3) return null;
  const unit = Math.min(width, height);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = -Math.PI / 2 + (random(`${seed}-a-${i}`) - 0.5) * Math.PI * 1.3;
        const speed = (0.5 + random(`${seed}-s-${i}`) * 0.9) * unit * power;
        const drag = 1 - Math.exp(-t * 2.2);
        const x = (originX / 100) * width + Math.cos(angle) * speed * drag * 0.5;
        const y = (originY / 100) * height + Math.sin(angle) * speed * drag * 0.5 + 0.45 * unit * t * t;
        const size = unit * (0.008 + random(`${seed}-z-${i}`) * 0.012);
        const spin = (random(`${seed}-r-${i}`) - 0.5) * 1400 * t;
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: y, width: size, height: size * (0.4 + random(`${seed}-h-${i}`) * 0.6),
            background: colors[i % colors.length], rotate: `${spin}deg`, scale: `1 ${Math.cos(spin / 40)}`, opacity: clamp01((2.6 - t) * 2),
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

type ShapeName = "circle" | "square" | "triangle" | "hexagon" | "star";
const N = 120;
const regular = (sides: number, rot = -Math.PI / 2): [number, number][] =>
  Array.from({ length: sides }, (_, i) => [Math.cos(rot + (i / sides) * Math.PI * 2), Math.sin(rot + (i / sides) * Math.PI * 2)]);
const VERTICES: Record<ShapeName, [number, number][]> = {
  circle: regular(N),
  square: regular(4, -Math.PI / 4).map(([x, y]) => [x * 1.2, y * 1.2]),
  triangle: regular(3),
  hexagon: regular(6),
  star: Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? 1 : 0.45;
    const a = -Math.PI / 2 + (i / 10) * Math.PI * 2;
    return [Math.cos(a) * r, Math.sin(a) * r] as [number, number];
  }),
};
// Reparte N puntos a distancias iguales sobre el perímetro para poder mezclar formas distintas
const sample = (verts: [number, number][]): [number, number][] => {
  const segs = verts.map((v, i) => {
    const w = verts[(i + 1) % verts.length];
    return { v, w, len: Math.hypot(w[0] - v[0], w[1] - v[1]) };
  });
  const total = segs.reduce((s, g) => s + g.len, 0);
  const pts: [number, number][] = [];
  let si = 0, acc = 0;
  for (let k = 0; k < N; k++) {
    const target = (k / N) * total;
    while (acc + segs[si].len < target && si < segs.length - 1) acc += segs[si++].len;
    const f = segs[si].len ? (target - acc) / segs[si].len : 0;
    pts.push([segs[si].v[0] + (segs[si].w[0] - segs[si].v[0]) * f, segs[si].v[1] + (segs[si].w[1] - segs[si].v[1]) * f]);
  }
  return pts;
};
const SAMPLED = Object.fromEntries(Object.entries(VERTICES).map(([k, v]) => [k, sample(v)])) as Record<ShapeName, [number, number][]>;

/** Forma que se transforma en otra en bucle: mantiene `hold` s y cambia en `morph` s. */
export const MorphShape: React.FC<{ shapes?: ShapeName[]; size?: number; color?: string; hold?: number; morph?: number; spin?: number }> = ({
  shapes = ["circle", "square", "star", "hexagon", "triangle"], size = 260, color = "#ffd400", hold = 0.5, morph = 0.6, spin = 90,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cycle = (hold + morph) * fps;
  const step = Math.floor(frame / cycle);
  const p = interpolate(frame % cycle, [hold * fps, cycle], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.inOutExpo });
  const a = SAMPLED[shapes[step % shapes.length]];
  const b = SAMPLED[shapes[(step + 1) % shapes.length]];
  const d = a.map(([x, y], i) => `${i ? "L" : "M"}${(x + (b[i][0] - x) * p).toFixed(3)} ${(y + (b[i][1] - y) * p).toFixed(3)}`).join(" ") + "Z";
  return (
    <svg viewBox="-1.3 -1.3 2.6 2.6" width={size} height={size} style={{ overflow: "visible", rotate: `${(step + p) * spin}deg` }}>
      <path d={d} fill={color} />
    </svg>
  );
};
