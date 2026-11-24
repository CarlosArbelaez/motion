import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {RevealX} from "../components/motion";
import {Highlight, Scene} from "../components/ui";
import {ap, beesRadius, body, C, f, h1, t} from "../theme";

// Carriles del dashboard. Los patrones son ilustrativos: no representan datos reales.
export const LX = 580; // inicio de los carriles
export const RX = 1824;
const TOP = 286;
export const ROW = 82;
const DAY = (RX - LX) / 8;
export const tracks = [
  {name: "Creación", text: "Clientes nuevos creados"},
  {name: "Activación", text: "En el mes de creación o después"},
  {name: "Retención", text: "Retenidos o recuperados"},
  {name: "Comportamiento", text: "Frecuencia de compra y volumen"},
  {name: "Ejecución", text: "Promociones y visitas asignadas"},
  {name: "Logística", text: "No entregas y sus motivos"},
  {name: "Servicio", text: "OTIF y experiencia"},
];
// posiciones pseudoaleatorias fijas
const xs = Array.from({length: 26}, (_, i) => 24 + i * 47 + ((i * 37) % 23));

export const Pattern: React.FC<{i: number}> = ({i}) => {
  const w = RX - LX;
  const m = ROW / 2;
  switch (i) {
    case 0:
      return <>{xs.map((x, k) => <circle key={k} cx={x} cy={m + ((k * 7) % 3 - 1) * 9} r={10} fill={C.black} />)}</>;
    case 1:
      return <>{xs.map((x, k) => <circle key={k} cx={x} cy={m + ((k * 7) % 3 - 1) * 9} r={10} fill={k % 4 === 3 ? C.white : C.yellow} stroke={C.black} strokeWidth={4} />)}</>;
    case 2:
      return (
        <>
          {[0, 150, 250, 470, 560, 800, 900, 1090].map((x, k) => {
            const len = [130, 80, 200, 70, 220, 80, 170, 130][k];
            return <rect key={k} x={x + 12} y={m - 11} width={len} height={22} rx={11} fill={k === 3 || k === 6 ? C.blue : C.black} stroke={C.black} strokeWidth={4} />;
          })}
        </>
      );
    case 3: {
      let d = `M0,${m + 16}`;
      for (let x = 30; x < w; x += 62) d += ` L${x - 16},${m + 16} L${x},${m - 22 - ((x * 13) % 9)} L${x + 16},${m + 16}`;
      return <path d={d + ` L${w},${m + 16}`} fill="none" stroke={C.black} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />;
    }
    case 4:
      return (
        <>
          {xs.filter((_, k) => k % 2 === 0).map((x, k) =>
            k % 2 === 0 ? (
              <g key={k}>
                <rect x={x} y={m - 15} width={30} height={30} rx={6} fill={C.black} />
                <path d={`M${x + 7},${m} l6,6 l11,-12`} fill="none" stroke={C.yellow} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : (
              <circle key={k} cx={x + 15} cy={m} r={14} fill={C.orange} stroke={C.black} strokeWidth={4} />
            ),
          )}
        </>
      );
    case 5:
      return <>{xs.map((x, k) => <rect key={k} x={x - 8} y={m - 18} width={26} height={36} rx={5} fill={k % 6 === 4 ? C.red : C.black} stroke={C.black} strokeWidth={4} />)}</>;
    default: {
      let d = `M0,${m}`;
      for (let x = 60; x <= w; x += 60) d += ` Q${x - 30},${m + (x % 120 === 0 ? -14 : 12)} ${x},${m}`;
      return (
        <>
          <path d={d} fill="none" stroke={C.black} strokeWidth={6} strokeLinecap="round" />
          {xs.filter((_, k) => k % 3 === 0).map((x, k) => <circle key={k} cx={Math.round(x / 60) * 60} cy={m} r={9} fill={C.yellow} stroke={C.black} strokeWidth={4} />)}
        </>
      );
    }
  }
};

export const S7Dashboard: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cues = [c(t("creación", 2)), c(t("activación")), c(t("retención", 2)), c(t("comportamiento", 2)), c(t("ejecución")), c(t("logística")), c(t("servicio"))];
  const active = cues.reduce((acc, q, i) => (frame >= q ? i : acc), -1);
  const gridAt = c(t("Un", 1, -0.1));
  // el titular abre en grande y sube para dar paso al tablero
  const dock = interpolate(frame, [gridAt - 6, gridAt + 20], [0, 1], {...cl, easing: ease});
  // actualización diaria: la marca "Hoy" avanza un día cada vez
  const dayStart = c(t("actualiza", 1, 0.3));
  const day = [0, 1, 2, 3, 4, 5].reduce(
    (acc, k) => acc + interpolate(frame, [dayStart + k * 52, dayStart + k * 52 + 16], [0, 1], {...cl, easing: ease}),
    2,
  );
  const sweep = LX + day * DAY;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 5);
  const grid = ap(frame, gridAt, 26);
  return (
    <Scene duration={duration}>
      <div style={{position: "absolute", left: 96, top: interpolate(dock, [0, 1], [400, 84]), ...h1(interpolate(dock, [0, 1], [150, 76])), opacity: ap(frame, 4, 14)}}>
        <Highlight at={c(t("visibilidad"))}>Visibilidad</Highlight> y seguimiento
      </div>
      {/* estado del tablero */}
      <div style={{position: "absolute", left: 96, top: 206, display: "flex", alignItems: "center", gap: 14, opacity: ap(frame, c(t("Un")), 14)}}>
        <div style={{...body(30, 600)}}>Dashboard de seguimiento</div>
        <div style={{width: 18, height: 18, borderRadius: 9, background: C.black, marginLeft: 18, opacity: 0.35 + 0.65 * pulse}} />
        <div style={{...body(30, 500), opacity: ap(frame, c(t("actualiza")), 12)}}>se actualiza diariamente</div>
      </div>
      {/* días */}
      <svg width={1920} height={1080} style={{position: "absolute", inset: 0}}>
        {Array.from({length: 9}).map((_, k) => (
          <line key={k} x1={LX + k * DAY} y1={TOP - 14} x2={LX + k * DAY} y2={TOP + (ROW * 7) * grid} stroke="#D9D4E8" strokeWidth={3} opacity={grid} />
        ))}
        {Array.from({length: 8}).map((_, k) => (
          <line key={k} x1={96} y1={TOP + k * ROW} x2={96 + (RX - 96) * ap(frame, gridAt + k * 3, 26)} y2={TOP + k * ROW} stroke={C.black} strokeWidth={k === 0 || k === 7 ? 5 : 2} />
        ))}
        {/* franja de lo ya actualizado */}
        <rect x={LX} y={TOP} width={Math.max(0, sweep - LX) * grid} height={ROW * 7} fill={C.grey} opacity={0.75} />
        {tracks.map((t, i) => {
          const rev = interpolate(frame, [cues[i], cues[i] + 30], [0, 1], {...cl, easing: ease});
          return (
            <g key={t.name} transform={`translate(${LX}, ${TOP + i * ROW})`}>
              <RevealX id={`lane${i}`} x={(sweep - LX) * rev} height={ROW}>
                <Pattern i={i} />
              </RevealX>
            </g>
          );
        })}
        {/* marca "Hoy" */}
        <g opacity={ap(frame, c(t("actualiza")), 12)}>
          <line x1={sweep} y1={TOP - 20} x2={sweep} y2={TOP + ROW * 7 + 14} stroke={C.black} strokeWidth={6} />
        </g>
      </svg>
      <div style={{position: "absolute", left: sweep - 6, top: TOP - 62, opacity: ap(frame, c(t("actualiza")), 12), ...body(24, 600), background: C.black, color: C.yellow, padding: "6px 16px 8px", borderRadius: beesRadius(12), letterSpacing: "0.06em", textTransform: "uppercase"}}>
        Hoy
      </div>
      {/* nombres de carril */}
      {tracks.map((t, i) => {
        const p = ap(frame, cues[i], 16);
        const on = i === active ? interpolate(frame, [cues[i], cues[i] + 10], [0, 1], cl) : 0;
        return (
          <div key={t.name} style={{position: "absolute", left: 96, top: TOP + i * ROW + 3, width: LX - 96 - 3, height: ROW - 4, opacity: p, translate: `${(1 - p) * -30}px 0px`}}>
            <div style={{position: "absolute", inset: 0, background: C.yellow, transformOrigin: "left center", scale: `${on} 1`, opacity: i === active ? 1 : 0}} />
            <div style={{position: "relative", padding: "7px 0 0 18px"}}>
              <div style={{...h1(40), lineHeight: 1}}>{t.name}</div>
              <div style={{...body(23), marginTop: 3, color: i === active ? C.black : C.ink60}}>{t.text}</div>
            </div>
          </div>
        );
      })}
      <div style={{position: "absolute", right: 96, top: TOP + ROW * 7 + 14, ...body(22), color: C.ink60, opacity: ap(frame, c(t("creación", 2)), 20)}}>Visualización ilustrativa, sin datos reales</div>
    </Scene>
  );
};
