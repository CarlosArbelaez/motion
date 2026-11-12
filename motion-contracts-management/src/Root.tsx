import React from "react";
import { Composition } from "remotion";
import { ContractsVideo } from "./Video";
import { FPS, TOTAL_FRAMES } from "./lib/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ContractsManagement"
        component={ContractsVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ showCaptions: true }}
      />
    </>
  );
};
