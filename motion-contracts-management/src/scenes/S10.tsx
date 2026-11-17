import React from "react";
import { C, FONT, R } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Shell } from "../components/ui";

const ID = "s10";
const CW = 224;
const CG = 22;
const cx = (i: number) => MX + i * (CW + CG);
const TOP = 372;
const CH = 330;
const VERSIONS = [
  { v: "v0.1.0", h: "Cimientos", d: "Gobierno, reglas, permisos por rol y carga de los ~220 servicios.", at: cue(ID, "Los cimientos") },
  { v: "v0.2.0", h: "Registro y dashboard", d: "Registro único y dashboard con descarga. Se retiran los 2 Excel.", at: cue(ID, "El registro único") },
  { v: "v0.3.0", h: "Alertas", d: "En la plataforma y por correo, con respuesta y escalamiento.", at: cue(ID, "Las alertas") },
  { v: "v1.0.0", h: "Decisión e histórico", d: "Decisión de renovación, histórico de aprobaciones y cruce con Ariba.", at: cue(ID, "Y la decisión") },
  { v: "v1.1.0", h: "Alta con la regla", d: "Formulario único: la regla escrita decide si va contrato.", at: cue(ID, "La quinta") },
  { v: "v1.2.0", h: "Ficha con IA", d: "La IA lee el PDF y propone; una persona valida. Piloto de 20 contratos.", at: cue(ID, "la ficha del contrato") },
  { v: "v1.3.0", h: "Consulta con IA", d: "Consulta con cita, resumen de renovación y servicios similares.", at: cue(ID, "y la consulta") },
];
const GROUPS = [
  { from: 0, to: 3, label: "MVP · sin IA", bg: C.yellow, fg: C.ink, at: cue(ID, "producto mínimo") - 0.3 },
  { from: 4, to: 4, label: "Sin IA", bg: C.blueSoft, fg: C.ink, at: cue(ID, "La quinta") - 0.2 },
  { from: 5, to: 6, label: "Con IA", bg: C.purple, fg: C.white, at: cue(ID, "Y las dos últimas") - 0.2 },
];

export const S10: React.FC = () => (
  <Shell
    id={ID}
    chapter={4}
    title="Qué haremos: siete entregas sobre la misma plataforma"
    foot="Estado: propuesta para aprobación · cada entrega lleva su número de versión"
  >
    {GROUPS.map((g) => (
      <Rise key={g.label} at={g.at} y={14} style={{ position: "absolute", left: cx(g.from), top: TOP - 72 }}>
        <div
          style={{
            width: cx(g.to) + CW - cx(g.from),
            height: 56,
            borderRadius: R.ctl,
            background: g.bg,
            color: g.fg,
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: 28,
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          {g.label}
        </div>
      </Rise>
    ))}
    {VERSIONS.map((x, i) => (
      <Rise key={x.v} at={x.at - 0.1} y={26} style={{ position: "absolute", left: cx(i), top: TOP }}>
        <div
          style={{
            width: CW,
            height: CH,
            borderRadius: R.card,
            background: C.white,
            border: `2px solid ${i === 3 ? C.ink : C.line}`,
            boxSizing: "border-box",
            padding: "18px 18px",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 500, color: C.mute, fontVariantNumeric: "tabular-nums" }}>
            Entrega {i + 1} · {x.v}
          </div>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 29, lineHeight: 1.08, marginTop: 6, height: 66, letterSpacing: -0.3 }}>{x.h}</div>
          <div style={{ fontSize: 23, lineHeight: 1.24, color: C.text, marginTop: 8 }}>{x.d}</div>
          {i === 3 ? (
            <div style={{ position: "absolute", left: 18, bottom: 16, fontSize: 20, fontWeight: 700, background: C.ink, color: C.white, borderRadius: R.full, padding: "5px 14px" }}>
              MVP completo
            </div>
          ) : null}
        </div>
      </Rise>
    ))}
    <Rise at={cue(ID, "Las primeras cuatro") - 0.1} y={16} style={{ position: "absolute", left: MX, top: TOP + CH + 40, width: 1700 }}>
      <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 40, letterSpacing: -0.6, lineHeight: 1.1 }}>
        El alcance inicial es el MVP: cuatro entregas que cierran el seguimiento, sin IA.
      </div>
    </Rise>
  </Shell>
);
