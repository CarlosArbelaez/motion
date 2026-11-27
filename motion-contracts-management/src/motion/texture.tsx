import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE } from "./easings";

/** Grano de película generado por código. Va encima de todo; `opacity` 0.08–0.25. */
export const Grain: React.FC<{ opacity?: number; size?: number; fps?: number; blend?: React.CSSProperties["mixBlendMode"] }> = ({
  opacity = 0.14, size = 0.9, fps = 12, blend = "overlay",
}) => {
  const frame = useCurrentFrame();
  const video = useVideoConfig();
  const tick = Math.floor((frame / video.fps) * fps); // el grano cambia `fps` veces por segundo
  const id = `mp-grain-${tick}`;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: blend, opacity }}>
      <svg width="100%" height="100%">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency={size} numOctaves={2} seed={tick % 997} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Fuga de luz generada por código: manchas cálidas desenfocadas que cruzan el cuadro.
 * Colócala sobre un corte o al inicio de una escena. Empieza en `at` (s) y dura `duration` (s).
 */
export const LightLeak: React.FC<{ at?: number; duration?: number; colors?: string[]; intensity?: number; seed?: string }> = ({
  at = 0, duration = 1, colors = ["#ff7a18", "#ffd400", "#ff3d6e"], intensity = 0.85, seed = "leak",
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const t = (frame / fps - at) / duration;
  if (t <= 0 || t >= 1) return null;
  const p = interpolate(t, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.inOut });
  const strength = Math.sin(t * Math.PI) * intensity;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", opacity: strength, filter: `blur(${width * 0.06}px)` }}>
      {colors.map((color, i) => {
        const y = 15 + random(`${seed}-y-${i}`) * 70;
        const w = 45 + random(`${seed}-w-${i}`) * 40;
        const x = -60 + p * 220 - i * 28 - random(`${seed}-x-${i}`) * 20;
        return (
          <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y - w / 2}%`, width: `${w}%`, height: `${w}%`, borderRadius: "50%", background: `radial-gradient(circle, ${color} 0%, transparent 68%)`, rotate: `${random(`${seed}-r-${i}`) * 60 - 30}deg`, scale: `1.6 1` }} />
        );
      })}
    </AbsoluteFill>
  );
};
