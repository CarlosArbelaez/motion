import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { captionsOf, sceneSeconds } from "../lib/timing";

export const W = 1920;
export const H = 1080;
export const MX = 110; // margen lateral seguro

const CHAPTERS = ["1 · Hoy", "2 · La propuesta", "3 · IA con control", "4 · MVP y plan", "5 · Decisiones"];

/** Marco común: fondo, navegación por capítulos, título y nota al pie. Zona inferior reservada a subtítulos. */
export const Shell: React.FC<{
  id: string;
  chapter: number;
  title: React.ReactNode;
  foot?: string;
  children?: React.ReactNode;
}> = ({ id, chapter, title, foot, children }) => {
  const t = useSec();
  const total = sceneSeconds(id);
  const fade = Math.min(prog(t, 0, 0.45), 1 - prog(t, total - 0.35, 0.35));
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: FONT.body, color: C.ink }}>
      <div style={{ position: "absolute", left: MX, top: 54, display: "flex", gap: 10, alignItems: "center" }}>
        {CHAPTERS.map((c, i) => (
          <div
            key={c}
            style={{
              fontSize: 24,
              fontWeight: i + 1 === chapter ? 700 : 400,
              color: i + 1 === chapter ? C.ink : C.mute,
              background: i + 1 === chapter ? C.yellow : "transparent",
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            {c}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", right: MX, top: 62, fontSize: 22, color: C.faint, fontFamily: FONT.mono }}>
        Contracts Management · Finance Tech
      </div>
      <AbsoluteFill style={{ opacity: fade }}>
        <Rise at={0.1} y={18} style={{ position: "absolute", left: MX, top: 128, width: 1700 }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 62, lineHeight: 1.08, letterSpacing: -1.2 }}>
            {title}
          </div>
        </Rise>
        {children}
        {foot ? (
          <Rise at={0.8} y={0} style={{ position: "absolute", left: MX, top: 876, width: 1700 }}>
            <div style={{ fontSize: 22, color: C.mute }}>{foot}</div>
          </Rise>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Subtítulos: máx. dos líneas, en su propia franja inferior. */
export const Captions: React.FC<{ id: string }> = ({ id }) => {
  const t = useSec();
  const chunks = React.useMemo(() => captionsOf(id), [id]);
  const c = chunks.find((k) => t >= k.s && t < k.e);
  if (!c) return null;
  const o = Math.min(prog(t, c.s, 0.12), 1);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 46 }}>
      <div
        style={{
          opacity: o,
          maxWidth: 1240,
          background: "rgba(20,22,26,0.92)",
          color: C.white,
          fontFamily: FONT.body,
          fontWeight: 500,
          fontSize: 36,
          lineHeight: 1.25,
          padding: "12px 30px 14px",
          borderRadius: 16,
          textAlign: "center",
          textWrap: "balance",
        }}
      >
        {c.text}
      </div>
    </AbsoluteFill>
  );
};

export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      background: C.white,
      border: `2px solid ${C.line}`,
      borderRadius: 20,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pill: React.FC<{
  bg?: string;
  color?: string;
  border?: string;
  size?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ bg = C.ink, color = C.white, border, size = 26, style, children }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      background: bg,
      color,
      border: border ? `2px solid ${border}` : undefined,
      fontSize: size,
      fontWeight: 700,
      padding: `${Math.round(size * 0.34)}px ${Math.round(size * 0.75)}px`,
      borderRadius: 999,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

/** El protagonista de la historia: un contrato. Se reutiliza en todas las escenas. */
export const ContractIcon: React.FC<{ size?: number; accent?: string; paper?: string; stroke?: string }> = ({
  size = 80,
  accent = C.yellow,
  paper = C.white,
  stroke = C.ink,
}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
    <path d="M6 4 H54 L74 24 V96 H6 Z" fill={paper} stroke={stroke} strokeWidth={4} strokeLinejoin="round" />
    <path d="M54 4 V24 H74" fill="none" stroke={stroke} strokeWidth={4} strokeLinejoin="round" />
    <rect x={16} y={36} width={48} height={10} rx={3} fill={accent} stroke={stroke} strokeWidth={2.5} />
    <line x1={16} y1={58} x2={64} y2={58} stroke={stroke} strokeWidth={4} strokeLinecap="round" />
    <line x1={16} y1={70} x2={64} y2={70} stroke={stroke} strokeWidth={4} strokeLinecap="round" />
    <line x1={16} y1={82} x2={44} y2={82} stroke={stroke} strokeWidth={4} strokeLinecap="round" />
  </svg>
);

export const Check: React.FC<{ size?: number; bg?: string; color?: string }> = ({
  size = 44,
  bg = C.green,
  color = C.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <circle cx={22} cy={22} r={22} fill={bg} />
    <path d="M12 23 L19 30 L32 15" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Cross: React.FC<{ size?: number; bg?: string; color?: string }> = ({
  size = 44,
  bg = C.red,
  color = C.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <circle cx={22} cy={22} r={22} fill={bg} />
    <path d="M14 14 L30 30 M30 14 L14 30" fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

/** Flecha horizontal que se dibuja de izquierda a derecha. */
export const ArrowRight: React.FC<{ x: number; y: number; w: number; at: number; color?: string }> = ({
  x,
  y,
  w,
  at,
  color = C.mute,
}) => {
  const t = useSec();
  const p = prog(t, at, 0.5);
  return (
    <svg style={{ position: "absolute", left: x, top: y - 12, opacity: p }} width={w} height={24}>
      <line x1={2} y1={12} x2={2 + (w - 14) * p} y2={12} stroke={color} strokeWidth={4} strokeLinecap="round" />
      <path
        d={`M${(w - 16) * p + 2} 3 L${(w - 4) * p + 2} 12 L${(w - 16) * p + 2} 21`}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Envelope: React.FC<{ size?: number; color?: string; fill?: string }> = ({
  size = 30,
  color = C.mute,
  fill = C.white,
}) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 50 36">
    <rect x={2} y={2} width={46} height={32} rx={5} fill={fill} stroke={color} strokeWidth={4} />
    <path d="M4 6 L25 21 L46 6" fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" />
  </svg>
);
