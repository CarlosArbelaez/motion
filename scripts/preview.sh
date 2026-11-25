#!/usr/bin/env bash
# Vista previa en baja resolución (540x960). Uso: scripts/preview.sh <salida.mp4> [desde-hasta en fotogramas]
set -euo pipefail
cd "$(dirname "$0")/.."
BROWSER="${REMOTION_BROWSER:-$(ls /opt/pw-browsers/chromium-*/chrome-linux64/chrome 2>/dev/null | head -1)}"
OUT="${1:?salida}"
RANGO="${2:-}"
npx remotion render Pulso "$OUT" --scale=0.5 ${RANGO:+--frames="$RANGO"} ${BROWSER:+--browser-executable="$BROWSER"} --log=error
