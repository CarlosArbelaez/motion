import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Franja } from "../components/Piezas";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena2Numeros: React.FC<{ indice: number; guias?: boolean }> = ({ indice, guias }) => {
  const L = useLayout();
  const { numeros, cabecera } = guion;
  const item = numeros.items[indice];
  const valor = String(item.valor);
  return (
    <Stage bg="colors-background-primary" cabecera={[cabecera.numeros, `${indice + 1} / ${numeros.items.length}`]} ticker={valor} subtitulo={item.voz} guias={guias}>
      {/* El número es la composición: ocupa todo el ancho, a sangre */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", marginLeft: -L.safe.left, width: L.width, justifyContent: "center", overflow: "visible" }}>
        <Fit text={valor} width={L.width * 0.98} max={900 * L.u} color={c("colors-status-brand-base")} align="center" style={{ lineHeight: 0.8 }} />
      </div>
      <Franja fondo="colors-text-primary" style={{ paddingTop: 30 * L.u, paddingBottom: 26 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(86), lineHeight: 0.95, letterSpacing: "-0.02em", textTransform: "uppercase", color: c("colors-text-black-static") }}>{item.etiqueta}</div>
        {"detalle" in item && item.detalle ? (
          <div style={{ ...apoyo, fontSize: L.px(40), lineHeight: 1.2, color: c("colors-text-black-static"), marginTop: 14 * L.u }}>{item.detalle}</div>
        ) : null}
      </Franja>
      <div style={{ height: 16 * L.u }} />
    </Stage>
  );
};
