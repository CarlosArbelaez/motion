import React from "react";
import { useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog, easeInOut } from "../anim";
import { Check, Person } from "./Icons";

/**
 * Código visual de la presentación To-Be:
 *  - Persona       → contorno negro sólido
 *  - Regla         → relleno amarillo (automatización)
 *  - Agente de IA  → contorno punteado (propone)
 */
export type Kind = "persona" | "regla" | "ia";

export const kindStyle = (kind: Kind, stroke = 3): React.CSSProperties => {
  if (kind === "regla") return { background: C.yellowSoft, border: `${stroke}px solid ${C.yellow}` };
  if (kind === "ia") return { background: C.white, border: `${stroke}px dashed ${C.ink}` };
  return { background: C.white, border: `${stroke}px solid ${C.ink}` };
};

export const KindPill: React.FC<{ kind: Kind; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  kind,
  children,
  size = 22,
  style,
}) => {
  const base: React.CSSProperties =
    kind === "regla"
      ? { background: C.yellow, border: `2px solid ${C.yellow}` }
      : kind === "ia"
        ? { background: C.white, border: `2px dashed ${C.ink}` }
        : { background: C.white, border: `2px solid ${C.ink}` };
  return (
    <div
      style={{
        ...base,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 999,
        padding: `${size * 0.22}px ${size * 0.7}px`,
        fontFamily: F.body,
        fontWeight: 700,
        fontSize: size,
        color: C.ink,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Leyenda transversal: las reglas calculan, la IA propone y las personas deciden. */
export const Legend: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: "absolute",
      right: 120,
      top: 52,
      display: "flex",
      gap: 12,
      opacity,
    }}
  >
    <KindPill kind="regla">Las reglas calculan</KindPill>
    <KindPill kind="ia">La IA propone</KindPill>
    <KindPill kind="persona">
      <Person size={22} strokeWidth={2.6} />
      Las personas deciden
    </KindPill>
  </div>
);

export const Eyebrow: React.FC<{ opacity: number; text?: string; color?: string }> = ({
  opacity,
  text = "HE Agentic Hub · Canal High End",
  color = C.text2,
}) => (
  <div
    style={{
      position: "absolute",
      left: 120,
      top: 58,
      fontFamily: F.body,
      fontWeight: 700,
      fontSize: 24,
      color,
      opacity,
      letterSpacing: 0.2,
    }}
  >
    {text}
  </div>
);

/**
 * Título principal de cada placa (Avantt Bold) con subrayado amarillo en la palabra clave,
 * como en la portada del deck.
 */
export const SceneTitle: React.FC<{
  lead?: string; // p. ej. "NOW"
  text: string;
  highlight?: string; // fragmento de `text` a subrayar
  start?: number;
  size?: number;
  top?: number;
}> = ({ lead, text, highlight, start = 0, size = 72, top = 112 }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, 16);
  const u = prog(frame, start + 10, 16, easeInOut);
  const renderText = () => {
    if (!highlight || !text.includes(highlight)) return text;
    const [a, b] = text.split(highlight);
    return (
      <>
        {a}
        <span style={{ position: "relative", display: "inline-block" }}>
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: size * 0.04,
              height: size * 0.14,
              width: `${u * 100}%`,
              background: C.yellow,
              zIndex: -1,
            }}
          />
          {highlight}
        </span>
        {b}
      </>
    );
  };
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top,
        right: 120,
        fontFamily: F.display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: -1.2,
        color: C.ink,
        opacity: p,
        transform: `translateY(${(1 - p) * 26}px)`,
        isolation: "isolate",
        whiteSpace: "nowrap",
      }}
    >
      {lead ? (
        <>
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                left: -6,
                right: -6,
                top: size * 0.08,
                bottom: size * 0.02,
                background: C.yellow,
                zIndex: -1,
                transform: `scaleX(${u})`,
                transformOrigin: "left",
              }}
            />
            {lead}
          </span>
          {" · "}
        </>
      ) : null}
      {renderText()}
    </div>
  );
};

/** Barra gris de dato (sin cifras inventadas). */
export const DataBar: React.FC<{ width: number; progress: number; height?: number; color?: string }> = ({
  width,
  progress,
  height = 14,
  color = C.hairline,
}) => (
  <div style={{ width: width * progress, height, borderRadius: height / 2, background: color }} />
);

export const CheckDot: React.FC<{ progress: number; size?: number; fill?: string; color?: string }> = ({
  progress,
  size = 30,
  fill = C.ink,
  color = C.white,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: fill,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `scale(${0.6 + 0.4 * progress})`,
      opacity: progress,
      flexShrink: 0,
    }}
  >
    <Check size={size * 0.7} color={color} strokeWidth={3.4} progress={progress} />
  </div>
);
