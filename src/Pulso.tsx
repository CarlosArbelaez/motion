import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import tiempos from "../data/tiempos.json";
import { guion } from "./guion";
import { Token } from "./theme";
import { Subtitulos, Cue } from "./components/Subtitulos";
import { Cortes, Corte } from "./components/Cortes";
import { Escena1Gancho } from "./scenes/Escena1Gancho";
import { Escena2Numeros } from "./scenes/Escena2Numeros";
import { Escena3Top } from "./scenes/Escena3Top";
import { EscenaCortina } from "./scenes/EscenaCortina";
import { EscenaRanking } from "./scenes/EscenaRanking";
import { EscenaAdemas } from "./scenes/EscenaAdemas";
import { Escena4NumeroUno } from "./scenes/Escena4NumeroUno";
import { Escena5Areas } from "./scenes/Escena5Areas";
import { Escena6Cierre } from "./scenes/Escena6Cierre";

export const TOTAL = tiempos.total;
export const FPS = tiempos.fps;

type Tiempo = (typeof tiempos.escenas)[number];

// Cada escena recibe los momentos reales en que la voz dice cada frase.
const escena = (e: Tiempo): React.ReactNode => {
  const n = Number(e.id.slice(-1));
  switch (e.tipo) {
    case "gancho":
      return <Escena1Gancho />;
    case "cortina":
      return <EscenaCortina seccion={e.seccion} />;
    case "numeros":
      return <Escena2Numeros indice={n} />;
    case "ranking":
      return <EscenaRanking />;
    case "top":
      return <Escena3Top item={guion.top[n]} duracion={e.duracion} momentos={e.momentos} />;
    case "ademas":
      return <EscenaAdemas />;
    case "numeroUno":
      return <Escena4NumeroUno duracion={e.duracion} momentos={e.momentos} telon />;
    case "areas":
      return <Escena5Areas momentos={e.momentos} />;
    case "cierre":
      return <Escena6Cierre fraseEn={e.momentos[1] - 4} firmaEn={e.momentos[2] - 4} />;
    default:
      return null;
  }
};

const AMARILLAS = ["cortina", "ranking", "numeroUno"];

// Corte de bloque al entrar a cada escena: amarillo, salvo que una de las dos escenas ya sea amarilla.
const corteDe = (antes: Tiempo, e: Tiempo, i: number): Omit<Corte, "en"> => {
  const tocaAmarillo = AMARILLAS.includes(antes.tipo) || AMARILLAS.includes(e.tipo);
  const color: Token = tocaAmarillo || (antes.tipo === "numeros" && e.tipo === "numeros") ? "colors-text-black-static" : "colors-status-brand-base";
  return { color, eje: i % 2 === 0 ? "y" : "x", sentido: i % 4 < 2 ? 1 : -1 };
};

export const Pulso: React.FC<{ conVoz?: boolean }> = ({ conVoz = true }) => {
  const cues: Cue[] = tiempos.escenas.flatMap((e) => e.subtitulos.map((s) => ({ ...s, sobreAmarillo: e.tipo === "numeroUno" })));
  const cortes: Corte[] = tiempos.escenas.slice(1).map((e, i) => ({ en: e.desde, ...corteDe(tiempos.escenas[i], e, i) }));
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {tiempos.escenas.map((e) => (
        <Sequence key={e.id} name={e.id} from={e.desde} durationInFrames={e.duracion}>
          {escena(e)}
        </Sequence>
      ))}
      <Cortes cortes={cortes} />
      <Subtitulos cues={cues} />
      {conVoz
        ? tiempos.escenas
            .filter((e) => e.audio)
            .map((e) => (
              <Sequence key={e.id} name={`voz-${e.id}`} from={e.vozDesde} layout="none">
                <Audio src={staticFile(e.audio as string)} />
              </Sequence>
            ))
        : null}
    </AbsoluteFill>
  );
};
