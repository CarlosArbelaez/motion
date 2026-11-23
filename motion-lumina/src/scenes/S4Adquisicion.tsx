import React from "react";
import {FrontMap, StepLine} from "../components/StepLine";
import {Highlight, Scene} from "../components/ui";
import {content} from "../data/content";
import {f} from "../theme";

export const S4Adquisicion: React.FC<{start: number; duration: number}> = ({start, duration}) => {
  const c = (s: number) => f(s) - start;
  const t = content.s4;
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
      <FrontMap active={0} />
      <StepLine steps={t.steps} cues={[c(26.9), c(28.8), c(32.9), c(36.5), c(38.8)]} y={480} cardW={322} cardH={262} titleSize={40} textSize={27} />
    </Scene>
  );
};
