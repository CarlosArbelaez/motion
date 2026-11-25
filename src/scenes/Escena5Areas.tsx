import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular } from "../theme";
import { guion, cabeceraDe } from "../guion";
import { salida } from "../motion";

// Contador de áreas.
const Cuenta: React.FC<{ valor: number; unidad: string }> = ({ valor, unidad }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame, [2, 26], [0, valor], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 24 * L.u, marginTop: 30 * L.u }}>
      <div style={{ ...titular, fontSize: 250 * L.u, lineHeight: 0.8, letterSpacing: "-0.05em", color: c("colors-status-brand-base"), fontVariantNumeric: "tabular-nums" }}>{String(v).padStart(String(valor).length, "0")}</div>
      <Sube desde={8} dur={12} style={{ paddingBottom: 10 * L.u }}>
        <div style={{ ...titular, fontSize: L.px(90), lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "uppercase", color: c("colors-text-primary") }}>{unidad}</div>
      </Sube>
    </div>
  );
};

// Cada área entra como un bloque con borde, una tras otra.
const Area: React.FC<{ nombre: string; desde: number }> = ({ nombre, desde }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const tinta = c("colors-text-primary");
  return (
    <div
      style={{
        ...titular,
        fontSize: L.px(42),
        lineHeight: 1,
        textTransform: "uppercase",
        letterSpacing: "-0.005em",
        color: tinta,
        border: `${4 * L.u}px solid ${tinta}`,
        padding: `${18 * L.u}px ${20 * L.u}px ${14 * L.u}px`,
        whiteSpace: "nowrap",
        opacity: interpolate(frame, [desde, desde + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        translate: interpolate(frame, [desde, desde + 10], ["0px 26px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }),
      }}
    >
      {nombre}
    </div>
  );
};

// momentos: inicio de cada frase de la voz (la 2.ª y la 3.ª disparan las dos líneas del cierre).
export const Escena5Areas: React.FC<{ momentos?: number[]; guias?: boolean }> = ({ momentos = [4, 90, 130], guias }) => {
  const L = useLayout();
  const a = guion.areas;
  const paso = Math.max(3, Math.floor((momentos[1] - 24) / a.nombres.length));
  return (
    <Stage bg="colors-background-primary" cabecera={cabeceraDe(3)} ticker={a.unidad} guias={guias}>
      <Cuenta valor={Number(a.cifra)} unidad={a.unidad} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 * L.u, marginTop: 28 * L.u }}>
        {a.nombres.map((n, i) => (
          <Area key={n} nombre={n} desde={14 + i * paso} />
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 10 * L.u }}>
        {a.frase.map((f, i) => (
          <Sube key={f} desde={(i < 2 ? momentos[1] + i * 10 : momentos[2]) - 4} dur={14} style={{ marginTop: i === 0 ? 0 : 8 * L.u }}>
            <Fit text={f} width={L.contentW} max={104 * L.u} color={c(i === 2 ? "colors-status-brand-base" : "colors-text-primary")} />
          </Sube>
        ))}
      </div>
    </Stage>
  );
};
