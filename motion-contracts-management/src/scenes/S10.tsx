import React from "react";
import { C, FONT, R } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { Card, MX, Shell } from "../components/ui";
import { Flag } from "../components/Flag";

const ID = "s10";
// Herramientas que la compañía ya tiene (se nombran por pedido de negocio; sin logotipos).
const TOOLS = [
  { at: cue(ID, "Una aplicación"), name: "Power Apps", role: "La app de contratos, abierta desde Teams" },
  { at: cue(ID, "Power Automate"), name: "Power Automate", role: "Reglas, avisos y escalamientos" },
  { at: cue(ID, "Las alertas"), name: "Teams y correo", role: "Las alertas, como tarjeta con botones" },
  { at: cue(ID, "El dashboard"), name: "Power BI", role: "El dashboard: el reporte que ya existe" },
  { at: cue(ID, "Y las consultas"), name: "Genie o Insights Copilot", role: "Consultas en lenguaje natural sobre la ficha" },
];
const TW = 316;
const TG = 30;

export const S10: React.FC = () => {
  const manual = cue(ID, "No hay inteligencia") - 0.1;
  return (
    <Shell
      id={ID}
      chapter={3}
      title="Lite: herramientas que la compañía ya usa, sin plataforma propia"
      foot="Se asume que no requieren licencias adicionales (por confirmar) · el registro vive en listas de Microsoft en SharePoint"
    >
      {TOOLS.map((x, i) => (
        <Rise key={x.name} at={x.at - 0.1} y={26} style={{ position: "absolute", left: MX + i * (TW + TG), top: 300 }}>
          <div style={{ width: TW, height: 196, background: C.white, border: `2px solid ${C.line}`, borderRadius: R.card, boxSizing: "border-box", padding: "20px 22px" }}>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 32, lineHeight: 1.08, letterSpacing: -0.4, height: 72 }}>{x.name}</div>
            <div style={{ fontSize: 24, color: C.text, lineHeight: 1.22, marginTop: 8 }}>{x.role}</div>
          </div>
        </Rise>
      ))}
      <Rise at={cue(ID, "se conectan")} y={16} style={{ position: "absolute", left: MX, top: 520, width: 1700 }}>
        <div style={{ background: C.ink, color: C.white, borderRadius: R.card, padding: "18px 28px", display: "flex", alignItems: "baseline", gap: 18 }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 34 }}>BrewDat</div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.84)" }}>De aquí se consume todo: los datos de SAP Ariba, el PxQ y el histórico del proceso.</div>
        </div>
      </Rise>
      <Rise at={manual} y={22} style={{ position: "absolute", left: MX, top: 628 }}>
        <Card style={{ width: 835, height: 216, padding: "24px 28px", borderColor: C.ink }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, letterSpacing: -0.5 }}>Sin IA que lea los contratos</div>
          <div style={{ fontSize: 27, color: C.text, marginTop: 10, lineHeight: 1.26 }}>
            Una persona captura los datos de cada contrato y otra los valida: unas 170 fichas en el arranque.
          </div>
        </Card>
      </Rise>
      <Rise at={cue(ID, "una persona captura") + 0.3} y={22} style={{ position: "absolute", left: MX + 865, top: 628 }}>
        <Card style={{ width: 835, height: 216, padding: "22px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 27, lineHeight: 1.24 }}>
            <b style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 32 }}>Lite A</b>
            <span style={{ background: C.yellow, borderRadius: 8, padding: "4px 7px", display: "flex" }}>
              <Flag size={22} />
            </span>
            <span style={{ color: C.text }}>Ariba se lee y se escribe por API.</span>
          </div>
          <div style={{ borderTop: `2px solid ${C.line}`, marginTop: 16, paddingTop: 16, fontSize: 27, lineHeight: 1.24 }}>
            <b style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 32 }}>Lite B</b>
            <span style={{ color: C.text }}> Ariba se lee desde BrewDat y Procurement escribe a mano.</span>
          </div>
        </Card>
      </Rise>
    </Shell>
  );
};
