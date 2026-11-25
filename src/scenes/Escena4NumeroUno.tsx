import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Franja, Etiqueta } from "../components/Piezas";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena4NumeroUno: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const n = guion.numeroUno;
  const negro = c("colors-text-black-static");
  const anchoNombre = L.contentW - 300 * L.u;
  return (
    <Stage bg="colors-status-brand-base" tinta="colors-text-black-static" cabecera={[guion.cabecera.numeroUno, `#${n.puesto}`]} ticker={`#${n.puesto}`} subtitulo={n.voz.split(". ")[1] + "."} guias={guias}>
      <div style={{ height: 470 * L.u, position: "relative", flexShrink: 0 }}>
        <div style={{ ...titular, position: "absolute", right: -L.safe.right * 0.4, top: 24 * L.u, fontSize: 560 * L.u, lineHeight: 0.84, letterSpacing: "-0.05em", color: negro }}>{n.puesto}</div>
        <div style={{ position: "absolute", left: 0, top: 40 * L.u }}>
          <Etiqueta texto={n.secundario} fondo="colors-text-black-static" tinta="colors-status-brand-base" giro={-5} size={56} />
        </div>
        <div style={{ position: "absolute", left: 0, bottom: 20 * L.u }}>
          {n.nombreLineas.map((l) => (
            <Fit key={l} text={l} width={anchoNombre} max={200 * L.u} color={negro} />
          ))}
        </div>
      </div>
      <Franja fondo="colors-text-black-static" style={{ paddingTop: 34 * L.u, paddingBottom: 22 * L.u }}>
        <Fit text={n.cifra} width={L.contentW} max={330 * L.u} color={c("colors-status-brand-base")} />
      </Franja>
      <div style={{ ...titular, fontSize: L.px(56), lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em", color: negro, marginTop: 26 * L.u }}>{n.unidad}</div>
      <div style={{ ...apoyo, fontSize: L.px(42), color: negro, marginTop: 16 * L.u }}>{n.nota}</div>
    </Stage>
  );
};
