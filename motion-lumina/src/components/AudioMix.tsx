import {Audio} from "@remotion/media";
import React from "react";
import {interpolate, staticFile, useCurrentFrame} from "remotion";
import {f, SCENES, VO_OFFSET_FRAMES} from "../theme";

const a = (n: string) => staticFile(`assets/audio/${n}`);

/** Música: llena en la apertura y el cierre; se atenúa bajo la locución. */
const Music: React.FC = () => {
  const frame = useCurrentFrame();
  const voEnd = f(122.72);
  return (
    <Audio
      src={a("music.wav")}
      volume={interpolate(frame, [0, VO_OFFSET_FRAMES - 12, VO_OFFSET_FRAMES + 8, voEnd, voEnd + 24], [0.5, 0.5, 0.13, 0.13, 0.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })}
    />
  );
};

// Efectos sincronizados con los momentos clave (segundos de locución → frame).
const sfx: {file: string; at: number; vol: number}[] = [
  {file: "sfx-light.wav", at: 2, vol: 0.5},
  ...Object.values(SCENES)
    .slice(1)
    .map((s) => ({file: "sfx-whoosh.wav", at: s.from - 8, vol: 0.2})),
  ...[8.88, 9.96, 10.64, 12.4, 18.9, 20.4, 22.2, 26.9, 28.8, 32.9, 38.8, 48.2, 62.92, 64.96, 66.6, 69.76, 71.2, 113.5, 114.3, 115.2].map((s) => ({
    file: "sfx-pop.wav",
    at: f(s),
    vol: 0.22,
  })),
  ...[82.0, 83.04, 84.12, 85.16, 86.72, 87.76, 88.8, 91.3, 95.16, 98.08, 100.96, 104.72, 108.4].map((s) => ({file: "sfx-tick.wav", at: f(s), vol: 0.3})),
  {file: "sfx-chime.wav", at: f(36.5), vol: 0.3},
  {file: "sfx-signal.wav", at: f(44.0), vol: 0.32},
  {file: "sfx-chime.wav", at: f(54.3), vol: 0.26},
  {file: "sfx-chime.wav", at: f(118.6), vol: 0.34},
];

export const AudioMix: React.FC = () => (
  <>
    <Music />
    <Audio src={a("voiceover.mp3")} from={VO_OFFSET_FRAMES} volume={1} />
    {sfx.map((s, i) => (
      <Audio key={i} src={a(s.file)} from={Math.max(0, s.at)} volume={s.vol} />
    ))}
  </>
);
