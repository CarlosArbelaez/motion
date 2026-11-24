import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {Draw, PhaseTitle} from "../components/motion";
import {Highlight, Scene} from "../components/ui";
import {ap, body, C, f, h1, rise, t} from "../theme";

const COLS = 9;
const ROWS = 6;
const SP = 80;
const GX = 800;
const GY = 300;
const cells = Array.from({length: COLS * ROWS}, (_, i) => ({x: GX + (i % COLS) * SP, y: GY + Math.floor(i / COLS) * SP, pick: (i * 7 + 3) % 5 < 3, k: (i * 13) % 17}));

export const S2Contexto: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cues = [c(t("adquirir")), c(t("activar")), c(t("retener"))];
  const words = ["Adquirir", "Activar", "Retener"];
  const dnAt = c(t("impulsar"));
  const grow = interpolate(frame, [dnAt, dnAt + 40], [0, 1], {...cl, easing: ease});
  return (
    <Scene duration={duration}>
      <PhaseTitle phases={[{at: 6, node: <>Un proyecto de <Highlight at={c(t("Growth", 1, -0.15))}>Growth</Highlight> para el canal tradicional</>}]} />
      {/* los tres verbos del foco */}
      {words.map((w, i) => {
        const on = ap(frame, cues[i], 14);
        return (
          <div key={w} style={{position: "absolute", left: 96, top: 300 + i * 150, ...rise(frame, c(t("Su")) + i * 4, 30)}}>
            <div style={{position: "absolute", left: -6, right: -14, bottom: 14, height: 30, background: C.yellow, transformOrigin: "left center", scale: `${on} 1`}} />
            <div style={{position: "relative", ...h1(118), color: on > 0.3 ? C.black : "#C9C4D8"}}>{w}</div>
          </div>
        );
      })}
      {/* universo de clientes del canal tradicional */}
      <svg width={1920} height={1080} style={{position: "absolute", inset: 0}}>
        {cells.map((d, i) => {
          const base = ap(frame, 16 + d.k, 14);
          const acq = d.pick ? ap(frame, cues[0] + d.k * 0.9, 12) : 0;
          const act = d.pick ? ap(frame, cues[1] + d.k * 0.6, 10) : 0;
          return (
            <g key={i}>
              <circle cx={d.x} cy={d.y} r={7 * base} fill="#C9C4D8" />
              <circle cx={d.x} cy={d.y} r={24 * acq} fill={act > 0.5 ? C.yellow : C.white} stroke={C.black} strokeWidth={6} />
            </g>
          );
        })}
        {/* retener: el lazo que los mantiene */}
        <Draw d={`M${GX - 54},${GY - 14} a40,40 0 0 1 40,-40 h${(COLS - 1) * SP + 28} a40,40 0 0 1 40,40 v${(ROWS - 1) * SP + 28} a40,40 0 0 1 -40,40 h-${(COLS - 1) * SP + 28} a40,40 0 0 1 -40,-40 Z`} p={interpolate(frame, [cues[2], cues[2] + 34], [0, 1], {...cl, easing: ease})} width={9} />
        {/* la Distribución Numérica crece */}
        <g opacity={ap(frame, dnAt - 4, 10)}>
          <rect x={1640} y={760 - 330 * grow} width={70} height={330 * grow} fill={C.yellow} stroke={C.black} strokeWidth={7} />
          <path d={`M1595,${760 - 330 * grow} L1675,${660 - 330 * grow} L1755,${760 - 330 * grow} Z`} fill={C.yellow} stroke={C.black} strokeWidth={7} strokeLinejoin="round" />
        </g>
      </svg>
      <div style={{position: "absolute", left: GX - 54, top: 786, ...body(26), color: C.ink60, opacity: ap(frame, 30, 16)}}>Clientes del canal tradicional</div>
      <div style={{position: "absolute", left: 1500, top: 782, width: 350, textAlign: "center", ...rise(frame, dnAt + 8, 24)}}>
        <div style={{...h1(44), lineHeight: 1.05}}>Distribución Numérica</div>
      </div>
    </Scene>
  );
};
