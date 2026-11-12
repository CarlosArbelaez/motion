import React from "react";
import { C, FONT } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { Card, MX, Shell } from "../components/ui";

const ID = "s08";
const OWNERS = [
  {
    at: cue(ID, "El dueño del servicio"),
    who: "Dueño del servicio y su líder",
    of: "Cada contrato",
    d: "Definen la necesidad y deciden renovar, renegociar, consolidar o terminar.",
    bar: C.ink,
  },
  {
    at: cue(ID, "Procurement"),
    who: "Procurement",
    of: "La cobertura contractual y Ariba",
    d: "Abre el espacio del contrato, adjunta el PDF y gestiona los plazos con el proveedor.",
    bar: C.yellow,
  },
  {
    at: cue(ID, "Value Creation"),
    who: "Value Creation",
    of: "El seguimiento y el dato",
    d: "Cuida el proceso de seguimiento y la calidad del registro, con un data steward.",
    bar: C.blue,
  },
];

export const S08: React.FC = () => {
  const t = useSec();
  const fill = cue(ID, "tres dueños");
  const filled = prog(t, OWNERS[0].at - 0.3, 0.5);
  return (
    <Shell
      id={ID}
      chapter={2}
      title="Tres dueños llenan el vacío que hoy nadie cubre"
      foot="Modelo de gobierno propuesto, por aprobar en el Vo.Bo. · sus responsables se nombran en la sesión"
    >
      <Rise at={0.4} y={14} style={{ position: "absolute", left: 560, top: 270 }}>
        <div
          style={{
            width: 800,
            height: 78,
            borderRadius: 16,
            border: `4px ${filled > 0.5 ? "solid" : "dashed"} ${filled > 0.5 ? C.ink : C.mute}`,
            background: filled > 0.5 ? C.ink : "transparent",
            color: filled > 0.5 ? C.white : C.text,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT.head,
            fontWeight: 600,
            fontSize: 32,
          }}
        >
          {filled > 0.5 ? "Proceso de punta a punta: tres dueños" : "Dueño del proceso de punta a punta: nadie"}
        </div>
      </Rise>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        {OWNERS.map((o, i) => {
          const p = prog(t, Math.max(fill, o.at - 0.4), 0.5);
          const x = MX + i * 580 + 270;
          return <path key={o.who} d={`M960 348 V 376 H ${x} V 404`} fill="none" stroke={C.ink} strokeWidth={4} pathLength={1} strokeDasharray={`${p} 1`} strokeLinejoin="round" />;
        })}
      </svg>
      {OWNERS.map((o, i) => (
        <Rise key={o.who} at={o.at - 0.1} y={34} style={{ position: "absolute", left: MX + i * 580, top: 404 }}>
          <Card style={{ width: 540, height: 430, padding: "30px 34px", borderTop: `12px solid ${o.bar}`, borderColor: C.line, borderTopColor: o.bar }}>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 44, lineHeight: 1.08, letterSpacing: -0.6, height: 100 }}>{o.who}</div>
            <div style={{ fontSize: 23, fontWeight: 700, color: C.mute, letterSpacing: 1.5, marginTop: 14 }}>RESPONDE POR</div>
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 34, lineHeight: 1.12, marginTop: 4 }}>
              <span style={{ background: C.yellowSoft, padding: "0 8px", borderRadius: 6, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{o.of}</span>
            </div>
            <div style={{ fontSize: 27, color: C.text, lineHeight: 1.28, marginTop: 18 }}>{o.d}</div>
          </Card>
        </Rise>
      ))}
    </Shell>
  );
};
