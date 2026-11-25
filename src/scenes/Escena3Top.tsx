import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Sube } from "../components/Anim";
import { BloqueCifra, BloqueTexto, BloqueImpacto } from "../components/Tarjeta";
import { useLayout } from "../layout";
import { c, titular, acentoPorPuesto } from "../theme";
import { guion, ItemTop, cabeceraDe } from "../guion";
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
        right: -L.safe.right * 0.5,
        top: 14 * L.u,
        fontSize: 300 * L.u,
        lineHeight: 0.84,
        letterSpacing: "-0.05em",
        color,
        transformOrigin: "right top",
        scale: interpolate(frame, [0, 16], [2.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }),
        translate: `${interpolate(frame, [0, 14], [320 * L.u, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })}px ${interpolate(frame, [0, duracion], [0, -14 * L.u])}px`,
      }}
    >
      {puesto}
    </div>
  );
};

// Escalera de puestos, en horizontal: la casilla del puesto actual se rellena.
const Escalera: React.FC<{ puesto: number; color: string }> = ({ puesto, color }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const lado = 56 * L.u;
  return (
    <div style={{ display: "flex", gap: 12 * L.u }}>
      {[5, 4, 3, 2, 1].map((n, i) => (
        <div
          key={n}
          style={{
            width: n === puesto ? interpolate(frame, [6, 22], [lado, lado * 2.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }) : lado,
            height: lado,
            boxSizing: "border-box",
            border: `${4 * L.u}px solid ${n === puesto ? color : c("colors-background-secondary")}`,
            backgroundColor: n === puesto ? color : "transparent",
            opacity: interpolate(frame, [2 + i * 2, 8 + i * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        />
      ))}
    </div>
  );
};

// momentos: fotogramas (dentro de la escena) en que la voz dice puesto, nombre, problema, solución e impacto.
export const Escena3Top: React.FC<{ item: ItemTop; duracion?: number; momentos?: number[]; guias?: boolean }> = ({ item, duracion = 340, momentos = [4, 24, 60, 160, 230], guias }) => {
  const L = useLayout();
  const acento = c(acentoPorPuesto[item.puesto]);
  const tinta = c("colors-text-primary");
  const gris = c("colors-text-secondary");
  const [, nombreEn, problemaEn, solucionEn, impactoEn] = momentos;
  const r = guion.rotulos;
  return (
    <Stage bg="colors-background-base" cabecera={cabeceraDe(2)} ticker={`#${item.puesto}`} guias={guias}>
      <div style={{ height: 250 * L.u, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", left: 0, top: 30 * L.u }}>
          <Escalera puesto={item.puesto} color={acento} />
        </div>
        <Numeral puesto={item.puesto} color={acento} duracion={duracion} />
        <div style={{ position: "absolute", left: 0, bottom: 14 * L.u, width: L.contentW * 0.76 }}>
          <Sube desde={Math.max(8, nombreEn - 6)} dur={16}>
            <Fit text={item.nombre} width={L.contentW * 0.76} max={120 * L.u} color={tinta} />
          </Sube>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 14 * L.u, paddingBottom: 10 * L.u }}>
        <BloqueCifra rotulo={r.problema} cifra={item.problemaCifra} texto={item.problema} color={tinta} apoyoColor={gris} desde={problemaEn - 4} max={170 * L.u} />
        <BloqueTexto rotulo={r.solucion} texto={item.solucion} color={tinta} apoyoColor={gris} desde={solucionEn - 4} />
        <BloqueImpacto rotulo={r.impacto} cifra={item.impactoCifra} texto={item.impacto} fondo="colors-status-brand-base" tinta="colors-text-black-static" desde={impactoEn - 4} />
      </div>
    </Stage>
  );
};
