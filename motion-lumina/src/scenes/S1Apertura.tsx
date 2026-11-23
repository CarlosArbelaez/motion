import React from "react";
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {Highlight} from "../components/ui";
import {content} from "../data/content";
import {ap, C, f, h1, rise} from "../theme";

export const S1Apertura: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [duration - 9, duration - 1], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <AbsoluteFill style={{background: C.white, opacity: out}}>
      {/* halo: la bombilla "se enciende" */}
      <div
        style={{
          position: "absolute",
          left: 960 - 330,
          top: 300 - 330,
          width: 660,
          height: 660,
          borderRadius: 330,
          background: C.grey,
          scale: interpolate(frame, [0, 34], [0, 1], {extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1), output: "perceptual-scale"}),
        }}
      />
      <Img
        src={staticFile("assets/lumina-logo.png")}
        style={{
          position: "absolute",
          left: 960 - 360,
          top: 90,
          height: 560,
          opacity: ap(frame, 6, 16),
          scale: interpolate(frame, [6, 30], [0.86, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)}),
        }}
      />
      <div style={{position: "absolute", left: 0, right: 0, top: 716, textAlign: "center", ...h1(72), ...rise(frame, f(0.64), 30, 18)}}>
        Transformamos oportunidades en <Highlight at={f(2.5)}>crecimiento</Highlight>
      </div>
      <span style={{display: "none"}}>{content.s1.claim}</span>
    </AbsoluteFill>
  );
};
