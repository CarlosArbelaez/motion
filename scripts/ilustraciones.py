#!/usr/bin/env python3
"""Prepara las ilustraciones elegidas: las copia de input/ilustraciones a public/ilustraciones
y cambia sus dos colores de acento por colores de la paleta del video (el trazo negro y los
rellenos blancos se conservan)."""
import os, re
R = os.path.join(os.path.dirname(__file__), "..")
# sección -> archivo
ELEGIDAS = {
    "s1": "person-working-on-laptop",
    "s2": "characters-playing-chess-game",
    "s3": "character-talking-to-robot-chatbot",
    "s4": "confident-person-walking",
}
CAMBIOS = {"#00b4e9": "#000000", "#aaca60": "#e0e2e6"}  # azul -> negro, verde -> gris claro de marca
os.makedirs(f"{R}/public/ilustraciones", exist_ok=True)
for sec, nombre in ELEGIDAS.items():
    svg = open(f"{R}/input/ilustraciones/{nombre}.svg", encoding="utf-8").read()
    assert not re.search(r"<script|<image|foreignObject|href=", svg, re.I), nombre
    for a, b in CAMBIOS.items():
        svg = re.sub(a, b, svg, flags=re.I)
    open(f"{R}/public/ilustraciones/{sec}.svg", "w", encoding="utf-8").write(svg)
    print("ok", sec, nombre)
