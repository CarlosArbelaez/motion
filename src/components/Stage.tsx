import React from "react";
import { AbsoluteFill } from "remotion";
import { c, Token, apoyo, titular } from "../theme";
import { useLayout } from "../layout";

// Banda de texto en contorno que ocupa las zonas no seguras (arriba y abajo).
const Ticker: React.FC<{ text: string; color: string; top?: number; bottom?: number; size: number; offset?: number }> = ({ text, color, top, bottom, size, offset = 0 }) => (
  <div
    style={{
      position: "absolute",
      top,
      bottom,
      left: 0,
      whiteSpace: "nowrap",
      ...titular,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: "-0.03em",
      textTransform: "uppercase",
      color: "transparent",
      WebkitTextStroke: `${Math.max(2, size * 0.012)}px ${color}`,
      transform: `translateX(${-offset}px)`,
    }}
  >
    {Array.from({ length: 8 }, () => text).join(" · ")}
  </div>
);

export const Stage: React.FC<{
  bg: Token;
  tinta?: Token; // color de reglas y cabecera
  cabecera: [string, string];
  ticker: string;
  tickerOffset?: number;
  subtitulo?: string;
  guias?: boolean;
  children: React.ReactNode;
}> = ({ bg, tinta = "colors-text-primary", cabecera, ticker, tickerOffset = 0, subtitulo, guias, children }) => {
  const L = useLayout();
  const sobreAmarillo = bg === "colors-status-brand-base";
  const contorno = sobreAmarillo ? c("colors-status-brand-base-light") : c("colors-background-secondary");
  const regla = 4 * L.u;
  return (
    <AbsoluteFill style={{ backgroundColor: c(bg), overflow: "hidden" }}>
      {L.vertical ? (
        <>
          <Ticker text={ticker} color={contorno} top={(L.safe.top - 210 * L.u) / 2} size={210 * L.u} offset={tickerOffset + 60 * L.u} />
          <Ticker text={ticker} color={contorno} bottom={(L.safe.bottom - 290 * L.u) / 2} size={290 * L.u} offset={-tickerOffset + 300 * L.u} />
        </>
      ) : null}
      {/* Cabecera fija: da continuidad entre escenas */}
      <div
        style={{
          position: "absolute",
          top: L.safe.top,
          left: L.safe.left,
          width: L.contentW,
          height: 72 * L.u,
          borderTop: `${regla}px solid ${c(tinta)}`,
          borderBottom: `${regla}px solid ${c(tinta)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...apoyo,
          fontSize: L.px(40),
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          color: c(tinta),
        }}
      >
        <span>{cabecera[0]}</span>
        <span>{cabecera[1]}</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: L.safe.top + 72 * L.u,
          left: L.safe.left,
          width: L.contentW,
          height: L.contentH - 72 * L.u,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
      {subtitulo ? (
        <div
          style={{
            position: "absolute",
            left: L.safe.left,
            width: L.contentW,
            bottom: L.safe.bottom,
            height: L.subtituloAlto,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              ...apoyo,
              fontSize: L.px(44),
              lineHeight: 1.22,
              textAlign: "center",
              color: sobreAmarillo ? c("colors-text-primary") : c("colors-text-black-static"),
              backgroundColor: sobreAmarillo ? c("colors-text-black-static") : c("colors-text-primary"),
              padding: `${12 * L.u}px ${24 * L.u}px`,
              textWrap: "balance",
            }}
          >
            {subtitulo}
          </div>
        </div>
      ) : null}
      {guias ? (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: L.safe.top, backgroundColor: "rgba(255,0,80,0.4)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: L.safe.bottom, backgroundColor: "rgba(255,0,80,0.4)" }} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
