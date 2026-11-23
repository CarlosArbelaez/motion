// Renderiza una imagen por escena (estado visual principal) en previews/.
// Uso: node scripts/previews.mjs [nombre...]
import {bundle} from "@remotion/bundler";
import {renderStill, selectComposition} from "@remotion/renderer";
const shots = {
  "01-apertura": 150, "02-contexto": 470, "03-reto": 790, "04-adquisicion": 1262, "05-retencion": 1722,
  "06-actividades": 2270, "07-dashboard": 2712, "08-valor": 3384, "09a-cierre-triada": 3590, "09b-cierre-logo": 3760,
};
// Navegador: usa REMOTION_BROWSER si está definido (p. ej. un Chrome Headless Shell local).
const browserExecutable = process.env.REMOTION_BROWSER || null;
const only = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: "src/index.ts"});
const composition = await selectComposition({browserExecutable, serveUrl, id: "Lumina", inputProps: {subtitles: true, audio: false}});
for (const [name, frame] of Object.entries(shots)) {
  if (only.length && !only.some((o) => name.includes(o))) continue;
  await renderStill({browserExecutable, composition, serveUrl, frame, output: `previews/${name}.jpg`, imageFormat: "jpeg", jpegQuality: 90, inputProps: {subtitles: true, audio: false}});
  console.log("ok", name, frame);
}
