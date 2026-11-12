/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("png"); // rango de color estándar (yuv420p)
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// En entornos sin acceso a remotion.media (donde Remotion descarga su navegador),
// indique un Chrome Headless Shell local:  REMOTION_BROWSER=/ruta/chrome-headless-shell npx remotion render ...
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
