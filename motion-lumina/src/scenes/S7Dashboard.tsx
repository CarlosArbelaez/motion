import React from "react";
import {useCurrentFrame} from "remotion";
import {Highlight, Scene} from "../components/ui";
import {content} from "../data/content";
import {ap, beesRadius, body, C, f, h1, pop, rise} from "../theme";

export const S7Dashboard: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const t = content.s7;
  const cues = [c(82.0), c(83.04), c(84.12), c(85.16), c(86.72), c(87.76), c(88.8)];
  const accents = [C.yellow, C.blue, C.orange, C.red, C.yellow, C.blue, C.orange];
  const frameAt = c(78.9);
  const pulse = 0.5 + 0.5 * Math.sin(frame / 5);
  const tile = (i: number) => {
    const row = i < 4 ? 0 : 1;
    const col = row === 0 ? i : i - 4;
    const w = row === 0 ? 402 : 544;
    return {left: 24 + col * (w + 24), top: 96 + row * 226, width: w};
  };
  return (
    <Scene
      duration={duration}
      kicker={t.kicker}
      title={
        <>
          <Highlight at={c(76.6)}>{t.highlight}</Highlight> {t.post}
        </>
      }
    >
      <div style={{position: "absolute", left: 96, top: 262, width: 1728, height: 572, background: C.grey, borderRadius: beesRadius(40), overflow: "hidden", ...rise(frame, frameAt, 60, 20)}}>
        <div style={{height: 72, background: C.black, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px"}}>
          <div style={{...h1(38), color: C.white}}>{t.barTitle}</div>
          <div style={{display: "flex", alignItems: "center", gap: 14, opacity: ap(frame, c(79.9), 12)}}>
            <div style={{width: 20, height: 20, borderRadius: 10, background: C.yellow, opacity: 0.45 + 0.55 * pulse}} />
            <div style={{...body(26, 600), color: C.yellow}}>{t.barStatus}</div>
          </div>
        </div>
        {t.tiles.map((tl, i) => {
          const pos = tile(i);
          return (
            <div key={tl.title} style={{position: "absolute", ...pos, height: 202, boxSizing: "border-box", background: C.white, borderRadius: beesRadius(24), padding: "22px 26px 22px 40px", overflow: "hidden", ...pop(frame, cues[i])}}>
              <div style={{position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: accents[i], borderRight: `2px solid ${C.black}`}} />
              <div style={{...h1(46)}}>{tl.title}</div>
              <div style={{...body(27), marginTop: 12}}>{tl.text}</div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};
