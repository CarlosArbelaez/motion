import React from "react";
import { C, FONT } from "../theme";
import { Rise } from "../lib/anim";
import { cue } from "../lib/timing";
import { Check, MX, Pill, Shell } from "../components/ui";

const ID = "s10";
const TOP = 300;
const HGT = 470;
const COLS = [
  { x: MX, w: 660 },
  { x: MX + 700, w: 480 },
  { x: MX + 1220, w: 480 },
];

const Col: React.FC<{
  i: number;
  at: number;
  label: string;
  title: string;
  headBg: string;
  headFg: string;
  children: React.ReactNode;
}> = ({ i, at, label, title, headBg, headFg, children }) => (
  <Rise at={at} y={30} style={{ position: "absolute", left: COLS[i].x, top: TOP }}>
    <div style={{ width: COLS[i].w, height: HGT, background: C.white, border: `2px solid ${C.line}`, borderRadius: 22, overflow: "hidden", boxSizing: "border-box" }}>
      <div style={{ background: headBg, color: headFg, padding: "18px 26px 20px" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2.5 }}>{label}</div>
        <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 38, lineHeight: 1.08, letterSpacing: -0.5, marginTop: 4 }}>{title}</div>
      </div>
      <div style={{ padding: "20px 26px" }}>{children}</div>
    </div>
  </Rise>
);

const Item: React.FC<{ at: number; h?: string; children: React.ReactNode }> = ({ at, h, children }) => (
  <Rise at={at} y={12} style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 26, lineHeight: 1.22, color: C.text }}>
      {h ? <b style={{ color: C.ink }}>{h} </b> : null}
      {children}
    </div>
  </Rise>
);

export const S10: React.FC = () => {
  const now = cue(ID, "producto mínimo") - 0.4;
  const next = cue(ID, "Después") - 0.1;
  const later = cue(ID, "Y la ola tres") - 0.1;
  const gate = cue(ID, "Cada ola");
  return (
    <Shell
      id={ID}
      chapter={4}
      title="Alcance inicial: un MVP que cierra el ciclo sin IA"
      foot="Estado: propuesta para aprobación · la decisión de pasar a los agentes de IA se toma al cumplir los criterios de salida del MVP"
    >
      <Col i={0} at={now} label="AHORA · ALCANCE INICIAL" title="MVP: Olas 0 y 1" headBg={C.yellow} headFg={C.ink}>
        <Item at={cue(ID, "las olas")} h="Ola 0 · Cimientos:">
          gobierno, catálogo de reglas y política de preaviso.
        </Item>
        <Item at={cue(ID, "las olas") + 0.5} h="Ola 1 · Registro único:">
          alta con la regla, conciliación con Ariba y el Budget, alertas con respuesta y dashboard.
        </Item>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
          <Rise at={cue(ID, "sin agentes")} y={10} scaleFrom={0.9}>
            <Pill size={24} bg={C.ink} color={C.yellow}>
              Sin agentes de IA
            </Pill>
          </Rise>
          <Rise at={cue(ID, "Microsoft")} y={10} scaleFrom={0.9}>
            <Pill size={24} bg={C.panel} color={C.ink}>
              Microsoft 365 que ya se tiene
            </Pill>
          </Rise>
        </div>
      </Col>

      <Col i={1} at={next} label="DESPUÉS" title="Ola 2 · Ficha del contrato con IA" headBg={C.purple} headFg={C.white}>
        <Item at={cue(ID, "trae la ficha")}>La IA lee el PDF y propone la ficha; una persona valida todas.</Item>
        <Rise at={cue(ID, "un piloto")} y={10} scaleFrom={0.9} style={{ marginBottom: 12 }}>
          <Pill size={24} bg={C.purpleSoft} color={C.purple}>
            Piloto de 20 contratos
          </Pill>
        </Rise>
        <Item at={cue(ID, "un piloto") + 0.5}>Condición: aval de Seguridad y Compliance.</Item>
      </Col>

      <Col i={2} at={later} label="LUEGO" title="Ola 3 · Inteligencia contractual" headBg={C.purpleSoft} headFg={C.purple}>
        <Item at={cue(ID, "la consulta")} h="Consulta">
          por contrato, con cita.
        </Item>
        <Item at={cue(ID, "el resumen")} h="Resumen de renovación">
          junto con cada alerta.
        </Item>
        <Item at={cue(ID, "la búsqueda")} h="Servicios similares:">
          propone candidatos para revisar.
        </Item>
      </Col>

      {[COLS[1].x - 20, COLS[2].x - 20].map((x, i) => (
        <Rise key={x} at={gate + i * 0.35} y={0} scaleFrom={0.3} dur={0.45} style={{ position: "absolute", left: x - 32, top: TOP + HGT / 2 - 32 }}>
          <div style={{ borderRadius: 40, border: `5px solid ${C.bg}`, lineHeight: 0 }}>
            <Check size={64} />
          </div>
        </Rise>
      ))}
      <Rise at={gate} y={16} style={{ position: "absolute", left: MX, top: 792, width: 1700 }}>
        <div style={{ background: C.ink, color: C.white, borderRadius: 16, padding: "14px 30px", fontFamily: FONT.head, fontWeight: 600, fontSize: 34, textAlign: "center" }}>
          Una ola arranca solo cuando la anterior cumple sus criterios de salida
        </div>
      </Rise>
    </Shell>
  );
};
