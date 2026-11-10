import React from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { C } from "./brand";
import { prog, easeInOut } from "./anim";
import { MIX, MUSIC, SCENES, SFX, TOTAL, VOICE } from "./timeline";
import { ContractLayer } from "./components/Contract";
import { Subtitles } from "./components/Subtitles";
import { Eyebrow, Legend } from "./components/ui";
import { P1Start } from "./scenes/P1Start";
import { Roadmap } from "./scenes/Roadmap";
import { Ola0 } from "./scenes/Ola0";
import { P2Now } from "./scenes/P2Now";
import { P3Next } from "./scenes/P3Next";
import { P4Later } from "./scenes/P4Later";
import { P5Impact } from "./scenes/P5Impact";
import { P6Decision } from "./scenes/P6Decision";

const TAIL = 4; // la placa saliente termina de desvanecerse 4 fotogramas después del corte

/** Volumen de la música con reducción automática mientras habla la voz. */
const musicVolume = (f: number) => {
  let duck = 0;
  for (const v of VOICE) {
    const d = interpolate(
      f,
      [v.from - MUSIC.ramp, v.from, v.from + v.len, v.from + v.len + MUSIC.ramp * 2],
      [0, 1, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    duck = Math.max(duck, d);
  }
  return MUSIC.base + (MUSIC.ducked - MUSIC.base) * duck;
};

const SceneWindow: React.FC<{ from: number; to: number; children: React.ReactNode; last?: boolean }> = ({
  from,
  to,
  children,
  last,
}) => {
  const frame = useCurrentFrame();
  const len = to - from;
  const out = last ? 1 : 1 - prog(frame, from + len - 10, 12, easeInOut);
  return (
    <Sequence from={from} durationInFrames={len + (last ? 0 : TAIL)} layout="none">
      <AbsoluteFill style={{ opacity: out }}>{children}</AbsoluteFill>
    </Sequence>
  );
};

export const HEAgenticHub: React.FC = () => {
  const frame = useCurrentFrame();
  // La leyenda aparece cuando entran reglas, IA y personas (Ola 1) y se va en el cierre.
  const legendOp = prog(frame, SCENES.ola1.from + 8, 14) * (1 - prog(frame, SCENES.decision.from - 4, 12));
  const eyebrowOp = prog(frame, 0, 12) * (1 - prog(frame, SCENES.decision.from - 4, 12));

  return (
    <AbsoluteFill style={{ background: C.page }}>
      <SceneWindow {...SCENES.hoy}>
        <P1Start />
      </SceneWindow>
      <SceneWindow {...SCENES.mapa}>
        <Roadmap />
      </SceneWindow>
      <SceneWindow {...SCENES.ola0}>
        <Ola0 />
      </SceneWindow>
      <SceneWindow {...SCENES.ola1}>
        <P2Now />
      </SceneWindow>
      <SceneWindow {...SCENES.ola2}>
        <P3Next />
      </SceneWindow>
      <SceneWindow {...SCENES.ola3}>
        <P4Later />
      </SceneWindow>
      <SceneWindow {...SCENES.impacto}>
        <P5Impact />
      </SceneWindow>
      <SceneWindow {...SCENES.decision} last>
        <P6Decision />
      </SceneWindow>

      <Eyebrow opacity={eyebrowOp} />
      <Legend opacity={legendOp} />

      {/* El mismo contrato, continuo durante los 30 s */}
      <ContractLayer />

      <Subtitles />

      {/* Audio */}
      <Audio src={staticFile("audio/music.wav")} volume={musicVolume} durationInFrames={TOTAL} />
      {VOICE.map((v) => (
        <Sequence key={v.file} from={v.from} durationInFrames={v.len + 2} layout="none">
          <Audio src={staticFile(v.file)} volume={MIX.voice} />
        </Sequence>
      ))}
      {SFX.map((s, i) => (
        <Sequence key={i} from={s.frame} durationInFrames={Math.min(45, TOTAL - s.frame)} layout="none">
          <Audio src={staticFile(`audio/sfx/${s.file}.wav`)} volume={s.volume * MIX.sfx} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
