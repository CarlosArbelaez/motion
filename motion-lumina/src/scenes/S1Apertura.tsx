import React from "react";
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {Rays} from "../components/motion";
import {Highlight} from "../components/ui";
import {ap, C, f, h1, rise, t} from "../theme";

export const S1Apertura: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const out = interpolate(frame, [duration - 9, duration - 1], [1, 0], cl);
  // la luz se enciende: un disco blanco se abre sobre el amarillo BEES
  const open = interpolate(frame, [4, 40], [0, 1], {...cl, easing: ease});
  return (
    <AbsoluteFill style={{background: C.yellow, opacity: out}}>
      <div style={{position: "absolute", left: 960 - 1300, top: 270 - 1300, width: 2600, height: 2600, borderRadius: 1300, background: C.white, scale: String(open)}} />
      <Rays cx={960} cy={262} at={26} frame={frame} />
      <Img
        src={staticFile("assets/lumina-logo.png")}
        style={{position: "absolute", left: 960 - 360, top: 90, height: 560, opacity: ap(frame, 12, 14), scale: String(interpolate(frame, [12, 36], [0.8, 1], {...cl, easing: Easing.bezier(0.34, 1.4, 0.64, 1)}))}}
      />
      <div style={{position: "absolute", left: 0, right: 0, top: 716, textAlign: "center", ...h1(76), ...rise(frame, f(t("Transformamos")), 30, 18)}}>
        Transformamos oportunidades en <Highlight at={f(t("crecimiento", 1, -0.3))}>crecimiento</Highlight>
      </div>
    </AbsoluteFill>
  );
};
