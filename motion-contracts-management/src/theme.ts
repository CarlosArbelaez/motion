import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Sistema de diseño de AB InBev (ux-react-designsystem): tipografías oficiales Avantt (display y
// títulos) y Satoshi (texto), tomadas del sistema de diseño publicado.
const fonts = [
  { family: "Avantt", url: "assets/fonts/Avantt-Regular.ttf", weight: "400" },
  { family: "Avantt", url: "assets/fonts/Avantt-SemiBold.ttf", weight: "600" },
  { family: "Avantt", url: "assets/fonts/Avantt-Bold.ttf", weight: "700" },
  { family: "Satoshi", url: "assets/fonts/Satoshi-Regular.otf", weight: "400" },
  { family: "Satoshi", url: "assets/fonts/Satoshi-Medium.otf", weight: "500" },
  { family: "Satoshi", url: "assets/fonts/Satoshi-Bold.otf", weight: "700" },
];
fonts.forEach((f) => {
  loadFont({ family: f.family, url: staticFile(f.url), weight: f.weight }).catch((e) => console.error("Fuente", f.family, e));
});

export const FONT = {
  head: "Avantt, sans-serif", // títulos: semibold (600); display: bold (700)
  body: "Satoshi, sans-serif", // texto 400, etiquetas 500
  mono: "Satoshi, sans-serif",
};

// Roles de color del sistema de diseño (tema claro). El nombre del token va en el comentario.
export const C = {
  yellow: "#f5e003", // colors-status-brand-base — un solo señalador por pantalla
  yellowSoft: "#fdf9cd", // colors-status-brand-soft
  ink: "#14161a", // colors-text-primary / colors-background-inverse
  text: "#525966", // colors-text-secondary
  mute: "#666f80", // colors-text-tertiary
  faint: "#8e949f", // colors-border-primary
  line: "#e0e2e6", // colors-border-tertiary
  panel: "#f0f1f2", // colors-background-primary
  bg: "#f7f8f9", // colors-background-page
  white: "#ffffff", // colors-background-base
  red: "#e94e2d", // colors-status-error-base
  coralSoft: "#fbdcd5", // colors-status-error-soft
  coral: "#f78b7b", // colors-utility-joyful-default
  green: "#3bb85d", // colors-status-success-base
  greenSoft: "#d8f1df", // colors-status-success-soft
  greenText: "#007800", // colors-utility-green-strong (texto sobre fondo suave)
  blue: "#006de7", // colors-status-info-base
  blueSoft: "#cce2fa", // colors-status-info-subtle
  // Morado: código de color de la propuesta para "versiones con IA" (no es un rol del sistema).
  purple: "#591b9d",
  purpleSoft: "#eee8f5",
};

// Radios del sistema, escalados ×1,5 de 1280 px a 1920 px.
export const R = { ctl: 10, card: 12, panel: 18, full: 999 };
