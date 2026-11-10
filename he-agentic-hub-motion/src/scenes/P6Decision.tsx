import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { easeInOut, prog, rise } from "../anim";
import { Arrow } from "../components/Icons";

/**
 * Placa 6 · 00:27–00:30 · Decisión.
 * Panel amarillo de marca (como la portada del deck), el contrato resuelto y la solicitud de VoBo.
 * Fotogramas locales (0 = 00:27).
 */
export const P6Decision: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = prog(f, 0, 20, easeInOut);
  const cta = prog(f, 24, 12);

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
          Canal High End · Propuesta To-Be v4.0
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 676,
          top: 362,
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: 132,
          lineHeight: 1,
          letterSpacing: -3,
          color: C.ink,
          whiteSpace: "nowrap",
          ...rise(f, 12, 16, 30),
        }}
      >
        HE Agentic Hub
      </div>
      <div
        style={{
          position: "absolute",
          left: 680,
          top: 524,
          fontFamily: F.body,
          fontWeight: 500,
          fontSize: 32,
          color: C.ink,
          ...rise(f, 18, 14),
        }}
      >
        Las reglas calculan, la IA propone y las personas deciden.
      </div>
      <div
        style={{
          position: "absolute",
          left: 680,
          top: 620,
          display: "flex",
          alignItems: "center",
          gap: 18,
          background: C.ink,
          color: C.white,
          borderRadius: 999,
          padding: "22px 40px 22px 44px",
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 50,
          opacity: cta,
          transform: `scale(${0.92 + 0.08 * cta})`,
          transformOrigin: "left center",
        }}
      >
        VoBo para iniciar desarrollo
        <Arrow size={46} color={C.yellow} strokeWidth={3} />
      </div>
    </AbsoluteFill>
  );
};
