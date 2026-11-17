import React from "react";
import { C, FONT, R } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { Card, Check, MX, Shell } from "../components/ui";

const ID = "s11";
// Criterios de salida del MVP (verificables; no dependen de una opinión).
const CRITERIA = [
  { at: cue(ID, "Los dos Excel"), t: "Los 2 Excel retirados", s: "tras un período en paralelo que cuadre" },
  { at: cue(ID, "El dashboard y las alertas"), t: "Dashboard y alertas leen el mismo registro", s: "" },
  { at: cue(ID, "Todos los contratos"), t: "100 % de los vigentes con PDF en Ariba", s: "" },
  { at: cue(ID, "La primera alerta"), t: "Primera alerta cerrada con una decisión", s: "visible en el histórico" },
  { at: cue(ID, "Y los tres dueños"), t: "Los tres dueños operando", s: "modelo de gobierno aprobado" },
];
const CW = 316;
const CG = 30;

export const S11: React.FC = () => {
  const t = useSec();
  const a1 = cue(ID, "Cada entrega");
  const a2 = cue(ID, "y solo arranca");
  const gate = prog(t, a2 + 0.5, 0.5);
  return (
    <Shell
      id={ID}
      chapter={4}
      title="Cómo lo haremos: cada entrega cierra un dolor antes de abrir la siguiente"
      foot="Mientras llega lo demás: la ficha de cada contrato se captura a mano al firmar, una sola vez, y Value Creation registra los servicios nuevos"
    >
      {/* La regla de avance */}
      <Rise at={a1 - 0.1} y={20} style={{ position: "absolute", left: MX, top: 300 }}>
        <Card style={{ width: 470, height: 150, padding: "22px 28px", borderColor: C.ink }}>
          <div style={{ fontSize: 23, fontWeight: 500, color: C.mute }}>Una entrega</div>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 34, lineHeight: 1.1, marginTop: 6, letterSpacing: -0.4 }}>Resuelve un dolor completo</div>
        </Card>
      </Rise>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <line x1={MX + 482} y1={375} x2={MX + 482 + 210 * prog(t, a2, 0.5)} y2={375} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        <line x1={MX + 800} y1={375} x2={MX + 800 + 196 * prog(t, a2 + 0.8, 0.5)} y2={375} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        <path d={`M${MX + 984} 363 L${MX + 998} 375 L${MX + 984} 387`} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={prog(t, a2 + 1.2, 0.2)} />
      </svg>
      <div style={{ position: "absolute", left: MX + 700, top: 327, opacity: gate, translate: `0px ${10 * (1 - gate)}px` }}>
        <Check size={96} />
      </div>
      <Rise at={a2 + 0.5} y={8} style={{ position: "absolute", left: MX + 600, top: 432, width: 296, textAlign: "center", fontSize: 25, fontWeight: 700, lineHeight: 1.15 }}>
        Cumple sus criterios de salida
      </Rise>
      <Rise at={a2 + 1.0} y={20} style={{ position: "absolute", left: MX + 1010, top: 300 }}>
        <Card style={{ width: 470, height: 150, padding: "22px 28px" }}>
          <div style={{ fontSize: 23, fontWeight: 500, color: C.mute }}>Solo entonces</div>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 34, lineHeight: 1.1, marginTop: 6, letterSpacing: -0.4 }}>Arranca la siguiente entrega</div>
        </Card>
      </Rise>

      {/* Criterios de salida del MVP */}
      <Rise at={cue(ID, "Para el producto") - 0.1} y={14} style={{ position: "absolute", left: MX, top: 520 }}>
        <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, letterSpacing: -0.5 }}>Los cinco criterios de salida del MVP</div>
      </Rise>
      {CRITERIA.map((c, i) => {
        const done = prog(t, c.at + 0.5, 0.3);
        return (
          <Rise key={c.t} at={c.at - 0.1} y={24} style={{ position: "absolute", left: MX + i * (CW + CG), top: 586 }}>
            <div style={{ width: CW, height: 250, background: C.white, border: `2px solid ${C.line}`, borderRadius: R.card, boxSizing: "border-box", padding: "18px 22px", position: "relative" }}>
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 50, lineHeight: 1 }}>{i + 1}</div>
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 28, lineHeight: 1.12, marginTop: 12, letterSpacing: -0.3 }}>{c.t}</div>
              {c.s ? <div style={{ fontSize: 22, color: C.text, marginTop: 8, lineHeight: 1.2 }}>{c.s}</div> : null}
              <div style={{ position: "absolute", right: 18, top: 18, opacity: done }}>
                <Check size={38} />
              </div>
            </div>
          </Rise>
        );
      })}
    </Shell>
  );
};
