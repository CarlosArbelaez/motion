#!/usr/bin/env node
// Copia los sonidos (.wav) y overlays (.mp4) del Starter Pack de Mister Horse al proyecto
// con nombres limpios y genera public/mh/catalog.json. No toca los archivos originales.
// Uso: node scripts/index-assets.mjs [--src <carpeta AssetPacks>] [--out public/mh]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
};
const SRC = arg("src", path.join(os.homedir(), "Library/Application Support/MisterHorse/ProductManager/AssetPacks"));
const OUT = arg("out", "public/mh");

if (!fs.existsSync(SRC)) {
  console.error(`No existe la carpeta de assets:\n  ${SRC}\nInstala el Starter Pack desde Mister Horse Product Manager o pasa --src.`);
  process.exit(1);
}

const SFX_RULES = [
  ["approach", /approach/i], ["glitch", /glitch|hiss/i], ["scifi", /sci-?fi|drone|teleport|tunnel/i],
  ["boom", /boom|blockbuster|hit\b|fireworks/i], ["bass", /bass/i], ["pop", /\bpop\b/i],
  ["click", /click|tap|knock|keyboard/i], ["ui", /beep|\bui\b/i], ["glitter", /glitter|clink|clang|wineglass/i],
  ["slide", /slide|creak/i], ["transition", /transition|zoom|twirl|rotate/i], ["swoosh", /swoosh|whoosh/i],
];
const OVERLAY_RULES = [
  ["light-leak", /light leak/i], ["film-burn", /film burn/i], ["scratches", /scratch/i], ["grain", /grain/i], ["film", /35mm|film/i],
];
const categorize = (name, rules) => (rules.find(([, re]) => re.test(name)) ?? ["misc"])[0];
const slug = (s) => s.normalize("NFKD").replace(/[^\w\s.-]/g, " ").trim().toLowerCase().replace(/[\s_.]+/g, "-").replace(/-+/g, "-");

const wavSeconds = (file) => {
  try {
    const buf = fs.readFileSync(file);
    let pos = 12, byteRate = 0;
    while (pos + 8 <= buf.length) {
      const id = buf.toString("ascii", pos, pos + 4);
      const size = buf.readUInt32LE(pos + 4);
      if (id === "fmt ") byteRate = buf.readUInt32LE(pos + 16);
      if (id === "data" && byteRate) return +(Math.min(size, buf.length - pos - 8) / byteRate).toFixed(2);
      pos += 8 + size + (size % 2);
    }
  } catch {}
  return null;
};
const mp4Seconds = (file) => {
  try {
    const buf = fs.readFileSync(file);
    const i = buf.indexOf("mvhd", 0, "ascii");
    if (i < 0) return null;
    const v = buf[i + 4];
    const scale = buf.readUInt32BE(i + (v === 1 ? 24 : 16));
    const dur = v === 1 ? Number(buf.readBigUInt64BE(i + 28)) : buf.readUInt32BE(i + 20);
    return scale ? +(dur / scale).toFixed(2) : null;
  } catch {}
  return null;
};

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));

const seen = new Map();
for (const file of walk(SRC)) {
  const ext = path.extname(file).toLowerCase();
  if (ext !== ".wav" && ext !== ".mp4") continue;
  // "Swoosh Transition 03 #8b07b098.wav" → "Swoosh Transition 03"
  const name = path.basename(file, ext).replace(/\s*#[0-9a-f]{6,}$/i, "").trim();
  const type = ext === ".wav" ? "sfx" : "overlay";
  const key = `${type}/${slug(name)}`;
  if (seen.has(key)) continue; // el mismo archivo aparece en varias carpetas
  const rel = `${type === "sfx" ? "sfx" : "overlays"}/${slug(name)}${ext}`;
  fs.mkdirSync(path.join(OUT, path.dirname(rel)), { recursive: true });
  fs.copyFileSync(file, path.join(OUT, rel));
  seen.set(key, {
    name, type,
    category: categorize(name, type === "sfx" ? SFX_RULES : OVERLAY_RULES),
    seconds: type === "sfx" ? wavSeconds(file) : mp4Seconds(file),
    // Ruta para staticFile() / <Sfx src> / <Overlay src>
    src: path.posix.join(path.basename(OUT) === "public" ? "" : path.relative("public", OUT).split(path.sep).join("/"), rel),
  });
}

const items = [...seen.values()].sort((a, b) => a.type.localeCompare(b.type) || a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "catalog.json"), JSON.stringify(items, null, 2));
fs.writeFileSync(path.join(OUT, ".gitignore"), "# Contenido de Mister Horse: no redistribuir\n*\n!.gitignore\n");

const count = {};
for (const it of items) count[`${it.type}:${it.category}`] = (count[`${it.type}:${it.category}`] ?? 0) + 1;
console.log(`Copiados ${items.length} archivos a ${OUT}`);
for (const [k, v] of Object.entries(count)) console.log(`  ${k.padEnd(22)} ${v}`);
console.log(`Catálogo: ${path.join(OUT, "catalog.json")}`);
