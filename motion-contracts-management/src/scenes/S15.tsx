import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, R } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue, sceneSeconds } from "../lib/timing";
import { MX } from "../components/ui";

const ID = "s15";
// Lo más importante para avanzar: el Vo.Bo. (proceso y estimaciones) y la elección del escenario.
const KEY = [
  { at: cue(ID, "Primera"), h: "Vo.Bo. al proceso y a las estimaciones", d: "Las 7 fases, las reglas de la DAG 2026, los tres dueños, y los tiempos y costos de cada escenario." },
  { at: cue(ID, "Segunda"), h: "Elegir el escenario", d: "Completo o Lite. Si es Lite, A o B según se confirme la API de SAP Ariba." },
];
const DEFS = [
  { at: cue(ID, "Confirmar"), h: "SAP Ariba y HighQ", d: "Si hay API y qué permite; si HighQ guarda contratos." },
  { at: cue(ID, "Los datos en BrewDat"), h: "Datos en BrewDat", d: "Tablas de Ariba, PxQ y PDF originales, con un área responsable." },
  { at: cue(ID, "Las reglas"), h: "Reglas de negocio", d: "Política de preaviso, commodities y herramienta de firma." },
  { at: cue(ID, "Y la validación"), h: "Estimación del Lite", d: "El Tech Lead la valida antes de comprometer fechas." },
];

export const S15: React.FC = () => {
  const t = useSec();
  const total = sceneSeconds(ID);
  const fade = Math.min(prog(t, 0, 0.45), 1 - prog(t, total - 0.5, 0.5));
  const go = cue(ID, "Ustedes eligen");
  const ring = prog(t, go, 1.2);
  return (
    <AbsoluteFill style={{ background: C.yellow, fontFamily: FONT.body, color: C.ink }}>
      <AbsoluteFill style={{ opacity: fade }}>
        <Rise at={0.1} y={0} style={{ position: "absolute", left: MX, top: 56, fontSize: 28, fontWeight: 500 }}>
          Contract Management Tech · Vo.Bo. del negocio
        </Rise>
        <Rise at={0.2} y={24} style={{ position: "absolute", left: MX, top: 98, width: 1700 }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 78, letterSpacing: -2.5, lineHeight: 1.06 }}>Dos decisiones de negocio para arrancar</div>
        </Rise>
        {KEY.map((k, i) => (
          <Rise key={k.h} at={k.at - 0.15} y={30} style={{ position: "absolute", left: MX + i * 865, top: 216 }}>
            <div style={{ width: 835, height: 232, background: C.ink, color: C.white, borderRadius: R.panel, boxSizing: "border-box", padding: "24px 30px", display: "flex", gap: 24 }}>
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 104, lineHeight: 0.92, color: C.yellow, width: 64, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 42, lineHeight: 1.08, letterSpacing: -0.8 }}>{k.h}</div>
                <div style={{ fontSize: 26, lineHeight: 1.26, marginTop: 10, color: "rgba(255,255,255,0.86)" }}>{k.d}</div>
              </div>
            </div>
          </Rise>
        ))}
        <Rise at={cue(ID, "Y para sostenerlas") - 0.1} y={10} style={{ position: "absolute", left: MX, top: 470 }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 34, letterSpacing: -0.4 }}>Y cuatro definiciones para sostenerlas</div>
        </Rise>
        {DEFS.map((d, i) => (
          <Rise key={d.h} at={d.at - 0.15} y={26} style={{ position: "absolute", left: MX + i * 432.5, top: 524 }}>
            <div style={{ width: 402.5, height: 196, background: C.white, borderRadius: R.panel, boxSizing: "border-box", padding: "20px 24px" }}>
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 31, lineHeight: 1.1, letterSpacing: -0.4 }}>{d.h}</div>
              <div style={{ fontSize: 24, lineHeight: 1.24, marginTop: 8, color: C.text }}>{d.d}</div>
            </div>
          </Rise>
        ))}
        <Rise at={go - 0.1} y={20} style={{ position: "absolute", left: MX, top: 760, width: 1700, display: "flex", alignItems: "center", gap: 26 }}>
          <svg width={150} height={96} viewBox="0 0 150 96" style={{ flexShrink: 0 }}>
            <path d="M48 6 H102 A42 42 0 0 1 102 90 H48 A42 42 0 0 1 48 6 Z" fill="none" stroke={C.ink} strokeWidth={8} pathLength={1} strokeDasharray={`${ring} 1`} strokeLinecap="round" />
            <path d="M54 49 L68 63 L96 33" fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={prog(t, go + 1.1, 0.3)} />
          </svg>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 54, letterSpacing: -1.4, lineHeight: 1.05 }}>
            Ustedes eligen el escenario; arrancamos el 7 de diciembre
          </div>
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
