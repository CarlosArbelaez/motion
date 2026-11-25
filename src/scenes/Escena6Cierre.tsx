import React from "react";
import { Img, staticFile } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena6Cierre: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const k = guion.cierre;
  return (
    <Stage bg="colors-background-base" subtitulo={k.voz.split(". ")[0] + "."} guias={guias}>
      <Fit text={k.anio} width={L.contentW} max={520 * L.u} color={c("colors-status-brand-base")} />
      <div style={{ ...titular, fontSize: L.px(88), lineHeight: 1.05, color: c("colors-text-primary"), marginTop: 24 * L.u }}>{k.frase}</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 24 * L.u }}>
        <div style={{ width: 160 * L.u, height: 14 * L.u, backgroundColor: c("colors-background-secondary"), marginBottom: 48 * L.u }} />
        <Img src={staticFile("logo-brewai.png")} style={{ width: 520 * L.u, height: (520 * 145) / 571 * L.u }} />
        <div style={{ ...apoyo, fontSize: L.px(46), color: c("colors-text-secondary"), marginTop: 28 * L.u }}>{k.firma}</div>
      </div>
    </Stage>
  );
};
