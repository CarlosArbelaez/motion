import React from "react";
import {useCurrentFrame} from "remotion";
import {FrontMap, StepLine} from "../components/StepLine";
import {Highlight, Scene, Tag} from "../components/ui";
import {content} from "../data/content";
import {ap, beesRadius, body, C, f, h1, pop} from "../theme";

export const S5Retencion: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const t = content.s5;
  const detectAt = c(44.0);
  const backAt = c(54.3);
  const dotX = (i: number) => 560 + i * 90;
  return (
    <Scene
      duration={duration}
      kicker={t.kicker}
      title={
        <>
          {t.pre} <Highlight at={14}>{t.highlight}</Highlight>
        </>
      }
    >
      <FrontMap active={1} />
      {/* ritmo de compra (representación conceptual, sin datos) */}
      <div style={{position: "absolute", left: 96, top: 262, width: 1728, height: 150, background: C.grey, borderRadius: beesRadius(30), opacity: ap(frame, 8, 14)}} />
      <div style={{position: "absolute", left: 130, top: 290, width: 340, opacity: ap(frame, 10, 14)}}>
        <div style={{...h1(36), lineHeight: 1.05}}>{t.rhythmLabel}</div>
        <div style={{...body(22, 500), color: C.ink60, marginTop: 8}}>{t.rhythmNote}</div>
      </div>
      {Array.from({length: 14}).map((_, i) => {
        const kind = i < 6 ? "buy" : i < 10 ? "miss" : "back";
        const at = kind === "buy" ? 14 + i * 4 : kind === "miss" ? c(43.3) + (i - 6) * 4 : backAt + (i - 10) * 5;
        const alert = kind === "miss" && frame >= detectAt;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: dotX(i) - 19,
              top: 352 - 19,
              width: 38,
              height: 38,
              borderRadius: 19,
              boxSizing: "border-box",
              background: kind === "buy" ? C.black : kind === "back" ? C.yellow : alert ? C.red : "transparent",
              border: kind === "miss" && !alert ? `4px dashed ${C.ink60}` : `4px solid ${C.black}`,
              ...pop(frame, at, 10),
            }}
          />
        );
      })}
      <div style={{position: "absolute", left: dotX(6) - 30, top: 276, ...pop(frame, detectAt)}}>
        <Tag bg={C.red} color={C.black}>{t.alert}</Tag>
      </div>
      <div style={{position: "absolute", left: dotX(10) - 30, top: 276, ...pop(frame, backAt)}}>
        <Tag>{t.back}</Tag>
      </div>
      <StepLine steps={t.steps} cues={[c(42.8), c(48.2), c(54.0)]} y={556} cardW={520} cardH={244} titleSize={46} textSize={29} />
    </Scene>
  );
};
