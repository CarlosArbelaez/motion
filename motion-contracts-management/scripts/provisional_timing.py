"""Tiempos PROVISIONALES (estimados por texto) mientras no exista la locución real.
Escribe src/data/timing.json con "provisional": true. Con la voz real, usar build_timing.py.
"""
import json, os
root = os.path.join(os.path.dirname(__file__), "..")
script = json.load(open(os.path.join(root, "src/data/script.json")))
out = []
for sc in script["scenes"]:
    t = 0.0
    words = []
    for w in sc["vo"].split():
        d = 0.075 + 0.039 * len(w.strip(".,:;"))  # calibrado con la voz anterior (~0,36 s por palabra)
        words.append({"w": w, "s": round(t, 3), "e": round(t + d, 3)})
        t += d + 0.045
        if w[-1] in ".:;": t += 0.38
        elif w[-1] == ",": t += 0.17
    out.append({"id": sc["id"], "title": sc["title"], "dur": round(words[-1]["e"] + 0.1, 3), "words": words})
json.dump({"provisional": True, "scenes": out}, open(os.path.join(root, "src/data/timing.json"), "w"), ensure_ascii=False, indent=0)
print("total voz estimada:", round(sum(s["dur"] for s in out), 1), "s")
