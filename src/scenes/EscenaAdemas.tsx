import React from "react";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular } from "../theme";
import { guion } from "../guion";

// Ráfaga: los seis nombres entran uno tras otro y quedan apilados en una lista con reglas.
export const EscenaAdemas: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const a = guion.ademas;
  const tinta = c("colors-text-primary");
  const regla = 4 * L.u;
  return (
    <Stage bg="colors-background-primary" cabecera={[guion.cabecera.marca, `+${a.nombres.length}`]} ticker={`+${a.nombres.length}`} guias={guias}>
      <Sube desde={2} dur={12} style={{ marginTop: 40 * L.u, marginBottom: 30 * L.u }}>
        <Fit text={a.titulo} width={L.contentW} max={190 * L.u} color={c("colors-status-brand-base")} />
      </Sube>
      <div style={{ borderTop: `${regla}px solid ${tinta}` }}>
        {a.nombres.map((n, i) => (
          <div key={n} style={{ borderBottom: `${regla}px solid ${tinta}`, padding: `${28 * L.u}px 0 ${22 * L.u}px` }}>
            <Sube desde={8 + i * 6} dur={10}>
              <div style={{ ...titular, fontSize: L.px(66), lineHeight: 1, letterSpacing: "-0.02em", textTransform: "uppercase", color: tinta }}>{n}</div>
            </Sube>
          </div>
        ))}
      </div>
    </Stage>
  );
};
