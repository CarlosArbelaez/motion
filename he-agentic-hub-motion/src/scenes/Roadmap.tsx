import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { SceneTitle } from "../components/ui";
import { Arrow, Diamond } from "../components/Icons";

/**
 * Placa 2 · Hoja de ruta. Hoy (punto de partida) → Ola 0 → Ola 1 (MVP, primer desarrollo)
 * → Ola 2 y Ola 3 (fases siguientes planeadas). Cada ola se abre solo si la anterior
 * pasa su compuerta (presentación To-Be v4.0, "Cuatro olas"). Sin fechas: se fijan con el
 * equipo técnico (V-21). Fotogramas locales.
 */

type Wave = {
  n: string;
  name: string;
  desc: string;
  tag: string;
  tagStyle: "outline" | "strong" | "muted";
  gate: string;
  look: "card" | "mvp" | "later";
};

const WAVES: Wave[] = [
  {
    n: "Ola 0",
    name: "Validar",
    desc: "Reglas y datos listos antes de construir",
    tag: "Antes de construir",
    tagStyle: "outline",
    gate: "Reglas aprobadas y datos saneados",
    look: "card",
  },
  {
    n: "Ola 1",
    name: "MVP",
    desc: "Ficha única, cálculo con reglas y consulta con IA",
    tag: "Primer desarrollo",
    tagStyle: "strong",
    gate: "Coincide con el Excel y negocio da el VoBo",
    look: "mvp",
  },
  {
    n: "Ola 2",
    name: "Pago y agentes",
    desc: "Aprobación, pago y conciliación; agentes que proponen",
    tag: "Fase siguiente planeada",
    tagStyle: "muted",
    gate: "Pagos en el flujo y agentes en su meta",
    look: "card",
  },
  {
    n: "Ola 3",
    name: "Evolución",
    desc: "Brief para negociar el contrato nuevo",
    tag: "Fase siguiente planeada",
    tagStyle: "muted",
    gate: "Alcance adicional por priorizar",
    look: "later",
  },
];

const X = [414, 766, 1118, 1470];
const W = 300;
const TOP = 300;
const H = 440;

export const Roadmap: React.FC = () => {
  const f = useCurrentFrame();
  const hoy = prog(f, 18, 12);
  const note = prog(f, 168, 14);

  return (
    <AbsoluteFill>
      <SceneTitle text="Hoja de ruta: avanzar por olas" highlight="por olas" start={4} />

      {/* Etiqueta del contrato (capa continua) como punto de partida */}
      <div style={{ position: "absolute", left: 120, top: 662, width: 240, opacity: hoy }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 34, color: C.ink }}>Hoy</div>
        <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.text2, marginTop: 2 }}>
          Dolores actuales
        </div>
      </div>

      {WAVES.map((w, i) => {
        const p = prog(f, 34 + i * 26, 14);
        const g = prog(f, 136 + i * 8, 12);
        const isMvp = w.look === "mvp";
        return (
          <React.Fragment key={w.n}>
            <div
              style={{
                position: "absolute",
                left: X[i] - 42,
                top: TOP + H / 2 - 15,
                opacity: p,
              }}
            >
              <Arrow size={30} />
            </div>
            <div
              style={{
                position: "absolute",
                left: X[i],
                top: TOP,
                width: W,
                height: H,
                boxSizing: "border-box",
                borderRadius: 14,
                background: isMvp ? C.yellowSoft : C.card,
                borderTop:
                  w.look === "later" ? `6px dashed ${C.ink}` : `6px solid ${isMvp ? C.yellow : C.ink}`,
                padding: "22px 22px",
                opacity: p,
                transform: `translateY(${(1 - p) * 22}px)`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: F.body,
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 999,
                  padding: "5px 14px",
                  background: w.tagStyle === "strong" ? C.ink : "transparent",
                  color: w.tagStyle === "strong" ? C.yellow : w.tagStyle === "muted" ? C.text2 : C.ink,
                  border:
                    w.tagStyle === "strong"
                      ? `2px solid ${C.ink}`
                      : `2px solid ${w.tagStyle === "muted" ? C.text3 : C.ink}`,
                }}
              >
                {w.tag}
              </div>
              <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 24, color: C.text2, marginTop: 22 }}>
                {w.n}
              </div>
              <div
                style={{
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: 38,
                  color: C.ink,
                  letterSpacing: -0.6,
                  lineHeight: 1.05,
                  marginTop: 4,
                }}
              >
                {w.name}
              </div>
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.ink, marginTop: 12, lineHeight: 1.3 }}>
                {w.desc}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  bottom: 22,
                  borderTop: `1.5px solid ${C.hairline}`,
                  paddingTop: 14,
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  opacity: g,
                }}
              >
                {w.look === "later" ? null : (
                  <div style={{ marginTop: 2 }}>
                    <Diamond size={20} />
                  </div>
                )}
                <div style={{ fontFamily: F.body, fontSize: 20, color: C.text2, lineHeight: 1.3 }}>
                  {w.look === "later" ? null : <span style={{ fontWeight: 700, color: C.ink }}>Para avanzar: </span>}
                  {w.gate}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 414,
          top: 768,
          fontFamily: F.body,
          fontWeight: 500,
          fontSize: 23,
          color: C.text2,
          opacity: note,
        }}
      >
        Cada ola arranca cuando la anterior ya demostró que funciona. Las fechas se fijan con el equipo técnico.
      </div>
    </AbsoluteFill>
  );
};
