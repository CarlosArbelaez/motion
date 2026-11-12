// Genera docs/subtitulos.srt y docs/tiempos.md a partir de la locución real.
// Uso: npx tsx scripts/export_docs.ts
import fs from "node:fs";
import { captionsOf, FPS, sceneFrames, SCENES, sceneStartFrame, TOTAL_FRAMES } from "../src/lib/timing";

const tc = (sec: number, sep = ",") => {
  const ms = Math.round(sec * 1000);
  const p = (n: number, l = 2) => String(n).padStart(l, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)}${sep}${p(ms % 1000, 3)}`;
};
const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

let n = 1;
let srt = "";
let table = "| Escena | Título | Inicio | Fin | Duración |\n|---|---|---|---|---|\n";
for (const s of SCENES) {
  const start = sceneStartFrame(s.id) / FPS;
  const dur = sceneFrames(s.id) / FPS;
  table += `| ${s.id.replace("s", "")} | ${s.title} | ${mmss(start)} | ${mmss(start + dur)} | ${dur.toFixed(1)} s |\n`;
  for (const c of captionsOf(s.id)) {
    srt += `${n++}\n${tc(start + c.s)} --> ${tc(start + c.e)}\n${c.text}\n\n`;
  }
}
fs.writeFileSync("docs/subtitulos.srt", srt);
fs.writeFileSync(
  "docs/tiempos.md",
  `# Tiempos por escena\n\nDuración total: ${mmss(TOTAL_FRAMES / FPS)} (${TOTAL_FRAMES} frames a ${FPS} fps)\n\n${table}`,
);
console.log(table, "total", mmss(TOTAL_FRAMES / FPS));
