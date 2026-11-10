"""Música y efectos originales para HE Agentic Hub, generados por síntesis (numpy).

No usa samples, loops ni efectos externos. Salida: WAV 48 kHz estéreo en assets/audio/.
Uso:  python3 -I scripts/synth_audio.py
"""
import json
import os
import wave

import numpy as np

SR = 48000
TOTAL_SEC = 1910 / 30  # = TOTAL / FPS en src/timeline.ts
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "audio")
RNG = np.random.default_rng(7)


def write_wav(path, x):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    peak = np.max(np.abs(x))
    if peak > 0.98:
        x = x * (0.98 / peak)
    data = (x * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


def t_axis(sec):
    return np.arange(int(sec * SR)) / SR


def env_adsr(n, a, d, s, r, sustain_len=None):
    a_n, d_n, r_n = int(a * SR), int(d * SR), int(r * SR)
    s_n = max(0, n - a_n - d_n - r_n) if sustain_len is None else int(sustain_len * SR)
    e = np.concatenate([
        np.linspace(0, 1, max(a_n, 1), endpoint=False),
        np.linspace(1, s, max(d_n, 1), endpoint=False),
        np.full(s_n, s),
        np.linspace(s, 0, max(r_n, 1)),
    ])
    if len(e) < n:
        e = np.concatenate([e, np.zeros(n - len(e))])
    return e[:n]


def lowpass(x, cutoff):
    """Filtro pasa bajos por FFT (respuesta suave)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    H = 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(X * H, n=len(x))


def swept_band_noise(sec, f_start, f_end, width=0.6):
    """Ruido filtrado con banda móvil (overlap-add por FFT)."""
    n = int(sec * SR)
    noise = RNG.standard_normal(n + 4096)
    hop, win = 512, 2048
    w = np.hanning(win)
    out = np.zeros(n + 4096)
    frames = (n) // hop + 1
    freqs = np.fft.rfftfreq(win, 1 / SR)
    for i in range(frames):
        s = i * hop
        seg = noise[s:s + win]
        if len(seg) < win:
            break
        p = i / max(frames - 1, 1)
        fc = f_start * (f_end / f_start) ** p
        mask = np.exp(-0.5 * (np.log2(np.maximum(freqs, 1) / fc) / width) ** 2)
        out[s:s + win] += np.fft.irfft(np.fft.rfft(seg * w) * mask, n=win) * w
    out = out[:n]
    return out / (np.max(np.abs(out)) + 1e-9)


def note(freq, sec, kind="sine", detune=0.0):
    t = t_axis(sec)
    if kind == "sine":
        return np.sin(2 * np.pi * freq * t)
    if kind == "soft":  # pocos armónicos, timbre cálido
        y = np.zeros_like(t)
        for k, amp in [(1, 1.0), (2, 0.35), (3, 0.12), (4, 0.05)]:
            y += amp * np.sin(2 * np.pi * freq * k * (1 + detune) * t)
        return y / 1.5
    raise ValueError(kind)


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


# --------------------------------------------------------------------------------------
# Música: 24 compases de 4/4 repartidos en la duración del video (~94 BPM para 61 s).
# La menor → resolución en Do mayor.
# --------------------------------------------------------------------------------------

def build_music(total=TOTAL_SEC):
    n = int(total * SR)
    L = np.zeros(n)
    R = np.zeros(n)
    n_bars = 24
    bar = total / n_bars
    beat = bar / 4

    # Acordes por compás (voicings en MIDI)
    Am = [57, 60, 64, 69]
    F = [53, 57, 60, 65]
    C = [48, 55, 60, 64]
    G = [55, 59, 62, 67]
    Fmaj7 = [53, 57, 64, 69]
    Cadd9 = [48, 55, 62, 64, 67]
    prog = [Am, Am] + [F, C, G, Am] * 5 + [Fmaj7, Cadd9]
    bass = [45, 45] + [41, 48, 43, 45] * 5 + [41, 36]

    def add(sig, start, gain_l, gain_r):
        s = int(start * SR)
        e = min(n, s + len(sig))
        if e <= s:
            return
        L[s:e] += sig[: e - s] * gain_l
        R[s:e] += sig[: e - s] * gain_r

    for b, chord in enumerate(prog):
        start = b * bar
        last = b == len(prog) - 1
        length = bar * (1.0 if not last else 0.0) + (2.45 if last else 0.15)
        # Pad: dos capas levemente desafinadas, pasa bajos para suavidad
        pad_gain = 0.055 if b < 2 else 0.07
        for m in chord:
            for dt, pan in [(-0.0025, 0.65), (0.0025, 0.35)]:
                y = note(midi(m), length, "soft", detune=dt)
                y *= env_adsr(len(y), 0.35, 0.4, 0.8, 0.6 if not last else 1.6)
                add(y * pad_gain, start, pan, 1 - pan)
        # Bajo (desde el compás 2)
        if b >= 2:
            for k in range(2 if not last else 1):
                yb = note(midi(bass[b]), beat * 2 if not last else 2.3, "sine")
                yb += 0.3 * note(midi(bass[b]) * 2, len(yb) / SR, "sine")
                yb *= env_adsr(len(yb), 0.01, 0.25, 0.55, 0.25)
                add(yb * 0.11, start + k * beat * 2, 0.5, 0.5)
        # Arpegio en corcheas (pluck) desde el compás 1; más denso desde el 4
        if 1 <= b < len(prog) - 1:
            pattern = [0, 2, 1, 3, 2, 1, 3, 2]
            for i, idx in enumerate(pattern):
                if b < 4 and i % 2 == 1:
                    continue
                m = chord[idx % len(chord)] + 12
                y = note(midi(m), 0.35, "soft")
                y *= np.exp(-t_axis(0.35) * 11)
                y = lowpass(y, 3200)
                pan = 0.3 + 0.4 * ((i % 4) / 3)
                add(y * 0.05, start + i * beat / 2, pan, 1 - pan)
        # Pulso rítmico: hi-hat suave (ruido filtrado) desde la placa 3 (compás 4)
        if 6 <= b < len(prog) - 2:
            for i in range(8):
                hh = swept_band_noise(0.06, 7000, 9000, 0.5) * np.exp(-t_axis(0.06) * 60)
                g = 0.022 if i % 2 else 0.012
                add(hh * g, start + i * beat / 2, 0.55, 0.45)
        # Golpe grave suave en el 1 desde el compás 2
        if 2 <= b < len(prog) - 1:
            tk = t_axis(0.25)
            kick = np.sin(2 * np.pi * (55 + 60 * np.exp(-tk * 30)) * tk) * np.exp(-tk * 14)
            add(kick * 0.13, start, 0.5, 0.5)

    mix = np.stack([L, R], axis=1)
    # Fade in corto y fade out final que termina antes de 30 s
    fi = int(0.4 * SR)
    mix[:fi] *= np.linspace(0, 1, fi)[:, None]
    fo_start, fo_end = int((total - 1.7) * SR), int((total - 0.15) * SR)
    fade = np.ones(n)
    fade[fo_start:fo_end] = np.linspace(1, 0, fo_end - fo_start) ** 1.5
    fade[fo_end:] = 0
    mix *= fade[:, None]
    mix *= 0.5 / (np.max(np.abs(mix)) + 1e-9)  # pico ~ -6 dBFS; Remotion aplica ducking
    return mix


# --------------------------------------------------------------------------------------
# Efectos
# --------------------------------------------------------------------------------------

def sfx_tick():
    t = t_axis(0.05)
    return np.sin(2 * np.pi * 1850 * t) * np.exp(-t * 90) * 0.35


def sfx_pop():
    t = t_axis(0.12)
    f = 520 + 520 * np.exp(-t * 40)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 30) * 0.45


def sfx_snap():
    t = t_axis(0.14)
    click = swept_band_noise(0.14, 3500, 2500, 0.7) * np.exp(-t * 70)
    thump = np.sin(2 * np.pi * (90 + 80 * np.exp(-t * 35)) * t) * np.exp(-t * 25)
    return click * 0.22 + thump * 0.5


def sfx_whoosh():
    sec = 0.5
    t = t_axis(sec)
    y = swept_band_noise(sec, 400, 3800, 0.55)
    e = np.sin(np.pi * np.clip(t / sec, 0, 1)) ** 2
    return y * e * 0.28


def sfx_rise():
    sec = 0.7
    t = t_axis(sec)
    y = swept_band_noise(sec, 300, 5000, 0.5) * (t / sec) ** 2 * 0.22
    f = 300 + 500 * (t / sec) ** 2
    y += np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / sec) ** 2 * 0.12
    y[-int(0.04 * SR):] *= np.linspace(1, 0, int(0.04 * SR))
    return y


def sfx_confirm():
    sec = 0.7
    out = np.zeros(int(sec * SR))
    for start, m in [(0.0, 88), (0.09, 95)]:
        tt = t_axis(sec - start)
        y = (np.sin(2 * np.pi * midi(m) * tt) + 0.2 * np.sin(2 * np.pi * midi(m) * 2 * tt)) * np.exp(-tt * 7)
        s = int(start * SR)
        out[s:s + len(y)] += y
    return out * 0.2


def sfx_resolve():
    sec = 1.3
    out = np.zeros(int(sec * SR))
    for start, m in [(0.0, 72), (0.07, 76), (0.14, 79), (0.21, 84)]:
        tt = t_axis(sec - start)
        y = (np.sin(2 * np.pi * midi(m) * tt) + 0.25 * np.sin(2 * np.pi * midi(m) * 2 * tt)) * np.exp(-tt * 3.2)
        s = int(start * SR)
        out[s:s + len(y)] += y
    out[-int(0.05 * SR):] *= np.linspace(1, 0, int(0.05 * SR))
    return out * 0.16


def main():
    os.makedirs(os.path.join(OUT, "sfx"), exist_ok=True)
    write_wav(os.path.join(OUT, "music.wav"), build_music())
    for name, fn in [("tick", sfx_tick), ("pop", sfx_pop), ("snap", sfx_snap), ("whoosh", sfx_whoosh),
                     ("rise", sfx_rise), ("confirm", sfx_confirm), ("resolve", sfx_resolve)]:
        write_wav(os.path.join(OUT, "sfx", f"{name}.wav"), fn())
    print("ok")


if __name__ == "__main__":
    main()
