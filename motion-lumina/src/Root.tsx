import {Composition} from "remotion";
import {FPS, H, TOTAL_FRAMES, W} from "./theme";
import {LuminaVideo} from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Lumina"
      component={LuminaVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={W}
      height={H}
      defaultProps={{subtitles: true, audio: true}}
    />
  );
};
