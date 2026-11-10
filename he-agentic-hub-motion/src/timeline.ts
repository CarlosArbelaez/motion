/**
 * Línea de tiempo única (30 fps, 900 fotogramas = 30 s).
 * Escenas, locución, subtítulos y efectos se controlan desde aquí.
 */
export const FPS = 30;
export const TOTAL = 900;

export const SCENES = {
  p1: { from: 0, to: 120 }, // 00:00–00:04 Punto de partida
  p2: { from: 120, to: 330 }, // 00:04–00:11 NOW
  p3: { from: 330, to: 510 }, // 00:11–00:17 NEXT
  p4: { from: 510, to: 630 }, // 00:17–00:21 LATER
  p5: { from: 630, to: 810 }, // 00:21–00:27 Impacto
  p6: { from: 810, to: 900 }, // 00:27–00:30 Decisión
} as const;

/** Locución (ElevenLabs, voz "Herduin", español de Colombia). len = duración del archivo en fotogramas. */
export const VOICE = [
  { file: "audio/voice/vo1.wav", from: 0, len: 119 },
  { file: "audio/voice/vo2.wav", from: 132, len: 172 },
  { file: "audio/voice/vo3.wav", from: 342, len: 158 },
  { file: "audio/voice/vo4.wav", from: 519, len: 94 },
  { file: "audio/voice/vo5.wav", from: 643, len: 119 },
  { file: "audio/voice/vo6.wav", from: 817, len: 52 },
] as const;

/** Subtítulos por frase, fieles a la locución. */
export const SUBTITLES = [
  { from: 2, to: 121, text: "Hoy, un contrato exige transcribir, cruzar datos y perseguir aprobaciones." },
  { from: 133, to: 221, text: "El MVP reúne contrato, soportes y reglas;" },
  { from: 221, to: 312, text: "automatiza cálculos y habilita consultas con IA." },
  { from: 343, to: 462, text: "Después, la IA propone; las personas validan y aprueban." },
  { from: 462, to: 508, text: "Finanzas paga." },
  { from: 520, to: 624, text: "Luego, un brief con evidencia fortalece la negociación." },
  { from: 644, to: 790, text: "La meta: cincuenta por ciento menos trabajo manual a seis meses." },
  { from: 818, to: 896, text: "Aprobemos el inicio del desarrollo." },
] as const;

/** Efectos sincronizados con transformaciones y confirmaciones. */
export const SFX: ReadonlyArray<{ file: string; frame: number; volume: number }> = [
  { file: "tick", frame: 14, volume: 0.5 },
  { file: "tick", frame: 26, volume: 0.45 },
  { file: "tick", frame: 38, volume: 0.45 },
  { file: "tick", frame: 50, volume: 0.45 },
  { file: "whoosh", frame: 104, volume: 0.7 },
  { file: "snap", frame: 136, volume: 0.6 },
  { file: "confirm", frame: 202, volume: 0.55 },
  { file: "rise", frame: 208, volume: 0.45 },
  { file: "pop", frame: 268, volume: 0.5 },
  { file: "pop", frame: 290, volume: 0.45 },
  { file: "whoosh", frame: 322, volume: 0.65 },
  { file: "pop", frame: 352, volume: 0.45 },
  { file: "pop", frame: 372, volume: 0.45 },
  { file: "confirm", frame: 410, volume: 0.5 },
  { file: "confirm", frame: 438, volume: 0.5 },
  { file: "snap", frame: 462, volume: 0.55 },
  { file: "confirm", frame: 478, volume: 0.45 },
  { file: "whoosh", frame: 503, volume: 0.6 },
  { file: "snap", frame: 566, volume: 0.5 },
  { file: "confirm", frame: 594, volume: 0.45 },
  { file: "whoosh", frame: 624, volume: 0.6 },
  { file: "rise", frame: 652, volume: 0.45 },
  { file: "tick", frame: 712, volume: 0.45 },
  { file: "tick", frame: 724, volume: 0.45 },
  { file: "tick", frame: 736, volume: 0.45 },
  { file: "whoosh", frame: 806, volume: 0.6 },
  { file: "resolve", frame: 832, volume: 0.6 },
];

/** Música: volumen base y reducción automática bajo la voz. */
export const MUSIC = { base: 0.5, ducked: 0.15, ramp: 8 } as const;

/** Ganancias de mezcla (dejan margen para que el pico quede por debajo de -1 dBFS). */
export const MIX = { voice: 0.74, sfx: 0.6 } as const;
