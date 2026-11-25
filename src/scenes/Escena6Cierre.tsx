import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Pulso, Franja } from "../components/Piezas";
import { Sube } from "../components/Anim";
import { Marquee, Motion, TrackingIn } from "../motion";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion, cabeceraDe } from "../guion";
import { salida, escape } from "../curvas";

// Mismo gesto del "2026" inicial: el año entra enorme y se asienta.
const Anio: React.FC<{ texto: string }> = ({ texto }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div style={{ marginTop: 40 * L.u, transformOrigin: "left top", scale: interpolate(frame, [0, 16], [1.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }) }}>
      <Fit text={texto} width={L.contentW} max={520 * L.u} color={c("colors-status-brand-base")} />
    </div>
  );
};

const LineaPulso: React.FC<{ desde: number; alto: number }> = ({ desde, alto }) => {
  const frame = useCurrentFrame();
  return <Pulso color="colors-status-brand-base" alto={alto} progreso={interpolate(frame, [desde, desde + 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} />;
};

// Tiempo 1: la promesa del año que viene.
const Promesa: React.FC<{ fraseEn: number; hasta: number }> = ({ fraseEn, hasta }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const k = guion.cierre;
  const fuera = interpolate(frame, [hasta - 8, hasta], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: escape });
  if (frame > hasta) return null;
  return (
    <div style={{ translate: `0px ${-fuera * 160 * L.u}px`, opacity: 1 - fuera }}>
      <Anio texto={k.anio} />
      <div style={{ marginTop: 34 * L.u }}>
        {k.fraseLineas.map((l, i) => (
          <Sube key={l} desde={fraseEn + i * 7} dur={14}>
            <Fit text={l} width={L.contentW} max={150 * L.u} color={c("colors-text-primary")} />
          </Sube>
        ))}
      </div>
    </div>
  );
};

// Tiempo 2: la firma. Logo centrado, línea de pulso y cinta con el nombre del resumen.
const Firma: React.FC = () => {
  const L = useLayout();
  const k = guion.cierre;
  const { titulo } = guion;
  const ancho = 620 * L.u;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: L.safe.top + 72 * L.u, left: L.safe.left, width: L.contentW, height: L.contentH - 72 * L.u - 150 * L.u, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Motion preset="scaleSoft" inDur={0.6} exit={false}>
          <Img src={staticFile("logo-brewai.png")} style={{ width: ancho, height: (ancho * 145) / 571, display: "block" }} />
        </Motion>
        <div style={{ alignSelf: "stretch", marginTop: 30 * L.u }}>
          <LineaPulso desde={6} alto={130 * L.u} />
        </div>
        <div style={{ ...apoyo, fontSize: L.px(46), textTransform: "uppercase", color: c("colors-text-primary"), marginTop: 24 * L.u }}>
          <TrackingIn delay={0.35} duration={0.9} from={0.5}>
            {k.firma}
          </TrackingIn>
        </div>
      </div>
      {/* Cinta de cierre: a sangre, por encima de la franja de subtítulos */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: L.safe.bottom + L.subtituloAlto + 16 * L.u }}>
        <Motion preset="wipe" delay={0.3} inDur={0.5} exit={false}>
          <Franja fondo="colors-status-brand-base" style={{ marginLeft: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 20 * L.u, paddingBottom: 16 * L.u }}>
            <Marquee secondsPerLoop={8} gap={28 * L.u}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} style={{ ...titular, fontSize: L.px(56), lineHeight: 1, letterSpacing: "-0.01em", textTransform: "uppercase", color: c("colors-text-black-static") }}>
                  {`${titulo.marca} ${titulo.nombre} ${titulo.anio} ·`}
                </span>
              ))}
            </Marquee>
          </Franja>
        </Motion>
      </div>
    </AbsoluteFill>
  );
};

// Cierre en dos tiempos: la promesa ("2027: del diseño a producción") y la firma del equipo.
export const Escena6Cierre: React.FC<{ fraseEn?: number; firmaEn?: number; guias?: boolean }> = ({ fraseEn = 30, firmaEn = 96, guias }) => {
  const cambio = firmaEn - 4;
  return (
    <>
      <Stage bg="colors-background-base" cabecera={cabeceraDe(4)} ticker={guion.cierre.anio} guias={guias}>
        <Promesa fraseEn={fraseEn} hasta={cambio} />
      </Stage>
      <Sequence from={cambio} layout="none">
        <Firma />
      </Sequence>
    </>
  );
};
