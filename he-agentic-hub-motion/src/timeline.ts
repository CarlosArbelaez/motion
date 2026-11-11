/**
 * Línea de tiempo única (30 fps). Versión 6: alineada con el To-Be v4.1 y la presentación
 * "HE Propuesta To-Be · Mariana Cárdenas · final v2" (suma el desempeño del canal y cierra con
 * las tres decisiones). El video abre la sesión.
 *
 * Locución: una sola toma (assets/audio/voice/source_takes/v6A.mp3), cortada en 8 frases
 * dentro de silencios. Los tiempos de cada palabra salen de su transcripción (ElevenLabs Scribe).
 */
export const FPS = 30;

export const SCENES = {
  hoy: { from: 0, to: 391 }, // Hoy · 5 dolores (punto de partida)
  mapa: { from: 391, to: 600 }, // Hoja de ruta
  ola0: { from: 600, to: 944 }, // Ola 0 · Preparar
  mvp: { from: 944, to: 1558 }, // MVP · ciclo mensual completo + desempeño del canal
  despues: { from: 1558, to: 2013 }, // Después del MVP
  impacto: { from: 2013, to: 2365 }, // Impacto
  cierre: { from: 2365, to: 2800 }, // Tres decisiones + frase central
} as const;

export type SceneKey = keyof typeof SCENES;
export const TOTAL = SCENES.cierre.to;

/** La voz entra 6 fotogramas después del inicio de cada placa. */
const V = 6;

/** cut = segundo de la toma donde empieza cada archivo (para convertir tiempos de palabra). */
export const VOICE = [
  { file: "audio/voice/vo1.wav", from: SCENES.hoy.from + V, len: 365, cut: 0 },
  { file: "audio/voice/vo2.wav", from: SCENES.mapa.from + V, len: 158, cut: 12.63 },
  { file: "audio/voice/vo3.wav", from: SCENES.ola0.from + V, len: 288, cut: 18.18 },
  { file: "audio/voice/vo4.wav", from: SCENES.mvp.from + V, len: 568, cut: 28.1 },
  { file: "audio/voice/vo5.wav", from: SCENES.despues.from + V, len: 413, cut: 47.36 },
  { file: "audio/voice/vo6.wav", from: SCENES.impacto.from + V, len: 296, cut: 61.22 },
  { file: "audio/voice/vo7.wav", from: SCENES.cierre.from + 10, len: 245, cut: 71.39 },
  { file: "audio/voice/vo8.wav", from: SCENES.cierre.from + 263, len: 120, cut: 79.59 },
] as const;

/** Fotograma absoluto en que se pronuncia el segundo `t` de la toma original, dentro de la frase i. */
export const word = (i: number, t: number) => VOICE[i].from + Math.round((t - VOICE[i].cut) * 30);

const end = (i: number, hold = 8) => VOICE[i].from + VOICE[i].len + hold;

/** Subtítulos por frase; cada corte cae en una pausa real de la voz. */
export const SUBTITLES = [
  { from: word(0, 0), to: word(0, 2.1), text: "Hoy partimos de cinco dolores:" },
  { from: word(0, 2.1), to: word(0, 6.52), text: "el contrato no está en datos, el volumen y el desempeño se arman a mano," },
  { from: word(0, 6.52), to: word(0, 10.4), text: "la regla de pago no está escrita, los pagos no dejan rastro" },
  { from: word(0, 10.4), to: end(0, 12), text: "y nadie ve el estado real." },
  { from: word(1, 12.66), to: end(1, 14), text: "Avanzamos paso a paso: cada etapa arranca cuando la anterior ya demostró que funciona." },
  { from: word(2, 18.2), to: word(2, 21.16), text: "Primero, en la ola cero, preparamos las bases:" },
  { from: word(2, 21.16), to: word(2, 24.34), text: "reglas de pago aprobadas, cada contrato con su código," },
  { from: word(2, 24.34), to: end(2, 14), text: "los indicadores del canal priorizados y los accesos a los datos." },
  { from: word(3, 28.14), to: word(3, 33.5), text: "Luego construimos el MVP con el ciclo mensual completo, del contrato al pago." },
  { from: word(3, 33.5), to: word(3, 36.84), text: "La IA prellena la ficha y la analista la valida;" },
  { from: word(3, 36.84), to: word(3, 39.14), text: "las reglas calculan el cumplimiento;" },
  { from: word(3, 39.14), to: word(3, 44.02), text: "trade da el OK, cada aprobador aprueba por correo y Finanzas paga." },
  { from: word(3, 44.02), to: end(3, 14), text: "Y cada día, el desempeño del canal se ve en un tablero." },
  { from: word(4, 47.4), to: word(4, 52.66), text: "Después completamos el resto: consulta por chat, alertas y un brief para negociar." },
  { from: word(4, 52.66), to: word(4, 58.58), text: "Cuando los cortes coinciden con el Excel y High End da el visto bueno, el sistema pasa a ser oficial." },
  { from: word(4, 58.58), to: end(4, 14), text: "Luego conectamos las demás fuentes del canal." },
  { from: word(5, 61.26), to: word(5, 64.9), text: "Así, cada peso se paga con regla, soporte y aprobador," },
  { from: word(5, 64.9), to: word(5, 66.98), text: "y el canal se ve cada día." },
  { from: word(5, 66.98), to: end(5, 20), text: "La meta: cincuenta por ciento menos trabajo manual a seis meses." },
  { from: word(6, 71.43), to: word(6, 74.12), text: "Para arrancar, necesitamos tres decisiones:" },
  { from: word(6, 74.12), to: word(6, 77.38), text: "el visto bueno y la opción de equipo, el libro de reglas," },
  { from: word(6, 77.38), to: end(6, 4), text: "y los indicadores del canal priorizados." },
  { from: word(7, 79.63), to: TOTAL - 6, text: "Las reglas calculan, la IA propone y las personas deciden." },
];

/** Momentos clave (fotogramas absolutos) que comparten animación y efectos. */
export const CUE = {
  dolor: [word(0, 2.12), word(0, 4.04), word(0, 6.56), word(0, 8.72), word(0, 10.48)],
  // Los 4 puntos del deck cuando la voz los nombra; la línea base, al terminar la frase.
  ola0Item: [word(2, 21.2), word(2, 22.64), word(2, 24.36), word(2, 26.4), end(2, 12)],
  mvpCiclo: word(3, 30.64),
  mvpIA: word(3, 33.68),
  mvpAnalista: word(3, 35.36),
  mvpReglas: word(3, 36.88),
  mvpTrade: word(3, 39.24),
  mvpAprobador: word(3, 40.6),
  mvpFinanzas: word(3, 42.48),
  mvpCanal: word(3, 44.04),
  chat: word(4, 49.2),
  alertas: word(4, 50.52),
  brief: word(4, 51.12),
  cortes: word(4, 52.68),
  oficial: word(4, 54.8),
  fuentes: word(4, 58.6),
  regla: word(5, 63.04),
  soporte: word(5, 63.56),
  aprobador: word(5, 64.16),
  canal: word(5, 64.92),
  meta: word(5, 67.0),
  decision: [word(6, 74.16), word(6, 76.2), word(6, 77.4)],
  mantra: word(7, 79.92),
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
  { file: "pop", frame: CUE.mvpCanal + 4, volume: 0.45 },
  { file: "whoosh", frame: SCENES.despues.from - 10, volume: 0.6 },
  { file: "pop", frame: CUE.chat, volume: 0.42 },
  { file: "pop", frame: CUE.alertas, volume: 0.42 },
  { file: "pop", frame: CUE.brief, volume: 0.42 },
  { file: "confirm", frame: CUE.cortes + 8, volume: 0.42 },
  { file: "snap", frame: CUE.oficial + 8, volume: 0.5 },
  { file: "pop", frame: CUE.fuentes + 4, volume: 0.42 },
  { file: "whoosh", frame: SCENES.impacto.from - 10, volume: 0.6 },
  { file: "tick", frame: CUE.regla, volume: 0.45 },
  { file: "tick", frame: CUE.soporte, volume: 0.45 },
  { file: "tick", frame: CUE.aprobador, volume: 0.45 },
  { file: "pop", frame: CUE.canal + 4, volume: 0.42 },
  { file: "rise", frame: CUE.meta - 10, volume: 0.4 },
  { file: "whoosh", frame: SCENES.cierre.from - 6, volume: 0.6 },
  ...CUE.decision.map((f) => ({ file: "confirm", frame: f + 6, volume: 0.42 })),
  { file: "resolve", frame: CUE.mantra - 4, volume: 0.55 },
];

/** Música: volumen base y reducción automática bajo la voz. */
export const MUSIC = { base: 0.5, ducked: 0.15, ramp: 8 } as const;

/** Ganancias de mezcla (dejan margen para que el pico quede por debajo de -1 dBFS). */
export const MIX = { voice: 0.74, sfx: 0.6 } as const;
