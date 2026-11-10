import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { CheckDot, SceneTitle } from "../components/ui";
import { CUE, SCENES } from "../timeline";

/**
 * Placa 3 · Ola 0 · Preparar (diapositiva 3 de la presentación final), más la línea base de
 * horas, que el deck indica que se mide en la Ola 0 (diapositiva 6). Cada punto aparece
 * cuando la voz lo nombra. Fotogramas locales.
 */

const ITEMS = [
  { t: "Reglas de pago aprobadas", s: "Cómo se mide el cumplimiento, cómo se paga cada rubro y quién aprueba" },
  { t: "Cada contrato con su código de cliente", s: "La base para asignar las ventas a cada contrato" },
  { t: "Accesos a datos y buzón", s: "Listos antes de empezar a construir" },
  { t: "Línea base de horas medida", s: "Se cronometra un ciclo mensual de trabajo" },
];

export const Ola0: React.FC = () => {
  const f = useCurrentFrame();
  const at = (i: number) => CUE.ola0Item[i] - SCENES.ola0.from - 4;

  return (
    <AbsoluteFill>
      <SceneTitle lead="Ola 0" text="Preparar las bases" start={6} />

      {ITEMS.map((it, i) => {
        const p = prog(f, at(i), 12);
        return (
          <div
            key={it.t}
            style={{
              position: "absolute",
              left: 600,
              top: 300 + i * 118,
              width: 1200,
              height: 102,
              boxSizing: "border-box",
              background: C.white,
              border: `2.5px solid ${C.ink}`,
              borderRadius: 12,
              padding: "0 28px",
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: p,
              transform: `translateX(${(1 - p) * 24}px)`,
            }}
          >
            <CheckDot progress={prog(f, at(i) + 8, 10)} size={38} />
            <div>
              <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 29, color: C.ink }}>{it.t}</div>
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.text2, marginTop: 4 }}>{it.s}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
