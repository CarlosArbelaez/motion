import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { c, Token } from "../theme";
import { salida, entradaSalida } from "../curvas";

export type TipoCorte = "estela" | "persianas" | "columnas" | "diagonal" | "obturador";
export type Corte = { en: number; color: Token; tipo: TipoCorte; sentido: 1 | -1 };

// Una pieza del corte: entra hasta cubrir su zona justo en el fotograma del cambio y luego sale.
type Pieza = {
  caja: React.CSSProperties; // zona que cubre
  color: string;
  entra: [number, number]; // fotogramas relativos al corte
  sale: [number, number];
  de: string; // translate de partida
  a: string; // translate de salida
};

const ANTES = 14;
const DESPUES = 14;

const piezas = (k: Corte): Pieza[] => {
  const s = k.sentido;
  const principal = c(k.color);
  const claro = c(k.color === "colors-text-primary" ? "colors-status-brand-base" : "colors-text-primary");
  const acento = c(k.color === "colors-text-black-static" ? "colors-status-brand-base" : "colors-text-black-static");
  const lleno: React.CSSProperties = { top: 0, left: 0, width: "100%", height: "100%" };
  switch (k.tipo) {
    case "estela": // tres bloques de color en fila: el último es el que cubre
      return [acento, claro, principal].map((color, i) => ({
        caja: lleno,
        color,
        entra: [-13 + i * 3, -6 + i * 3],
        sale: [(2 - i) * 3, 8 + (2 - i) * 3],
        de: `${-100 * s}% 0%`,
        a: `${100 * s}% 0%`,
      }));
    case "persianas": { // franjas horizontales que entran alternando lado
      const n = 6;
      return Array.from({ length: n }, (_, i) => ({
        caja: { top: `${(100 / n) * i}%`, left: 0, width: "100%", height: `${100 / n + 0.3}%` },
        color: i % 2 === 0 ? principal : claro,
        entra: [-12 + i, -5 + i] as [number, number],
        sale: [n - 1 - i, 8 + n - 1 - i] as [number, number],
        de: `${(i % 2 === 0 ? -100 : 100) * s}% 0%`,
        a: `${(i % 2 === 0 ? 100 : -100) * s}% 0%`,
      }));
    }
    case "columnas": { // columnas que caen escalonadas
      const n = 5;
      return Array.from({ length: n }, (_, i) => ({
        caja: { left: `${(100 / n) * i}%`, top: 0, height: "100%", width: `${100 / n + 0.3}%` },
        color: principal,
        entra: [-12 + i * 1.2, -5 + i * 1.2] as [number, number],
        sale: [i * 1.2, 8 + i * 1.2] as [number, number],
        de: `0% ${-100 * s}%`,
        a: `0% ${100 * s}%`,
      }));
    }
    case "diagonal": // dos bloques inclinados que cruzan la pantalla
      return [claro, principal].map((color, i) => ({
        caja: { top: "-40%", left: "-40%", width: "180%", height: "180%", rotate: `${-14 * s}deg` },
        color,
        entra: [-12 + i * 4, -4 + i * 4],
        sale: [(1 - i) * 4, 9 + (1 - i) * 4],
        de: `${-115 * s}% 0%`,
        a: `${115 * s}% 0%`,
      }));
    case "obturador": // dos mitades que se cierran al centro y se abren hacia los lados
      return [0, 1].map((i) => ({
        caja: { left: 0, width: "100%", top: i === 0 ? 0 : "50%", height: "50.2%" },
        color: i === 0 ? principal : claro,
        entra: [-10, 0],
        sale: [1, 10],
        de: `0% ${i === 0 ? -100 : 100}%`,
        a: `${(i === 0 ? -100 : 100) * s}% 0%`,
      }));
  }
};

const Bloque: React.FC<{ corte: Corte }> = ({ corte }) => {
  const frame = useCurrentFrame();
  const f = frame - corte.en;
  if (f < -ANTES || f > DESPUES) return null;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {piezas(corte).map((p, i) => {
        const translate =
          f <= 0
            ? interpolate(f, p.entra, [p.de, "0% 0%"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: salida })
            : interpolate(f, p.sale, ["0% 0%", p.a], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: entradaSalida });
        return (
          <div key={i} style={{ position: "absolute", ...p.caja }}>
            <div style={{ width: "100%", height: "100%", backgroundColor: p.color, translate }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Cortes: React.FC<{ cortes: Corte[] }> = ({ cortes }) => (
  <>
    {cortes.map((k) => (
      <Bloque key={k.en} corte={k} />
    ))}
  </>
);
