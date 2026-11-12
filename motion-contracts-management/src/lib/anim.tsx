import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const useSec = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

const OUT = Easing.bezier(0.16, 1, 0.3, 1);
const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Progreso 0→1 con salida suave, desde `at` durante `dur` segundos. */
export const prog = (t: number, at: number, dur = 0.6) =>
  interpolate(t, [at, at + dur], [0, 1], { ...CLAMP, easing: OUT });
/** Progreso lineal 0→1. */
export const lin = (t: number, at: number, dur: number) => interpolate(t, [at, at + dur], [0, 1], CLAMP);

type RiseProps = {
  at: number;
  dur?: number;
  x?: number;
  y?: number;
  scaleFrom?: number;
  /** Segundo en que desaparece (opcional). */
  out?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Entrada estándar: aparece y sube. Toda la animación depende del frame (sin transiciones CSS). */
export const Rise: React.FC<RiseProps> = ({ at, dur = 0.6, x = 0, y = 26, scaleFrom = 1, out, style, children }) => {
  const t = useSec();
  const p = prog(t, at, dur);
  const o = out === undefined ? 1 : 1 - prog(t, out, 0.35);
  return (
    <div
      style={{
        opacity: p * o,
        translate: `${x * (1 - p)}px ${y * (1 - p)}px`,
        scale: String(scaleFrom + (1 - scaleFrom) * p),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
