import React from "react";
import { AbsoluteFill, Freeze, useVideoConfig } from "remotion";

export type StripProps = { strip?: { from?: number; to?: number; every?: number; cols?: number } };

/**
 * Revisión de movimiento. Envuelve el componente de una composición y dibuja, en una sola imagen,
 * sus fotogramas consecutivos en cuadrícula (se lee de izquierda a derecha y de arriba abajo).
 * Regístralo junto a la composición original con el mismo tamaño, fps, duración y props:
 *   <Composition id="Intro-review" component={filmstripOf(Intro)} ... />
 */
export const filmstripOf = <P extends object>(Comp: React.ComponentType<P>): React.FC<P & StripProps> => {
  const Strip: React.FC<P & StripProps> = ({ strip, ...props }) => {
    const { width, height, durationInFrames } = useVideoConfig();
    const from = strip?.from ?? 0;
    const to = Math.min(strip?.to ?? from + 46, durationInFrames - 1);
    const every = Math.max(1, strip?.every ?? 2);
    const frames: number[] = [];
    for (let f = from; f <= to; f += every) frames.push(f);
    const cols = strip?.cols ?? Math.ceil(Math.sqrt(frames.length));
    const cellW = width / cols;
    const cellH = height / cols;
    const gap = Math.max(2, Math.round(width / 480));
    return (
      <AbsoluteFill style={{ background: "#2a2a2a" }}>
        {frames.slice(0, cols * cols).map((f, i) => (
          <div key={f} style={{ position: "absolute", left: (i % cols) * cellW + gap, top: Math.floor(i / cols) * cellH + gap, width: cellW - gap * 2, height: cellH - gap * 2, overflow: "hidden", background: "#000" }}>
            <div style={{ position: "relative", width, height, transformOrigin: "0 0", scale: (cellW - gap * 2) / width }}>
              <Freeze frame={f}>
                <AbsoluteFill>
                  <Comp {...(props as unknown as P)} />
                </AbsoluteFill>
              </Freeze>
            </div>
            <div style={{ position: "absolute", left: 0, top: 0, padding: `${gap}px ${gap * 3}px`, background: "rgba(0,0,0,0.75)", color: "#fff", fontFamily: "monospace", fontSize: Math.max(12, cellH * 0.09) }}>
              {f}
            </div>
          </div>
        ))}
      </AbsoluteFill>
    );
  };
  return Strip;
};
