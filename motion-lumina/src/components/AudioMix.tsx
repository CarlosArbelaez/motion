import {Audio} from "@remotion/media";
import React from "react";
import {interpolate, staticFile, useCurrentFrame} from "remotion";
import {f, SCENES, t, VO_END_FRAME, VO_OFFSET_FRAMES} from "../theme";

const a = (n: string) => staticFile(`assets/audio/${n}`);

/** Música: llena en la apertura y el cierre; se atenúa bajo la locución. */
const Music: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Audio
      src={a("music.wav")}
      volume={interpolate(frame, [0, VO_OFFSET_FRAMES - 10, VO_OFFSET_FRAMES + 8, VO_END_FRAME, VO_END_FRAME + 20], [0.5, 0.5, 0.12, 0.12, 0.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })}
    />
  );
};

// Efectos anclados a las palabras de la locución.
const pops: [string, number?][] = [["adquirir"], ["activar"], ["retener"], ["impulsar"], ["primera"], ["reciba"], ["compre"], ["identificamos"], ["gestionamos"], ["Uno"], ["Hacemos"], ["aseguramos"], ["habilitamos"], ["promociones", 3], ["visita", 2], ["tareas"], ["promociones", 4], ["comunicaciones"], ["datos"], ["estrategia"], ["ejecución", 2]];
const ticks: [string, number?][] = [["creación", 2], ["activación"], ["retención", 2], ["comportamiento", 2], ["ejecución"], ["logística"], ["servicio"], ["identificar"], ["hacer"], ["detectar"], ["encontrar"], ["Todo"], ["trazabilidad"]];
const sfx: {file: string; at: number; vol: number}[] = [
  {file: "sfx-light.wav", at: 2, vol: 0.5},
  ...Object.values(SCENES)
    .slice(1)
    .map((s) => ({file: "sfx-whoosh.wav", at: s.from - 8, vol: 0.2})),
  ...pops.map(([w, n]) => ({file: "sfx-pop.wav", at: f(t(w, n ?? 1)), vol: 0.2})),
  ...ticks.map(([w, n]) => ({file: "sfx-tick.wav", at: f(t(w, n ?? 1)), vol: 0.28})),
  {file: "sfx-chime.wav", at: f(t("primera", 2)), vol: 0.28},
  {file: "sfx-signal.wav", at: f(t("cambios")), vol: 0.3},
  {file: "sfx-chime.wav", at: f(t("prevenir")), vol: 0.24},
  {file: "sfx-chime.wav", at: f(t("Activación")), vol: 0.32},
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
