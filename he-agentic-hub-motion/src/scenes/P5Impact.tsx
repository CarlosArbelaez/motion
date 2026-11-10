import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { CheckDot, SceneTitle } from "../components/ui";
import { Check, DashedCircle } from "../components/Icons";
import { CUE, SCENES } from "../timeline";

/**
 * Placa 6 · Impacto (diapositiva 6 de la presentación final).
 * Métricas de éxito de High End en palabras (sin cifras nuevas) y los dos KPIs de siempre,
 * identificados como meta y estimación (no resultados medidos). Fotogramas locales.
 */

const L = (abs: number) => abs - SCENES.impacto.from;

const METRICAS = ["Ejecución completa de los rubros de cada contrato", "Crecimiento del volumen en cajas frente al año anterior"];

const CHIPS = [
  { t: "Regla", at: L(CUE.regla) },
  { t: "Soporte", at: L(CUE.soporte) },
  { t: "Aprobador", at: L(CUE.aprobador) },
];

const Kpi: React.FC<{
  x: number;
  value: React.ReactNode;
  label: string;
  qualifier: string;
  strong?: boolean;
  note: string;
  at: number;
  f: number;
}> = ({ x, value, label, qualifier, strong, note, at, f }) => {
  const p = prog(f, at, 14);
  const q = prog(f, at + 8, 12);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 430,
        width: 510,
        height: 330,
        boxSizing: "border-box",
        background: C.white,
        borderTop: `8px solid ${C.ink}`,
        borderRadius: 14,
        padding: "22px 30px",
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px)`,
      }}
    >
      <div
        style={{
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: 112,
          lineHeight: 1,
          letterSpacing: -3,
          color: C.ink,
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {value}
      </div>
      <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 30, color: C.ink, marginTop: 10 }}>{label}</div>
      <div
        style={{
          display: "inline-block",
          marginTop: 14,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 23,
          borderRadius: 12,
          padding: "6px 14px",
          background: strong ? C.ink : C.white,
          color: strong ? C.yellow : C.ink,
          border: `2px solid ${C.ink}`,
          opacity: q,
        }}
      >
        {qualifier}
      </div>
      <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 19, color: C.text2, marginTop: 12, opacity: q, lineHeight: 1.3 }}>
        {note}
      </div>
    </div>
  );
};

export const P5Impact: React.FC = () => {
  const f = useCurrentFrame();
  const meta = L(CUE.meta);

  return (
    <AbsoluteFill>
      <SceneTitle text="Impacto: cada peso pagado con regla, soporte y aprobador" highlight="regla, soporte y aprobador" start={4} size={56} />

      {/* Métricas de éxito definidas por High End (como en el deck, sin cifras) */}
      {METRICAS.map((m, i) => {
        const p = prog(f, 12 + i * 8, 12);
        return (
          <div
            key={m}
            style={{
              position: "absolute",
              left: 120 + i * 850,
              top: 236,
              width: 830,
              height: 150,
              boxSizing: "border-box",
              background: C.yellow,
              borderRadius: 14,
              padding: "18px 26px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity: p,
              transform: `translateY(${(1 - p) * 14}px)`,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                border: `3px solid ${C.ink}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Check size={30} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 18, color: C.ink, letterSpacing: 1.2 }}>
                MÉTRICA DE ÉXITO DEFINIDA POR HIGH END
              </div>
              <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 31, color: C.ink, marginTop: 6, lineHeight: 1.15 }}>{m}</div>
            </div>
          </div>
        );
      })}

      {/* El contrato (capa continua) con regla, soporte y aprobador */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {CHIPS.map((c, i) => (
          <path
            key={c.t}
            d={`M 380 ${580} C 400 ${580}, 396 ${470 + i * 96}, 420 ${470 + i * 96}`}
            stroke={C.ink}
            strokeWidth={2.5}
            fill="none"
            opacity={prog(f, c.at - 4, 8)}
          />
        ))}
      </svg>
      {CHIPS.map((c, i) => {
        const p = prog(f, c.at, 10);
        return (
          <div
            key={c.t}
            style={{
              position: "absolute",
              left: 420,
              top: 446 + i * 96,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: C.white,
              border: `2.5px solid ${C.ink}`,
              borderRadius: 999,
              padding: "8px 20px 8px 10px",
              fontFamily: F.body,
              fontWeight: 700,
              fontSize: 26,
              color: C.ink,
              opacity: p,
              transform: `translateX(${(1 - p) * -14}px)`,
            }}
          >
            <CheckDot progress={p} size={32} fill={C.yellow} color={C.ink} />
            {c.t}
          </div>
        );
      })}

      {/* KPIs: meta y estimación, no resultados medidos */}
      <div
        style={{
          position: "absolute",
          left: 760,
          top: 400,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 21,
          color: C.text2,
          opacity: prog(f, meta - 14, 12),
        }}
      >
        Meta y estimación de la propuesta To-Be
      </div>
      <Kpi
        x={760}
        f={f}
        at={meta - 6}
        value="−50 %"
        label="de horas manuales"
        qualifier="Meta a 6 meses"
        strong
        note="Reducción de horas de trabajo manual; no es un porcentaje de automatización."
      />
      <Kpi
        x={1290}
        f={f}
        at={meta + 30}
        value={
          <>
            ≈13
            <span style={{ fontSize: 50, letterSpacing: -1, marginLeft: 12, marginBottom: 10 }}>h/mes</span>
          </>
        }
        label="de la analista"
        qualifier="Estimación de carga de trabajo To-Be"
        note="Carga mensual estimada con el To-Be; no son horas ahorradas."
      />
      <div
        style={{
          position: "absolute",
          left: 760,
          top: 782,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: prog(f, meta + 56, 12),
          fontFamily: F.body,
        }}
      >
        <DashedCircle size={30} />
        <span style={{ fontWeight: 700, fontSize: 28, color: C.ink }}>Línea base por medir</span>
        <span style={{ fontWeight: 500, fontSize: 23, color: C.text2 }}>· se mide en la Ola 0</span>
      </div>
    </AbsoluteFill>
  );
};
