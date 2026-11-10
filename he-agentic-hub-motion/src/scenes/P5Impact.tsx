import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { CheckDot, SceneTitle } from "../components/ui";
import { DocContent } from "../components/Contract";
import { DashedCircle } from "../components/Icons";

/**
 * Placa 5 · 00:21–00:27 · Impacto esperado.
 * Cifras = metas y estimaciones de la propuesta To-Be v4.0 (no resultados medidos):
 *  - −50 % de horas manuales de la analista: meta a 6 meses (KPI de guarda).
 *  - ≈13 h/mes de la analista: estimación de carga de trabajo To-Be (no horas ahorradas).
 * Fotogramas locales (0 = 00:21).
 */

const BEFORE_TASKS = ["Transcribir", "Digitar", "Cruzar a mano", "Perseguir aprobaciones"];
const BENEFITS = [
  { t: "Control del pago", at: 80 },
  { t: "Trazabilidad", at: 92 },
  { t: "Consulta autónoma", at: 104 },
];

const Label: React.FC<{ top: number; children: React.ReactNode; opacity: number }> = ({ top, children, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: 150,
      top,
      fontFamily: F.body,
      fontWeight: 700,
      fontSize: 24,
      color: C.text2,
      opacity,
    }}
  >
    {children}
  </div>
);

const Kpi: React.FC<{
  x: number;
  value: React.ReactNode;
  valueSize: number;
  label: string;
  qualifier: string;
  qualifierStrong?: boolean;
  note: string;
  at: number;
  f: number;
}> = ({ x, value, valueSize, label, qualifier, qualifierStrong, note, at, f }) => {
  const p = prog(f, at, 16);
  const q = prog(f, at + 8, 12);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 310,
        width: 490,
        height: 440,
        boxSizing: "border-box",
        background: C.white,
        borderTop: `8px solid ${C.ink}`,
        borderRadius: 14,
        padding: "30px 36px",
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      <div
        style={{
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: valueSize,
          lineHeight: 1,
          letterSpacing: -3,
          color: C.ink,
          height: 160,
          display: "flex",
          alignItems: "flex-end",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
      <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 34, color: C.ink, marginTop: 14 }}>{label}</div>
      <div
        style={{
          display: "inline-block",
          marginTop: 20,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 25,
          lineHeight: 1.25,
          borderRadius: 12,
          padding: "8px 16px",
          background: qualifierStrong ? C.ink : C.white,
          color: qualifierStrong ? C.yellow : C.ink,
          border: `2px solid ${C.ink}`,
          opacity: q,
        }}
      >
        {qualifier}
      </div>
      <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 21, color: C.text2, marginTop: 16, opacity: q, lineHeight: 1.3 }}>
        {note}
      </div>
    </div>
  );
};

export const P5Impact: React.FC = () => {
  const f = useCurrentFrame();
  const before = prog(f, 2, 14);
  const after = prog(f, 24, 12);
  const base = prog(f, 54, 14);

  return (
    <AbsoluteFill>
      <SceneTitle text="Impacto esperado" highlight="Impacto esperado" start={4} />

      {/* Antes: el contrato rodeado de tareas manuales */}
      <Label top={262} opacity={before}>
        Antes
      </Label>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 300,
          width: 180,
          height: 235,
          background: C.white,
          border: `2.5px solid #9AA0AB`,
          borderRadius: 8,
          overflow: "hidden",
          opacity: before,
        }}
      >
        <div style={{ transform: "scale(0.5)", transformOrigin: "top left", width: 360, height: 470, position: "relative" }}>
          <DocContent tone="muted" />
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: before }}>
        {BEFORE_TASKS.map((_, i) => (
          <path
            key={i}
            d={`M 330 ${340 + i * 50} C 360 ${330 + i * 60}, 360 ${318 + i * 58}, 380 ${322 + i * 58}`}
            stroke="#9AA0AB"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="none"
          />
        ))}
      </svg>
      {BEFORE_TASKS.map((t, i) => (
        <div
          key={t}
          style={{
            position: "absolute",
            left: 384,
            top: 304 + i * 58,
            fontFamily: F.body,
            fontWeight: 500,
            fontSize: 22,
            color: C.text2,
            background: C.card,
            borderRadius: 999,
            padding: "6px 16px",
            opacity: prog(f, 4 + i * 3, 10),
            transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)`,
          }}
        >
          {t}
        </div>
      ))}

      {/* Después: el mismo contrato, conectado y trazable (capa continua) */}
      <Label top={552} opacity={after}>
        Con HE Agentic Hub
      </Label>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {BENEFITS.map((b, i) => (
          <path
            key={b.t}
            d={`M 364 ${700 + (i - 1) * 40} C 390 ${700 + (i - 1) * 40}, 384 ${626 + i * 86}, 410 ${626 + i * 86}`}
            stroke={C.ink}
            strokeWidth={2.5}
            fill="none"
            opacity={prog(f, b.at - 4, 8)}
          />
        ))}
      </svg>
      {BENEFITS.map((b, i) => {
        const p = prog(f, b.at, 10);
        return (
          <div
            key={b.t}
            style={{
              position: "absolute",
              left: 410,
              top: 602 + i * 86,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: C.white,
              border: `2.5px solid ${C.ink}`,
              borderRadius: 999,
              padding: "8px 18px 8px 10px",
              fontFamily: F.body,
              fontWeight: 700,
              fontSize: 25,
              color: C.ink,
              opacity: p,
              transform: `translateX(${(1 - p) * -14}px)`,
            }}
          >
            <CheckDot progress={p} size={30} fill={C.yellow} color={C.ink} />
            {b.t}
          </div>
        );
      })}

      {/* KPIs: metas y estimaciones, no resultados medidos */}
      <div
        style={{
          position: "absolute",
          left: 780,
          top: 262,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 24,
          color: C.text2,
          opacity: prog(f, 10, 12),
        }}
      >
        Metas y estimaciones de la propuesta To-Be
      </div>
      <Kpi
        x={780}
        f={f}
        at={16}
        value="−50 %"
        valueSize={150}
        label="de horas manuales"
        qualifier="Meta a 6 meses"
        qualifierStrong
        note="Reducción de horas de trabajo manual; no es un porcentaje de automatización."
      />
      <Kpi
        x={1310}
        f={f}
        at={34}
        value={
          <>
            ≈13
            <span style={{ fontSize: 64, letterSpacing: -1, marginLeft: 14, marginBottom: 14 }}>h/mes</span>
          </>
        }
        valueSize={150}
        label="de la analista"
        qualifier="Estimación de carga de trabajo To-Be"
        note="Carga mensual estimada con el To-Be; no son horas ahorradas."
      />

      <div
        style={{
          position: "absolute",
          left: 780,
          top: 776,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: base,
          fontFamily: F.body,
        }}
      >
        <DashedCircle size={32} />
        <span style={{ fontWeight: 700, fontSize: 30, color: C.ink }}>Línea base por medir</span>
        <span style={{ fontWeight: 500, fontSize: 24, color: C.text2 }}>· se cronometra un ciclo mensual al inicio</span>
      </div>
    </AbsoluteFill>
  );
};
