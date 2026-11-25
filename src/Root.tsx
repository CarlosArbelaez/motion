import "./fonts";
import React from "react";
import { Still } from "remotion";
import { guion } from "./guion";
import { Escena1Gancho } from "./scenes/Escena1Gancho";
import { Escena2Numeros } from "./scenes/Escena2Numeros";
import { Escena3Top } from "./scenes/Escena3Top";
import { Escena4NumeroUno } from "./scenes/Escena4NumeroUno";
import { Escena5Gracias } from "./scenes/Escena5Gracias";
import { Escena6Cierre } from "./scenes/Escena6Cierre";
import { HojaEstilo } from "./scenes/HojaEstilo";

const V = { width: 1080, height: 1920 };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still id="Frame1-Gancho" component={Escena1Gancho} {...V} />
      <Still id="Frame2-Numeros" component={Escena2Numeros} defaultProps={{ indice: 1 }} {...V} />
      <Still id="Frame3-Top" component={Escena3Top} defaultProps={{ item: guion.top[2] }} {...V} />
      <Still id="Frame3b-Top2" component={Escena3Top} defaultProps={{ item: guion.top[3] }} {...V} />
      <Still id="Frame4-NumeroUno" component={Escena4NumeroUno} {...V} />
      <Still id="Frame5-Gracias" component={Escena5Gracias} {...V} />
      <Still id="Frame6-Cierre" component={Escena6Cierre} {...V} />
      <Still id="Frame3-Guias" component={Escena3Top} defaultProps={{ item: guion.top[2], guias: true }} {...V} />
      <Still id="HojaEstilo" component={HojaEstilo} width={1920} height={1080} />
    </>
  );
};
