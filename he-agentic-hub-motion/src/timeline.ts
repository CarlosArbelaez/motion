/**
 * Línea de tiempo única (30 fps). Versión 5: alineada con la presentación
 * "HE Propuesta To-Be · Mariana Cárdenas" (11-nov-2026). El video abre la sesión.
 *
 * Locución: una sola toma (assets/audio/voice/source_takes/v5A.mp3), cortada en 7 frases
 * dentro de silencios. Los tiempos de cada palabra salen de su transcripción (ElevenLabs Scribe).
 */
export const FPS = 30;

export const SCENES = {
  hoy: { from: 0, to: 366 }, // Hoy · 5 dolores (punto de partida)
  mapa: { from: 366, to: 570 }, // Hoja de ruta
  ola0: { from: 570, to: 826 }, // Ola 0 · Preparar
  mvp: { from: 826, to: 1309 }, // MVP · ciclo mensual completo
  despues: { from: 1309, to: 1663 }, // Después del MVP
  impacto: { from: 1663, to: 1954 }, // Impacto
  cierre: { from: 1954, to: 2134 }, // Pase al deck
} as const;

export type SceneKey = keyof typeof SCENES;
export const TOTAL = SCENES.cierre.to;

/** La voz entra 6 fotogramas después del inicio de cada placa (10 en el cierre). */
const V = 6;

/** cut = segundo de la toma donde empieza cada archivo (para convertir tiempos de palabra). */
export const VOICE = [
  { file: "audio/voice/vo1.wav", from: SCENES.hoy.from + V, len: 340, cut: 0 },
  { file: "audio/voice/vo2.wav", from: SCENES.mapa.from + V, len: 153, cut: 11.57 },
  { file: "audio/voice/vo3.wav", from: SCENES.ola0.from + V, len: 226, cut: 16.84 },
  { file: "audio/voice/vo4.wav", from: SCENES.mvp.from + V, len: 447, cut: 24.46 },
  { file: "audio/voice/vo5.wav", from: SCENES.despues.from + V, len: 318, cut: 39.5 },
  { file: "audio/voice/vo6.wav", from: SCENES.impacto.from + V, len: 240, cut: 50.19 },
  { file: "audio/voice/vo7.wav", from: SCENES.cierre.from + 10, len: 120, cut: 58.31 },
] as const;

/** Fotograma absoluto en que se pronuncia el segundo `t` de la toma original, dentro de la frase i. */
export const word = (i: number, t: number) => VOICE[i].from + Math.round((t - VOICE[i].cut) * 30);
/** Igual que `word`, pero relativo al inicio de la placa que contiene la frase. */
export const wordLocal = (i: number, t: number, sceneFrom: number) => word(i, t) - sceneFrom;

const end = (i: number, hold = 8) => VOICE[i].from + VOICE[i].len + hold;

/** Subtítulos por frase; cada corte cae en una pausa real de la voz. */
export const SUBTITLES = [
  { from: word(0, 0), to: word(0, 2.1), text: "Hoy partimos de cinco dolores:" },
  { from: word(0, 2.1), to: word(0, 5.8), text: "el contrato no está en datos, el volumen se arma a mano," },
  { from: word(0, 5.8), to: word(0, 9.45), text: "la regla de pago no está escrita, los pagos no dejan rastro" },
  { from: word(0, 9.45), to: end(0, 14), text: "y nadie ve el estado real." },
  { from: word(1, 11.6), to: end(1, 14), text: "Avanzamos paso a paso: cada etapa arranca cuando la anterior ya demostró que funciona." },
  { from: word(2, 16.86), to: word(2, 19.88), text: "Primero, en la ola cero, preparamos las bases:" },
  { from: word(2, 19.88), to: end(2, 14), text: "reglas de pago aprobadas, cada contrato con su código y los accesos a los datos." },
  { from: word(3, 24.5), to: word(3, 29.6), text: "Luego construimos el MVP con el ciclo mensual completo, del contrato al pago." },
  { from: word(3, 29.6), to: word(3, 32.84), text: "La IA prellena la ficha y la analista la valida;" },
  { from: word(3, 32.84), to: word(3, 35.04), text: "las reglas calculan el cumplimiento;" },
  { from: word(3, 35.04), to: end(3, 14), text: "trade da el OK, cada aprobador aprueba por correo y Finanzas paga." },
  { from: word(4, 39.55), to: word(4, 44.44), text: "Después completamos el resto: consulta por chat, alertas y un brief para negociar." },
  { from: word(4, 44.44), to: end(4, 14), text: "Cuando los cortes coinciden con el Excel y High End da el visto bueno, el sistema pasa a ser oficial." },
  { from: word(5, 50.25), to: word(5, 54.09), text: "Así, cada peso se paga con regla, soporte y aprobador." },
  { from: word(5, 54.09), to: end(5, 20), text: "Y la meta: cincuenta por ciento menos trabajo manual a seis meses." },
  { from: word(6, 58.35), to: TOTAL - 6, text: "Las reglas calculan, la IA propone y las personas deciden." },
];

/** Momentos clave (fotogramas absolutos) que comparten animación y efectos. */
export const CUE = {
  dolor: [word(0, 2.12), word(0, 4.04), word(0, 5.84), word(0, 7.92), word(0, 9.52)],
  ola0Item: [word(2, 19.92), word(2, 21.36), word(2, 22.96), word(2, 23.9)],
  mvpCiclo: word(3, 26.88),
  mvpIA: word(3, 29.76),
  mvpAnalista: word(3, 31.4),
  mvpReglas: word(3, 32.88),
  mvpTrade: word(3, 35.12),
  mvpAprobador: word(3, 36.32),
  mvpFinanzas: word(3, 38.08),
  chat: word(4, 41.48),
  alertas: word(4, 42.6),
  brief: word(4, 43.2),
  cortes: word(4, 44.56),
  oficial: word(4, 46.64),
  regla: word(5, 52.0),
  soporte: word(5, 52.56),
  aprobador: word(5, 53.2),
  meta: word(5, 54.4),
} as const;

/** Efectos sincronizados con transformaciones y confirmaciones (fotogramas absolutos). */
export const SFX: ReadonlyArray<{ file: string; frame: number; volume: number }> = [
  ...CUE.dolor.map((f) => ({ file: "tick", frame: f, volume: 0.45 })),
  { file: "whoosh", frame: SCENES.mapa.from - 10, volume: 0.6 },
  ...[0, 1, 2, 3, 4, 5].map((i) => ({ file: "pop", frame: SCENES.mapa.from + 22 + i * 16, volume: 0.4 })),
  { file: "whoosh", frame: SCENES.ola0.from - 10, volume: 0.6 },
  ...CUE.ola0Item.map((f) => ({ file: "confirm", frame: f + 8, volume: 0.38 })),
  { file: "whoosh", frame: SCENES.mvp.from - 10, volume: 0.6 },
  { file: "pop", frame: CUE.mvpIA, volume: 0.45 },
  { file: "confirm", frame: CUE.mvpAnalista + 10, volume: 0.45 },
  { file: "rise", frame: CUE.mvpReglas - 6, volume: 0.4 },
  { file: "confirm", frame: CUE.mvpTrade + 8, volume: 0.42 },
  { file: "confirm", frame: CUE.mvpAprobador + 10, volume: 0.42 },
  { file: "snap", frame: CUE.mvpFinanzas + 6, volume: 0.5 },
  { file: "whoosh", frame: SCENES.despues.from - 10, volume: 0.6 },
  { file: "pop", frame: CUE.chat, volume: 0.42 },
  { file: "pop", frame: CUE.alertas, volume: 0.42 },
  { file: "pop", frame: CUE.brief, volume: 0.42 },
  { file: "confirm", frame: CUE.cortes + 8, volume: 0.42 },
  { file: "snap", frame: CUE.oficial + 8, volume: 0.5 },
  { file: "whoosh", frame: SCENES.impacto.from - 10, volume: 0.6 },
  { file: "tick", frame: CUE.regla, volume: 0.45 },
  { file: "tick", frame: CUE.soporte, volume: 0.45 },
  { file: "tick", frame: CUE.aprobador, volume: 0.45 },
  { file: "rise", frame: CUE.meta - 10, volume: 0.4 },
  { file: "whoosh", frame: SCENES.cierre.from - 6, volume: 0.6 },
  { file: "resolve", frame: SCENES.cierre.from + 22, volume: 0.55 },
];

/** Música: volumen base y reducción automática bajo la voz. */
export const MUSIC = { base: 0.5, ducked: 0.15, ramp: 8 } as const;

/** Ganancias de mezcla (dejan margen para que el pico quede por debajo de -1 dBFS). */
export const MIX = { voice: 0.74, sfx: 0.6 } as const;
