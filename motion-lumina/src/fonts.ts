import {loadFont} from "@remotion/fonts";
import {staticFile} from "remotion";
import {BODY, HEAD} from "./theme";

const head = (w: string) =>
  loadFont({family: HEAD, weight: w, url: staticFile(`assets/fonts/barlow-semi-condensed-latin-${w}-normal.woff2`)});
const bodyF = (w: string) =>
  loadFont({family: BODY, weight: w, url: staticFile(`assets/fonts/work-sans-latin-${w}-normal.woff2`)});

export const fontsReady = Promise.all([head("500"), head("600"), head("700"), bodyF("400"), bodyF("500"), bodyF("600")]);
