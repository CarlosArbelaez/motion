import React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {ap, beesRadius, body, C, h1, HEAD, pop} from "../theme";
import {Icon, Tag} from "./ui";

export type Step = {title: string; text: string; tag?: string};

/** Línea de recorrido del cliente: los pasos se activan en `cues` y la ficha del cliente avanza con ellos. */
export const StepLine: React.FC<{
  steps: Step[];
  cues: number[];
  y: number;
  cardW: number;
  titleSize: number;
  textSize: number;
  cardH: number;
}> = ({steps, cues, y, cardW, titleSize, textSize, cardH}) => {
  const frame = useCurrentFrame();
  const x0 = 96 + cardW / 2;
  const x1 = 1824 - cardW / 2;
  const xs = steps.map((_, i) => (steps.length === 1 ? x0 : x0 + ((x1 - x0) * i) / (steps.length - 1)));
  // posición de la ficha del cliente
  const tokenX = interpolate(
    frame,
    cues.flatMap((c) => [c - 10, c + 6]),
    xs.flatMap((x, i) => [i === 0 ? x : xs[i - 1], x]),
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );
  const active = cues.reduce((acc, c, i) => (frame >= c ? i : acc), -1);
  return (
    <>
      {/* línea base y avance */}
      <div style={{position: "absolute", left: x0, top: y - 3, width: x1 - x0, height: 6, background: C.grey, borderRadius: 3}} />
      <div style={{position: "absolute", left: x0, top: y - 3, width: Math.max(0, tokenX - x0), height: 6, background: C.black, borderRadius: 3}} />
      {steps.map((s, i) => {
        const on = frame >= cues[i];
        const isActive = i === active;
        return (
          <React.Fragment key={s.title}>
            <div
              style={{
                position: "absolute",
                left: xs[i] - 22,
                top: y - 22,
                width: 44,
                height: 44,
                borderRadius: 22,
                boxSizing: "border-box",
                border: `5px solid ${C.black}`,
                background: on ? C.yellow : C.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: HEAD,
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                position: "absolute",
                left: xs[i] - cardW / 2,
                top: y + 56,
                width: cardW,
                height: cardH,
                boxSizing: "border-box",
                padding: "24px 26px 28px",
                background: isActive ? C.yellow : C.grey,
                borderRadius: beesRadius(30),
                transformOrigin: "top center",
                ...pop(frame, cues[i]),
              }}
            >
              {s.tag ? (
                <div style={{marginBottom: 14}}>
                  <Tag>{s.tag}</Tag>
                </div>
              ) : null}
              <div style={{...h1(titleSize), lineHeight: 1.05}}>{s.title}</div>
              <div style={{...body(textSize), marginTop: 12}}>{s.text}</div>
            </div>
          </React.Fragment>
        );
      })}
      {/* ficha del cliente (punto de venta) */}
      <div
        style={{
          position: "absolute",
          left: tokenX - 44,
          top: y - 124,
          width: 88,
          height: 88,
          borderRadius: 44,
          boxSizing: "border-box",
          background: C.yellow,
          border: `5px solid ${C.black}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: String(ap(frame, cues[0] - 6, 14)),
        }}
      >
        <Icon name="store" size={50} />
      </div>
      <div style={{position: "absolute", left: tokenX - 3, top: y - 36, width: 6, height: 16, background: C.black, opacity: ap(frame, cues[0], 10)}} />
    </>
  );
};

/** Indicador de en qué frente estamos (continuidad entre escenas 4 y 5). */
export const FrontMap: React.FC<{active: 0 | 1}> = ({active}) => {
  const frame = useCurrentFrame();
  const items = ["1 · Adquisición", "2 · Retención"];
  return (
    <div style={{position: "absolute", right: 96, top: 196, display: "flex", gap: 10, opacity: ap(frame, 10, 14)}}>
      {items.map((t, i) => (
        <div
          key={t}
          style={{
            ...body(24, 600),
            padding: "9px 20px 10px",
            borderRadius: beesRadius(14),
            background: i === active ? C.black : C.grey,
            color: i === active ? C.yellow : C.ink60,
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
};
