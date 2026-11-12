import React from "react";
import { C, FONT } from "../theme";
import { lin, prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { Check, ContractIcon, MX, Pill, Shell } from "../components/ui";

const ID = "s06";
const CW = 224;
const CG = 22;
const cx = (i: number) => MX + i * (CW + CG);
const PHASES = [
  { n: "1", h: "Solicitud", d: "Captura única; decide la regla escrita.", state: "Solicitud" },
  { n: "2", h: "Negociación", d: "Legal negocia como hoy, con rastro.", state: "En negociación" },
  { n: "3", h: "Aprobación y firma", d: "Aprueba quien indica la política.", state: "Firmado" },
  { n: "4", h: "Ficha y Ariba", d: "Datos clave validados por una persona.", state: "Vigente" },
  { n: "5", h: "Control diario", d: "Conciliación con Ariba y el Budget.", state: "Vigente" },
  { n: "6", h: "Alertas", d: "Tarjeta que exige respuesta, con escalamiento.", state: "Vigente · en alerta" },
  { n: "7", h: "Decisión", d: "El owner decide, su líder aprueba y Procurement confirma.", state: "En renovación" },
];
const BLOCKS = [
  { name: "Bloque 1 · Formalizar", from: 0, to: 2, start: cue(ID, "formaliza"), end: cue(ID, "Luego") },
  { name: "Bloque 2 · Registrar", from: 3, to: 4, start: cue(ID, "registra"), end: cue(ID, "Y después") },
  { name: "Bloque 3 · Vigilar y renovar", from: 5, to: 6, start: cue(ID, "vigila"), end: cue(ID, "Si el servicio") },
];
// Momento en que el contrato llega a cada fase (repartido dentro de la locución de su bloque).
export const ARRIVE: number[] = [];
BLOCKS.forEach((b) => {
  const n = b.to - b.from + 1;
  for (let k = 0; k < n; k++) ARRIVE.push(b.start + (k * (b.end - b.start - 0.6)) / n);
});
const CALLOUTS = [
  { b: 0, t: "Una sola captura", at: cue(ID, "una sola vez") },
  { b: 0, t: "La regla escrita decide", at: cue(ID, "la regla escrita") },
  { b: 0, t: "Ariba desde el día uno", at: cue(ID, "su espacio") },
  { b: 1, t: "El dato nace al firmar", at: cue(ID, "nacen") },
  { b: 1, t: "Lo valida una persona", at: cue(ID, "los valida") },
  { b: 2, t: "Alerta que exige respuesta", at: cue(ID, "una alerta") },
  { b: 2, t: "Decisión registrada", at: cue(ID, "una decisión registrada") },
];
const TOP = 396;
const CH = 266;
const TRACK = TOP + CH + 52;

export const S06: React.FC = () => {
  const t = useSec();
  const loopAt = cue(ID, "vuelve");
  let idx = -1;
  ARRIVE.forEach((a, i) => {
    if (t >= a) idx = i;
  });
  // Posición del contrato sobre el riel
  let x = cx(0) + CW / 2;
  for (let i = 1; i < 7; i++) x += (CW + CG) * prog(t, ARRIVE[i] - 0.35, 0.6);
  const back = prog(t, loopAt, 1.0);
  x = x + (cx(0) + CW / 2 - x) * back;
  const loop = lin(t, loopAt, 1.0);
  return (
    <Shell
      id={ID}
      chapter={2}
      title="El nuevo ciclo: 3 bloques, 7 fases y un cierre"
      foot="El To-Be tiene 37 tarjetas y 7 compuertas, cada una con salidas SÍ, NO y excepción"
    >
      {/* Retorno al inicio */}
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path
          d={`M${cx(6) + CW / 2} ${TOP - 76} V 288 H ${cx(0) + CW / 2} V ${TOP - 80}`}
          fill="none"
          stroke={C.ink}
          strokeWidth={4}
          pathLength={1}
          strokeDasharray={`${loop} 1`}
          strokeLinejoin="round"
        />
        <path
          d={`M${cx(0) + CW / 2 - 12} ${TOP - 94} L${cx(0) + CW / 2} ${TOP - 78} L${cx(0) + CW / 2 + 12} ${TOP - 94}`}
          fill="none"
          stroke={C.ink}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={prog(t, loopAt + 0.9, 0.2)}
        />
      </svg>
      <Rise at={loopAt + 0.1} y={8} style={{ position: "absolute", left: 560, top: 268, width: 800, textAlign: "center" }}>
        <span style={{ background: C.bg, padding: "0 18px", fontSize: 27, fontWeight: 700 }}>Si el servicio continúa, vuelve a la Fase 1</span>
      </Rise>

      {BLOCKS.map((b, i) => {
        const on = t >= b.start - 0.2 && t < b.end;
        return (
          <Rise key={b.name} at={0.5 + i * 0.12} y={14} style={{ position: "absolute", left: cx(b.from), top: TOP - 72 }}>
            <div
              style={{
                width: cx(b.to) + CW - cx(b.from),
                height: 56,
                borderRadius: 12,
                background: on ? C.yellow : C.ink,
                color: on ? C.ink : C.white,
                fontFamily: FONT.head,
                fontWeight: 600,
                fontSize: 28,
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                boxSizing: "border-box",
              }}
            >
              {b.name}
            </div>
          </Rise>
        );
      })}
      {PHASES.map((p, i) => {
        const active = idx === i && back < 0.5;
        const done = idx > i || back >= 0.5;
        return (
          <Rise key={p.n} at={0.7 + i * 0.08} y={24} style={{ position: "absolute", left: cx(i), top: TOP }}>
            <div
              style={{
                width: CW,
                height: CH,
                borderRadius: 18,
                boxSizing: "border-box",
                padding: "16px 18px",
                background: active ? C.yellow : C.white,
                border: `3px solid ${active ? C.ink : C.line}`,
                position: "relative",
              }}
            >
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 46, lineHeight: 1 }}>{p.n}</div>
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 28, lineHeight: 1.08, marginTop: 8, height: 62 }}>{p.h}</div>
              <div style={{ fontSize: 23, lineHeight: 1.22, color: active ? C.ink : C.text, marginTop: 6 }}>{p.d}</div>
              {done ? (
                <div style={{ position: "absolute", right: 14, top: 14 }}>
                  <Check size={34} />
                </div>
              ) : null}
            </div>
          </Rise>
        );
      })}

      {/* Riel y contrato */}
      <div style={{ position: "absolute", left: cx(0) + CW / 2, top: TRACK, width: cx(6) - cx(0), height: 4, background: C.line, opacity: prog(t, 1.2, 0.5) }} />
      {PHASES.map((p, i) => (
        <div
          key={p.n}
          style={{
            position: "absolute",
            left: cx(i) + CW / 2 - 9,
            top: TRACK - 7,
            width: 18,
            height: 18,
            borderRadius: 9,
            background: idx >= i ? C.ink : C.line,
            opacity: prog(t, 1.2, 0.5),
          }}
        />
      ))}
      <div style={{ position: "absolute", left: x - 26, top: TRACK - 36, opacity: prog(t, ARRIVE[0] - 0.4, 0.4) }}>
        <ContractIcon size={52} />
      </div>
      <div
        style={{
          position: "absolute",
          // En las últimas fases la etiqueta pasa a la izquierda del contrato para no salirse del cuadro.
          ...(idx >= 5 ? { right: 1920 - x + 36 } : { left: x + 34 }),
          top: TRACK - 24,
          opacity: prog(t, ARRIVE[0] - 0.2, 0.4) * (1 - back),
        }}
      >
        <Pill size={22} bg={C.ink} color={C.yellow}>
          {idx >= 0 ? PHASES[idx].state : ""}
        </Pill>
      </div>

      {BLOCKS.map((b, bi) => (
        <div key={b.name} style={{ position: "absolute", left: cx(b.from), top: TRACK + 42, width: cx(b.to) + CW - cx(b.from), display: "flex", flexWrap: "wrap", gap: 10 }}>
          {CALLOUTS.filter((c) => c.b === bi).map((c) => (
            <Rise key={c.t} at={c.at} y={12} scaleFrom={0.9}>
              <Pill size={23} bg={C.white} color={C.ink} border={C.ink}>
                {c.t}
              </Pill>
            </Rise>
          ))}
        </div>
      ))}
    </Shell>
  );
};
