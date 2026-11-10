import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { easeInOut, prog } from "../anim";
import { SceneTitle } from "../components/ui";
const Bubble: React.FC = () => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <path d="M4 5h16v11H10l-5 4v-4H4z" stroke={C.text2} strokeWidth={2} strokeLinejoin="round" />
  </svg>
);

/** Placa 1 · 00:00–00:04 · El punto de partida. */

const CX = 960;
const CY = 553;

const FRAGMENTS = [
  // Tarea manual + su consecuencia (Matriz de dolor del AS-IS: 0.1.2, 2.2.1, 1.G1, 3.2.1)
  { x: 190, y: 300, file: "Word", task: "Transcribir el PDF", pain: "Riesgo de errores en metas y fechas", at: 20, side: -1 },
  { x: 190, y: 548, file: "Excel", task: "Digitar y cuadrar", pain: "Pagos difíciles de auditar", at: 40, side: -1 },
  { x: 1250, y: 300, file: "Ventas", task: "Cruzar datos a mano", pain: "Reprocesos y riesgo de doble conteo", at: 60, side: 1 },
  { x: 1250, y: 548, file: "Correo", task: "Perseguir aprobaciones", pain: "Aprobaciones sin evidencia registrada", at: 80, side: 1 },
];
const FW = 480;
const FH = 180;

const REQUESTS = [
  { x: 360, y: 780, text: "¿Ya cumplió la meta?", at: 100 },
  { x: 1220, y: 780, text: "¿Cuánto se le paga?", at: 114 },
];

export const P1Start: React.FC = () => {
  const frame = useCurrentFrame();
  const gather = prog(frame, 261, 24, easeInOut); // los fragmentos entran al contrato

  return (
    <AbsoluteFill>
      <SceneTitle text="Hoy: demasiadas tareas manuales" highlight="tareas manuales" start={2} />
      <div
        style={{
          position: "absolute",
          left: 1214,
          top: 126,
          background: C.ink,
          color: C.yellow,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 28,
          borderRadius: 999,
          padding: "8px 22px",
          opacity: prog(frame, 16, 12),
          transform: `translateX(${(1 - prog(frame, 16, 12)) * -16}px)`,
        }}
      >
        Punto de partida: dolores actuales
      </div>

      {/* Conexiones enredadas */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {FRAGMENTS.map((f, i) => {
          const p = prog(frame, f.at + 2, 16);
          const fx = f.side < 0 ? f.x + FW : f.x;
          const fy = f.y + FH / 2;
          const sx = f.side < 0 ? 780 : 1140;
          const sy = 400 + i * 70;
          const d = `M ${sx} ${sy} C ${sx + f.side * 120} ${sy + (i % 2 ? -90 : 110)}, ${fx - f.side * 110} ${fy + (i % 2 ? 80 : -70)}, ${fx} ${fy}`;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#9AA0AB"
              strokeWidth={2.5}
              strokeDasharray="8 8"
              opacity={p * (1 - gather) * 0.9}
            />
          );
        })}
      </svg>

      {FRAGMENTS.map((f, i) => {
        const p = prog(frame, f.at, 14);
        const float = Math.sin((frame + i * 17) / 11) * 4;
        const x = interpolate(gather, [0, 1], [f.x, CX - FW / 2]);
        const y = interpolate(gather, [0, 1], [f.y + float, CY - FH / 2]);
        return (
          <div
            key={f.file}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: FW,
              height: FH,
              background: C.white,
              border: `2px solid #C4C8CF`,
              borderRadius: 12,
              padding: "20px 24px",
              boxSizing: "border-box",
              opacity: p * (1 - gather),
              transform: `scale(${(0.92 + 0.08 * p) * (1 - 0.6 * gather)}) rotate(${f.side * (i % 2 ? 1.2 : -1.5)}deg)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  fontFamily: F.body,
                  fontWeight: 700,
                  fontSize: 20,
                  color: C.text2,
                  background: C.card,
                  borderRadius: 6,
                  padding: "3px 10px",
                }}
              >
                {f.file}
              </div>
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 20, color: C.text3 }}>Manual</div>
            </div>
            <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 31, color: C.ink, marginTop: 14, whiteSpace: "nowrap" }}>
              {f.task}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 12,
                opacity: prog(frame, f.at + 14, 12),
              }}
            >
              <div style={{ width: 14, height: 5, borderRadius: 3, background: C.yellow, flexShrink: 0 }} />
              <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.text2, whiteSpace: "nowrap" }}>
                {f.pain}
              </div>
            </div>
          </div>
        );
      })}

      {REQUESTS.map((r, i) => {
        const p = prog(frame, r.at, 12);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y + Math.sin((frame + i * 23) / 13) * 3,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: C.card,
              borderRadius: 999,
              padding: "10px 22px",
              fontFamily: F.body,
              fontWeight: 500,
              fontSize: 26,
              color: C.text2,
              opacity: p * (1 - gather),
              transform: `translateY(${(1 - p) * 14}px)`,
            }}
          >
            <Bubble />
            {r.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
