import React from "react";
import { useVideoConfig } from "remotion";
import { fitText } from "@remotion/layout-utils";
import { SplitText } from "../motion";
import { titular } from "../theme";

const TRACK = "-0.035em";

// Titular o cifra en Avantt, en mayúsculas, que ocupa el ancho indicado (con tope).
// Con `cascada` (fotograma de inicio) las letras entran una tras otra.
export const Fit: React.FC<{
  text: string;
  width: number;
  max: number;
  color: string;
  align?: "left" | "right" | "center";
  medir?: string; // texto con el que se calcula el tamaño (p. ej. el valor final de un contador)
  cascada?: number;
  style?: React.CSSProperties;
}> = ({ text, width, max, color, align = "left", medir, cascada, style }) => {
  const { fps } = useVideoConfig();
  const t = text.toUpperCase();
  const { fontSize } = fitText({ text: (medir ?? text).toUpperCase(), withinWidth: width, fontFamily: titular.fontFamily, fontWeight: titular.fontWeight, letterSpacing: TRACK });
  const size = Math.min(fontSize, max);
  return (
    <div style={{ ...titular, fontSize: size, letterSpacing: TRACK, lineHeight: 0.84, color, whiteSpace: "nowrap", textAlign: align, ...style }}>
      {cascada === undefined ? t : <SplitText text={t} by="letter" preset="slide" distance={size * 0.5} stagger={1.2} delay={cascada / fps} inDur={0.5} exit={false} />}
    </div>
  );
};
