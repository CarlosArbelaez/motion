import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

/**
 * Marca. Colores medidos en píxeles de la presentación To-Be v4.0 y confirmados contra el
 * AB InBev Design System (colors-status-brand-base #f5e003, colors-text-primary #14161a).
 * Fuentes reales del AB InBev Design System: Avantt (títulos) y Satoshi (texto).
 */
export const C = {
  yellow: "#F5E003", // amarillo de marca (deck + DS)
  yellowSoft: "#FDF9CD", // fondo de "Regla automática" en el deck
  ink: "#14161A", // texto principal
  black: "#000000",
  page: "#F7F8F9", // fondo de portada del deck
  white: "#FFFFFF",
  card: "#F0F1F2", // tarjetas grises del deck
  hairline: "#E0E2E6",
  text2: "#525966",
  text3: "#666F80",
  olive: "#938601", // "Próximo a vencer" en el deck (amarillo oscurecido)
} as const;

export const F = {
  display: "Avantt, Satoshi, sans-serif",
  body: "Satoshi, sans-serif",
} as const;

const fonts: Array<[string, string, string]> = [
  ["Avantt", "fonts/Avantt-Bold.ttf", "700"],
  ["Avantt", "fonts/Avantt-SemiBold.ttf", "600"],
  ["Satoshi", "fonts/Satoshi-Regular.otf", "400"],
  ["Satoshi", "fonts/Satoshi-Medium.otf", "500"],
  ["Satoshi", "fonts/Satoshi-Bold.otf", "700"],
];

export const fontsReady = Promise.all(
  fonts.map(([family, file, weight]) =>
    loadFont({ family, url: staticFile(file), weight, display: "block" }),
  ),
);
