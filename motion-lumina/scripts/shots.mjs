// Renderiza frames sueltos: node scripts/shots.mjs <carpeta> <frame>...
import {bundle} from "@remotion/bundler";
import {renderStill, selectComposition} from "@remotion/renderer";
const [dir, ...frames] = process.argv.slice(2);
const browserExecutable = process.env.REMOTION_BROWSER || null;
const serveUrl = await bundle({entryPoint: "src/index.ts"});
const inputProps = {subtitles: true, audio: false};
const composition = await selectComposition({browserExecutable, serveUrl, id: "Lumina", inputProps});
for (const fr of frames) {
  await renderStill({browserExecutable, composition, serveUrl, frame: +fr, output: `${dir}/f${fr}.jpg`, imageFormat: "jpeg", jpegQuality: 88, inputProps});
}
console.log("ok");
