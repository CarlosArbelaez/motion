import { useVideoConfig } from "remotion";

// Todo tamaño sale de aquí: la versión 16:9 es otra composición, no otro video.
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height >= width;
  // u = 1 px del lienzo de diseño (1080 de lado corto)
  const u = (vertical ? width : height) / 1080;
  const safe = vertical
    ? { top: 250 * u, bottom: 350 * u, left: 72 * u, right: 72 * u }
    : { top: 90 * u, bottom: 90 * u, left: 120 * u, right: 120 * u };
  const subtituloAlto = 170 * u;
  return {
    width,
    height,
    vertical,
    u,
    safe,
    subtituloAlto,
    contentW: width - safe.left - safe.right,
    contentH: height - safe.top - safe.bottom - subtituloAlto,
    px: (n: number) => Math.max(n, 40) * u, // ningún texto por debajo de 40 px
  };
};
