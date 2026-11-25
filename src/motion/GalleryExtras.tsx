import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import {
  blend, BounceIn, EASE_X, StaggerFrom, useInertia, useProgress,
  BarChart, CameraPan, CardStack, Confetti, DrawPath, Highlight, LineChart, Marquee, MorphShape, Odometer, Parallax,
  ParallaxLayer, ProgressBar, RingProgress, ScrambleText, Tilt3D, WaveText,
} from "./index";

const BG = "#0e0f13";
const FONT = "Helvetica, Arial, sans-serif";

const Cell: React.FC<{ label: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ label, children, style }) => (
  <div style={{ position: "relative", background: "#181a21", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", ...style }}>
    {children}
    <div style={{ position: "absolute", left: 16, bottom: 12, fontSize: 22, fontWeight: 400, color: "#8b90a0", fontFamily: "monospace" }}>{label}</div>
  </div>
);
const grid = (cols: number, rows: number): React.CSSProperties => ({
  background: BG, padding: 40, display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: 24, fontFamily: FONT, color: "#fff", fontSize: 54, fontWeight: 800,
});
const Card: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div style={{ width: 300, height: 190, borderRadius: 24, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>{label}</div>
);

const Text2: React.FC = () => (
  <AbsoluteFill style={grid(2, 3)}>
    <Cell label="ScrambleText"><ScrambleText text="ACCESO CONCEDIDO" style={{ fontFamily: "monospace" }} /></Cell>
    <Cell label="WaveText"><WaveText text="Texto en ola" /></Cell>
    <Cell label="Odometer"><Odometer value="$1.284.500" /></Cell>
    <Cell label="Highlight"><span>Esto es <Highlight><span style={{ color: "#111" }}>clave</span></Highlight></span></Cell>
    <Cell label="Marquee" style={{ gridColumn: "1 / 3" }}>
      <Marquee secondsPerLoop={5}><span>NUEVO</span><span>★</span><span>OFERTA</span><span>★</span><span>HOY</span><span>★</span></Marquee>
    </Cell>
  </AbsoluteFill>
);

const Shapes: React.FC = () => (
  <AbsoluteFill style={grid(3, 1)}>
    <Cell label="DrawPath"><DrawPath d="M50 88 C 20 62, 4 42, 18 24 C 30 9, 46 16, 50 30 C 54 16, 70 9, 82 24 C 96 42, 80 62, 50 88 Z" stroke="#ff5a36" fill="#ff5a36" strokeWidth={3} width={320} height={320} /></Cell>
    <Cell label="MorphShape"><MorphShape /></Cell>
    <Cell label="Confetti">¡Listo!</Cell>
    <Confetti at={0.5} originX={84} originY={55} />
  </AbsoluteFill>
);

const Layout: React.FC = () => (
  <AbsoluteFill style={grid(2, 2)}>
    <Cell label="Parallax + ParallaxLayer">
      <Parallax travelX={-260}>
        <ParallaxLayer depth={0.2}><div style={{ position: "absolute", left: 200, top: 60, width: 420, height: 420, borderRadius: "50%", background: "#2b59ff", opacity: 0.5 }} /></ParallaxLayer>
        <ParallaxLayer depth={0.6}><div style={{ position: "absolute", left: 420, top: 160, width: 240, height: 240, borderRadius: 40, background: "#0a9396" }} /></ParallaxLayer>
        <ParallaxLayer depth={1.2}><div style={{ position: "absolute", left: 700, top: 240, width: 150, height: 150, borderRadius: 28, background: "#ffd400" }} /></ParallaxLayer>
      </Parallax>
    </Cell>
    <Cell label="CardStack"><CardStack cards={[<Card key="a" color="#e5383b" label="Uno" />, <Card key="b" color="#7b2cbf" label="Dos" />, <Card key="c" color="#0a9396" label="Tres" />]} interval={1.2} /></Cell>
    <Cell label="Tilt3D"><Tilt3D speed={0.5}><Card color="linear-gradient(135deg,#ffd400,#ff5a36)" label="Mockup" /></Tilt3D></Cell>
    <Cell label="CameraPan">
      <CameraPan keys={[{ at: 0, x: 300, y: 200, scale: 0.5 }, { at: 1.3, x: 150, y: 110, scale: 1.4 }, { at: 2.6, x: 460, y: 300, scale: 1.4 }, { at: 4, x: 300, y: 200, scale: 0.5 }]}>
        <div style={{ width: 600, height: 400, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 20, boxSizing: "border-box", background: "#22252e", borderRadius: 20, fontSize: 40 }}>
          {["A", "B", "C", "D"].map((l, i) => <div key={l} style={{ background: ["#e5383b", "#2b59ff", "#0a9396", "#f77f00"][i], borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{l}</div>)}
        </div>
      </CameraPan>
    </Cell>
  </AbsoluteFill>
);

const Data: React.FC = () => (
  <AbsoluteFill style={{ ...grid(2, 2), fontSize: 30, fontWeight: 500 }}>
    <Cell label="BarChart"><BarChart height={260} data={[{ label: "Ene", value: 120 }, { label: "Feb", value: 180 }, { label: "Mar", value: 150 }, { label: "Abr", value: 260, color: "#ff5a36" }]} /></Cell>
    <Cell label="LineChart"><LineChart width={620} height={260} points={[12, 18, 15, 26, 22, 34, 31, 44]} /></Cell>
    <Cell label="ProgressBar"><ProgressBar to={0.72} label="Meta del mes" /></Cell>
    <Cell label="RingProgress"><RingProgress to={0.86} /></Cell>
  </AbsoluteFill>
);

const Box: React.FC<{ size?: number; color?: string }> = ({ size = 110, color = "linear-gradient(135deg,#ffd400,#ff5a36)" }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.2, background: color }} />
);
const InertiaDemo: React.FC = () => {
  const x = useInertia({ delay: 0.3, velocity: 600, timeConstant: 400 });
  return <div style={{ translate: `${x - 240}px 0px` }}><Box /></div>;
};
const BlendDemo: React.FC = () => {
  const p = useProgress(0.2, 2.5, (t) => t);
  const color = blend([0, 0.5, 1], ["#2b59ff", "#ffd400", "#ff5a36"])(p);
  const shadow = blend([0, 1], ["0px 0px 0px rgba(0,0,0,0)", "0px 30px 60px rgba(0,0,0,0.6)"])(p);
  return <div style={{ width: 300, height: 150, borderRadius: 24, background: color, boxShadow: shadow }} />;
};
const SteppedDemo: React.FC = () => {
  const p = useProgress(0.2, 2, EASE_X.stepped(8));
  return <div style={{ translate: `${p * 400 - 200}px 0px`, rotate: `${p * 360}deg` }}><Box /></div>;
};

const Physics: React.FC = () => (
  <AbsoluteFill style={{ ...grid(3, 2), fontSize: 30 }}>
    <Cell label="BounceIn bounce 0 / 0.35 / 0.65">
      <div style={{ display: "flex", gap: 40 }}>
        <BounceIn bounce={0} delay={0.2}><Box /></BounceIn>
        <BounceIn bounce={0.35} delay={0.2}><Box /></BounceIn>
        <BounceIn bounce={0.65} delay={0.2}><Box /></BounceIn>
      </div>
    </Cell>
    <Cell label='BounceIn mode="up"'><BounceIn mode="up" bounce={0.5} delay={0.3} style={{ fontSize: 60 }}>¡Hola!</BounceIn></Cell>
    <Cell label="useInertia"><InertiaDemo /></Cell>
    <Cell label='StaggerFrom from="center" grid'>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 56px)", gap: 14 }}>
        <StaggerFrom preset="pop" from="center" grid={[5, 4]} gap={2} exit={false}>
          {Array.from({ length: 20 }).map((_, i) => <Box key={i} size={56} />)}
        </StaggerFrom>
      </div>
    </Cell>
    <Cell label="blend (color + sombra)"><BlendDemo /></Cell>
    <Cell label="EASE_X.stepped(8)"><SteppedDemo /></Cell>
  </AbsoluteFill>
);

/** Composiciones de la segunda tanda. Se renderizan dentro de <MotionProGallery />. */
export const ExtraCompositions: React.FC = () => (
  <>
    <Composition id="MP-Text2" component={Text2} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="MP-Shapes" component={Shapes} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="MP-Layout" component={Layout} durationInFrames={120} fps={30} width={1920} height={1080} />
    <Composition id="MP-Data" component={Data} durationInFrames={90} fps={30} width={1920} height={1080} />
    <Composition id="MP-Physics" component={Physics} durationInFrames={105} fps={30} width={1920} height={1080} />
  </>
);
