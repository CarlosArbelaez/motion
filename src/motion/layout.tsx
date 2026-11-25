import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE, Ease } from "./easings";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const ParallaxCtx = React.createContext<{ x: number; y: number }>({ x: 0, y: 0 });

/** Movimiento de cámara para capas con profundidad. La cámara recorre `travelX/Y` px durante la Sequence. */
export const Parallax: React.FC<{ travelX?: number; travelY?: number; easing?: Ease; children: React.ReactNode }> = ({
  travelX = -300, travelY = 0, easing = EASE.inOut, children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { ...CLAMP, easing });
  return <ParallaxCtx.Provider value={{ x: travelX * p, y: travelY * p }}>{children}</ParallaxCtx.Provider>;
};
/** Capa del parallax. `depth` 0 = fondo lejano (casi no se mueve), 1 = primer plano. */
export const ParallaxLayer: React.FC<{ depth: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ depth, children, style }) => {
  const { x, y } = React.useContext(ParallaxCtx);
  return <AbsoluteFill style={{ ...style, translate: `${x * depth}px ${y * depth}px` }}>{children}</AbsoluteFill>;
};

/** Pila de tarjetas que se barajan: la de arriba sale por un lado y pasa al fondo cada `interval` s. */
export const CardStack: React.FC<{ cards: React.ReactNode[]; interval?: number; shuffle?: number; offset?: number }> = ({
  cards, interval = 1.5, shuffle = 0.6, offset = 22,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = cards.length;
  const cycle = interval * fps;
  const step = Math.floor(frame / cycle);
  const p = interpolate(frame % cycle, [cycle - shuffle * fps, cycle], [0, 1], { ...CLAMP, easing: EASE.inOut });
  return (
    <div style={{ position: "relative", display: "grid" }}>
      {cards.map((card, i) => {
        const pos = (((i - step) % n) + n) % n; // 0 = arriba
        const leaving = pos === 0;
        const to = leaving ? n - 1 : pos - 1;
        const depth = pos + (to - pos) * p;
        const arc = leaving ? Math.sin(p * Math.PI) : 0;
        return (
          <div key={i} style={{
            gridArea: "1 / 1", zIndex: leaving ? (p < 0.5 ? n : 0) : n - pos,
            translate: `${arc * 115}% ${-depth * offset}px`, rotate: `${arc * 10}deg`, scale: 1 - depth * 0.05,
            filter: `brightness(${1 - depth * 0.12})`,
          }}>
            {card}
          </div>
        );
      })}
    </div>
  );
};

/** Inclinación 3D suave y continua. Da volumen a tarjetas, capturas de pantalla y mockups. */
export const Tilt3D: React.FC<{ children: React.ReactNode; maxX?: number; maxY?: number; speed?: number; perspective?: number; style?: React.CSSProperties }> = ({
  children, maxX = 8, maxY = 14, speed = 0.25, perspective = 1200, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * speed * Math.PI * 2;
  return (
    <div style={{ perspective, ...style }}>
      <div style={{ transform: `rotateX(${Math.sin(t * 0.8) * maxX}deg) rotateY(${Math.cos(t) * maxY}deg)`, transformStyle: "preserve-3d" }}>{children}</div>
    </div>
  );
};

export type CameraKey = { at: number; x: number; y: number; scale?: number };
/**
 * Cámara que recorre un lienzo más grande que su contenedor. Cada keyframe indica el punto del lienzo (px)
 * que queda en el centro en el segundo `at`, y el zoom.
 */
export const CameraPan: React.FC<{ keys: CameraKey[]; easing?: Ease; children: React.ReactNode }> = ({ keys, easing = EASE.inOutExpo, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  let i = 0;
  while (i < keys.length - 2 && t >= keys[i + 1].at) i++;
  const a = keys[i];
  const b = keys[Math.min(i + 1, keys.length - 1)];
  const p = b.at > a.at ? interpolate(t, [a.at, b.at], [0, 1], { ...CLAMP, easing }) : 1;
  const mix = (u: number, v: number) => u + (v - u) * p;
  const s = mix(a.scale ?? 1, b.scale ?? 1);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", transformOrigin: "0 0", transform: `translate(${-mix(a.x, b.x) * s}px, ${-mix(a.y, b.y) * s}px) scale(${s})` }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
