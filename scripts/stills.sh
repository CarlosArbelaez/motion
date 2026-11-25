#!/usr/bin/env bash
# Renderiza los style frames a review/stills/. Uso: scripts/stills.sh [ids...]
set -euo pipefail
cd "$(dirname "$0")/.."
BROWSER="${REMOTION_BROWSER:-$(ls /opt/pw-browsers/chromium-*/chrome-linux64/chrome 2>/dev/null | head -1)}"
IDS=("$@")
[ ${#IDS[@]} -eq 0 ] && IDS=(Frame1-Gancho Frame2-Numeros Frame3-Top Frame3b-Top2 Frame4-NumeroUno Frame5-Gracias Frame6-Cierre Frame3-Guias HojaEstilo)
npx remotion bundle --out-dir /tmp/pulso-bundle >/dev/null
for id in "${IDS[@]}"; do
  npx remotion still /tmp/pulso-bundle "$id" "review/stills/$id.png" ${BROWSER:+--browser-executable="$BROWSER"} --log=error
  echo "ok $id"
done
