import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Fit } from "./Fit";
import { Sube } from "./Anim";
import { Franja } from "./Piezas";
import { BounceIn, Burst } from "../motion";
import { useLayout } from "../layout";
import { c, Token, titular, apoyo } from "../theme";
import { salida, suave, escape } from "../curvas";

// Un solo bloque en pantalla a la vez: cada "turno" ocupa toda la zona, y sale hacia arriba
// cuando la voz pasa al siguiente. Así cada cuadro tiene un único mensaje que leer.
export const Turno: React.FC<{ hasta?: number; children: React.ReactNode }> = ({ hasta, children }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  if (hasta !== undefined && frame >= hasta) return null;
  const fuera = hasta === undefined ? 0 : interpolate(frame, [hasta - 6, hasta], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: escape });
  return <div style={{ position: "absolute", top: 0, left: 0, right: 0, translate: `0px ${-fuera * 90 * L.u}px`, opacity: 1 - fuera }}>{children}</div>;
};

// Rótulo del bloque: Problema · Solución · Con IA.
export const Rotulo: React.FC<{ texto: string; color: string; desde: number }> = ({ texto, color, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 * L.u, opacity: interpolate(frame, [desde, desde + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave }) }}>
      <div style={{ ...titular, fontSize: L.px(48), lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.03em", color, whiteSpace: "nowrap" }}>{texto}</div>
      <div style={{ flex: 1, height: 4 * L.u, backgroundColor: color, transformOrigin: "left center", scale: `${interpolate(frame, [desde, desde + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })} 1` }} />
    </div>
  );
};

// Problema: una cifra enorme y una sola línea debajo.
export const BloqueCifra: React.FC<{ rotulo: string; cifra: string; texto: string; color: string; rotuloColor: string; desde: number; contador?: boolean }> = ({ rotulo, cifra, texto, color, rotuloColor, desde, contador }) => {
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
      <Sube desde={desde} dur={16} style={{ marginTop: 44 * L.u }}>
        <Fit text={mostrado} medir={cifra} width={L.contentW} max={300 * L.u} color={color} style={contador ? { fontVariantNumeric: "tabular-nums" } : undefined} />
      </Sube>
      <Sube desde={desde + 7} dur={14} style={{ marginTop: 34 * L.u }}>
        <div style={{ ...apoyo, fontSize: L.px(60), lineHeight: 1.12, color, textWrap: "balance" }}>{texto}</div>
      </Sube>
    </div>
  );
};

// Solución: una frase grande, sola en pantalla.
export const BloqueTexto: React.FC<{ rotulo: string; texto: string; color: string; rotuloColor: string; desde: number; size?: number }> = ({ rotulo, texto, color, rotuloColor, desde, size = 124 }) => {
  const L = useLayout();
  return (
    <div>
      <Rotulo texto={rotulo} color={rotuloColor} desde={desde - 4} />
      <Sube desde={desde} dur={16} style={{ marginTop: 44 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(size), lineHeight: 1, letterSpacing: "-0.02em", color, textWrap: "balance" }}>{texto}</div>
      </Sube>
    </div>
  );
};

export type Barra = { titulo: string; de: string; a: string; resto: number };

// Con IA: franja a sangre con la cifra esperada, una línea y la barra que pasa de "hoy" a "con IA".
export const BloqueImpacto: React.FC<{ rotulo: string; cifra: string; texto: string; barra: Barra; fondo: Token; tinta: Token; desde: number }> = ({ rotulo, cifra, texto, barra, fondo, tinta, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [desde - 6, desde + 8], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  // La barra arranca llena (hoy) y se vacía hasta lo que queda con IA.
  const ancho = interpolate(frame, [desde + 20, desde + 52], [100, barra.resto], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  const llegada = interpolate(frame, [desde + 36, desde + 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave });
  const visible = interpolate(frame, [desde + 14, desde + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave });
  const color = c(tinta);
  return (
    <div style={{ clipPath: `inset(0 ${p * 1.2 - 20}% 0 -20%)`, visibility: p >= 100 ? "hidden" : "visible" }}>
      <Franja fondo={fondo} style={{ paddingTop: 44 * L.u, paddingBottom: 44 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(48), lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.03em", color }}>{rotulo}</div>
        <div style={{ position: "relative", marginTop: 40 * L.u }}>
          {/* La cifra llega con un rebote corto: es el dato que debe quedar */}
          <BounceIn mode="up" distance={90 * L.u} bounce={0.3} duration={0.5} delay={desde / fps}>
            <Fit text={cifra} width={L.contentW * 0.84} max={270 * L.u} color={color} />
          </BounceIn>
          <div style={{ position: "absolute", right: 0, top: -10 * L.u }}>
            <Burst at={(desde + 10) / fps} color={color} size={170 * L.u} thickness={8 * L.u} count={9} />
          </div>
        </div>
        <Sube desde={desde + 9} dur={14} style={{ marginTop: 30 * L.u }}>
          <div style={{ ...apoyo, fontSize: L.px(60), lineHeight: 1.12, color, textWrap: "balance" }}>{texto}</div>
        </Sube>
        <div style={{ marginTop: 44 * L.u, height: 44 * L.u, boxSizing: "border-box", border: `${5 * L.u}px solid ${color}`, position: "relative", opacity: visible }}>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: `${ancho}%`, backgroundColor: color }} />
        </div>
        <div style={{ ...titular, display: "flex", justifyContent: "space-between", fontSize: L.px(48), lineHeight: 1, color, marginTop: 18 * L.u, opacity: visible }}>
          <span>{barra.de}</span>
          <span style={{ opacity: llegada }}>→ {barra.a}</span>
        </div>
      </Franja>
    </div>
  );
};
