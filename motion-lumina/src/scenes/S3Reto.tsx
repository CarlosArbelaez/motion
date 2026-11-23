import React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {Highlight, Icon, Scene} from "../components/ui";
import {content} from "../data/content";
import {ap, beesRadius, C, f, h1, HEAD, pop} from "../theme";

export const S3Reto: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const frame = useCurrentFrame();
  const c = (s: number) => f(s) - start;
  const t = content.s3;
  const xs = [250, 723, 1197, 1670];
  const y = 500;
  // la ficha del cliente llega a cada momento cuando la locución lo nombra
  const arrive = [14, c(19.1), c(20.5), c(22.3)];
  const tokenX = interpolate(frame, [14, c(17.3), arrive[1], c(19.9), arrive[2], c(21.7), arrive[3]], [xs[0], xs[0], xs[1], xs[1], xs[2], xs[2], xs[3]], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const frontsAt = c(23.3);
  return (
    <Scene
      duration={duration}
      kicker={t.kicker}
      title={
        <>
          {t.pre} <Highlight at={c(16.2)}>{t.highlight}</Highlight>
        </>
      }
    >
      <div style={{position: "absolute", left: xs[0], top: y - 3, width: (xs[3] - xs[0]) * ap(frame, 8, 24), height: 6, background: C.grey, borderRadius: 3}} />
      <div style={{position: "absolute", left: xs[0], top: y - 3, width: tokenX - xs[0], height: 6, background: C.black, borderRadius: 3}} />
      {t.nodes.map((n, i) => {
        const on = frame >= arrive[i];
        return (
          <React.Fragment key={n}>
            <div
              style={{
                position: "absolute",
                left: xs[i] - 24,
                top: y - 24,
                width: 48,
                height: 48,
                borderRadius: 24,
                boxSizing: "border-box",
                border: `5px solid ${C.black}`,
                background: on ? C.yellow : C.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: ap(frame, 10 + i * 4, 12),
              }}
            >
              {on && i > 0 ? <Icon name="check" size={28} /> : null}
            </div>
            <div
              style={{
                position: "absolute",
                left: xs[i] - 200,
                top: y + 44,
                width: 400,
                textAlign: "center",
                fontFamily: HEAD,
                fontWeight: 600,
                fontSize: 46,
                lineHeight: 1.05,
                transformOrigin: "top center",
                ...pop(frame, arrive[i]),
              }}
            >
              {n}
            </div>
          </React.Fragment>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: tokenX - 48,
          top: y - 134,
          width: 96,
          height: 96,
          borderRadius: 48,
          boxSizing: "border-box",
          background: C.yellow,
          border: `5px solid ${C.black}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: String(ap(frame, 10, 14)),
        }}
      >
        <Icon name="store" size={54} />
      </div>
      <div style={{position: "absolute", left: tokenX - 3, top: y - 38, width: 6, height: 16, background: C.black, opacity: ap(frame, 14, 10)}} />
      {/* dos frentes */}
      {t.fronts.map((fr, i) => {
        const left = i === 0 ? 150 : 990;
        const p = ap(frame, frontsAt + i * 8, 18);
        return (
          <div key={fr} style={{position: "absolute", left, top: 680, width: 780, opacity: p}}>
            <div style={{height: 24, borderLeft: `6px solid ${C.black}`, borderRight: `6px solid ${C.black}`, borderBottom: `6px solid ${C.black}`, boxSizing: "border-box", transformOrigin: "left center", scale: `${p} 1`}} />
            <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
              <div style={{...h1(44), background: C.black, color: C.yellow, padding: "8px 30px 12px", borderRadius: beesRadius(22)}}>{fr}</div>
            </div>
          </div>
        );
      })}
    </Scene>
  );
};
