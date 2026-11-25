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
import { EscenaRanking } from "./scenes/EscenaRanking";
import { EscenaAdemas } from "./scenes/EscenaAdemas";
import { Escena4NumeroUno } from "./scenes/Escena4NumeroUno";
import { Escena5Gracias } from "./scenes/Escena5Gracias";
import { Escena6Cierre } from "./scenes/Escena6Cierre";

export const TOTAL = tiempos.total;
export const FPS = tiempos.fps;

type Tiempo = (typeof tiempos.escenas)[number];

const escena = (e: Tiempo): React.ReactNode => {
  const id = e.id;
  if (id === "gancho") return <Escena1Gancho />;
  if (id.startsWith("numeros")) return <Escena2Numeros indice={Number(id.slice(-1))} />;
  if (id === "ranking") return <EscenaRanking />;
  if (id === "ademas") return <EscenaAdemas />;
  // En el top, el nombre y la cifra entran cuando la voz los dice (2.ª y 3.ª frase).
  if (id.startsWith("top"))
    return <Escena3Top item={guion.top[Number(id.slice(-1))]} duracion={e.duracion} nombreEn={Math.max(10, e.subtitulos[1].desde - e.desde - 6)} cifraEn={e.subtitulos[2].desde - e.desde - 4} />;
  if (id === "numeroUno") return <Escena4NumeroUno />;
  if (id === "gracias") return <Escena5Gracias />;
  if (id === "cierre") return <Escena6Cierre />;
  return null;
};

// Color y dirección del corte de bloque al entrar a cada escena.
const corteDe = (id: string, i: number): Omit<Corte, "en"> => {
  const color: Token = id === "numeroUno" ? "colors-text-black-static" : id.startsWith("numeros") && id !== "numeros0" ? "colors-text-primary" : "colors-status-brand-base";
  return { color, eje: i % 2 === 0 ? "y" : "x", sentido: i % 4 < 2 ? 1 : -1 };
};

export const Pulso: React.FC<{ conVoz?: boolean }> = ({ conVoz = true }) => {
  const cues: Cue[] = tiempos.escenas.flatMap((e) => e.subtitulos.map((s) => ({ ...s, sobreAmarillo: e.id === "numeroUno" })));
  const cortes: Corte[] = tiempos.escenas.slice(1).map((e, i) => ({ en: e.desde, ...corteDe(e.id, i) }));
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
        ? tiempos.escenas.map((e) => (
            <Sequence key={e.id} name={`voz-${e.id}`} from={e.vozDesde} layout="none">
              <Audio src={staticFile(e.audio)} />
            </Sequence>
          ))
        : null}
    </AbsoluteFill>
  );
};
