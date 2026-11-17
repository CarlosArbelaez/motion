import React from "react";
import { C, FONT } from "../theme";
import { lin, prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { Card, ContractIcon, Cross, Envelope, MX, Pill, Shell } from "../components/ui";

const ID = "s03";
const X0 = 330; // 90 días antes
const X1 = 1500; // vencimiento
const LY = 548;
const N = 26; // martes y jueves, 13 semanas
const dotX = (i: number) => X0 + Math.floor(i / 2) * ((X1 - X0 - 40) / 12.6) + (i % 2) * 34;
const LATE = [1548, 1582, 1650, 1684];
const RISKS = [
  { at: cue(ID, "Hay contratos fuera"), h: "Contratos fuera de Ariba", s: "fuera del repositorio oficial" },
  { at: cue(ID, "nadie responde"), h: "Proceso sin dueño", s: "nadie responde de punta a punta" },
];

export const S03: React.FC = () => {
  const t = useSec();
  const start = cue(ID, "Cada vencimiento") + 0.3;
  const end = cue(ID, "veintiséis") + 0.9;
  const shown = Math.round(lin(t, start, end - start) * N);
  const late = cue(ID, "que no se pueden") + 1.0;
  return (
    <Shell
      id={ID}
      chapter={1}
      title="Hasta ~26 correos por vencimiento y ninguna decisión registrada"
      foot="Fuente: levantamiento As-Is · el correo sale martes y jueves desde 90 días antes, del buzón de una persona"
    >
      <Rise at={start - 0.2} y={16} style={{ position: "absolute", left: MX, top: 284, display: "flex", alignItems: "baseline", gap: 18 }}>
        <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 116, letterSpacing: -4, lineHeight: 1, minWidth: 150 }}>
          {shown >= N ? "~26" : shown}
        </div>
        <div style={{ fontSize: 32, color: C.text }}>correos por contrato</div>
      </Rise>
      <Rise at={cue(ID, "que no se pueden")} y={12} style={{ position: "absolute", left: 800, top: 296, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", width: 640 }}>
        <Pill bg={C.coralSoft} color={C.ink} size={27}>
          Sin respuesta
        </Pill>
        <Pill bg={C.coralSoft} color={C.ink} size={27}>
          Sin cierre
        </Pill>
        <div style={{ fontSize: 26, color: C.text, fontStyle: "italic", width: 640, marginTop: 4 }}>«Si ya fue atendido, ignore este correo»</div>
      </Rise>

      {/* Línea de tiempo */}
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <line x1={MX + 40} y1={LY} x2={MX + 40 + (1810 - MX - 40) * prog(t, 0.4, 1.0)} y2={LY} stroke={C.line} strokeWidth={5} strokeLinecap="round" />
        <line x1={X1 + 20} y1={LY - 118} x2={X1 + 20} y2={LY + 44} stroke={C.ink} strokeWidth={4} opacity={prog(t, 0.6, 0.5)} />
      </svg>
      <Rise at={0.6} y={10} style={{ position: "absolute", left: X1 - 20, top: LY - 228 }}>
        <ContractIcon size={78} />
      </Rise>
      <Rise at={0.8} y={0} style={{ position: "absolute", left: X0 - 90, top: LY + 52, width: 220, textAlign: "center", fontSize: 26, color: C.text }}>
        <b style={{ color: C.ink }}>90 días</b> antes
      </Rise>
      <Rise at={0.6} y={0} style={{ position: "absolute", left: X1 - 90, top: LY + 52, width: 220, textAlign: "center", fontSize: 26, fontWeight: 700 }}>
        Vencimiento
      </Rise>
      <Rise at={start} y={0} style={{ position: "absolute", left: X0 - 20, top: LY - 82, fontSize: 26, color: C.mute }}>
        martes y jueves
      </Rise>
      {Array.from({ length: N }).map((_, i) => {
        const at = start + (i / N) * (end - start);
        const p = prog(t, at, 0.3);
        return (
          <div key={i} style={{ position: "absolute", left: dotX(i) - 15, top: LY - 11 - 22 * (1 - p), opacity: p }}>
            <Envelope size={30} />
          </div>
        );
      })}
      {LATE.map((x, i) => {
        const p = prog(t, late + i * 0.25, 0.3);
        return (
          <div key={x} style={{ position: "absolute", left: x - 15, top: LY - 11 - 22 * (1 - p), opacity: p }}>
            <Envelope size={30} color={C.red} fill={C.coralSoft} />
          </div>
        );
      })}
      <Rise at={late} y={10} style={{ position: "absolute", left: 1540, top: LY - 82, fontSize: 26, color: C.ink, fontWeight: 700 }}>
        «Urgente: vencido»
      </Rise>

      {/* Consecuencias */}
      <Rise at={cue(ID, "Ninguna decisión") - 0.1} y={24} style={{ position: "absolute", left: MX, top: 676 }}>
        <Card style={{ width: 830, height: 172, padding: "0 36px", display: "flex", alignItems: "center", gap: 30, borderColor: C.ink }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 116, lineHeight: 1, color: C.red }}>0</div>
          <div>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, lineHeight: 1.1 }}>decisiones de renovación registradas</div>
            <div style={{ fontSize: 25, color: C.text, marginTop: 6, lineHeight: 1.2 }}>Nadie registra si se renovó, renegoció o terminó.</div>
          </div>
        </Card>
      </Rise>
      {RISKS.map((r, i) => (
        <Rise key={r.h} at={r.at - 0.1} y={20} style={{ position: "absolute", left: MX + 866, top: 676 + i * 92 }}>
          <Card style={{ width: 834, height: 80, padding: "0 26px", display: "flex", alignItems: "center", gap: 18 }}>
            <Cross size={38} />
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 31 }}>{r.h}</div>
            <div style={{ fontSize: 25, color: C.text }}>{r.s}</div>
          </Card>
        </Rise>
      ))}
    </Shell>
  );
};
