import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue, sceneSeconds } from "../lib/timing";
import { MX, Pill } from "../components/ui";

const ID = "s01";
const TITLE = ["Contracts", "Management", "Finance Tech"];
const PROMISES = ["Un solo registro", "Alertas que se responden", "Una decisión siempre registrada"];
const NODES: { x: number; y: number; name: string; sub: string; side: "top" | "bottom" | "left" | "right" }[] = [
  { x: 1350, y: 310, name: "Solicitud", sub: "regla escrita", side: "top" },
  { x: 1550, y: 310, name: "Negociación", sub: "Legal", side: "top" },
  { x: 1792, y: 420, name: "Aprobación", sub: "y firma", side: "left" },
  { x: 1792, y: 580, name: "Ficha", sub: "y Ariba", side: "left" },
  { x: 1550, y: 690, name: "Control", sub: "diario", side: "bottom" },
  { x: 1350, y: 690, name: "Alertas", sub: "con acuse", side: "bottom" },
  { x: 1090, y: 500, name: "Decisión", sub: "y renovación", side: "right" },
];
// Anillo (estadio) que arranca y termina en "Decisión".
const RING = "M1090,500 A190,190 0 0 1 1280,310 L1620,310 A190,190 0 0 1 1620,690 L1280,690 A190,190 0 0 1 1090,500";

const Ring: React.FC = () => {
  const t = useSec();
  const open = prog(t, cue(ID, "el ciclo de vida") - 0.3, 2.2) * 0.9; // se dibuja, pero no cierra
  const close = prog(t, cue(ID, "lo cierra"), 0.9) * 0.1; // la propuesta lo cierra
  const closed = prog(t, cue(ID, "lo cierra") + 0.7, 0.4);
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080}>
        <path d={RING} fill="none" stroke="rgba(20,22,26,0.16)" strokeWidth={4} strokeDasharray="4 12" />
        <path d={RING} fill="none" stroke={C.ink} strokeWidth={5} pathLength={1} strokeDasharray={`${open + close} 1`} strokeLinecap="round" />
        {NODES.map((n, i) => {
          const isLast = i === NODES.length - 1;
          const p = isLast ? closed : prog(t, cue(ID, "el ciclo de vida") + i * 0.3, 0.4);
          return (
            <circle key={n.name} cx={n.x} cy={n.y} r={13 * p} fill={isLast ? C.ink : C.yellow} stroke={C.ink} strokeWidth={4} />
          );
        })}
      </svg>
      {NODES.map((n, i) => {
        const isLast = i === NODES.length - 1;
        const at = isLast ? cue(ID, "lo cierra") + 0.7 : cue(ID, "el ciclo de vida") + i * 0.3;
        const pos: React.CSSProperties =
          n.side === "top"
            ? { left: n.x - 150, top: n.y - 92, width: 300, textAlign: "center" }
            : n.side === "bottom"
              ? { left: n.x - 150, top: n.y + 26, width: 300, textAlign: "center" }
              : n.side === "left"
                ? { left: n.x - 330, top: n.y - 32, width: 300, textAlign: "right" }
                : { left: n.x + 30, top: n.y - 32, width: 300, textAlign: "left" };
        return (
          <Rise key={n.name} at={at} y={10} style={{ position: "absolute", ...pos }}>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 30, lineHeight: 1.1 }}>{n.name}</div>
            <div style={{ fontSize: 24, color: "rgba(20,22,26,0.7)" }}>{n.sub}</div>
          </Rise>
        );
      })}
      <div style={{ position: "absolute", left: 1300, top: 452, width: 320, textAlign: "center", fontFamily: FONT.head, fontWeight: 600, fontSize: 40, lineHeight: 1.1 }}>
        <div style={{ opacity: prog(t, cue(ID, "no se cierra") - 0.2, 0.4) * (1 - prog(t, cue(ID, "lo cierra"), 0.3)), position: "absolute", width: "100%" }}>
          Hoy el ciclo
          <br />
          no se cierra
        </div>
        <div style={{ opacity: prog(t, cue(ID, "lo cierra") + 0.4, 0.4), position: "absolute", width: "100%" }}>
          El ciclo
          <br />
          se cierra
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const S01: React.FC = () => {
  const t = useSec();
  const fadeOut = 1 - prog(t, sceneSeconds(ID) - 0.35, 0.35);
  const at = [0.25, cue(ID, "Management") - 0.1, cue(ID, "Finance") - 0.1];
  return (
    <AbsoluteFill style={{ background: C.yellow, fontFamily: FONT.body, color: C.ink }}>
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Rise at={0.1} y={0} style={{ position: "absolute", left: MX, top: 84, fontSize: 28, fontWeight: 500 }}>
          Procurement · Value Creation · Tecnología MAZ
        </Rise>
        <div style={{ position: "absolute", left: MX, top: 230 }}>
          {TITLE.map((l, i) => (
            <Rise key={l} at={at[i]} y={40} dur={0.7}>
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 138, lineHeight: 1.02, letterSpacing: -4.5 }}>{l}</div>
            </Rise>
          ))}
        </div>
        <div style={{ position: "absolute", left: MX, top: 700, width: 940, display: "flex", flexWrap: "wrap", gap: 14 }}>
          {PROMISES.map((p, i) => (
            <Rise key={p} at={cue(ID, ["un solo registro", "alertas que se", "una decisión siempre"][i])} y={16} scaleFrom={0.92}>
              <Pill size={30} bg={C.ink} color={C.yellow}>
                {p}
              </Pill>
            </Rise>
          ))}
        </div>
        <Rise at={0.6} y={0} style={{ position: "absolute", left: MX, top: 866, fontSize: 24, color: "rgba(20,22,26,0.75)" }}>
          Propuesta To-Be v3.2 · para Vo.Bo. del negocio
        </Rise>
        <Ring />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
