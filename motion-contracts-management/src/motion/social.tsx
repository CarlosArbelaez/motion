import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Motion } from "./core";
import { EASE } from "./easings";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Lower third: barra de acento + nombre + cargo, con desfase. Colócalo dentro de una <Sequence> con duración. */
export const LowerThird: React.FC<{ name: string; role?: string; accent?: string; color?: string; fontSize?: number; style?: React.CSSProperties }> = ({
  name, role, accent = "#ffd400", color = "#ffffff", fontSize = 56, style,
}) => {
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", gap: fontSize * 0.35, alignItems: "stretch", color, ...style }}>
      <Motion preset="wipe" inDur={0.45} style={{ width: fontSize * 0.14, background: accent, borderRadius: 4 }}>{" "}</Motion>
      <div>
        <Motion preset="mask" delay={4 / fps} style={{ fontSize, fontWeight: 800, lineHeight: 1.1 }}>{name}</Motion>
        {role ? (
          <Motion preset="slide" direction="left" distance={30} delay={8 / fps} style={{ fontSize: fontSize * 0.5, opacity: 0.85, marginTop: fontSize * 0.1 }}>
            {role}
          </Motion>
        ) : null}
      </div>
    </div>
  );
};

/** Botón de suscribirse/seguir: entra con pop, recibe un clic en `clickAt` (s) y cambia de estado. */
export const SubscribeButton: React.FC<{ label?: string; doneLabel?: string; color?: string; doneColor?: string; clickAt?: number; fontSize?: number }> = ({
  label = "Suscribirse", doneLabel = "Suscrito ✓", color = "#ff0033", doneColor = "#3a3a3a", clickAt = 1.2, fontSize = 48,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = clickAt * fps;
  const press = interpolate(frame, [c - 3, c, c + 5], [1, 0.9, 1], { ...CLAMP, easing: EASE.inOut });
  const done = frame >= c;
  return (
    <Motion preset="pop" inline>
      <div style={{ scale: press, background: done ? doneColor : color, color: "#fff", fontSize, fontWeight: 700, padding: `${fontSize * 0.4}px ${fontSize * 0.9}px`, borderRadius: fontSize, whiteSpace: "nowrap" }}>
        {done ? doneLabel : label}
      </div>
    </Motion>
  );
};

/** Notificación tipo móvil que cae desde arriba y sale hacia arriba. */
export const Notification: React.FC<{ title: string; body?: string; icon?: React.ReactNode; width?: number }> = ({ title, body, icon, width = 820 }) => (
  <Motion preset="drop" distance={120} easeOut={EASE.anticipate} outDur={0.4}>
    <div style={{ width, display: "flex", gap: 24, alignItems: "center", background: "rgba(255,255,255,0.94)", color: "#111", padding: "28px 32px", borderRadius: 36, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
      {icon ? <div style={{ flexShrink: 0 }}>{icon}</div> : null}
      <div>
        <div style={{ fontSize: 36, fontWeight: 700 }}>{title}</div>
        {body ? <div style={{ fontSize: 30, opacity: 0.7, marginTop: 6 }}>{body}</div> : null}
      </div>
    </div>
  </Motion>
);

/** Destello de líneas radiales para acentuar un pop o un clic. Empieza en `at` (s). */
export const Burst: React.FC<{ at?: number; count?: number; color?: string; size?: number; thickness?: number }> = ({
  at = 0, count = 10, color = "#ffd400", size = 240, thickness = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const range = [at * fps, (at + 0.5) * fps];
  const head = interpolate(frame, range, [0, 1], { ...CLAMP, easing: EASE.outExpo });
  const tail = interpolate(frame, range, [0, 1], { ...CLAMP, easing: EASE.inOut });
  if (frame < range[0] || tail >= 1) return null;
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`${-r} ${-r} ${size} ${size}`} style={{ overflow: "visible" }}>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2;
        const r1 = r * (0.35 + 0.65 * tail);
        const r2 = r * (0.35 + 0.65 * head);
        return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} stroke={color} strokeWidth={thickness} strokeLinecap="round" />;
      })}
    </svg>
  );
};
