import React from "react";
import { Composition } from "remotion";
import { HEAgenticHub } from "./HEAgenticHub";
import "./brand";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HEAgenticHub"
      component={HEAgenticHub}
      durationInFrames={2134}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
