/**
 * Línea de tiempo única (30 fps). Versión 2: 61 s, ritmo de lectura cómodo.
 * Escenas, locución, subtítulos y efectos se controlan desde aquí.
 */
export const FPS = 30;

export const SCENES = {
  hoy: { from: 0, to: 225 }, // 00:00–00:07.5 Hoy · punto de partida
  mapa: { from: 225, to: 450 }, // 00:07.5–00:15 Hoja de ruta por olas
  ola0: { from: 450, to: 645 }, // 00:15–00:21.5 Ola 0 · Validar
  ola1: { from: 645, to: 1020 }, // 00:21.5–00:34 Ola 1 · MVP
  ola2: { from: 1020, to: 1275 }, // 00:34–00:42.5 Ola 2 · Pago y agentes
  ola3: { from: 1275, to: 1470 }, // 00:42.5–00:49 Ola 3 · Evolución
  impacto: { from: 1470, to: 1695 }, // 00:49–00:56.5 Impacto esperado
  decision: { from: 1695, to: 1830 }, // 00:56.5–01:01 Decisión
} as const;

export type SceneKey = keyof typeof SCENES;
export const TOTAL = SCENES.decision.to;

/** La voz entra 12 fotogramas después del inicio de cada placa. */
const V = 12;

/** Locución (ElevenLabs, voz "Herduin", español de Colombia). len = duración del archivo en fotogramas. */
export const VOICE = [
  { file: "audio/voice/vo1.wav", from: SCENES.hoy.from + 9, len: 200 },
  { file: "audio/voice/vo2.wav", from: SCENES.mapa.from + V, len: 153 },
  { file: "audio/voice/vo3.wav", from: SCENES.ola0.from + V, len: 144 },
  { file: "audio/voice/vo4.wav", from: SCENES.ola1.from + V, len: 303 },
  { file: "audio/voice/vo5.wav", from: SCENES.ola2.from + V, len: 182 },
  { file: "audio/voice/vo6.wav", from: SCENES.ola3.from + V, len: 132 },
  { file: "audio/voice/vo7.wav", from: SCENES.impacto.from + V, len: 120 },
  { file: "audio/voice/vo8.wav", from: SCENES.decision.from + 18, len: 58 },
] as const;

const at = (i: number, offset = 0) => VOICE[i].from + offset;
const end = (i: number, hold = 8) => VOICE[i].from + VOICE[i].len + hold;

/** Subtítulos por frase, fieles a la locución (cortes en las pausas reales de la voz). */
export const SUBTITLES = [
  { from: at(0, 1), to: at(0, 60), text: "Hoy, nuestro punto de partida:" },
  { from: at(0, 60), to: end(0), text: "cada contrato exige transcribir, cruzar datos y perseguir aprobaciones." },
  { from: at(1, 1), to: end(1), text: "Proponemos avanzar por olas: cada una se abre solo si la anterior cumple su compuerta." },
  { from: at(2, 1), to: end(2), text: "Primero, en la ola cero, validamos reglas y datos, y medimos la línea base." },
  { from: at(3, 1), to: at(3, 131), text: "Luego, en la ola uno, el primer desarrollo: el MVP." },
  { from: at(3, 131), to: end(3), text: "Reúne contrato, soportes y reglas; automatiza cálculos y habilita consultas con IA." },
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
  { scene: "hoy", offset: 206, file: "whoosh", volume: 0.65 },
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
  { scene: "ola1", offset: 132, file: "confirm", volume: 0.5 },
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
