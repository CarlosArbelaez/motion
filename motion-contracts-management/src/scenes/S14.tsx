import React from "react";
import { C, FONT, R } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Shell } from "../components/ui";

const ID = "s14";
// METAS del proceso To-Be v5.1 (iguales en los tres escenarios); no son resultados medidos.
const TILES = [
  { at: cue(ID, "De tres"), from: "3", to: "1", label: "capturas del mismo dato" },
  { at: cue(ID, "De veintiséis"), from: "~26", to: "1", label: "avisos por contrato: una sola alerta que exige respuesta" },
  { at: cue(ID, "De dos personas"), from: "2", to: "0", label: "personas imprescindibles para mantener la base" },
  { at: cue(ID, "Todos los contratos"), from: "", to: "100 %", label: "de los contratos vigentes con su PDF en SAP Ariba" },
  { at: cue(ID, "Ningún contrato"), from: "", to: "0", label: "contratos vencidos sin decisión registrada" },
  { at: cue(ID, "Y un solo histórico"), from: "", to: "1", label: "histórico con todas las aprobaciones y decisiones" },
];
const TW = 546;
const TH = 218;
const pos = (i: number) => ({ left: MX + (i % 3) * (TW + 31), top: 290 + Math.floor(i / 3) * (TH + 24) });

export const S14: React.FC = () => (
  <Shell id={ID} chapter={4} title="Las metas son las mismas con cualquiera de los tres" foot="Metas del proceso To-Be v5.1 · se miden desde el arranque">
    {TILES.map((x, i) => (
      <Rise key={x.label} at={x.at - 0.15} y={26} style={{ position: "absolute", ...pos(i) }}>
        <div style={{ width: TW, height: TH, background: C.white, border: `2px solid ${C.line}`, borderRadius: R.card, boxSizing: "border-box", padding: "18px 28px", position: "relative" }}>
          <div style={{ position: "absolute", right: 22, top: 18, fontSize: 20, fontWeight: 500, padding: "4px 14px", borderRadius: R.full, background: C.panel }}>Meta</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, fontFamily: FONT.head, fontWeight: 700, letterSpacing: -2, marginTop: 14, height: 86 }}>
            {x.from ? (
              <>
                <span style={{ fontSize: 60, fontWeight: 600, color: C.mute }}>{x.from}</span>
                <svg width={54} height={30} viewBox="0 0 54 30" style={{ alignSelf: "flex-end", marginBottom: 20, flexShrink: 0 }}>
                  <path d="M3 15 H48 M36 4 L49 15 L36 26" fill="none" stroke={C.mute} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            ) : null}
            <span style={{ fontSize: 78 }}>{x.to}</span>
          </div>
          <div style={{ fontSize: 25, color: C.text, lineHeight: 1.22, marginTop: 8 }}>{x.label}</div>
        </div>
      </Rise>
    ))}
    <Rise at={cue(ID, "Los ahorros") - 0.1} y={16} style={{ position: "absolute", left: MX, top: 774, width: 1700 }}>
      <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, letterSpacing: -0.5, lineHeight: 1.15 }}>
        Los ahorros en horas y en dinero se medirán desde el arranque: hoy no existe una línea base.
      </div>
    </Rise>
  </Shell>
);
