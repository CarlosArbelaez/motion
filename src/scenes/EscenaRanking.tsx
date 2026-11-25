import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Franja } from "../components/Piezas";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular } from "../theme";
import { guion } from "../guion";
import { salida } from "../motion";

// Cinco casillas que se llenan una a una: anuncian la cuenta regresiva.
const Casillas: React.FC<{ desde: number }> = ({ desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const lado = (L.contentW - 4 * 16 * L.u) / 5;
  return (
    <div style={{ display: "flex", gap: 16 * L.u }}>
      {[5, 4, 3, 2, 1].map((n, i) => (
        <div key={n} style={{ width: lado, height: lado * 0.62, boxSizing: "border-box", border: `${4 * L.u}px solid ${c("colors-text-primary")}`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: c("colors-text-primary"),
              translate: interpolate(frame, [desde + i * 5, desde + i * 5 + 10], ["0% 101%", "0% 0%"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }),
            }}
          />
          <div style={{ ...titular, position: "relative", fontSize: L.px(64), lineHeight: 1, color: c("colors-text-black-static"), opacity: interpolate(frame, [desde + i * 5 + 4, desde + i * 5 + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>{n}</div>
        </div>
      ))}
    </div>
  );
};

const Cinco: React.FC<{ texto: string }> = ({ texto }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...titular,
        fontSize: 760 * L.u,
        lineHeight: 0.8,
        letterSpacing: "-0.05em",
        color: c("colors-status-brand-base"),
        transformOrigin: "right center",
        scale: interpolate(frame, [0, 16], [1.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }),
      }}
    >
      {texto}
    </div>
  );
};

export const EscenaRanking: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const r = guion.ranking;
  const [palabra, numero] = r.titulo.split(" ");
  return (
    <Stage bg="colors-background-base" cabecera={[guion.cabecera.marca, guion.cabecera.top]} ticker={r.titulo} guias={guias}>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 30 * L.u }}>
        <Sube desde={4} dur={14} style={{ alignSelf: "flex-start", marginTop: 20 * L.u }}>
          <Fit text={palabra} width={L.contentW * 0.52} max={300 * L.u} color={c("colors-text-primary")} />
        </Sube>
        <div style={{ marginRight: -L.safe.right * 0.5 }}>
          <Cinco texto={numero} />
        </div>
      </div>
      <div style={{ clipPath: "inset(0 -20% 0 -20%)", marginTop: 20 * L.u }}>
        <Franja fondo="colors-status-brand-base" style={{ paddingTop: 26 * L.u, paddingBottom: 22 * L.u }}>
          <Sube desde={16} dur={12}>
            <div style={{ ...titular, fontSize: L.px(72), lineHeight: 0.95, letterSpacing: "-0.02em", textTransform: "uppercase", color: c("colors-text-black-static") }}>{r.sub}</div>
          </Sube>
        </Franja>
      </div>
      <div style={{ marginTop: 40 * L.u, marginBottom: 20 * L.u }}>
        <Casillas desde={36} />
      </div>
    </Stage>
  );
};
