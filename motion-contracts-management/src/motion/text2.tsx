import React from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE } from "./easings";
import { useProgress } from "./progress";

const LINEAR = (t: number) => t;

/** Las letras cambian al azar y se van resolviendo de izquierda a derecha. Tecnológico. */
export const ScrambleText: React.FC<{ text: string; delay?: number; duration?: number; chars?: string; seed?: string; style?: React.CSSProperties }> = ({
  text, delay = 0, duration = 1.2, chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&", seed = "scramble", style,
}) => {
  const frame = useCurrentFrame();
  const p = useProgress(delay, duration, LINEAR);
  const letters = Array.from(text);
  const resolved = Math.floor(p * (letters.length + 1));
  return (
    <span style={{ whiteSpace: "pre", fontVariantNumeric: "tabular-nums", ...style }}>
      {letters.map((ch, i) => {
        if (i < resolved || ch === " ") return ch;
        return chars[Math.floor(random(`${seed}-${i}-${Math.floor(frame / 2)}`) * chars.length)];
      }).join("")}
    </span>
  );
};

/** Texto que ondula letra a letra de forma continua. */
export const WaveText: React.FC<{ text: string; amplitude?: number; speed?: number; spread?: number; style?: React.CSSProperties }> = ({
  text, amplitude = 14, speed = 1, spread = 0.5, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <span style={{ display: "inline-block", whiteSpace: "pre", ...style }}>
      {Array.from(text).map((ch, i) => (
        <span key={i} style={{ display: "inline-block", translate: `0px ${Math.sin((frame / fps) * speed * Math.PI * 2 - i * spread) * amplitude}px` }}>
          {ch}
        </span>
      ))}
    </span>
  );
};

/** Cifra tipo odómetro: cada dígito rueda hasta su valor. Pasa el número ya formateado en `value`. */
export const Odometer: React.FC<{ value: string; delay?: number; duration?: number; stagger?: number; spins?: number; style?: React.CSSProperties }> = ({
  value, delay = 0, duration = 1.4, stagger = 3, spins = 1, style,
}) => {
  const { fps } = useVideoConfig();
  const chars = Array.from(value);
  return (
    <span style={{ display: "inline-flex", lineHeight: 1, fontVariantNumeric: "tabular-nums", ...style }}>
      {chars.map((ch, i) => (
        <OdometerDigit key={i} ch={ch} delay={delay + ((chars.length - 1 - i) * stagger) / fps} duration={duration} spins={spins} />
      ))}
    </span>
  );
};
const OdometerDigit: React.FC<{ ch: string; delay: number; duration: number; spins: number }> = ({ ch, delay, duration, spins }) => {
  const p = useProgress(delay, duration, EASE.inOutExpo);
  if (!/\d/.test(ch)) return <span>{ch}</span>;
  const total = spins * 10 + Number(ch);
  const strip = Array.from({ length: total + 1 }, (_, n) => n % 10);
  return (
    <span style={{ display: "inline-block", height: "1em", overflow: "hidden" }}>
      <span style={{ display: "flex", flexDirection: "column", translate: `0px ${-p * total}em` }}>
        {strip.map((d, n) => <span key={n} style={{ height: "1em" }}>{d}</span>)}
      </span>
    </span>
  );
};

/** Resaltador tipo marcador que se pinta detrás del texto. */
export const Highlight: React.FC<{ children: React.ReactNode; color?: string; delay?: number; duration?: number; style?: React.CSSProperties }> = ({
  children, color = "#ffd400", delay = 0.2, duration = 0.5, style,
}) => {
  const p = useProgress(delay, duration, EASE.inOut);
  return (
    <span style={{ position: "relative", display: "inline-block", isolation: "isolate", padding: "0 0.15em", ...style }}>
      <span style={{ position: "absolute", inset: "8% 0 4% 0", background: color, zIndex: -1, borderRadius: "0.12em", rotate: "-1deg", transformOrigin: "0% 50%", scale: `${p} 1` }} />
      {children}
    </span>
  );
};

/** Cinta de contenido que se desplaza en bucle sin cortes. `secondsPerLoop` controla la velocidad. */
export const Marquee: React.FC<{ children: React.ReactNode; secondsPerLoop?: number; reverse?: boolean; gap?: number; style?: React.CSSProperties }> = ({
  children, secondsPerLoop = 6, reverse, gap = 60, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = ((frame / fps) / secondsPerLoop) % 1;
  const pct = (reverse ? t - 1 : -t) * 50;
  const item: React.CSSProperties = { display: "flex", flexShrink: 0, minWidth: "100%", gap, paddingRight: gap, justifyContent: "space-around", boxSizing: "border-box" };
  return (
    <div style={{ overflow: "hidden", width: "100%", ...style }}>
      <div style={{ display: "flex", width: "max-content", minWidth: "200%", whiteSpace: "nowrap", translate: `${pct}% 0px` }}>
        <div style={item}>{children}</div>
        <div style={item} aria-hidden>{children}</div>
      </div>
    </div>
  );
};
