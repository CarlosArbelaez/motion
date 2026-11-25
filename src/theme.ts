// Tokens del sistema de diseño de AB InBev (tema oscuro), por nombre.
export const theme = {
  "colors-background-base": "#000000",
  "colors-background-primary": "#14161a",
  "colors-background-secondary": "#292c33",
  "colors-text-primary": "#e0e2e6",
  "colors-text-secondary": "#a3a9b3",
  "colors-status-brand-base": "#f7e635",
  "colors-status-brand-base-light": "#f5e003",
  "colors-text-black-static": "#000000",
  "colors-text-accent": "#556eff",
  "colors-text-success": "#62c67d",
  "colors-text-info": "#338aec",
} as const;

export type Token = keyof typeof theme;
export const c = (t: Token) => theme[t];

export const fonts = {
  titular: "Avantt",
  apoyo: "Satoshi",
} as const;

export const titular = { fontFamily: fonts.titular, fontWeight: 600 } as const;
export const apoyo = { fontFamily: fonts.apoyo, fontWeight: 400 } as const;

// Acento por puesto del ranking (#5 a #2). El amarillo queda reservado para la cifra.
export const acentoPorPuesto: Record<number, Token> = {
  5: "colors-text-info",
  4: "colors-text-success",
  3: "colors-text-accent",
  2: "colors-text-primary",
};
