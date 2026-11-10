import React from "react";
import { useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { SUBTITLES } from "../timeline";

/** Subtítulos incrustados: zona reservada inferior, alto contraste, máximo dos líneas. */
export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = SUBTITLES.find((s) => frame >= s.from && frame < s.to);
  if (!cue) return null;
  const inP = prog(frame, cue.from, 4);
  const outP = 1 - prog(frame, cue.to - 4, 4);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 42,
        display: "flex",
        justifyContent: "center",
        opacity: Math.min(inP, outP),
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          background: "rgba(20, 22, 26, 0.94)",
          color: C.white,
          fontFamily: F.body,
          fontWeight: 500,
          fontSize: 38,
          lineHeight: 1.28,
          padding: "12px 30px 14px",
          borderRadius: 10,
          textAlign: "center",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};
