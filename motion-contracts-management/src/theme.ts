import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Tipografías PROVISIONALES. Las presentaciones fuente declaran "Avantt" (títulos) y
// "Satoshi" (texto), que no vienen incrustadas ni están disponibles en este entorno.
// Sustitutos de licencia abierta (SIL OFL), guardados en public/assets/fonts:
//   Outfit (títulos) · DM Sans (texto) · DM Mono (etiquetas).
// Para usar las oficiales: copiar sus .woff2 a public/assets/fonts y cambiar las rutas de abajo.
const fonts = [
  { family: "Outfit", url: "assets/fonts/Outfit-Variable.woff2", weight: "100 900" },
  { family: "DM Sans", url: "assets/fonts/DMSans-Variable.woff2", weight: "100 1000" },
  { family: "DM Mono", url: "assets/fonts/DMMono-400.woff2", weight: "400" },
  { family: "DM Mono", url: "assets/fonts/DMMono-500.woff2", weight: "500" },
];
fonts.forEach((f) => {
  loadFont({ family: f.family, url: staticFile(f.url), weight: f.weight }).catch((e) => console.error("Fuente", f.family, e));
});

export const FONT = {
  head: "Outfit, sans-serif",
  body: "'DM Sans', sans-serif",
  mono: "'DM Mono', monospace",
};

// Paleta extraída de los temas de las presentaciones adjuntas (valores srgbClr).
export const C = {
  yellow: "#F5E003",
  yellowSoft: "#FDF9CD",
  ink: "#14161A",
  text: "#525966",
  mute: "#666F80",
  faint: "#9AA0AA",
  line: "#E0E2E6",
  panel: "#F0F1F2",
  bg: "#F7F8FA",
  white: "#FFFFFF",
  purple: "#591B9D",
  purpleSoft: "#EEE8F5",
  coral: "#E9B4A8",
  coralSoft: "#FBDCD5",
  red: "#C4381F",
  blue: "#0B5CAD",
  green: "#1D7A4C",
  greenSoft: "#DDF0E4",
};
