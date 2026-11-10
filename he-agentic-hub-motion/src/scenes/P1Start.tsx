import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { prog } from "../anim";
import { SceneTitle } from "../components/ui";
import { CUE, SCENES } from "../timeline";

/**
 * Placa 1 · Hoy: el punto de partida son los 5 dolores de la presentación final
 * (diapositiva 2, "Los 5 dolores que encontramos"), sin cifras ni nombres de clientes.
 * Cada dolor aparece cuando la voz lo nombra.
 */

const DOLORES = [
  { t: "El contrato no está en datos", d: "Las metas están en texto libre y hay contratos sin código de cliente." },
  { t: "El volumen se arma a mano", d: "Cada mes se edita la consulta de ventas y lo vendido vía Dislicores se suma aparte." },
  { t: "La regla de pago no está escrita", d: "El cumplimiento depende de quién arme el Excel y los ajustes no se pueden repetir." },
  { t: "Los pagos no dejan rastro", d: "Pagos sumados en fórmulas, sin fecha ni soporte, y pagos por encima de lo pactado." },
  { t: "Nadie ve el estado real", d: "Contratos vencidos que siguen como vigentes; el contrato nuevo se negocia sin historial." },
];

const X = 540;
const Y0 = 292;
const RH = 106;
const GAP = 12;

export const P1Start: React.FC = () => {
  const f = useCurrentFrame();
  const at = (i: number) => CUE.dolor[i] - SCENES.hoy.from - 4;

  return (
    <AbsoluteFill>
      <SceneTitle text="Hoy: un Excel que ya no cuadra" highlight="ya no cuadra" start={2} />
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 126,
          background: C.ink,
          color: C.yellow,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 28,
          borderRadius: 999,
          padding: "8px 22px",
          opacity: prog(f, 16, 12),
        }}
      >
        Punto de partida: dolores actuales
      </div>

      {/* Conexiones manuales desde el contrato */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {DOLORES.map((_, i) => {
          const y = Y0 + i * (RH + GAP) + RH / 2;
          return (
            <path
              key={i}
              d={`M 450 ${496} C 490 ${496}, 490 ${y}, ${X} ${y}`}
              fill="none"
              stroke="#9AA0AB"
              strokeWidth={2.5}
              strokeDasharray="7 7"
              opacity={prog(f, at(i), 12) * 0.9}
            />
          );
        })}
      </svg>

      {DOLORES.map((d, i) => {
        const p = prog(f, at(i), 12);
        return (
          <div
            key={d.t}
            style={{
              position: "absolute",
              left: X,
              top: Y0 + i * (RH + GAP),
              width: 1800 - X,
              height: RH,
              boxSizing: "border-box",
              background: C.white,
              border: `2px solid #C4C8CF`,
              borderRadius: 12,
              padding: "0 28px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: p,
              transform: `translateX(${(1 - p) * 26}px)`,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                background: C.yellow,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: F.display,
                fontWeight: 700,
                fontSize: 26,
                color: C.ink,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div style={{ width: 470, fontFamily: F.body, fontWeight: 700, fontSize: 29, color: C.ink, flexShrink: 0 }}>
              {d.t}
            </div>
            <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 22, color: C.text2, lineHeight: 1.3 }}>{d.d}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
