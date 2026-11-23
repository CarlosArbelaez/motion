import React from "react";
import {Easing, interpolate, useCurrentFrame} from "remotion";
import {PhaseTitle, Store} from "../components/motion";
import {Highlight, Scene} from "../components/ui";
import {ap, body, C, f, h1, HEAD, rise} from "../theme";

const CX = 470;
const CY = 560;
const R = 205;
const items = [
  {t: "Promociones clientes nuevos", s: "1–2 días después de la creación"},
  {t: "Visita de seguimiento", s: "al mes siguiente de la creación"},
  {t: "Tareas comerciales", s: "para representantes de ventas, en el punto de venta"},
  {t: "Promociones churn", s: "diferenciales, cargadas mediante GPO"},
  {t: "Comunicaciones", s: "personalizadas, dentro de la aplicación BEES"},
];
const pol = (deg: number, r: number) => [CX + Math.cos((deg * Math.PI) / 180) * r, CY + Math.sin((deg * Math.PI) / 180) * r];

export const S6Actividades: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cues = [c(62.92), c(64.96), c(66.6), c(69.76), c(71.2)];
  const active = cues.reduce((acc, q, i) => (frame >= q ? i : acc), -1);
  // el anillo gira para traer la actividad activa hacia la lista
  const rot = -72 * cues.slice(1).reduce((acc, q) => acc + interpolate(frame, [q - 4, q + 18], [0, 1], {...cl, easing: ease}), 0);
  const rowY = (i: number) => 268 + i * 122;
  const linkY = interpolate(frame, cues.flatMap((q) => [q - 4, q + 18]), cues.flatMap((_, i) => [rowY(Math.max(0, i - 1)) + 30, rowY(i) + 30]), {...cl, easing: ease});
  return (
    <Scene duration={duration}>
      <PhaseTitle phases={[{at: 6, node: <>5 actividades en el <Highlight at={c(59.8)}>360</Highlight> de nuestros clientes</>}]} />
      <svg width={1920} height={1080} style={{position: "absolute", inset: 0}}>
        {items.map((_, i) => {
          const a0 = i * 72 - 33 + rot;
          const a1 = i * 72 + 33 + rot;
          const [x0, y0] = pol(a0, R);
          const [x1, y1] = pol(a1, R);
          const [nx, ny] = pol(i * 72 + rot, R);
          const drawn = interpolate(frame, [c(58.0) + i * 6, c(58.0) + i * 6 + 18], [0, 1], {...cl, easing: ease});
          const lit = frame >= cues[i];
          const isActive = i === active;
          return (
            <g key={i}>
              <path d={`M${x0},${y0} A${R},${R} 0 0 1 ${x1},${y1}`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawn} fill="none" stroke={C.black} strokeWidth={112} opacity={drawn > 0 ? 1 : 0} />
              <path d={`M${x0},${y0} A${R},${R} 0 0 1 ${x1},${y1}`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawn} fill="none" stroke={isActive ? C.yellow : lit ? C.black : C.grey} strokeWidth={100} opacity={drawn > 0 ? 1 : 0} />
              <text x={nx} y={ny + 20} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={58} fill={isActive ? C.black : lit ? C.yellow : "#B9B3CC"} opacity={drawn}>
                {i + 1}
              </text>
            </g>
          );
        })}
        <g opacity={ap(frame, 10, 16)}>
          <Store x={CX - 80} bottom={CY + 62} w={160} />
        </g>
        {/* enlace entre el anillo y la actividad que se explica */}
        <path d={`M${CX + R + 62},${CY} H860 V${linkY} H930`} fill="none" stroke={C.black} strokeWidth={6} strokeLinejoin="round" opacity={ap(frame, cues[0] - 2, 10)} />
        <circle cx={930} cy={linkY} r={11} fill={C.black} opacity={ap(frame, cues[0] - 2, 10)} />
      </svg>
      {items.map((it, i) => {
        const on = i === active;
        return (
          <div key={it.t} style={{position: "absolute", left: 968, top: rowY(i), ...rise(frame, cues[i], 26)}}>
            <div style={{position: "relative", display: "inline-block"}}>
              <div style={{position: "absolute", left: -8, right: -12, bottom: 4, height: 22, background: C.yellow, transformOrigin: "left center", scale: `${on ? ap(frame, cues[i] + 4, 12) : 0} 1`}} />
              <div style={{position: "relative", ...h1(54), lineHeight: 1.05}}>{it.t}</div>
            </div>
            <div style={{...body(27), color: C.ink60, marginTop: 4}}>{it.s}</div>
          </div>
        );
      })}
    </Scene>
  );
};
