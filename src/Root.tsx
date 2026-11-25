import "./fonts";
import React from "react";
import { Still, Composition, Freeze } from "remotion";
import { Pulso, TOTAL, FPS } from "./Pulso";
import { guion } from "./guion";
import { Escena1Gancho } from "./scenes/Escena1Gancho";
import { Escena2Numeros } from "./scenes/Escena2Numeros";
import { Escena3Top } from "./scenes/Escena3Top";
import { Escena4NumeroUno } from "./scenes/Escena4NumeroUno";
import { Escena5Gracias } from "./scenes/Escena5Gracias";
import { Escena6Cierre } from "./scenes/Escena6Cierre";
import { HojaEstilo } from "./scenes/HojaEstilo";

const V = { width: 1080, height: 1920 };

// Los style frames congelan cada escena en su fotograma más representativo.
const fijo = <P extends object>(C: React.FC<P>, frame: number): React.FC<P> => {
  const F: React.FC<P> = (props) => (
    <Freeze frame={frame}>
      <C {...props} />
    </Freeze>
  );
  return F;
};
const G1 = fijo(Escena1Gancho, 90);
const G2 = fijo(Escena2Numeros, 60);
const G3 = fijo(Escena3Top, 140);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Pulso" component={Pulso} durationInFrames={TOTAL} fps={FPS} defaultProps={{ conVoz: true }} {...V} />
      <Still id="Frame1-Gancho" component={G1} {...V} />
      <Still id="Frame2-Numeros" component={G2} defaultProps={{ indice: 1 }} {...V} />
      <Still id="Frame3-Top" component={G3} defaultProps={{ item: guion.top[2] }} {...V} />
      <Still id="Frame3b-Top2" component={G3} defaultProps={{ item: guion.top[3] }} {...V} />
      <Still id="Frame4-NumeroUno" component={Escena4NumeroUno} {...V} />
      <Still id="Frame5-Gracias" component={Escena5Gracias} {...V} />
      <Still id="Frame6-Cierre" component={Escena6Cierre} {...V} />
      <Still id="Frame3-Guias" component={G3} defaultProps={{ item: guion.top[2], guias: true }} {...V} />
      <Still id="HojaEstilo" component={HojaEstilo} width={1920} height={1080} />
    </>
  );
};
