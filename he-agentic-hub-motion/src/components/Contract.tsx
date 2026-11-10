import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { easeInOut, prog } from "../anim";
import { CUE, SCENES } from "../timeline";
import { CheckDot } from "./ui";
import { Doc } from "./Icons";

/**
 * "Contrato HE": el mismo contrato recorre todo el video.
 * Su marco se interpola entre posiciones clave y su contenido se transforma:
 * documento PDF → ficha estructurada → ficha compacta conectada → contrato resuelto.
 */

type Rect = { x: number; y: number; w: number; h: number };
type Key = { f: number } & Rect;

const S = SCENES;
const KEYS: Key[] = [
  { f: 0, x: 150, y: 300, w: 300, h: 392 }, // Hoy: el contrato entre los 5 dolores
  { f: S.hoy.to - 16, x: 150, y: 300, w: 300, h: 392 },
  { f: S.mapa.from + 20, x: 120, y: 330, w: 240, h: 313 }, // Hoja de ruta: el contrato en "Hoy"
  { f: S.mapa.to - 14, x: 120, y: 330, w: 240, h: 313 },
  { f: S.ola0.from + 20, x: 150, y: 300, w: 360, h: 470 }, // Ola 0: el contrato que se prepara
  { f: S.ola0.to - 10, x: 150, y: 300, w: 360, h: 470 },
  { f: S.mvp.from + 24, x: 120, y: 300, w: 300, h: 391 }, // MVP y después: origen del ciclo
  { f: S.despues.to - 4, x: 120, y: 300, w: 300, h: 391 },
  { f: S.impacto.from + 24, x: 150, y: 430, w: 230, h: 300 }, // Impacto: conectado
  { f: S.impacto.to - 4, x: 150, y: 430, w: 230, h: 300 },
  { f: S.cierre.from + 26, x: 210, y: 300, w: 360, h: 470 }, // Cierre: resuelto
  { f: S.cierre.to, x: 210, y: 300, w: 360, h: 470 },
];

const rectAt = (frame: number): Rect => {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (frame <= b.f) {
      const t = interpolate(frame, [a.f, b.f], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeInOut,
      });
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        w: a.w + (b.w - a.w) * t,
        h: a.h + (b.h - a.h) * t,
      };
    }
  }
  return KEYS[KEYS.length - 1];
};

/** Contenido escalado de forma uniforme dentro del marco. */
const Fit: React.FC<{ rect: Rect; nw: number; nh: number; opacity: number; children: React.ReactNode }> = ({
  rect,
  nw,
  nh,
  opacity,
  children,
}) => {
  if (opacity <= 0.001) return null;
  const s = Math.min(rect.w / nw, rect.h / nh);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: nw,
        height: nh,
        transform: `scale(${s})`,
        transformOrigin: "top left",
        opacity,
      }}
    >
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------------------
// Contenidos
// ---------------------------------------------------------------------------------------

export const DocContent: React.FC<{ tone?: "ink" | "muted" }> = ({ tone = "ink" }) => {
  const ink = tone === "ink" ? C.ink : "#9AA0AB";
  return (
    <div style={{ position: "absolute", inset: 0, padding: "34px 34px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            background: ink,
            color: C.white,
            fontFamily: F.body,
            fontWeight: 700,
            fontSize: 20,
            borderRadius: 6,
            padding: "3px 10px",
          }}
        >
          PDF
        </div>
        <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 20, color: tone === "ink" ? C.text2 : ink }}>
          Contrato firmado
        </div>
      </div>
      <div
        style={{
          fontFamily: F.display,
          fontWeight: 700,
          fontSize: 44,
          color: ink,
          marginTop: 22,
          letterSpacing: -0.6,
        }}
      >
        Contrato HE
      </div>
      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 16 }}>
        {[1, 0.92, 0.97, 0.7, 1, 0.86, 0.95, 0.55].map((w, i) => (
          <div key={i} style={{ height: 11, width: `${w * 100}%`, borderRadius: 6, background: C.hairline }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 34, right: 34, bottom: 40 }}>
        <svg width="150" height="40" viewBox="0 0 150 40" fill="none">
          <path d="M4 28c14-20 22-20 24-4s14 6 22-8 14 12 26 6 18-16 34-6 18 6 34 2" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
        </svg>
        <div style={{ height: 2, background: ink, opacity: 0.6, width: 200 }} />
      </div>
    </div>
  );
};

const RUBROS = ["Visibilidad", "Activaciones", "Volumen", "Eventos"];

/** Ficha compacta (P3–P6). */
const MiniContent: React.FC<{ resolved: number; linked: number }> = ({ resolved, linked }) => (
  <div style={{ position: "absolute", inset: 0, padding: "26px 28px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Doc size={28} />
      <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 19, color: C.text2 }}>Ficha única</div>
    </div>
    <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40, color: C.ink, marginTop: 10, letterSpacing: -0.6 }}>
      Contrato HE
    </div>
    <div style={{ height: 2, background: C.hairline, margin: "16px 0 8px" }} />
    {RUBROS.map((r, i) => (
      <div
        key={r}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 50 }}
      >
        <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 23, color: C.ink }}>{r}</div>
        <CheckDot progress={1} size={26} fill={i === 2 ? C.yellow : C.ink} color={i === 2 ? C.ink : C.white} />
      </div>
    ))}
    <div
      style={{
        position: "absolute",
        left: 28,
        right: 28,
        bottom: 24,
        height: 46,
        borderRadius: 999,
        background: resolved > 0 ? C.ink : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        opacity: Math.max(resolved, linked),
        fontFamily: F.body,
        fontWeight: 700,
        fontSize: 20,
        color: resolved > 0 ? C.yellow : C.ink,
        border: resolved > 0 ? "none" : `2px solid ${C.ink}`,
      }}
    >
      {resolved > 0 ? "Conectado y trazable" : "Trazable"}
    </div>
  </div>
);

export const ContractLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const r = rectAt(frame);

  const appear = prog(frame, 0, 14);
  // La ficha aparece cuando la voz dice "la IA prellena la ficha".
  const docOp = 1 - prog(frame, CUE.mvpIA, 16, easeInOut);
  const miniOp = prog(frame, CUE.mvpIA + 4, 16, easeInOut);
  const resolved = prog(frame, S.cierre.from + 20, 12);
  const linked = prog(frame, S.impacto.from + 30, 14);

  // En P1 el documento "tiembla" levemente entre tareas manuales; se estabiliza al ordenarse.
  const jitter = frame < S.hoy.to - 18 ? Math.sin(frame / 5) * 0.8 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: r.x,
        top: r.y,
        width: r.w,
        height: r.h,
        background: C.white,
        border: `3px solid ${C.ink}`,
        borderRadius: interpolate(frame, [CUE.mvpIA, CUE.mvpIA + 16], [8, 14], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        overflow: "hidden",
        opacity: appear,
        transform: `rotate(${jitter}deg) scale(${0.94 + 0.06 * appear})`,
        boxSizing: "border-box",
      }}
    >
      <Fit rect={r} nw={360} nh={470} opacity={docOp}>
        <DocContent />
      </Fit>
      <Fit rect={r} nw={330} nh={430} opacity={miniOp}>
        <MiniContent resolved={resolved} linked={linked} />
      </Fit>
    </div>
  );
};

export const contractRectAt = rectAt;
