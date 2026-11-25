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
        <Sube desde={Math.max(8, nombreEn - 6)} dur={16} style={{ width: anchoNombre, paddingBottom: 6 * L.u }}>
          <Fit text={item.nombre} width={anchoNombre} max={118 * L.u} color={tinta} />
        </Sube>
        <Numeral puesto={item.puesto} color={acento} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 40 * L.u, paddingBottom: 36 * L.u }}>
        <BloqueCifra rotulo={r.problema} cifra={item.problemaCifra} texto={item.problema} color={tinta} rotuloColor={gris} desde={problemaEn - 4} max={104 * L.u} />
        <BloqueTexto rotulo={r.solucion} texto={item.solucion} color={tinta} rotuloColor={gris} desde={solucionEn - 4} />
        <BloqueImpacto rotulo={r.impacto} cifra={item.impactoCifra} texto={item.impacto} barra={item.barra} fondo="colors-status-brand-base" tinta="colors-text-black-static" desde={impactoEn - 4} />
      </div>
    </Stage>
  );
};
