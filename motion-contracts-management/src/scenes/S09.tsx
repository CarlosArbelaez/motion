import React from "react";
import { C, FONT, R } from "../theme";
import { prog, Rise, useSec } from "../lib/anim";
import { cue } from "../lib/timing";
import { Card, MX, Pill, Shell } from "../components/ui";

const ID = "s09";
// Nombre PROPUESTO para la plataforma del escenario Completo; se valida con negocio.
// La locución no lo pronuncia: se puede cambiar aquí sin regrabar la voz.
export const PLATFORM_NAME = "BrewContracts";
// Representación conceptual de la plataforma, armada con los patrones del sistema de diseño
// (barra de aplicación, navegación lateral, tabla, badges). Sin datos inventados: los textos de
// ejemplo se muestran como barras y solo se escriben módulos y estados documentados.
const NAV = ["Registro", "Dashboard", "Alertas", "Decisiones", "Histórico", "Reglas"];
const VIEWS = [
  { nav: 0, at: 0, title: "Registro de servicios y contratos" },
  { nav: 1, at: cue(ID, "El dashboard") - 0.2, title: "Dashboard general" },
  { nav: 2, at: cue(ID, "Las alertas") - 0.2, title: "Mis alertas" },
  { nav: 4, at: cue(ID, "el histórico") - 0.2, title: "Histórico de aprobaciones" },
];
const FX = MX;
const FY = 286;
const FW = 1200;
const FH = 566;
const NAVW = 236;
const BAR = 62;

const Bar: React.FC<{ w: number; h?: number; dark?: boolean }> = ({ w, h = 14, dark }) => (
  <div style={{ width: w, height: h, borderRadius: h / 2, background: dark ? "#c9cdd4" : C.line }} />
);
const Badge: React.FC<{ bg: string; children: React.ReactNode }> = ({ bg, children }) => (
  <span style={{ background: bg, color: C.ink, fontSize: 19, fontWeight: 500, padding: "5px 14px", borderRadius: R.full, whiteSpace: "nowrap" }}>{children}</span>
);
const row: React.CSSProperties = { display: "flex", alignItems: "center", borderBottom: `2px solid ${C.line}`, height: 68 };
const th: React.CSSProperties = { fontSize: 19, fontWeight: 500, color: C.mute };

const Registro: React.FC = () => {
  const rows: [number, string, string][] = [
    [250, "Vigente", C.greenSoft],
    [190, "En renovación", C.blueSoft],
    [280, "Vigente", C.greenSoft],
    [220, "Sin contrato", C.panel],
    [240, "Vencido sin decisión", C.coralSoft],
  ];
  return (
    <div>
      <div style={{ ...row, height: 44 }}>
        <div style={{ ...th, width: 340 }}>Servicio</div>
        <div style={{ ...th, width: 260 }}>Estado</div>
        <div style={{ ...th, width: 160 }}>Vence</div>
        <div style={th}>Dueño</div>
      </div>
      {rows.map(([w, st, bg], i) => (
        <div key={i} style={row}>
          <div style={{ width: 340 }}>
            <Bar w={w} dark />
          </div>
          <div style={{ width: 260 }}>
            <Badge bg={bg}>{st}</Badge>
          </div>
          <div style={{ width: 160 }}>
            <Bar w={96} />
          </div>
          <Bar w={120} />
        </div>
      ))}
    </div>
  );
};

const Dashboard: React.FC<{ hl: number }> = ({ hl }) => {
  const kpis = ["Vencen en 90 días", "Alertas abiertas", "Vigentes con PDF en Ariba", "Calidad del dato"];
  const bars = [46, 70, 38, 92, 60, 110, 74, 52, 88, 64, 40, 78];
  return (
    <div>
      <div style={{ display: "flex", gap: 14 }}>
        {kpis.map((k) => (
          <div key={k} style={{ flex: 1, border: `2px solid ${C.line}`, borderRadius: R.card, padding: "14px 16px", height: 128, boxSizing: "border-box" }}>
            <div style={{ fontSize: 19, fontWeight: 500, color: C.mute, lineHeight: 1.15, height: 54 }}>{k}</div>
            <Bar w={84} h={24} dark />
          </div>
        ))}
      </div>
      <div style={{ border: `2px solid ${C.line}`, borderRadius: R.card, marginTop: 14, padding: "14px 18px", height: 236, boxSizing: "border-box" }}>
        <div style={{ fontSize: 19, fontWeight: 500, color: C.mute }}>Vencimientos por período</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 160, marginTop: 14, borderBottom: `2px solid ${C.line}` }}>
          {bars.map((b, i) => (
            <div key={i} style={{ flex: 1, height: b, background: "#c9cdd4", borderRadius: "4px 4px 0 0" }} />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: -62,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 21,
          fontWeight: 500,
          padding: "9px 18px",
          borderRadius: R.ctl,
          border: `2px solid ${C.ink}`,
          background: hl > 0.5 ? C.ink : C.white,
          color: hl > 0.5 ? C.white : C.ink,
        }}
      >
        <svg width={20} height={20} viewBox="0 0 20 20">
          <path d="M10 2 V13 M5 9 L10 14 L15 9 M3 18 H17" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Descargar reporte
      </div>
    </div>
  );
};

const Alertas: React.FC = () => {
  const items: [string, string][] = [
    ["Faltan 90 días", C.blueSoft],
    ["Faltan 60 días", C.coralSoft],
    ["Respondida", C.greenSoft],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map(([b, bg], i) => (
        <div key={b} style={{ border: `2px solid ${C.line}`, borderRadius: R.card, height: 116, display: "flex", alignItems: "center", padding: "0 22px", gap: 20, boxSizing: "border-box" }}>
          <svg width={34} height={34} viewBox="0 0 34 34">
            <path d="M17 4 C11 4 8 9 8 15 V21 L5 25 H29 L26 21 V15 C26 9 23 4 17 4 Z M13 28 C14 31 20 31 21 28" fill="none" stroke={C.ink} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Contrato por vencer</div>
            <div style={{ marginTop: 10 }}>
              <Bar w={220 + i * 40} />
            </div>
          </div>
          <Badge bg={bg}>{b}</Badge>
          {i < 2 ? (
            <div style={{ fontSize: 21, fontWeight: 500, padding: "9px 18px", borderRadius: R.ctl, border: `2px solid ${C.ink}` }}>Responder</div>
          ) : (
            <div style={{ width: 132 }} />
          )}
        </div>
      ))}
    </div>
  );
};

const Historico: React.FC<{ hl: number }> = ({ hl }) => {
  const rows: [string, string][] = [
    ["Aprobación de la DAG", "Leída de Ariba"],
    ["Validación de la ficha", "En la plataforma"],
    ["Decisión de renovación", "En la plataforma"],
  ];
  const head: React.CSSProperties = { ...th, color: hl > 0.5 ? C.ink : C.mute, fontWeight: hl > 0.5 ? 700 : 500 };
  return (
    <div>
      <div style={{ ...row, height: 44 }}>
        <div style={{ ...th, width: 430 }}>Qué</div>
        <div style={{ ...head, width: 170 }}>Quién aprobó</div>
        <div style={{ ...head, width: 130 }}>Cuándo</div>
        <div style={head}>Por qué</div>
      </div>
      {rows.map(([q, src], i) => (
        <div key={q} style={{ ...row, height: 112 }}>
          <div style={{ width: 430 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{q}</div>
            <div style={{ fontSize: 19, color: C.mute, marginTop: 2 }}>{src}</div>
          </div>
          <div style={{ width: 170 }}>
            <Bar w={110} dark />
          </div>
          <div style={{ width: 130 }}>
            <Bar w={84} />
          </div>
          <Bar w={130 - i * 14} />
        </div>
      ))}
    </div>
  );
};

export const S09: React.FC = () => {
  const t = useSec();
  let v = 0;
  VIEWS.forEach((x, i) => {
    if (t >= x.at) v = i;
  });
  const ia = cue(ID, "Además") - 0.2;
  const op = (i: number) => (i === v ? prog(t, VIEWS[i].at, 0.35) : 0);
  return (
    <Shell
      id={ID}
      chapter={3}
      title="Completo: todo en una sola plataforma, con IA"
      foot="Representación conceptual · SAP Ariba sigue siendo el sistema oficial de contratos y de aprobaciones de la DAG"
    >
      <Rise at={0.3} y={30} dur={0.7} style={{ position: "absolute", left: FX, top: FY }}>
        <div style={{ width: FW, height: FH, background: C.white, border: `2px solid ${C.line}`, borderRadius: R.panel, overflow: "hidden", boxSizing: "border-box" }}>
          {/* Barra de aplicación */}
          <div style={{ height: BAR, borderBottom: `2px solid ${C.line}`, display: "flex", alignItems: "center", padding: "0 22px", gap: 14, boxSizing: "border-box" }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: C.ink }} />
            <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 25, flex: 1 }}>{PLATFORM_NAME}</div>
            <span style={{ fontSize: 19, color: C.mute }}>Rol: dueño del servicio</span>
            <div style={{ width: 34, height: 34, borderRadius: 17, background: C.line }} />
          </div>
          <div style={{ display: "flex", height: FH - BAR }}>
            {/* Navegación lateral */}
            <div style={{ width: NAVW, borderRight: `2px solid ${C.line}`, padding: "16px 14px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV.map((n, i) => {
                const on = VIEWS[v].nav === i;
                return (
                  <div
                    key={n}
                    style={{
                      fontSize: 23,
                      fontWeight: on ? 700 : 500,
                      color: on ? C.ink : C.text,
                      background: on ? C.yellow : "transparent",
                      borderRadius: R.ctl,
                      padding: "11px 16px",
                    }}
                  >
                    {n}
                  </div>
                );
              })}
            </div>
            {/* Contenido */}
            <div style={{ flex: 1, padding: "20px 28px", position: "relative" }}>
              {VIEWS.map((x, i) => (
                <div key={x.title} style={{ position: "absolute", left: 28, right: 28, top: 20, opacity: op(i) }}>
                  <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 31, marginBottom: 16, height: 42 }}>{x.title}</div>
                  <div style={{ position: "relative" }}>
                    {i === 0 ? <Registro /> : null}
                    {i === 1 ? <Dashboard hl={prog(t, cue(ID, "con descarga"), 0.3)} /> : null}
                    {i === 2 ? <Alertas /> : null}
                    {i === 3 ? <Historico hl={prog(t, cue(ID, "quién aprobó"), 0.3)} /> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Rise>

      {/* Nombre propuesto y lo que añade la IA */}
      <Rise at={0.9} y={20} style={{ position: "absolute", left: 1350, top: FY }}>
        <Card style={{ width: 460, height: 232, padding: "22px 26px" }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 42, letterSpacing: -0.8 }}>{PLATFORM_NAME}</div>
          <div style={{ marginTop: 8 }}>
            <Pill size={21} bg={C.yellow} color={C.ink}>
              Nombre propuesto · por validar
            </Pill>
          </div>
          <div style={{ fontSize: 24, color: C.text, marginTop: 14, lineHeight: 1.22 }}>Se entra con el usuario corporativo; cada rol ve lo suyo.</div>
        </Card>
      </Rise>
      <Rise at={ia} y={20} style={{ position: "absolute", left: 1350, top: FY + 256 }}>
        <div style={{ width: 460, height: 310, background: C.purple, color: C.white, borderRadius: R.card, padding: "24px 26px", boxSizing: "border-box" }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 600, fontSize: 36, lineHeight: 1.1, letterSpacing: -0.5 }}>IA que lee y propone</div>
          <div style={{ fontSize: 25, marginTop: 10, lineHeight: 1.24, color: "rgba(255,255,255,0.92)" }}>
            Lee cada contrato y propone sus datos, con su cita. Una persona valida todo.
          </div>
          <div style={{ fontSize: 22, marginTop: 14, paddingTop: 14, borderTop: "2px solid rgba(255,255,255,0.25)", lineHeight: 1.24, color: "rgba(255,255,255,0.86)" }}>
            También: consulta de cláusulas, brief de renovación y servicios similares.
          </div>
        </div>
      </Rise>
    </Shell>
  );
};
