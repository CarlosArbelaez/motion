import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { linearTiming } from "@remotion/transitions";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { clamp01, EASE } from "./easings";

type P<T extends Record<string, unknown>> = React.FC<TransitionPresentationComponentProps<T>>;

/** Timing recomendado para todas las transiciones de este archivo. */
export const proTiming = (durationInFrames: number) => linearTiming({ durationInFrames, easing: EASE.inOutExpo });

// ── Zoom through: la escena A se nos viene encima y B llega desde el fondo ──
const ZoomThrough: P<Record<string, never>> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  const scale = entering ? 0.75 + 0.25 * p : 1 + 2.5 * p;
  const opacity = entering ? clamp01((p - 0.45) * 5) : 1;
  const blur = Math.sin(p * Math.PI) * 14;
  return <AbsoluteFill style={{ scale, opacity, filter: `blur(${blur}px)` }}>{children}</AbsoluteFill>;
};
export const zoomThrough = (): TransitionPresentation<Record<string, never>> => ({ component: ZoomThrough, props: {} });

// ── Whip pan: barrido rápido de cámara ──
type WhipProps = { direction: "left" | "right" | "up" | "down" };
const WhipPan: P<WhipProps> = ({ children, presentationDirection, presentationProgress: p, passedProps }) => {
  const entering = presentationDirection === "entering";
  const sign = passedProps.direction === "left" || passedProps.direction === "up" ? 1 : -1;
  const pct = (entering ? (1 - p) * 100 : -p * 100) * sign;
  const vertical = passedProps.direction === "up" || passedProps.direction === "down";
  const blur = Math.sin(p * Math.PI) * 24;
  return (
    <AbsoluteFill style={{ translate: vertical ? `0% ${pct}%` : `${pct}% 0%`, filter: `blur(${blur}px)` }}>
      {children}
    </AbsoluteFill>
  );
};
export const whipPan = (props: Partial<WhipProps> = {}): TransitionPresentation<WhipProps> => ({
  component: WhipPan, props: { direction: props.direction ?? "left" },
});

// ── Spin zoom: giro con empuje de escala ──
type SpinProps = { degrees: number };
const SpinZoom: P<SpinProps> = ({ children, presentationDirection, presentationProgress: p, passedProps }) => {
  const entering = presentationDirection === "entering";
  const rotate = entering ? (p - 1) * passedProps.degrees : p * passedProps.degrees;
  const visible = entering ? p >= 0.5 : p < 0.5;
  return (
    <AbsoluteFill style={{ rotate: `${rotate}deg`, scale: 1 + Math.sin(p * Math.PI) * 1.1, opacity: visible ? 1 : 0, filter: `blur(${Math.sin(p * Math.PI) * 10}px)` }}>
      {children}
    </AbsoluteFill>
  );
};
export const spinZoom = (props: Partial<SpinProps> = {}): TransitionPresentation<SpinProps> => ({
  component: SpinZoom, props: { degrees: props.degrees ?? 180 },
});

// ── Glitch: franjas desplazadas y cambio de tono durante unos frames ──
type GlitchProps = { slices: number; strength: number; seed: string };
const Glitch: P<GlitchProps> = ({ children, presentationDirection, presentationProgress: p, passedProps }) => {
  const frame = useCurrentFrame();
  const entering = presentationDirection === "entering";
  const visible = entering ? p >= 0.5 : p < 0.5;
  const amount = Math.sin(p * Math.PI);
  const { slices, strength, seed } = passedProps;
  if (!visible) return null;
  if (amount < 0.02) return <AbsoluteFill>{children}</AbsoluteFill>;
  return (
    <AbsoluteFill style={{ filter: `hue-rotate(${amount * 40}deg) saturate(${1 + amount * 2})` }}>
      {Array.from({ length: slices }).map((_, i) => {
        const r = random(`${seed}-${i}-${Math.floor(frame / 2)}`) - 0.5;
        const top = (i / slices) * 100;
        const bottom = 100 - ((i + 1) / slices) * 100;
        return (
          <AbsoluteFill key={i} style={{ clipPath: `inset(${top}% 0% ${bottom}% 0%)`, translate: `${r * strength * amount}px 0px` }}>
            {children}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
export const glitch = (props: Partial<GlitchProps> = {}): TransitionPresentation<GlitchProps> => ({
  component: Glitch, props: { slices: props.slices ?? 12, strength: props.strength ?? 160, seed: props.seed ?? "glitch" },
});

// ── Shape wipe: un círculo de color abre paso a la escena nueva ──
type ShapeProps = { color: string; originX: number; originY: number };
const ShapeWipe: P<ShapeProps> = ({ children, presentationDirection, presentationProgress: p, passedProps }) => {
  if (presentationDirection === "exiting") return <AbsoluteFill>{children}</AbsoluteFill>;
  const { color, originX, originY } = passedProps;
  const at = `${originX}% ${originY}%`;
  const rColor = clamp01(p * 1.35) * 150;
  const rScene = clamp01((p - 0.25) / 0.75) * 150;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: color, clipPath: `circle(${rColor}% at ${at})` }} />
      <AbsoluteFill style={{ clipPath: `circle(${rScene}% at ${at})` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
export const shapeWipe = (props: Partial<ShapeProps> = {}): TransitionPresentation<ShapeProps> => ({
  component: ShapeWipe, props: { color: props.color ?? "#ffffff", originX: props.originX ?? 50, originY: props.originY ?? 50 },
});
