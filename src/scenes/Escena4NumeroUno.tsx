import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { BloqueCifra, BloqueTexto, BloqueImpacto, Turno } from "../components/Tarjeta";
import { Pasos } from "./Escena3Top";
import { useLayout } from "../layout";
import { c, titular } from "../theme";
import { guion, cabeceraDe } from "../guion";
import { salida, entradaSalida, suave } from "../curvas";

// Pausa dramática: pantalla negra con solo el puesto, que crece despacio; luego se levanta como un telón.
const Telon: React.FC<{ hasta: number; texto: string }> = ({ hasta, texto }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  if (frame > hasta + 12) return null;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: c("colors-text-black-static"),
        alignItems: "center",
        justifyContent: "center",
        translate: interpolate(frame, [hasta, hasta + 12], ["0% 0%", "0% -100%"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: entradaSalida }),
      }}
    >
      <div
        style={{
          ...titular,
          fontSize: 620 * L.u,
          lineHeight: 0.8,
          letterSpacing: "-0.05em",
          color: c("colors-status-brand-base"),
          scale: interpolate(frame, [0, hasta], [0.82, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave, output: "perceptual-scale" }),
          opacity: interpolate(frame, [6, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave }),
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

const Numeral: React.FC<{ puesto: number; desde: number }> = ({ puesto, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...titular,
        fontSize: 250 * L.u,
        lineHeight: 0.8,
        letterSpacing: "-0.05em",
        color: c("colors-text-black-static"),
        translate: `${interpolate(frame, [desde, desde + 16], [300 * L.u, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })}px 0px`,
      }}
    >
      {puesto}
    </div>
  );
};

// momentos: puesto, nombre, problema, solución, impacto (fotogramas dentro de la escena).
// momentos: puesto, nombre, problema, solución, impacto (fotogramas dentro de la escena).
export const Escena4NumeroUno: React.FC<{ momentos?: number[]; telon?: boolean; guias?: boolean }> = ({ momentos = [18, 0, 60, 200, 300], telon, guias }) => {
  const L = useLayout();
  const n = guion.numeroUno;
  const negro = c("colors-text-black-static");
  const [, nombreEn, problemaEn, solucionEn, impactoEn] = momentos;
  const r = guion.rotulos;
  const anchoNombre = L.contentW - 170 * L.u; // deja libre la columna del numeral
  return (
    <>
      <Stage bg="colors-status-brand-base" tinta="colors-text-black-static" cabecera={cabeceraDe(2)} ticker={`#${n.puesto}`} guias={guias}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingTop: 24 * L.u, flexShrink: 0 }}>
          <div style={{ width: anchoNombre, paddingBottom: 6 * L.u }}>
            <Fit text={n.nombre} width={anchoNombre} max={118 * L.u} color={negro} cascada={nombreEn} />
          </div>
          <Numeral puesto={n.puesto} desde={nombreEn - 4} />
        </div>
        <Pasos momentos={[problemaEn + 20, solucionEn, impactoEn]} color={negro} apagado={c("colors-status-brand-base-light")} />
        <div style={{ flex: 1, position: "relative", marginTop: 56 * L.u }}>
          <Turno hasta={solucionEn - 8}>
            <BloqueCifra rotulo={`${r.problema} · ${n.nota}`} cifra={n.problemaCifra} texto={n.problema} color={negro} rotuloColor={negro} desde={problemaEn + 24} contador />
          </Turno>
          <Turno hasta={impactoEn - 11}>
            <BloqueTexto rotulo={`${r.solucion} · ${n.secundario}`} texto={n.solucion} color={negro} rotuloColor={negro} desde={solucionEn - 3} />
          </Turno>
          <Turno>
            <BloqueImpacto rotulo={r.impacto} cifra={n.impactoCifra} texto={n.impacto} barra={n.barra} fondo="colors-text-black-static" tinta="colors-status-brand-base" desde={impactoEn - 4} />
          </Turno>
        </div>
      </Stage>
      {telon ? <Telon hasta={nombreEn - 14} texto={`#${n.puesto}`} /> : null}
    </>
  );
};
