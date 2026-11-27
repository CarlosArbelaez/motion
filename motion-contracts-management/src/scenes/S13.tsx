import React from "react";
import { C, FONT, R } from "../theme";
import { lin, prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Pill, Shell } from "../components/ui";
import { Flag } from "../components/Flag";

const ID = "s13";
// Sección 6 de la propuesta v5.1. Semanas laborales corridas desde el lunes 7-dic-2026,
// 2 AI Developers Specialist. Estimaciones preliminares.
const X0 = 430;
const PXW = 26; // píxeles por semana
const wx = (w: number) => X0 + w * PXW;
const MONTHS: [string, number][] = [
  ["ene 2027", 3.57],
  ["feb", 8],
  ["mar", 12],
  ["abr", 16.43],
  ["may", 20.71],
  ["jun", 25.14],
  ["jul", 29.43],
];
type Row = { y: number; name: string; sub: string; flag?: boolean; at: number; mvp: number; c1: number; post: number; c2: number; mvpAt: number; totAt: number; costAt: number; mvpTxt: string; totTxt: string; cost: string };
const ROWS: Row[] = [
  {
    y: 350,
    name: "Completo",
    sub: "Plataforma propia, con IA",
    at: cue(ID, "El Completo"),
    mvp: 16, c1: 3, post: 11, c2: 3,
    mvpAt: cue(ID, "semana dieciséis"), totAt: cue(ID, "treinta y tres semanas"), costAt: cue(ID, "noventa y un mil"),
    mvpTxt: "MVP: semana 16 · 26-mar-2027 · USD 44.308",
    totTxt: "33 semanas · hasta el 23-jul-2027",
    cost: "USD 91.385",
  },
  {
    y: 510,
    name: "Lite A",
    sub: "Con API de SAP Ariba",
    flag: true,
    at: cue(ID, "Lite A"),
    mvp: 13, c1: 2, post: 5, c2: 2,
    mvpAt: cue(ID, "semana trece"), totAt: cue(ID, "veintidós semanas"), costAt: cue(ID, "sesenta mil"),
    mvpTxt: "MVP: semana 13 · 5-mar-2027 · USD 36.000",
    totTxt: "22 semanas · hasta el 7-may-2027",
    cost: "USD 60.923",
  },
  {
    y: 670,
    name: "Lite B",
    sub: "Sin API de SAP Ariba",
    at: cue(ID, "Lite B"),
    mvp: 12, c1: 2, post: 4, c2: 2,
    mvpAt: cue(ID, "semana doce"), totAt: cue(ID, "veinte semanas"), costAt: cue(ID, "cincuenta y cinco mil"),
    mvpTxt: "MVP: semana 12 · 26-feb-2027 · USD 33.231",
    totTxt: "20 semanas · hasta el 23-abr-2027",
    cost: "USD 55.385",
  },
];
const BH = 50;
const sw = (c: string) => <span style={{ width: 22, height: 22, borderRadius: 5, background: c, border: c === C.line ? `2px solid ${C.faint}` : undefined, boxSizing: "border-box" }} />;

export const S13: React.FC = () => {
  const t = useSec();
  const startAt = cue(ID, "Los tres arrancan") - 0.1;
  return (
    <Shell
      id={ID}
      chapter={4}
      title="Cuánto tarda y cuánto cuesta cada escenario"
      foot="USD 6.000 por persona al mes · el costo del MVP no incluye contingencia · sin consultas a BrewDat, API de Ariba, nube, licencias, modelos de IA, impuestos ni soporte"
    >
      <svg style={{ position: "absolute", left: 0, top: 0, opacity: prog(t, startAt, 0.5) }} width={1920} height={1080}>
        {MONTHS.map(([m, w]) => (
          <line key={m} x1={wx(w)} y1={316} x2={wx(w)} y2={790} stroke={C.line} strokeWidth={2} />
        ))}
        <line x1={X0} y1={290} x2={X0} y2={790} stroke={C.ink} strokeWidth={4} />
      </svg>
      <div style={{ opacity: prog(t, startAt, 0.5) }}>
        {MONTHS.map(([m, w]) => (
          <div key={m} style={{ position: "absolute", left: wx(w) + 8, top: 288, fontSize: 20, fontWeight: 500, color: C.mute }}>
            {m}
          </div>
        ))}
      </div>
      <Rise at={startAt} y={10} style={{ position: "absolute", left: MX, top: 262, width: X0 - MX - 16, textAlign: "right" }}>
        <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 27, lineHeight: 1.05 }}>7 de diciembre</div>
        <div style={{ fontSize: 21, color: C.text }}>inicio · 2 personas dedicadas</div>
      </Rise>
      <Rise at={startAt + 0.4} y={8} style={{ position: "absolute", left: 1320, top: 250, display: "flex", gap: 16, alignItems: "center", fontSize: 20, color: C.text }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>{sw(C.ink)} Hasta el MVP</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>{sw(C.yellow)} Después</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>{sw(C.line)} Contingencia</span>
      </Rise>

      {ROWS.map((r) => {
        const total = r.mvp + r.c1 + r.post + r.c2;
        const grow = lin(t, r.at, 1.4) * total;
        const seg = (from: number, len: number) => Math.max(0, Math.min(len, grow - from)) * PXW;
        const mvpP = prog(t, r.mvpAt - 0.1, 0.4);
        const totP = prog(t, r.totAt - 0.1, 0.4);
        const costP = prog(t, r.costAt - 0.1, 0.4);
        return (
          <React.Fragment key={r.name}>
            <Rise at={r.at - 0.1} y={14} style={{ position: "absolute", left: MX, top: r.y - 6, width: X0 - MX - 16, textAlign: "right" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
                {r.flag ? (
                  <span style={{ background: C.yellow, borderRadius: 7, padding: "4px 6px", display: "flex" }}>
                    <Flag size={20} />
                  </span>
                ) : null}
                <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 44, lineHeight: 1, letterSpacing: -1 }}>{r.name}</div>
              </div>
              <div style={{ fontSize: 21, color: C.text, marginTop: 4 }}>{r.sub}</div>
            </Rise>
            <div style={{ position: "absolute", left: X0 + 2, top: r.y, height: BH, display: "flex" }}>
              <div style={{ width: seg(0, r.mvp), height: BH, background: C.ink, borderRadius: `${R.ctl}px 0 0 ${R.ctl}px` }} />
              <div style={{ width: seg(r.mvp, r.c1), height: BH, background: C.line }} />
              <div style={{ width: seg(r.mvp + r.c1, r.post), height: BH, background: C.yellow }} />
              <div style={{ width: seg(r.mvp + r.c1 + r.post, r.c2), height: BH, background: C.line, borderRadius: `0 ${R.ctl}px ${R.ctl}px 0` }} />
            </div>
            <div style={{ position: "absolute", left: X0 + 16, top: r.y + 11, fontSize: 22, fontWeight: 700, color: C.white, opacity: prog(t, r.at + 0.5, 0.4) }}>MVP</div>
            <div style={{ position: "absolute", left: wx(r.mvp) - 1, top: r.y - 8, width: 3, height: BH + 16, background: C.ink, opacity: mvpP }} />
            <div style={{ position: "absolute", left: X0 + 4, top: r.y + BH + 12, fontSize: 23, color: C.text, opacity: mvpP, translate: `0px ${8 * (1 - mvpP)}px`, fontVariantNumeric: "tabular-nums" }}>
              {r.mvpTxt}
            </div>
            <div style={{ position: "absolute", left: 1330, top: r.y - 8, width: 480, opacity: totP, translate: `0px ${8 * (1 - totP)}px` }}>
              <div style={{ fontSize: 24, fontWeight: 500, color: C.text, fontVariantNumeric: "tabular-nums" }}>{r.totTxt}</div>
            </div>
            <div style={{ position: "absolute", left: 1330, top: r.y + 24, width: 480, opacity: costP, translate: `0px ${8 * (1 - costP)}px` }}>
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 54, letterSpacing: -1.5, lineHeight: 1.05, fontVariantNumeric: "tabular-nums" }}>{r.cost}</div>
            </div>
          </React.Fragment>
        );
      })}

      <Rise at={cue(ID, "Son estimaciones") - 0.1} y={12} style={{ position: "absolute", left: X0, top: 806 }}>
        <Pill size={24} bg={C.ink} color={C.white}>
          Estimaciones preliminares · Completo: Tech Lead · Lite: consultoría, por validar con el Tech Lead
        </Pill>
      </Rise>
    </Shell>
  );
};
