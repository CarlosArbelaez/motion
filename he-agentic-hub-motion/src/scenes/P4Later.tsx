import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { easeInOut, prog } from "../anim";
import { CheckDot, KindPill, SceneTitle, kindStyle } from "../components/ui";
import { Arrow, Diamond, Person } from "../components/Icons";

/**
 * Placa 4 · 00:17–00:21 · LATER: negociar con evidencia.
 * El historial del mismo contrato se convierte en un brief que revisa una persona.
 * Fotogramas locales (0 = 00:17).
 */

const ROWS = ["Cumplimiento", "Pagos", "Soportes"];
// Patrón abstracto de periodos (sin cifras): lleno = registrado, oscuro = en curso.
const PATTERN = [
  [2, 2, 2, 1, 2, 0],
  [2, 2, 1, 2, 2, 0],
  [2, 2, 2, 2, 1, 0],
];

const STAGES = [
  { x: 260, label: "Ola 0: validar" },
  { x: 720, label: "Ola 1: MVP" },
  { x: 1180, label: "Ola 2: pago y agentes" },
  { x: 1640, label: "Ola 3: evolución" },
];
const GATES = [
  { x: 490, label: "Reglas y datos listos" },
  { x: 950, label: "Coincide con Excel + VoBo" },
  { x: 1410, label: "Pagos en el flujo + agentes en su meta" },
];

export const P4Later: React.FC = () => {
  const f = useCurrentFrame();
  const hist = prog(f, 12, 14);
  const fold = prog(f, 62, 22, easeInOut); // el historial se pliega en el brief
  const brief = prog(f, 76, 14);
  const person = prog(f, 106, 12);
  const tl = prog(f, 16, 18);
  const later = prog(f, 48, 14);

  return (
    <AbsoluteFill>
      <SceneTitle lead="Ola 3" text="Evolución: negociar con evidencia" start={6} />

      {/* Historial del contrato */}
      <div
        style={{
          position: "absolute",
          left: 500,
          top: 300,
          width: 420,
          opacity: hist,
        }}
      >
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 22, color: C.text2, marginBottom: 18 }}>
          Historial del contrato
        </div>
        {ROWS.map((r, i) => (
          <div key={r} style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 170, fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.ink }}>{r}</div>
            <div style={{ display: "flex", gap: 9 }}>
              {PATTERN[i].map((v, j) => {
                const p = prog(f, 14 + i * 4 + j * 3, 8);
                return (
                  <div
                    key={j}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 6,
                      boxSizing: "border-box",
                      background: v === 2 ? C.ink : v === 1 ? C.olive : "transparent",
                      border: v === 0 ? `2px dashed ${C.ink}` : "none",
                      opacity: p,
                      transform: `scale(${0.6 + 0.4 * p})`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Copia que viaja y se pliega dentro del brief */}
      <div
        style={{
          position: "absolute",
          left: 500,
          top: 300,
          width: 420,
          opacity: fold > 0 && fold < 1 ? Math.sin(fold * Math.PI) * 0.8 : 0,
          transform: `translateX(${fold * 560}px) scale(${1 - fold * 0.55})`,
          transformOrigin: "right center",
        }}
      >
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 22, color: C.text2, marginBottom: 18 }}>
          Historial del contrato
        </div>
        {ROWS.map((r, i) => (
          <div key={r} style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 170, fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.ink }}>{r}</div>
            <div style={{ display: "flex", gap: 9 }}>
              {PATTERN[i].map((v, j) => {
                const p = prog(f, 14 + i * 4 + j * 3, 8);
                return (
                  <div
                    key={j}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 6,
                      boxSizing: "border-box",
                      background: v === 2 ? C.ink : v === 1 ? C.olive : "transparent",
                      border: v === 0 ? `2px dashed ${C.ink}` : "none",
                      opacity: p,
                      transform: `scale(${0.6 + 0.4 * p})`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 456, top: 450, opacity: hist }}>
        <Arrow size={30} />
      </div>
      <div style={{ position: "absolute", left: 950, top: 450, opacity: brief }}>
        <Arrow size={30} />
      </div>

      {/* Brief preparado con IA (propuesta) */}
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 290,
          width: 470,
          height: 384,
          boxSizing: "border-box",
          borderRadius: 14,
          padding: "24px 28px",
          ...kindStyle("ia"),
          opacity: brief,
          transform: `scale(${0.9 + 0.1 * brief})`,
          transformOrigin: "left center",
        }}
      >
        <KindPill kind="ia" size={18}>
          Preparado con IA
        </KindPill>
        <div
          style={{
            fontFamily: F.display,
            fontWeight: 700,
            fontSize: 36,
            color: C.ink,
            marginTop: 14,
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}
        >
          Brief para negociar
          <br />
          el contrato nuevo
        </div>
        {["Cumplimiento histórico", "Pagos y soportes", "Desempeño frente a inversión"].map((t, i) => {
          const p = prog(f, 86 + i * 7, 10);
          return (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: `1.5px solid ${C.hairline}`,
                padding: "13px 0",
                marginTop: i === 0 ? 18 : 0,
                opacity: p,
              }}
            >
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.ink }}>{t}</div>
              <div
                style={{
                  fontFamily: F.body,
                  fontWeight: 700,
                  fontSize: 16,
                  color: C.ink,
                  background: C.card,
                  borderRadius: 6,
                  padding: "4px 8px",
                }}
              >
                Evidencia
              </div>
            </div>
          );
        })}
      </div>

      {/* Persona que revisa y decide */}
      <div
        style={{
          position: "absolute",
          left: 1510,
          top: 290,
          width: 290,
          height: 300,
          boxSizing: "border-box",
          borderRadius: 14,
          padding: "26px 26px",
          ...kindStyle("persona"),
          opacity: person,
          transform: `translateY(${(1 - person) * 16}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Person size={52} strokeWidth={2} />
          <CheckDot progress={prog(f, 118, 10)} size={36} />
        </div>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 32, color: C.ink, marginTop: 22, lineHeight: 1.1 }}>
          Ventas revisa
          <br />y decide
        </div>
        <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 20, color: C.text2, marginTop: 14, lineHeight: 1.3 }}>
          La negociación sigue siendo humana
        </div>
      </div>
      <div style={{ position: "absolute", left: 1475, top: 425, opacity: person }}>
        <Arrow size={30} />
      </div>

      {/* Línea temporal compacta (sin fechas: se fijan con el equipo técnico) */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <line
          x1={140}
          x2={interpolate(tl, [0, 1], [140, 1780])}
          y1={806}
          y2={806}
          stroke={C.ink}
          strokeWidth={3}
        />
      </svg>
      {STAGES.map((s, i) => {
        const active = i === 3;
        const p = prog(f, 20 + i * 8, 10);
        return (
          <React.Fragment key={s.label}>
            <div
              style={{
                position: "absolute",
                left: s.x - 13,
                top: 806 - 13,
                width: 26,
                height: 26,
                borderRadius: 13,
                boxSizing: "border-box",
                background: active ? C.yellow : C.ink,
                border: `3px solid ${C.ink}`,
                transform: `scale(${p * (active ? 1 + 0.35 * later : 1)})`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: s.x - 200,
                width: 400,
                top: 832,
                textAlign: "center",
                fontFamily: F.display,
                fontWeight: active ? 700 : 600,
                fontSize: 30,
                color: active ? C.ink : C.text2,
                opacity: p,
              }}
            >
              <span
                style={{
                  background: active ? `rgba(245, 224, 3, ${later})` : "transparent",
                  padding: "2px 10px",
                  borderRadius: 6,
                }}
              >
                {s.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
      {GATES.map((g, i) => {
        const p = prog(f, 30 + i * 8, 10);
        return (
          <React.Fragment key={g.label}>
            <div style={{ position: "absolute", left: g.x - 13, top: 806 - 13, opacity: p }}>
              <Diamond size={26} />
            </div>
            <div
              style={{
                position: "absolute",
                left: g.x - 210,
                width: 420,
                top: 758,
                textAlign: "center",
                fontFamily: F.body,
                fontWeight: 500,
                fontSize: 21,
                color: C.text2,
                opacity: p,
              }}
            >
              {g.label}
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
