#!/usr/bin/env node
// Genera por código los efectos de sonido de Motion-Pro (WAV mono 44.1 kHz) y su catálogo.
// Son sonidos sintéticos originales: no dependen de internet ni de ningún pack externo.
// Uso: node scripts/make-sfx.mjs [--out public/sfx]
import fs from "node:fs";
import path from "node:path";

const i0 = process.argv.indexOf("--out");
const OUT = i0 > -1 && process.argv[i0 + 1] ? process.argv[i0 + 1] : "public/sfx";
const SR = 44100;
const TAU = Math.PI * 2;

// Aleatorio con semilla: cada ejecución produce exactamente los mismos archivos
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const lerp = (a, b, t) => a + (b - a) * t;
const expo = (a, b, t) => a * Math.pow(b / a, t); // barrido de frecuencia perceptualmente uniforme
const bell = (t, peak = 0.5) => (t < peak ? Math.sin((t / peak) * Math.PI * 0.5) : Math.cos(((t - peak) / (1 - peak)) * Math.PI * 0.5)) ** 2;
const decay = (t, k) => Math.exp(-t * k);

// Genera `seconds` de audio llamando a fn(tSeg, tNorm, i)
const make = (seconds, fn) => {
  const n = Math.round(seconds * SR);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) out[i] = fn(i / SR, i / n, i);
  return out;
};
// Ruido blanco pasado por un filtro paso banda cuya frecuencia central cambia en el tiempo
const sweptNoise = (seconds, freqAt, q, ampAt, seed) => {
  const rand = rng(seed);
  let low = 0, band = 0;
  return make(seconds, (_, t) => {
    const f = 2 * Math.sin((Math.PI * Math.min(freqAt(t), SR / 6)) / SR);
    const input = rand() * 2 - 1;
    low += f * band;
    const high = input - low - q * band;
    band += f * high;
    return band * ampAt(t);
  });
};
// Tono con barrido de frecuencia (fase acumulada para que no haya saltos)
const tone = (seconds, freqAt, ampAt, shape = Math.sin) => {
  let phase = 0;
  return make(seconds, (ts, t) => {
    phase += (TAU * freqAt(t, ts)) / SR;
    return shape(phase) * ampAt(t, ts);
  });
};
const mix = (...layers) => {
  const out = new Float64Array(Math.max(...layers.map((l) => l.length)));
  for (const l of layers) for (let i = 0; i < l.length; i++) out[i] += l[i];
  return out;
};
const gain = (buf, g) => buf.map((v) => v * g);
const drive = (buf, amount) => buf.map((v) => Math.tanh(v * amount));

const SOUNDS = [
  // name, category, generator
  ["whoosh-short", "swoosh", () => sweptNoise(0.4, (t) => expo(400, 5000, bell(t, 0.55)), 0.9, (t) => bell(t, 0.55), 11)],
  ["whoosh-long", "swoosh", () => sweptNoise(0.8, (t) => expo(250, 3800, bell(t, 0.6)), 0.8, (t) => bell(t, 0.6), 12)],
  ["whoosh-airy", "swoosh", () => sweptNoise(0.55, (t) => expo(1200, 9000, bell(t, 0.5)), 1.4, (t) => bell(t, 0.5) * 0.9, 13)],
  ["swish-fast", "transition", () => sweptNoise(0.22, (t) => expo(900, 7000, t), 0.7, (t) => bell(t, 0.7), 21)],
  ["whip", "transition", () => mix(
    sweptNoise(0.3, (t) => expo(6000, 500, t), 0.6, (t) => bell(t, 0.25), 22),
    gain(tone(0.3, (t) => expo(1800, 200, t), (t) => bell(t, 0.2) * 0.25), 1))],
  ["transition-deep", "transition", () => mix(
    sweptNoise(0.7, (t) => expo(200, 2600, bell(t, 0.5)), 0.7, (t) => bell(t, 0.5), 23),
    tone(0.7, (t) => expo(140, 50, t), (t) => bell(t, 0.45) * 0.6))],
  ["slide-soft", "slide", () => sweptNoise(0.35, (t) => lerp(500, 1400, t), 1.6, (t) => bell(t, 0.4) * 0.8, 31)],
  ["slide-paper", "slide", () => sweptNoise(0.3, (t) => lerp(2500, 5000, bell(t)), 1.8, (t) => bell(t, 0.35) * 0.7, 32)],
  ["pop", "pop", () => tone(0.14, (t) => expo(950, 280, t), (t) => decay(t, 9) * Math.min(1, t * 80))],
  ["pop-soft", "pop", () => tone(0.16, (t) => expo(520, 190, t), (t) => decay(t, 8) * Math.min(1, t * 60))],
  ["pop-bubble", "pop", () => tone(0.13, (t) => expo(380, 1300, t), (t) => decay(t, 7) * Math.min(1, t * 70))],
  ["click", "click", () => mix(
    sweptNoise(0.03, () => 4500, 1.2, (t) => decay(t, 14), 41),
    tone(0.03, () => 2100, (t) => decay(t, 18) * 0.6))],
  ["tap", "click", () => mix(
    tone(0.07, (t) => expo(420, 160, t), (t) => decay(t, 12)),
    sweptNoise(0.02, () => 3000, 1.5, (t) => decay(t, 10) * 0.5, 42))],
  ["key", "click", () => mix(
    sweptNoise(0.05, () => 3200, 1.0, (t) => decay(t, 12), 43),
    tone(0.05, () => 1300, (t) => decay(t, 16) * 0.35))],
  ["ui-beep", "ui", () => tone(0.1, () => 1320, (t) => decay(t, 6) * Math.min(1, t * 50))],
  ["ui-confirm", "ui", () => tone(0.24, (t) => (t < 0.45 ? 880 : 1320), (t) => decay(t < 0.45 ? t / 0.45 : (t - 0.45) / 0.55, 4) * Math.min(1, (t < 0.45 ? t : t - 0.45) * 60))],
  ["boom", "boom", () => drive(mix(
    tone(1.5, (t) => expo(75, 32, Math.min(1, t * 3)), (t) => decay(t, 4.5) * Math.min(1, t * 200), Math.sin),
    sweptNoise(0.5, (t) => expo(1500, 120, t), 0.9, (t) => decay(t, 7) * 0.7, 51)), 1.6)],
  ["hit", "boom", () => drive(mix(
    tone(0.6, (t) => expo(140, 45, Math.min(1, t * 4)), (t) => decay(t, 6) * Math.min(1, t * 300)),
    sweptNoise(0.12, () => 2500, 0.8, (t) => decay(t, 9) * 0.8, 52)), 1.8)],
  ["bass-drop", "bass", () => drive(tone(0.9, (t) => expo(160, 30, t), (t) => bell(t, 0.08) * (1 - t * 0.3)), 1.4)],
  ["riser", "approach", () => mix(
    sweptNoise(1.5, (t) => expo(200, 7000, t * t), 0.8, (t) => t * t * (t > 0.985 ? (1 - t) / 0.015 : 1), 61),
    tone(1.5, (t) => expo(110, 880, t * t), (t) => t * t * 0.3 * (t > 0.985 ? (1 - t) / 0.015 : 1)))],
  ["riser-short", "approach", () => sweptNoise(0.7, (t) => expo(300, 8000, t * t), 0.8, (t) => t * t * (t > 0.97 ? (1 - t) / 0.03 : 1), 62)],
  ["glitch", "glitch", () => {
    const rand = rng(71);
    const gates = Array.from({ length: 14 }, () => ({ on: rand() > 0.35, f: 200 + rand() * 3000, noise: rand() > 0.5 }));
    const nz = rng(72);
    return make(0.4, (ts, t) => {
      const g = gates[Math.min(13, Math.floor(t * 14))];
      if (!g.on) return 0;
      const v = g.noise ? nz() * 2 - 1 : Math.sign(Math.sin(TAU * g.f * ts));
      return Math.round(v * 4) / 4 * 0.7; // reducción de bits para el carácter digital
    });
  }],
  ["glitch-short", "glitch", () => {
    const nz = rng(73);
    return make(0.15, (ts, t) => (Math.floor(t * 9) % 2 ? 0 : Math.round((nz() * 2 - 1) * 3) / 3) * decay(t, 2));
  }],
  ["shimmer", "glitter", () => {
    const rand = rng(81);
    const parts = Array.from({ length: 16 }, () => ({ at: rand() * 0.5, f: 2400 + rand() * 4800, k: 5 + rand() * 6 }));
    return make(1.0, (ts) => parts.reduce((s, p) => (ts < p.at ? s : s + Math.sin(TAU * p.f * (ts - p.at)) * Math.exp(-(ts - p.at) * p.k * 2) * 0.12), 0));
  }],
  ["ding", "glitter", () => make(0.9, (ts) => (Math.sin(TAU * 1760 * ts) + 0.5 * Math.sin(TAU * 3520 * ts) + 0.25 * Math.sin(TAU * 5280 * ts)) * Math.exp(-ts * 5) * Math.min(1, ts * 400))],
];

const toWav = (buf) => {
  // Fundidos mínimos en los extremos para evitar chasquidos, y luego normaliza el pico
  const fadeIn = Math.min(Math.round(SR * 0.0005), buf.length >> 2);
  const fadeOut = Math.min(Math.round(SR * 0.003), buf.length >> 3);
  const shaped = buf.map((v, i) => v * Math.min(1, (i + 1) / fadeIn, (buf.length - i) / fadeOut));
  let peak = 0;
  for (const v of shaped) peak = Math.max(peak, Math.abs(v));
  const g = peak ? 0.89 / peak : 1;
  const data = Buffer.alloc(shaped.length * 2);
  for (let i = 0; i < shaped.length; i++) data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, shaped[i] * g)) * 32767), i * 2);
  const head = Buffer.alloc(44);
  head.write("RIFF", 0); head.writeUInt32LE(36 + data.length, 4); head.write("WAVEfmt ", 8);
  head.writeUInt32LE(16, 16); head.writeUInt16LE(1, 20); head.writeUInt16LE(1, 22);
  head.writeUInt32LE(SR, 24); head.writeUInt32LE(SR * 2, 28); head.writeUInt16LE(2, 32); head.writeUInt16LE(16, 34);
  head.write("data", 36); head.writeUInt32LE(data.length, 40);
  return Buffer.concat([head, data]);
};

fs.mkdirSync(OUT, { recursive: true });
const rel = path.relative("public", OUT).split(path.sep).join("/");
const catalog = SOUNDS.map(([name, category, gen]) => {
  const buf = gen();
  fs.writeFileSync(path.join(OUT, `${name}.wav`), toWav(buf));
  return { name, type: "sfx", category, seconds: +(buf.length / SR).toFixed(2), src: `${rel}/${name}.wav` };
});
fs.writeFileSync(path.join(OUT, "catalog.json"), JSON.stringify(catalog, null, 2));
console.log(`Generados ${catalog.length} sonidos en ${OUT}`);
const by = {};
for (const c of catalog) (by[c.category] ??= []).push(c.name);
for (const [k, v] of Object.entries(by)) console.log(`  ${k.padEnd(11)} ${v.join(", ")}`);
