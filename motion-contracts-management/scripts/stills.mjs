// Renderiza una imagen por escena (estado visual principal) en previews/.
// Uso: node scripts/stills.mjs s01:12.5 s02:17 ...   (segundo dentro de la escena)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
const timing = JSON.parse(fs.readFileSync(new URL("../src/data/timing.json", import.meta.url)));
const FPS = 30, LEAD = 0.4, TAIL = 0.6, END_HOLD = 3;
let f = 0; const start = {}; const durOf = {};
timing.scenes.forEach((s, i) => { start[s.id] = f; durOf[s.id] = LEAD + s.dur + TAIL; f += Math.round((LEAD + s.dur + TAIL + (i === timing.scenes.length - 1 ? END_HOLD : 0)) * FPS); });
for (const arg of process.argv.slice(2)) {
  const [id, sec, tag] = arg.split(":");
  // "end" = estado final de la escena; los segundos se acotan a la duración de la escena.
  const secs = sec === "end" ? durOf[id] - 0.7 : Math.min(parseFloat(sec), durOf[id] - 0.5);
  const frame = start[id] + Math.round(secs * FPS);
  const out = `previews/${id}${tag ? "_" + tag : ""}.png`;
  execFileSync("npx", ["remotion", "still", "ContractsManagement", out, `--frame=${frame}`, "--log=error"], { stdio: "inherit" });
  console.log(out, "frame", frame);
}
