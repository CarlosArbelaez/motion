import React from "react";
import { fitText } from "@remotion/layout-utils";
import { titular } from "../theme";

const TRACK = "-0.035em";

// Titular o cifra en Avantt, en mayúsculas, que ocupa el ancho indicado (con tope).
export const Fit: React.FC<{
  text: string;
  width: number;
  max: number;
  color: string;
  align?: "left" | "right" | "center";
  style?: React.CSSProperties;
}> = ({ text, width, max, color, align = "left", style }) => {
  const t = text.toUpperCase();
  const { fontSize } = fitText({ text: t, withinWidth: width, fontFamily: titular.fontFamily, fontWeight: titular.fontWeight, letterSpacing: TRACK });
  return (
    <div style={{ ...titular, fontSize: Math.min(fontSize, max), letterSpacing: TRACK, lineHeight: 0.84, color, whiteSpace: "nowrap", textAlign: align, ...style }}>
      {t}
    </div>
  );
};
