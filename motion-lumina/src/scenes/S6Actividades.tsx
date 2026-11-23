import React from "react";
import {useCurrentFrame} from "remotion";
import {Highlight, Icon, Scene} from "../components/ui";
import {content} from "../data/content";
import {ap, beesRadius, body, C, f, h1, HEAD, pop} from "../theme";

export const S6Actividades: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const t = content.s6;
  const cues = [c(62.92), c(64.96), c(66.6), c(69.76), c(71.2)];
  const active = cues.reduce((acc, q, i) => (frame >= q ? i : acc), -1);
  const cw = 328;
  return (
    <Scene
      duration={duration}
      kicker={t.kicker}
      title={
        <>
          {t.pre} <Highlight at={c(59.8)}>{t.highlight}</Highlight> {t.post}
        </>
      }
    >
      {t.cards.map((card, i) => {
        const left = 96 + i * (cw + 22);
        const on = frame >= cues[i];
        return (
          <React.Fragment key={card.title}>
            {/* espacio reservado: las cinco actividades se anuncian antes de detallarse */}
            <div
              style={{
                position: "absolute",
                left,
                top: 300,
                width: cw,
                height: 480,
                boxSizing: "border-box",
                border: `4px dashed #C9C4D8`,
                borderRadius: beesRadius(34),
                opacity: on ? 0 : ap(frame, c(58.0) + i * 5, 14),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: HEAD,
                fontWeight: 600,
                fontSize: 120,
                color: "#C9C4D8",
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                position: "absolute",
                left,
                top: 300,
                width: cw,
                height: 480,
                boxSizing: "border-box",
                padding: "30px 28px",
                background: i === active ? C.yellow : C.grey,
                borderRadius: beesRadius(34),
                ...pop(frame, cues[i]),
              }}
            >
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{width: 64, height: 64, borderRadius: 32, background: C.black, color: C.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 38}}>
                  {i + 1}
                </div>
                <Icon name={card.icon} size={64} />
              </div>
              <div style={{...h1(42), lineHeight: 1.04, marginTop: 34}}>{card.title}</div>
              <div style={{...body(28), marginTop: 18}}>{card.text}</div>
            </div>
          </React.Fragment>
        );
      })}
    </Scene>
  );
};
