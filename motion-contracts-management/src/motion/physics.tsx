import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { anticipate, backIn, backOut, circIn, circOut, inertia, interpolate as mixStops, spring, stagger, steps } from "motion";
import { Direction, Motion, MotionProps } from "./core";
import { clamp01, Ease } from "./easings";

// Funciones puras de la librería Motion (licencia MIT), evaluadas por tiempo de frame.

/** Curvas extra. `stepped(n)` da movimiento a saltos tipo stop motion. */
export const EASE_X = {
  backOut, backIn, circOut, circIn, anticipateSoft: anticipate,
  stepped: (n: number): Ease => steps(n, "end"),
} satisfies Record<string, Ease | ((n: number) => Ease)>;

/**
 * Resorte definido por sensación: `bounce` (0 = sin rebote, ~0.3 sutil, ~0.6 marcado) y `duration` (s)
 * que tarda en llegar. Devuelve 0→1 y puede pasarse de 1 mientras rebota.
 */
export const useBounce = (o: { delay?: number; duration?: number; bounce?: number } = {}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { delay = 0, duration = 0.5, bounce = 0.35 } = o;
  const gen = React.useMemo(() => spring({ keyframes: [0, 1], visualDuration: duration, bounce }), [duration, bounce]);
  const ms = (frame / fps - delay) * 1000;
  return ms <= 0 ? 0 : gen.next(ms).value;
};

/**
 * Inercia: algo lanzado con `velocity` (px/s) que frena solo. Devuelve el desplazamiento en px.
 * `timeConstant` (ms) más alto = frena más despacio.
 */
export const useInertia = (o: { delay?: number; velocity: number; power?: number; timeConstant?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { delay = 0, velocity, power = 0.8, timeConstant = 325 } = o;
  const gen = React.useMemo(() => inertia({ keyframes: [0], velocity, power, timeConstant, restDelta: 0.01 }), [velocity, power, timeConstant]);
  const ms = (frame / fps - delay) * 1000;
  return ms <= 0 ? 0 : gen.next(ms).value;
};

/**
 * Mezcla valores compuestos entre varios puntos: colores, sombras, cadenas como "10px 20px".
 * blend([0, 0.5, 1], ["#2b59ff", "#ffd400", "#ff5a36"])(p)
 */
export const blend = <T extends string | number>(stops: number[], values: T[]) => {
  const mixer = mixStops(stops, values, { clamp: true });
  return (p: number): T => mixer(clamp01(p));
};

export type StaggerOrigin = "first" | "last" | "center" | "edges" | number;
/**
 * Desfase en segundos para el elemento `i` de `total`, partiendo de `from`.
 * Con `grid: [columnas, filas]` el desfase es por distancia en la cuadrícula.
 */
export const staggerDelay = (i: number, total: number, o: { gap?: number; from?: StaggerOrigin; grid?: [number, number] } = {}) =>
  stagger(o.gap ?? 0.06, { from: o.from ?? "center", grid: o.grid })(i, total);

/** Entrada con resorte por `bounce`. `mode`: escala, o deslizamiento desde un lado. */
export const BounceIn: React.FC<{
  children: React.ReactNode; delay?: number; duration?: number; bounce?: number;
  mode?: "scale" | Direction; distance?: number; inline?: boolean; style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 0.5, bounce = 0.35, mode = "scale", distance = 120, inline, style }) => {
  const v = useBounce({ delay, duration, bounce });
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = clamp01(((frame / fps - delay) / Math.max(duration, 0.01)) * 4);
  const off = (1 - v) * distance;
  const translate = mode === "up" ? `0px ${off}px` : mode === "down" ? `0px ${-off}px` : mode === "left" ? `${off}px 0px` : mode === "right" ? `${-off}px 0px` : undefined;
  return (
    <span style={{ display: inline ? "inline-block" : "block", ...style, opacity, scale: mode === "scale" ? Math.max(0, v) : undefined, translate }}>
      {children}
    </span>
  );
};

/** Como <Stagger>, pero el desfase parte del centro, los bordes o una posición de la cuadrícula. `gap` en frames. */
export const StaggerFrom: React.FC<Omit<MotionProps, "children"> & { from?: StaggerOrigin; gap?: number; grid?: [number, number]; children: React.ReactNode }> = ({
  from = "center", gap = 3, grid, delay = 0, children, ...rest
}) => {
  const { fps } = useVideoConfig();
  const items = React.Children.toArray(children);
  return (
    <>
      {items.map((child, i) => (
        <Motion key={i} {...rest} delay={delay + staggerDelay(i, items.length, { gap: gap / fps, from, grid })}>
          {child}
        </Motion>
      ))}
    </>
  );
};
