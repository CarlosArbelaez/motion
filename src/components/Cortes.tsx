import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { c, Token } from "../theme";
import { entradaSalida } from "../motion";

export type Corte = { en: number; color: Token; eje: "x" | "y"; sentido: 1 | -1 };

// Corte de bloque de color a pantalla completa: tapa en el fotograma del cambio y sale.
const Bloque: React.FC<{ corte: Corte }> = ({ corte }) => {
  const frame = useCurrentFrame();
  const antes = 7;
  const despues = 8;
  if (frame < corte.en - antes || frame > corte.en + despues) return null;
  const p = interpolate(frame, [corte.en - antes, corte.en, corte.en + despues], [-100, 0, 100], { easing: entradaSalida, extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * corte.sentido;
  return <AbsoluteFill style={{ backgroundColor: c(corte.color), translate: corte.eje === "x" ? `${p}% 0%` : `0% ${p}%` }} />;
};

export const Cortes: React.FC<{ cortes: Corte[] }> = ({ cortes }) => (
  <>
    {cortes.map((k) => (
      <Bloque key={k.en} corte={k} />
    ))}
  </>
);
