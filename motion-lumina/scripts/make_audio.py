"""Música y efectos ORIGINALES de Lúmina, generados por síntesis (numpy).

No usa samples, loops ni pistas externas.
Uso:  python3 scripts/make_audio.py <duracion_en_segundos>
Salida: public/assets/audio/music.wav y sfx-*.wav
"""
import sys
import wave
from pathlib import Path

import numpy as np

SR = 44100
OUT = Path(__file__).resolve().parent.parent / "public" / "assets" / "audio"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)


def save(name, stereo, peak=0.9):
    stereo = np.asarray(stereo, dtype=np.float64)
    if stereo.ndim == 1:
        stereo = np.stack([stereo, stereo], axis=1)
    m = np.max(np.abs(stereo)) or 1.0
    stereo = stereo / m * peak
    pcm = (stereo * 32767).astype("<i2")
    with wave.open(str(OUT / name), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print("ok", name, round(len(stereo) / SR, 2), "s")


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def env_adsr(n, a, d, s, r):
    a, d, r = int(a * SR), int(d * SR), int(r * SR)
    e = np.full(n, s)
    a = min(a, n)
    e[:a] = np.linspace(0, 1, a)
    d2 = min(d, n - a)
    if d2 > 0:
        e[a:a + d2] = np.linspace(1, s, d2)
    r = min(r, n)
    e[-r:] *= np.linspace(1, 0, r)
    return e


def tone(freq, dur, harmonics):
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros_like(t)
    for k, amp in harmonics:
        out += amp * np.sin(2 * np.pi * freq * k * t + rng.uniform(0, 6.28))
    return out


def fft_band(x, lo, hi):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    mask = 1 / (1 + (lo / np.maximum(f, 1)) ** 4) * 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * mask, len(x))


def add(buf, sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= len(buf):
        return
    sig = sig[: len(buf) - i]
    buf[i:i + len(sig), 0] += sig * gain * (1 - max(0, pan))
    buf[i:i + len(sig), 1] += sig * gain * (1 + min(0, pan))


def make_music(total):
    bpm = 112.0  # más animada y juvenil
    beat = 60 / bpm
    bar = beat * 4
    n = int(total * SR)
    buf = np.zeros((n, 2))
    # Progresión cálida y optimista en Re mayor: D  Bm7  Gmaj7  Asus/A
    chords = [
        (38, [62, 66, 69, 73]),
        (35, [62, 66, 69, 71]),
        (31, [59, 62, 66, 69]),
        (33, [57, 61, 64, 69]),
    ]
    bars = int(total / bar) + 1
    pad_h = [(1, 1.0), (2, 0.35), (3, 0.12), (4, 0.05)]
    pluck_h = [(1, 1.0), (2, 0.5), (3, 0.25), (4, 0.12), (5, 0.06)]
    for b in range(bars):
        t0 = b * bar
        root, notes = chords[b % 4]
        # la intensidad crece suavemente: intro -> cuerpo
        energy = min(1.0, 0.45 + b / 14)
        # pad
        for j, nn in enumerate(notes):
            for det in (-0.6, 0.6):
                s = tone(midi(nn) * (1 + det / 400), bar + 0.6, pad_h)
                s *= env_adsr(len(s), 0.5, 0.4, 0.8, 0.9)
                add(buf, s, t0, 0.05, pan=(j - 1.5) * 0.25)
        # bajo: nota larga en la intro, pulso de corcheas después
        if b < 2:
            s = tone(midi(root), bar, [(1, 1.0), (2, 0.3)])
            s *= env_adsr(len(s), 0.02, 0.5, 0.6, 0.4)
            add(buf, s, t0, 0.20 * energy)
        else:
            for k in range(8):
                nn = root + (12 if k in (3, 6) else 0)
                s = tone(midi(nn), beat / 2 * 0.9, [(1, 1.0), (2, 0.35), (3, 0.1)])
                s *= env_adsr(len(s), 0.008, 0.08, 0.5, 0.06)
                add(buf, s, t0 + k * beat / 2, 0.17 * energy)
        if b >= 2:
            # arpegio de corcheas
            order = [0, 1, 2, 3, 2, 1, 2, 3]
            for k in range(8):
                nn = notes[order[k]] + 12
                s = tone(midi(nn), 0.55, pluck_h)
                s *= np.exp(-np.arange(len(s)) / SR * 7.0)
                s[: 80] *= np.linspace(0, 1, 80)
                add(buf, s, t0 + k * beat / 2, 0.055 * energy, pan=0.4 * (-1) ** k)
                # eco
                add(buf, s, t0 + k * beat / 2 + beat * 0.75, 0.02 * energy, pan=-0.4 * (-1) ** k)
        if b >= 2:
            # bombo en los cuatro tiempos, palmas en 2 y 4, shaker en contratiempos
            for k in (1, 3):
                cl = fft_band(rng.standard_normal(int(0.12 * SR)), 900, 5000)
                cl *= np.exp(-np.arange(len(cl)) / SR * 38)
                add(buf, cl, t0 + k * beat, 0.05, pan=-0.2)
            for k in (0, 1, 2, 3):
                t = np.arange(int(0.25 * SR)) / SR
                kick = np.sin(2 * np.pi * (48 * t + 60 * (1 - np.exp(-t * 30)) / 30)) * np.exp(-t * 14)
                add(buf, kick, t0 + k * beat, 0.22)
            for k in range(8):
                if k % 2 == 1:
                    nz = np.diff(rng.standard_normal(int(0.06 * SR) + 1))
                    nz *= np.exp(-np.arange(len(nz)) / SR * 70)
                    add(buf, nz, t0 + k * beat / 2, 0.012, pan=0.3)
    # acorde final sostenido en Re
    end_at = total - 5.0
    fade = np.ones(n)
    i = int(end_at * SR)
    fade[i:] = np.linspace(1, 0, n - i) ** 1.5
    fin = int(2.0 * SR)
    fade[:fin] *= np.linspace(0, 1, fin)
    buf *= fade[:, None]
    for nn in (50, 62, 66, 69, 74):
        s = tone(midi(nn), 5.0, pad_h)
        s *= env_adsr(len(s), 0.6, 1.0, 0.6, 3.0)
        add(buf, s, end_at, 0.06)
    # reverb simple por líneas de retardo
    wet = np.zeros_like(buf)
    for d, g in ((0.031, 0.35), (0.047, 0.28), (0.073, 0.22), (0.113, 0.16), (0.171, 0.1)):
        k = int(d * SR)
        wet[k:, 0] += buf[:-k, 1] * g
        wet[k:, 1] += buf[:-k, 0] * g
    buf = buf + wet * 0.6
    buf = np.tanh(buf * 1.4)
    save("music.wav", buf, peak=0.8)


def make_sfx():
    # whoosh: ruido filtrado con barrido de volumen
    d = 0.7
    nz = fft_band(rng.standard_normal(int(d * SR)), 500, 3500)
    t = np.linspace(0, 1, len(nz))
    save("sfx-whoosh.wav", nz * np.sin(np.pi * t) ** 2 * (0.4 + 0.6 * t), peak=0.6)
    # pop: aparición de elementos
    t = np.arange(int(0.16 * SR)) / SR
    pop = np.sin(2 * np.pi * (520 * t + 300 * (1 - np.exp(-t * 40)) / 40)) * np.exp(-t * 34)
    save("sfx-pop.wav", pop, peak=0.6)
    # tick: marcas de lista
    t = np.arange(int(0.07 * SR)) / SR
    save("sfx-tick.wav", np.sin(2 * np.pi * 1500 * t) * np.exp(-t * 90), peak=0.45)
    # chime: momento positivo (primera compra / retención)
    d = 1.4
    t = np.arange(int(d * SR)) / SR
    ch = sum(a * np.sin(2 * np.pi * midi(nn) * (t - dl).clip(0)) * np.exp(-(t - dl).clip(0) * 4) * (t >= dl)
             for nn, a, dl in ((74, 1, 0), (78, 0.8, 0.09), (81, 0.7, 0.18), (86, 0.5, 0.27)))
    save("sfx-chime.wav", ch, peak=0.6)
    # alerta suave: señal del algoritmo
    d = 0.5
    t = np.arange(int(d * SR)) / SR
    al = (np.sin(2 * np.pi * midi(69) * t) * (t < 0.2) * np.exp(-t * 12)
          + np.sin(2 * np.pi * midi(66) * (t - 0.2).clip(0)) * (t >= 0.2) * np.exp(-(t - 0.2).clip(0) * 10))
    save("sfx-signal.wav", al, peak=0.5)
    # encendido: bombilla del logo
    d = 1.2
    t = np.arange(int(d * SR)) / SR
    rise = np.sin(2 * np.pi * (220 * t + 330 * t ** 2)) * (t / d) ** 2 * np.exp(-((t - d) ** 2) * 2)
    rise[-2000:] *= np.linspace(1, 0, 2000)
    save("sfx-light.wav", rise + 0.2 * fft_band(rng.standard_normal(len(t)), 2000, 9000) * (t / d) ** 3, peak=0.5)


if __name__ == "__main__":
    total = float(sys.argv[1]) if len(sys.argv) > 1 else 120.0
    make_sfx()
    make_music(total)
