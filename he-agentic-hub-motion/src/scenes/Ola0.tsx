import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { CheckDot, SceneTitle } from "../components/ui";
import { Diamond } from "../components/Icons";

/**
 * Placa 3 · Ola 0 · Validar antes de construir.
 * Contenido de la Ola 0 del To-Be v4.0: libro de reglas v1, saneamiento de contratos y códigos,
 * experimentos E1–E5 (incluida la línea base E5 y las pruebas de IA E3/E4).
 * Compuerta 1: reglas aprobadas, 100 % de contratos con código, saldos conciliados.
 * Fotogramas locales.
 */

const ITEMS = [
  { t: "Libro de reglas aprobado", s: "Metas, escalas de pago y soportes, escritos por contrato" },
  { t: "Contratos con su código de cliente", s: "Cada contrato ligado a sus códigos de venta" },
  { t: "Saldos conciliados", s: "Lo pagado y lo pendiente, cuadrados" },
  { t: "Línea base medida", s: "Se cronometra un ciclo mensual de trabajo" },
  { t: "Pruebas previas de la IA", s: "Lectura de contratos y chat, medidos antes de usarse" },
];

export const Ola0: React.FC = () => {
  const f = useCurrentFrame();
  const gate = prog(f, 150, 14);

  return (
    <AbsoluteFill>
      <SceneTitle lead="Ola 0" text="Validar antes de construir" start={6} />

      {ITEMS.map((it, i) => {
        const p = prog(f, 36 + i * 20, 12);
        return (
          <div
            key={it.t}
            style={{
              position: "absolute",
              left: 600,
              top: 300 + i * 96,
              width: 1200,
              height: 84,
              boxSizing: "border-box",
              background: C.white,
              border: `2.5px solid ${C.ink}`,
              borderRadius: 12,
              padding: "0 26px",
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: p,
              transform: `translateX(${(1 - p) * 24}px)`,
            }}
          >
            <CheckDot progress={prog(f, 46 + i * 20, 10)} size={36} />
            <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 28, color: C.ink, width: 470 }}>{it.t}</div>
            <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 23, color: C.text2 }}>{it.s}</div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 600,
          top: 800,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: F.body,
          fontSize: 24,
          color: C.text2,
          opacity: gate,
        }}
      >
        <Diamond size={22} />
        <span style={{ fontWeight: 700, color: C.ink }}>Compuerta para construir el MVP:</span>
        <span style={{ fontWeight: 500 }}>reglas aprobadas, contratos con código y saldos conciliados</span>
      </div>
    </AbsoluteFill>
  );
};
