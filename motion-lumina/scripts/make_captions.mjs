// Genera subtítulos sincronizados con la locución real (marcas por palabra de ElevenLabs Scribe).
// Uso: node scripts/make_captions.mjs
import fs from "node:fs";
const VO_OFFSET = 1.5; // segundos que la voz se retrasa en el video (ver src/theme.ts)
const MAX_LINE = 40;
const fix = (t) => t.replace(/^Bis([.,]?)$/, "BEES$1").replace(/^trescientos$/, "360").replace(/^sesenta$/, "");
const MAXL = MAX_LINE;
const {words} = JSON.parse(fs.readFileSync("docs/words.json", "utf8"));
// Frases de subtítulo definidas a mano (editables). Deben cubrir, en orden, todas las palabras de la locución.
const PHRASES = `Lúmina.
Transformamos oportunidades en crecimiento.
Lúmina es un proyecto de Growth para el canal tradicional.
Su foco: adquirir, activar y retener clientes,
para impulsar la Distribución Numérica de Bavaria.
El reto es claro:
que cada cliente nuevo haga su primera compra,
que compre de forma recurrente,
y que no se fugue.
Por eso trabajamos en dos frentes.
En adquisición, identificamos oportunidades
y gestionamos la creación de nuevos clientes a través de Onboard.
Uno o dos días después, cargamos promociones
para incentivar la primera compra.
Y aseguramos una visita de seguimiento al mes siguiente.
En retención, un algoritmo identifica cambios
en el comportamiento de compra de los clientes.
Con esa señal, habilitamos estrategias comerciales diferenciales,
como promociones cargadas mediante GPO,
para prevenir la fuga y promover la recompra.
En total, son cinco actividades
que cubren el trescientos sesenta de nuestro universo de clientes:
promociones para clientes nuevos,
visita de seguimiento,
tareas comerciales para los representantes de ventas,
promociones churn,
y comunicaciones personalizadas dentro de la aplicación Bis.
Nuestro diferencial: visibilidad y seguimiento.
Un dashboard que se actualiza a diario,
y reúne creación, activación, retención,
comportamiento de compra, ejecución,
logística y servicio.
Esta visibilidad permite identificar rápidamente
dónde hay problemas o stoppers,
hacer seguimiento a la gestión de la fuerza de ventas,
detectar lo que impide la activación de un cliente,
y encontrar oportunidades de mejora en la operación logística.
Todo, con información actualizada para tomar decisiones,
y trazabilidad de los resultados de adquisición y retención.
En Lúmina conectamos datos, estrategia y ejecución,
para impulsar el crecimiento del negocio.
Activación, más retención, igual a crecimiento.`.split("\n");
const cues = [];
let wi = 0;
for (const ph of PHRASES) {
  const n = ph.split(" ").length;
  const c = words.slice(wi, wi + n);
  if (c.map((w) => w.text).join(" ") !== ph) throw new Error("Desalineado: " + ph + " <> " + c.map((w) => w.text).join(" "));
  cues.push(c);
  wi += n;
}
if (wi !== words.length) throw new Error("Faltan palabras por cubrir");
const split = (text) => {
  if (text.length <= MAX_LINE) return [text];
  const ws = text.split(" ");
  let best = null;
  for (let i = 1; i < ws.length; i++) {
    const a = ws.slice(0, i).join(" "), b = ws.slice(i).join(" ");
    const score = Math.max(a.length, b.length) + (Math.abs(a.length - b.length) / 4);
    if (!best || score < best.score) best = {score, lines: [a, b]};
  }
  return best.lines;
};
const out = cues.map((c, i) => {
  const text = c.map((w) => fix(w.text)).filter(Boolean).join(" ").replace(/,$/, "");
  const start = c[0].start + VO_OFFSET;
  const nextStart = cues[i + 1] ? cues[i + 1][0].start + VO_OFFSET : Infinity;
  const end = Math.min(c[c.length - 1].end + VO_OFFSET + 0.35, nextStart - 0.04);
  return {start: +start.toFixed(2), end: +end.toFixed(2), lines: split(text)};
});
fs.writeFileSync("src/data/captions.json", JSON.stringify(out, null, 1));
const ts = (s) => { const ms = Math.round(s * 1000); const p = (n, l = 2) => String(n).padStart(l, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
fs.writeFileSync("docs/subtitulos.srt", out.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.lines.join("\n")}\n`).join("\n"));
console.log(out.length, "cues; max line", Math.max(...out.flatMap((c) => c.lines.map((l) => l.length))));
out.forEach((c) => console.log(c.start, c.end, "|", c.lines.join(" / ")));
