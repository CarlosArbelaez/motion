import React from "react";
import { C, FONT } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Shell } from "../components/ui";

const ID = "s11";
// kind: meta = resultado que se busca · diseño = característica del proceso propuesto (no mide horas)
const TILES = [
  { at: cue(ID, "De tres"), kind: "META", from: "3", to: "1", label: "capturas manuales del mismo dato" },
  { at: cue(ID, "De veintiséis"), kind: "META", from: "~26", to: "1", label: "avisos por contrato: de correos sin cierre a una tarjeta con acuse" },
  { at: cue(ID, "El cien"), kind: "META", from: "Sin medir", to: "100 %", label: "de los contratos vigentes con su PDF en Ariba" },
  { at: cue(ID, "Al menos"), kind: "META", from: "No se mide", to: "≥ 95 %", label: "de las alertas con decisión antes del preaviso" },
  { at: cue(ID, "Y los pasos"), kind: "DISEÑO", from: "12 %", to: "62 %", label: "de los pasos sin intervención manual (4 de 34 hoy; 56 de 90). Mide pasos, no horas." },
];
const TW = 546;
const TH = 252;
const pos = (i: number) => ({ left: MX + (i % 3) * (TW + 31), top: 296 + Math.floor(i / 3) * (TH + 26) });

export const S11: React.FC = () => (
  <Shell
    id={ID}
    chapter={4}
    title="Metas del To-Be: control medible desde el arranque"
    foot="Metas del To-Be v3.2 · varios indicadores no tienen línea base porque hoy no se miden; se medirán desde el arranque"
  >
    {TILES.map((x, i) => {
      const small = x.from.length > 4;
      return (
        <Rise key={x.label} at={x.at - 0.15} y={26} style={{ position: "absolute", ...pos(i) }}>
          <div style={{ width: TW, height: TH, background: C.white, border: `2px solid ${C.line}`, borderRadius: 20, boxSizing: "border-box", padding: "20px 28px", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                right: 22,
                top: 20,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                padding: "4px 12px",
                borderRadius: 8,
                background: x.kind === "META" ? C.yellow : C.panel,
                color: C.ink,
              }}
            >
              {x.kind}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, fontFamily: FONT.head, fontWeight: 700, letterSpacing: -2, marginTop: 30, height: 86 }}>
              <span style={{ fontSize: small ? 36 : 64, color: C.mute, letterSpacing: small ? -0.5 : -2 }}>{x.from}</span>
              <svg width={54} height={30} viewBox="0 0 54 30" style={{ alignSelf: "flex-end", marginBottom: 20, flexShrink: 0 }}>
                <path d="M3 15 H48 M36 4 L49 15 L36 26" fill="none" stroke={C.mute} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 80 }}>{x.to}</span>
            </div>
            <div style={{ fontSize: 25, color: C.text, lineHeight: 1.22, marginTop: 10 }}>{x.label}</div>
          </div>
        </Rise>
      );
    })}
    <Rise at={cue(ID, "Lo que aún") - 0.15} y={26} style={{ position: "absolute", ...pos(5) }}>
      <div style={{ width: TW, height: TH, background: C.ink, color: C.white, borderRadius: 20, boxSizing: "border-box", padding: "22px 28px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, color: C.yellow }}>AÚN NO SE PROMETE</div>
        <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 38, lineHeight: 1.1, marginTop: 10, letterSpacing: -0.5 }}>Ahorro de tiempo con IA</div>
        <div style={{ fontSize: 25, lineHeight: 1.24, marginTop: 10, color: "rgba(255,255,255,0.8)" }}>
          Primero se mide la línea base; la meta se fija tras un piloto de 20 contratos.
        </div>
      </div>
    </Rise>
  </Shell>
);
