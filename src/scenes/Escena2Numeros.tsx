import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Franja } from "../components/Piezas";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular, apoyo } from "../theme";
import { guion, cabeceraDe } from "../guion";
import { salida } from "../motion";

// Contador: sube hasta el valor con desaceleración; el tamaño se calcula con el valor final.
const Contador: React.FC<{ valor: number }> = ({ valor }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const actual = Math.round(interpolate(frame, [2, 22], [0, valor], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }));
  return (
    <div
      style={{
        scale: interpolate(frame, [0, 14], [1.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida, output: "perceptual-scale" }),
      }}
    >
      <Fit text={String(actual).padStart(String(valor).length, "0")} medir={String(valor)} width={L.width * 0.98} max={900 * L.u} color={c("colors-text-black-static")} align="center" style={{ lineHeight: 0.8, fontVariantNumeric: "tabular-nums" }} />
    </div>
  );
};

// La franja blanca entra barriendo de izquierda a derecha.
const FranjaAnimada: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const p = interpolate(frame, [6, 20], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida });
  return (
    <div style={{ clipPath: `inset(0 ${p * 1.2 - 20}% 0 -20%)`, visibility: p >= 100 ? "hidden" : "visible" }}>
      <Franja fondo="colors-status-brand-base" style={{ paddingTop: 30 * L.u, paddingBottom: 26 * L.u }}>
        {children}
      </Franja>
    </div>
  );
};

export const Escena2Numeros: React.FC<{ indice: number; guias?: boolean }> = ({ indice, guias }) => {
  const L = useLayout();
  const { numeros } = guion;
  const item = numeros.items[indice];
  return (
    <Stage bg="colors-text-primary" tinta="colors-text-black-static" contorno="colors-text-secondary" cabecera={cabeceraDe(1)} ticker={String(item.valor)} guias={guias}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", marginLeft: -L.safe.left, width: L.width, justifyContent: "center" }}>
        <Contador valor={item.valor} />
      </div>
      <FranjaAnimada>
        <Sube desde={10} dur={12}>
          <div style={{ ...titular, fontSize: L.px(86), lineHeight: 0.95, letterSpacing: "-0.02em", textTransform: "uppercase", color: c("colors-text-black-static") }}>{item.etiqueta}</div>
        </Sube>
        {"detalle" in item && item.detalle ? (
          <Sube desde={16} dur={12} style={{ marginTop: 14 * L.u }}>
            <div style={{ ...apoyo, fontSize: L.px(40), lineHeight: 1.2, color: c("colors-text-black-static") }}>{item.detalle}</div>
          </Sube>
        ) : null}
      </FranjaAnimada>
      <div style={{ height: 16 * L.u }} />
    </Stage>
  );
};
