"""Construye src/data/timing.json a partir de la transcripción con tiempos por palabra
(ElevenLabs Scribe) y del guion (src/data/script.json).

Uso:
  python3 scripts/build_timing.py <status.json>   # respuesta de la transcripción
  python3 scripts/build_timing.py                 # reutiliza docs/transcripcion_palabras.json
"""
import json, sys, os, subprocess

root = os.path.join(os.path.dirname(__file__), "..")
script = json.load(open(os.path.join(root, "src/data/script.json")))
raw_path = os.path.join(root, "docs/transcripcion_palabras.json")
if len(sys.argv) > 1:
    st = json.load(open(sys.argv[1]))
    raw = [
        [{"w": w["text"], "s": w["start"], "e": w["end"]} for w in t["words"] if w.get("type") == "word"]
        for t in st["transcripts"]
    ]
    json.dump(raw, open(raw_path, "w"), ensure_ascii=False)
raw = json.load(open(raw_path))
out = []
for sc, words in zip(script["scenes"], raw):
    toks = sc["vo"].split()
    wav = os.path.join(root, "public/assets/voice", sc["id"] + ".mp3")
    dur = float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav]))
    if len(toks) == len(words):
        for t, w in zip(toks, words):
            w["w"] = t  # ortografía del guion, tiempos de la voz real
        status = "guion"
    else:
        status = f"TRANSCRIPCION ({len(toks)} vs {len(words)})"
    print(sc["id"], round(dur, 2), len(words), status)
    out.append({
        "id": sc["id"], "title": sc["title"], "dur": round(dur, 3),
        "words": [{"w": w["w"], "s": round(w["s"], 3), "e": round(w["e"], 3)} for w in words],
    })
json.dump({"scenes": out}, open(os.path.join(root, "src/data/timing.json"), "w"), ensure_ascii=False, indent=0)
