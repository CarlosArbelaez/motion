import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {h1} from "../theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** Titular que cambia con la locución: cada frase entra subiendo desde una máscara y la anterior sale. */
export const PhaseTitle: React.FC<{
  phases: {at: number; node: React.ReactNode}[];
  size?: number;
  left?: number;
  top?: number;
  width?: number;
}> = ({phases, size = 70, left = 96, top = 84, width = 1480}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: "absolute", left, top, width, height: size * 1.3, overflow: "hidden"}}>
      {phases.map((p, i) => {
        const next = phases[i + 1]?.at ?? 1e7;
        const inP = interpolate(frame, [p.at, p.at + 16], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
        const outP = interpolate(frame, [next - 8, next + 4], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic)});
        if (frame < p.at - 1 || frame > next + 5) return null;
        return (
          <div key={i} style={{position: "absolute", left: 0, top: 4, whiteSpace: "nowrap", ...h1(size), translate: `0px ${(1 - inP) * size * 1.2 - outP * size * 1.3}px`}}>
            {p.node}
          </div>
        );
      })}
    </div>
  );
};

/** Revela su contenido (SVG) de izquierda a derecha hasta `x`. */
export const RevealX: React.FC<{id: string; x: number; height: number; y?: number; children: React.ReactNode}> = ({id, x, height, y = 0, children}) => (
  <>
    <defs>
      <clipPath id={id}>
        <rect x={0} y={y} width={Math.max(0, x)} height={height} />
      </clipPath>
    </defs>
    <g clipPath={`url(#${id})`}>{children}</g>
  </>
);

/** Tienda (punto de venta) construida con formas planas en colores BEES. */
export const Store: React.FC<{x: number; bottom: number; w?: number}> = ({x, bottom, w = 200}) => {
  const bodyH = w * 0.6;
  const awH = w * 0.26;
  const stripes = 5;
  const aw = w * 1.12;
  const ax = x - (aw - w) / 2;
  return (
    <g>
      <rect x={x} y={bottom - bodyH} width={w} height={bodyH} fill="#FFFFFF" stroke="#000" strokeWidth={6} />
      <rect x={x + w * 0.58} y={bottom - bodyH * 0.72} width={w * 0.26} height={bodyH * 0.72} fill="#000" />
      <rect x={x + w * 0.14} y={bottom - bodyH * 0.72} width={w * 0.3} height={bodyH * 0.38} fill="#9CFFFD" stroke="#000" strokeWidth={5} />
      {Array.from({length: stripes}).map((_, i) => (
        <path
          key={i}
          d={`M${ax + (aw / stripes) * i},${bottom - bodyH - awH} h${aw / stripes} v${awH * 0.7} a${aw / stripes / 2},${awH * 0.3} 0 0 1 -${aw / stripes},0 Z`}
          fill={i % 2 === 0 ? "#000" : "#FFFF00"}
          stroke="#000"
          strokeWidth={5}
        />
      ))}
    </g>
  );
};

/** Trazo que se dibuja de 0 a 1 (progreso `p`). */
export const Draw: React.FC<{d: string; p: number; stroke?: string; width?: number; dash?: string}> = ({d, p, stroke = "#000", width = 10}) => (
  <path d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, Math.max(0, p))} fill="none" stroke={stroke} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" opacity={p <= 0 ? 0 : 1} />
);

/** Segmentos de "pulso": un pico por cada compra. */
export const peaksPath = (xs: number[], yb: number, h: number, half = 30) => xs.map((x) => ` L${x - half},${yb} L${x},${yb - h} L${x + half},${yb}`).join("");

/** Rayos alrededor de la bombilla del logo. */
export const Rays: React.FC<{cx: number; cy: number; at: number; frame: number}> = ({cx, cy, at, frame}) => (
  <svg width={1920} height={1080} style={{position: "absolute", inset: 0}}>
    {Array.from({length: 9}).map((_, i) => {
      const a = ((-170 + i * 20) * Math.PI) / 180;
      const p = interpolate(frame, [at + i * 2, at + i * 2 + 12], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
      const r0 = 168;
      const r1 = r0 + 46 * p;
      return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1} stroke="#000" strokeWidth={9} strokeLinecap="round" opacity={p} />;
    })}
  </svg>
);
