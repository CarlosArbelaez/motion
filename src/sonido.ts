import tiempos from "../data/tiempos.json";

// Efectos en los momentos clave. Los archivos salen de `node scripts/motion-make-sfx.mjs` (public/sfx/).
export type SoundCue = { frame: number; src: string; lead: number; volumen: number; nota: string };

type Escena = { id: string; tipo: string; desde: number; duracion: number; momentos: number[]; vozDesde?: number; vozDuracion?: number };
const escenas = tiempos.escenas as Escena[];

const sfx = (n: string) => `sfx/${n}.wav`;

export const SOUND_CUES: SoundCue[] = escenas.flatMap((e, i) => {
  const corte: SoundCue[] = i === 0 ? [] : [{ frame: e.desde, src: sfx(e.tipo === "numeros" ? "swish-fast" : "whoosh-short"), lead: 4, volumen: 0.3, nota: `corte a ${e.id}` }];
  if (e.tipo === "top" || e.tipo === "numeroUno") {
    const [, , , solucion, impacto] = e.momentos;
    return [
      ...corte,
      { frame: e.desde + solucion - 6, src: sfx("swish-fast"), lead: 3, volumen: 0.26, nota: `${e.id}: solución` },
      { frame: e.desde + impacto - 4, src: sfx("hit"), lead: 0, volumen: 0.42, nota: `${e.id}: cifra con IA` },
      { frame: e.desde + impacto + 8, src: sfx("shimmer"), lead: 0, volumen: 0.2, nota: `${e.id}: destello` },
    ];
  }
  if (e.tipo === "areas") return [...corte, { frame: e.desde + e.momentos[1] - 6, src: sfx("whoosh-long"), lead: 4, volumen: 0.3, nota: "mensaje de áreas" }];
  if (e.tipo === "cierre") return [...corte, { frame: e.desde + e.momentos[2] - 4, src: sfx("boom"), lead: 0, volumen: 0.45, nota: "firma del equipo" }];
  return corte;
});

// Música: baja mientras habla la voz y sube en los silencios y cortes.
const VOZ = escenas.filter((e) => e.vozDesde !== undefined && e.vozDuracion).map((e) => [e.vozDesde as number, (e.vozDesde as number) + (e.vozDuracion as number)]);
const RAMPA = 9;
export const volumenMusica = (frame: number, conVoz: boolean): number => {
  const alto = 0.42;
  if (!conVoz) return alto;
  const bajo = 0.1;
  // Cercanía a la ventana de voz más próxima: 1 dentro, 0 a RAMPA fotogramas o más
  const dentro = VOZ.reduce((m, [a, b]) => Math.max(m, Math.min(1, Math.min(frame - a + RAMPA, b + RAMPA - frame) / RAMPA)), 0);
  const k = Math.max(0, dentro);
  return alto + (bajo - alto) * k * k * (3 - 2 * k);
};
