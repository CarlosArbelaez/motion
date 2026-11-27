import React from "react";
import { Composition, Folder } from "remotion";
import { ContractsVideo } from "./Video";
import { FPS, TOTAL_FRAMES } from "./lib/timing";
import { filmstripOf } from "./motion";
import { MotionProGallery } from "./motion/Gallery";

const Review = filmstripOf(ContractsVideo);

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
      <Folder name="Review">
        <Composition id="ContractsManagement-review" component={Review} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} defaultProps={{ showCaptions: true }} />
      </Folder>
      <MotionProGallery />
    </>
  );
};
