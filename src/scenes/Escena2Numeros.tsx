import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena2Numeros: React.FC<{ indice: number; guias?: boolean }> = ({ indice, guias }) => {
  const L = useLayout();
  const { numeros } = guion;
  const item = numeros.items[indice];
  return (
    <Stage bg="colors-background-primary" subtitulo={item.voz} guias={guias}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ ...apoyo, fontSize: L.px(44), color: c("colors-text-secondary") }}>{numeros.eyebrow}</div>
        <div style={{ display: "flex", gap: 12 * L.u }}>
          {numeros.items.map((_, i) => (
            <div key={i} style={{ width: 56 * L.u, height: 14 * L.u, backgroundColor: i === indice ? c("colors-text-primary") : c("colors-background-secondary") }} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Fit text={String(item.valor)} width={L.contentW} max={760 * L.u} color={c("colors-status-brand-base")} />
        <div style={{ ...titular, fontSize: L.px(92), lineHeight: 1.05, color: c("colors-text-primary"), marginTop: 28 * L.u }}>{item.etiqueta}</div>
        {"detalle" in item && item.detalle ? (
          <div style={{ ...apoyo, fontSize: L.px(42), lineHeight: 1.3, color: c("colors-text-secondary"), marginTop: 28 * L.u }}>{item.detalle}</div>
        ) : null}
      </div>
    </Stage>
  );
};
