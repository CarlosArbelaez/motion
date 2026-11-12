import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Captions } from "./components/ui";
import { cue, LEAD, sceneFrames, SCENES, sceneOf, sceneStartFrame, TOTAL_FRAMES } from "./lib/timing";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S03 } from "./scenes/S03";
import { S04 } from "./scenes/S04";
import { S05 } from "./scenes/S05";
import { ARRIVE, S06 } from "./scenes/S06";
import { S07 } from "./scenes/S07";
import { S08 } from "./scenes/S08";
import { S09 } from "./scenes/S09";
import { S10 } from "./scenes/S10";
import { S11 } from "./scenes/S11";
import { S12 } from "./scenes/S12";

export const SCENE_COMPONENTS: Record<string, React.FC> = {
  s01: S01,
  s02: S02,
  s03: S03,
  s04: S04,
  s05: S05,
  s06: S06,
  s07: S07,
  s08: S08,
  s09: S09,
  s10: S10,
  s11: S11,
  s12: S12,
};

// Efectos (síntesis propia): [escena, segundo dentro de la escena, archivo, volumen]. Atados a la locución con cue().
type Sfx = [string, number, string, number];
const at = (id: string, phrases: string[], file: string, vol: number, offset = 0): Sfx[] =>
  phrases.map((p) => [id, cue(id, p) + offset, file, vol]);
const mailStart = cue("s03", "llega un correo");
const mailEnd = cue("s03", "veintiséis") + 0.5;
const SFX: Sfx[] = [
  ...at("s01", ["un solo registro", "alertas que se", "una decisión siempre"], "pop", 0.16),
  ...at("s01", ["lo cierra"], "chime", 0.2, 0.7),
  ...at("s02", ["doscientos veinte", "ciento setenta", "dos archivos", "un correo", "dos personas"], "pop", 0.13, -0.15),
  ...at("s02", ["en Ariba", "los dos Excel"], "tick", 0.3),
  ...at("s02", ["los dos Excel"], "tick", 0.3, 0.55),
  ...at("s02", ["fechas distintas"], "thud", 0.2),
  ...Array.from({ length: 26 }).map((_, i): Sfx => ["s03", mailStart + (i / 26) * (mailEnd - mailStart), "tick", 0.12]),
  ...at("s03", ["Después del vencimiento"], "ding", 0.1, 0.2),
  ...at("s03", ["ninguna decisión"], "thud", 0.22),
  ...at("s04", ["Hay contratos fuera", "Hay contratos que", "nadie responde"], "thud", 0.18, -0.1),
  ...at("s05", ["Primero", "Después", "Y solo al final"], "pop", 0.18, -0.1),
  ...ARRIVE.map((a): Sfx => ["s06", a, "tick", 0.3]),
  ...at("s06", ["vuelve"], "chime", 0.2, 0.9),
  ...at("s07", ["una sola tarjeta"], "pop", 0.2, -0.1),
  ...at("s07", ["sesenta", "treinta"], "ding", 0.1),
  ...at("s07", ["el dueño decide", "su líder aprueba", "Procurement confirma"], "pop", 0.15, -0.1),
  ...at("s07", ["Procurement confirma"], "chime", 0.18, 0.5),
  ...at("s08", ["El dueño del servicio", "Procurement", "Value Creation"], "pop", 0.18, -0.1),
  ...at("s09", ["Lee el contrato", "propone", "Una persona", "antes de publicarlas"], "pop", 0.14, -0.1),
  ...at("s09", ["no decide", "no aprueba", "no interpreta", "ni confirma"], "thud", 0.14, -0.1),
  ...at("s10", ["producto mínimo", "Después", "Y la ola tres"], "pop", 0.16, -0.2),
  ...at("s10", ["Cada ola"], "chime", 0.16),
  ...at("s11", ["De tres", "De veintiséis", "El cien", "Al menos", "Y los pasos", "Lo que aún"], "pop", 0.15, -0.15),
  ...at("s12", ["Uno: aprobar", "Dos: aprobar", "Tres: aprobar"], "pop", 0.2, -0.15),
  ...at("s12", ["Con su visto bueno"], "chime", 0.24, 1.1),
];

const Music: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lastId = SCENES[SCENES.length - 1].id;
  const voEnd = sceneStartFrame(lastId) + (LEAD + sceneOf(lastId).dur) * fps;
  // Entra sola, baja bajo la voz, sube al cierre y se desvanece.
  const volume = interpolate(
    frame,
    [0, 0.3 * fps, 0.9 * fps, voEnd, voEnd + 1 * fps, TOTAL_FRAMES - 2 * fps, TOTAL_FRAMES - 1],
    [0, 0.45, 0.13, 0.13, 0.42, 0.42, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <Audio src={staticFile("assets/audio/music.mp3")} volume={volume} />;
};

export const ContractsVideo: React.FC<{ showCaptions: boolean }> = ({ showCaptions }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#F7F8FA" }}>
      {SCENES.map((s) => {
        const Comp = SCENE_COMPONENTS[s.id];
        if (!Comp) return null;
        return (
          <Sequence key={s.id} name={`${s.id} · ${s.title}`} from={sceneStartFrame(s.id)} durationInFrames={sceneFrames(s.id)}>
            <Comp />
            {showCaptions ? <Captions id={s.id} /> : null}
            <Sequence name="Locución" from={Math.round(LEAD * fps)} layout="none">
              <Audio src={staticFile(`assets/voice/${s.id}.mp3`)} volume={1} />
            </Sequence>
          </Sequence>
        );
      })}
      {SCENES.slice(1).map((s) => (
        <Sequence key={`w-${s.id}`} name="Transición" from={Math.max(0, sceneStartFrame(s.id) - 6)} durationInFrames={30} layout="none">
          <Audio src={staticFile("assets/audio/whoosh.wav")} volume={0.16} />
        </Sequence>
      ))}
      {SFX.filter(([id]) => SCENE_COMPONENTS[id]).map(([id, sec, file, vol], i) => (
        <Sequence key={i} name={`sfx ${file}`} from={sceneStartFrame(id) + Math.round(sec * fps)} durationInFrames={50} layout="none">
          <Audio src={staticFile(`assets/audio/${file}.wav`)} volume={vol} />
        </Sequence>
      ))}
      <Music />
    </AbsoluteFill>
  );
};

