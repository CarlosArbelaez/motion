import React from "react";
import { C, FONT, R } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Shell } from "../components/ui";
import { Flag } from "../components/Flag";
import { Highlight } from "../motion";

const ID = "s08";
const SCENARIOS = [
  {
    at: cue(ID, "El escenario Completo"),
    name: "Completo",
    sub: "Plataforma propia, con IA",
    flag: false,
    items: ["Todo en una sola pantalla.", "IA que lee contratos y propone; una persona valida.", "Consulta de cláusulas con cita al contrato."],
  },
  {
    at: cue(ID, "Lite A"),
    name: "Lite A",
    sub: "Herramientas de la compañía, con API de SAP Ariba",
    flag: true,
    items: ["Power Apps, Power Automate, Teams, Power BI y BrewDat.", "Sin plataforma ni IA: una persona captura y otra valida.", "Ariba se lee y se escribe por API."],
  },
  {
    at: cue(ID, "Y Lite B"),
    name: "Lite B",
    sub: "Herramientas de la compañía, sin API de SAP Ariba",
    flag: false,
    items: ["Las mismas herramientas que Lite A.", "Los datos de Ariba se leen desde BrewDat.", "Procurement escribe en Ariba a mano."],
  },
];

export const S08: React.FC = () => (
  <Shell id={ID} chapter={3} title="Un mismo proceso, tres formas de construirlo">
    {SCENARIOS.map((s, i) => (
      <Rise key={s.name} at={cue(ID, "tres formas") - 0.1 + i * 0.12} y={34} style={{ position: "absolute", left: MX + i * 580, top: 286 }}>
        <div style={{ width: 540, height: 430, background: C.white, border: `2px solid ${C.line}`, borderRadius: R.card, boxSizing: "border-box", padding: "28px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 56, letterSpacing: -1.5, lineHeight: 1 }}>{s.name}</div>
            {s.flag ? (
              <div style={{ background: C.yellow, borderRadius: R.ctl, padding: "6px 10px", display: "flex" }}>
                <Flag size={28} />
              </div>
            ) : null}
          </div>
          <Rise at={s.at - 0.15} y={10} exit={false}>
          <div style={{ fontSize: 26, fontWeight: 500, color: C.ink, marginTop: 10, lineHeight: 1.2, height: 64 }}>{s.sub}</div>
          <div style={{ borderTop: `2px solid ${C.line}`, marginTop: 14, paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {s.items.map((it) => (
              <div key={it} style={{ fontSize: 25, color: C.text, lineHeight: 1.24 }}>
                {it}
              </div>
            ))}
          </div>
          </Rise>
        </div>
      </Rise>
    ))}
    <Rise at={cue(ID, "Lite A solo es posible") - 0.1} y={20} style={{ position: "absolute", left: MX, top: 744, width: 1700 }}>
      <div style={{ background: C.ink, color: C.white, borderRadius: R.card, padding: "20px 30px", display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ background: C.yellow, borderRadius: R.ctl, padding: "8px 12px", display: "flex" }}>
          <Flag size={32} />
        </div>
        <div>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 34, letterSpacing: -0.4, lineHeight: 1.1 }}>
            <Highlight color={C.yellow} delay={cue(ID, "Lite A solo es posible") + 0.45} duration={0.5}>
              <span style={{ color: C.ink }}>Definición pendiente</span>
            </Highlight>{" "}
            ¿SAP Ariba tiene una API que lea y escriba?
          </div>
          <div style={{ fontSize: 25, color: "rgba(255,255,255,0.82)", marginTop: 4 }}>De eso depende Lite A. Si no existe, queda Lite B.</div>
        </div>
      </div>
    </Rise>
  </Shell>
);
