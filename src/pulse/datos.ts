import mr from "../../data/pulse/marketing-revenue.json";
import mrT from "../../data/pulse/marketing-revenue.tiempos.json";

// Cada pill de Brew AI Pulse: su guion (texto en pantalla y voz) y su línea de tiempo.
// Para añadir una pill: data/pulse/<id>.json, `python3 scripts/pulse.py <id>` y una entrada aquí.
export type GuionPill = typeof mr;
export type Iniciativa = GuionPill["iniciativas"][number];
export type TiemposPill = typeof mrT;
export type EscenaPill = TiemposPill["escenas"][number];

export const PILLS: Record<string, { guion: GuionPill; tiempos: TiemposPill }> = {
  "marketing-revenue": { guion: mr, tiempos: mrT },
};
