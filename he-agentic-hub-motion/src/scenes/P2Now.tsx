import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog, rise } from "../anim";
import { CheckDot, SceneTitle, kindStyle } from "../components/ui";
import { Arrow, Diamond, Person } from "../components/Icons";

/**
 * Placa 2 · 00:04–00:11 · NOW: el MVP.
 * Fotogramas locales (0 = 00:04). La ficha es la capa continua del contrato (Contract.tsx).
 * Secuencia: 1 ficha única (optimizar) → 2 cálculo con reglas (automatizar) → 3 consulta con IA.
 */

const StepTag: React.FC<{ n: number; text: string }> = ({ n, text }) => (
  <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 18, color: C.text2, letterSpacing: 1.2 }}>
    {n} · {text}
  </div>
);

const PanelHeader: React.FC<{ title: string; n: number; step: string }> = ({ title, n, step }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 34, color: C.ink, letterSpacing: -0.4 }}>{title}</div>
    <StepTag n={n} text={step} />
  </div>
);

const FlowChip: React.FC<{ children: React.ReactNode; strong?: boolean }> = ({ children, strong }) => (
  <div
    style={{
      fontFamily: F.body,
      fontWeight: 700,
      fontSize: 21,
      color: strong ? C.ink : C.ink,
      background: strong ? C.yellow : C.white,
      border: `2px solid ${strong ? C.yellow : C.ink}`,
      borderRadius: 999,
      padding: "6px 16px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

const RUBROS = ["Visibilidad", "Activaciones", "Volumen", "Eventos"];

export const P2Now: React.FC = () => {
  const f = useCurrentFrame();
  const frame = rise(f, 0, 18, 18);

  const rules = prog(f, 86, 14);
  const chat = prog(f, 138, 14);
  const q = prog(f, 144, 10);
  const typing = prog(f, 152, 4) * (1 - prog(f, 164, 4));
  const a = prog(f, 166, 12);
  const src = prog(f, 176, 10);
  const note = prog(f, 178, 14);

  return (
    <AbsoluteFill>
      <SceneTitle lead="NOW" text="Ordenar, automatizar y consultar" start={8} />

      {/* Representación conceptual de App HE */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 250,
          width: 1680,
          height: 655,
          background: C.white,
          border: `2px solid ${C.hairline}`,
          borderRadius: 18,
          ...frame,
        }}
      >
        <div
          style={{
            height: 52,
            borderBottom: `2px solid ${C.hairline}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 26px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: C.yellow }} />
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 24, color: C.ink }}>App HE</div>
          </div>
          <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 20, color: C.text3 }}>
            Representación conceptual de funciones propuestas
          </div>
        </div>
      </div>

      {/* 2 · Cálculo con reglas (automatización determinista) */}
      <div
        style={{
          position: "absolute",
          left: 950,
          top: 318,
          width: 820,
          height: 280,
          boxSizing: "border-box",
          borderRadius: 14,
          padding: "20px 26px",
          ...kindStyle("regla"),
          opacity: rules,
          transform: `translateY(${(1 - rules) * 20}px)`,
        }}
      >
        <PanelHeader title="Cálculo con reglas" n={2} step="AUTOMATIZAR" />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
          {[
            { t: "Ventas del mes", s: false, at: 94 },
            { t: "Regla del contrato", s: true, at: 102 },
            { t: "Cumplimiento por rubro", s: false, at: 110 },
          ].map((c, i) => {
            const p = prog(f, c.at, 10);
            return (
              <React.Fragment key={c.t}>
                {i > 0 ? (
                  <div style={{ opacity: p }}>
                    <Arrow size={26} />
                  </div>
                ) : null}
                <div style={{ opacity: p, transform: `scale(${0.9 + 0.1 * p})` }}>
                  <FlowChip strong={c.s}>{c.t}</FlowChip>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 36,
            rowGap: 14,
            marginTop: 22,
          }}
        >
          {RUBROS.map((r, i) => {
            const fill = prog(f, 112 + i * 6, 22);
            return (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 150, fontFamily: F.body, fontWeight: 500, fontSize: 21, color: C.ink }}>{r}</div>
                <div style={{ flex: 1, height: 12, borderRadius: 6, background: C.white, overflow: "hidden" }}>
                  <div style={{ width: `${fill * 100}%`, height: "100%", background: C.ink, borderRadius: 6 }} />
                </div>
                <CheckDot progress={prog(f, 130 + i * 6, 8)} size={26} />
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: F.body,
            fontWeight: 500,
            fontSize: 20,
            color: C.text2,
            opacity: prog(f, 140, 10),
          }}
        >
          Corte mensual del día 10 · cálculo determinista y auditable
        </div>
      </div>

      {/* 3 · Consulta con IA (propone y responde con evidencia) */}
      <div
        style={{
          position: "absolute",
          left: 950,
          top: 614,
          width: 820,
          height: 244,
          boxSizing: "border-box",
          borderRadius: 14,
          padding: "18px 26px",
          ...kindStyle("ia"),
          opacity: chat,
          transform: `translateY(${(1 - chat) * 20}px)`,
        }}
      >
        <PanelHeader title="Consulta con IA" n={3} step="AGENTIZAR" />
        <div style={{ position: "relative", height: 160 }}>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: C.ink,
              color: C.white,
              fontFamily: F.body,
              fontWeight: 500,
              fontSize: 22,
              borderRadius: "16px 16px 4px 16px",
              padding: "10px 18px",
              opacity: q,
              transform: `translateY(${(1 - q) * 10}px)`,
            }}
          >
            <Person size={22} color={C.white} />
            ¿Qué falta para pagar el Contrato HE?
          </div>
          <div style={{ position: "absolute", left: 6, top: 106, display: "flex", gap: 7, opacity: typing }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: C.text3,
                  opacity: 0.4 + 0.6 * Math.abs(Math.sin((f + i * 4) / 4)),
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 92,
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: a,
              transform: `translateY(${(1 - a) * 10}px)`,
            }}
          >
            <div
              style={{
                border: `2px dashed ${C.ink}`,
                borderRadius: "16px 16px 16px 4px",
                padding: "10px 18px",
                fontFamily: F.body,
                fontWeight: 500,
                fontSize: 22,
                color: C.ink,
                background: C.white,
              }}
            >
              Falta el OK de trade en eventos.
            </div>
            <div
              style={{
                opacity: src,
                fontFamily: F.body,
                fontWeight: 700,
                fontSize: 18,
                color: C.ink,
                background: C.card,
                borderRadius: 6,
                padding: "6px 10px",
              }}
            >
              Fuente: ficha del contrato
            </div>
          </div>
        </div>
      </div>

      {/* Condición para pasar a operación oficial */}
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 866,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: F.body,
          fontSize: 22,
          color: C.text2,
          opacity: note,
        }}
      >
        <Diamond size={20} />
        <span style={{ fontWeight: 700, color: C.ink }}>Paso a operación oficial:</span>
        <span style={{ fontWeight: 500 }}>validación en paralelo con Excel y visto bueno de negocio</span>
      </div>
    </AbsoluteFill>
  );
};
