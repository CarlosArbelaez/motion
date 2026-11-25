import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { useLayout } from "../layout";
import { c, titular, apoyo, acentoPorPuesto } from "../theme";
import { ItemTop } from "../guion";

export const Escena3Top: React.FC<{ item: ItemTop; guias?: boolean }> = ({ item, guias }) => {
  const L = useLayout();
  const acento = c(acentoPorPuesto[item.puesto]);
  return (
    <Stage bg="colors-background-base" subtitulo={item.voz.split(": ")[1]} guias={guias}>
      {/* Bloque plano de acento que sangra por la derecha */}
      <div style={{ position: "absolute", top: 0, right: -L.safe.right, width: 300 * L.u, height: 240 * L.u, backgroundColor: acento }} />
      <div style={{ width: 240 * L.u, height: 240 * L.u, backgroundColor: c("colors-background-secondary"), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...titular, fontSize: 150 * L.u, color: acento, letterSpacing: "-0.03em" }}>#{item.puesto}</div>
      </div>
      <Fit text={item.nombre} width={L.contentW} max={124 * L.u} color={c("colors-text-primary")} style={{ marginTop: 64 * L.u }} />
      <div style={{ ...apoyo, fontSize: L.px(50), lineHeight: 1.2, color: c("colors-text-secondary"), marginTop: 24 * L.u }}>{item.linea}</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 24 * L.u }}>
        <Fit text={item.cifra} width={L.contentW} max={360 * L.u} color={c("colors-status-brand-base")} />
        <div style={{ ...apoyo, fontSize: L.px(56), lineHeight: 1.15, color: c("colors-text-primary"), marginTop: 20 * L.u }}>{item.unidad}</div>
      </div>
    </Stage>
  );
};
