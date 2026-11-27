import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE } from "../motion/easings";

export const useSec = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

const OUT = EASE.outExpo;
const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Progreso 0→1 con salida suave, desde `at` durante `dur` segundos. */
export const prog = (t: number, at: number, dur = 0.6) =>
  interpolate(t, [at, at + dur], [0, 1], { ...CLAMP, easing: OUT });
/** Progreso lineal 0→1. */
export const lin = (t: number, at: number, dur: number) => interpolate(t, [at, at + dur], [0, 1], { ...CLAMP, easing: (v) => v });

type RiseProps = {
  at: number;
  dur?: number;
  x?: number;
  y?: number;
  scaleFrom?: number;
  /** Segundo en que desaparece (opcional). */
  out?: number;
  /** false = no sale al final de la escena. */
  exit?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Progreso de salida 0→1 en los últimos instantes de la escena (acelera al irse). */
export const useExit = (dur = 0.3, before = 0.08) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const end = durationInFrames - before * fps;
  return interpolate(frame, [end - dur * fps, end], [0, 1], { ...CLAMP, easing: EASE.inExpo });
};

/**
 * Entrada estándar: aparece y se desliza con frenado suave; al final de la escena sale más rápido de lo que entró.
 * `exit={false}` lo deja quieto hasta el corte. Toda la animación depende del frame (sin transiciones CSS).
 */
export const Rise: React.FC<RiseProps> = ({ at, dur = 0.6, x = 0, y = 26, scaleFrom = 1, out, exit = true, style, children }) => {
  const t = useSec();
  const p = prog(t, at, dur);
  const fadeIn = interpolate(t, [at, at + dur * 0.45], [0, 1], { ...CLAMP, easing: EASE.outSoft });
  const o = out === undefined ? 1 : 1 - prog(t, out, 0.35);
  const ex = useExit() * (exit ? 1 : 0);
  return (
    <div
      style={{
        opacity: fadeIn * o * (1 - ex),
        translate: `${x * (1 - p)}px ${y * (1 - p) - 14 * ex}px`,
        scale: String(scaleFrom + (1 - scaleFrom) * p),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Título que sube desde detrás de una máscara (el clásico de títulos) y baja al salir. */
export const MaskRise: React.FC<{ at: number; dur?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  at, dur = 0.75, style, children,
}) => {
  const t = useSec();
  const p = prog(t, at, dur);
  const ex = useExit(0.3);
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.14em", ...style }}>
      <div style={{ translate: `0px ${(1 - p) * 108 + ex * 108}%` }}>{children}</div>
    </div>
  );
};
