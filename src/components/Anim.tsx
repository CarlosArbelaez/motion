import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { salida } from "../motion";
import { useLayout } from "../layout";

// Revela el contenido con máscara: sube desde abajo dentro de su propia caja.
// La caja deja aire arriba para no recortar tildes ni virgulillas de las mayúsculas.
export const Sube: React.FC<{ desde: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ desde, dur = 14, children, style }) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const aire = 36 * L.u;
  return (
    <div style={style}>
      <div style={{ overflow: "hidden", paddingTop: aire, marginTop: -aire }}>
        <div
          style={{
            translate: interpolate(frame, [desde, desde + dur], ["0px 115%", "0px 0%"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }),
          }}
        >
          {children}
        </div>
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
