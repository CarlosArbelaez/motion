import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {Draw, PhaseTitle, RevealX, Store} from "../components/motion";
import {Highlight, Scene, Tag} from "../components/ui";
import {ap, body, C, f, h1, pop, rise} from "../theme";

const YB = 620;
const X = {opp: 230, crea: 600, promo: 930, buy: 1260, visit: 1640};

export const S4Adquisicion: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const at = {opp: c(26.9), crea: c(28.8), promo: c(32.9), buy: c(36.5), visit: c(38.8)};
  const head = interpolate(
    frame,
    [at.opp, at.crea - 12, at.crea + 8, at.promo - 12, at.promo + 8, at.buy - 10, at.buy + 14, at.visit - 10, at.visit + 14],
    [96, X.opp + 110, X.crea + 110, X.crea + 110, X.promo + 80, X.promo + 80, X.buy + 80, X.buy + 80, 1850],
    {...cl, easing: Easing.inOut(Easing.quad)},
  );
  const ring = (frame % 50) / 50;
  const drop = interpolate(frame, [at.promo, at.promo + 24], [0, 1], {...cl, easing: Easing.bezier(0.34, 1.3, 0.64, 1)});
  const labels = [
    {x: X.opp, t: "Oportunidad", s: "identificada", at: at.opp + 6},
    {x: X.crea, t: "Creación", s: "a través de Onboard", at: at.crea + 8},
    {x: X.promo, t: "Promoción", s: "cargada al cliente nuevo", at: at.promo + 12},
    {x: X.buy, t: "Primera compra", s: "", at: at.buy + 10},
    {x: X.visit, t: "Visita de seguimiento", s: "", at: at.visit + 10},
  ];
  return (
    <Scene duration={duration}>
      <PhaseTitle
        phases={[
          {at: 6, node: <>Adquisición: identificamos la <Highlight at={20}>oportunidad</Highlight></>},
          {at: at.crea - 6, node: <>Creamos el cliente a través de <Highlight at={c(31.6)}>Onboard</Highlight></>},
          {at: at.promo - 6, node: <>Promoción para incentivar la <Highlight at={c(36.4)}>primera compra</Highlight></>},
          {at: at.visit - 4, node: <>Y aseguramos la visita de <Highlight at={c(39.2)}>seguimiento</Highlight></>},
        ]}
      />
      <div style={{position: "absolute", left: 0, top: 400, width: 1920 * ap(frame, 2, 26), height: 260, background: C.grey}} />
      <svg width={1920} height={1080} style={{position: "absolute", inset: 0}}>
        <line x1={96} y1={YB} x2={1850} y2={YB} stroke="#CFC9E2" strokeWidth={4} strokeDasharray="2 14" strokeLinecap="round" />
        <RevealX id="s4" x={head} height={1080}>
          <path d={`M96,${YB} L${X.buy - 34},${YB} L${X.buy},${YB - 190} L${X.buy + 34},${YB} L1850,${YB}`} fill="none" stroke={C.black} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={X.buy} cy={YB - 190} r={28} fill={C.yellow} stroke={C.black} strokeWidth={6} />
        </RevealX>
        {/* oportunidad: un punto de venta aún sin crear */}
        <g opacity={0.35 * ap(frame, at.opp - 8, 14)}>
          <Store x={X.opp - 90} bottom={YB + 5} w={180} />
        </g>
        <circle cx={X.opp} cy={YB - 80} r={60 + ring * 70} fill="none" stroke={C.black} strokeWidth={6} opacity={(1 - ring) * ap(frame, at.opp, 10) * (frame < at.crea + 20 ? 1 : 0)} />
        {/* cliente creado */}
        <g opacity={ap(frame, at.crea, 12)} transform={`translate(0, ${(1 - ap(frame, at.crea, 16)) * 30})`}>
          <Store x={X.crea - 105} bottom={YB + 5} w={210} />
        </g>
        {/* tiempos desde la creación */}
        <Draw d={`M${X.crea},380 Q${(X.crea + X.promo) / 2},270 ${X.promo},380`} p={interpolate(frame, [at.promo - 10, at.promo + 14], [0, 1], cl)} width={6} />
        <Draw d={`M${X.crea},360 Q${(X.crea + X.visit) / 2},110 ${X.visit},380`} p={interpolate(frame, [at.visit - 14, at.visit + 16], [0, 1], cl)} width={6} />
        {/* representante de ventas */}
        <g opacity={ap(frame, at.visit, 12)} transform={`translate(0, ${(1 - interpolate(frame, [at.visit, at.visit + 18], [0, 1], {...cl, easing: ease})) * 40})`}>
          <path d={`M${X.visit - 62},${YB + 2} v-78 a62,62 0 0 1 124,0 v78 Z`} fill={C.yellow} stroke={C.black} strokeWidth={6} />
          <circle cx={X.visit} cy={YB - 172} r={36} fill={C.black} />
          <rect x={X.visit + 26} y={YB - 86} width={42} height={54} rx={5} fill={C.white} stroke={C.black} strokeWidth={5} />
          <path d={`M${X.visit + 35},${YB - 60} l8,8 l14,-16`} fill="none" stroke={C.black} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      {/* promoción que llega al cliente nuevo */}
      <svg width={140} height={140} viewBox="0 0 100 100" style={{position: "absolute", left: X.promo - 70, top: interpolate(drop, [0, 1], [330, 462]), opacity: Math.min(1, drop * 3), rotate: `${interpolate(drop, [0, 1], [-30, -8])}deg`}}>
        <path d="M8 46 46 8h42v42L50 88a6 6 0 0 1-8 0L8 54a6 6 0 0 1 0-8Z" fill={C.yellow} stroke={C.black} strokeWidth={6} strokeLinejoin="round" />
        <circle cx="72" cy="27" r="7" fill={C.white} stroke={C.black} strokeWidth={5} />
        <path d="m34 62 22-22" stroke={C.black} strokeWidth={6} strokeLinecap="round" />
        <circle cx="35" cy="43" r="5.5" fill={C.black} />
        <circle cx="56" cy="60" r="5.5" fill={C.black} />
      </svg>
      <div style={{position: "absolute", left: (X.crea + X.promo) / 2 - 150, top: 286, width: 300, display: "flex", justifyContent: "center", ...pop(frame, at.promo + 4)}}>
        <Tag>1–2 días después</Tag>
      </div>
      <div style={{position: "absolute", left: (X.crea + X.visit) / 2 - 150, top: 206, width: 300, display: "flex", justifyContent: "center", ...pop(frame, at.visit + 6)}}>
        <Tag>Al mes siguiente</Tag>
      </div>
      {labels.map((l) => (
        <div key={l.t} style={{position: "absolute", left: l.x - 170, top: 688, width: 340, textAlign: "center", ...rise(frame, l.at, 24)}}>
          <div style={{...h1(46), lineHeight: 1.05}}>{l.t}</div>
          {l.s ? <div style={{...body(26), color: C.ink60, marginTop: 6}}>{l.s}</div> : null}
        </div>
      ))}
    </Scene>
  );
};
