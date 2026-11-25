import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Etiqueta } from "../components/Piezas";
import { Sube } from "../components/Anim";
import { BloqueCifra, BloqueTexto, BloqueImpacto } from "../components/Tarjeta";
import { useLayout } from "../layout";
import { c, titular } from "../theme";
import { guion, cabeceraDe } from "../guion";
import { salida, entradaSalida } from "../motion";

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
          scale: interpolate(frame, [0, hasta], [0.82, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp", output: "perceptual-scale" }),
          opacity: interpolate(frame, [6, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

const Numeral: React.FC<{ puesto: number; desde: number; duracion: number }> = ({ puesto, desde, duracion }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...titular,
        position: "absolute",
        right: -L.safe.right * 0.3,
        top: 14 * L.u,
        fontSize: 360 * L.u,
        lineHeight: 0.84,
        letterSpacing: "-0.05em",
        color: c("colors-text-black-static"),
        translate: `${interpolate(frame, [desde, desde + 16], [360 * L.u, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })}px ${interpolate(frame, [desde, duracion], [0, -16 * L.u], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`,
      }}
    >
      {puesto}
    </div>
  );
};

const Sello: React.FC<{ texto: string; desde: number }> = ({ texto, desde }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        transformOrigin: "left center",
        scale: interpolate(frame, [desde, desde + 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }),
        rotate: interpolate(frame, [desde, desde + 9], ["8deg", "0deg"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }),
      }}
    >
      <Etiqueta texto={texto} fondo="colors-text-black-static" tinta="colors-status-brand-base" giro={-4} size={48} />
    </div>
  );
};

// momentos: puesto, nombre, problema, solución, impacto (fotogramas dentro de la escena).
export const Escena4NumeroUno: React.FC<{ duracion?: number; momentos?: number[]; telon?: boolean; guias?: boolean }> = ({ duracion = 470, momentos = [18, 0, 60, 200, 300], telon, guias }) => {
  const L = useLayout();
  const n = guion.numeroUno;
  const negro = c("colors-text-black-static");
  const [, nombreEn, problemaEn, solucionEn, impactoEn] = momentos;
  const r = guion.rotulos;
  return (
    <>
      <Stage bg="colors-status-brand-base" tinta="colors-text-black-static" cabecera={cabeceraDe(2)} ticker={`#${n.puesto}`} guias={guias}>
        <div style={{ height: 290 * L.u, position: "relative", flexShrink: 0 }}>
          <Numeral puesto={n.puesto} desde={nombreEn - 4} duracion={duracion} />
          <div style={{ position: "absolute", left: 0, bottom: 10 * L.u }}>
            {n.nombreLineas.map((l, i) => (
              <Sube key={l} desde={nombreEn + i * 6} dur={14}>
                <Fit text={l} width={L.contentW - 260 * L.u} max={150 * L.u} color={negro} />
              </Sube>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 10 * L.u, paddingBottom: 10 * L.u }}>
          <BloqueCifra rotulo={r.problema} cifra={n.problemaCifra} texto={n.problema} nota={n.nota} color={negro} apoyoColor={negro} desde={problemaEn + 24} max={165 * L.u} contador />
          <div style={{ position: "relative" }}>
            <BloqueTexto rotulo={r.solucion} texto={n.solucion} color={negro} apoyoColor={negro} desde={solucionEn - 4} />
            <div style={{ position: "absolute", right: 0, bottom: -18 * L.u }}>
              <Sello texto={n.secundario} desde={solucionEn + 50} />
            </div>
          </div>
          <BloqueImpacto rotulo={r.impacto} cifra={n.impactoCifra} texto={n.impacto} barra={n.barra} fondo="colors-text-black-static" tinta="colors-status-brand-base" desde={impactoEn - 4} />
        </div>
      </Stage>
      {telon ? <Telon hasta={nombreEn - 14} texto={`#${n.puesto}`} /> : null}
    </>
  );
};
