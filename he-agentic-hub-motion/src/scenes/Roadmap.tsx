import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { SceneTitle } from "../components/ui";
import { Arrow } from "../components/Icons";

/**
 * Placa 2 · Hoja de ruta, con las etapas de la presentación final (diapositivas 3–5 y 7):
 * Hoy → Ola 0 · Preparar → MVP → Completar → Validar → Sistema oficial → Escalar.
 * Sin fechas (las da el deck). Fotogramas locales.
 */

type Stage = { n?: string; name: string; desc: string; tag: string; look: "card" | "mvp" | "oficial" | "later" };

const STAGES: Stage[] = [
  { n: "Ola 0", name: "Preparar", desc: "Reglas, códigos, indicadores del canal y accesos", tag: "Antes de construir", look: "card" },
  { name: "MVP", desc: "El ciclo mensual completo y el tablero diario del canal", tag: "Primer desarrollo", look: "mvp" },
  { name: "Completar", desc: "Chat, alertas, brief y reglas editables", tag: "Siguiente", look: "card" },
  { name: "Validar", desc: "Cortes en paralelo con el Excel", tag: "Siguiente", look: "card" },
  { name: "Sistema oficial", desc: "Con el visto bueno de High End se retira el Excel", tag: "Siguiente", look: "oficial" },
  { name: "Escalar", desc: "Más fuentes del canal conectadas y alcance adicional", tag: "Después", look: "later" },
];

const X0 = 410;
const W = 214;
const STEP = 232; // ancho + separación
const TOP = 300;
const H = 360;

export const Roadmap: React.FC = () => {
  const f = useCurrentFrame();
  const hoy = prog(f, 18, 12);

  return (
    <AbsoluteFill>
      <SceneTitle text="Hoja de ruta: paso a paso" highlight="paso a paso" start={4} />

      {/* Etiqueta del contrato (capa continua) como punto de partida */}
      <div style={{ position: "absolute", left: 120, top: 662, width: 240, opacity: hoy }}>
        <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 34, color: C.ink }}>Hoy</div>
        <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.text2, marginTop: 2 }}>
          Dolores actuales
        </div>
      </div>

      {STAGES.map((s, i) => {
        const x = X0 + i * STEP;
        const p = prog(f, 20 + i * 16, 14);
        const dark = s.look === "later";
        const bg = s.look === "mvp" ? C.yellowSoft : s.look === "oficial" ? C.yellow : dark ? C.ink : C.card;
        const top = s.look === "mvp" ? C.yellow : s.look === "oficial" ? C.ink : dark ? C.ink : C.ink;
        const strongTag = s.look === "mvp";
        return (
          <React.Fragment key={s.name}>
            <div style={{ position: "absolute", left: x - (i === 0 ? 44 : 20), top: TOP + H / 2 - 12, opacity: p }}>
              <Arrow size={i === 0 ? 30 : 18} strokeWidth={3} />
            </div>
            <div
              style={{
                position: "absolute",
                left: x,
                top: TOP,
                width: W,
                height: H,
                boxSizing: "border-box",
                borderRadius: 14,
                background: bg,
                borderTop: `6px solid ${top}`,
                padding: "18px 18px",
                opacity: p,
                transform: `translateY(${(1 - p) * 20}px)`,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: F.body,
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 999,
                  padding: "4px 11px",
                  background: strongTag ? C.ink : "transparent",
                  color: strongTag ? C.yellow : dark ? C.white : C.ink,
                  border: `2px solid ${strongTag ? C.ink : dark ? C.white : s.look === "oficial" ? C.ink : C.text3}`,
                }}
              >
                {s.tag}
              </div>
              <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 21, color: dark ? "#C4C8CF" : C.text2, marginTop: 20, height: 26 }}>
                {s.n ?? ""}
              </div>
              <div
                style={{
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: 32,
                  color: dark ? C.white : C.ink,
                  letterSpacing: -0.5,
                  lineHeight: 1.05,
                  marginTop: 2,
                }}
              >
                {s.name}
              </div>
              <div
                style={{
                  fontFamily: F.body,
                  fontWeight: 500,
                  fontSize: 21,
                  color: dark ? C.white : C.ink,
                  marginTop: 12,
                  lineHeight: 1.3,
                }}
              >
                {s.desc}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
