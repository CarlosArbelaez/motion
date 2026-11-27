import "./fonts";
import React from "react";
import { Still, Composition, Sequence } from "remotion";
import { Pulso, TOTAL, FPS } from "./Pulso";
import { MotionProGallery } from "./motion/Gallery";
import { filmstripOf } from "./motion";
import { Pill, FPS_PILL, totalDe } from "./pulse/Pill";
import { guion } from "./guion";
import { Escena1Gancho } from "./scenes/Escena1Gancho";
import { Escena2Numeros } from "./scenes/Escena2Numeros";
import { Escena3Top } from "./scenes/Escena3Top";
import { Escena4NumeroUno } from "./scenes/Escena4NumeroUno";
import { Escena5Areas } from "./scenes/Escena5Areas";
import { EscenaCortina } from "./scenes/EscenaCortina";
import { EscenaRanking } from "./scenes/EscenaRanking";
import { Escena6Cierre } from "./scenes/Escena6Cierre";
import { HojaEstilo } from "./scenes/HojaEstilo";

const V = { width: 1080, height: 1920 };

// Los style frames muestran cada escena en su fotograma más representativo.
const fijo = <P extends object>(C: React.FC<P>, frame: number): React.FC<P> => {
  const F: React.FC<P> = (props) => (
    <Sequence from={-frame}>
      <C {...props} />
    </Sequence>
  );
  return F;
};
const G1 = fijo(Escena1Gancho, 90);
const G2 = fijo(Escena2Numeros, 60);
const G3 = fijo(Escena3Top, 330);
const G4 = fijo(Escena4NumeroUno, 460);
const G5 = fijo(Escena5Areas, 170);
const GC = fijo(EscenaCortina, 25);
const GR = fijo(EscenaRanking, 100);
const G6 = fijo(Escena6Cierre, 150);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MotionProGallery />
      <Composition id="Pulso" component={Pulso} durationInFrames={TOTAL} fps={FPS} defaultProps={{ conVoz: true, conMusica: true }} {...V} />
      {/* Brew AI Pulse 2026: una composición por pill */}
      <Composition id="Pulse-MarketingRevenue" component={Pill} durationInFrames={totalDe("marketing-revenue")} fps={FPS_PILL} defaultProps={{ id: "marketing-revenue", conVoz: true, conMusica: true, conSubtitulos: true }} {...V} />
      <Composition id="Pulse-MarketingRevenue-review" component={filmstripOf(Pill)} durationInFrames={totalDe("marketing-revenue")} fps={FPS_PILL} defaultProps={{ id: "marketing-revenue", conVoz: false, conMusica: false, conSubtitulos: true }} {...V} />
      <Composition id="Pulso-review" component={filmstripOf(Pulso)} durationInFrames={TOTAL} fps={FPS} defaultProps={{ conVoz: false, conMusica: false }} {...V} />
      <Still id="Frame1-Gancho" component={G1} {...V} />
      <Still id="Frame2-Numeros" component={G2} defaultProps={{ indice: 1 }} {...V} />
      <Still id="Frame3-Top" component={G3} defaultProps={{ item: guion.top[2] }} {...V} />
      <Still id="Frame3b-Top2" component={G3} defaultProps={{ item: guion.top[3] }} {...V} />
      <Still id="Frame4-NumeroUno" component={G4} {...V} />
      <Still id="Frame5-Areas" component={G5} {...V} />
      <Still id="Frame0-Cortina" component={GC} defaultProps={{ seccion: 1 }} {...V} />
      <Still id="Frame0-Cortina3" component={GC} defaultProps={{ seccion: 3 }} {...V} />
      <Still id="Frame0-Cortina4" component={GC} defaultProps={{ seccion: 4 }} {...V} />
      <Still id="Frame0-Ranking" component={GR} {...V} />
      <Still id="Frame6-Cierre" component={G6} {...V} />
      <Still id="Frame3-Guias" component={G3} defaultProps={{ item: guion.top[2], guias: true }} {...V} />
      <Still id="HojaEstilo" component={HojaEstilo} width={1920} height={1080} />
    </>
  );
};
