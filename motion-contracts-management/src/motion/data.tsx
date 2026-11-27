import React from "react";
import { useVideoConfig } from "remotion";
import { clamp01, EASE } from "./easings";
import { useProgress } from "./progress";

const fmt = (n: number, locale: string) => Math.round(n).toLocaleString(locale);

export type Datum = { label: string; value: number; color?: string };

const Bar: React.FC<{ d: Datum; max: number; height: number; width: number; color: string; delay: number; locale: string; fontSize: number }> = ({
  d, max, height, width, color, delay, locale, fontSize,
}) => {
  const p = useProgress(delay, 0.9, EASE.outExpo);
  const lin = useProgress(delay, 0.3, (t) => t);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width, fontSize }}>
      <div style={{ fontWeight: 700, opacity: lin, marginBottom: fontSize * 0.3, fontVariantNumeric: "tabular-nums" }}>{fmt(d.value * p, locale)}</div>
      <div style={{ width: "100%", height: (d.value / max) * height * p, background: d.color ?? color, borderRadius: `${width * 0.12}px ${width * 0.12}px 0 0` }} />
      <div style={{ opacity: 0.75 * lin, marginTop: fontSize * 0.4, whiteSpace: "nowrap" }}>{d.label}</div>
    </div>
  );
};
/** Gráfico de barras que crecen una tras otra con su valor contando. */
export const BarChart: React.FC<{ data: Datum[]; height?: number; barWidth?: number; gap?: number; color?: string; delay?: number; stagger?: number; locale?: string; fontSize?: number }> = ({
  data, height = 400, barWidth = 90, gap = 36, color = "#ffd400", delay = 0, stagger = 4, locale = "es-CO", fontSize = 28,
}) => {
  const { fps } = useVideoConfig();
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap }}>
      {data.map((d, i) => <Bar key={i} d={d} max={max} height={height} width={barWidth} color={color} delay={delay + (i * stagger) / fps} locale={locale} fontSize={fontSize} />)}
    </div>
  );
};

/** Gráfico de línea que se dibuja de izquierda a derecha, con área y punto final. */
export const LineChart: React.FC<{ points: number[]; width?: number; height?: number; color?: string; strokeWidth?: number; delay?: number; duration?: number }> = ({
  points, width = 800, height = 360, color = "#ffd400", strokeWidth = 6, delay = 0, duration = 1.4,
}) => {
  const p = useProgress(delay, duration, EASE.inOut);
  const dot = useProgress(delay + duration - 0.1, 0.4, EASE.overshoot);
  const min = Math.min(...points), max = Math.max(...points);
  const xy = points.map((v, i) => [(i / (points.length - 1)) * width, height - ((v - min) / (max - min || 1)) * height] as const);
  const line = xy.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const last = xy[xy.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <path d={`${line} L${width} ${height} L0 ${height} Z`} fill={color} opacity={0.18} style={{ clipPath: `inset(0% ${(1 - p) * 100}% 0% 0%)` }} />
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={p > 0 ? 1 : 0} />
      <circle cx={last[0]} cy={last[1]} r={strokeWidth * 1.8 * Math.max(0, dot)} fill={color} />
    </svg>
  );
};

/** Barra de progreso que se llena hasta `to` (0–1) con el porcentaje contando. */
export const ProgressBar: React.FC<{ to: number; label?: string; width?: number; height?: number; color?: string; track?: string; delay?: number; duration?: number; fontSize?: number }> = ({
  to, label, width = 700, height = 26, color = "#ffd400", track = "rgba(255,255,255,0.15)", delay = 0, duration = 1.2, fontSize = 30,
}) => {
  const p = useProgress(delay, duration, EASE.outExpo) * clamp01(to);
  return (
    <div style={{ width, fontSize }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: fontSize * 0.4 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{Math.round(p * 100)}%</span>
      </div>
      <div style={{ height, background: track, borderRadius: height, overflow: "hidden" }}>
        <div style={{ width: `${p * 100}%`, height: "100%", background: color, borderRadius: height }} />
      </div>
    </div>
  );
};

/** Anillo de porcentaje que se completa hasta `to` (0–1) con la cifra en el centro. */
export const RingProgress: React.FC<{ to: number; size?: number; thickness?: number; color?: string; track?: string; delay?: number; duration?: number; children?: React.ReactNode }> = ({
  to, size = 280, thickness = 26, color = "#ffd400", track = "rgba(255,255,255,0.15)", delay = 0, duration = 1.4, children,
}) => {
  const p = useProgress(delay, duration, EASE.outExpo) * clamp01(to);
  const r = (size - thickness) / 2;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, rotate: "-90deg" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={thickness} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={p > 0 ? 1 : 0} />
      </svg>
      <div style={{ fontSize: size * 0.24, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{children ?? `${Math.round(p * 100)}%`}</div>
    </div>
  );
};
