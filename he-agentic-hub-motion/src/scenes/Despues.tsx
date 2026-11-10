import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { SceneTitle, kindStyle, type Kind } from "../components/ui";
import { Arrow, Person } from "../components/Icons";
import { CUE, SCENES } from "../timeline";

/**
 * Placa 5 · Después del MVP (diapositiva 5 de la presentación final, sin fechas):
 * Completar → Validar → Sistema oficial → Escalar. Fotogramas locales.
 */

const L = (abs: number) => abs - SCENES.despues.from;

type Row = { kind?: Kind; text: string; at: number };
type Col = { tag: string; name: string; look: "card" | "oficial" | "later"; rows: Row[]; at: number };

const COLS: Col[] = [
  {
    tag: "Siguiente",
    name: "Completar",
    look: "card",
    at: L(CUE.chat) - 14,
    rows: [
      { kind: "ia", text: "Consulta por chat, citando la fuente", at: L(CUE.chat) },
      { kind: "regla", text: "Alertas de vencimiento", at: L(CUE.alertas) },
      { kind: "ia", text: "Brief para negociar el contrato nuevo", at: L(CUE.brief) },
      { kind: "persona", text: "Ventas decide la negociación", at: L(CUE.brief) + 18 },
      { kind: "persona", text: "Reglas editables con doble aprobación", at: L(CUE.brief) + 34 },
    ],
  },
  {
    tag: "Siguiente",
    name: "Validar",
    look: "card",
    at: L(CUE.cortes) - 10,
    rows: [
      { text: "Cortes en paralelo con el Excel", at: L(CUE.cortes) },
      { text: "Toda diferencia se explica contrato por contrato", at: L(CUE.cortes) + 16 },
    ],
  },
  {
    tag: "Siguiente",
    name: "Sistema oficial",
    look: "oficial",
    at: L(CUE.oficial) - 10,
    rows: [
      { text: "Con cortes iguales al Excel y el visto bueno de High End", at: L(CUE.oficial) },
      { text: "Se retira el Excel", at: L(CUE.oficial) + 16 },
    ],
  },
  {
    tag: "Por priorizar",
    name: "Escalar",
    look: "later",
    at: L(CUE.oficial) + 40,
    rows: [
      {
        text: "Alcance adicional con High End: reportes mensuales, informe PRP, Trade y lectura de cartas",
        at: L(CUE.oficial) + 48,
      },
    ],
  },
];

const X0 = 460;
const W = 323;
const STEP = 339;
const TOP = 290;
const H = 520;

export const Despues: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <AbsoluteFill>
      <SceneTitle lead="Después del MVP" text="completamos y retiramos el Excel" start={6} size={60} />

      {COLS.map((c, i) => {
        const p = prog(f, c.at, 12);
        const dark = c.look === "later";
        const bg = c.look === "oficial" ? C.yellow : dark ? C.ink : C.card;
        return (
          <React.Fragment key={c.name}>
            {i > 0 ? (
              <div style={{ position: "absolute", left: X0 + i * STEP - 15, top: TOP + H / 2 - 9, opacity: p }}>
                <Arrow size={16} strokeWidth={3} />
              </div>
            ) : null}
            <div
              style={{
                position: "absolute",
                left: X0 + i * STEP,
                top: TOP,
                width: W,
                height: H,
                boxSizing: "border-box",
                borderRadius: 14,
                background: bg,
                padding: "20px 18px",
                opacity: p,
                transform: `translateY(${(1 - p) * 18}px)`,
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
                  color: dark ? C.white : C.ink,
                  border: `2px solid ${dark ? C.white : c.look === "oficial" ? C.ink : C.text3}`,
                }}
              >
                {c.tag}
              </div>
              <div
                style={{
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: 34,
                  color: dark ? C.white : C.ink,
                  marginTop: 14,
                  letterSpacing: -0.5,
                }}
              >
                {c.name}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {c.rows.map((r) => {
                  const q = prog(f, r.at, 10);
                  const boxed = r.kind !== undefined;
                  return (
                    <div
                      key={r.text}
                      style={{
                        ...(boxed ? kindStyle(r.kind as Kind, 2.5) : {}),
                        borderRadius: 10,
                        padding: boxed ? "9px 12px" : "0 2px",
                        fontFamily: F.body,
                        fontWeight: 500,
                        fontSize: boxed ? 19 : 21,
                        lineHeight: 1.3,
                        color: dark ? C.white : C.ink,
                        opacity: q,
                        transform: `translateY(${(1 - q) * 8}px)`,
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      {r.kind === "persona" ? (
                        <div style={{ marginTop: 1, flexShrink: 0 }}>
                          <Person size={19} strokeWidth={2.4} />
                        </div>
                      ) : null}
                      {!boxed ? <span style={{ color: dark ? C.yellow : C.ink, fontWeight: 700 }}>·</span> : null}
                      <span>{r.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
