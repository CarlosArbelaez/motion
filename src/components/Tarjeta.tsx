import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Fit } from "./Fit";
import { Sube } from "./Anim";
import { Franja } from "./Piezas";
import { useLayout } from "../layout";
import { c, Token, titular, apoyo } from "../theme";
import { Burst } from "../motion";
import { salida, suave } from "../curvas";

// Rótulo de bloque: Problema · Solución · Con IA. En Avantt para que pese y se lea en pantalla pequeña.
export const Rotulo: React.FC<{ texto: string; color: string; desde: number }> = ({ texto, color, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 * L.u, opacity: interpolate(frame, [desde, desde + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave }) }}>
      <div style={{ ...titular, fontSize: L.px(40), lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.03em", color, whiteSpace: "nowrap" }}>{texto}</div>
      <div style={{ flex: 1, height: 4 * L.u, backgroundColor: color, transformOrigin: "left center", scale: `${interpolate(frame, [desde, desde + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} 1` }} />
    </div>
  );
};

// Bloque con cifra + una línea de texto (problema). La cifra y el texto van apilados, nunca lado a lado.
export const BloqueCifra: React.FC<{ rotulo: string; cifra: string; texto: string; color: string; rotuloColor: string; desde: number; max: number; contador?: boolean }> = ({ rotulo, cifra, texto, color, rotuloColor, desde, max, contador }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  let mostrado = cifra;
  const m = cifra.match(/^([\d.,]+)(.*)$/);
  if (contador && m) {
    const final = parseFloat(m[1].replace(".", "").replace(",", "."));
    const dec = m[1].includes(",") ? m[1].split(",")[1].length : 0;
    const v = interpolate(frame, [desde + 4, desde + 30], [0, final], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
    mostrado = `${v.toFixed(dec).replace(".", ",")}${m[2]}`;
  }
  return (
    <div>
      <Rotulo texto={rotulo} color={rotuloColor} desde={desde - 4} />
      <Sube desde={desde} dur={14} style={{ marginTop: 20 * L.u }}>
        <Fit text={mostrado} medir={cifra} width={L.contentW} max={max} color={color} style={contador ? { fontVariantNumeric: "tabular-nums" } : undefined} />
      </Sube>
      <Sube desde={desde + 6} dur={12} style={{ marginTop: 16 * L.u }}>
        <div style={{ ...apoyo, fontSize: L.px(46), lineHeight: 1.15, color }}>{texto}</div>
      </Sube>
    </div>
  );
};

// Bloque de texto (solución).
export const BloqueTexto: React.FC<{ rotulo: string; texto: string; color: string; rotuloColor: string; desde: number }> = ({ rotulo, texto, color, rotuloColor, desde }) => {
  const L = useLayout();
  return (
    <div>
      <Rotulo texto={rotulo} color={rotuloColor} desde={desde - 4} />
      <Sube desde={desde} dur={14} style={{ marginTop: 20 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(52), lineHeight: 1.08, letterSpacing: "-0.01em", color, textWrap: "balance" }}>{texto}</div>
      </Sube>
    </div>
  );
};

export type Barra = { titulo: string; de: string; a: string; resto: number };

// Franja a sangre con el impacto esperado. Todo apilado: rótulo, cifra, frase y la barra hoy → con IA.
export const BloqueImpacto: React.FC<{ rotulo: string; cifra: string; texto: string; barra: Barra; fondo: Token; tinta: Token; desde: number }> = ({ rotulo, cifra, texto, barra, fondo, tinta, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [desde - 6, desde + 8], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  // La barra arranca llena (hoy) y se vacía hasta lo que queda con IA.
  const ancho = interpolate(frame, [desde + 18, desde + 48], [100, barra.resto], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  const llegada = interpolate(frame, [desde + 32, desde + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave });
  const visible = interpolate(frame, [desde + 12, desde + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave });
  const color = c(tinta);
  return (
    <div style={{ clipPath: `inset(0 ${p * 1.2 - 20}% 0 -20%)`, visibility: p >= 100 ? "hidden" : "visible" }}>
      <Franja fondo={fondo} style={{ paddingTop: 22 * L.u, paddingBottom: 22 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(40), lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.03em", color }}>{rotulo}</div>
        <div style={{ position: "relative" }}>
          <Sube desde={desde} dur={14} style={{ marginTop: 18 * L.u }}>
            <Fit text={cifra} width={L.contentW * 0.8} max={124 * L.u} color={color} />
          </Sube>
          {/* Destello al aterrizar la cifra: acento, no decoración permanente */}
          <div style={{ position: "absolute", right: 10 * L.u, top: -6 * L.u }}>
            <Burst at={(desde + 10) / fps} color={color} size={150 * L.u} thickness={7 * L.u} count={9} />
          </div>
        </div>
        <Sube desde={desde + 8} dur={12} style={{ marginTop: 14 * L.u }}>
          <div style={{ ...apoyo, fontSize: L.px(46), lineHeight: 1.12, color }}>{texto}</div>
        </Sube>
        <div style={{ marginTop: 22 * L.u, height: 28 * L.u, boxSizing: "border-box", border: `${4 * L.u}px solid ${color}`, position: "relative", opacity: visible }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: `${ancho}%`, backgroundColor: color }} />
        </div>
        <div style={{ ...apoyo, display: "flex", justifyContent: "space-between", fontSize: L.px(40), lineHeight: 1, color, marginTop: 12 * L.u, opacity: visible }}>
          <span>{barra.titulo}</span>
          <span>
            {barra.de}
            <span style={{ opacity: llegada }}> → {barra.a}</span>
          </span>
        </div>
      </Franja>
    </div>
  );
};
