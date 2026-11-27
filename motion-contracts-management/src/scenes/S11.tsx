import React from "react";
import { C, FONT, R } from "../theme";
import { Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Shell } from "../components/ui";
import { Flag } from "../components/Flag";
import { Counter } from "../motion";

const ID = "s11";
// Comparación lado a lado (sección 5 de la propuesta v5.1). El video no recomienda ninguno.
const ROWS: { at: number; label: string; cells: [string, string, string]; flag?: boolean }[] = [
  { at: 0.9, label: "Dónde trabaja la gente", cells: ["Una plataforma web propia", "App en Teams, correo y Power BI", "App en Teams, correo y Power BI"] },
  { at: 1.3, label: "Lectura del contrato", cells: ["La IA propone; una persona valida", "Una persona captura; otra valida", "Una persona captura; otra valida"] },
  { at: 1.7, label: "Consulta de cláusulas", cells: ["Asistente con cita al contrato", "Genie o Insights Copilot, sobre la ficha", "Genie o Insights Copilot, sobre la ficha"] },
  { at: cue(ID, "Cambian el tiempo"), label: "Leer y escribir en SAP Ariba", cells: ["Lee de BrewDat; escribe a mano", "Lee y escribe por API", "Lee de BrewDat; escribe a mano"], flag: true },
  { at: cue(ID, "el trabajo manual"), label: "Trabajo manual que queda", cells: ["Validar lo que propone la IA; escribir en Ariba", "Capturar y validar cada ficha", "Lo de Lite A, más escribir en Ariba"] },
  { at: cue(ID, "El Completo tarda"), label: "Riesgo principal", cells: ["Más tiempo, costo y dependencias", "La API puede no existir o no escribir", "Más pasos manuales y puntos de error"] },
  { at: cue(ID, "En pasos automáticos"), label: "Pasos automáticos (hoy: 12 %)", cells: ["62|58 de 93", "65|60 de 93", "60|56 de 93"] },
];
const LW = 400;
const CW = 420;
const CG = 13;
const colX = (i: number) => MX + LW + CG + i * (CW + CG);
const TOP = 292;
const RH = 72;

export const S11: React.FC = () => {
  const t = useSec();
  const completo = t >= cue(ID, "El Completo tarda") - 0.2 && t < cue(ID, "El Lite sale") - 0.2;
  const lite = t >= cue(ID, "El Lite sale") - 0.2 && t < cue(ID, "En pasos automáticos") - 0.2;
  const on = [completo, lite, lite];
  return (
    <Shell id={ID} chapter={3} title="Los tres resuelven los mismos dolores; cambia el tiempo, el costo y el trabajo manual">
      {["Completo", "Lite A", "Lite B"].map((h, i) => (
        <Rise key={h} at={0.45 + i * 0.1} y={-16} style={{ position: "absolute", left: colX(i), top: TOP }}>
          <div
            style={{
              width: CW,
              height: 54,
              borderRadius: R.ctl,
              background: on[i] ? C.ink : C.panel,
              color: on[i] ? C.white : C.ink,
              fontFamily: FONT.head,
              fontWeight: 600,
              fontSize: 30,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 18px",
              boxSizing: "border-box",
            }}
          >
            {h}
            {i === 1 ? (
              <span style={{ background: C.yellow, borderRadius: 7, padding: "3px 6px", display: "flex" }}>
                <Flag size={20} />
              </span>
            ) : null}
          </div>
        </Rise>
      ))}
      {ROWS.map((r, ri) => (
        <Rise key={r.label} at={r.at} x={-36} y={0} style={{ position: "absolute", left: MX, top: TOP + 62 + ri * RH, width: 1700 }}>
          <div style={{ height: RH, borderBottom: `2px solid ${C.line}`, display: "flex", alignItems: "center", boxSizing: "border-box" }}>
            <div style={{ width: LW + CG, fontSize: 25, fontWeight: 700, lineHeight: 1.15, paddingRight: 16, boxSizing: "border-box" }}>{r.label}</div>
            {r.cells.map((c, i) => (
              <div
                key={i}
                style={{
                  width: CW + CG,
                  fontSize: ri === ROWS.length - 1 ? 27 : 24,
                  fontWeight: ri === ROWS.length - 1 ? 700 : 400,
                  color: ri === ROWS.length - 1 ? C.ink : C.text,
                  lineHeight: 1.18,
                  padding: "0 18px",
                  boxSizing: "border-box",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {ri === ROWS.length - 1 ? (
                  <>
                    <Counter to={Number(c.split("|")[0])} delay={r.at + 0.25 + i * 0.12} duration={1.1} /> % · {c.split("|")[1]}
                  </>
                ) : (
                  c
                )}
              </div>
            ))}
          </div>
        </Rise>
      ))}
    </Shell>
  );
};
