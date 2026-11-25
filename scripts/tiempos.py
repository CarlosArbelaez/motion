#!/usr/bin/env python3
"""Calcula la línea de tiempo a partir de la duración real de cada audio.
Escribe data/tiempos.json (lo leen las escenas) y review/subtitulos.srt.
Los momentos en que entra cada bloque (nombre, problema, solución, impacto) se
toman de las pausas reales de la voz, no de una estimación."""
import json, subprocess, os, re
R = os.path.join(os.path.dirname(__file__), "..")
FPS = 30
TEMPO = float(os.environ.get("TEMPO", "1.18"))
g = json.load(open(f"{R}/data/guion.json"))

def dur(path):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]))

def silencios(path):
    o = subprocess.run(["ffmpeg", "-hide_banner", "-i", path, "-af", "silencedetect=noise=-38dB:d=0.1", "-f", "null", "-"], capture_output=True, text=True).stderr
    ini = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", o)]
    fin = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", o)]
    return list(zip(ini, fin))

def a_procesado(t, sil):
    """Tiempo del audio original -> tiempo del audio procesado (pausas recortadas + tempo)."""
    quitado = sum(max(0, min(f, t) - i - 0.22) for i, f in sil if i < t and f - i > 0.22)
    return (t - quitado) / TEMPO

def partir(texto, modo):
    # "tarjeta": puesto | nombre | problema | "Solución:" | solución | con IA
    patron = r"(?<=[.:])\s+" if modo in ("todo", "tarjeta") else r"(?<=\.)\s+"
    return [f.strip() for f in re.split(patron, texto) if f.strip()]

def inicios(audio, segs, total):
    """Inicio (s, en el audio procesado) de cada segmento, usando las pausas más largas de la voz."""
    orig = f"{R}/public/voz/original/{audio}.mp3"
    sil = [s for s in silencios(orig) if s[0] > 0.2 and s[1] < dur(orig) - 0.15]
    n = len(segs) - 1
    largas = [z for z in sil if z[1] - z[0] >= 0.2]  # las pausas de coma son más cortas
    cand = largas if len(largas) >= n else sil
    if len(cand) >= n:
        # Se elige el conjunto ordenado de pausas reales que mejor calza con las fronteras
        # esperadas por longitud del texto (las pausas largas pesan a favor).
        import itertools
        d0, acc, esperados = dur(orig), 0, []
        for seg in segs[:-1]:
            acc += len(seg)
            esperados.append(d0 * acc / sum(len(x) for x in segs))
        def costo(combo):
            return sum((((z[0] + z[1]) / 2 - e) ** 2) - 1.5 * (z[1] - z[0]) for z, e in zip(combo, esperados))
        cortes = min(itertools.combinations(cand, n), key=costo)
        return [0.0] + [a_procesado(f, sil) for _, f in cortes], True
    pesos, acc, out = [len(s) for s in segs], 0, []
    for p in pesos:
        out.append(total * acc / sum(pesos)); acc += p
    return out, False

# (id, tipo, sección, audio, texto, modo, entrada antes de la voz, salida después) · sin audio: duración fija
plan = [
    ("gancho", "gancho", 0, "01-gancho", g["gancho"]["voz"], "puntos", 0.15, 0.15),
    ("cortina1", "cortina", 1, None, None, None, 1.0, 0),
    ("numeros0", "numeros", 1, "02a-iniciativas", g["numeros"]["items"][0]["voz"], "puntos", 0.15, 0.25),
    ("numeros1", "numeros", 1, "02b-agentes", g["numeros"]["items"][1]["voz"], "puntos", 0.15, 0.2),
    ("numeros2", "numeros", 1, "02c-paises", g["numeros"]["items"][2]["voz"], "puntos", 0.15, 0.35),
    ("ranking", "ranking", 2, "03-ranking", g["ranking"]["voz"], "puntos", 0.2, 0.2),
    ("top0", "top", 2, "03a-top5", g["top"][0]["voz"], "tarjeta", 0.15, 0.3),
    ("top1", "top", 2, "03b-top4", g["top"][1]["voz"], "tarjeta", 0.15, 0.3),
    ("top2", "top", 2, "03c-top3", g["top"][2]["voz"], "tarjeta", 0.15, 0.3),
    ("top3", "top", 2, "03d-top2", g["top"][3]["voz"], "tarjeta", 0.15, 0.3),
    ("ademas", "ademas", 2, "03e-ademas", g["ademas"]["voz"], "puntos", 0.15, 0.45),
    ("numeroUno", "numeroUno", 2, "04-numero-uno", g["numeroUno"]["voz"], "tarjeta", 0.6, 0.5),
    ("cortina3", "cortina", 3, None, None, None, 1.0, 0),
    ("areas", "areas", 3, "05-areas", g["areas"]["voz"], "todo", 0.15, 0.5),
    ("cortina4", "cortina", 4, None, None, None, 1.0, 0),
    ("cierre", "cierre", 4, "06-cierre", g["cierre"]["voz"], "todo", 0.15, 0.7),
]

def cues_de(segs, ini_f, fin_f, modo):
    """Subtítulos: une el puesto con el nombre y parte las frases largas en dos."""
    piezas = list(zip(segs, ini_f, ini_f[1:] + [fin_f]))
    if modo == "tarjeta":
        (a, i0, _), (b, _, f1) = piezas[0], piezas[1]
        piezas = [(f"{a} {b}", i0, f1)] + piezas[2:]
    out = []
    for txt, i, f in piezas:
        seps = [m.end() for m in re.finditer(r"[,:] ", txt) if m.end() >= 22 and len(txt) - m.end() >= 22]
        if len(txt) > 62 and seps:
            c = min(seps, key=lambda s: abs(s - len(txt) / 2))
            m = i + round((f - i) * c / len(txt))
            out += [{"texto": txt[:c].strip(), "desde": i, "hasta": m}, {"texto": txt[c:].strip(), "desde": m, "hasta": f}]
        else:
            out.append({"texto": txt, "desde": i, "hasta": f})
    return out

escenas, t, sin_pausas = [], 0.0, []
for sid, tipo, sec, audio, texto, modo, pre, post in plan:
    ini = round(t * FPS)
    if audio is None:
        fin = round((t + pre) * FPS)
        escenas.append({"id": sid, "tipo": tipo, "seccion": sec, "desde": ini, "duracion": fin - ini, "audio": None, "vozDesde": ini, "vozDuracion": 0, "momentos": [], "subtitulos": []})
        t = fin / FPS
        continue
    d = dur(f"{R}/public/voz/{audio}.mp3")
    segs = partir(texto, modo)
    ini_s, ok = inicios(audio, segs, d)
    if modo == "tarjeta":  # une cada rótulo con su frase: quedan puesto, nombre, problema, solución, impacto
        assert len(segs) == 6, (sid, segs)  # puesto | nombre | problema | "Solución:" | solución | con IA
        segs = segs[:3] + [f"{segs[3]} {segs[4]}", segs[5]]
        ini_s = ini_s[:4] + [ini_s[5]]
    if not ok: sin_pausas.append(sid)
    voz_ini = round((t + pre) * FPS)
    fin = round((t + pre + d + post) * FPS)
    ini_f = [voz_ini + round(s * FPS) for s in ini_s]
    escenas.append({"id": sid, "tipo": tipo, "seccion": sec, "desde": ini, "duracion": fin - ini, "audio": f"voz/{audio}.mp3", "vozDesde": voz_ini, "vozDuracion": round(d * FPS),
                    "momentos": [f - ini for f in ini_f], "subtitulos": cues_de(segs, ini_f, min(fin, voz_ini + round(d * FPS) + 6), modo)})
    t = fin / FPS
total = escenas[-1]["desde"] + escenas[-1]["duracion"]
json.dump({"fps": FPS, "total": total, "escenas": escenas}, open(f"{R}/data/tiempos.json", "w"), ensure_ascii=False, indent=1)

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
print(f"{'escena':10} {'inicia':>7} {'dura':>6}  momentos (s dentro de la escena)")
for e in escenas:
    print(f"{e['id']:10} {e['desde']/FPS:7.2f} {e['duracion']/FPS:6.2f}  {[round(m/FPS,1) for m in e['momentos']]}")
print(f"TOTAL: {total/FPS:.2f} s ({total} fotogramas)")
if sin_pausas: print("⚠️ momentos estimados (sin pausas suficientes):", sin_pausas)
