/**
 * Línea de tiempo única (30 fps). Versión 3: 63,2 s, ritmo de lectura cómodo.
 * Escenas, locución, subtítulos y efectos se controlan desde aquí.
 */
export const FPS = 30;

export const SCENES = {
  hoy: { from: 0, to: 290 }, // 00:00–00:09.7 Hoy · los dolores actuales son el punto de partida
  mapa: { from: 290, to: 515 }, // 00:09.7–00:17.2 Hoja de ruta por olas
  ola0: { from: 515, to: 710 }, // 00:17.2–00:23.7 Ola 0 · Validar
  ola1: { from: 710, to: 1085 }, // 00:23.7–00:36.2 Ola 1 · MVP
  ola2: { from: 1085, to: 1340 }, // 00:36.2–00:44.7 Ola 2 · Pago y agentes
  ola3: { from: 1340, to: 1535 }, // 00:44.7–00:51.2 Ola 3 · Evolución
  impacto: { from: 1535, to: 1760 }, // 00:51.2–00:58.7 Impacto esperado
  decision: { from: 1760, to: 1895 }, // 00:58.7–01:03.2 Decisión
} as const;

export type SceneKey = keyof typeof SCENES;
export const TOTAL = SCENES.decision.to;

/** La voz entra 12 fotogramas después del inicio de cada placa. */
const V = 12;

/** Locución (ElevenLabs, voz "Herduin", español de Colombia). len = duración del archivo en fotogramas. */
export const VOICE = [
  { file: "audio/voice/vo1.wav", from: SCENES.hoy.from + 9, len: 231 },
  { file: "audio/voice/vo2.wav", from: SCENES.mapa.from + V, len: 153 },
  { file: "audio/voice/vo3.wav", from: SCENES.ola0.from + V, len: 144 },
  { file: "audio/voice/vo4.wav", from: SCENES.ola1.from + V, len: 308 },
  { file: "audio/voice/vo5.wav", from: SCENES.ola2.from + V, len: 182 },
  { file: "audio/voice/vo6.wav", from: SCENES.ola3.from + V, len: 132 },
  { file: "audio/voice/vo7.wav", from: SCENES.impacto.from + V, len: 120 },
  { file: "audio/voice/vo8.wav", from: SCENES.decision.from + 18, len: 58 },
] as const;

const at = (i: number, offset = 0) => VOICE[i].from + offset;
const end = (i: number, hold = 8) => VOICE[i].from + VOICE[i].len + hold;

/** Subtítulos por frase, fieles a la locución (cortes en las pausas reales de la voz). */
export const SUBTITLES = [
  { from: at(0, 1), to: at(0, 147), text: "Hoy, cada contrato exige transcribir, cruzar datos y perseguir aprobaciones." },
  { from: at(0, 147), to: end(0, 14), text: "Esos dolores son nuestro punto de partida." },
  { from: at(1, 1), to: end(1), text: "Proponemos avanzar por olas: cada una se abre solo si la anterior cumple su compuerta." },
  { from: at(2, 1), to: end(2), text: "Primero, en la ola cero, validamos reglas y datos, y medimos la línea base." },
  { from: at(3, 1), to: at(3, 92), text: "Luego, en la ola uno, desarrollamos el MVP:" },
  { from: at(3, 92), to: at(3, 195), text: "una ficha única con contrato, soportes y reglas;" },
  { from: at(3, 195), to: end(3), text: "el cálculo automático del cumplimiento, y consultas con IA." },
  { from: at(4, 1), to: at(4, 144), text: "Después, en la ola dos, la IA propone; las personas validan y aprueban." },
  { from: at(4, 144), to: end(4), text: "Finanzas paga." },
  { from: at(5, 1), to: end(5), text: "Finalmente, en la ola tres, un brief con evidencia fortalece la negociación." },
  { from: at(6, 1), to: end(6, 20), text: "La meta: cincuenta por ciento menos trabajo manual a seis meses." },
  { from: at(7, 1), to: TOTAL - 6, text: "Aprobemos el inicio del desarrollo." },
];

/** Efectos sincronizados con transformaciones y confirmaciones (offset = fotograma local de la placa). */
const SFX_LOCAL: ReadonlyArray<{ scene: SceneKey; offset: number; file: string; volume: number }> = [
  // Hoy
  { scene: "hoy", offset: 22, file: "tick", volume: 0.5 },
  { scene: "hoy", offset: 42, file: "tick", volume: 0.45 },
  { scene: "hoy", offset: 62, file: "tick", volume: 0.45 },
  { scene: "hoy", offset: 82, file: "tick", volume: 0.45 },
  { scene: "hoy", offset: 271, file: "whoosh", volume: 0.65 },
  // Mapa
  { scene: "mapa", offset: 36, file: "pop", volume: 0.45 },
  { scene: "mapa", offset: 62, file: "pop", volume: 0.45 },
  { scene: "mapa", offset: 88, file: "pop", volume: 0.45 },
  { scene: "mapa", offset: 114, file: "pop", volume: 0.45 },
  { scene: "mapa", offset: 212, file: "whoosh", volume: 0.6 },
  // Ola 0
  { scene: "ola0", offset: 48, file: "confirm", volume: 0.4 },
  { scene: "ola0", offset: 68, file: "confirm", volume: 0.4 },
  { scene: "ola0", offset: 88, file: "confirm", volume: 0.4 },
  { scene: "ola0", offset: 108, file: "confirm", volume: 0.4 },
  { scene: "ola0", offset: 128, file: "confirm", volume: 0.4 },
  { scene: "ola0", offset: 182, file: "whoosh", volume: 0.6 },
  // Ola 1
  { scene: "ola1", offset: 14, file: "snap", volume: 0.6 },
  { scene: "ola1", offset: 162, file: "confirm", volume: 0.5 },
  { scene: "ola1", offset: 210, file: "rise", volume: 0.45 },
  { scene: "ola1", offset: 268, file: "pop", volume: 0.5 },
  { scene: "ola1", offset: 292, file: "pop", volume: 0.45 },
  { scene: "ola1", offset: 362, file: "whoosh", volume: 0.6 },
  // Ola 2
  { scene: "ola2", offset: 30, file: "pop", volume: 0.45 },
  { scene: "ola2", offset: 55, file: "pop", volume: 0.45 },
  { scene: "ola2", offset: 110, file: "confirm", volume: 0.5 },
  { scene: "ola2", offset: 142, file: "confirm", volume: 0.5 },
  { scene: "ola2", offset: 173, file: "snap", volume: 0.55 },
  { scene: "ola2", offset: 193, file: "confirm", volume: 0.45 },
  { scene: "ola2", offset: 242, file: "whoosh", volume: 0.6 },
  // Ola 3
  { scene: "ola3", offset: 78, file: "snap", volume: 0.5 },
  { scene: "ola3", offset: 118, file: "confirm", volume: 0.45 },
  { scene: "ola3", offset: 182, file: "whoosh", volume: 0.6 },
  // Impacto
  { scene: "impacto", offset: 26, file: "rise", volume: 0.45 },
  { scene: "impacto", offset: 104, file: "tick", volume: 0.45 },
  { scene: "impacto", offset: 120, file: "tick", volume: 0.45 },
  { scene: "impacto", offset: 136, file: "tick", volume: 0.45 },
  { scene: "impacto", offset: 212, file: "whoosh", volume: 0.6 },
  // Decisión
  { scene: "decision", offset: 22, file: "resolve", volume: 0.6 },
];

export const SFX = SFX_LOCAL.map((s) => ({
  file: s.file,
  frame: SCENES[s.scene].from + s.offset,
  volume: s.volume,
}));

/** Música: volumen base y reducción automática bajo la voz. */
export const MUSIC = { base: 0.5, ducked: 0.15, ramp: 8 } as const;

/** Ganancias de mezcla (dejan margen para que el pico quede por debajo de -1 dBFS). */
export const MIX = { voice: 0.74, sfx: 0.6 } as const;
