import React from "react";
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {Draw, Rays} from "../components/motion";
import {Highlight} from "../components/ui";
import {ap, C, f, h1, rise, t} from "../theme";

export const S9Cierre: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const cl = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cues = [c(t("datos", 1, -0.1)), c(t("estrategia")), c(t("ejecución", 2))];
  const words = ["Datos", "Estrategia", "Ejecución"];
  const ys = [330, 545, 760];
  const resultAt = c(t("impulsar", 2));
  const logoAt = c(t("Activación", 1, -0.1));
  const fadeIn = interpolate(frame, [0, 8], [0, 1], cl);
  const fadeOut = interpolate(frame, [duration - 20, duration - 1], [1, 0], cl);
  const flood = interpolate(frame, [logoAt - 12, logoAt + 8], [0, 1], {...cl, easing: Easing.in(Easing.cubic)});
  const open = interpolate(frame, [logoAt + 6, logoAt + 40], [0, 1], {...cl, easing: ease});
  const trunk = interpolate(frame, [resultAt - 6, resultAt + 30], [0, 1], {...cl, easing: Easing.inOut(Easing.quad)});
  return (
    <AbsoluteFill style={{background: C.white, opacity: fadeIn * fadeOut}}>
      {/* tres fuerzas que se conectan en una sola línea de crecimiento */}
      {words.map((w, i) => (
        <div key={w} style={{position: "absolute", left: 96, top: ys[i] - 62, ...h1(104), ...rise(frame, cues[i], 30)}}>
          {w}
        </div>
      ))}
      <svg width={1920} height={1080} style={{position: "absolute", inset: 0}}>
        {ys.map((y, i) => (
          <Draw key={y} d={i === 1 ? `M600,545 L1080,545` : `M600,${y} C840,${y} 860,545 1080,545`} p={interpolate(frame, [cues[i] + 6, cues[i] + 30], [0, 1], {...cl, easing: ease})} width={10} />
        ))}
        <Draw d="M1080,545 L1290,545 L1420,450 L1520,500 L1700,330" p={trunk} width={14} />
        <path d="M1734,298 L1671,320 L1713,364 Z" fill={C.black} opacity={trunk > 0.97 ? 1 : 0} />
        <circle cx={1080} cy={545} r={34 * ap(frame, cues[2] + 24, 14)} fill={C.yellow} stroke={C.black} strokeWidth={8} />
      </svg>
      <div style={{position: "absolute", left: 1100, top: 610, whiteSpace: "nowrap", ...h1(76), ...rise(frame, resultAt + 14, 30)}}>
        <Highlight at={resultAt + 22}>Crecimiento</Highlight> del negocio
      </div>
      {/* la línea llega a la luz: vuelve el logo */}
      <div style={{position: "absolute", left: 1700 - 2400, top: 330 - 2400, width: 4800, height: 4800, borderRadius: 2400, background: C.yellow, scale: String(flood)}} />
      <div style={{position: "absolute", left: 960 - 1300, top: 270 - 1300, width: 2600, height: 2600, borderRadius: 1300, background: C.white, scale: String(open)}} />
      {frame > logoAt + 6 ? <Rays cx={960} cy={262} at={logoAt + 26} frame={frame} /> : null}
      <Img
        src={staticFile("assets/lumina-logo.png")}
        style={{position: "absolute", left: 960 - 360, top: 90, height: 560, opacity: ap(frame, logoAt + 14, 14), scale: String(interpolate(frame, [logoAt + 14, logoAt + 38], [0.8, 1], {...cl, easing: Easing.bezier(0.34, 1.4, 0.64, 1)}))}}
      />
      <div style={{position: "absolute", left: 0, right: 0, top: 716, textAlign: "center", ...h1(76), ...rise(frame, logoAt + 34, 30, 18)}}>
        Transformamos oportunidades en <Highlight at={logoAt + 50}>crecimiento</Highlight>
      </div>
    </AbsoluteFill>
  );
};
