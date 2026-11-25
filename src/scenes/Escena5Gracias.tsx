import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";
import { salida } from "../motion";

const Palabra: React.FC<{ texto: string }> = ({ texto }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div style={{ marginTop: 44 * L.u, transformOrigin: "left top", scale: interpolate(frame, [0, 16], [1.45, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }) }}>
      <Fit text={texto} width={L.contentW} max={300 * L.u} color={c("colors-status-brand-base")} />
    </div>
  );
};

// Retícula de equipos: la tabla se descubre de arriba abajo y cada nombre sube en su celda.
const Tabla: React.FC<{ equipos: string[]; desde: number }> = ({ equipos, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const tinta = c("colors-text-primary");
  const regla = 4 * L.u;
  const p = interpolate(frame, [desde, desde + 22], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: 44 * L.u, borderTop: `${regla}px solid ${tinta}`, borderLeft: `${regla}px solid ${tinta}`, clipPath: `inset(0 0 ${p}% 0)` }}>
      {equipos.map((e, i) => (
        <div key={e} style={{ padding: `${50 * L.u}px ${22 * L.u}px ${44 * L.u}px`, borderRight: `${regla}px solid ${tinta}`, borderBottom: `${regla}px solid ${tinta}` }}>
          <Sube desde={desde + 4 + i * 4} dur={12}>
            <div style={{ ...titular, fontSize: L.px(50), lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em", color: tinta, whiteSpace: "nowrap" }}>{e}</div>
          </Sube>
        </div>
      ))}
    </div>
  );
};

export const Escena5Gracias: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const g = guion.gracias;
  return (
    <Stage bg="colors-background-primary" cabecera={[guion.cabecera.marca, `${g.equipos.length} ${guion.cabecera.equipos}`]} ticker={g.palabra} guias={guias}>
      <Palabra texto={g.palabra} />
      <Sube desde={12} dur={14} style={{ marginTop: 26 * L.u }}>
        <div style={{ ...apoyo, fontSize: L.px(52), lineHeight: 1.12, color: c("colors-text-primary") }}>{g.frase}</div>
      </Sube>
      <Tabla equipos={g.equipos} desde={22} />
    </Stage>
  );
};
