import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { easeInOut, prog, rise } from "../anim";
import { CUE, SCENES } from "../timeline";

/**
 * Placa 7 · Cierre con las tres decisiones de High End (diapositiva 10 del deck v2), sin plazos
 * ni detalle de escenarios. Cada decisión aparece cuando la voz la nombra; al final, la frase
 * central. Fotogramas locales.
 */

const L = (abs: number) => abs - SCENES.cierre.from;

const DECISIONES = [
  { t: "Visto bueno y opción de equipo", s: "Al To-Be y al MVP, y con qué equipo se construye" },
  { t: "Libro de reglas v1 aprobado", s: "Cómo se mide el cumplimiento, cómo se paga y quién aprueba" },
  { t: "Indicadores del canal priorizados", s: "Qué se mide, de qué fuente sale y cuál se conecta primero" },
];

export const P6Decision: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = prog(f, 0, 20, easeInOut);
  const mantra = prog(f, L(CUE.mantra) - 4, 14);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: `${wipe * 100}%`, background: C.yellow }} />
      <div style={{ position: "absolute", left: 680, top: 286, ...rise(f, 10, 14) }}>
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 26, color: C.ink, opacity: 0.78 }}>
          HE Gestión de Contratos, Cumplimiento y Pagos · Propuesta To-Be
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 676,
          top: 326,
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: 72,
          lineHeight: 1.02,
          letterSpacing: -1.6,
          color: C.ink,
          whiteSpace: "nowrap",
          ...rise(f, 12, 16, 30),
        }}
      >
        Para arrancar: tres decisiones
      </div>

      {DECISIONES.map((d, i) => {
        const p = prog(f, L(CUE.decision[i]) - 4, 12);
        return (
          <div
            key={d.t}
            style={{
              position: "absolute",
              left: 680,
              top: 430 + i * 92,
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: p,
              transform: `translateX(${(1 - p) * 22}px)`,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                background: C.ink,
                color: C.yellow,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: F.display,
                fontWeight: 700,
                fontSize: 32,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 36, color: C.ink, lineHeight: 1.1 }}>{d.t}</div>
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 24, color: C.ink, opacity: 0.8, marginTop: 4 }}>{d.s}</div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 680,
          top: 724,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 30,
          color: C.ink,
          borderTop: `3px solid ${C.ink}`,
          paddingTop: 16,
          opacity: mantra,
          transform: `translateY(${(1 - mantra) * 10}px)`,
        }}
      >
        Las reglas calculan, la IA propone y las personas deciden.
      </div>
    </AbsoluteFill>
  );
};
