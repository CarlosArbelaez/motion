import React from "react";
import { Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Pulso } from "../components/Piezas";
import { Sube, Barre } from "../components/Anim";
import { useLayout } from "../layout";
import { c, apoyo } from "../theme";
import { guion, cabeceraDe } from "../guion";
import { salida } from "../motion";

// Mismo gesto del "2026" inicial: el año entra enorme y se asienta.
const Anio: React.FC<{ texto: string }> = ({ texto }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div style={{ marginTop: 40 * L.u, transformOrigin: "left top", scale: interpolate(frame, [0, 16], [1.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }) }}>
      <Fit text={texto} width={L.contentW} max={520 * L.u} color={c("colors-status-brand-base")} />
    </div>
  );
};

const LineaPulso: React.FC<{ desde: number }> = ({ desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return <Pulso color="colors-status-brand-base" alto={130 * L.u} progreso={interpolate(frame, [desde, desde + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} />;
};

export const Escena6Cierre: React.FC<{ fraseEn?: number; firmaEn?: number; guias?: boolean }> = ({ fraseEn = 30, firmaEn = 90, guias }) => {
  const L = useLayout();
  const k = guion.cierre;
  const tinta = c("colors-text-primary");
  return (
    <Stage bg="colors-background-base" cabecera={cabeceraDe(4)} ticker={k.anio} guias={guias}>
      <Anio texto={k.anio} />
      <LineaPulso desde={18} />
      {k.fraseLineas.map((l, i) => (
        <Sube key={l} desde={fraseEn + i * 7} dur={14}>
          <Fit text={l} width={L.contentW} max={150 * L.u} color={tinta} />
        </Sube>
      ))}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: 14 * L.u }}>
        <Barre desde={firmaEn - 10} dur={14}>
          <div style={{ border: `${4 * L.u}px solid ${tinta}`, padding: `${30 * L.u}px ${34 * L.u}px` }}>
            <Img src={staticFile("logo-brewai.png")} style={{ width: 420 * L.u, height: ((420 * 145) / 571) * L.u, display: "block" }} />
          </div>
        </Barre>
        <Sube desde={firmaEn} dur={12}>
          <div style={{ ...apoyo, fontSize: L.px(42), lineHeight: 1.1, color: c("colors-text-secondary"), textAlign: "right" }}>{k.firma}</div>
        </Sube>
      </div>
    </Stage>
  );
};
