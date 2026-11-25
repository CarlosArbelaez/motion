#!/usr/bin/env bash
# Procesa los audios originales de ElevenLabs (public/voz/original) -> public/voz
# - acorta a 0,32 s las pausas largas entre frases
# - acelera sin cambiar el tono (ritmo más dinámico)
# - iguala el volumen (a -17,5 LUFS; Carlos pidió bajarlo un poco desde -16)
set -euo pipefail
cd "$(dirname "$0")/../public/voz"
TEMPO="${TEMPO:-1.08}"
for f in original/0*.mp3; do
  n=$(basename "$f")
  ffmpeg -hide_banner -loglevel error -y -i "$f" -af "silenceremove=stop_periods=-1:stop_duration=0.32:stop_threshold=-38dB:stop_silence=0.32,atempo=${TEMPO},loudnorm=I=-17.5:TP=-1.5:LRA=11" -ar 44100 -b:a 192k "$n"
done
