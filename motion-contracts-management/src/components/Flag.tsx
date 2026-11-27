import React from "react";
import { C } from "../theme";

/** Marca de "definición pendiente" (la bandera que usa la propuesta v5.1). */
export const Flag: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = C.ink }) => (
  <svg width={size} height={size} viewBox="0 0 26 26" style={{ flexShrink: 0 }}>
    <path d="M6 3 V24" stroke={color} strokeWidth={3} strokeLinecap="round" />
    <path d="M6 4 H21 L17 9.5 L21 15 H6 Z" fill={color} stroke={color} strokeWidth={2} strokeLinejoin="round" />
  </svg>
);
