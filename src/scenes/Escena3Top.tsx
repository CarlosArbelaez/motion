import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { BloqueCifra, BloqueTexto, BloqueImpacto, Turno } from "../components/Tarjeta";
import { useLayout } from "../layout";
import { c, titular, acentoPorPuesto } from "../theme";
import { guion, ItemTop, cabeceraDe } from "../guion";
import { salida } from "../curvas";

// Numeral del puesto: entra desde la derecha. Vive en su propia columna, no pisa el nombre ni la cabecera.
const Numeral: React.FC<{ puesto: number; color: string }> = ({ puesto, color }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...titular,
        fontSize: 230 * L.u,
        lineHeight: 0.8,
        letterSpacing: "-0.05em",
        color,
        translate: `${interpolate(frame, [0, 14], [260 * L.u, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })}px 0px`,
      }}
    >
      {puesto}
    </div>
  );
};

// Tres pasos que marcan en cuál va la tarjeta: problema, solución, con IA.
export const Pasos: React.FC<{ momentos: number[]; color: string; apagado: string }> = ({ momentos, color, apagado }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 12 * L.u, marginTop: 30 * L.u }}>
      {momentos.map((m, i) => (
        <div key={i} style={{ flex: 1, height: 12 * L.u, backgroundColor: apagado, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: color, transformOrigin: "left center", scale: `${interpolate(frame, [m - 4, m + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} 1` }} />
        </div>
      ))}
    </div>
  );
};

// momentos: fotogramas (dentro de la escena) en que la voz dice puesto, nombre, problema, solución e impacto.
export const Escena3Top: React.FC<{ item: ItemTop; momentos?: number[]; guias?: boolean }> = ({ item, momentos = [4, 24, 60, 160, 230], guias }) => {
  const L = useLayout();
  const acento = c(acentoPorPuesto[item.puesto]);
  const tinta = c("colors-text-primary");
  const gris = c("colors-text-secondary");
  const [, nombreEn, problemaEn, solucionEn, impactoEn] = momentos;
  const r = guion.rotulos;
  const anchoNombre = L.contentW - 190 * L.u; // deja libre la columna del numeral
  return (
    <Stage bg="colors-background-base" cabecera={cabeceraDe(2)} ticker={`#${item.puesto}`} guias={guias}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 24 * L.u, flexShrink: 0 }}>
        <div style={{ width: anchoNombre, paddingBottom: 6 * L.u }}>
          <Fit text={item.nombre} width={anchoNombre} max={118 * L.u} color={tinta} cascada={Math.max(8, nombreEn - 6)} />
        </div>
        <Numeral puesto={item.puesto} color={acento} />
      </div>
      <Pasos momentos={[problemaEn, solucionEn, impactoEn]} color={acento} apagado={c("colors-background-secondary")} />
      {/* Un bloque a la vez: cada uno sale cuando la voz pasa al siguiente */}
      <div style={{ flex: 1, position: "relative", marginTop: 56 * L.u }}>
        <Turno hasta={solucionEn - 8}>
          <BloqueCifra rotulo={r.problema} cifra={item.problemaCifra} texto={item.problema} color={tinta} rotuloColor={gris} desde={problemaEn - 4} />
        </Turno>
        <Turno hasta={impactoEn - 11}>
          <BloqueTexto rotulo={r.solucion} texto={item.solucion} color={tinta} rotuloColor={gris} desde={solucionEn - 3} />
        </Turno>
        <Turno>
          <BloqueImpacto rotulo={r.impacto} cifra={item.impactoCifra} texto={item.impacto} barra={item.barra} fondo="colors-status-brand-base" tinta="colors-text-black-static" desde={impactoEn - 4} />
        </Turno>
      </div>
    </Stage>
  );
};
