import React from "react";
import {useCurrentFrame, useVideoConfig} from "remotion";
import captions from "../data/captions.json";
import {beesRadius, BODY, C} from "../theme";

/** Subtítulos sincronizados con la locución real. Zona reservada: franja inferior (y > 915). */
export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cue = captions.find((c) => t >= c.start && t < c.end);
  if (!cue) return null;
  return (
    <div style={{position: "absolute", left: 0, right: 0, bottom: 44, display: "flex", justifyContent: "center"}}>
      <div
        style={{
          background: C.black,
          color: C.white,
          fontFamily: BODY,
          fontWeight: 500,
          fontSize: 38,
          lineHeight: 1.22,
          textAlign: "center",
          padding: "12px 34px 15px",
          borderRadius: beesRadius(22),
          whiteSpace: "pre",
        }}
      >
        {cue.lines.join("\n")}
      </div>
    </div>
  );
};
