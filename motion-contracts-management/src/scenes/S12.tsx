import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue, sceneSeconds } from "../lib/timing";
import { MX } from "../components/ui";

const ID = "s12";
const DECISIONS = [
  { at: cue(ID, "Uno: aprobar"), n: "1", h: "El diseño", d: "Aprobar el To-Be v3.2 como diseño del proceso de punta a punta." },
  { at: cue(ID, "Dos: aprobar"), n: "2", h: "El MVP", d: "Aprobar el alcance de las Olas 0 y 1, sin agentes de IA." },
  { at: cue(ID, "Tres: aprobar"), n: "3", h: "El gobierno", d: "Aprobar el modelo de tres dueños y nombrar a sus responsables." },
];

export const S12: React.FC = () => {
  const t = useSec();
  const total = sceneSeconds(ID);
  const fade = Math.min(prog(t, 0, 0.45), 1 - prog(t, total - 0.5, 0.5));
  const cal = cue(ID, "Y para fijar");
  const go = cue(ID, "Con su visto bueno");
  const ring = prog(t, go, 1.2);
  return (
    <AbsoluteFill style={{ background: C.yellow, fontFamily: FONT.body, color: C.ink }}>
      <AbsoluteFill style={{ opacity: fade }}>
        <Rise at={0.1} y={0} style={{ position: "absolute", left: MX, top: 70, fontSize: 28, fontWeight: 500 }}>
          Contracts Management Finance Tech · Vo.Bo. del negocio
        </Rise>
        <Rise at={0.2} y={24} style={{ position: "absolute", left: MX, top: 122, width: 1700 }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 84, letterSpacing: -2.5, lineHeight: 1.04 }}>
            Tres decisiones para arrancar
          </div>
        </Rise>
        {DECISIONS.map((d, i) => (
          <Rise key={d.n} at={d.at - 0.15} y={36} style={{ position: "absolute", left: MX + i * 580, top: 262 }}>
            <div style={{ width: 540, height: 318, background: C.white, borderRadius: 24, border: `3px solid ${C.ink}`, boxSizing: "border-box", padding: "24px 34px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 96, lineHeight: 1 }}>{d.n}</div>
                <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 50, letterSpacing: -1 }}>{d.h}</div>
              </div>
              <div style={{ fontSize: 31, lineHeight: 1.25, marginTop: 14, color: C.text }}>{d.d}</div>
            </div>
          </Rise>
        ))}
        <Rise at={cal - 0.1} y={20} style={{ position: "absolute", left: MX, top: 606, width: 1700 }}>
          <div style={{ background: C.ink, color: C.white, borderRadius: 20, padding: "18px 34px", display: "flex", alignItems: "center", gap: 34 }}>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 34, lineHeight: 1.12, width: 560, flexShrink: 0 }}>
              Y para fijar el calendario: elegir con cuántas personas se construye
            </div>
            <div style={{ fontSize: 25, lineHeight: 1.28, color: "rgba(255,255,255,0.82)" }}>
              <b style={{ color: C.yellow }}>Estimación preliminar, por validar con el Tech Lead:</b> el MVP llegaría hacia fines de enero de 2027
              con 4 personas, o hacia mediados de marzo con 2.
            </div>
          </div>
        </Rise>
        <Rise at={go - 0.1} y={20} style={{ position: "absolute", left: MX, top: 768, width: 1700, display: "flex", alignItems: "center", gap: 26 }}>
          <svg width={150} height={96} viewBox="0 0 150 96">
            <path d="M48 6 H102 A42 42 0 0 1 102 90 H48 A42 42 0 0 1 48 6 Z" fill="none" stroke={C.ink} strokeWidth={8} pathLength={1} strokeDasharray={`${ring} 1`} strokeLinecap="round" />
            <path d="M54 49 L68 63 L96 33" fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={prog(t, go + 1.1, 0.3)} />
          </svg>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 56, letterSpacing: -1.4, lineHeight: 1.05 }}>
            Con el Vo.Bo., la Ola 0 arranca el 18 de noviembre
          </div>
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
