import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Subtitulos, Cue } from "../components/Subtitulos";
import { Cortes, Corte, TipoCorte } from "../components/Cortes";
import { Sfx } from "../motion";
import { PILLS, EscenaPill, GuionPill } from "./datos";
import { PillIntro, PillIniciativa, PillCierre } from "./Escenas";

export const FPS_PILL = 30;
export const totalDe = (id: string) => PILLS[id].tiempos.total;

const escena = (e: EscenaPill, guion: GuionPill): React.ReactNode => {
  if (e.tipo === "pillIntro") return <PillIntro guion={guion} />;
  if (e.tipo === "pillCierre") return <PillCierre guion={guion} />;
  return <PillIniciativa guion={guion} indice={Number(e.id.replace("ini", ""))} momentos={e.momentos} />;
};

const TIPOS: TipoCorte[] = ["estela", "persianas", "diagonal", "columnas", "obturador"];

type Cue2 = { frame: number; src: string; lead: number; volumen: number };
// Efectos en los momentos clave: cortes, cambio a la solución, la cifra de impacto y la firma.
const efectos = (escenas: EscenaPill[]): Cue2[] =>
  escenas.flatMap((e, i) => {
    const corte: Cue2[] = i === 0 ? [] : [{ frame: e.desde, src: "sfx/whoosh-short.wav", lead: 4, volumen: 0.3 }];
    if (e.tipo === "pillIni") {
      const [, , solucion, impacto] = e.momentos;
      return [
        ...corte,
        { frame: e.desde + solucion - 6, src: "sfx/swish-fast.wav", lead: 3, volumen: 0.26 },
        { frame: e.desde + impacto - 4, src: "sfx/hit.wav", lead: 0, volumen: 0.42 },
        { frame: e.desde + impacto + 8, src: "sfx/shimmer.wav", lead: 0, volumen: 0.2 },
      ];
    }
    if (e.tipo === "pillCierre") return [...corte, { frame: e.desde + 4, src: "sfx/boom.wav", lead: 0, volumen: 0.4 }];
    return corte;
  });

// La música baja mientras habla la voz y sube en silencios y cortes.
const RAMPA = 9;
const volumenMusica = (escenas: EscenaPill[], frame: number, conVoz: boolean) => {
  if (!conVoz) return 0.42;
  const k = Math.max(0, ...escenas.map((e) => Math.min(1, Math.min(frame - e.vozDesde + RAMPA, e.vozDesde + e.vozDuracion + RAMPA - frame) / RAMPA)));
  return 0.42 + (0.1 - 0.42) * k * k * (3 - 2 * k);
};

export const Pill: React.FC<{ id: string; conVoz?: boolean; conMusica?: boolean; conSubtitulos?: boolean }> = ({ id, conVoz = true, conMusica = true, conSubtitulos = true }) => {
  const { guion, tiempos } = PILLS[id];
  const escenas = tiempos.escenas;
  const cues: Cue[] = escenas.flatMap((e) => e.subtitulos.map((s) => ({ ...s, sobreAmarillo: false })));
  const cortes: Corte[] = escenas.slice(1).map((e, i) => ({ en: e.desde, color: "colors-status-brand-base", tipo: TIPOS[i % TIPOS.length], sentido: i % 2 === 0 ? 1 : -1 }));
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {escenas.map((e) => (
        <Sequence key={e.id} name={e.id} from={e.desde} durationInFrames={e.duracion}>
          {escena(e, guion)}
        </Sequence>
      ))}
      <Cortes cortes={cortes} />
      {conSubtitulos ? <Subtitulos cues={cues} /> : null}
      {conVoz
        ? escenas.map((e) => (
            <Sequence key={e.id} name={`voz-${e.id}`} from={e.vozDesde} layout="none">
              <Audio src={staticFile(e.audio)} />
            </Sequence>
          ))
        : null}
      {conMusica ? <Audio src={staticFile(`musica/pulse-${id}.wav`)} volume={(f) => volumenMusica(escenas, f, conVoz)} /> : null}
      {conMusica ? efectos(escenas).map((x) => <Sfx key={`${x.frame}-${x.src}`} src={x.src} at={x.frame} lead={x.lead} volume={x.volumen} />) : null}
    </AbsoluteFill>
  );
};
