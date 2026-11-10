import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { easeInOut, prog, rise } from "../anim";

/**
 * Placa 7 · Pase al deck. El video abre la sesión: cierra con el nombre del proyecto
 * (como en la presentación final), sin pedido; la idea central la dice la voz y el subtítulo.
 * Fotogramas locales.
 */
export const P6Decision: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = prog(f, 0, 20, easeInOut);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: `${wipe * 100}%`,
          background: C.yellow,
        }}
      />
      <div style={{ position: "absolute", left: 680, top: 318, ...rise(f, 10, 14) }}>
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 28, color: C.ink, opacity: 0.78 }}>
          Propuesta To-Be · Canal High End
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 676,
          top: 368,
          width: 1130,
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: 92,
          lineHeight: 1.02,
          letterSpacing: -2,
          color: C.ink,
          ...rise(f, 12, 16, 30),
        }}
      >
        HE Gestión de Contratos, Cumplimiento y Pagos
      </div>
    </AbsoluteFill>
  );
};
