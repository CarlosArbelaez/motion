import guion from "../data/guion.json";
export { guion };
export type ItemTop = (typeof guion.top)[number];

// Cabecera de una sección: [título, "02 / 04"]
export const cabeceraDe = (n: number): [string, string] => {
  const s = guion.secciones[n - 1];
  return [s.titulo, `${s.numero} / ${String(guion.secciones.length).padStart(2, "0")}`];
};
