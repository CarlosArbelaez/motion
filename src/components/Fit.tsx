import React from "react";
import { fitText } from "@remotion/layout-utils";
import { titular } from "../theme";

// Titular o cifra en Avantt que ocupa el ancho indicado (con tope de tamaño).
export const Fit: React.FC<{
  text: string;
  width: number;
  max: number;
  color: string;
  align?: "left" | "center";
  style?: React.CSSProperties;
}> = ({ text, width, max, color, align = "left", style }) => {
  const { fontSize } = fitText({ text, withinWidth: width, fontFamily: titular.fontFamily, fontWeight: titular.fontWeight, letterSpacing: "-0.02em" });
  return (
    <div
      style={{
        ...titular,
        fontSize: Math.min(fontSize, max),
        letterSpacing: "-0.02em",
        lineHeight: 0.95,
        color,
        whiteSpace: "nowrap",
        textAlign: align,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
