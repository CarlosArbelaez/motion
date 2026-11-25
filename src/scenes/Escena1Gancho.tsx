import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Pulso, Etiqueta } from "../components/Piezas";
import { Sube, Barre } from "../components/Anim";
import { useLayout } from "../layout";
import { c, apoyo } from "../theme";
import { guion } from "../guion";
import { salida } from "../motion";

// El año: visible y enorme desde el primer fotograma; luego se asienta en su sitio.
const Anio: React.FC = () => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        transformOrigin: "left bottom",
        scale: interpolate(frame, [0, 16], [1.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }),
        translate: interpolate(frame, [0, 16], [`${-60 * L.u}px ${-180 * L.u}px`, "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }),
      }}
    >
      <Fit text={guion.titulo.anio} width={L.contentW} max={520 * L.u} color={c("colors-status-brand-base")} />
    </div>
  );
};

const LineaPulso: React.FC<{ desde: number }> = ({ desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <Pulso
      color="colors-status-brand-base"
      alto={150 * L.u}
      progreso={interpolate(frame, [desde, desde + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })}
    />
  );
};

export const Escena1Gancho: React.FC<{ guias?: boolean }> = ({ guias }) => {
  const L = useLayout();
  const { titulo, gancho, cabecera, etiquetas } = guion;
  return (
    <Stage bg="colors-background-base" cabecera={[guion.cierre.firma, cabecera.resumen]} cabeceraEntra={14} ticker={titulo.anio} guias={guias}>
      <div style={{ height: 44 * L.u }} />
      <Barre desde={20} dur={10} style={{ alignSelf: "flex-start" }}>
        <Etiqueta texto={etiquetas.marca} fondo="colors-text-primary" tinta="colors-text-black-static" size={52} />
      </Barre>
      <Sube desde={22} dur={16} style={{ marginTop: 28 * L.u }}>
        <Fit text={titulo.nombre} width={L.contentW} max={400 * L.u} color={c("colors-text-primary")} />
      </Sube>
      <LineaPulso desde={12} />
      <Anio />
      <Sube desde={46} dur={14} style={{ marginTop: 44 * L.u }}>
        <div style={{ ...apoyo, fontSize: L.px(50), lineHeight: 1.15, color: c("colors-text-primary") }}>{gancho.sub}</div>
      </Sube>
    </Stage>
  );
};
