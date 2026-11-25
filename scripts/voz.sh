#!/usr/bin/env bash
# Procesa los audios originales de ElevenLabs (public/voz/original) -> public/voz
# - acelera 10 % sin cambiar el tono (ritmo más dinámico y cabe en 60 s)
# - iguala el volumen
# - en la #1 corta la última frase (el dato queda en pantalla)
set -euo pipefail
cd "$(dirname "$0")/../public/voz"
TEMPO="${TEMPO:-1.10}"
for f in original/0*.mp3; do
  n=$(basename "$f")
  PRE=""
  [ "$n" = "04-numero-uno.mp3" ] && PRE="atrim=0:8.42,afade=t=out:st=8.34:d=0.08,"
  ffmpeg -hide_banner -loglevel error -y -i "$f" -af "${PRE}atempo=${TEMPO},loudnorm=I=-16:TP=-1.5:LRA=11" -ar 44100 -b:a 192k "$n"
done
