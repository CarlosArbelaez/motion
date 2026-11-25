import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { EASE, Ease } from "./easings";

/** Progreso 0→1 entre `delay` y `delay + duration` (segundos) con easing y clamp. */
export const useProgress = (delay = 0, duration = 0.6, easing: Ease = EASE.outExpo) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame, [delay * fps, (delay + Math.max(duration, 1 / fps)) * fps], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing,
  });
};
