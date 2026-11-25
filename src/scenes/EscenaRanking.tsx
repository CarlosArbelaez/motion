import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { EscenaCortina } from "./EscenaCortina";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular } from "../theme";
import { guion } from "../guion";
import { salida, suave } from "../curvas";

// Cinco casillas que se llenan una a una: anuncian la cuenta regresiva.
const Casillas: React.FC<{ desde: number }> = ({ desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const negro = c("colors-text-black-static");
  const lado = (L.contentW - 4 * 16 * L.u) / 5;
  return (
    <div style={{ display: "flex", gap: 16 * L.u, marginTop: 44 * L.u }}>
      {[5, 4, 3, 2, 1].map((n, i) => (
        <div key={n} style={{ width: lado, height: lado * 0.62, boxSizing: "border-box", border: `${4 * L.u}px solid ${negro}`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: negro,
              translate: interpolate(frame, [desde + i * 5, desde + i * 5 + 10], ["0% 101%", "0% 0%"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }),
            }}
          />
          <div style={{ ...titular, position: "relative", fontSize: L.px(64), lineHeight: 1, color: c("colors-status-brand-base"), opacity: interpolate(frame, [desde + i * 5 + 4, desde + i * 5 + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave }) }}>{n}</div>
        </div>
      ))}
    </div>
  );
};

// Entrada de la sección 02: la cortinilla, con el criterio del ranking y la cuenta regresiva.
export const EscenaRanking: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const s = guion.secciones[1];
  return (
    <EscenaCortina seccion={2} guias={guias}>
      <Sube desde={14} dur={12} style={{ marginTop: 20 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(64), lineHeight: 1, letterSpacing: "-0.02em", textTransform: "uppercase", color: c("colors-text-black-static") }}>{s.sub}</div>
      </Sube>
      <Casillas desde={34} />
    </EscenaCortina>
  );
};
