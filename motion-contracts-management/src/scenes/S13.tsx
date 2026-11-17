import React from "react";
import { C, FONT, R } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Shell } from "../components/ui";

const ID = "s13";
// Todas son METAS del To-Be v4.0 (resultados que se buscan), no resultados medidos.
const TILES = [
  { at: cue(ID, "De tres"), from: "3", to: "1", label: "capturas manuales del mismo dato" },
  { at: cue(ID, "De veintiséis"), from: "~26", to: "1", label: "avisos por contrato: de correos sin cierre a una alerta que exige respuesta" },
  { at: cue(ID, "Todos los contratos"), from: "Sin medir", to: "100 %", label: "de los contratos vigentes con su PDF en Ariba" },
  { at: cue(ID, "Al menos"), from: "No se mide", to: "≥ 95 %", label: "de las alertas con decisión antes del preaviso" },
  { at: cue(ID, "Y todas"), from: "No existe", to: "100 %", label: "de las aprobaciones y decisiones consultables en un solo histórico" },
];
const TW = 546;
const TH = 252;
const pos = (i: number) => ({ left: MX + (i % 3) * (TW + 31), top: 296 + Math.floor(i / 3) * (TH + 26) });
const badge: React.CSSProperties = { position: "absolute", right: 22, top: 20, fontSize: 20, fontWeight: 500, padding: "4px 14px", borderRadius: R.full };

export const S13: React.FC = () => (
  <Shell
    id={ID}
    chapter={4}
    title="Metas del To-Be: control medible desde el arranque"
    foot="Metas del To-Be v4.0 · además, los pasos que ya no hace una persona pasan de 12 % a 63 % (4 de 34 hoy; 57 de 91) · lo que hoy no se mide se medirá desde el arranque"
  >
    {TILES.map((x, i) => {
      const small = x.from.length > 4;
      return (
        <Rise key={x.label} at={x.at - 0.15} y={26} style={{ position: "absolute", ...pos(i) }}>
          <div style={{ width: TW, height: TH, background: C.white, border: `2px solid ${C.line}`, borderRadius: R.card, boxSizing: "border-box", padding: "20px 28px", position: "relative" }}>
            <div style={{ ...badge, background: C.panel, color: C.ink }}>Meta</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, fontFamily: FONT.head, fontWeight: 700, letterSpacing: -2, marginTop: 30, height: 86 }}>
              <span style={{ fontSize: small ? 34 : 62, fontWeight: 600, color: C.mute, letterSpacing: small ? -0.5 : -2 }}>{x.from}</span>
              <svg width={54} height={30} viewBox="0 0 54 30" style={{ alignSelf: "flex-end", marginBottom: 20, flexShrink: 0 }}>
                <path d="M3 15 H48 M36 4 L49 15 L36 26" fill="none" stroke={C.mute} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 78 }}>{x.to}</span>
            </div>
            <div style={{ fontSize: 25, color: C.text, lineHeight: 1.22, marginTop: 10 }}>{x.label}</div>
          </div>
        </Rise>
      );
    })}
    <Rise at={cue(ID, "El impacto") - 0.15} y={26} style={{ position: "absolute", ...pos(5) }}>
      <div style={{ width: TW, height: TH, background: C.purple, color: C.white, borderRadius: R.card, boxSizing: "border-box", padding: "22px 28px", position: "relative" }}>
        <div style={{ ...badge, background: "rgba(255,255,255,0.18)", color: C.white }}>Después del MVP</div>
        <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 38, lineHeight: 1.1, marginTop: 40, letterSpacing: -0.5 }}>El impacto de la IA</div>
        <div style={{ fontSize: 25, lineHeight: 1.24, marginTop: 10, color: "rgba(255,255,255,0.9)" }}>
          Reducir el tiempo de lectura, captura y validación de cada contrato. Su meta se fija con un piloto de 20 contratos.
        </div>
      </div>
    </Rise>
  </Shell>
);
