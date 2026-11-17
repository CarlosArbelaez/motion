import React from "react";
import { C, FONT, R } from "../theme";
import { lin, prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { MX, Pill, Shell } from "../components/ui";

const ID = "s12";
// Estimación preliminar del To-Be v4.0 (pendiente de validar con el Tech Lead).
// Semanas contadas desde el inicio previsto, 23-nov-2026. Solo hitos: MVP y To-Be completo.
const X0 = 440; // 23-nov-2026
const PXW = 30.6; // píxeles por semana
const wx = (w: number) => X0 + w * PXW;
const MONTHS: [string, number][] = [
  ["dic", 1.14],
  ["ene 2027", 5.57],
  ["feb", 10],
  ["mar", 14],
  ["abr", 18.43],
  ["may", 22.71],
  ["jun", 27.14],
  ["jul", 31.43],
  ["ago", 35.86],
  ["sep", 40.29],
];
const ROWS = [
  {
    y: 410,
    who: "2 personas",
    at: cue(ID, "Con dos personas"),
    mvp: 24,
    alta: 5,
    ia: 14,
    mvpDate: "~10 de mayo de 2027",
    endDate: "~20 de septiembre de 2027",
    mvpAt: cue(ID, "diez de mayo"),
    endAt: cue(ID, "veinte de septiembre"),
  },
  {
    y: 640,
    who: "4 personas",
    at: cue(ID, "Con cuatro personas"),
    mvp: 14,
    alta: 3,
    ia: 8,
    mvpDate: "~1 de marzo de 2027",
    endDate: "~17 de mayo de 2027",
    mvpAt: cue(ID, "primero de marzo"),
    endAt: cue(ID, "diecisiete de mayo"),
  },
];
const BH = 58;

export const S12: React.FC = () => {
  const t = useSec();
  const startAt = cue(ID, "Arrancamos") - 0.1;
  return (
    <Shell
      id={ID}
      chapter={4}
      title="Cuándo y con quién: dos escenarios, las mismas siete entregas"
      foot="Cuenta solo personas de desarrollo dedicadas al 100 % · supone dependencias a tiempo · no incluye el receso de fin de año · costos, al elegir el escenario"
    >
      {/* Eje de meses */}
      <svg style={{ position: "absolute", left: 0, top: 0, opacity: prog(t, startAt, 0.5) }} width={1920} height={1080}>
        {MONTHS.map(([m, w]) => (
          <line key={m} x1={wx(w)} y1={330} x2={wx(w)} y2={800} stroke={C.line} strokeWidth={2} />
        ))}
        <line x1={X0} y1={300} x2={X0} y2={800} stroke={C.ink} strokeWidth={4} />
      </svg>
      <div style={{ opacity: prog(t, startAt, 0.5) }}>
        {MONTHS.map(([m, w]) => (
          <div key={m} style={{ position: "absolute", left: wx(w) + 8, top: 300, fontSize: 21, fontWeight: 500, color: C.mute }}>
            {m}
          </div>
        ))}
      </div>
      <Rise at={startAt} y={10} style={{ position: "absolute", left: MX, top: 292, width: X0 - MX - 16, textAlign: "right" }}>
        <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 30, lineHeight: 1.05 }}>23 de noviembre</div>
        <div style={{ fontSize: 22, color: C.text }}>inicio previsto</div>
      </Rise>

      {ROWS.map((r) => {
        const total = r.mvp + r.alta + r.ia;
        const grow = lin(t, r.at, 1.6) * total; // semanas dibujadas
        const seg = (from: number, len: number) => Math.max(0, Math.min(len, grow - from)) * PXW;
        const mvpP = prog(t, r.mvpAt - 0.1, 0.4);
        const endP = prog(t, r.endAt - 0.1, 0.4);
        return (
          <React.Fragment key={r.who}>
            <Rise at={r.at - 0.1} y={14} style={{ position: "absolute", left: MX, top: r.y - 4, width: X0 - MX - 16, textAlign: "right" }}>
              <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 46, lineHeight: 1, letterSpacing: -1 }}>{r.who}</div>
              <div style={{ fontSize: 24, color: C.text, marginTop: 4 }}>dedicadas</div>
            </Rise>
            <div style={{ position: "absolute", left: X0 + 2, top: r.y, height: BH, display: "flex" }}>
              <div style={{ width: seg(0, r.mvp), height: BH, background: C.yellow, borderRadius: `${R.ctl}px 0 0 ${R.ctl}px` }} />
              <div style={{ width: seg(r.mvp, r.alta), height: BH, background: C.blueSoft }} />
              <div style={{ width: seg(r.mvp + r.alta, r.ia), height: BH, background: C.purple, borderRadius: `0 ${R.ctl}px ${R.ctl}px 0` }} />
            </div>
            <div style={{ position: "absolute", left: X0 + 18, top: r.y + 13, fontSize: 24, fontWeight: 700, opacity: prog(t, r.at + 0.5, 0.4) }}>MVP · sin IA</div>
            {/* Hito: MVP */}
            <div style={{ position: "absolute", left: wx(r.mvp) - 2, top: r.y - 12, width: 4, height: BH + 34, background: C.ink, opacity: mvpP }} />
            <div style={{ position: "absolute", left: wx(r.mvp) - 330, top: r.y + BH + 28, width: 330, textAlign: "right", opacity: mvpP, translate: `0px ${8 * (1 - mvpP)}px` }}>
              <div style={{ fontSize: 22, fontWeight: 500, color: C.text }}>MVP listo · ~{r.mvp} semanas</div>
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 31, lineHeight: 1.1 }}>{r.mvpDate}</div>
            </div>
            {/* Hito: To-Be completo */}
            <div style={{ position: "absolute", left: wx(total) - 2, top: r.y - 12, width: 4, height: BH + 34, background: C.ink, opacity: endP }} />
            <div style={{ position: "absolute", left: wx(total) - 400, top: r.y + BH + 28, width: 400, textAlign: "right", opacity: endP, translate: `0px ${8 * (1 - endP)}px` }}>
              <div style={{ fontSize: 22, fontWeight: 500, color: C.text }}>To-Be completo · ~{total} semanas</div>
              <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 31, lineHeight: 1.1 }}>{r.endDate}</div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Leyenda y advertencia */}
      <Rise at={ROWS[0].at + 0.6} y={8} style={{ position: "absolute", left: 1290, top: 244, display: "flex", gap: 18, alignItems: "center", fontSize: 21, color: C.text }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 22, height: 22, borderRadius: 5, background: C.yellow }} /> MVP
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 22, height: 22, borderRadius: 5, background: C.blueSoft }} /> Alta con la regla
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 22, height: 22, borderRadius: 5, background: C.purple }} /> Con IA
        </span>
      </Rise>
      <Rise at={cue(ID, "Es una estimación") - 0.1} y={12} style={{ position: "absolute", left: X0, top: 812 }}>
        <Pill size={25} bg={C.ink} color={C.white}>
          Estimación preliminar · por validar con el Tech Lead
        </Pill>
      </Rise>
    </Shell>
  );
};
