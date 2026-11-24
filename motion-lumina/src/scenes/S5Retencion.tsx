import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {PhaseTitle, RevealX, Store} from "../components/motion";
import {Highlight, Scene, Tag} from "../components/ui";
import {ap, beesRadius, body, C, f, h1, pop, rise, t} from "../theme";

// Geometría del "pulso" de compra (representación conceptual, sin datos).
const YB = 640; // línea base
const PEAK = 220;
const X0 = 470;
const D = 112;
const bx = (i: number) => X0 + i * D;
const GAP0 = bx(5) - 56;
const GAP1 = bx(8) - 56;
const peaks = (from: number, to: number) => {
  let d = "";
  for (let i = from; i <= to; i++) d += ` L${bx(i) - 30},${YB} L${bx(i)},${YB - PEAK} L${bx(i) + 30},${YB}`;
  return d;
};

export const S5Retencion: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const lockAt = c(t("cambios"));
  const stratAt = c(t("habilitamos"));
  const promoAt = c(t("promociones", 2));
  const backAt = c(t("prevenir"));

  // cabeza del trazo: recorre el ritmo sano, luego la zona sin compras, luego la recompra
  const head = interpolate(frame, [10, lockAt - 14, lockAt + 34, backAt, backAt + 70], [330, GAP0, GAP1, GAP1, 1840], cl);
  // ventana del algoritmo: sigue la cabeza y se fija sobre el cambio
  const scanIn = ap(frame, c(t("algoritmo", 1, -0.2)), 14);
  const lock = interpolate(frame, [lockAt - 6, lockAt + 14], [0, 1], {...cl, easing: ease});
  const heal = interpolate(frame, [backAt, backAt + 24], [0, 1], cl);
  const scanX = interpolate(lock, [0, 1], [Math.max(330, head - 150), GAP0 - 14]);
  const scanW = interpolate(lock, [0, 1], [170, GAP1 - GAP0 + 28]);
  const scanOut = interpolate(frame, [backAt + 30, backAt + 50], [1, 0], cl);
  // etiqueta de promoción que baja a la zona del cambio
  const drop = interpolate(frame, [promoAt, promoAt + 26], [0, 1], {...cl, easing: Easing.bezier(0.34, 1.3, 0.64, 1)});
  const cam = interpolate(frame, [0, 60], [1.05, 1], {...cl, easing: ease});
  const mid = (GAP0 + GAP1) / 2;

  return (
    <Scene duration={duration}>
      <PhaseTitle
        phases={[
          {at: 6, node: <>Un algoritmo identifica <Highlight at={20}>cambios</Highlight> de compra</>},
          {at: c(t("Con")), node: <>La señal habilita una estrategia <Highlight at={c(t("diferenciales", 1, -0.1))}>diferencial</Highlight></>},
          {at: backAt, node: <>Objetivo: prevenir la fuga, promover <Highlight at={c(t("recompra", 1, -0.1))}>recompra</Highlight></>},
        ]}
      />
      <div style={{position: "absolute", inset: 0, scale: String(cam), transformOrigin: "30% 60%"}}>
        {/* banda del diagrama */}
        <div style={{position: "absolute", left: 0, top: 350, width: 1920 * ap(frame, 2, 26), height: 370, background: C.grey}} />
        <svg width={1920} height={1080} style={{position: "absolute", inset: 0}}>
          <line x1={330} y1={YB} x2={1840} y2={YB} stroke="#CFC9E2" strokeWidth={4} strokeDasharray="2 14" strokeLinecap="round" opacity={ap(frame, 8, 20)} />
          {/* ritmo de compra */}
          <RevealX id="r1" x={Math.min(head, GAP0)} height={1080}>
            <path d={`M330,${YB}${peaks(0, 4)} L${GAP0},${YB}`} fill="none" stroke={C.black} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
          </RevealX>
          {/* zona sin compras: línea plana */}
          <RevealX id="r2" x={Math.min(head, GAP1)} height={1080}>
            <path d={`M${GAP0},${YB} L${GAP1},${YB}`} fill="none" stroke={C.black} strokeWidth={10} strokeDasharray="4 22" strokeLinecap="round" opacity={1 - heal * 0.75} />
          </RevealX>
          {[5, 6, 7].map((i) => (
            <circle key={i} cx={bx(i)} cy={YB - 90} r={22 * ap(frame, lockAt + 8 + (i - 5) * 5, 12)} fill={heal > 0.5 ? C.yellow : C.red} stroke={C.black} strokeWidth={6} />
          ))}
          {/* recompra */}
          <RevealX id="r3" x={head} height={1080}>
            <path d={`M${GAP1},${YB}${peaks(8, 11)} L1840,${YB}`} fill="none" stroke={C.black} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
            {[8, 9, 10, 11].map((i) => (
              <circle key={i} cx={bx(i)} cy={YB - PEAK} r={20} fill={C.yellow} stroke={C.black} strokeWidth={6} />
            ))}
          </RevealX>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={bx(i)} cy={YB - PEAK} r={head > bx(i) ? 16 : 0} fill={C.black} />
          ))}
          <g opacity={ap(frame, 2, 14)}>
            <Store x={96} bottom={YB + 5} w={220} />
          </g>
          {/* línea que une la estrategia con el cambio detectado */}
          <line x1={mid} y1={316} x2={mid} y2={316 + 120 * ap(frame, stratAt, 20)} stroke={C.black} strokeWidth={6} strokeDasharray="2 14" strokeLinecap="round" />
        </svg>
        {/* ventana del algoritmo */}
        <div
          style={{
            position: "absolute",
            left: scanX,
            top: 376,
            width: scanW,
            height: 318,
            boxSizing: "border-box",
            border: `6px solid ${C.black}`,
            borderRadius: beesRadius(34),
            background: heal > 0 ? `rgba(255,255,0,${0.55 * heal})` : `rgba(255,111,113,${0.3 * lock})`,
            opacity: scanIn * scanOut,
          }}
        >
          <div style={{position: "absolute", left: -6, top: -52}}>
            <Tag>Algoritmo</Tag>
          </div>
        </div>
        {/* promoción diferencial que llega al cliente */}
        <svg width={150} height={150} viewBox="0 0 100 100" style={{position: "absolute", left: mid - 75, top: interpolate(drop, [0, 1], [170, 450]), opacity: Math.min(1, drop * 3), rotate: `${interpolate(drop, [0, 1], [-28, -8])}deg`}}>
          <path d="M8 46 46 8h42v42L50 88a6 6 0 0 1-8 0L8 54a6 6 0 0 1 0-8Z" fill={C.yellow} stroke={C.black} strokeWidth={6} strokeLinejoin="round" />
          <circle cx="72" cy="27" r="7" fill={C.white} stroke={C.black} strokeWidth={5} />
          <path d="m34 62 22-22" stroke={C.black} strokeWidth={6} strokeLinecap="round" />
          <circle cx="35" cy="43" r="5.5" fill={C.black} />
          <circle cx="56" cy="60" r="5.5" fill={C.black} />
        </svg>
        {/* rótulos: una idea por zona */}
        <div style={{position: "absolute", left: 340, top: 748, ...rise(frame, 24, 24)}}>
          <div style={h1(50)}>Ritmo de compra</div>
          <div style={{...body(27), color: C.ink60, marginTop: 6}}>de cada cliente</div>
        </div>
        <div style={{position: "absolute", left: GAP0 - 14, top: 748, ...rise(frame, lockAt + 10, 24)}}>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <div style={{width: 26, height: 26, borderRadius: 13, background: heal > 0.5 ? C.yellow : C.red, border: `5px solid ${C.black}`, boxSizing: "border-box"}} />
            <div style={h1(50)}>Cambio detectado</div>
          </div>
        </div>
        <div style={{position: "absolute", left: mid + 40, top: 218, ...rise(frame, stratAt + 4, 24)}}>
          <div style={h1(50)}>Estrategia comercial</div>
          <div style={{...body(27), color: C.ink60, marginTop: 6, ...pop(frame, promoAt)}}>p. ej. promociones cargadas mediante GPO</div>
        </div>
        <div style={{position: "absolute", left: GAP1 + 150, top: 748, ...rise(frame, backAt + 30, 24)}}>
          <div style={h1(50)}>Recompra</div>
        </div>
        <div style={{position: "absolute", left: 96, top: 862, ...body(22), color: C.ink60, opacity: ap(frame, 30, 20)}}>Representación conceptual</div>
      </div>
    </Scene>
  );
};
