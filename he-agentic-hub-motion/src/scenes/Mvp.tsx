import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { SceneTitle, kindStyle, type Kind } from "../components/ui";
import { Diamond, Person } from "../components/Icons";
import { CUE, SCENES } from "../timeline";

/**
 * Placa 4 · MVP (diapositiva 4 de la presentación final): el ciclo mensual completo,
 * del contrato al pago. Reglas (amarillo), IA (punteado) y personas (contorno sólido).
 * Cada fila se enciende cuando la voz la menciona. Fotogramas locales.
 */

type Row = { kind: Kind; text: string; at: number };
type Step = { title: string; rows: Row[] };

const L = (abs: number) => abs - SCENES.mvp.from;

const STEPS: Step[] = [
  {
    title: "Alta del contrato",
    rows: [
      { kind: "ia", text: "La IA prellena la ficha desde el PDF, citando la cláusula", at: L(CUE.mvpIA) },
      { kind: "persona", text: "La analista la valida", at: L(CUE.mvpAnalista) },
    ],
  },
  {
    title: "Volumen del mes",
    rows: [{ kind: "regla", text: "Ventas oficiales más Dislicores, asignadas a cada contrato", at: L(CUE.mvpReglas) - 8 }],
  },
  {
    title: "Cumplimiento",
    rows: [{ kind: "regla", text: "Se aplica la regla de cada contrato", at: L(CUE.mvpReglas) + 8 }],
  },
  {
    title: "Soportes y aprobación",
    rows: [
      { kind: "persona", text: "Trade marketing da el OK a los soportes", at: L(CUE.mvpTrade) },
      { kind: "persona", text: "Cada aprobador aprueba por correo, en lote", at: L(CUE.mvpAprobador) },
    ],
  },
  {
    title: "Pago",
    rows: [
      { kind: "persona", text: "Finanzas paga", at: L(CUE.mvpFinanzas) },
      { kind: "regla", text: "Cada pago queda conciliado", at: L(CUE.mvpFinanzas) + 14 },
    ],
  },
];

const X0 = 460;
const W = 256;
const STEP = 270;
const TOP = 290;
const H = 410;

const NOTES = [
  { text: "búsqueda y ficha del contrato con su PDF.", strong: "Pantalla web v1:", at: L(CUE.mvpCiclo) + 20 },
  {
    text: "si no, la analista llena la ficha a mano.",
    strong: "La IA entra solo si demuestra su precisión;",
    at: L(CUE.mvpAnalista) + 24,
  },
  { text: "con el Excel, que sigue siendo el oficial.", strong: "Se valida en paralelo", at: L(CUE.mvpFinanzas) + 22 },
];

export const Mvp: React.FC = () => {
  const f = useCurrentFrame();
  const shells = L(CUE.mvpCiclo) - 30;

  return (
    <AbsoluteFill>
      <SceneTitle lead="MVP" text="el ciclo mensual completo corre en el sistema" start={6} size={60} />

      {/* Conector desde el contrato */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path d="M 420 495 L 456 495" stroke={C.ink} strokeWidth={2.5} strokeDasharray="6 6" opacity={prog(f, shells, 10)} />
      </svg>

      {STEPS.map((s, i) => {
        const p = prog(f, shells + i * 9, 12);
        const active = prog(f, s.rows[0].at, 8);
        return (
          <div
            key={s.title}
            style={{
              position: "absolute",
              left: X0 + i * STEP,
              top: TOP,
              width: W,
              height: H,
              boxSizing: "border-box",
              borderRadius: 14,
              background: C.card,
              border: `2.5px solid ${active > 0.5 ? C.ink : C.card}`,
              padding: "18px 16px",
              opacity: p,
              transform: `translateY(${(1 - p) * 18}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  background: C.yellow,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: F.display,
                  fontWeight: 700,
                  fontSize: 19,
                  color: C.ink,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 23, color: C.ink, lineHeight: 1.15 }}>{s.title}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
              {s.rows.map((r) => {
                const q = prog(f, r.at, 10);
                return (
                  <div
                    key={r.text}
                    style={{
                      ...kindStyle(r.kind, 2.5),
                      borderRadius: 10,
                      padding: "11px 12px",
                      fontFamily: F.body,
                      fontWeight: 500,
                      fontSize: 20,
                      lineHeight: 1.3,
                      color: C.ink,
                      opacity: q,
                      transform: `translateY(${(1 - q) * 10}px)`,
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    {r.kind === "persona" ? (
                      <div style={{ marginTop: 2, flexShrink: 0 }}>
                        <Person size={20} strokeWidth={2.4} />
                      </div>
                    ) : null}
                    <span>{r.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {NOTES.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: X0,
            top: 726 + i * 44,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: F.body,
            fontSize: 23,
            color: C.text2,
            opacity: prog(f, n.at, 12),
          }}
        >
          <Diamond size={18} />
          {n.strong ? <span style={{ fontWeight: 700, color: C.ink }}>{n.strong}</span> : null}
          <span style={{ fontWeight: 500 }}>{n.text}</span>
        </div>
      ))}
    </AbsoluteFill>
  );
};
