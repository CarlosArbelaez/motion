import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Franja, Etiqueta } from "../components/Piezas";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion } from "../guion";
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
        right: -L.safe.right * 0.4,
        top: 24 * L.u,
        fontSize: 560 * L.u,
        lineHeight: 0.84,
        letterSpacing: "-0.05em",
        color: c("colors-text-black-static"),
        translate: `${interpolate(frame, [desde, desde + 16], [360 * L.u, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })}px ${interpolate(frame, [desde, duracion], [0, -22 * L.u], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`,
      }}
    >
      {puesto}
    </div>
  );
};

// La cifra de la número uno cuenta hasta su valor.
const CifraContador: React.FC<{ cifra: string; desde: number }> = ({ cifra, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const m = cifra.match(/^([\d.,]+)(.*)$/);
  const final = m ? parseFloat(m[1].replace(".", "").replace(",", ".")) : 0;
  const decimales = m && m[1].includes(",") ? m[1].split(",")[1].length : 0;
  const v = interpolate(frame, [desde, desde + 30], [0, final], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  const texto = m ? `${v.toFixed(decimales).replace(".", ",")}${m[2]}` : cifra;
  return <Fit text={texto} medir={cifra} width={L.contentW} max={330 * L.u} color={c("colors-status-brand-base")} style={{ fontVariantNumeric: "tabular-nums" }} />;
};

const FranjaCifra: React.FC<{ desde: number; children: React.ReactNode }> = ({ desde, children }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + 14], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  return (
    <div style={{ clipPath: `inset(0 -10% 0 ${p}%)` }}>
      <Franja fondo="colors-text-black-static" style={{ paddingTop: 34 * L.u, paddingBottom: 22 * L.u }}>
        {children}
      </Franja>
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
      <Etiqueta texto={texto} fondo="colors-text-black-static" tinta="colors-status-brand-base" giro={-5} size={56} />
    </div>
  );
};

export const Escena4NumeroUno: React.FC<{ duracion?: number; nombreEn?: number; cifraEn?: number; guias?: boolean }> = ({ duracion = 259, nombreEn = 0, cifraEn = 0, guias }) => {
  const L = useLayout();
  const n = guion.numeroUno;
  const negro = c("colors-text-black-static");
  const anchoNombre = L.contentW - 300 * L.u;
  return (
    <>
      <Stage bg="colors-status-brand-base" tinta="colors-text-black-static" cabecera={[guion.cabecera.numeroUno, `#${n.puesto}`]} ticker={`#${n.puesto}`} guias={guias}>
        <div style={{ height: 470 * L.u, position: "relative", flexShrink: 0 }}>
          <Numeral puesto={n.puesto} desde={nombreEn} duracion={duracion} />
          <div style={{ position: "absolute", left: 0, top: 40 * L.u }}>
            <Sello texto={n.secundario} desde={cifraEn + 50} />
          </div>
          <div style={{ position: "absolute", left: 0, bottom: 20 * L.u }}>
            {n.nombreLineas.map((l, i) => (
              <Sube key={l} desde={nombreEn + 4 + i * 6} dur={14}>
                <Fit text={l} width={anchoNombre} max={200 * L.u} color={negro} />
              </Sube>
            ))}
          </div>
        </div>
        <Sube desde={nombreEn + 20} dur={14} style={{ marginBottom: 22 * L.u }}>
          <div style={{ ...apoyo, fontSize: L.px(46), lineHeight: 1.1, color: negro }}>{n.linea}</div>
        </Sube>
        <FranjaCifra desde={cifraEn - 8}>
          <CifraContador cifra={n.cifra} desde={cifraEn} />
        </FranjaCifra>
        <Sube desde={cifraEn + 14} dur={14} style={{ marginTop: 26 * L.u }}>
          <div style={{ ...titular, fontSize: L.px(56), lineHeight: 1, textTransform: "uppercase", letterSpacing: "-0.01em", color: negro }}>{n.unidad}</div>
        </Sube>
        <Sube desde={cifraEn + 24} dur={12} style={{ marginTop: 16 * L.u }}>
          <div style={{ ...apoyo, fontSize: L.px(42), color: negro }}>{n.nota}</div>
        </Sube>
      </Stage>
      {nombreEn > 0 ? <Telon hasta={nombreEn - 10} texto={`#${n.puesto}`} /> : null}
    </>
  );
};
