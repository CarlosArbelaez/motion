import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, R } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue, sceneSeconds } from "../lib/timing";
import { MX } from "../components/ui";

const ID = "s12";
const ASKS = [
  { at: cue(ID, "El visto bueno"), h: "Vo.Bo. del To-Be", d: "Aprobar la propuesta v4.0 como diseño del proceso y de la plataforma." },
  {
    at: cue(ID, "Elegir el equipo"),
    h: "Escenario de equipo",
    d: "Con 4 personas, MVP hacia el 1 de marzo de 2027; con 2, hacia el 10 de mayo.",
    note: "Estimación preliminar",
  },
  { at: cue(ID, "Cerrar las reglas"), h: "Reglas de negocio", d: "Días de aviso, criterio para commodities y «todo contrato en Ariba»." },
  { at: cue(ID, "Aprobar los tres"), h: "Los tres dueños", d: "Aprobar el modelo de gobierno y nombrar a sus responsables." },
  { at: cue(ID, "Nombrar un responsable"), h: "Dependencias", d: "Un responsable para Ariba, BrewDat, Arquitectura y Seguridad." },
  { at: cue(ID, "Y validar"), h: "Nombre de la plataforma", d: "Validar cómo se llamará la plataforma que diseñaremos." },
];
const TW = 546;
const TH = 226;

export const S12: React.FC = () => {
  const t = useSec();
  const total = sceneSeconds(ID);
  const fade = Math.min(prog(t, 0, 0.45), 1 - prog(t, total - 0.5, 0.5));
  const go = cue(ID, "Con su visto bueno");
  const ring = prog(t, go, 1.2);
  return (
    <AbsoluteFill style={{ background: C.yellow, fontFamily: FONT.body, color: C.ink }}>
      <AbsoluteFill style={{ opacity: fade }}>
        <Rise at={0.1} y={0} style={{ position: "absolute", left: MX, top: 62, fontSize: 28, fontWeight: 500 }}>
          Contracts Management Finance Tech · Vo.Bo. del negocio
        </Rise>
        <Rise at={0.2} y={24} style={{ position: "absolute", left: MX, top: 108, width: 1700 }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 80, letterSpacing: -2.5, lineHeight: 1.06 }}>Seis definiciones para arrancar</div>
        </Rise>
        {ASKS.map((a, i) => (
          <Rise key={a.h} at={a.at - 0.15} y={30} style={{ position: "absolute", left: MX + (i % 3) * (TW + 31), top: 236 + Math.floor(i / 3) * (TH + 22) }}>
            <div style={{ width: TW, height: TH, background: C.white, borderRadius: R.panel, boxSizing: "border-box", padding: "20px 26px", display: "flex", gap: 20 }}>
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 76, lineHeight: 0.95, width: 50, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 35, lineHeight: 1.1, letterSpacing: -0.5 }}>{a.h}</div>
                <div style={{ fontSize: 25, lineHeight: 1.24, marginTop: 8, color: C.text }}>{a.d}</div>
                {a.note ? <div style={{ fontSize: 21, fontWeight: 700, marginTop: 6, color: C.ink }}>{a.note}</div> : null}
              </div>
            </div>
          </Rise>
        ))}
        <Rise at={go - 0.1} y={20} style={{ position: "absolute", left: MX, top: 752, width: 1700, display: "flex", alignItems: "center", gap: 26 }}>
          <svg width={150} height={96} viewBox="0 0 150 96" style={{ flexShrink: 0 }}>
            <path d="M48 6 H102 A42 42 0 0 1 102 90 H48 A42 42 0 0 1 48 6 Z" fill="none" stroke={C.ink} strokeWidth={8} pathLength={1} strokeDasharray={`${ring} 1`} strokeLinecap="round" />
            <path d="M54 49 L68 63 L96 33" fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={prog(t, go + 1.1, 0.3)} />
          </svg>
          <div>
            <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 54, letterSpacing: -1.4, lineHeight: 1.05 }}>
              Con el Vo.Bo., la primera entrega arranca el 23 de noviembre
            </div>
            <div style={{ fontSize: 25, marginTop: 8, color: "rgba(20,22,26,0.78)" }}>La estimación está por validar con el Tech Lead; los costos se calculan al aprobar el To-Be y elegir el escenario.</div>
          </div>
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
