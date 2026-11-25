import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Pulso, Etiqueta } from "../components/Piezas";
import { useLayout } from "../layout";
import { c, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena1Gancho: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const { titulo, gancho, cabecera, etiquetas } = guion;
  return (
    <Stage bg="colors-background-base" cabecera={[guion.cierre.firma, cabecera.resumen]} ticker={titulo.anio} subtitulo={gancho.voz.split(". ")[1]} guias={guias}>
      <div style={{ height: 44 * L.u }} />
      <Etiqueta texto={etiquetas.marca} fondo="colors-text-primary" tinta="colors-text-black-static" size={52} />
      <Fit text={titulo.nombre} width={L.contentW} max={400 * L.u} color={c("colors-text-primary")} style={{ marginTop: 28 * L.u }} />
      <Pulso color="colors-status-brand-base" alto={150 * L.u} />
      <Fit text={titulo.anio} width={L.contentW} max={520 * L.u} color={c("colors-status-brand-base")} />
      <div style={{ ...apoyo, fontSize: L.px(50), lineHeight: 1.15, color: c("colors-text-primary"), marginTop: 44 * L.u }}>{gancho.sub}</div>
    </Stage>
  );
};
