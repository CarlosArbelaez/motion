import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Escalera } from "../components/Piezas";
import { useLayout } from "../layout";
import { c, titular, apoyo, acentoPorPuesto } from "../theme";
import { guion, ItemTop } from "../guion";

export const Escena3Top: React.FC<{ item: ItemTop; guias?: boolean }> = ({ item, guias }) => {
  const L = useLayout();
  const acento = c(acentoPorPuesto[item.puesto]);
  const tinta = c("colors-text-primary");
  const regla = 4 * L.u;
  return (
    <Stage bg="colors-background-base" cabecera={[guion.cabecera.top, `#${item.puesto}`]} ticker={`#${item.puesto}`} subtitulo={item.voz.split(": ")[1]} guias={guias}>
      {/* Zona del puesto: numeral gigante recortado por el borde derecho */}
      <div style={{ height: 420 * L.u, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", left: 0, top: 36 * L.u }}>
          <Escalera puesto={item.puesto} color={acento} tinta={c("colors-background-secondary")} />
        </div>
        <div style={{ ...titular, position: "absolute", right: -L.safe.right * 0.6, top: 18 * L.u, fontSize: 500 * L.u, lineHeight: 0.84, letterSpacing: "-0.05em", color: acento }}>{item.puesto}</div>
      </div>
      <div style={{ borderTop: `${regla}px solid ${tinta}`, paddingTop: 26 * L.u }}>
        <Fit text={item.nombre} width={L.contentW} max={170 * L.u} color={tinta} />
        <div style={{ ...apoyo, fontSize: L.px(46), lineHeight: 1.15, color: c("colors-text-secondary"), marginTop: 18 * L.u }}>{item.linea}</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 12 * L.u }}>
        <div style={{ borderTop: `${regla}px solid ${c("colors-status-brand-base")}`, paddingTop: 22 * L.u }}>
          <Fit text={item.cifra} width={L.contentW} max={300 * L.u} color={c("colors-status-brand-base")} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18 * L.u }}>
            <div style={{ ...titular, fontSize: L.px(50), lineHeight: 1, textTransform: "uppercase", color: tinta }}>{item.unidad}</div>
          </div>
        </div>
      </div>
    </Stage>
  );
};
