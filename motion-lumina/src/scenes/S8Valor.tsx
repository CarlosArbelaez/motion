import React from "react";
import {useCurrentFrame} from "remotion";
import {Highlight, Icon, Scene} from "../components/ui";
import {content} from "../data/content";
import {beesRadius, C, f, h1, pop} from "../theme";

export const S8Valor: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const t = content.s8;
  const cues = [c(91.3), c(95.16), c(98.08), c(100.96), c(104.72), c(108.4)];
  const active = cues.reduce((acc, q, i) => (frame >= q ? i : acc), -1);
  return (
    <Scene
      duration={duration}
      kicker={t.kicker}
      title={
        <>
          {t.pre} <Highlight at={12}>{t.highlight}</Highlight>
        </>
      }
    >
      {t.items.map((it, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <div
            key={it}
            style={{
              position: "absolute",
              left: 96 + col * 584,
              top: 286 + row * 304,
              width: 560,
              height: 280,
              boxSizing: "border-box",
              padding: "30px 32px",
              background: i === active ? C.yellow : C.grey,
              borderRadius: beesRadius(34),
              ...pop(frame, cues[i]),
            }}
          >
            <div style={{width: 60, height: 60, borderRadius: 30, background: C.black, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Icon name="check" size={38} color={C.yellow} />
            </div>
            <div style={{...h1(44), lineHeight: 1.06, marginTop: 22}}>{it}</div>
          </div>
        );
      })}
    </Scene>
  );
};
