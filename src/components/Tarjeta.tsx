import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Fit } from "./Fit";
import { Sube } from "./Anim";
import { Franja } from "./Piezas";
import { useLayout } from "../layout";
import { c, Token, titular, apoyo } from "../theme";
import { salida } from "../motion";

// Rótulo de bloque: Problema · Solución · Impacto esperado.
export const Rotulo: React.FC<{ texto: string; color: string; desde: number }> = ({ texto, color, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 * L.u, opacity: interpolate(frame, [desde, desde + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      <div style={{ width: 20 * L.u, height: 20 * L.u, backgroundColor: color }} />
      <div style={{ ...apoyo, fontSize: L.px(40), lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.04em", color }}>{texto}</div>
      <div style={{ flex: 1, height: 4 * L.u, backgroundColor: color, transformOrigin: "left center", scale: `${interpolate(frame, [desde, desde + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} 1` }} />
    </div>
  );
};

// Bloque con cifra grande + texto (problema).
export const BloqueCifra: React.FC<{ rotulo: string; cifra: string; texto: string; nota?: string; color: string; apoyoColor: string; desde: number; max: number; contador?: boolean }> = ({ rotulo, cifra, texto, nota, color, apoyoColor, desde, max, contador }) => {
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
      <Rotulo texto={rotulo} color={apoyoColor} desde={desde - 4} />
      <Sube desde={desde} dur={14} style={{ marginTop: 14 * L.u }}>
        <Fit text={mostrado} medir={cifra} width={L.contentW * 0.9} max={max} color={color} style={contador ? { fontVariantNumeric: "tabular-nums" } : undefined} />
      </Sube>
      <Sube desde={desde + 6} dur={12} style={{ marginTop: 12 * L.u }}>
        <div style={{ ...apoyo, fontSize: L.px(46), lineHeight: 1.12, color }}>{texto}</div>
      </Sube>
      {nota ? (
        <Sube desde={desde + 12} dur={12} style={{ marginTop: 6 * L.u }}>
          <div style={{ ...apoyo, fontSize: L.px(40), lineHeight: 1.1, color: apoyoColor }}>{nota}</div>
        </Sube>
      ) : null}
    </div>
  );
};

// Bloque de texto (solución).
export const BloqueTexto: React.FC<{ rotulo: string; texto: string; color: string; apoyoColor: string; desde: number }> = ({ rotulo, texto, color, apoyoColor, desde }) => {
  const L = useLayout();
  return (
    <div>
      <Rotulo texto={rotulo} color={apoyoColor} desde={desde - 4} />
      <Sube desde={desde} dur={14} style={{ marginTop: 14 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(54), lineHeight: 1.02, letterSpacing: "-0.015em", color, textWrap: "balance" }}>{texto}</div>
      </Sube>
    </div>
  );
};

export type Barra = { titulo: string; de: string; a: string; resto: number };

// Franja a sangre con el impacto esperado: cifra, frase y una barra que pasa de "hoy" a "con IA".
export const BloqueImpacto: React.FC<{ rotulo: string; cifra: string; texto: string; barra: Barra; fondo: Token; tinta: Token; desde: number }> = ({ rotulo, cifra, texto, barra, fondo, tinta, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde - 6, desde + 8], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  // La barra arranca llena (hoy) y se vacía hasta lo que queda con IA.
  const ancho = interpolate(frame, [desde + 16, desde + 46], [100, barra.resto], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  const llegada = interpolate(frame, [desde + 30, desde + 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const color = c(tinta);
  return (
    <div style={{ clipPath: `inset(0 ${p * 1.2 - 20}% 0 -20%)`, visibility: p >= 100 ? "hidden" : "visible" }}>
      <Franja fondo={fondo} style={{ paddingTop: 20 * L.u, paddingBottom: 18 * L.u }}>
        <div style={{ ...apoyo, fontSize: L.px(40), lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.04em", color }}>{rotulo}</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 22 * L.u, marginTop: 8 * L.u }}>
          <Sube desde={desde} dur={14}>
            <div style={{ scale: interpolate(frame, [desde, desde + 16], [1.25, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }), transformOrigin: "left bottom" }}>
              <Fit text={cifra} width={L.contentW * 0.6} max={170 * L.u} color={color} />
            </div>
          </Sube>
          <Sube desde={desde + 8} dur={12} style={{ flex: 1, paddingBottom: 8 * L.u }}>
            <div style={{ ...titular, fontSize: L.px(42), lineHeight: 1, letterSpacing: "-0.01em", textTransform: "uppercase", color }}>{texto}</div>
          </Sube>
        </div>
        <div style={{ marginTop: 14 * L.u, height: 30 * L.u, boxSizing: "border-box", border: `${4 * L.u}px solid ${color}`, position: "relative", opacity: interpolate(frame, [desde + 10, desde + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: `${ancho}%`, backgroundColor: color }} />
        </div>
        <div style={{ ...apoyo, display: "flex", justifyContent: "space-between", fontSize: L.px(40), lineHeight: 1, color, marginTop: 10 * L.u, opacity: interpolate(frame, [desde + 10, desde + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
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
