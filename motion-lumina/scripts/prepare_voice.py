"""Prepara la locución: aplica un tempo leve (sin cambiar el tono) y reescala las marcas por palabra.

Uso: python3 scripts/prepare_voice.py [tempo]
Entrada: docs/voz/valeria-original.mp3 y docs/voz/valeria-words-original.json (marcas de ElevenLabs Scribe)
Salida:  public/assets/audio/voiceover.mp3 y src/data/words.json
"""
import json
import subprocess
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
tempo = float(sys.argv[1]) if len(sys.argv) > 1 else 1.08
src = root / "docs/voz/valeria-original.mp3"
out = root / "public/assets/audio/voiceover.mp3"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-af", f"atempo={tempo}", "-b:a", "192k", str(out)], check=True)
words = json.loads((root / "docs/voz/valeria-words-original.json").read_text())["words"]
scaled = [{"text": w["text"], "start": round(w["start"] / tempo, 3), "end": round(w["end"] / tempo, 3)} for w in words if w.get("type", "word") == "word"]
(root / "src/data/words.json").write_text(json.dumps(scaled, ensure_ascii=False, indent=0))
print("tempo", tempo, "| palabras", len(scaled), "| fin de voz", scaled[-1]["end"], "s")
