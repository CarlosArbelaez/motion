import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { c, Token, apoyo, titular } from "../theme";
import { useLayout } from "../layout";
import { salida } from "../motion";

// Cinta de texto en contorno que corre por las zonas no seguras (arriba y abajo).
const Cinta: React.FC<{ text: string; color: string; top?: number; bottom?: number; size: number; sentido: 1 | -1 }> = ({ text, color, top, bottom, size, sentido }) => {
  const frame = useCurrentFrame();
  const paso = size * 0.02;
  return (
    <div
      style={{
        position: "absolute",
        top,
        bottom,
        left: -size * 3,
        whiteSpace: "nowrap",
        ...titular,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.03em",
        textTransform: "uppercase",
        color: "transparent",
        WebkitTextStroke: `${Math.max(2, size * 0.012)}px ${color}`,
        translate: `${sentido * frame * paso}px 0px`,
      }}
    >
      {Array.from({ length: 12 }, () => text).join(" · ")}
    </div>
  );
};

// Cabecera fija: da continuidad entre escenas. entra > 0 la dibuja al inicio.
const Cabecera: React.FC<{ izq: string; der: string; tinta: string; entra?: number }> = ({ izq, der, tinta, entra }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const regla = 4 * L.u;
  const p = entra === undefined ? 1 : interpolate(frame, [entra, entra + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  return (
    <div style={{ position: "absolute", top: L.safe.top, left: L.safe.left, width: L.contentW, height: 72 * L.u }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: regla, backgroundColor: tinta, scale: `${p} 1`, transformOrigin: "left center" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: regla, backgroundColor: tinta, scale: `${p} 1`, transformOrigin: "right center" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", ...apoyo, fontSize: L.px(40), textTransform: "uppercase", letterSpacing: "0.02em", color: tinta, opacity: p }}>
        <span>{izq}</span>
        <span>{der}</span>
      </div>
    </div>
  );
};

export const Stage: React.FC<{
  bg: Token;
  tinta?: Token;
  cabecera: [string, string];
  cabeceraEntra?: number;
  ticker: string;
  guias?: boolean;
  children: React.ReactNode;
}> = ({ bg, tinta = "colors-text-primary", cabecera, cabeceraEntra, ticker, guias, children }) => {
  const L = useLayout();
  const sobreAmarillo = bg === "colors-status-brand-base";
  const contorno = sobreAmarillo ? c("colors-status-brand-base-light") : c("colors-background-secondary");
  return (
    <AbsoluteFill style={{ backgroundColor: c(bg), overflow: "hidden" }}>
      {L.vertical ? (
        <>
          <Cinta text={ticker} color={contorno} top={(L.safe.top - 210 * L.u) / 2} size={210 * L.u} sentido={-1} />
          <Cinta text={ticker} color={contorno} bottom={(L.safe.bottom - 290 * L.u) / 2} size={290 * L.u} sentido={1} />
        </>
      ) : null}
      <Cabecera izq={cabecera[0]} der={cabecera[1]} tinta={c(tinta)} entra={cabeceraEntra} />
      <div style={{ position: "absolute", top: L.safe.top + 72 * L.u, left: L.safe.left, width: L.contentW, height: L.contentH - 72 * L.u, display: "flex", flexDirection: "column" }}>{children}</div>
      {guias ? (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: L.safe.top, backgroundColor: "rgba(255,0,80,0.4)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: L.safe.bottom, backgroundColor: "rgba(255,0,80,0.4)" }} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
