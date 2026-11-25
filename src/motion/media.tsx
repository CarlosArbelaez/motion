import React from "react";
import { Sequence, staticFile } from "remotion";
import { Audio, Video } from "@remotion/media";

const resolve = (src: string) => (/^https?:\/\//.test(src) ? src : staticFile(src));

/**
 * Efecto de sonido sincronizado. `at` = frame del momento clave.
 * `lead` = frames de adelanto: 0 para golpes (pop, clic, boom), 2–4 para swooshes,
 * y la duración completa del audio para los "approach" que terminan en el golpe.
 */
export const Sfx: React.FC<{ src: string; at: number; lead?: number; volume?: number }> = ({ src, at, lead = 0, volume = 0.6 }) => (
  <Sequence from={Math.max(0, Math.round(at - lead))} layout="none">
    <Audio src={resolve(src)} volume={volume} />
  </Sequence>
);

/** Overlay de video (light leak, film burn, grano, scratches) sobre toda la composición. */
export const Overlay: React.FC<{ src: string; blend?: React.CSSProperties["mixBlendMode"]; opacity?: number; loop?: boolean }> = ({
  src, blend = "screen", opacity = 0.5, loop = true,
}) => (
  <Video src={resolve(src)} muted loop={loop} objectFit="cover"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", mixBlendMode: blend, opacity, pointerEvents: "none" }} />
);
