import React from "react";
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from "remotion";
import {AudioMix} from "./components/AudioMix";
import {Subtitles} from "./components/Subtitles";
import "./fonts";
import {S1Apertura} from "./scenes/S1Apertura";
import {S2Contexto} from "./scenes/S2Contexto";
import {S3Reto} from "./scenes/S3Reto";
import {S4Adquisicion} from "./scenes/S4Adquisicion";
import {S5Retencion} from "./scenes/S5Retencion";
import {S6Actividades} from "./scenes/S6Actividades";
import {S7Dashboard} from "./scenes/S7Dashboard";
import {S8Valor} from "./scenes/S8Valor";
import {S9Cierre} from "./scenes/S9Cierre";
import {C, SCENES} from "./theme";

const d = (s: {from: number; to: number}) => s.to - s.from;

/** Barrido amarillo y negro entre escenas: da continuidad en lugar de un corte. */
const Wipe: React.FC = () => {
  const frame = useCurrentFrame();
  const cuts = [SCENES.s2, SCENES.s3, SCENES.s4, SCENES.s5, SCENES.s6, SCENES.s7, SCENES.s8, SCENES.s9].map((s) => s.from);
  const cut = cuts.find((b) => frame >= b - 12 && frame <= b + 12);
  if (cut === undefined) return null;
  const p = interpolate(frame, [cut - 12, cut + 12], [0, 1], {easing: Easing.inOut(Easing.cubic)});
  return (
    <>
      <div style={{position: "absolute", top: 0, height: 1080, width: 2300, left: interpolate(p, [0, 1], [-2500, 2120]), background: C.black}} />
      <div style={{position: "absolute", top: 0, height: 1080, width: 2300, left: interpolate(p, [0, 1], [-2380, 2000]), background: C.yellow}} />
    </>
  );
};

export const LuminaVideo: React.FC<{subtitles: boolean; audio: boolean}> = ({subtitles, audio}) => {
  return (
    <AbsoluteFill style={{background: C.white}}>
      <Sequence name="1 · Apertura" from={SCENES.s1.from} durationInFrames={d(SCENES.s1)}>
        <S1Apertura duration={d(SCENES.s1)} />
      </Sequence>
      <Sequence name="2 · Contexto" from={SCENES.s2.from} durationInFrames={d(SCENES.s2)}>
        <S2Contexto start={SCENES.s2.from} duration={d(SCENES.s2)} />
      </Sequence>
      <Sequence name="3 · El reto" from={SCENES.s3.from} durationInFrames={d(SCENES.s3)}>
        <S3Reto start={SCENES.s3.from} duration={d(SCENES.s3)} />
      </Sequence>
      <Sequence name="4 · Adquisición" from={SCENES.s4.from} durationInFrames={d(SCENES.s4)}>
        <S4Adquisicion start={SCENES.s4.from} duration={d(SCENES.s4)} />
      </Sequence>
      <Sequence name="5 · Retención" from={SCENES.s5.from} durationInFrames={d(SCENES.s5)}>
        <S5Retencion start={SCENES.s5.from} duration={d(SCENES.s5)} />
      </Sequence>
      <Sequence name="6 · Cinco actividades" from={SCENES.s6.from} durationInFrames={d(SCENES.s6)}>
        <S6Actividades start={SCENES.s6.from} duration={d(SCENES.s6)} />
      </Sequence>
      <Sequence name="7 · Dashboard" from={SCENES.s7.from} durationInFrames={d(SCENES.s7)}>
        <S7Dashboard start={SCENES.s7.from} duration={d(SCENES.s7)} />
      </Sequence>
      <Sequence name="8 · Valor" from={SCENES.s8.from} durationInFrames={d(SCENES.s8)}>
        <S8Valor start={SCENES.s8.from} duration={d(SCENES.s8)} />
      </Sequence>
      <Sequence name="9 · Cierre" from={SCENES.s9.from} durationInFrames={d(SCENES.s9)}>
        <S9Cierre start={SCENES.s9.from} duration={d(SCENES.s9)} />
      </Sequence>
      <Wipe />
      {subtitles ? <Subtitles /> : null}
      {audio ? <AudioMix /> : null}
    </AbsoluteFill>
  );
};
