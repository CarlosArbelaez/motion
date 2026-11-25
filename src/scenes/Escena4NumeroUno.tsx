import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena4NumeroUno: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const n = guion.numeroUno;
  const negro = c("colors-text-black-static");
  const amarillo = c("colors-status-brand-base");
  return (
    <Stage bg="colors-status-brand-base" sobreAmarillo subtitulo={n.voz.split(". ")[1] + "."} guias={guias}>
      <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
        <div style={{ width: 240 * L.u, height: 240 * L.u, backgroundColor: negro, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...titular, fontSize: 150 * L.u, color: amarillo, letterSpacing: "-0.03em" }}>#{n.puesto}</div>
        </div>
        <div style={{ backgroundColor: negro, alignSelf: "flex-end", padding: `${16 * L.u}px ${28 * L.u}px` }}>
          <div style={{ ...titular, fontSize: L.px(56), color: amarillo }}>{n.secundario}</div>
        </div>
      </div>
      <Fit text={n.nombre} width={L.contentW} max={140 * L.u} color={negro} style={{ marginTop: 56 * L.u }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 24 * L.u }}>
        <Fit text={n.cifra} width={L.contentW} max={420 * L.u} color={negro} />
        <div style={{ ...titular, fontSize: L.px(60), lineHeight: 1.1, color: negro, marginTop: 20 * L.u }}>{n.unidad}</div>
        <div style={{ ...apoyo, fontSize: L.px(42), color: negro, marginTop: 20 * L.u }}>{n.nota}</div>
      </div>
    </Stage>
  );
};
