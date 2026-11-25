import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";

export const Escena5Gracias: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const g = guion.gracias;
  const tinta = c("colors-text-primary");
  const regla = 4 * L.u;
  return (
    <Stage bg="colors-background-primary" cabecera={[guion.cabecera.marca, `${g.equipos.length} ${guion.cabecera.equipos}`]} ticker={g.palabra} guias={guias}>
      <Fit text={g.palabra} width={L.contentW} max={300 * L.u} color={c("colors-status-brand-base")} style={{ marginTop: 44 * L.u }} />
      <div style={{ ...apoyo, fontSize: L.px(52), lineHeight: 1.12, color: tinta, marginTop: 26 * L.u }}>{g.frase}</div>
      {/* Tabla de equipos: retícula visible */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: 44 * L.u, borderTop: `${regla}px solid ${tinta}`, borderLeft: `${regla}px solid ${tinta}` }}>
        {g.equipos.map((e) => (
          <div key={e} style={{ ...titular, fontSize: L.px(50), lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em", color: tinta, padding: `${50 * L.u}px ${22 * L.u}px ${44 * L.u}px`, borderRight: `${regla}px solid ${tinta}`, borderBottom: `${regla}px solid ${tinta}` }}>
            {e}
          </div>
        ))}
      </div>
    </Stage>
  );
};
