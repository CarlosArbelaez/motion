import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { c, apoyo } from "../theme";
import { useLayout } from "../layout";
import { salida, suave } from "../curvas";

export type Cue = { texto: string; desde: number; hasta: number; sobreAmarillo?: boolean };

// Subtítulos quemados: siempre visibles, dentro de la franja segura.
export const Subtitulos: React.FC<{ cues: Cue[] }> = ({ cues }) => {
  const L = useLayout();
  const frame = useCurrentFrame();
  const cue = cues.find((q) => frame >= q.desde && frame < q.hasta);
  if (!cue) return null;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: L.safe.left, width: L.contentW, bottom: L.safe.bottom, height: L.subtituloAlto, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div
          style={{
            ...apoyo,
            fontSize: L.px(44),
            lineHeight: 1.22,
            textAlign: "center",
            color: cue.sobreAmarillo ? c("colors-text-primary") : c("colors-text-black-static"),
            backgroundColor: cue.sobreAmarillo ? c("colors-text-black-static") : c("colors-text-primary"),
            padding: `${12 * L.u}px ${24 * L.u}px`,
            textWrap: "balance",
            translate: interpolate(frame, [cue.desde, cue.desde + 5], ["0px 14px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida }),
            opacity: interpolate(frame, [cue.desde, cue.desde + 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: suave }),
          }}
        >
          {cue.texto}
        </div>
      </div>
    </AbsoluteFill>
  );
};
