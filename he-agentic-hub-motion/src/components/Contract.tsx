import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { easeInOut, prog } from "../anim";
import { SCENES } from "../timeline";
import { CheckDot, DataBar, KindPill } from "./ui";
import { Doc, Person } from "./Icons";

/**
 * "Contrato HE": el mismo contrato recorre todo el video.
 * Su marco se interpola entre posiciones clave y su contenido se transforma:
 * documento PDF → ficha estructurada → ficha compacta conectada → contrato resuelto.
 */

type Rect = { x: number; y: number; w: number; h: number };
type Key = { f: number } & Rect;

const S = SCENES;
const KEYS: Key[] = [
  { f: 0, x: 780, y: 318, w: 360, h: 470 }, // Hoy: documento entre tareas manuales
  { f: S.hoy.to - 16, x: 780, y: 318, w: 360, h: 470 },
  { f: S.mapa.from + 20, x: 120, y: 330, w: 240, h: 313 }, // Mapa: el contrato en "Hoy"
  { f: S.mapa.to - 16, x: 120, y: 330, w: 240, h: 313 },
  { f: S.ola0.from + 20, x: 150, y: 300, w: 360, h: 470 }, // Ola 0: el contrato que se valida
  { f: S.ola0.to - 10, x: 150, y: 300, w: 360, h: 470 },
  { f: S.ola1.from + 28, x: 150, y: 318, w: 760, h: 540 }, // Ola 1: ficha única en App HE
  { f: S.ola1.to - 4, x: 150, y: 318, w: 760, h: 540 },
  { f: S.ola2.from + 22, x: 120, y: 300, w: 330, h: 430 }, // Ola 2–3: ficha compacta
  { f: S.ola3.to - 2, x: 120, y: 300, w: 330, h: 430 },
  { f: S.impacto.from + 26, x: 150, y: 590, w: 214, h: 278 }, // Impacto: "después", conectado
  { f: S.impacto.to - 4, x: 150, y: 590, w: 214, h: 278 },
  { f: S.decision.from + 26, x: 210, y: 300, w: 360, h: 470 }, // Decisión: resuelto
  { f: S.decision.to, x: 210, y: 300, w: 360, h: 470 },
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

const FICHA_ROWS = [
  { label: "Cliente y códigos", kind: "bar" as const, w: 260 },
  { label: "Vigencia y periodo", kind: "bar" as const, w: 200 },
  { label: "Valor por rubro", kind: "rubros" as const, w: 0 },
  { label: "Meta de volumen", kind: "text" as const, w: 0, text: "En cajas por periodo" },
  { label: "Escala de pago", kind: "bar" as const, w: 230 },
  { label: "Soportes y responsables", kind: "bar" as const, w: 180 },
];

const RUBROS = ["Visibilidad", "Activaciones", "Volumen", "Eventos"];

/** Ficha única (P2). Registro y validación humana — sin agente. */
const FichaContent: React.FC<{ frame: number }> = ({ frame }) => {
  const o = SCENES.ola1.from;
  const stamp = prog(frame, o + 120, 14);
  return (
    <div style={{ position: "absolute", inset: 0, padding: "28px 34px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40, color: C.ink, letterSpacing: -0.6 }}>
            Contrato HE
          </div>
          <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 21, color: C.text2 }}>Ficha única</div>
        </div>
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 18, color: C.text2, letterSpacing: 1.2 }}>
          OPTIMIZAR
        </div>
      </div>
      <div style={{ height: 2, background: C.hairline, margin: "18px 0 6px" }} />
      {FICHA_ROWS.map((r, i) => {
        const p = prog(frame, o + 34 + i * 12, 14);
        return (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "center",
              height: 56,
              borderBottom: `1.5px solid ${C.hairline}`,
              opacity: p,
              transform: `translateX(${(1 - p) * -18}px)`,
            }}
          >
            <div style={{ width: 260, fontFamily: F.body, fontWeight: 500, fontSize: 23, color: C.text2 }}>
              {r.label}
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, paddingRight: 12 }}>
              {r.kind === "bar" ? <DataBar width={r.w} progress={prog(frame, o + 38 + i * 12, 16)} /> : null}
              {r.kind === "text" ? (
                <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 23, color: C.ink }}>{r.text}</div>
              ) : null}
              {r.kind === "rubros"
                ? RUBROS.map((x) => (
                    <div
                      key={x}
                      style={{
                        fontFamily: F.body,
                        fontWeight: 500,
                        fontSize: 16,
                        color: C.ink,
                        border: `1.5px solid ${C.ink}`,
                        borderRadius: 999,
                        padding: "2px 8px",
                      }}
                    >
                      {x}
                    </div>
                  ))
                : null}
            </div>
            <CheckDot progress={prog(frame, o + 44 + i * 12, 10)} size={28} />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 34,
          bottom: 26,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: stamp,
          transform: `scale(${0.9 + 0.1 * stamp})`,
          transformOrigin: "left center",
        }}
      >
        <KindPill kind="persona" size={22}>
          <Person size={24} strokeWidth={2.6} />
          La analista valida la ficha
        </KindPill>
        <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 20, color: C.text2 }}>
          Contrato PDF y soportes adjuntos
        </div>
      </div>
    </div>
  );
};

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
  const docOp = 1 - prog(frame, S.ola1.from + 2, 16, easeInOut);
  const fichaOp = prog(frame, S.ola1.from + 10, 16, easeInOut) * (1 - prog(frame, S.ola2.from, 14, easeInOut));
  const miniOp = prog(frame, S.ola2.from + 4, 14, easeInOut);
  const resolved = prog(frame, S.decision.from + 20, 12);
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
        borderRadius: interpolate(frame, [S.ola1.from, S.ola1.from + 28], [8, 16], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        overflow: "hidden",
        opacity: appear,
        transform: `rotate(${jitter}deg) scale(${0.94 + 0.06 * appear})`,
        boxSizing: "border-box",
      }}
    >
      <Fit rect={r} nw={360} nh={470} opacity={docOp}>
        <DocContent />
      </Fit>
      <Fit rect={r} nw={760} nh={540} opacity={fichaOp}>
        <FichaContent frame={frame} />
      </Fit>
      <Fit rect={r} nw={330} nh={430} opacity={miniOp}>
        <MiniContent resolved={resolved} linked={linked} />
      </Fit>
    </div>
  );
};

export const contractRectAt = rectAt;
