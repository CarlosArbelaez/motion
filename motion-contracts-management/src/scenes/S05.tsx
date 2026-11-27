import React from "react";
import { C, FONT, R } from "../theme";
import { lin, prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { Check, ContractIcon, MX, Pill, Shell } from "../components/ui";
import { blend, EASE } from "../motion";
import { interpolate } from "remotion";

const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
/** Cambio suave 0→1 alrededor de `at` (para estados que antes cambiaban de golpe). */
const soft = (t: number, at: number, dur = 0.35) => interpolate(t, [at, at + dur], [0, 1], { ...CL, easing: EASE.inOut });
const cardBg = blend([0, 1], [C.white, C.yellow]);
const cardLine = blend([0, 1], [C.line, C.ink]);
const headBg = blend([0, 1], [C.panel, C.ink]);
const headFg = blend([0, 1], [C.text, C.white]);

const ID = "s05";
const CW = 224;
const CG = 22;
const cx = (i: number) => MX + i * (CW + CG);
const PHASES = [
  { n: "1", h: "Solicitud", d: "Captura única; el líder aprueba y la regla decide.", state: "Solicitud" },
  { n: "2", h: "Negociación", d: "Legal negocia como hoy, con rastro.", state: "En negociación" },
  { n: "3", h: "Aprobación y firma", d: "Se aprueba en Ariba, según la DAG.", state: "Firmado" },
  { n: "4", h: "Ficha y Ariba", d: "Datos clave validados por una persona.", state: "Vigente" },
  { n: "5", h: "Control diario", d: "Cruce diario con Ariba y el PxQ.", state: "Vigente" },
  { n: "6", h: "Alertas", d: "Una alerta con respuesta y escalamiento.", state: "Vigente · en alerta" },
  { n: "7", h: "Decisión", d: "El dueño decide, su líder aprueba y Procurement confirma.", state: "En renovación" },
];
const BLOCKS = [
  { name: "Bloque 1 · Formalizar", from: 0, to: 2, start: cue(ID, "formaliza"), end: cue(ID, "Luego") },
  { name: "Bloque 2 · Registrar", from: 3, to: 4, start: cue(ID, "se registra"), end: cue(ID, "Y después") },
  { name: "Bloque 3 · Vigilar y renovar", from: 5, to: 6, start: cue(ID, "vigila"), end: cue(ID, "Si el servicio") },
];
// Momento en que el contrato llega a cada fase (repartido dentro de la locución de su bloque).
export const ARRIVE: number[] = [];
BLOCKS.forEach((b) => {
  const n = b.to - b.from + 1;
  for (let k = 0; k < n; k++) ARRIVE.push(b.start + (k * (b.end - b.start - 0.5)) / n);
});
const CALLOUTS = [
  { b: 0, t: "Una sola captura", at: cue(ID, "una sola vez") },
  { b: 0, t: "Su líder la aprueba", at: cue(ID, "su líder la aprueba") },
  { b: 0, t: "La regla escrita decide", at: cue(ID, "la regla escrita") },
  { b: 1, t: "El dato nace al firmar", at: cue(ID, "nacen") },
  { b: 1, t: "Lo valida una persona", at: cue(ID, "los valida") },
  { b: 2, t: "Alerta que exige respuesta", at: cue(ID, "una alerta") },
  { b: 2, t: "Decisión registrada", at: cue(ID, "una decisión registrada") },
];
const TOP = 396;
const CH = 266;
const TRACK = TOP + CH + 52;

export const S05: React.FC = () => {
  const t = useSec();
  const loopAt = cue(ID, "Si el servicio") + 0.2;
  let idx = -1;
  ARRIVE.forEach((a, i) => {
    if (t >= a) idx = i;
  });
  // Posición del contrato sobre el riel
  const X0 = cx(0) + CW / 2;
  let x = X0;
  for (let i = 1; i < 7; i++) x += (CW + CG) * interpolate(t, [ARRIVE[i] - 0.55, ARRIVE[i] + 0.15], [0, 1], { ...CL, easing: EASE.inOut });
  const trail = x; // el riel se pinta hasta donde va el contrato
  // Retorno: el contrato sale en la fase 7, la línea de arriba se dibuja y el contrato reaparece en la fase 1.
  const leave = soft(t, loopAt, 0.3);
  const loop = interpolate(t, [loopAt + 0.1, loopAt + 1.3], [0, 1], { ...CL, easing: EASE.inOut });
  const arrive = soft(t, loopAt + 1.25, 0.35);
  if (arrive > 0) x = X0;
  void lin;
  return (
    <Shell
      id={ID}
      chapter={2}
      title="El nuevo ciclo: 7 fases, igual en los tres escenarios"
      foot="Todo se consume desde BrewDat: SAP Ariba, el PxQ y el histórico del proceso · el To-Be tiene 37 tarjetas y 7 compuertas"
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
          opacity={soft(t, loopAt + 1.15, 0.2)}
        />
      </svg>
      <Rise at={loopAt} y={8} style={{ position: "absolute", left: 560, top: 268, width: 800, textAlign: "center" }}>
        <span style={{ background: C.bg, padding: "0 18px", fontSize: 27, fontWeight: 700 }}>Si el servicio continúa, vuelve a la Fase 1</span>
      </Rise>

      {BLOCKS.map((b, i) => {
        const on = soft(t, b.start - 0.3) * (1 - soft(t, b.end - 0.15));
        return (
          <Rise key={b.name} at={0.4 + i * 0.12} y={14} style={{ position: "absolute", left: cx(b.from), top: TOP - 72 }}>
            <div
              style={{
                width: cx(b.to) + CW - cx(b.from),
                height: 56,
                borderRadius: R.ctl,
                background: headBg(on),
                color: headFg(on),
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
        const next = i < 6 ? ARRIVE[i + 1] : loopAt + 0.3;
        const a = soft(t, ARRIVE[i] - 0.15) * (1 - soft(t, next - 0.15));
        const done = soft(t, next - 0.05, 0.3);
        return (
          <Rise key={p.n} at={0.6 + i * 0.08} y={24} style={{ position: "absolute", left: cx(i), top: TOP }}>
            <div
              style={{
                width: CW,
                height: CH,
                borderRadius: R.card,
                boxSizing: "border-box",
                padding: "16px 18px",
                background: cardBg(a),
                border: `2px solid ${cardLine(a)}`,
                position: "relative",
              }}
            >
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 46, lineHeight: 1 }}>{p.n}</div>
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 28, lineHeight: 1.08, marginTop: 8, height: 62 }}>{p.h}</div>
              <div style={{ fontSize: 23, lineHeight: 1.22, color: C.text, marginTop: 6 }}>{p.d}</div>
              <div style={{ position: "absolute", right: 14, top: 14, opacity: done, scale: String(0.6 + 0.4 * done) }}>
                <Check size={34} />
              </div>
            </div>
          </Rise>
        );
      })}

      {/* Riel y contrato */}
      <div style={{ position: "absolute", left: cx(0) + CW / 2, top: TRACK, width: cx(6) - cx(0), height: 4, background: C.line, opacity: prog(t, 1.0, 0.5) }} />
      <div style={{ position: "absolute", left: X0, top: TRACK, width: Math.max(0, trail - X0), height: 4, background: C.ink, opacity: prog(t, ARRIVE[0] - 0.2, 0.4) }} />
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
            background: trail >= cx(i) + CW / 2 - 4 && t >= ARRIVE[0] - 0.2 ? C.ink : C.line,
            opacity: prog(t, 1.0, 0.5),
          }}
        />
      ))}
      <div style={{ position: "absolute", left: x - 26, top: TRACK - 36, opacity: prog(t, ARRIVE[0] - 0.4, 0.4) * (1 - leave + arrive), translate: `0px ${-10 * leave * (1 - arrive)}px` }}>
        <ContractIcon size={52} />
      </div>
      {[0, 1].map((leftSide) => {
        // La etiqueta va a la derecha del contrato; desde la fase 6 pasa a la izquierda con fundido cruzado.
        const sw = soft(t, ARRIVE[5] - 0.55, 0.3);
        return (
          <div
            key={leftSide}
            style={{
              position: "absolute",
              ...(leftSide ? { right: 1920 - x + 36 } : { left: x + 34 }),
              top: TRACK - 24,
              opacity: prog(t, ARRIVE[0] - 0.2, 0.4) * (1 - leave) * (leftSide ? sw : 1 - sw),
            }}
          >
            <Pill size={22} bg={C.ink} color={C.white}>
              {idx >= 0 ? PHASES[idx].state : ""}
            </Pill>
          </div>
        );
      })}

      {BLOCKS.map((b, bi) => (
        <div key={b.name} style={{ position: "absolute", left: cx(b.from), top: TRACK + 42, width: cx(b.to) + CW - cx(b.from), display: "flex", flexWrap: "wrap", gap: 10 }}>
          {CALLOUTS.filter((c) => c.b === bi).map((c) => (
            <Rise key={c.t} at={c.at} y={12}>
              <Pill size={23} bg={C.white} color={C.ink} border={C.line}>
                {c.t}
              </Pill>
            </Rise>
          ))}
        </div>
      ))}
    </Shell>
  );
};
