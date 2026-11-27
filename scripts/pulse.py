#!/usr/bin/env python3
"""Prepara una pill de Brew AI Pulse: procesa la voz y calcula la línea de tiempo.
Uso: python3 scripts/pulse.py <id>   (lee data/pulse/<id>.json y public/voz/pulse/<id>/original/*.mp3)
Escribe public/voz/pulse/<id>/*.mp3, data/pulse/<id>.tiempos.json y review/pulse-<id>.srt."""
import json, subprocess, os, re, sys, itertools
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
PID = sys.argv[1]
FPS, TEMPO, PAUSA = 30, float(os.environ.get("TEMPO", "1.08")), 0.32
g = json.load(open(f"{R}/data/pulse/{PID}.json"))
VOZ = f"{R}/public/voz/pulse/{PID}"

def dur(p): return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]))
def procesa(n):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", f"{VOZ}/original/{n}.mp3", "-af",
        f"silenceremove=stop_periods=-1:stop_duration={PAUSA}:stop_threshold=-38dB:stop_silence={PAUSA},atempo={TEMPO},loudnorm=I=-17.5:TP=-1.5:LRA=11",
        "-ar", "44100", "-b:a", "192k", f"{VOZ}/{n}.mp3"], check=True)
def silencios(p):
    o = subprocess.run(["ffmpeg", "-hide_banner", "-i", p, "-af", "silencedetect=noise=-38dB:d=0.1", "-f", "null", "-"], capture_output=True, text=True).stderr
    return list(zip([float(x) for x in re.findall(r"silence_start: ([\d.]+)", o)], [float(x) for x in re.findall(r"silence_end: ([\d.]+)", o)]))
def a_procesado(t, sil):
    return (t - sum(max(0, min(f, t) - i - PAUSA) for i, f in sil if i < t and f - i > PAUSA)) / TEMPO
frases = lambda txt: [f.strip() for f in re.split(r"(?<=\.)\s+", txt) if f.strip()]

def inicios(n, segs):
    """Inicio de cada frase en el audio procesado, tomado de las pausas reales de la voz."""
    orig = f"{VOZ}/original/{n}.mp3"; d0 = dur(orig)
    sil = [s for s in silencios(orig) if s[0] > 0.2 and s[1] < d0 - 0.15]
    k = len(segs) - 1
    if k == 0: return [0.0], True
    cand = [z for z in sil if z[1] - z[0] >= 0.2]
    if len(cand) < k: cand = sil
    if len(cand) < k:
        acc, out = 0, []
        for s in segs: out.append(dur(f"{VOZ}/{n}.mp3") * acc / sum(map(len, segs))); acc += len(s)
        return out, False
    acc, esp = 0, []
    for s in segs[:-1]: acc += len(s); esp.append(d0 * acc / sum(map(len, segs)))
    costo = lambda combo: sum((((z[0] + z[1]) / 2 - e) ** 2) - 1.5 * (z[1] - z[0]) for z, e in zip(combo, esp))
    cortes = min(itertools.combinations(cand, k), key=costo)
    return [0.0] + [a_procesado(f, sil) for _, f in cortes], True

def parte(txt, i, f, tope=58):
    """Subtítulos cortos: una frase larga se parte en comas o dos puntos hasta caber en dos líneas."""
    seps = [m.end() for m in re.finditer(r"[,:] ", txt) if m.end() >= 16 and len(txt) - m.end() >= 16]
    if len(txt) <= tope or not seps: return [{"texto": txt, "desde": i, "hasta": f}]
    c = min(seps, key=lambda s: abs(s - len(txt) / 2)); m = i + round((f - i) * c / len(txt))
    return parte(txt[:c].strip(), i, m, tope) + parte(txt[c:].strip(), m, f, tope)

plan = [("intro", "pillIntro", g["intro"], 0.35, 0.45)]
plan += [(f"ini{i}", "pillIni", it, 0.2, 0.55) for i, it in enumerate(g["iniciativas"])]
plan += [("cierre", "pillCierre", g["cierre"], 0.35, 1.7)]
escenas, t, avisos = [], 0.0, []
for sid, tipo, it, pre, post in plan:
    n = it["audio"]; procesa(n); d = dur(f"{VOZ}/{n}.mp3")
    hab, sub = frases(it["voz"]), frases(it["sub"])
    assert len(hab) == len(sub), (sid, len(hab), len(sub))
    ini_s, ok = inicios(n, hab)
    if not ok: avisos.append(sid)
    ini = round(t * FPS); voz_ini = round((t + pre) * FPS); fin = round((t + pre + d + post) * FPS)
    ini_f = [voz_ini + round(s * FPS) for s in ini_s]; tope = min(fin, voz_ini + round(d * FPS) + 6)
    cues = [c for txt, a, b in zip(sub, ini_f, ini_f[1:] + [tope]) for c in parte(txt, a, b)]
    escenas.append({"id": sid, "tipo": tipo, "desde": ini, "duracion": fin - ini, "audio": f"voz/pulse/{PID}/{n}.mp3", "vozDesde": voz_ini, "vozDuracion": round(d * FPS),
                    "momentos": [f - ini for f in ini_f], "subtitulos": cues})
    t = fin / FPS
total = escenas[-1]["desde"] + escenas[-1]["duracion"]
json.dump({"fps": FPS, "total": total, "escenas": escenas}, open(f"{R}/data/pulse/{PID}.tiempos.json", "w"), ensure_ascii=False, indent=1)
def tc(f):
    ms = round(f * 1000 / FPS); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
os.makedirs(f"{R}/review", exist_ok=True)
with open(f"{R}/review/pulse-{PID}.srt", "w") as srt:
    for k, c in enumerate([c for e in escenas for c in e["subtitulos"]], start=1):
        srt.write(f"{k}\n{tc(c['desde'])} --> {tc(c['hasta'])}\n{c['texto']}\n\n")
for e in escenas: print(f"{e['id']:8} {e['desde']/FPS:6.2f} {e['duracion']/FPS:6.2f}  {[round(m/FPS,1) for m in e['momentos']]}")
print(f"TOTAL: {total/FPS:.2f} s ({total} fotogramas)")
if avisos: print("⚠️ momentos estimados:", avisos)
