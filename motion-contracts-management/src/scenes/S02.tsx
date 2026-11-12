import React from "react";
import { C, FONT } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { ArrowRight, Card, ContractIcon, MX, Shell } from "../components/ui";

const ID = "s02";
const STATS = [
  { n: "~220", l: "servicios", c: "doscientos veinte" },
  { n: "~170", l: "contratos", c: "ciento setenta" },
  { n: "2", l: "archivos de Excel", c: "dos archivos" },
  { n: "1", l: "correo automático", c: "un correo" },
  { n: "2", l: "personas", c: "dos personas" },
];
const FLOW = [
  { t: "Contrato firmado", s: "Lo guarda su dueño" },
  { t: "SAP Ariba", s: "Captura 1 · a mano" },
  { t: "Excel de la base", s: "Captura 2 · alimenta las alertas" },
  { t: "Excel del dashboard", s: "Captura 3 · copia y pega" },
  { t: "Power BI", s: "Dashboard" },
];
const BW = 290;
const GAP = 62.5;
const bx = (i: number) => MX + i * (BW + GAP);
const FY = 492;

const Token: React.FC = () => {
  const t = useSec();
  const stops = [cue(ID, "el mismo dato"), cue(ID, "en Ariba"), cue(ID, "los dos Excel"), cue(ID, "los dos Excel") + 0.55];
  let x = bx(0);
  stops.slice(1).forEach((s, i) => {
    x += (bx(i + 1) - bx(i)) * prog(t, s - 0.25, 0.55);
  });
  return (
    <div style={{ position: "absolute", left: x + BW - 62, top: FY - 72, opacity: prog(t, stops[0] - 0.2, 0.4) }}>
      <ContractIcon size={54} />
    </div>
  );
};

export const S02: React.FC = () => {
  const t = useSec();
  const flowAt = cue(ID, "el mismo dato") - 0.5;
  const capAt = [cue(ID, "en Ariba"), cue(ID, "los dos Excel"), cue(ID, "los dos Excel") + 0.55];
  const diff = cue(ID, "fechas distintas") - 0.4;
  return (
    <Shell
      id={ID}
      chapter={1}
      title="Hoy los contratos se siguen con dos Excel, un correo y dos personas"
      foot="Fuente: levantamiento As-Is (13-oct-2026) y respuestas del negocio · ~220 y ~170 son cifras declaradas"
    >
      <div style={{ position: "absolute", left: MX, top: 296, display: "flex", gap: 20 }}>
        {STATS.map((s) => (
          <Rise key={s.l} at={cue(ID, s.c) - 0.15} y={20}>
            <Card style={{ width: 324, height: 116, padding: "14px 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 64, letterSpacing: -2 }}>{s.n}</div>
              <div style={{ fontSize: 27, color: C.text, lineHeight: 1.15 }}>{s.l}</div>
            </Card>
          </Rise>
        ))}
      </div>

      {FLOW.map((f, i) => (
        <React.Fragment key={f.t}>
          <Rise at={flowAt + i * 0.12} y={20} style={{ position: "absolute", left: bx(i), top: FY }}>
            <Card
              style={{
                width: BW,
                height: 170,
                padding: "22px 24px",
                borderColor: i >= 1 && i <= 3 && t > capAt[i - 1] ? C.ink : C.line,
              }}
            >
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 32, lineHeight: 1.1 }}>{f.t}</div>
              <div style={{ fontSize: 25, color: C.text, marginTop: 10, lineHeight: 1.2 }}>{f.s}</div>
            </Card>
          </Rise>
          {i < FLOW.length - 1 ? <ArrowRight x={bx(i) + BW + 6} y={FY + 85} w={GAP - 12} at={flowAt + 0.3 + i * 0.12} /> : null}
        </React.Fragment>
      ))}
      {capAt.map((a, i) => (
        <Rise key={i} at={a} y={0} scaleFrom={0.3} dur={0.45} style={{ position: "absolute", left: bx(i + 1) - 22, top: FY - 26 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: C.yellow,
              border: `3px solid ${C.ink}`,
              boxSizing: "border-box",
              fontFamily: FONT.head,
              fontWeight: 700,
              fontSize: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i + 1}
          </div>
        </Rise>
      ))}
      <Token />
      <Rise at={cue(ID, "tres veces") - 0.1} y={12} style={{ position: "absolute", left: MX, top: 692, width: 760 }}>
        <span style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 34 }}>El mismo dato se teclea </span>
        <span style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 34, background: C.yellow, padding: "2px 12px", borderRadius: 8 }}>3 veces</span>
      </Rise>

      {/* Consecuencia: dos archivos, dos fechas posibles */}
      <svg style={{ position: "absolute", left: 0, top: 0, opacity: prog(t, diff, 0.5) }} width={1920} height={1080}>
        <path d={`M${bx(2) + BW / 2} ${FY + 170} V 778`} stroke={C.red} strokeWidth={3} strokeDasharray="6 8" fill="none" />
        <path d={`M${bx(4) + BW / 2} ${FY + 170} V 778`} stroke={C.red} strokeWidth={3} strokeDasharray="6 8" fill="none" />
      </svg>
      <Rise at={diff + 0.1} y={14} style={{ position: "absolute", left: bx(2) - 40, top: 778, width: BW + 80 }}>
        <div style={{ border: `3px solid ${C.red}`, background: C.white, borderRadius: 14, padding: "12px 18px", fontSize: 27, textAlign: "center" }}>
          Alertas: <b>fecha A</b>
        </div>
      </Rise>
      <Rise at={diff + 0.25} y={14} style={{ position: "absolute", left: bx(4) - 80, top: 778, width: BW + 80 }}>
        <div style={{ border: `3px solid ${C.red}`, background: C.white, borderRadius: 14, padding: "12px 18px", fontSize: 27, textAlign: "center" }}>
          Dashboard: <b>fecha B</b>
        </div>
      </Rise>
      <Rise at={diff + 0.45} y={0} scaleFrom={0.5} style={{ position: "absolute", left: bx(3) + 40, top: 768, width: 210, textAlign: "center" }}>
        <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 64, color: C.red, lineHeight: 1 }}>≠</div>
      </Rise>
    </Shell>
  );
};
