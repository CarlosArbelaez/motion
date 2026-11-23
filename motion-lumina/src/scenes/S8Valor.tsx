import React from "react";
import {Easing, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {PhaseTitle} from "../components/motion";
import {Highlight, Scene} from "../components/ui";
import {ap, beesRadius, body, C, f, h1} from "../theme";

// Captura real del dashboard (public/assets/dashboard.png, 861 × 653 px).
const IW = 861;
const IH = 653;
const DW = 880; // ancho en pantalla
const SC = DW / IW;
const DH = IH * SC;
const DX = 1824 - DW;
const DY = 236;
// Zona de la captura que enfoca cada beneficio, en píxeles de la imagen: [x, y, ancho, alto]
const focus: [number, number, number, number][] = [
  [434, 503, 410, 142], // stoppers: razones de no plan y de no entrega
  [28, 268, 248, 198], // gestión comercial: embudo de clientes nuevos (pedido, visita)
  [278, 268, 282, 198], // activación: creación vs. activación
  [28, 503, 396, 142], // operación logística: seguimiento logístico
  [28, 120, 816, 108], // información actualizada: indicadores del periodo
  [28, 250, 816, 216], // trazabilidad: creación, activación y retención
];

export const S8Valor: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cues = [c(91.3), c(95.16), c(98.08), c(100.96), c(104.72), c(108.4)];
  const active = cues.reduce((acc, q, i) => (frame >= q ? i : acc), 0);
  const fx = (k: number) => interpolate(frame, cues.flatMap((q) => [q - 2, q + 18]), focus.flatMap((fo, i) => [focus[Math.max(0, i - 1)][k], fo[k]]), {...cl, easing: ease}) * SC;
  const [x, y, w, h] = [fx(0), fx(1), fx(2), fx(3)];
  // la cámara se acerca a la zona enfocada (sin salirse de la captura)
  const cam = focus.map(([fx0, fy0, fw, fh]) => {
    const z = Math.min(1.7, DW / (fw * SC * 1.18), DH / (fh * SC * 1.18));
    const tx = Math.min(0, Math.max(DW - DW * z, DW / 2 - (fx0 + fw / 2) * SC * z));
    const ty = Math.min(0, Math.max(DH - DH * z, DH / 2 - (fy0 + fh / 2) * SC * z));
    return [z, tx, ty];
  });
  const cv = (k: number) => interpolate(frame, [cues[0] - 2, cues[0] + 22, ...cues.slice(1).flatMap((q) => [q - 2, q + 22])], [k === 0 ? 1 : 0, cam[0][k], ...cam.slice(1).flatMap((cm, i) => [cam[i][k], cm[k]])], {...cl, easing: Easing.inOut(Easing.cubic)});
  const z = cv(0);
  const dim = 0.72 * ap(frame, cues[0], 14);
  const enter = ap(frame, 8, 24);
  const lines: React.ReactNode[] = [
    <>Ver rápido dónde hay <Highlight at={cues[0] + 18}>stoppers</Highlight></>,
    <>Seguir la gestión de la <Highlight at={cues[1] + 18}>fuerza de ventas</Highlight></>,
    <>Detectar qué impide la <Highlight at={cues[2] + 18}>activación</Highlight></>,
    <>Mejorar la operación <Highlight at={cues[3] + 18}>logística</Highlight></>,
    <>Decidir con información <Highlight at={cues[4] + 18}>actualizada</Highlight></>,
    <>Dar <Highlight at={cues[5] + 18}>trazabilidad</Highlight> a los resultados</>,
  ];
  const veil: React.CSSProperties = {position: "absolute", background: C.white, opacity: dim};
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
          <div key={i} style={{position: "absolute", left: 96, top: 330, width: 800, ...h1(88), lineHeight: 1.17, opacity: inP * (1 - outP), translate: `0px ${(1 - inP) * 60 - outP * 40}px`}}>
            {node}
          </div>
        );
      })}
      {/* el dashboard real; el foco salta a lo que cada beneficio permite ver */}
      <div style={{position: "absolute", left: DX, top: DY, width: DW, height: DH, opacity: enter, translate: `0px ${(1 - enter) * 50}px`}}>
        <div style={{position: "absolute", inset: 0, overflow: "hidden", borderRadius: beesRadius(30), border: `6px solid ${C.black}`, boxSizing: "border-box"}}>
          <div style={{position: "absolute", left: 0, top: 0, width: DW, height: DH, transformOrigin: "0 0", transform: `translate(${cv(1)}px, ${cv(2)}px) scale(${z})`}}>
          <Img src={staticFile("assets/dashboard.png")} style={{position: "absolute", left: 0, top: 0, width: DW, height: DH}} />
          <div style={{...veil, left: 0, top: 0, width: DW, height: y}} />
          <div style={{...veil, left: 0, top: y + h, width: DW, height: DH - y - h}} />
          <div style={{...veil, left: 0, top: y, width: x, height: h}} />
          <div style={{...veil, left: x + w, top: y, width: DW - x - w, height: h}} />
          <div style={{position: "absolute", left: x - 3, top: y - 3, width: w + 6, height: h + 6, boxSizing: "border-box", border: `${6 / z}px solid ${C.black}`, borderRadius: beesRadius(16), boxShadow: `0 0 0 ${4 / z}px ${C.yellow}`, opacity: ap(frame, cues[0], 12)}} />
          </div>
        </div>
      </div>
      <div style={{position: "absolute", left: 96, top: 850, ...body(22), color: C.ink60, opacity: ap(frame, 20, 20)}}>Captura del dashboard Lúmina · Resumen</div>
    </Scene>
  );
};
