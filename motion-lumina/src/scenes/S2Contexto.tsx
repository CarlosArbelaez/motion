import React from "react";
import {useCurrentFrame} from "remotion";
import {Highlight, Icon, Kicker, Scene} from "../components/ui";
import {content} from "../data/content";
import {ap, beesRadius, body, C, f, h1, pop, rise} from "../theme";

export const S2Contexto: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const t = content.s2;
  const cues = [c(8.88), c(9.96), c(10.64)];
  const icons = ["plus", "bolt", "shield"];
  const goalAt = c(12.2);
  return (
    <Scene duration={duration}>
      {/* panel amarillo: qué es */}
      <div style={{position: "absolute", left: 0, top: 0, width: 820, height: 1080, background: C.yellow, transformOrigin: "left center", scale: `${ap(frame, 0, 20)} 1`}} />
      <div style={{position: "absolute", left: 96, top: 250, width: 680}}>
        <Kicker at={8}>{t.kicker}</Kicker>
        <div style={{...h1(96), marginTop: 36, lineHeight: 1.16}}>
          <div style={rise(frame, 12)}>{t.pre}</div>
          <div style={rise(frame, 16)}>
            <Highlight on="yellow" at={c(5.7)}>{t.highlight}</Highlight>
          </div>
          <div style={rise(frame, 20)}>{t.post}</div>
        </div>
      </div>
      {/* foco: tres momentos del cliente */}
      <div style={{position: "absolute", left: 900, top: 250, ...rise(frame, c(8.0))}}>
        <Kicker at={c(8.0)}>Su foco</Kicker>
      </div>
      {t.stages.map((s, i) => (
        <React.Fragment key={s}>
          <div
            style={{
              position: "absolute",
              left: 900 + i * 328,
              top: 330,
              width: 268,
              height: 170,
              boxSizing: "border-box",
              background: C.grey,
              borderRadius: beesRadius(30),
              padding: "22px 24px",
              ...pop(frame, cues[i]),
            }}
          >
            <Icon name={icons[i]} size={52} />
            <div style={{...h1(46), marginTop: 14}}>{s}</div>
          </div>
          {i < 2 ? (
            <div style={{position: "absolute", left: 900 + i * 328 + 276, top: 392, opacity: ap(frame, cues[i + 1] - 4, 10)}}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={C.black} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </div>
          ) : null}
        </React.Fragment>
      ))}
      {/* conexión hacia el objetivo */}
      <div style={{position: "absolute", left: 1359, top: 512, width: 6, height: 76 * ap(frame, goalAt - 8, 12), background: C.black}} />
      <div
        style={{
          position: "absolute",
          left: 900,
          top: 588,
          width: 924,
          height: 210,
          boxSizing: "border-box",
          background: C.black,
          borderRadius: beesRadius(44),
          display: "flex",
          alignItems: "center",
          gap: 30,
          padding: "0 40px",
          ...rise(frame, goalAt, 40),
        }}
      >
        <div style={{width: 116, height: 116, borderRadius: 58, background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0}}>
          <Icon name="growth" size={72} />
        </div>
        <div>
          <div style={{...body(26, 600), color: C.yellow, letterSpacing: "0.08em", textTransform: "uppercase"}}>{t.goalLabel}</div>
          <div style={{...h1(56), color: C.white, marginTop: 8, lineHeight: 1.05}}>{t.goal}</div>
        </div>
      </div>
    </Scene>
  );
};
