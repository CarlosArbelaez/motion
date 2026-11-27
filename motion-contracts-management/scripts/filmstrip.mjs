#!/usr/bin/env node
// Revisión de movimiento de una composición. Entrega:
//   1) una tira de fotogramas consecutivos numerados (PNG) para leer el movimiento cuadro a cuadro
//   2) un video corto de vista previa (MP4) para que la persona lo vea en movimiento
// Requiere una composición hermana "<CompId>-review" creada con filmstripOf() (ver src/motion/review.tsx).
// Uso: node scripts/filmstrip.mjs <CompId> [--from 0] [--to 46] [--every 2] [--cols N] [--scale 0.25] [--out out/review]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const id = process.argv[2];
if (!id || id.startsWith("--")) {
  console.error("Uso: node scripts/filmstrip.mjs <CompId> [--from 0] [--to 46] [--every 2] [--cols N] [--scale 0.25]");
  process.exit(1);
}
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
};
const from = Number(arg("from", 0));
const to = Number(arg("to", from + 46));
const every = Math.max(1, Number(arg("every", 2)));
const frames = [];
for (let f = from; f <= to; f += every) frames.push(f);
const cols = Number(arg("cols", Math.ceil(Math.sqrt(frames.length))));
const scale = arg("scale", "0.25");
const outDir = arg("out", "out/review");
const extra = process.env.REMOTION_BROWSER ? [`--browser-executable=${process.env.REMOTION_BROWSER}`] : [];

fs.mkdirSync(outDir, { recursive: true });
const tag = `${id}-${from}-${to}`;
const strip = path.join(outDir, `${tag}.png`);
const video = path.join(outDir, `${tag}.mp4`);
const run = (args) => execFileSync("npx", args, { stdio: ["ignore", "ignore", "inherit"] });

run(["remotion", "still", `${id}-review`, strip, "--frame=0", "--log=error", `--props=${JSON.stringify({ strip: { from, to, every, cols } })}`, ...extra]);
run(["remotion", "render", id, video, `--frames=${from}-${to}`, `--scale=${scale}`, "--log=error", ...extra]);

console.log(`Tira:         ${strip}  (cada cuadro lleva su número de frame)`);
console.log(`Vista previa: ${video}  (envíasela a la persona)`);
console.log(`Frames: ${frames.slice(0, cols * cols).join(", ")}`);
if (frames.length > cols * cols) console.log(`Aviso: solo caben ${cols * cols} cuadros; sube --every o divide el tramo.`);
