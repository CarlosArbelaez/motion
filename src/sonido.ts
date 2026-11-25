import tiempos from "../data/tiempos.json";

// Momentos clave para sonido. Aún no hay assets de Mister Horse en el proyecto:
// cuando exista public/mh/catalog.json, cada entrada se convierte en un <Sfx>.
export type SoundCue = { frame: number; categoria: "swoosh" | "transition" | "pop" | "boom" | "glitter"; lead: number; nota: string };

type Escena = { id: string; tipo: string; desde: number; momentos: number[] };

export const SOUND_CUES: SoundCue[] = (tiempos.escenas as Escena[]).flatMap((e) => {
  const corte: SoundCue = { frame: e.desde, categoria: "transition", lead: 4, nota: `corte a ${e.id}` };
  if (e.tipo === "top" || e.tipo === "numeroUno") {
    const [, , , solucion, impacto] = e.momentos;
    return [
      corte,
      { frame: e.desde + solucion, categoria: "swoosh", lead: 3, nota: `${e.id}: solución` },
      { frame: e.desde + impacto, categoria: "boom", lead: 0, nota: `${e.id}: cifra con IA` },
      { frame: e.desde + impacto + 10, categoria: "glitter", lead: 0, nota: `${e.id}: destello` },
    ];
  }
  if (e.tipo === "areas") return [corte, { frame: e.desde + e.momentos[1], categoria: "swoosh", lead: 3, nota: "mensaje de cierre de áreas" }];
  if (e.tipo === "cierre") return [corte, { frame: e.desde + e.momentos[1], categoria: "boom", lead: 0, nota: "firma del equipo" }];
  return [corte];
});
