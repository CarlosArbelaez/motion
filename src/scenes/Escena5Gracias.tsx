import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena5Gracias: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const g = guion.gracias;
  return (
    <Stage bg="colors-background-primary" subtitulo={g.voz} guias={guias}>
      <Fit text={g.palabra} width={L.contentW} max={300 * L.u} color={c("colors-status-brand-base")} />
      <div style={{ ...titular, fontSize: L.px(68), lineHeight: 1.1, color: c("colors-text-primary"), marginTop: 28 * L.u }}>{g.frase}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 * L.u, marginTop: 72 * L.u }}>
        {g.equipos.map((e) => (
          <div key={e} style={{ ...apoyo, fontSize: L.px(60), color: c("colors-text-primary"), backgroundColor: c("colors-background-secondary"), padding: `${24 * L.u}px ${36 * L.u}px` }}>
            {e}
          </div>
        ))}
      </div>
    </Stage>
  );
};
