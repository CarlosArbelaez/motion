#!/usr/bin/env python3
"""Compone por código la pista de fondo (dubstep a 140 BPM) siguiendo data/tiempos.json.
Cada sección arranca su compás en el corte de escena, así los golpes caen en los cambios.
Salida: public/musica/pulso.wav (mono, 44.1 kHz). Determinista: misma entrada, mismo archivo."""
import json, wave, os
import numpy as np

SR = 44100
BPM = 140
BEAT = 60 / BPM
BAR = BEAT * 4
RAIZ = os.path.join(os.path.dirname(__file__), "..")
T = json.load(open(os.path.join(RAIZ, "data/tiempos.json")))
FPS = T["fps"]
TOTAL = T["total"] / FPS
rng = np.random.default_rng(2026)

# Fa menor: Fm, Reb, Lab, Mib (dos compases cada uno)
PROG = [(43.65, [174.6, 207.7, 261.6]), (34.65, [138.6, 174.6, 207.7]), (51.91, [207.7, 261.6, 311.1]), (38.89, [155.6, 196.0, 233.1])]

def t_(d): return np.arange(int(d * SR)) / SR
def ruido(d): return rng.uniform(-1, 1, int(d * SR))
def pasa_altos(x, a=0.85):
    y = np.empty_like(x); y[0] = x[0]; y[1:] = x[1:] - a * x[:-1]; return y
def suaviza(x, n):
    return np.convolve(x, np.ones(n) / n, mode="same")

def bombo(v=1.0):
    t = t_(0.32); f = 45 + 110 * np.exp(-t * 32)
    return v * (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) + 0.25 * pasa_altos(ruido(0.32)) * np.exp(-t * 180))
def caja(v=1.0):
    t = t_(0.28)
    return v * (0.55 * np.sin(2 * np.pi * 190 * t) * np.exp(-t * 22) + 1.1 * suaviza(pasa_altos(ruido(0.28)), 2) * np.exp(-t * 14))
def hat(v=1.0, largo=0.05):
    t = t_(largo); return v * 1.3 * pasa_altos(pasa_altos(ruido(largo))) * np.exp(-t * (3.2 / largo))
def impacto(v=1.0):
    t = t_(1.6); f = 34 + 60 * np.exp(-t * 10)
    return v * np.tanh(1.5 * (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2) + 0.5 * suaviza(ruido(1.6), 12) * np.exp(-t * 6)))
def subida(d, v=1.0):
    t = t_(d); p = t / d
    n = pasa_altos(ruido(d), 0.6 + 0.35 * 0) * p ** 2
    tono = np.sin(2 * np.pi * np.cumsum(180 * 2 ** (p * 2.2)) / SR) * p ** 2 * 0.35
    return v * (0.6 * n + tono)
def armonicos(f0, d, corte, k_max=28, fase=0.0):
    """Onda rica cuyo brillo sigue a `corte` (Hz, por muestra): el 'wobble' sin filtros recursivos."""
    t = t_(d); out = np.zeros_like(t)
    for k in range(1, k_max + 1):
        fk = k * f0
        if fk > 9000: break
        out += np.sin(2 * np.pi * fk * t + fase * k) / k / np.sqrt(1 + (fk / corte) ** 6)
    return out
def bajo(f0, d, ritmo, fuerza=1.0):
    t = t_(d); lfo = 0.5 - 0.5 * np.cos(2 * np.pi * ritmo * t / BEAT)
    corte = 110 + 2600 * fuerza * lfo ** 1.6
    medio = armonicos(f0 * 2, d, corte) + 0.5 * armonicos(f0 * 4 * 1.006, d, corte * 1.5, fase=0.7)
    sub = np.sin(2 * np.pi * f0 * 2 * t)
    # El vaivén también mueve el volumen del cuerpo medio: se oye en parlantes de celular, que no dan graves
    return np.tanh(2.2 * medio) * (0.3 + 0.7 * lfo) * 0.8 + sub * 0.2
def colchon(notas, d, brillo=900.0):
    t = t_(d); out = np.zeros_like(t)
    for i, f in enumerate(notas):
        for des in (0.996, 1.004):
            out += armonicos(f * des, d, np.full_like(t, brillo), k_max=8, fase=0.3 * i)
    env = np.minimum(1, t / 0.25) * np.minimum(1, (d - t) / 0.25)
    return out * env / (2 * len(notas))
def pulsada(f, v=1.0, brillo=2600.0, largo=0.22):
    t = t_(largo)
    return v * armonicos(f, largo, brillo * np.exp(-t * 9) + 300, k_max=12) * np.exp(-t * 11) * np.minimum(1, t * 400)

def pon(buf, t0, x, g=1.0):
    i = int(round(t0 * SR))
    if i >= len(buf) or i < 0: return
    n = min(len(x), len(buf) - i); buf[i:i + n] += g * x[:n]

def seccion(dur, tipo, variante=0):
    b = np.zeros(int(dur * SR) + 1)
    lado = np.ones_like(b)  # compresión lateral: el bajo se agacha en cada bombo
    def golpe(t0, v=1.0):
        pon(b, t0, bombo(v), 0.95)
        i = int(t0 * SR); n = min(int(0.3 * SR), len(lado) - i)
        if n > 0: lado[i:i + n] = np.minimum(lado[i:i + n], 1 - 0.85 * np.exp(-np.arange(n) / SR * 9))
    compases = int(np.ceil(dur / BAR))
    capa = np.zeros_like(b)
    ritmos = [[1, 2, 1, 4], [2, 2, 4, 3], [1, 4, 2, 2], [2, 3, 2, 4], [4, 2, 1, 2]][variante % 5]
    for c in range(compases):
        t0 = c * BAR; d = min(BAR, dur - t0)
        if d <= 0.02: break
        bajo_f, acorde = PROG[(c // 2 + variante) % 4]
        if tipo == "intro":
            sube = min(1.0, 0.25 + 0.75 * (t0 / max(dur, 1)))
            pon(capa, t0, colchon(acorde, d, 500 + 1400 * sube), 0.5)
            for p in range(8):
                if p * BEAT / 2 < d: pon(capa, t0 + p * BEAT / 2, pulsada(acorde[(p * 2) % 3] * 2, 0.5, 1200 + 2600 * sube), 0.5 * sube)
            if c >= 2:
                for p in range(4):
                    if p * BEAT < d: pon(b, t0 + p * BEAT + BEAT / 2, hat(0.5), 0.5)
            if c >= 4:
                for p in (0, 2):
                    if p * BEAT < d: golpe(t0 + p * BEAT, 0.6)
        elif tipo == "subida":
            pon(capa, t0, colchon(acorde, d, 2200), 0.5)
        elif tipo in ("drop", "uno"):
            pon(capa, t0, bajo(bajo_f, d, ritmos[c % 4], 1.0 if tipo == "uno" else 0.85), 0.62)
            for p, v in ((0, 1.0), (2.5 if c % 2 == 0 else 1.5, 0.8)):
                if p * BEAT < d: golpe(t0 + p * BEAT, v)
            if 2 * BEAT < d: pon(b, t0 + 2 * BEAT, caja(), 1.0)
            for p in range(8):
                if p * BEAT / 2 < d: pon(b, t0 + p * BEAT / 2, hat(0.7 if p % 2 else 0.4, 0.09 if p == 7 else 0.045), 0.42)
            if c % 2 == 0: pon(capa, t0, pulsada(acorde[0] * 2, 0.9, 3200, 0.3), 0.32)
            if tipo == "uno":
                for p in range(8):
                    if p * BEAT / 2 < d: pon(capa, t0 + p * BEAT / 2, pulsada(acorde[[0, 2, 1, 2][p % 4]] * 4, 0.6, 3600, 0.16), 0.3)
        elif tipo == "puente":
            sube = t0 / max(dur, 1)
            pon(capa, t0, colchon(acorde, d, 700 + 1800 * sube), 0.55)
            for p in range(8):
                if p * BEAT / 2 < d: pon(capa, t0 + p * BEAT / 2, pulsada(acorde[(p * 2) % 3] * 2, 0.6, 1500 + 2500 * sube), 0.5)
            if c >= 1:
                for p in range(4):
                    if p * BEAT < d: golpe(t0 + p * BEAT, 0.45 + 0.3 * sube)
        elif tipo == "cierre":
            pon(capa, t0, colchon(PROG[0][1], d, 1600), 0.6)
            for p in range(8):
                if p * BEAT / 2 < d: pon(capa, t0 + p * BEAT / 2, pulsada(PROG[0][1][(p * 2) % 3] * 2, 0.5, 2400), 0.4)
    b += capa * lado
    if tipo in ("drop", "uno", "cierre"): pon(b, 0, impacto(), 0.7)
    # Remate hacia el corte siguiente
    if tipo in ("drop", "uno") and dur > 3:
        for k in range(4): pon(b, dur - (4 - k) * BEAT / 4, caja(0.5 + 0.12 * k), 0.6)
        pon(b, dur - 0.6, subida(0.6), 0.45)
    if tipo == "subida":
        n = 0; t0 = 0.0
        while t0 < dur - 0.02:
            pon(b, t0, caja(0.4 + 0.6 * t0 / dur), 0.6)
            t0 += BEAT / (1 if t0 < dur * 0.35 else 2 if t0 < dur * 0.7 else 4); n += 1
        pon(b, 0, subida(dur), 0.7)
    if tipo in ("intro", "puente") and dur > 2.5: pon(b, dur - 1.7, subida(1.7), 0.5)
    f = int(0.004 * SR); b[:f] *= np.linspace(0, 1, f); b[-f:] *= np.linspace(1, 0, f)
    return b[: int(dur * SR)]

# Plan: tipo de música por escena (las contiguas del mismo bloque se unen en una sección)
BLOQUE = {"gancho": "intro", "numeros": "intro", "ranking": "subida", "top": "drop", "numeroUno": "uno", "cortina": "puente", "areas": "puente", "cierre": "cierre"}
secciones = []
for e in T["escenas"]:
    tipo = BLOQUE[e["tipo"]]; ini = e["desde"] / FPS; fin = (e["desde"] + e["duracion"]) / FPS
    if secciones and secciones[-1][0] == tipo and tipo in ("intro", "puente"): secciones[-1][2] = fin
    else: secciones.append([tipo, ini, fin])
secciones[-1][2] = TOTAL
mezcla = np.zeros(int(TOTAL * SR) + SR)
for i, (tipo, ini, fin) in enumerate(secciones):
    pon(mezcla, ini, seccion(fin - ini, tipo, i))
    print(f"{tipo:8s} {ini:6.2f} → {fin:6.2f}")
mezcla = mezcla[: int(TOTAL * SR)]
cola = int(2.2 * SR); mezcla[-cola:] *= np.linspace(1, 0, cola) ** 1.5
mezcla = np.tanh(mezcla * 1.1); mezcla *= 0.89 / np.abs(mezcla).max()
os.makedirs(os.path.join(RAIZ, "public/musica"), exist_ok=True)
with wave.open(os.path.join(RAIZ, "public/musica/pulso.wav"), "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mezcla * 32767).astype("<i2").tobytes())
print(f"public/musica/pulso.wav  {TOTAL:.2f} s")
