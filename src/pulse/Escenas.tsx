import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Pulso, Franja } from "../components/Piezas";
import { Sube } from "../components/Anim";
import { BloqueCifra, BloqueTexto, Turno } from "../components/Tarjeta";
import { Pasos } from "../scenes/Escena3Top";
import { BounceIn, Burst, Marquee, Motion, TrackingIn } from "../motion";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { salida } from "../curvas";
import { GuionPill, Iniciativa } from "./datos";

// El logo va tal cual lo diseñaron (con su degradado): es la única excepción a "sin degradados".
const Logo: React.FC<{ ancho: number }> = ({ ancho }) => <Img src={staticFile("logo-brewai-dark.svg")} style={{ width: ancho, height: (ancho * 134) / 560, display: "block" }} />;

const LineaPulso: React.FC<{ desde: number; alto: number }> = ({ desde, alto }) => {
  const frame = useCurrentFrame();
  return <Pulso color="colors-status-brand-base" alto={alto} progreso={interpolate(frame, [desde, desde + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} />;
};

// Cortinilla de entrada: igual en toda la serie; solo cambia el pillar.
export const PillIntro: React.FC<{ guion: GuionPill }> = ({ guion }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage bg="colors-background-base" cabecera={[`${guion.marca} ${guion.serie}`, guion.anio]} cabeceraEntra={14} ticker={guion.serie}>
      <div style={{ marginTop: 34 * L.u }}>
        <Motion preset="scaleSoft" inDur={0.5} exit={false} style={{ transformOrigin: "left center" }}>
          <Logo ancho={470 * L.u} />
        </Motion>
      </div>
      <Sube desde={8} dur={16} style={{ marginTop: 26 * L.u }}>
        <Fit text={guion.serie} width={L.contentW} max={330 * L.u} color={c("colors-text-primary")} />
      </Sube>
      <LineaPulso desde={10} alto={120 * L.u} />
      <div style={{ transformOrigin: "left top", scale: interpolate(frame, [4, 22], [1.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }) }}>
        <Fit text={guion.anio} width={L.contentW} max={360 * L.u} color={c("colors-status-brand-base")} />
      </div>
      <div style={{ marginTop: 40 * L.u }}>
        <Motion preset="wipe" delay={26 / fps} inDur={0.45} exit={false}>
          <Franja fondo="colors-status-brand-base" style={{ paddingTop: 30 * L.u, paddingBottom: 24 * L.u }}>
            <Fit text={guion.pillar} width={L.contentW} max={120 * L.u} color={c("colors-text-black-static")} />
          </Franja>
        </Motion>
      </div>
    </Stage>
  );
};

// Impacto: la cifra principal enorme y, debajo, cada dato adicional en su propia línea.
const BloqueImpacto: React.FC<{ rotulo: string; it: Iniciativa; desde: number }> = ({ rotulo, it, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [desde - 6, desde + 8], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  const negro = c("colors-text-black-static");
  return (
    <div style={{ clipPath: `inset(0 ${p * 1.2 - 20}% 0 -20%)`, visibility: p >= 100 ? "hidden" : "visible" }}>
      <Franja fondo="colors-status-brand-base" style={{ paddingTop: 44 * L.u, paddingBottom: 48 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(48), lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.03em", color: negro }}>{rotulo}</div>
        <div style={{ position: "relative", marginTop: 40 * L.u }}>
          <BounceIn mode="up" distance={90 * L.u} bounce={0.3} duration={0.5} delay={desde / fps}>
            <Fit text={it.impactoCifra} width={L.contentW * 0.9} max={290 * L.u} color={negro} />
          </BounceIn>
          <div style={{ position: "absolute", right: -10 * L.u, top: -40 * L.u }}>
            <Burst at={(desde + 10) / fps} color={negro} size={150 * L.u} thickness={8 * L.u} count={9} />
          </div>
        </div>
        {it.impacto ? (
          <Sube desde={desde + 9} dur={14} style={{ marginTop: 22 * L.u }}>
            <div style={{ ...apoyo, fontSize: L.px(60), lineHeight: 1.1, color: negro }}>{it.impacto}</div>
          </Sube>
        ) : null}
        <div style={{ marginTop: 34 * L.u, borderTop: it.extras.length ? `${5 * L.u}px solid ${negro}` : undefined }}>
          {it.extras.map((x, i) => (
            <Sube key={x} desde={desde + 20 + i * 9} dur={14} style={{ marginTop: 26 * L.u }}>
              <div style={{ ...titular, fontSize: L.px(66), lineHeight: 1.04, letterSpacing: "-0.015em", color: negro, textWrap: "balance" }}>{x}</div>
            </Sube>
          ))}
        </div>
      </Franja>
    </div>
  );
};

// Una iniciativa: nombre y qué es, siempre visibles; debajo, un bloque a la vez (problema, solución, impacto).
// momentos: fotogramas en que la voz dice nombre, problema, solución e impacto.
export const PillIniciativa: React.FC<{ guion: GuionPill; indice: number; momentos: number[] }> = ({ guion, indice, momentos }) => {
  const L = useLayout();
  const it = guion.iniciativas[indice];
  const [nombreEn, problemaEn, solucionEn, impactoEn] = momentos;
  const tinta = c("colors-text-primary");
  const gris = c("colors-text-secondary");
  const acento = c("colors-status-brand-base");
  const n = guion.iniciativas.length;
  const r = guion.rotulos;
  return (
    <Stage bg="colors-background-base" cabecera={[`${guion.serie} ${guion.anio} · ${guion.pillar}`, `0${indice + 1} / 0${n}`]} ticker={it.nombre}>
      <div style={{ paddingTop: 22 * L.u, flexShrink: 0 }}>
        <Fit text={it.nombre} width={L.contentW} max={132 * L.u} color={tinta} cascada={Math.max(4, nombreEn - 2)} />
        <Sube desde={nombreEn + 10} dur={14} style={{ marginTop: 14 * L.u }}>
          <div style={{ ...apoyo, fontSize: L.px(46), lineHeight: 1.12, color: gris }}>{it.que}</div>
        </Sube>
      </div>
      <Pasos momentos={[problemaEn, solucionEn, impactoEn]} color={acento} apagado={c("colors-background-secondary")} />
      <div style={{ flex: 1, position: "relative", marginTop: 52 * L.u }}>
        <Turno hasta={solucionEn - 8}>
          <BloqueCifra rotulo={r.problema} cifra={it.problemaCifra} texto={it.problema} color={tinta} rotuloColor={gris} desde={problemaEn - 4} />
        </Turno>
        <Turno hasta={impactoEn - 11}>
          {/* Las frases largas bajan de tamaño para no invadir la franja de subtítulos */}
          <BloqueTexto rotulo={r.solucion} texto={it.solucion} color={tinta} rotuloColor={gris} desde={solucionEn - 3} size={it.solucion.length > 50 ? 100 : 124} />
        </Turno>
        <Turno>
          <BloqueImpacto rotulo={r.impacto} it={it} desde={impactoEn - 4} />
        </Turno>
      </div>
    </Stage>
  );
};

// Cortinilla de cierre: logo, línea de pulso y la cinta con el pillar.
export const PillCierre: React.FC<{ guion: GuionPill }> = ({ guion }) => {
  const L = useLayout();
  return (
    <AbsoluteFill style={{ backgroundColor: c("colors-background-base") }}>
      <div style={{ position: "absolute", top: L.safe.top, left: L.safe.left, width: L.contentW, height: L.contentH - 150 * L.u, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Motion preset="scaleSoft" inDur={0.6} exit={false}>
          <Logo ancho={680 * L.u} />
        </Motion>
        <div style={{ alignSelf: "stretch", marginTop: 30 * L.u }}>
          <LineaPulso desde={6} alto={130 * L.u} />
        </div>
        <div style={{ ...titular, fontSize: L.px(70), textTransform: "uppercase", color: c("colors-text-primary"), marginTop: 24 * L.u }}>
          <TrackingIn delay={0.3} duration={0.9} from={0.5}>
            {`${guion.serie} ${guion.anio}`}
          </TrackingIn>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: L.safe.bottom + L.subtituloAlto + 16 * L.u }}>
        <Motion preset="wipe" delay={0.3} inDur={0.5} exit={false}>
          <Franja fondo="colors-status-brand-base" style={{ marginLeft: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 20 * L.u, paddingBottom: 16 * L.u }}>
            <Marquee secondsPerLoop={8} gap={28 * L.u}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} style={{ ...titular, fontSize: L.px(56), lineHeight: 1, letterSpacing: "-0.01em", textTransform: "uppercase", color: c("colors-text-black-static") }}>
                  {`${guion.pillar} ·`}
                </span>
              ))}
            </Marquee>
          </Franja>
        </Motion>
      </div>
    </AbsoluteFill>
  );
};
