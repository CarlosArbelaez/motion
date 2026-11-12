import timing from "../data/timing.json";

export const FPS = 30;
/** Silencio antes de la locución de cada escena (s). */
export const LEAD = 0.5;
/** Respiro después de la locución de cada escena (s). */
export const TAIL = 0.9;
/** Tiempo extra al final del video para leer la decisión (s). */
export const END_HOLD = 3.5;

type Word = { w: string; s: number; e: number };
type SceneTiming = { id: string; title: string; dur: number; words: Word[] };
export const SCENES = (timing as { scenes: SceneTiming[] }).scenes;
const LAST = SCENES[SCENES.length - 1].id;

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");

export const sceneOf = (id: string) => {
  const sc = SCENES.find((s) => s.id === id);
  if (!sc) throw new Error(`Escena desconocida: ${id}`);
  return sc;
};

/** Segundo (dentro de la escena) en que la voz dice `phrase`. Mantiene la animación atada a la locución real. */
export const cue = (id: string, phrase: string, nth = 0): number => {
  const sc = sceneOf(id);
  const target = phrase.split(/\s+/).map(norm).filter(Boolean);
  let found = 0;
  for (let i = 0; i <= sc.words.length - target.length; i++) {
    if (target.every((t, k) => norm(sc.words[i + k].w) === t)) {
      if (found === nth) return LEAD + sc.words[i].s;
      found++;
    }
  }
  throw new Error(`Cue no encontrado en ${id}: "${phrase}" (#${nth})`);
};

export const sceneSeconds = (id: string) => LEAD + sceneOf(id).dur + TAIL + (id === LAST ? END_HOLD : 0);
export const sceneFrames = (id: string) => Math.round(sceneSeconds(id) * FPS);
export const sceneStartFrame = (id: string) => {
  let f = 0;
  for (const s of SCENES) {
    if (s.id === id) return f;
    f += sceneFrames(s.id);
  }
  throw new Error(id);
};
export const TOTAL_FRAMES = SCENES.reduce((a, s) => a + sceneFrames(s.id), 0);

export type CaptionChunk = { text: string; s: number; e: number };
const MAX_CHARS = 78;
const STOP = "de la el y a en con por los las un una del al que su sus se lo no ni".split(" ");
/** Subtítulos de máx. dos líneas, cortados en la puntuación y sincronizados con la voz real. */
export const captionsOf = (id: string): CaptionChunk[] => {
  const sc = sceneOf(id);
  const chunks: CaptionChunk[] = [];
  const text = (ws: Word[]) => ws.map((w) => w.w).join(" ");
  const push = (ws: Word[]) => {
    if (ws.length) chunks.push({ text: text(ws), s: LEAD + ws[0].s, e: LEAD + ws[ws.length - 1].e });
  };
  // 1) Frases completas (terminan en . : ? !)
  const sentences: Word[][] = [];
  let cur: Word[] = [];
  sc.words.forEach((w) => {
    cur.push(w);
    // Un "Uno:" suelto se une a la frase que introduce.
    if (/[.?!]$/.test(w.w) || (/:$/.test(w.w) && text(cur).length > 8)) {
      sentences.push(cur);
      cur = [];
    }
  });
  if (cur.length) sentences.push(cur);
  // 2) Las frases largas se parten en bloques equilibrados, prefiriendo las comas.
  sentences.forEach((sen) => {
    const total = text(sen).length;
    const parts = Math.ceil(total / (MAX_CHARS - 8));
    if (parts <= 1) return push(sen);
    const target = total / parts;
    let start = 0;
    for (let p = 1; p < parts; p++) {
      let best = -1;
      let bestScore = Infinity;
      for (let i = start; i < sen.length - 1; i++) {
        const len = text(sen.slice(start, i + 1)).length;
        if (len > MAX_CHARS) break;
        const weak = STOP.includes(sen[i].w.toLowerCase()) ? 22 : 0; // no cortar tras "de", "la", "y"…
        const score = Math.abs(len - target) - (/,$/.test(sen[i].w) ? 14 : 0) + weak;
        if (score < bestScore) {
          bestScore = score;
          best = i;
        }
      }
      if (best < 0) best = start;
      push(sen.slice(start, best + 1));
      start = best + 1;
    }
    push(sen.slice(start));
  });
  // Cada bloque se mantiene hasta que entra el siguiente (sin parpadeos).
  return chunks.map((c, i) => ({
    ...c,
    s: Math.max(0, c.s - 0.08),
    e: i < chunks.length - 1 ? Math.min(chunks[i + 1].s - 0.08, c.e + 0.6) : c.e + 0.5,
  }));
};
