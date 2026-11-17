import React from "react";
import { C, FONT, R } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Shell } from "../components/ui";

const ID = "s04";
// Código de color de la propuesta: tinta = ordenar, amarillo = automatizar (MVP), morado = IA.
const STEPS = [
  {
    at: cue(ID, "Primero"),
    n: "1",
    h: "Ordenar",
    body: "Reglas escritas, dueños con nombre y un solo registro.",
    tag: "10 cambios de proceso",
    bg: C.ink,
    fg: C.white,
    sub: "rgba(255,255,255,0.82)",
    tagBg: "rgba(255,255,255,0.14)",
    top: 400,
  },
  {
    at: cue(ID, "Después"),
    n: "2",
    h: "Automatizar",
    body: "Lo repetitivo: calcular fechas, cruzar datos, avisar y escalar.",
    tag: "8 automatizaciones en la plataforma",
    bg: C.yellow,
    fg: C.ink,
    sub: "rgba(20,22,26,0.82)",
    tagBg: "rgba(20,22,26,0.1)",
    top: 350,
  },
  {
    at: cue(ID, "Y solo al final"),
    n: "3",
    h: "Usar IA",
    body: "Solo donde hay que leer documentos. La IA propone y una persona valida.",
    tag: "5 agentes, de complejidad distinta",
    bg: C.purple,
    fg: C.white,
    sub: "rgba(255,255,255,0.86)",
    tagBg: "rgba(255,255,255,0.16)",
    top: 300,
  },
];

export const S04: React.FC = () => (
  <Shell id={ID} chapter={2} title="Primero ordenar, después automatizar y, solo al final, usar IA">
    {STEPS.map((s, i) => (
      <Rise key={s.h} at={s.at - 0.15} y={60} dur={0.7} style={{ position: "absolute", left: MX + i * 580, top: s.top }}>
        <div style={{ width: 540, height: 340, background: s.bg, color: s.fg, borderRadius: R.panel, padding: "30px 36px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 84, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 50, letterSpacing: -1 }}>{s.h}</div>
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.25, marginTop: 16, color: s.sub, height: 116 }}>{s.body}</div>
          <div style={{ display: "inline-block", fontSize: 24, fontWeight: 500, background: s.tagBg, padding: "8px 16px", borderRadius: R.ctl, marginTop: 10, whiteSpace: "nowrap" }}>
            {s.tag}
          </div>
        </div>
      </Rise>
    ))}
    <Rise at={cue(ID, "Porque") - 0.1} y={20} style={{ position: "absolute", left: MX, top: 772, width: 1700 }}>
      <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 44, letterSpacing: -0.8, lineHeight: 1.1 }}>
        Automatizar un proceso roto solo hace más rápido el error.
      </div>
    </Rise>
  </Shell>
);
