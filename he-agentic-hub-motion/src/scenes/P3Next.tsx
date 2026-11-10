import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand";
import { easeInOut, prog } from "../anim";
import { CheckDot, KindPill, SceneTitle, kindStyle, type Kind } from "../components/ui";
import { Arrow, Diamond, Person } from "../components/Icons";

/**
 * Placa 3 · 00:11–00:17 · NEXT: pagos y agentes.
 * Separación explícita: la IA propone → las personas validan y aprueban → Finanzas ejecuta.
 * Fotogramas locales (0 = 00:11).
 */

const ZONES = [
  { x: 500, kind: "ia" as Kind, label: "La IA propone", at: 23 },
  { x: 945, kind: "persona" as Kind, label: "Personas validan y aprueban", at: 78 },
  { x: 1390, kind: "persona" as Kind, label: "Finanzas ejecuta", at: 156 },
];
const ZW = 410;
const ZY = 290;
const ZH = 500;

type CardDef = {
  zone: number;
  y: number;
  kind: Kind;
  title: string;
  sub: string;
  at: number;
  check?: number;
  person?: boolean;
};

const CARDS: CardDef[] = [
  { zone: 0, y: 370, kind: "ia", title: "Lectura asistida del contrato", sub: "Cita cláusula y página", at: 30 },
  { zone: 0, y: 526, kind: "ia", title: "Propuesta de resolución", sub: "Para excepciones que no cruzan", at: 56 },
  { zone: 1, y: 370, kind: "persona", title: "Validación humana", sub: "La analista confirma o corrige", at: 96, check: 108, person: true },
  { zone: 1, y: 526, kind: "persona", title: "Aprobación consolidada", sub: "Un aprobador por rubro", at: 130, check: 143, person: true },
  { zone: 2, y: 370, kind: "persona", title: "Pago por Finanzas", sub: "Nota crédito o BTL", at: 166, check: 173, person: true },
  { zone: 2, y: 526, kind: "regla", title: "Conciliación con evidencia", sub: "Pago, soporte y aprobador", at: 186, check: 193 },
];

const Card: React.FC<{ c: CardDef; f: number }> = ({ c, f }) => {
  const p = prog(f, c.at, 12);
  const x = ZONES[c.zone].x + 20;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: c.y,
        width: ZW - 40,
        height: 136,
        boxSizing: "border-box",
        borderRadius: 12,
        padding: "16px 20px",
        ...kindStyle(c.kind),
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontFamily: F.body, fontWeight: 700, fontSize: 26, color: C.ink, lineHeight: 1.15 }}>{c.title}</div>
        {c.check !== undefined ? <CheckDot progress={prog(f, c.check, 10)} size={32} /> : null}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
        {c.person ? <Person size={20} color={C.text2} /> : null}
        <div style={{ fontFamily: F.body, fontWeight: 500, fontSize: 20, color: C.text2 }}>{c.sub}</div>
      </div>
    </div>
  );
};

export const P3Next: React.FC = () => {
  const f = useCurrentFrame();

  // Una propuesta viaja de la IA a la validación humana
  const travel = prog(f, 80, 18, easeInOut);
  const tokenOp = prog(f, 78, 4) * (1 - prog(f, 96, 6));
  const tx = interpolate(travel, [0, 1], [700, 905]);
  const ty = interpolate(travel, [0, 1], [660, 420]);

  const note = prog(f, 196, 14);
  const guard = prog(f, 66, 12);

  return (
    <AbsoluteFill>
      <SceneTitle lead="Ola 2" text="Pago y agentes, con control humano" start={8} />

      {/* Conector desde el contrato */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <path
          d="M 450 470 C 470 470, 480 430, 520 430"
          stroke={C.ink}
          strokeWidth={2.5}
          strokeDasharray="6 6"
          fill="none"
          opacity={prog(f, 28, 10)}
        />
      </svg>

      {ZONES.map((z, i) => {
        const p = prog(f, z.at, 12);
        return (
          <React.Fragment key={z.label}>
            <div
              style={{
                position: "absolute",
                left: z.x,
                top: ZY,
                width: ZW,
                height: ZH,
                borderRadius: 18,
                background: C.card,
                opacity: p,
              }}
            />
            <div style={{ position: "absolute", left: z.x + 20, top: ZY + 20, opacity: p }}>
              <KindPill kind={z.kind} size={23}>
                {z.kind === "persona" ? <Person size={22} strokeWidth={2.6} /> : null}
                {z.label}
              </KindPill>
            </div>
            {i > 0 ? (
              <div
                style={{
                  position: "absolute",
                  left: z.x - 32,
                  top: ZY + ZH / 2 - 14,
                  opacity: p,
                }}
              >
                <Arrow size={28} />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}

      {CARDS.map((c) => (
        <Card key={c.title} c={c} f={f} />
      ))}

      {/* Límite explícito de la IA */}
      <div
        style={{
          position: "absolute",
          left: ZONES[0].x + 20,
          top: 688,
          width: ZW - 40,
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 21,
          color: C.ink,
          lineHeight: 1.3,
          opacity: guard,
        }}
      >
        No calcula montos, no aprueba
        <br />
        ni paga, no modifica contratos.
      </div>
      <div
        style={{
          position: "absolute",
          left: ZONES[2].x + 20,
          top: 688,
          width: ZW - 40,
          fontFamily: F.body,
          fontWeight: 500,
          fontSize: 21,
          color: C.text2,
          lineHeight: 1.3,
          opacity: prog(f, 198, 10),
        }}
      >
        El pago solo sale con
        <br />
        aprobación humana registrada.
      </div>

      {/* Propuesta en tránsito */}
      <div
        style={{
          position: "absolute",
          left: tx,
          top: ty,
          opacity: tokenOp,
          transform: `scale(${0.85 + 0.15 * Math.sin(travel * Math.PI)})`,
        }}
      >
        <KindPill kind="ia" size={20}>
          Propuesta
        </KindPill>
      </div>

      {/* Condición de activación de los agentes */}
      <div
        style={{
          position: "absolute",
          left: 500,
          top: 820,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: F.body,
          fontSize: 23,
          color: C.text2,
          opacity: note,
        }}
      >
        <Diamond size={20} />
        <span style={{ fontWeight: 700, color: C.ink }}>Activación de agentes:</span>
        <span style={{ fontWeight: 500 }}>solo si validan su calidad y utilidad en pruebas</span>
      </div>
    </AbsoluteFill>
  );
};
