import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular, apoyo, acentoPorPuesto } from "../theme";
import { guion, ItemTop } from "../guion";
import { salida } from "../motion";

// Numeral gigante: entra desde la derecha y deriva despacio durante la escena.
const Numeral: React.FC<{ puesto: number; color: string; duracion: number }> = ({ puesto, color, duracion }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...titular,
        position: "absolute",
        right: -L.safe.right * 0.6,
        top: 18 * L.u,
        fontSize: 500 * L.u,
        lineHeight: 0.84,
        letterSpacing: "-0.05em",
        color,
        transformOrigin: "right top",
        scale: interpolate(frame, [0, 16], [1.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }),
        translate: `${interpolate(frame, [0, 14], [320 * L.u, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })}px ${interpolate(frame, [0, duracion], [0, -26 * L.u])}px`,
      }}
    >
      {puesto}
    </div>
  );
};

// Escalera de puestos: la casilla del puesto actual se estira.
const Escalera: React.FC<{ puesto: number; color: string }> = ({ puesto, color }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const lado = 64 * L.u;
  const tinta = c("colors-background-secondary");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 * L.u }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          style={{
            width: n === puesto ? interpolate(frame, [6, 22], [lado, lado * 2.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }) : lado,
            height: lado,
            boxSizing: "border-box",
            border: `${4 * L.u}px solid ${n === puesto ? color : tinta}`,
            backgroundColor: n === puesto ? color : "transparent",
            opacity: interpolate(frame, [2 + (5 - n) * 2, 8 + (5 - n) * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        />
      ))}
    </div>
  );
};

const Regla: React.FC<{ desde: number; color: string }> = ({ desde, color }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return <div style={{ height: 4 * L.u, backgroundColor: color, transformOrigin: "left center", scale: `${interpolate(frame, [desde, desde + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} 1` }} />;
};

// La cifra: entra con máscara y respira muy despacio hasta el corte.
const Cifra: React.FC<{ texto: string; desde: number; duracion: number }> = ({ texto, desde, duracion }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <Sube desde={desde} dur={16} style={{ paddingTop: 22 * L.u, marginRight: -L.safe.right }}>
      <div style={{ transformOrigin: "left bottom", scale: interpolate(frame, [desde, duracion], [1, 1.02], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <Fit text={texto} width={L.contentW * 0.95} max={300 * L.u} color={c("colors-status-brand-base")} />
      </div>
    </Sube>
  );
};

export const Escena3Top: React.FC<{ item: ItemTop; duracion?: number; nombreEn?: number; cifraEn?: number; guias?: boolean }> = ({ item, duracion = 170, nombreEn = 14, cifraEn = 66, guias }) => {
  const L = useLayout();
  const acento = c(acentoPorPuesto[item.puesto]);
  const tinta = c("colors-text-primary");
  return (
    <Stage bg="colors-background-base" cabecera={[guion.cabecera.top, `#${item.puesto}`]} ticker={`#${item.puesto}`} guias={guias}>
      <div style={{ height: 420 * L.u, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", left: 0, top: 36 * L.u }}>
          <Escalera puesto={item.puesto} color={acento} />
        </div>
        <Numeral puesto={item.puesto} color={acento} duracion={duracion} />
      </div>
      <Regla desde={nombreEn - 4} color={tinta} />
      <div style={{ paddingTop: 26 * L.u }}>
        <Sube desde={nombreEn} dur={16}>
          <Fit text={item.nombre} width={L.contentW} max={170 * L.u} color={tinta} />
        </Sube>
        <Sube desde={nombreEn + 8} dur={14} style={{ marginTop: 18 * L.u }}>
          <div style={{ ...apoyo, fontSize: L.px(46), lineHeight: 1.15, color: c("colors-text-secondary") }}>{item.linea}</div>
        </Sube>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 12 * L.u }}>
        <Regla desde={cifraEn - 6} color={c("colors-status-brand-base")} />
        <Cifra texto={item.cifra} desde={cifraEn} duracion={duracion} />
        <Sube desde={cifraEn + 8} dur={14} style={{ marginTop: 18 * L.u }}>
          <div style={{ ...titular, fontSize: L.px(50), lineHeight: 1, textTransform: "uppercase", color: tinta }}>{item.unidad}</div>
        </Sube>
      </div>
    </Stage>
  );
};
