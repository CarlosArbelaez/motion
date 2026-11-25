import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena1Gancho: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const { titulo, gancho } = guion;
  return (
    <Stage bg="colors-background-base" subtitulo={gancho.voz.split(". ")[1]} guias={guias}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ ...titular, fontSize: L.px(72), color: c("colors-text-secondary") }}>{titulo.marca}</div>
        <Fit text={titulo.nombre} width={L.contentW} max={300 * L.u} color={c("colors-text-primary")} style={{ marginTop: 8 * L.u }} />
        <Fit text={titulo.anio} width={L.contentW} max={520 * L.u} color={c("colors-status-brand-base")} style={{ marginTop: 12 * L.u }} />
        <div style={{ width: 160 * L.u, height: 14 * L.u, backgroundColor: c("colors-background-secondary"), marginTop: 56 * L.u }} />
        <div style={{ ...apoyo, fontSize: L.px(52), lineHeight: 1.2, color: c("colors-text-primary"), marginTop: 36 * L.u }}>{gancho.sub}</div>
      </div>
    </Stage>
  );
};
