import React from "react";
import { C, FONT } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { Card, ContractIcon, MX, Pill, Shell } from "../components/ui";

const ID = "s04";
const RISKS = [
  {
    at: cue(ID, "Hay contratos fuera"),
    h: "Contratos fuera de Ariba",
    s: "Quedan fuera del repositorio auditable; algunos, en correos de personas que ya no están.",
    icon: "out",
  },
  {
    at: cue(ID, "Hay contratos que"),
    h: "Contratos que vencen sin decisión",
    s: "Las alertas se repiten, pero nadie registra qué pasó con el contrato.",
    icon: "clock",
  },
  {
    at: cue(ID, "nadie responde"),
    h: "Proceso sin dueño de punta a punta",
    s: "Desde que se disolvió Vendor Management, ningún problema tiene a quién escalarse.",
    icon: "owner",
  },
];

const Icon: React.FC<{ kind: string }> = ({ kind }) => {
  if (kind === "out")
    return (
      <div style={{ position: "relative", width: 150, height: 104 }}>
        <div style={{ position: "absolute", left: 0, top: 6, width: 86, height: 92, border: `4px dashed ${C.mute}`, borderRadius: 12, boxSizing: "border-box" }} />
        <div style={{ position: "absolute", left: 84, top: 0, rotate: "10deg" }}>
          <ContractIcon size={62} accent={C.coral} />
        </div>
      </div>
    );
  if (kind === "clock")
    return (
      <svg width={104} height={104} viewBox="0 0 104 104">
        <circle cx={52} cy={52} r={46} fill={C.white} stroke={C.ink} strokeWidth={5} />
        <path d="M52 24 V52 L72 64" fill="none" stroke={C.red} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg width={104} height={104} viewBox="0 0 104 104">
      <circle cx={52} cy={34} r={20} fill="none" stroke={C.mute} strokeWidth={5} strokeDasharray="8 8" />
      <path d="M14 96 C14 66 90 66 90 96" fill="none" stroke={C.mute} strokeWidth={5} strokeDasharray="8 8" strokeLinecap="round" />
    </svg>
  );
};

export const S04: React.FC = () => (
  <Shell
    id={ID}
    chapter={1}
    title="Lo que duele hoy es un riesgo para el negocio, no solo trabajo manual"
    foot="Fuente: dolores de severidad alta y media del levantamiento As-Is"
  >
    <Rise at={0.5} y={14} style={{ position: "absolute", left: MX, top: 292, display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{ fontSize: 27, color: C.text }}>Trabajo manual:</div>
      <Pill bg={C.panel} color={C.ink} size={26}>
        3 capturas del mismo dato
      </Pill>
      <Pill bg={C.panel} color={C.ink} size={26}>
        La base depende de 2 personas
      </Pill>
    </Rise>
    {RISKS.map((r, i) => (
      <Rise key={r.h} at={r.at - 0.15} y={34} style={{ position: "absolute", left: MX + i * 580, top: 384 }}>
        <Card style={{ width: 540, height: 452, padding: "34px 36px", borderTop: `10px solid ${C.red}` }}>
          <div style={{ height: 116 }}>
            <Icon kind={r.icon} />
          </div>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 43, lineHeight: 1.1, marginTop: 18, letterSpacing: -0.6 }}>{r.h}</div>
          <div style={{ fontSize: 28, color: C.text, marginTop: 16, lineHeight: 1.28 }}>{r.s}</div>
        </Card>
      </Rise>
    ))}
  </Shell>
);
