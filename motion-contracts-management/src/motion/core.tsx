import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, EASE, Ease } from "./easings";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type InOutOptions = {
  /** Segundos antes de empezar la entrada */
  delay?: number;
  /** Duración de la entrada en segundos */
  inDur?: number;
  /** Duración de la salida en segundos */
  outDur?: number;
  easeIn?: Ease;
  easeOut?: Ease;
  /** false = el elemento no sale, se queda hasta el final */
  exit?: boolean;
};

/**
 * Progreso de entrada (0→1) y de salida (0→1) dentro de la <Sequence> actual.
 * `enter`/`exit` llevan easing (pueden pasar de 1 con overshoot);
 * `enterLin`/`exitLin` son lineales y sirven para la opacidad.
 */
export const useInOut = (o: InOutOptions = {}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const delay = (o.delay ?? 0) * fps;
  const inDur = Math.max(1, (o.inDur ?? 0.6) * fps);
  const outDur = Math.max(1, (o.outDur ?? 0.35) * fps);
  const inRange = [delay, delay + inDur];
  const outRange = [durationInFrames - outDur, durationInFrames];
  const doExit = o.exit ?? true;
  return {
    enter: interpolate(frame, inRange, [0, 1], { ...CLAMP, easing: o.easeIn ?? EASE.outExpo }),
    enterLin: interpolate(frame, inRange, [0, 1], CLAMP),
    exit: doExit ? interpolate(frame, outRange, [0, 1], { ...CLAMP, easing: o.easeOut ?? EASE.inExpo }) : 0,
    exitLin: doExit ? interpolate(frame, outRange, [0, 1], CLAMP) : 0,
  };
};

export type Direction = "up" | "down" | "left" | "right";
const VEC: Record<Direction, [number, number]> = { up: [0, 1], down: [0, -1], left: [1, 0], right: [-1, 0] };

type Ctx = { e: number; x: number; eLin: number; xLin: number; fade: number; dist: number; dir: Direction };
type PresetDef = {
  easeIn: Ease;
  easeOut: Ease;
  inDur: number;
  outDur: number;
  mask?: boolean;
  style: (c: Ctx) => React.CSSProperties;
};

const KEYS = [0, 0.5, 0.75, 1];

export const PRESETS = {
  /** Desliza desde `direction` con fundido. El comodín. */
  slide: {
    easeIn: EASE.outExpo, easeOut: EASE.inExpo, inDur: 0.6, outDur: 0.35,
    style: ({ e, x, fade, dist, dir }) => {
      const [vx, vy] = VEC[dir];
      const k = (1 - e) * dist - x * dist * 0.6;
      return { opacity: fade, translate: `${vx * k}px ${vy * k}px` };
    },
  },
  /** Escala desde 0 con rebote. Iconos, stickers, botones. */
  pop: {
    easeIn: EASE.overshoot, easeOut: EASE.anticipate, inDur: 0.5, outDur: 0.3,
    style: ({ e, x, eLin }) => ({ scale: Math.max(0, e * (1 - x)), opacity: clamp01(eLin * 4) }),
  },
  /** Escala sutil con fundido. Elegante, para fotos y tarjetas. */
  scaleSoft: {
    easeIn: EASE.outSoft, easeOut: EASE.inSoft, inDur: 0.7, outDur: 0.35,
    style: ({ e, x, fade }) => ({ opacity: fade, scale: 0.85 + 0.15 * e + 0.05 * x }),
  },
  /** Cae desde arriba y rebota al aterrizar. */
  drop: {
    easeIn: EASE.overshoot, easeOut: EASE.inExpo, inDur: 0.55, outDur: 0.35,
    style: ({ e, x, fade, dist }) => ({
      opacity: fade,
      translate: `0px ${-(1 - e) * dist * 2 + x * dist * 2}px`,
      rotate: `${(1 - e) * 4}deg`,
    }),
  },
  /** Se balancea colgado de arriba. Etiquetas, carteles. */
  swing: {
    easeIn: EASE.overshootStrong, easeOut: EASE.inSoft, inDur: 0.7, outDur: 0.3,
    style: ({ e, x, fade }) => ({ opacity: fade, rotate: `${(1 - e) * -14 + x * 8}deg`, transformOrigin: "50% 0%" }),
  },
  /** Enfoca desde desenfocado. Cinematográfico. */
  blurIn: {
    easeIn: EASE.outSoft, easeOut: EASE.inSoft, inDur: 0.8, outDur: 0.4,
    style: ({ e, x, fade }) => ({ opacity: fade, filter: `blur(${(1 - e) * 20 + x * 20}px)`, scale: 1.08 - 0.08 * e }),
  },
  /** Sube desde detrás de una máscara. El clásico de títulos. */
  mask: {
    easeIn: EASE.outExpo, easeOut: EASE.inExpo, inDur: 0.7, outDur: 0.4, mask: true,
    style: ({ e, x }) => ({ translate: `0px ${(1 - e) * 110 - x * 110}%` }),
  },
  /** Se descubre de lado con un recorte. Barras, fondos, fotos. */
  wipe: {
    easeIn: EASE.inOut, easeOut: EASE.inOut, inDur: 0.6, outDur: 0.4,
    style: ({ e, x }) => ({ clipPath: `inset(0% ${(1 - e) * 100}% 0% ${x * 100}%)` }),
  },
  /** Gira en 3D sobre el eje horizontal. Tarjetas, cifras. */
  flip: {
    easeIn: EASE.overshoot, easeOut: EASE.inExpo, inDur: 0.6, outDur: 0.3,
    style: ({ e, x, fade }) => ({
      opacity: fade,
      transform: `perspective(1000px) rotateX(${(1 - e) * 90 - x * 90}deg)`,
      transformOrigin: "50% 50%",
    }),
  },
  /** Crece aplastándose y estirándose. Caricaturesco. */
  squash: {
    easeIn: EASE.outSoft, easeOut: EASE.inExpo, inDur: 0.55, outDur: 0.25,
    style: ({ eLin, x }) => {
      const sy = interpolate(eLin, KEYS, [0, 1.18, 0.94, 1]) * (1 - x);
      const sx = interpolate(eLin, KEYS, [1.3, 0.88, 1.05, 1]);
      return { scale: `${sx} ${Math.max(0, sy)}`, transformOrigin: "50% 100%", opacity: clamp01(eLin * 6) };
    },
  },
} satisfies Record<string, PresetDef>;

export type PresetName = keyof typeof PRESETS;
export const PRESET_NAMES = Object.keys(PRESETS) as PresetName[];

export type MotionProps = InOutOptions & {
  preset?: PresetName;
  /** Lado desde el que entra (solo `slide`) */
  direction?: Direction;
  /** Distancia en px para slide/drop */
  distance?: number;
  /** true = display inline-block (para texto) */
  inline?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/** Envuelve cualquier cosa y la anima con un preset de entrada y salida. */
export const Motion: React.FC<MotionProps> = ({
  preset = "slide", direction = "up", distance = 60, inline, style, children, ...o
}) => {
  const def: PresetDef = PRESETS[preset];
  const { enter, exit, enterLin, exitLin } = useInOut({
    ...o,
    inDur: o.inDur ?? def.inDur,
    outDur: o.outDur ?? def.outDur,
    easeIn: o.easeIn ?? def.easeIn,
    easeOut: o.easeOut ?? def.easeOut,
  });
  const fade = clamp01(enterLin * 2.5) * (1 - exitLin);
  const animated = def.style({ e: enter, x: exit, eLin: enterLin, xLin: exitLin, fade, dist: distance, dir: direction });
  const display = inline ? "inline-block" : "block";
  if (def.mask) {
    return (
      <span style={{ display, overflow: "hidden", verticalAlign: "top", paddingBottom: "0.12em", ...style }}>
        <span style={{ display, ...animated }}>{children}</span>
      </span>
    );
  }
  return <span style={{ display, ...style, ...animated }}>{children}</span>;
};

/** Anima cada hijo con el mismo preset, desfasados `gap` frames entre sí. */
export const Stagger: React.FC<Omit<MotionProps, "children"> & { gap?: number; children: React.ReactNode }> = ({
  gap = 3, delay = 0, children, ...rest
}) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {React.Children.toArray(children).map((child, i) => (
        <Motion key={i} {...rest} delay={delay + (i * gap) / fps}>
          {child}
        </Motion>
      ))}
    </>
  );
};

/** Deriva lenta para que nada quede congelado: escala 1→`to` durante toda la Sequence. */
export const Drift: React.FC<{ to?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  to = 1.04, children, style,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return <div style={{ ...style, scale: interpolate(frame, [0, durationInFrames], [1, to], CLAMP) }}>{children}</div>;
};
