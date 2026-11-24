import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {PhaseTitle, peaksPath, RevealX, Store} from "../components/motion";
import {Highlight, Scene} from "../components/ui";
import {ap, beesRadius, body, C, f, h1, pop, rise, t} from "../theme";

const YB = 600;
const PEAK = 210;
const first = [540];
const DELIV = 800;
const rec = [1010, 1110, 1210, 1310];
const stay = [1470, 1590, 1710];

export const S3Reto: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const a1 = c(t("primera", 1, -0.4));
  const aD = c(t("reciba", 1, -0.1));
  const a2 = c(t("compre", 1, -0.1));
  const a3 = c(t("fugue", 1, -0.7));
  // la cabeza del trazo avanza cuando la locución nombra cada momento
  const head = interpolate(frame, [12, a1, a1 + 20, aD, aD + 18, a2, a2 + 30, a3, a3 + 26], [330, 460, 640, 640, 900, 900, 1380, 1380, 1860], {...cl, easing: Easing.inOut(Easing.quad)});
  const frontsAt = c(t("Por"));
  const d = `M330,${YB}${peaksPath([...first, ...rec, ...stay], YB, PEAK)} L1850,${YB}`;
  const labels = [
    {x: 540, t: "Primera compra", at: a1 + 12},
    {x: DELIV, t: "Entrega a satisfacción", at: aD + 8},
    {x: 1160, t: "Compra recurrente", at: a2 + 18},
    {x: 1590, t: "Sin fuga", at: a3 + 14},
  ];
  return (
    <Scene duration={duration}>
      <PhaseTitle phases={[{at: 6, node: <>Que cada cliente compre, repita y <Highlight at={c(t("fugue", 1, -0.3))}>permanezca</Highlight></>}]} />
      <div style={{position: "absolute", left: 0, top: 330, width: 1920 * ap(frame, 2, 26), height: 340, background: C.grey}} />
      <svg width={1920} height={1080} style={{position: "absolute", inset: 0}}>
        <line x1={330} y1={YB} x2={1850} y2={YB} stroke="#CFC9E2" strokeWidth={4} strokeDasharray="2 14" strokeLinecap="round" />
        <RevealX id="s3" x={head} height={1080}>
          <path d={d} fill="none" stroke={C.black} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
          {[...first, ...rec, ...stay].map((x, i) => (
            <circle key={x} cx={x} cy={YB - PEAK} r={i === 0 ? 26 : 18} fill={C.yellow} stroke={C.black} strokeWidth={6} />
          ))}
        </RevealX>
        {/* pedido entregado a satisfacción */}
        <g style={{transformOrigin: `${DELIV}px ${YB}px`, ...pop(frame, aD, 14)}}>
          <rect x={DELIV - 44} y={YB - 96} width={88} height={88} rx={8} fill={C.yellow} stroke={C.black} strokeWidth={6} />
          <path d={`M${DELIV - 44},${YB - 66} h88 M${DELIV},${YB - 96} v30`} stroke={C.black} strokeWidth={6} />
          <circle cx={DELIV + 40} cy={YB - 98} r={24} fill={C.black} />
          <path d={`M${DELIV + 29},${YB - 98} l8,8 l14,-16`} fill="none" stroke={C.yellow} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <path d={`M1846,${YB - 22} L1884,${YB} L1846,${YB + 22} Z`} fill={C.black} opacity={head > 1850 ? 1 : 0} />
        <g opacity={ap(frame, 2, 14)}>
          <Store x={96} bottom={YB + 5} w={220} />
        </g>
      </svg>
      {labels.map((l) => (
        <div key={l.t} style={{position: "absolute", left: l.x - 135, top: 690, width: 270, textAlign: "center", ...h1(44), lineHeight: 1.04, ...rise(frame, l.at, 24)}}>
          {l.t}
        </div>
      ))}
      <div style={{position: "absolute", left: 96, top: 694, width: 220, textAlign: "center", ...body(27), color: C.ink60, opacity: ap(frame, 16, 16)}}>Cliente nuevo</div>
      {/* por eso, dos frentes */}
      {[
        {l: 96, w: 820, t: "Frente 1 · Adquisición"},
        {l: 950, w: 874, t: "Frente 2 · Retención"},
      ].map((fr, i) => {
        const p = interpolate(frame, [frontsAt + i * 8, frontsAt + i * 8 + 20], [0, 1], {...cl, easing: ease});
        return (
          <div key={fr.t} style={{position: "absolute", left: fr.l, top: 800, width: fr.w, opacity: p}}>
            <div style={{height: 22, borderLeft: `6px solid ${C.black}`, borderRight: `6px solid ${C.black}`, borderBottom: `6px solid ${C.black}`, boxSizing: "border-box", transformOrigin: "left center", scale: `${p} 1`}} />
            <div style={{display: "flex", justifyContent: "center", marginTop: 10}}>
              <div style={{...h1(38), background: C.black, color: C.yellow, padding: "6px 28px 10px", borderRadius: beesRadius(20)}}>{fr.t}</div>
            </div>
          </div>
        );
      })}
    </Scene>
  );
};
