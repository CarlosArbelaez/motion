import React from "react";
import { c, Token, titular } from "../theme";
import { useLayout } from "../layout";

// Línea de pulso: trazo plano y geométrico, a sangre. progreso 0..1 la dibuja.
export const Pulso: React.FC<{ color: Token; alto: number; progreso?: number }> = ({ color, alto, progreso = 1 }) => {
  const L = useLayout();
  const w = L.width;
  const m = alto / 2;
  const s = 14 * L.u;
  const x = (f: number) => f * w;
  const d = `M0 ${m} H${x(0.3)} V${alto * 0.12} H${x(0.38)} V${alto * 0.88} H${x(0.47)} V${alto * 0.3} H${x(0.53)} V${m} H${w}`;
  const largo = w + alto * 2.4;
  return (
    <svg width={w} height={alto} style={{ marginLeft: -L.safe.left, flexShrink: 0, display: "block" }}>
      <path d={d} fill="none" stroke={c(color)} strokeWidth={s} strokeLinejoin="miter" strokeDasharray={largo} strokeDashoffset={largo * (1 - progreso)} />
    </svg>
  );
};

// Etiqueta rectangular de borde duro.
export const Etiqueta: React.FC<{ texto: string; fondo: Token; tinta: Token; giro?: number; size?: number }> = ({ texto, fondo, tinta, giro = 0, size = 44 }) => {
  const L = useLayout();
  return (
    <div
      style={{
        ...titular,
        alignSelf: "flex-start",
        fontSize: L.px(size),
        lineHeight: 1,
        textTransform: "uppercase",
        letterSpacing: "0.01em",
        color: c(tinta),
        backgroundColor: c(fondo),
        padding: `${14 * L.u}px ${22 * L.u}px ${12 * L.u}px`,
        transform: `rotate(${giro}deg)`,
        whiteSpace: "nowrap",
      }}
    >
      {texto}
    </div>
  );
};

// Franja a sangre de borde a borde.
export const Franja: React.FC<{ fondo: Token; children: React.ReactNode; style?: React.CSSProperties }> = ({ fondo, children, style }) => {
  const L = useLayout();
  return (
    <div style={{ marginLeft: -L.safe.left, width: L.width, paddingLeft: L.safe.left, paddingRight: L.safe.right, backgroundColor: c(fondo), boxSizing: "border-box", ...style }}>
      {children}
    </div>
  );
};

// Escalera de puestos: 5 casillas, la actual rellena.
export const Escalera: React.FC<{ puesto: number; color: string; tinta: string }> = ({ puesto, color, tinta }) => {
  const L = useLayout();
  const lado = 64 * L.u;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 * L.u }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} style={{ width: n === puesto ? lado * 2.4 : lado, height: lado, boxSizing: "border-box", border: `${4 * L.u}px solid ${n === puesto ? color : tinta}`, backgroundColor: n === puesto ? color : "transparent" }} />
      ))}
    </div>
  );
};
