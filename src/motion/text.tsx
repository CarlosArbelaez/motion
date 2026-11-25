import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Motion, MotionProps, PresetName } from "./core";
import { clamp01, EASE } from "./easings";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type SplitProps = Omit<MotionProps, "children" | "inline"> & {
  text: string;
  /** Unidad que se anima */
  by?: "letter" | "word" | "line";
  preset?: PresetName;
  /** Frames de desfase entre unidades (por defecto 1.5 letra, 3 palabra, 5 línea) */
  stagger?: number;
};

/** Texto animado por letra, palabra o línea (separa líneas con \n). */
export const SplitText: React.FC<SplitProps> = ({ text, by = "word", preset = "mask", stagger, delay = 0, style, ...rest }) => {
  const { fps } = useVideoConfig();
  const gap = (stagger ?? { letter: 1.5, word: 3, line: 5 }[by]) / fps;
  let n = 0;
  const unit = (content: string, key: React.Key, block = false) => (
    <Motion key={key} preset={preset} inline={!block} delay={delay + n++ * gap} {...rest}>
      {content}
    </Motion>
  );
  return (
    <span style={{ display: "block", ...style }}>
      {text.split("\n").map((line, li) =>
        by === "line" ? (
          unit(line, li, true)
        ) : (
          <span key={li} style={{ display: "block" }}>
            {line.split(" ").map((word, wi) => (
              <React.Fragment key={wi}>
                {wi > 0 ? " " : null}
                {by === "word" ? (
                  unit(word, wi)
                ) : (
                  <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {Array.from(word).map((ch, ci) => unit(ch, ci))}
                  </span>
                )}
              </React.Fragment>
            ))}
          </span>
        ),
      )}
    </span>
  );
};

/** Máquina de escribir con cursor. `cps` = caracteres por segundo. */
export const Typewriter: React.FC<{ text: string; cps?: number; delay?: number; cursor?: string; style?: React.CSSProperties }> = ({
  text, cps = 18, delay = 0, cursor = "▌", style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - delay;
  const shown = Math.max(0, Math.min(text.length, Math.floor(t * cps)));
  const typing = shown < text.length && t > 0;
  const blink = typing || Math.floor(frame / (fps / 2)) % 2 === 0;
  return (
    <span style={{ whiteSpace: "pre-wrap", ...style }}>
      {text.slice(0, shown)}
      <span style={{ opacity: blink ? 1 : 0 }}>{cursor}</span>
    </span>
  );
};

/** Número que cuenta de `from` a `to` y frena al final. */
export const Counter: React.FC<{
  from?: number; to: number; duration?: number; delay?: number; decimals?: number;
  prefix?: string; suffix?: string; locale?: string; style?: React.CSSProperties;
}> = ({ from = 0, to, duration = 1.5, delay = 0, decimals = 0, prefix = "", suffix = "", locale = "es-CO", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const v = interpolate(frame, [delay * fps, (delay + duration) * fps], [from, to], { ...CLAMP, easing: EASE.outExpo });
  const txt = v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>{prefix}{txt}{suffix}</span>;
};

/** El espaciado entre letras se cierra mientras el texto enfoca. Títulos de cine. */
export const TrackingIn: React.FC<{ children: React.ReactNode; delay?: number; duration?: number; from?: number; style?: React.CSSProperties }> = ({
  children, delay = 0, duration = 1.2, from = 0.4, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const range = [delay * fps, (delay + duration) * fps];
  const e = interpolate(frame, range, [0, 1], { ...CLAMP, easing: EASE.outExpo });
  const lin = interpolate(frame, range, [0, 1], CLAMP);
  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap", ...style, letterSpacing: `${(1 - e) * from}em`, filter: `blur(${(1 - e) * 12}px)`, opacity: clamp01(lin * 2) }}>
      {children}
    </span>
  );
};

/** Subrayado que se dibuja bajo el contenido. */
export const DrawUnderline: React.FC<{ children: React.ReactNode; color?: string; thickness?: number; delay?: number; duration?: number }> = ({
  children, color = "currentColor", thickness = 6, delay = 0.3, duration = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = interpolate(frame, [delay * fps, (delay + duration) * fps], [0, 1], { ...CLAMP, easing: EASE.inOut });
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <svg viewBox="0 0 100 10" preserveAspectRatio="none"
        style={{ position: "absolute", left: 0, bottom: "-0.18em", width: "100%", height: "0.3em", overflow: "visible", clipPath: `inset(-100% ${(1 - e) * 100}% -100% -2%)` }}>
        <path d="M1 6 C 25 1, 60 9, 99 4" fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
};
