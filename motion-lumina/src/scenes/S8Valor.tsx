import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {PhaseTitle} from "../components/motion";
import {Highlight, Scene} from "../components/ui";
import {ap, beesRadius, body, C, f, h1} from "../theme";
import {LX, Pattern, ROW, RX, tracks} from "./S7Dashboard";

const X0 = 1010;
const WL = 814;
const SC = WL / (RX - LX);
const TOP = 262;
const PITCH = 80;
// zona del tablero que enfoca cada beneficio: [x, y, ancho, alto]
const focus: [number, number, number, number][] = [
  [X0 + 108, TOP + 5 * PITCH + 20, 96, 62], // stoppers: una no entrega
  [X0 - 12, TOP + 4 * PITCH + 20, WL + 24, 62], // ejecución de la fuerza de ventas
  [X0 + 84, TOP + 1 * PITCH + 20, 78, 62], // un cliente sin activar
  [X0 - 12, TOP + 5 * PITCH + 20, WL + 24, 62], // operación logística
  [X0 + WL - 86, TOP + 8, 98, 7 * PITCH - 6], // lo más reciente
  [X0 - 12, TOP + 8, WL + 24, 3 * PITCH - 6], // de la creación a la retención
];

export const S8Valor: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cues = [c(91.3), c(95.16), c(98.08), c(100.96), c(104.72), c(108.4)];
  const active = cues.reduce((acc, q, i) => (frame >= q ? i : acc), 0);
  const fx = (k: number) => interpolate(frame, cues.flatMap((q) => [q - 2, q + 18]), focus.flatMap((fo, i) => [focus[Math.max(0, i - 1)][k], fo[k]]), {...cl, easing: ease});
  const lines: React.ReactNode[] = [
    <>Ver rápido dónde hay <Highlight at={cues[0] + 18}>stoppers</Highlight></>,
    <>Seguir la gestión de la <Highlight at={cues[1] + 18}>fuerza de ventas</Highlight></>,
    <>Detectar qué impide la <Highlight at={cues[2] + 18}>activación</Highlight></>,
    <>Mejorar la operación <Highlight at={cues[3] + 18}>logística</Highlight></>,
    <>Decidir con información <Highlight at={cues[4] + 18}>actualizada</Highlight></>,
    <>Dar <Highlight at={cues[5] + 18}>trazabilidad</Highlight> a los resultados</>,
  ];
  return (
    <Scene duration={duration}>
      <PhaseTitle phases={[{at: 6, node: <>Lo que esta visibilidad permite</>}]} />
      {/* avance: seis beneficios */}
      {lines.map((_, i) => (
        <div key={i} style={{position: "absolute", left: 96 + i * 132, top: 262, width: 120, height: 14, background: C.grey}}>
          <div style={{position: "absolute", inset: 0, background: i === active ? C.yellow : C.black, border: i === active ? `3px solid ${C.black}` : "none", boxSizing: "border-box", transformOrigin: "left center", scale: `${ap(frame, cues[i], 14)} 1`}} />
        </div>
      ))}
      {lines.map((node, i) => {
        const next = cues[i + 1] ?? 1e7;
        if (frame < cues[i] - 1 || frame > next + 6) return null;
        const inP = interpolate(frame, [cues[i], cues[i] + 18], [0, 1], {...cl, easing: ease});
        const outP = interpolate(frame, [next - 8, next + 4], [0, 1], cl);
        return (
          <div key={i} style={{position: "absolute", left: 96, top: 330, width: 840, ...h1(104), lineHeight: 1.16, opacity: inP * (1 - outP), translate: `0px ${(1 - inP) * 60 - outP * 40}px`}}>
            {node}
          </div>
        );
      })}
      {/* el tablero, en pequeño */}
      <svg width={1920} height={1080} style={{position: "absolute", inset: 0, opacity: ap(frame, 10, 20)}}>
        {tracks.map((t, i) => (
          <g key={t.name}>
            <line x1={X0} y1={TOP + i * PITCH + 4} x2={X0 + WL} y2={TOP + i * PITCH + 4} stroke={C.black} strokeWidth={2} />
            <g transform={`translate(${X0}, ${TOP + i * PITCH + 30}) scale(${SC})`}>
              <Pattern i={i} />
            </g>
          </g>
        ))}
        <line x1={X0 + WL} y1={TOP - 12} x2={X0 + WL} y2={TOP + 7 * PITCH + 8} stroke={C.black} strokeWidth={6} />
      </svg>
      {tracks.map((t, i) => (
        <div key={t.name} style={{position: "absolute", left: X0, top: TOP + i * PITCH + 6, ...body(24, 600), background: C.white, paddingRight: 8, opacity: ap(frame, 10, 20)}}>
          {t.name}
        </div>
      ))}
      <div style={{position: "absolute", left: X0, top: TOP + 7 * PITCH + 16, ...body(22), color: C.ink60, opacity: ap(frame, 20, 20)}}>Visualización ilustrativa, sin datos reales</div>
      {/* foco que salta a lo que cada beneficio permite ver */}
      <div style={{position: "absolute", left: fx(0), top: fx(1), width: fx(2), height: fx(3), boxSizing: "border-box", border: `7px solid ${C.black}`, borderRadius: beesRadius(22), background: "rgba(255,255,0,0.35)", opacity: ap(frame, cues[0], 12)}} />
      <span style={{display: "none"}}>{ROW}</span>
    </Scene>
  );
};
