"""Música y efectos originales por síntesis (numpy puro, sin samples externos).

Uso:  python3 scripts/synth_audio.py [duracion_musica_seg]
Salida: public/assets/audio/{music.wav, whoosh.wav, tick.wav, pop.wav, chime.wav, ding.wav, thud.wav}
"""
import sys, wave, os
import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "audio")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def write(name, x, peak=0.9):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    m = np.max(np.abs(x)) or 1.0
    x = x / m * peak
    pcm = (x * 32767).astype("<i2")
    with wave.open(os.path.join(OUT, name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(name, round(len(x) / SR, 2), "s")


def note(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def env_adsr(n, a, d, s, r):
    a, d, r = int(a * SR), int(d * SR), int(r * SR)
    e = np.full(n, s)
    e[:a] = np.linspace(0, 1, a)
    e[a:a + d] = np.linspace(1, s, d)
    e[-r:] *= np.linspace(1, 0, r)
    return e


def pad(freq, dur, detune=0.004):
    t = np.arange(int(dur * SR)) / SR
    out = np.zeros((len(t), 2))
    for k, amp in [(1, 1.0), (2, 0.35), (3, 0.16), (4, 0.07)]:
        for side, dt in [(0, -detune), (1, detune)]:
            ph = rng.uniform(0, 2 * np.pi)
            out[:, side] += amp * np.sin(2 * np.pi * freq * k * (1 + dt) * t + ph)
    lfo = 0.85 + 0.15 * np.sin(2 * np.pi * 0.11 * t + rng.uniform(0, 6))
    return out * lfo[:, None]


def pluck(freq, dur=0.9):
    t = np.arange(int(dur * SR)) / SR
    x = np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(2 * np.pi * 2 * freq * t) * np.exp(-t * 9)
    return x * np.exp(-t * 5.5) * np.minimum(1, t / 0.004)


def music(total):
    bpm = 92.0
    beat = 60 / bpm
    bar = 4 * beat
    # Progresión: Dmaj9 – Bm7 – Gmaj7 – Asus/A  (cálida, estable, corporativa)
    chords = [
        ([50, 57, 61, 64, 66], 38),   # D
        ([47, 54, 57, 62, 66], 35),   # Bm
        ([43, 55, 59, 62, 66], 31),   # G
        ([45, 57, 61, 64, 69], 33),   # A
    ]
    n = int(total * SR)
    mix = np.zeros((n + SR * 4, 2))
    nbars = int(total / bar) + 1
    for b in range(nbars):
        ch, bass = chords[(b // 2) % 4]
        start = int(b * bar * SR)
        if b % 2 == 0:  # pad dura 2 compases
            dur = 2 * bar + 1.2
            p = np.zeros((int(dur * SR), 2))
            for m in ch:
                p += pad(note(m), dur)[: len(p)]
            p *= env_adsr(len(p), 1.4, 0.5, 0.8, 1.6)[:, None]
            mix[start:start + len(p)] += 0.05 * p
            # sub
            t = np.arange(int((2 * bar) * SR)) / SR
            sub = np.sin(2 * np.pi * note(bass) * t) * env_adsr(len(t), 0.3, 0.4, 0.7, 0.8)
            mix[start:start + len(t)] += 0.16 * sub[:, None]
        # arpegio suave en corcheas, entra a partir del compás 4
        if b >= 4:
            pattern = [0, 2, 3, 1, 4, 2, 3, 1]
            for i, idx in enumerate(pattern):
                if (b % 4 == 3 and i > 5):
                    continue
                m = ch[idx] + 12
                pl = pluck(note(m))
                s = start + int(i * beat / 2 * SR)
                pan = 0.35 + 0.3 * ((i % 2))
                vel = 0.07 if i % 2 == 0 else 0.045
                mix[s:s + len(pl), 0] += vel * pl * (1 - pan)
                mix[s:s + len(pl), 1] += vel * pl * pan
        # pulso tenue (bombo suave sintético) en tiempos 1 y 3 a partir del compás 8
        if b >= 8:
            for k in (0, 2):
                t = np.arange(int(0.22 * SR)) / SR
                kick = np.sin(2 * np.pi * (48 + 60 * np.exp(-t * 28)) * t) * np.exp(-t * 16)
                s = start + int(k * beat * SR)
                mix[s:s + len(kick)] += 0.10 * kick[:, None]
    mix = mix[:n]
    fade = int(3 * SR)
    mix[:fade] *= np.linspace(0, 1, fade)[:, None]
    mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
    return np.tanh(mix * 2.2)


def bandnoise(dur, f_lo, f_hi):
    n = int(dur * SR)
    spec = np.fft.rfft(rng.standard_normal(n))
    f = np.fft.rfftfreq(n, 1 / SR)
    spec[(f < f_lo) | (f > f_hi)] = 0
    return np.fft.irfft(spec, n)


def whoosh():
    dur = 0.7
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = np.zeros(n)
    # barrido: suma de bandas con ganancia desplazada en el tiempo
    for i, (lo, hi) in enumerate([(200, 500), (500, 1200), (1200, 2600), (2600, 5200)]):
        c = 0.18 + 0.12 * i
        g = np.exp(-((t - c) ** 2) / (2 * 0.085 ** 2))
        x += bandnoise(dur, lo, hi) * g * (1 - 0.15 * i)
    return x


def tick():
    t = np.arange(int(0.06 * SR)) / SR
    return np.sin(2 * np.pi * 1900 * t) * np.exp(-t * 90) + 0.3 * bandnoise(0.06, 3000, 8000) * np.exp(-t * 200)


def pop():
    t = np.arange(int(0.16 * SR)) / SR
    return np.sin(2 * np.pi * (320 + 500 * np.exp(-t * 40)) * t) * np.exp(-t * 26)


def chime():
    t = np.arange(int(1.4 * SR)) / SR
    x = np.zeros(len(t))
    for i, m in enumerate([74, 78, 81]):
        d = int(i * 0.09 * SR)
        tt = t[: len(t) - d]
        b = (np.sin(2 * np.pi * note(m) * tt) + 0.25 * np.sin(2 * np.pi * note(m) * 2.76 * tt) * np.exp(-tt * 9)) * np.exp(-tt * 3.6)
        x[d:] += b * np.minimum(1, tt / 0.003)
    return x


def ding():
    t = np.arange(int(0.35 * SR)) / SR
    return (np.sin(2 * np.pi * 1245 * t) + 0.4 * np.sin(2 * np.pi * 1660 * t)) * np.exp(-t * 14) * np.minimum(1, t / 0.002)


def thud():
    t = np.arange(int(0.3 * SR)) / SR
    return np.sin(2 * np.pi * (60 + 90 * np.exp(-t * 30)) * t) * np.exp(-t * 14) + 0.15 * bandnoise(0.3, 200, 900) * np.exp(-t * 40)


if __name__ == "__main__":
    total = float(sys.argv[1]) if len(sys.argv) > 1 else 300.0
    write("music.wav", music(total), 0.8)
    write("whoosh.wav", whoosh(), 0.7)
    write("tick.wav", tick(), 0.6)
    write("pop.wav", pop(), 0.7)
    write("chime.wav", chime(), 0.7)
    write("ding.wav", ding(), 0.6)
    write("thud.wav", thud(), 0.8)
