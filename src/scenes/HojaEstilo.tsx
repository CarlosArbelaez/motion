import React from "react";
import { AbsoluteFill } from "remotion";
import { theme, c, titular, apoyo, Token } from "../theme";

const usos: Partial<Record<Token, string>> = {
  "colors-background-base": "Fondo principal",
  "colors-background-primary": "Fondo alterno",
  "colors-background-secondary": "Bloques y subtítulos",
  "colors-text-primary": "Texto principal",
  "colors-text-secondary": "Texto de apoyo",
  "colors-status-brand-base": "Cifra o palabra clave",
  "colors-text-black-static": "Texto sobre amarillo",
  "colors-text-accent": "Acento #3",
  "colors-text-success": "Acento #4",
  "colors-text-info": "Acento #5",
};

export const HojaEstilo: React.FC = () => {
  const tokens = (Object.keys(usos) as Token[]);
  return (
    <AbsoluteFill style={{ backgroundColor: c("colors-background-primary"), padding: 72, color: c("colors-text-primary") }}>
      <div style={{ ...titular, fontSize: 64 }}>Paleta y tipografía</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20, marginTop: 40 }}>
        {tokens.map((t) => (
          <div key={t}>
            <div style={{ height: 120, backgroundColor: theme[t], border: `2px solid ${c("colors-background-secondary")}` }} />
            <div style={{ ...apoyo, fontSize: 24, marginTop: 10 }}>{usos[t]}</div>
            <div style={{ ...apoyo, fontSize: 20, color: c("colors-text-secondary") }}>{t}</div>
            <div style={{ ...apoyo, fontSize: 20, color: c("colors-text-secondary") }}>{theme[t]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 80, marginTop: 56, alignItems: "flex-end" }}>
        <div>
          <div style={{ ...titular, fontSize: 200, lineHeight: 0.95, color: c("colors-status-brand-base"), letterSpacing: "-0.02em" }}>12,3 %</div>
          <div style={{ ...apoyo, fontSize: 26, color: c("colors-text-secondary"), marginTop: 12 }}>Avantt SemiBold · cifras y titulares · 60 a 520 px en el lienzo vertical</div>
        </div>
        <div>
          <div style={{ ...apoyo, fontSize: 56, lineHeight: 1.2 }}>Texto de apoyo y subtítulos del video</div>
          <div style={{ ...apoyo, fontSize: 26, color: c("colors-text-secondary"), marginTop: 12 }}>Satoshi Regular · apoyo y subtítulos · 40 a 56 px (mínimo 40 px)</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
