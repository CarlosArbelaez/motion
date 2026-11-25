#!/usr/bin/env python3
"""Calcula la línea de tiempo a partir de la duración real de cada audio.
Escribe data/tiempos.json (lo leen las escenas) y review/subtitulos.srt."""
import json, subprocess, os, re
R = os.path.join(os.path.dirname(__file__), "..")
FPS, TOTAL = 30, 1800
g = json.load(open(f"{R}/data/guion.json"))

def dur(n):
    o = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"{R}/public/voz/{n}.mp3"])
    return float(o)

# (id, audio, texto, entrada en s antes de la voz, salida en s después)
plan = [
    ("gancho", "01-gancho", g["gancho"]["voz"], 0.15, 0.10),
    ("numeros0", "02a-iniciativas", g["numeros"]["items"][0]["voz"], 0.15, 0.20),
    ("numeros1", "02b-agentes", g["numeros"]["items"][1]["voz"], 0.15, 0.15),
    ("numeros2", "02c-paises", g["numeros"]["items"][2]["voz"], 0.15, 0.20),
    ("ranking", "03-ranking", g["ranking"]["voz"], 0.15, 0.10),
    ("top0", "03a-top5", g["top"][0]["voz"], 0.12, 0.10),
    ("top1", "03b-top4", g["top"][1]["voz"], 0.12, 0.10),
    ("top2", "03c-top3", g["top"][2]["voz"], 0.12, 0.10),
    ("top3", "03d-top2", g["top"][3]["voz"], 0.12, 0.10),
    ("ademas", "03e-ademas", g["ademas"]["voz"], 0.15, 0.30),
    ("numeroUno", "04-numero-uno", g["numeroUno"]["vozCorta"], 0.70, 0.40),
    ("gracias", "05-gracias", g["gracias"]["voz"], 0.10, 0.05),
    ("cierre", "06-cierre", g["cierre"]["voz"], 0.05, None),
]
escenas, t = [], 0
for i, (sid, audio, texto, pre, post) in enumerate(plan):
    d = dur(audio)
    ini = round(t * FPS)
    voz_ini = round((t + pre) * FPS)
    voz_dur = round(d * FPS)
    fin = TOTAL if post is None else round((t + pre + d + post) * FPS)
    # Subtítulos: una frase por entrada, repartidas según su longitud
    frases = [f.strip() for f in re.split(r"(?<=[.:])\s+", texto) if f.strip()]
    pesos = [len(f) for f in frases]
    cues, c = [], voz_ini
    for f, p in zip(frases, pesos):
        n = round(voz_dur * p / sum(pesos))
        cues.append({"texto": f, "desde": c, "hasta": c + n})
        c += n
    cues[-1]["hasta"] = min(fin, voz_ini + voz_dur + 6)
    escenas.append({"id": sid, "audio": f"voz/{audio}.mp3", "desde": ini, "duracion": fin - ini, "vozDesde": voz_ini, "vozDuracion": voz_dur, "subtitulos": cues})
    t = fin / FPS
assert escenas[-1]["desde"] + escenas[-1]["duracion"] == TOTAL
sobra = (TOTAL - (escenas[-1]["vozDesde"] + escenas[-1]["vozDuracion"])) / FPS
assert sobra >= 0.2, f"La voz se pasa de 60 s (sobra {sobra:.2f})"
json.dump({"fps": FPS, "total": TOTAL, "escenas": escenas}, open(f"{R}/data/tiempos.json", "w"), ensure_ascii=False, indent=1)

def tc(f):
    ms = round(f * 1000 / FPS); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
os.makedirs(f"{R}/review", exist_ok=True)
n = 0
with open(f"{R}/review/subtitulos.srt", "w") as srt:
    for e in escenas:
        for c in e["subtitulos"]:
            n += 1
            srt.write(f"{n}\n{tc(c['desde'])} --> {tc(c['hasta'])}\n{c['texto']}\n\n")
print(f"{'escena':10} {'inicia':>7} {'dura':>6} {'voz':>6}")
for e in escenas:
    print(f"{e['id']:10} {e['desde']/FPS:7.2f} {e['duracion']/FPS:6.2f} {e['vozDuracion']/FPS:6.2f}")
print(f"aire al final: {sobra:.2f} s")
