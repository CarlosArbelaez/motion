import React from "react";
import { C, FONT } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { ArrowRight, Card, Check, ContractIcon, Envelope, MX, Pill, Shell } from "../components/ui";

const ID = "s07";
const CARD_AT = cue(ID, "una sola tarjeta");
const LX0 = 900;
const LX1 = 1780;
const LY = 404;
const mx = (d: number) => LX0 + ((90 - d) / 90) * (LX1 - LX0);
const MILES = [
  { d: 90, at: CARD_AT + 0.5, h: "90 días", s: "Tarjeta al owner y a su líder" },
  { d: 60, at: cue(ID, "sesenta"), h: "60 días", s: "Copia a los Líderes de Procurement y Value Creation" },
  { d: 30, at: cue(ID, "treinta"), h: "30 días", s: "Escala a los Managers" },
  { d: 0, at: cue(ID, "treinta") + 0.5, h: "Vencimiento", s: "" },
];
const WEEKS = [83, 76, 69, 53, 46, 39, 23, 16, 9];
const CHAIN = [
  { t: "El owner decide", at: cue(ID, "el dueño decide") },
  { t: "Su líder aprueba", at: cue(ID, "su líder aprueba") },
  { t: "Procurement confirma", at: cue(ID, "Procurement confirma") },
];
// Posiciones pseudoaleatorias (deterministas) de los 26 correos que se funden en una tarjeta.
const MAILS = Array.from({ length: 26 }).map((_, i) => ({
  x: MX + 30 + ((i * 97) % 560),
  y: 320 + ((i * 59) % 400),
}));

export const S07: React.FC = () => {
  const t = useSec();
  const merge = prog(t, CARD_AT - 0.5, 0.7);
  const weekAt = cue(ID, "Un recordatorio");
  const decAt = cue(ID, "Y toda alerta");
  return (
    <Shell
      id={ID}
      chapter={2}
      title="De ~26 correos sin cierre a una tarjeta que exige respuesta"
      foot="Preaviso de 90 días por defecto, fijado por política de Value Creation · las alertas salen de un buzón compartido"
    >
      {MAILS.map((m, i) => {
        const p = prog(t, cue(ID, "En lugar") - 0.3 + i * 0.03, 0.3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: m.x + (MX + 300 - m.x) * merge,
              top: m.y + (520 - m.y) * merge,
              opacity: p * (1 - merge),
            }}
          >
            <Envelope size={44} />
          </div>
        );
      })}

      {/* Tarjeta de alerta (representación conceptual) */}
      <Rise at={CARD_AT - 0.15} y={0} scaleFrom={0.7} dur={0.6} style={{ position: "absolute", left: MX, top: 304 }}>
        <Card style={{ width: 640, height: 452, overflow: "hidden", borderColor: C.ink, borderWidth: 3 }}>
          <div style={{ background: C.ink, color: C.white, padding: "14px 26px", fontSize: 24, fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
            <span>Alerta de vencimiento</span>
            <span style={{ color: C.yellow }}>Tarjeta en Teams</span>
          </div>
          <div style={{ padding: "24px 26px" }}>
            <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
              <ContractIcon size={70} />
              <div>
                <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 38, lineHeight: 1.1 }}>Contrato por vencer</div>
                <div style={{ fontSize: 26, color: C.text, marginTop: 6 }}>Para: owner del servicio y su líder</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 26 }}>
              <div style={{ background: C.yellow, border: `2px solid ${C.ink}`, borderRadius: 12, padding: "11px 20px", fontSize: 27, fontWeight: 700 }}>Revisar renovación</div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1, border: `2px solid ${C.ink}`, borderRadius: 12, padding: "11px 20px", fontSize: 27, fontWeight: 700 }}>Corregir datos</div>
                <div style={{ flex: 1, border: `2px solid ${C.ink}`, borderRadius: 12, padding: "11px 20px", fontSize: 27, fontWeight: 700 }}>No soy el owner</div>
              </div>
            </div>
            <div style={{ fontSize: 23, color: C.text, marginTop: 18, lineHeight: 1.25 }}>
              Cualquier botón cuenta como respuesta y detiene los recordatorios.
            </div>
          </div>
        </Card>
      </Rise>

      {/* Escalamiento */}
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <line x1={LX0} y1={LY} x2={LX0 + (LX1 - LX0) * prog(t, CARD_AT + 0.3, 1.0)} y2={LY} stroke={C.line} strokeWidth={5} strokeLinecap="round" />
        {WEEKS.map((d, i) => (
          <circle key={d} cx={mx(d)} cy={LY} r={8 * prog(t, weekAt + i * 0.1, 0.3)} fill={C.white} stroke={C.blue} strokeWidth={4} />
        ))}
        {MILES.map((m) => (
          <circle key={m.d} cx={mx(m.d)} cy={LY} r={17 * prog(t, m.at, 0.4)} fill={m.d === 0 ? C.ink : C.yellow} stroke={C.ink} strokeWidth={4} />
        ))}
      </svg>
      <Rise at={weekAt} y={8} style={{ position: "absolute", left: mx(83) - 6, top: LY - 70, fontSize: 25, color: C.blue, fontWeight: 700 }}>
        Recordatorio semanal, solo hasta que respondan
      </Rise>
      {MILES.map((m, i) => (
        <Rise
          key={m.d}
          at={m.at}
          y={10}
          style={{
            position: "absolute",
            left: i === 3 ? mx(m.d) - 250 : mx(m.d) - 20,
            top: LY + 32,
            width: 270,
            textAlign: i === 3 ? "right" : "left",
          }}
        >
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 30 }}>{m.h}</div>
          <div style={{ fontSize: 23, color: C.text, lineHeight: 1.2, marginTop: 2 }}>{m.s}</div>
        </Rise>
      ))}

      {/* Desenlace */}
      <Rise at={decAt} y={16} style={{ position: "absolute", left: LX0 - 20, top: 588, width: 930 }}>
        <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, letterSpacing: -0.4 }}>Toda alerta termina en una decisión registrada</div>
      </Rise>
      {CHAIN.map((c, i) => (
        <React.Fragment key={c.t}>
          <Rise at={c.at - 0.1} y={16} scaleFrom={0.9} style={{ position: "absolute", left: LX0 - 20 + i * 316, top: 652 }}>
            <div
              style={{
                width: 280,
                height: 86,
                borderRadius: 16,
                background: C.white,
                border: `3px solid ${C.ink}`,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              {c.t}
            </div>
          </Rise>
          {i < 2 ? <ArrowRight x={LX0 - 20 + i * 316 + 284} y={695} w={28} at={CHAIN[i + 1].at - 0.2} color={C.ink} /> : null}
        </React.Fragment>
      ))}
      <Rise at={CHAIN[2].at + 0.5} y={10} style={{ position: "absolute", left: LX0 - 20, top: 762, display: "flex", gap: 14, alignItems: "center" }}>
        <Check size={46} />
        <Pill size={25} bg={C.greenSoft} color={C.green}>
          Renovar · Renegociar · Consolidar · Terminar
        </Pill>
      </Rise>
    </Shell>
  );
};
