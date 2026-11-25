import React from "react";
import { AbsoluteFill, Composition, Folder, Loop, Sequence, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { z } from "zod";
import {
  Burst, Counter, DrawUnderline, glitch, LowerThird, Motion, Notification, PRESET_NAMES, proTiming, shapeWipe,
  spinZoom, SplitText, SubscribeButton, TrackingIn, Typewriter, whipPan, zoomThrough,
} from "./index";
import { ExtraCompositions } from "./GalleryExtras";

const BG = "#0e0f13";
const FONT = "Helvetica, Arial, sans-serif";

// Controles que aparecen en la barra lateral de Remotion Studio
export const gallerySchema = z.object({
  speed: z.number().min(0.4).max(2.5).step(0.1),
  distance: z.number().min(10).max(300).step(10),
  holdSeconds: z.number().min(1).max(5).step(0.5),
});
type GalleryProps = z.infer<typeof gallerySchema>;
const defaults: GalleryProps = { speed: 1, distance: 60, holdSeconds: 2.5 };

const Cell: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ position: "relative", background: "#181a21", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
    {children}
    <div style={{ position: "absolute", left: 16, bottom: 12, fontSize: 22, color: "#8b90a0", fontFamily: "monospace" }}>{label}</div>
  </div>
);

const Presets: React.FC<GalleryProps> = ({ speed, distance, holdSeconds }) => {
  const { fps } = useVideoConfig();
  const cycle = Math.round(holdSeconds * fps);
  return (
    <AbsoluteFill style={{ background: BG, padding: 40, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: 24, fontFamily: FONT }}>
      {PRESET_NAMES.map((name) => (
        <Cell key={name} label={name}>
          <Loop durationInFrames={cycle} layout="none">
            <Motion preset={name} distance={distance} inDur={0.6 / speed} outDur={0.35 / speed}>
              <div style={{ width: 150, height: 150, borderRadius: 28, background: "linear-gradient(135deg,#ffd400,#ff5a36)" }} />
            </Motion>
          </Loop>
        </Cell>
      ))}
    </AbsoluteFill>
  );
};

const Text: React.FC = () => (
  <AbsoluteFill style={{ background: BG, padding: 40, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: 24, fontFamily: FONT, color: "#fff", fontSize: 54, fontWeight: 800 }}>
    <Cell label='SplitText by="line" preset="mask"'><SplitText by="line" preset="mask" text={"Títulos que\nsuben limpios"} exit={false} style={{ textAlign: "center" }} /></Cell>
    <Cell label='SplitText by="letter" preset="slide"'><SplitText by="letter" preset="slide" distance={40} text="Letras en cascada" exit={false} /></Cell>
    <Cell label='SplitText by="word" preset="pop"'><SplitText by="word" preset="pop" text="Palabras con rebote" exit={false} /></Cell>
    <Cell label='SplitText by="word" preset="blurIn"'><SplitText by="word" preset="blurIn" stagger={5} text="Enfoque suave" exit={false} /></Cell>
    <Cell label="TrackingIn"><TrackingIn>CINEMÁTICO</TrackingIn></Cell>
    <Cell label="Typewriter"><Typewriter text="Escribiendo en vivo..." /></Cell>
    <Cell label="Counter"><Counter to={128450} prefix="$" /></Cell>
    <Cell label="DrawUnderline"><DrawUnderline color="#ffd400">Lo importante</DrawUnderline></Cell>
  </AbsoluteFill>
);

const Scene: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <AbsoluteFill style={{ background: color, alignItems: "center", justifyContent: "center", fontFamily: FONT, fontSize: 110, fontWeight: 900, color: "#fff" }}>
    {label}
  </AbsoluteFill>
);

const SCENE = 45;
const TRANS = 18;
const transitions = [
  ["zoomThrough", zoomThrough()], ["whipPan", whipPan()], ["spinZoom", spinZoom()], ["glitch", glitch()], ["shapeWipe", shapeWipe({ color: "#ffd400" })],
] as const;
const COLORS = ["#2b59ff", "#e5383b", "#0a9396", "#7b2cbf", "#f77f00", "#2d6a4f"];
const TRANSITIONS_DURATION = SCENE * (transitions.length + 1) - TRANS * transitions.length;

const Transitions: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={SCENE}><Scene color={COLORS[0]} label="inicio" /></TransitionSeries.Sequence>
    {transitions.map(([name, presentation], i) => (
      <React.Fragment key={name}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TransitionSeries.Transition presentation={presentation as any} timing={proTiming(TRANS)} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><Scene color={COLORS[i + 1]} label={name} /></TransitionSeries.Sequence>
      </React.Fragment>
    ))}
  </TransitionSeries>
);

const Social: React.FC = () => (
  <AbsoluteFill style={{ background: BG, fontFamily: FONT, alignItems: "center", justifyContent: "space-evenly" }}>
    <div style={{ height: 160 }}><Sequence durationInFrames={90} layout="none"><Notification title="Nuevo mensaje" body="¡Ya salió el video!" /></Sequence></div>
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SubscribeButton clickAt={1.2} />
      <div style={{ position: "absolute" }}><Burst at={1.2} size={420} /></div>
    </div>
    <div style={{ height: 120, width: 700 }}><Sequence durationInFrames={110} layout="none"><LowerThird name="Nombre Apellido" role="Motion Designer" /></Sequence></div>
  </AbsoluteFill>
);

/** Añade <MotionProGallery /> dentro de RemotionRoot para ver todo en Remotion Studio. */
export const MotionProGallery: React.FC = () => (
  <Folder name="MotionPro">
    <Composition id="MP-Presets" component={Presets} schema={gallerySchema} defaultProps={defaults} durationInFrames={300} fps={30} width={1920} height={1080} />
    <Composition id="MP-Text" component={Text} durationInFrames={120} fps={30} width={1920} height={1080} />
    <Composition id="MP-Transitions" component={Transitions} durationInFrames={TRANSITIONS_DURATION} fps={30} width={1920} height={1080} />
    <Composition id="MP-Social" component={Social} durationInFrames={120} fps={30} width={1080} height={1920} />
    <ExtraCompositions />
  </Folder>
);
