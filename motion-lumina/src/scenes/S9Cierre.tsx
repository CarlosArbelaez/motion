import React from "react";
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {Highlight, Icon} from "../components/ui";
import {content} from "../data/content";
import {ap, beesRadius, C, f, h1, pop, rise} from "../theme";

export const S9Cierre: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const t = content.s9;
  const cues = [c(113.5), c(114.3), c(115.2)];
  const icons = ["data", "target", "bolt"];
  const xs = [520, 960, 1400];
  const resultAt = c(116.3);
  const logoAt = c(118.6);
  const triadOut = interpolate(frame, [logoAt - 10, logoAt + 2], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {extrapolateRight: "clamp"});
  const fadeOut = interpolate(frame, [duration - 20, duration - 1], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <AbsoluteFill style={{background: C.white, opacity: fadeIn}}>
      {/* datos + estrategia + ejecución → crecimiento */}
      <AbsoluteFill style={{opacity: triadOut, translate: `0px ${(1 - triadOut) * -40}px`}}>
        <div style={{position: "absolute", left: xs[0], top: 277, width: (xs[2] - xs[0]) * ap(frame, cues[0], cues[2] - cues[0] + 10), height: 6, background: C.black}} />
        {t.triad.map((name, i) => (
          <React.Fragment key={name}>
            <div style={{position: "absolute", left: xs[i] - 90, top: 190, width: 180, height: 180, borderRadius: 90, background: C.black, display: "flex", alignItems: "center", justifyContent: "center", ...pop(frame, cues[i])}}>
              <Icon name={icons[i]} size={96} color={C.yellow} />
            </div>
            <div style={{position: "absolute", left: xs[i] - 220, top: 392, width: 440, textAlign: "center", ...h1(68), ...rise(frame, cues[i] + 3, 24)}}>{name}</div>
          </React.Fragment>
        ))}
        <div style={{position: "absolute", left: 957, top: 500, width: 6, height: 80 * ap(frame, resultAt - 8, 12), background: C.black}} />
        <div style={{position: "absolute", left: 0, right: 0, top: 580, display: "flex", justifyContent: "center", ...rise(frame, resultAt, 40)}}>
          <div style={{display: "flex", alignItems: "center", gap: 26, background: C.yellow, borderRadius: beesRadius(48), padding: "30px 56px 34px"}}>
            <Icon name="growth" size={84} />
            <div style={h1(84)}>{t.result}</div>
          </div>
        </div>
      </AbsoluteFill>
      {/* cierre con el logo original */}
      <AbsoluteFill style={{opacity: fadeOut}}>
        <div
          style={{
            position: "absolute",
            left: 960 - 330,
            top: 300 - 330,
            width: 660,
            height: 660,
            borderRadius: 330,
            background: C.grey,
            scale: interpolate(frame, [logoAt, logoAt + 30], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1), output: "perceptual-scale"}),
          }}
        />
        <Img
          src={staticFile("assets/lumina-logo.png")}
          style={{
            position: "absolute",
            left: 960 - 360,
            top: 90,
            height: 560,
            opacity: ap(frame, logoAt + 4, 16),
            scale: interpolate(frame, [logoAt + 4, logoAt + 28], [0.86, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)}),
          }}
        />
        <div style={{position: "absolute", left: 0, right: 0, top: 716, textAlign: "center", ...h1(72), ...rise(frame, logoAt + 24, 30, 18)}}>
          Transformamos oportunidades en <Highlight at={logoAt + 40}>crecimiento</Highlight>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
