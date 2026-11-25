import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { salida } from "../motion";

// Revela el contenido con máscara: sube desde abajo dentro de su propia caja.
export const Sube: React.FC<{ desde: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ desde, dur = 14, children, style }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div
        style={{
          translate: interpolate(frame, [desde, desde + dur], ["0px 105%", "0px 0%"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Revela con una cortina que se abre de izquierda a derecha.
export const Barre: React.FC<{ desde: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ desde, dur = 12, children, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [desde, desde + dur], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  return <div style={{ clipPath: `inset(0 ${p}% 0 0)`, ...style }}>{children}</div>;
};
