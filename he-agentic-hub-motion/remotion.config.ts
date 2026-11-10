/**
 * Configuración de Remotion para HE Agentic Hub.
 * Los recursos (fuentes, audio) viven en ./assets en lugar de ./public.
 */
import { Config } from "@remotion/cli/config";
import { existsSync } from "fs";

// En este entorno en la nube se usa el Chrome Headless Shell preinstalado (sin descarga).
const localShell =
  "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (existsSync(localShell)) {
  Config.setBrowserExecutable(localShell);
}

Config.setPublicDir("./assets");
Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709");
