#!/usr/bin/env node
// Auditor de movimiento: revisa el código de Remotion y califica de S a F.
// Uso: node scripts/audit.mjs [carpeta=src] [--include-motion]
import fs from "node:fs";
import path from "node:path";

const ROOT = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "src";
const INCLUDE_LIB = process.argv.includes("--include-motion");

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
  const p = path.join(dir, d.name);
  if (d.isDirectory()) return d.name === "node_modules" || (!INCLUDE_LIB && p.split(path.sep).includes("motion")) ? [] : walk(p);
  return /\.(tsx|ts|jsx|js)$/.test(d.name) ? [p] : [];
});

// Texto completo de cada llamada fn( ... ) con paréntesis balanceados
const calls = (src, fn) => {
  const out = [];
  const re = new RegExp(`(?<![\\w.])${fn}\\(`, "g");
  let m;
  while ((m = re.exec(src))) {
    let depth = 1, i = m.index + m[0].length;
    for (; i < src.length && depth > 0; i++) {
      if (src[i] === "(") depth++;
      else if (src[i] === ")") depth--;
    }
    out.push({ text: src.slice(m.index, i), line: src.slice(0, m.index).split("\n").length });
  }
  return out;
};

const findings = [];
const add = (level, file, line, msg) => findings.push({ level, file, line, msg });

for (const file of walk(ROOT)) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");
  if (!/from ["']remotion["']/.test(src)) continue;

  const ranges = new Map();
  for (const c of calls(src, "interpolate")) {
    const hasSpread = /\.\.\.\w+/.test(c.text);
    if (!/easing\s*:/.test(c.text)) add("warn", file, c.line, "interpolate sin easing: movimiento lineal. Usa una curva de EASE o un preset <Motion>.");
    if (!/clamp/i.test(c.text) && !hasSpread) add("warn", file, c.line, "interpolate sin clamp: el valor se dispara fuera del rango.");
    const range = (c.text.match(/interpolate\(\s*[^,]+,\s*(\[[^\]]*\])/) ?? [])[1];
    if (range) ranges.set(range, [...(ranges.get(range) ?? []), c.line]);
  }
  for (const [range, at] of ranges) {
    if (at.length >= 3) add("info", file, at[0], `${at.length} animaciones con el mismo rango ${range.replace(/\s+/g, " ")}: entran a la vez. Añade stagger (2–4 frames) o usa <Stagger>.`);
  }

  lines.forEach((l, i) => {
    if (/\btransition\s*:\s*["'`]/.test(l) || /\banimation(Name)?\s*:\s*["'`]/.test(l)) add("error", file, i + 1, "CSS transition/animation: no se renderiza en Remotion. Anima con useCurrentFrame().");
    if (/@keyframes/.test(l)) add("error", file, i + 1, "@keyframes CSS: no se renderiza en Remotion.");
    if (/className=.*\b(animate-|transition-|duration-\d)/.test(l)) add("error", file, i + 1, "Clases de animación de Tailwind: no se renderizan en Remotion.");
    if (/Math\.random\(\)/.test(l)) add("error", file, i + 1, "Math.random(): cada frame sale distinto. Usa random(seed) de remotion.");
    if (/transform\s*:\s*`[^`]*(scale|translate|rotate)\(/.test(l) && !/perspective|rotate[XY3]/.test(l)) add("info", file, i + 1, "Usa las propiedades scale/translate/rotate en vez de un string transform.");
  });

  for (const c of calls(src, "spring")) {
    if (!/durationInFrames|config/.test(c.text)) add("info", file, c.line, "spring() sin config ni duración: rebote genérico. Define damping/stiffness o usa un preset.");
  }
  if (/<(Audio|Sfx)\b/.test(src) === false && calls(src, "interpolate").length + (src.match(/<Motion\b/g) ?? []).length >= 6) {
    add("info", file, 1, "Escena con mucho movimiento y sin sonido: añade <Sfx> en los 3–5 momentos clave.");
  }
}

const W = { error: 3, warn: 1, info: 0.25 };
const score = findings.reduce((s, f) => s + W[f.level], 0);
const grade = score === 0 ? "S" : score <= 2 ? "A" : score <= 5 ? "B" : score <= 10 ? "C" : score <= 20 ? "D" : "F";
const icon = { error: "✖", warn: "▲", info: "·" };
for (const f of findings.sort((a, b) => W[b.level] - W[a.level] || a.file.localeCompare(b.file) || a.line - b.line)) {
  console.log(`${icon[f.level]} ${f.file}:${f.line}  ${f.msg}`);
}
const n = (lvl) => findings.filter((f) => f.level === lvl).length;
console.log(`\nNota de movimiento: ${grade}   (${n("error")} errores, ${n("warn")} avisos, ${n("info")} sugerencias)`);
process.exit(n("error") ? 1 : 0);
