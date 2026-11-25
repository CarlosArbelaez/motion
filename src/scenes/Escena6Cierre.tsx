import React from "react";
import { Img, staticFile } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Pulso } from "../components/Piezas";
import { useLayout } from "../layout";
import { c, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena6Cierre: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const k = guion.cierre;
  const tinta = c("colors-text-primary");
  return (
    <Stage bg="colors-background-base" cabecera={[guion.cabecera.marca, guion.cabecera.cierre]} ticker={k.anio} subtitulo={k.voz.split(". ")[0] + "."} guias={guias}>
      <Fit text={k.anio} width={L.contentW} max={520 * L.u} color={c("colors-status-brand-base")} style={{ marginTop: 40 * L.u }} />
      <Pulso color="colors-status-brand-base" alto={130 * L.u} />
      {k.fraseLineas.map((l) => (
        <Fit key={l} text={l} width={L.contentW} max={150 * L.u} color={tinta} />
      ))}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: 14 * L.u }}>
        <div style={{ border: `${4 * L.u}px solid ${tinta}`, padding: `${30 * L.u}px ${34 * L.u}px` }}>
          <Img src={staticFile("logo-brewai.png")} style={{ width: 420 * L.u, height: ((420 * 145) / 571) * L.u, display: "block" }} />
        </div>
        <div style={{ ...apoyo, fontSize: L.px(42), lineHeight: 1.1, color: c("colors-text-secondary"), textAlign: "right" }}>{k.firma}</div>
      </div>
    </Stage>
  );
};
