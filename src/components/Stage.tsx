import React from "react";
import { AbsoluteFill } from "remotion";
import { c, Token, apoyo } from "../theme";
import { useLayout } from "../layout";

export const Stage: React.FC<{
  bg: Token;
  subtitulo?: string;
  sobreAmarillo?: boolean;
  guias?: boolean;
  children: React.ReactNode;
}> = ({ bg, subtitulo, sobreAmarillo, guias, children }) => {
  const L = useLayout();
  return (
    <AbsoluteFill style={{ backgroundColor: c(bg) }}>
      <div
        style={{
          position: "absolute",
          top: L.safe.top,
          left: L.safe.left,
          width: L.contentW,
          height: L.contentH,
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
              lineHeight: 1.25,
              textAlign: "center",
              color: c("colors-text-primary"),
              backgroundColor: sobreAmarillo ? c("colors-text-black-static") : c("colors-background-secondary"),
              padding: `${14 * L.u}px ${28 * L.u}px`,
              textWrap: "balance",
            }}
          >
            {subtitulo}
          </div>
        </div>
      ) : null}
      {guias ? (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: L.safe.top, backgroundColor: "rgba(255,0,80,0.35)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: L.safe.bottom, backgroundColor: "rgba(255,0,80,0.35)" }} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
