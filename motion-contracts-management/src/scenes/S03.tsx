import React from "react";
import { C, FONT } from "../theme";
import { lin, prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { Card, ContractIcon, Envelope, MX, Pill, Shell } from "../components/ui";

const ID = "s03";
const X0 = 330; // 90 días antes
const X1 = 1500; // vencimiento
const LY = 560;
const N = 26; // martes y jueves, 13 semanas
const dotX = (i: number) => X0 + Math.floor(i / 2) * ((X1 - X0 - 40) / 12.6) + (i % 2) * 34;
const LATE = [1548, 1582, 1650, 1684];

export const S03: React.FC = () => {
  const t = useSec();
  const start = cue(ID, "llega un correo");
  const end = cue(ID, "veintiséis") + 0.5;
  const shown = Math.round(lin(t, start, end - start) * N);
  const late = cue(ID, "Después del vencimiento");
  return (
    <Shell
      id={ID}
      chapter={1}
      title="Cada vencimiento genera hasta ~26 correos, sin acuse ni cierre"
      foot="Fuente: levantamiento As-Is · el correo sale martes y jueves desde 90 días antes, del buzón de una persona"
    >
      <Rise at={start - 0.2} y={16} style={{ position: "absolute", left: MX, top: 300, display: "flex", alignItems: "baseline", gap: 18 }}>
        <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 120, letterSpacing: -4, lineHeight: 1, minWidth: 150 }}>
          {shown >= N ? "~26" : shown}
        </div>
        <div style={{ fontSize: 32, color: C.text }}>correos por contrato</div>
      </Rise>
      <Rise at={cue(ID, "que no se pueden")} y={12} style={{ position: "absolute", left: 800, top: 306, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", width: 640 }}>
        <Pill bg={C.white} color={C.red} border={C.red} size={28}>
          Sin acuse
        </Pill>
        <Pill bg={C.white} color={C.red} border={C.red} size={28}>
          Sin cierre
        </Pill>
        <div style={{ fontSize: 26, color: C.text, fontStyle: "italic", width: 640, marginTop: 4 }}>«Si ya fue atendido, ignore este correo»</div>
      </Rise>

      {/* Línea de tiempo */}
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <line x1={MX + 40} y1={LY} x2={MX + 40 + (1810 - MX - 40) * prog(t, 0.5, 1.2)} y2={LY} stroke={C.line} strokeWidth={5} strokeLinecap="round" />
        <line x1={X1 + 20} y1={LY - 120} x2={X1 + 20} y2={LY + 46} stroke={C.ink} strokeWidth={4} opacity={prog(t, 0.9, 0.5)} />
      </svg>
      <Rise at={0.9} y={10} style={{ position: "absolute", left: X1 - 20, top: LY - 232 }}>
        <ContractIcon size={80} />
      </Rise>
      <Rise at={start - 0.3} y={0} style={{ position: "absolute", left: X0 - 90, top: LY + 56, width: 220, textAlign: "center", fontSize: 26, color: C.text }}>
        <b style={{ color: C.ink }}>90 días</b> antes
      </Rise>
      <Rise at={0.9} y={0} style={{ position: "absolute", left: X1 - 90, top: LY + 56, width: 220, textAlign: "center", fontSize: 26, fontWeight: 700 }}>
        Vencimiento
      </Rise>
      <Rise at={start} y={0} style={{ position: "absolute", left: X0 - 20, top: LY - 86, fontSize: 26, color: C.mute }}>
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
        const p = prog(t, late + 0.2 + i * 0.3, 0.3);
        return (
          <div key={x} style={{ position: "absolute", left: x - 15, top: LY - 11 - 22 * (1 - p), opacity: p }}>
            <Envelope size={30} color={C.red} fill={C.coralSoft} />
          </div>
        );
      })}
      <Rise at={late + 0.2} y={10} style={{ position: "absolute", left: 1540, top: LY - 86, fontSize: 26, color: C.red, fontWeight: 700 }}>
        «Urgente: vencido»
      </Rise>

      <Rise at={cue(ID, "ninguna decisión") - 0.1} y={24} style={{ position: "absolute", left: MX, top: 690 }}>
        <Card style={{ width: 1700, height: 150, padding: "0 44px", display: "flex", alignItems: "center", gap: 36, borderColor: C.ink }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 110, lineHeight: 1, color: C.red }}>0</div>
          <div>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 40 }}>decisiones de renovación registradas</div>
            <div style={{ fontSize: 27, color: C.text, marginTop: 4 }}>El ciclo nunca registra qué se decidió: renovar, renegociar o terminar.</div>
          </div>
        </Card>
      </Rise>
    </Shell>
  );
};
