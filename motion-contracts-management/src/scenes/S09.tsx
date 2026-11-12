import React from "react";
import { C, FONT } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { ArrowRight, Card, Check, ContractIcon, Cross, MX, Pill, Shell } from "../components/ui";

const ID = "s09";
const BW = 392;
const GAP = 44;
const bx = (i: number) => MX + i * (BW + GAP);
const TOP = 318;
const BH = 300;
const FIELDS = ["Fecha de fin", "Valor", "Cláusulas clave"];
const NOT = [
  { at: cue(ID, "no decide"), h: "No decide", s: "si va contrato: es una regla" },
  { at: cue(ID, "no aprueba"), h: "No aprueba", s: "ni negocia, firma o renueva" },
  { at: cue(ID, "no interpreta"), h: "No interpreta cláusulas", s: "eso corresponde a Legal" },
  { at: cue(ID, "ni confirma"), h: "No confirma ahorros", s: "solo propone candidatos" },
];

export const S09: React.FC = () => {
  const t = useSec();
  const a1 = cue(ID, "Lee el contrato") - 0.3;
  const a2 = cue(ID, "propone");
  const cite = cue(ID, "la cita");
  const a3 = cue(ID, "Una persona");
  const a4 = cue(ID, "antes de publicarlas");
  return (
    <Shell
      id={ID}
      chapter={3}
      title="La IA lee y propone; las personas validan y deciden"
      foot="La IA no escribe en el registro, en Ariba ni en el Budget · corre en el tenant corporativo y no se entrenan modelos con los contratos"
    >
      <Rise at={0.5} y={10} style={{ position: "absolute", left: MX, top: 250 }}>
        <Pill bg={C.purpleSoft} color={C.purple} size={24}>
          Después del MVP · Olas 2 y 3
        </Pill>
      </Rise>

      <Rise at={a1} y={24} style={{ position: "absolute", left: bx(0), top: TOP }}>
        <Card style={{ width: BW, height: BH, padding: "26px 28px" }}>
          <ContractIcon size={84} />
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, marginTop: 14, lineHeight: 1.1 }}>Contrato firmado</div>
          <div style={{ fontSize: 26, color: C.text, marginTop: 6 }}>El PDF, en su espacio de Ariba</div>
        </Card>
      </Rise>
      <ArrowRight x={bx(0) + BW + 4} y={TOP + BH / 2} w={GAP - 8} at={a2 - 0.2} color={C.purple} />

      <Rise at={a2} y={24} style={{ position: "absolute", left: bx(1), top: TOP }}>
        <div style={{ width: BW, height: BH, background: C.purple, color: C.white, borderRadius: 20, padding: "24px 26px", boxSizing: "border-box" }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, lineHeight: 1.1 }}>La IA propone la ficha</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
            {FIELDS.map((f, i) => (
              <div key={f} style={{ background: "rgba(255,255,255,0.14)", borderRadius: 10, padding: "9px 14px", fontSize: 26, display: "flex", justifyContent: "space-between", alignItems: "center", opacity: prog(t, a2 + 0.3 + i * 0.25, 0.4) }}>
                <span>{f}</span>
                <span style={{ background: C.yellow, color: C.ink, fontWeight: 700, fontSize: 21, padding: "3px 10px", borderRadius: 6, opacity: prog(t, cite + i * 0.15, 0.3) }}>«cita»</span>
              </div>
            ))}
          </div>
        </div>
      </Rise>
      <ArrowRight x={bx(1) + BW + 4} y={TOP + BH / 2} w={GAP - 8} at={a3 - 0.2} color={C.ink} />

      <Rise at={a3} y={24} style={{ position: "absolute", left: bx(2), top: TOP }}>
        <Card style={{ width: BW, height: BH, padding: "26px 28px", borderColor: C.ink, borderWidth: 3 }}>
          <svg width={84} height={84} viewBox="0 0 84 84">
            <circle cx={42} cy={26} r={18} fill={C.yellow} stroke={C.ink} strokeWidth={5} />
            <path d="M8 82 C8 52 76 52 76 82" fill={C.yellow} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
          </svg>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, marginTop: 14, lineHeight: 1.1 }}>Una persona valida</div>
          <div style={{ fontSize: 26, color: C.text, marginTop: 6, lineHeight: 1.2 }}>Todas las fichas, campo por campo, contra su cita</div>
        </Card>
      </Rise>
      <ArrowRight x={bx(2) + BW + 4} y={TOP + BH / 2} w={GAP - 8} at={a4 - 0.2} color={C.ink} />

      <Rise at={a4} y={24} style={{ position: "absolute", left: bx(3), top: TOP }}>
        <Card style={{ width: BW, height: BH, padding: "26px 28px" }}>
          <Check size={84} />
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, marginTop: 14, lineHeight: 1.1 }}>Registro maestro</div>
          <div style={{ fontSize: 26, color: C.text, marginTop: 6, lineHeight: 1.2 }}>Solo entra el dato ya validado</div>
        </Card>
      </Rise>

      {NOT.map((n, i) => (
        <Rise key={n.h} at={n.at - 0.1} y={20} style={{ position: "absolute", left: bx(i), top: 668 }}>
          <div style={{ width: BW, height: 170, borderRadius: 18, border: `3px solid ${C.red}`, background: C.white, boxSizing: "border-box", padding: "20px 22px" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Cross size={40} />
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 31, lineHeight: 1.05, letterSpacing: -0.4 }}>{n.h}</div>
            </div>
            <div style={{ fontSize: 25, color: C.text, marginTop: 12, lineHeight: 1.2 }}>{n.s}</div>
          </div>
        </Rise>
      ))}
    </Shell>
  );
};
