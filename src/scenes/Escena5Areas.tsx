import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Stage } from "../components/Stage";
import { Fit } from "../components/Fit";
import { Sube } from "../components/Anim";
import { useLayout } from "../layout";
import { c, titular } from "../theme";
import { guion, cabeceraDe } from "../guion";
import { salida } from "../curvas";
import { Turno } from "../components/Tarjeta";
import { StaggerFrom } from "../motion";

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

// Cada área es un bloque con borde; la cascada la pone StaggerFrom.
const Area: React.FC<{ nombre: string }> = ({ nombre }) => {
  const L = useLayout();
  const tinta = c("colors-text-primary");
  return (
    <div style={{ ...titular, fontSize: L.px(46), lineHeight: 1, textTransform: "uppercase", color: tinta, border: `${4 * L.u}px solid ${tinta}`, padding: `${20 * L.u}px ${22 * L.u}px ${16 * L.u}px`, whiteSpace: "nowrap" }}>
      {nombre}
    </div>
  );
};

// Dos tiempos: primero el número y las áreas; después, solas, las tres líneas del mensaje.
// momentos: inicio de cada frase de la voz (la 2.ª y la 3.ª disparan el mensaje).
export const Escena5Areas: React.FC<{ momentos?: number[]; guias?: boolean }> = ({ momentos = [4, 90, 130], guias }) => {
  const L = useLayout();
  const { fps } = useVideoConfig();
  const a = guion.areas;
  const cambio = momentos[1] - 6;
  const paso = Math.max(2, Math.min(4, Math.floor((cambio - 34) / a.nombres.length)));
  return (
    <Stage bg="colors-background-primary" cabecera={cabeceraDe(3)} ticker={a.unidad} guias={guias}>
      <div style={{ flex: 1, position: "relative" }}>
        <Turno hasta={cambio}>
          <Cuenta valor={Number(a.cifra)} unidad={a.unidad} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 * L.u, marginTop: 44 * L.u }}>
            <StaggerFrom preset="slide" direction="up" distance={30 * L.u} inDur={0.35} from="first" gap={paso} delay={14 / fps} exit={false}>
              {a.nombres.map((n) => (
                <Area key={n} nombre={n} />
              ))}
            </StaggerFrom>
          </div>
        </Turno>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 * L.u }}>
          {a.frase.map((f, i) => (
            <Sube key={f} desde={(i < 2 ? momentos[1] + i * 10 : momentos[2]) - 4} dur={16}>
              <Fit text={f} width={L.contentW} max={170 * L.u} color={c(i === 2 ? "colors-status-brand-base" : "colors-text-primary")} />
            </Sube>
          ))}
        </div>
      </div>
    </Stage>
  );
};
