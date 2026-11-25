import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { fonts } from "./theme";

await Promise.all([
  loadFont({ family: fonts.titular, url: staticFile("fonts/Avantt-SemiBold.ttf"), weight: "600" }),
  loadFont({ family: fonts.apoyo, url: staticFile("fonts/Satoshi-Regular.otf"), weight: "400" }),
]);
