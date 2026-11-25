import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Fit } from "../components/Fit";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular } from "../theme";
import { guion } from "../guion";
import { salida } from "../curvas";

// Barra de secciones: marca en cuál vamos.
export const Secciones: React.FC<{ actual: number; desde: number }> = ({ actual, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const negro = c("colors-text-black-static");
  return (
    <div style={{ display: "flex", gap: 14 * L.u }}>
      {guion.secciones.map((s, i) => (
        <div key={s.id} style={{ flex: 1, height: 22 * L.u, boxSizing: "border-box", border: `${4 * L.u}px solid ${negro}`, position: "relative", overflow: "hidden" }}>
          {i < actual ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: negro,
                transformOrigin: "left center",
                scale: i === actual - 1 ? `${interpolate(frame, [desde, desde + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} 1` : "1 1",
              }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

// Cortinilla de sección: número enorme y título, a pantalla completa en amarillo.
export const EscenaCortina: React.FC<{ seccion: number; children?: React.ReactNode; guias?: boolean }> = ({ seccion, children, guias }) => {
  const L = useLayout();
  const s = guion.secciones[seccion - 1];
  const negro = c("colors-text-black-static");
  return (
    <AbsoluteFill style={{ backgroundColor: c("colors-status-brand-base"), overflow: "hidden" }}>
      <div style={{ position: "absolute", top: L.safe.top, left: L.safe.left, width: L.contentW, height: L.contentH, display: "flex", flexDirection: "column" }}>
        <Secciones actual={seccion} desde={4} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
          <Sube desde={0} dur={12}>
            <div style={{ ...titular, fontSize: 520 * L.u, lineHeight: 0.82, letterSpacing: "-0.05em", color: negro }}>{s.numero}</div>
          </Sube>
          <Sube desde={4} dur={12} style={{ marginTop: 30 * L.u }}>
            <Fit text={s.titulo} width={L.contentW} max={170 * L.u} color={negro} />
          </Sube>
          {children}
        </div>
      </div>
      {guias ? (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: L.safe.top, backgroundColor: "rgba(255,0,80,0.4)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: L.safe.bottom, backgroundColor: "rgba(255,0,80,0.4)" }} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
