import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Captions } from "./components/ui";
import { cue, LEAD, PROVISIONAL, sceneFrames, SCENES, sceneOf, sceneStartFrame, TOTAL_FRAMES } from "./lib/timing";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S03 } from "./scenes/S03";
import { S04 } from "./scenes/S04";
import { EASE, Sfx } from "./motion";
import { ARRIVE, S05 } from "./scenes/S05";
import { S06 } from "./scenes/S06";
import { S07 } from "./scenes/S07";
import { S08 } from "./scenes/S08";
import { S09 } from "./scenes/S09";
import { S10 } from "./scenes/S10";
import { S11 } from "./scenes/S11";
import { S12 } from "./scenes/S12";
import { S13 } from "./scenes/S13";
import { S14 } from "./scenes/S14";
import { S15 } from "./scenes/S15";

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
  s13: S13,
  s14: S14,
  s15: S15,
};

// Efectos (síntesis propia): [escena, segundo dentro de la escena, archivo, volumen]. Atados a la locución con cue().
type Sfx = [string, number, string, number];
const at = (id: string, phrases: string[], file: string, vol: number, offset = 0): Sfx[] =>
  phrases.map((p) => [id, cue(id, p) + offset, file, vol]);
const mailStart = cue("s03", "Cada vencimiento") + 0.3;
const mailEnd = cue("s03", "veintiséis") + 0.9;
const SFX: Sfx[] = [
  ...at("s01", ["Proponemos un proceso", "tres formas"], "pop", 0.16),
  ...at("s01", ["lo cierra"], "chime", 0.2, 0.7),
  ...at("s02", ["doscientos veinte", "ciento setenta", "dos archivos", "un correo", "dos personas"], "pop", 0.13, -0.15),
  ...at("s02", ["el mismo dato"], "tick", 0.3, 0.3),
  ...at("s02", ["tres veces"], "tick", 0.3, -0.2),
  ...at("s02", ["tres veces"], "tick", 0.3, 0.4),
  ...at("s02", ["fechas distintas"], "thud", 0.2),
  ...Array.from({ length: 13 }).map((_, i): Sfx => ["s03", mailStart + (i / 13) * (mailEnd - mailStart), "tick", 0.12]),
  ...at("s03", ["Ninguna decisión", "Hay contratos fuera", "nadie responde"], "thud", 0.18, -0.1),
  ...at("s04", ["Primero", "Después", "Y solo al final"], "pop", 0.18, -0.1),
  ...ARRIVE.map((a): Sfx => ["s05", a, "tick", 0.3]),
  ...at("s05", ["vuelve"], "chime", 0.2, 0.9),
  ...at("s06", ["una sola alerta"], "pop", 0.2, -0.1),
  ...at("s06", ["sesenta", "treinta"], "ding", 0.1),
  ...at("s06", ["el dueño decide", "su líder aprueba", "Procurement confirma"], "pop", 0.15, -0.1),
  ...at("s06", ["Procurement confirma"], "chime", 0.18, 0.5),
  ...at("s07", ["El dueño del servicio", "Procurement", "Value Creation"], "pop", 0.18, -0.1),
  ...at("s08", ["El escenario Completo", "Lite A", "Y Lite B"], "pop", 0.18, -0.15),
  ...at("s08", ["Lite A solo es posible"], "thud", 0.18, -0.1),
  ...at("s09", ["El dashboard", "Las alertas", "el histórico"], "tick", 0.3, -0.2),
  ...at("s09", ["Además"], "pop", 0.18, -0.2),
  ...at("s10", ["Una aplicación", "Power Automate", "Las alertas", "El dashboard", "Y las consultas"], "pop", 0.15, -0.1),
  ...at("s10", ["No hay inteligencia"], "thud", 0.16, -0.1),
  ...at("s11", ["El Completo tarda", "El Lite sale", "En pasos automáticos"], "tick", 0.3, -0.2),
  ...at("s12", ["Un solo registro", "El dashboard", "Una alerta", "Cada solicitud", "Y el cruce"], "tick", 0.3, -0.1),
  ...at("s12", ["En los tres", "En el Completo", "Y en el Lite"], "pop", 0.16, -0.1),
  ...at("s13", ["El Completo", "Lite A", "Lite B"], "pop", 0.18, -0.1),
  ...at("s13", ["noventa y un mil", "sesenta mil", "cincuenta y cinco mil"], "ding", 0.1),
  ...at("s14", ["De tres", "De veintiséis", "De dos personas", "Todos los contratos", "Ningún contrato", "Y un solo histórico"], "pop", 0.15, -0.15),
  ...at("s15", ["Primera", "Segunda"], "thud", 0.2, -0.15),
  ...at("s15", ["Confirmar", "Los datos en BrewDat", "Las reglas", "Y la validación"], "pop", 0.16, -0.15),
  ...at("s15", ["Ustedes eligen"], "chime", 0.24, 1.1),
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

// Cambio de capítulo: una cortina amarilla de marca cubre el corte y descubre la escena nueva.
// No altera los tiempos de las escenas (la locución sigue anclada).
const CHAPTER_STARTS = ["s02", "s04", "s08", "s12", "s15"];
const WIPE = 11; // frames por mitad
const ChapterWipe: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const cover = interpolate(frame, [at - WIPE, at], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.inOutExpo });
  const reveal = interpolate(frame, [at + 1, at + 1 + WIPE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.inOutExpo });
  if (cover <= 0 || reveal >= 1) return null;
  return <AbsoluteFill style={{ background: "#f5e003", clipPath: `inset(0% ${(1 - cover) * 100}% 0% ${reveal * 100}%)` }} />;
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
            {PROVISIONAL ? null : (
              <Sequence name="Locución" from={Math.round(LEAD * fps)} layout="none">
                <Audio src={staticFile(`assets/voice/${s.id}.mp3`)} volume={1} />
              </Sequence>
            )}
          </Sequence>
        );
      })}
      {SCENES.slice(1).map((s) => {
        const chapter = CHAPTER_STARTS.includes(s.id);
        return (
          <Sfx
            key={`w-${s.id}`}
            src={chapter ? "sfx/transition-deep.wav" : "sfx/slide-soft.wav"}
            at={sceneStartFrame(s.id)}
            lead={chapter ? 8 : 3}
            volume={chapter ? 0.3 : 0.14}
          />
        );
      })}
      {SFX.filter(([id]) => SCENE_COMPONENTS[id]).map(([id, sec, file, vol], i) => (
        <Sequence key={i} name={`sfx ${file}`} from={sceneStartFrame(id) + Math.round(sec * fps)} durationInFrames={50} layout="none">
          <Audio src={staticFile(`assets/audio/${file}.wav`)} volume={vol} />
        </Sequence>
      ))}
      {CHAPTER_STARTS.map((id) => (
        <ChapterWipe key={id} at={sceneStartFrame(id)} />
      ))}
      <Music />
    </AbsoluteFill>
  );
};

