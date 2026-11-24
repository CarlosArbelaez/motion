# motion-lumina

Motion graphic ejecutivo de **LÚMINA** (Remotion 4, 1920 × 1080, 30 fps, ~1:54).

## Estructura

- `src/` — composición (`Video.tsx`), escenas (`scenes/`), componentes y tema BEES (`theme.ts`).
- `src/scenes/*.tsx` — cada escena contiene sus textos, tiempos (en segundos de locución) y su diagrama.
- `src/components/motion.tsx` — piezas de animación compartidas (titular por fases, trazos, tienda, rayos).
- `src/data/captions.json` — subtítulos (generados por `scripts/make_captions.mjs`).
- `public/assets/` — logo original, fuentes y audio (locución, música, efectos).
- `scripts/` — `make_audio.py` (música y efectos por síntesis), `make_captions.mjs`, `previews.mjs`.
- `docs/` — guion, storyboard, fuentes, subtítulos `.srt`, marcas de tiempo por palabra.
- `previews/` — una imagen por escena.
- `Renders/` — video exportado.

## Uso

```bash
npm install
npm run dev        # Remotion Studio
npm run render     # Renders/lumina_Final.mp4
npm run previews   # previews/*.jpg
```

Si el entorno no puede descargar Chrome Headless Shell, indique uno local:
`REMOTION_BROWSER=/ruta/a/chrome-headless-shell npm run render`.

## Cambiar tiempos o locución

Los tiempos de escena y de cada aparición están expresados en **segundos de la locución** (`f(segundos)` en `src/theme.ts`).
Las animaciones se anclan a palabras de la locución con `t("palabra", n)` (`src/theme.ts`), leídas de `src/data/words.json`.
Para cambiar la locución: guarde el audio y sus marcas por palabra en `docs/voz/`, ejecute
`python3 scripts/prepare_voice.py <tempo>`, luego `node scripts/make_captions.mjs` (ajuste las frases si cambió el texto)
y regenere la música con `python3 scripts/make_audio.py <duración en segundos>`.
