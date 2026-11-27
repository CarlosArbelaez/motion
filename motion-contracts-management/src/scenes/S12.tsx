import React from "react";
import { C, FONT, R } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { Card, Check, MX, Shell } from "../components/ui";

const ID = "s12";
const MVP = [
  { at: cue(ID, "Un solo registro"), t: "Un solo registro; adiós a los dos Excel" },
  { at: cue(ID, "El dashboard"), t: "Dashboard con descarga del reporte" },
  { at: cue(ID, "Una alerta"), t: "Una alerta que exige respuesta, con escalamiento" },
  { at: cue(ID, "Cada solicitud"), t: "Cada solicitud y renovación, aprobada por una persona" },
  { at: cue(ID, "Y el cruce"), t: "Cruce diario con SAP Ariba y el PxQ, en BrewDat" },
];
const NEXT = [
  { at: cue(ID, "En los tres", 1), who: "En los tres", olas: "", t: "Alta de solicitudes con la regla de la DAG.", bg: C.white, fg: C.ink, sub: C.text, border: C.line },
  {
    at: cue(ID, "En el Completo"),
    who: "Completo",
    olas: "3 olas más",
    t: "IA que lee contratos y propone la ficha; consulta de cláusulas, brief de renovación y servicios similares.",
    bg: C.purple,
    fg: C.white,
    sub: "rgba(255,255,255,0.9)",
    border: C.purple,
  },
  {
    at: cue(ID, "Y en el Lite"),
    who: "Lite A y Lite B",
    olas: "2 olas más",
    t: "Consulta en lenguaje natural con Genie o Insights Copilot y revisión de consolidación por categoría.",
    bg: C.white,
    fg: C.ink,
    sub: C.text,
    border: C.line,
  },
];

export const S12: React.FC = () => (
  <Shell
    id={ID}
    chapter={4}
    title="El MVP es igual en los tres; después vienen más olas"
    foot="Fuera de esta cotización: cruce del PxQ con A360, aprobar la DAG dentro de la solución e integración con HighQ y con la herramienta de firma"
  >
    <Rise at={0.5} y={24} style={{ position: "absolute", left: MX, top: 290 }}>
      <div style={{ width: 830, height: 554, background: C.white, border: `2px solid ${C.ink}`, borderRadius: R.card, overflow: "hidden", boxSizing: "border-box" }}>
        <div style={{ background: C.yellow, padding: "16px 28px", fontFamily: FONT.head, fontWeight: 600, fontSize: 36, letterSpacing: -0.5 }}>
          MVP · igual en los tres escenarios
        </div>
        <div style={{ padding: "18px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {MVP.map((m) => (
            <Rise key={m.t} at={m.at - 0.1} y={12}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Check size={38} />
                <div style={{ fontSize: 28, lineHeight: 1.2 }}>{m.t}</div>
              </div>
            </Rise>
          ))}
        </div>
        <Rise at={cue(ID, "Y el cruce") + 1.2} y={0} style={{ position: "absolute", left: 28, bottom: 20, right: 28 }}>
          <div style={{ borderTop: `2px solid ${C.line}`, paddingTop: 14, fontSize: 24, color: C.text }}>
            Listo en la <b style={{ color: C.ink }}>semana 16</b> (Completo), <b style={{ color: C.ink }}>13</b> (Lite A) o <b style={{ color: C.ink }}>12</b> (Lite B)
          </div>
        </Rise>
      </div>
    </Rise>
    <Rise at={cue(ID, "Después vienen") - 0.1} y={12} style={{ position: "absolute", left: MX + 870, top: 290 }}>
      <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, letterSpacing: -0.5 }}>Después del MVP</div>
    </Rise>
    {NEXT.map((n, i) => (
      <Rise key={n.who} at={n.at - 0.1} y={22} style={{ position: "absolute", left: MX + 870, top: 350 + i * 168 }}>
        <Card style={{ width: 830, height: 152, padding: "18px 26px", background: n.bg, borderColor: n.border, color: n.fg }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 32 }}>{n.who}</div>
            {n.olas ? <div style={{ fontSize: 23, fontWeight: 500, color: n.sub }}>{n.olas}</div> : null}
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.22, marginTop: 6, color: n.sub }}>{n.t}</div>
        </Card>
      </Rise>
    ))}
  </Shell>
);
