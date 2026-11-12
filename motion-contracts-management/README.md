# Motion · Contracts Management Finance Tech

Motion graphic ejecutivo (1920 × 1080, 30 fps, 4:35) de la propuesta To-Be v3.2, hecho con [Remotion](https://www.remotion.dev).

- **Video final:** `Renders/contracts-management_Final.mp4` (H.264 + AAC)
- **Guion y storyboard:** `docs/guion_y_storyboard.md`
- **Fuentes y clasificación de afirmaciones:** `docs/fuentes_y_clasificacion.md`
- **Subtítulos:** `docs/subtitulos.srt` · **Tiempos por escena:** `docs/tiempos.md`
- **Imágenes por escena:** `previews/`

## Volver a renderizar

```bash
npm install
```

```bash
npx remotion studio
```

```bash
npx remotion render ContractsManagement Renders/contracts-management_Final.mp4 --codec=h264 --audio-codec=aac --crf=18 --pixel-format=yuv420p
```

Sin subtítulos incrustados: añadir `--props='{"showCaptions":false}'`.

Si el entorno no puede descargar el navegador de Remotion, indique uno local:

```bash
REMOTION_BROWSER=/ruta/a/chrome-headless-shell npx remotion render ContractsManagement Renders/contracts-management_Final.mp4
```

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Textos y cifras en pantalla | `src/scenes/S01.tsx` … `S12.tsx` (constantes al inicio de cada archivo) |
| Guion de locución | `src/data/script.json` |
| Tiempos de la voz (por palabra) | `src/data/timing.json` (generado) |
| Colores y tipografías | `src/theme.ts` · fuentes en `public/assets/fonts/` |
| Pausas entre escenas y cierre | `LEAD`, `TAIL`, `END_HOLD` en `src/lib/timing.ts` |
| Mezcla de música y efectos | `src/Video.tsx` |
| Voz, música y efectos | `public/assets/voice/`, `public/assets/audio/` |

Las animaciones se anclan a la locución con `cue("s06", "vuelve")`: devuelve el segundo en que la voz dice esa
frase. Si se regenera la voz, la animación y los subtítulos se reacomodan solos.

## Regenerar el audio

1. **Voz:** generar un archivo por escena con el texto de `src/data/script.json` y guardarlo como
   `public/assets/voice/sNN.mp3` (aquí se usó ElevenLabs, voz "Herduin", español de Colombia).
2. **Tiempos:** transcribir con tiempos por palabra y ejecutar `python3 scripts/build_timing.py <respuesta.json>`
   (sin argumento reutiliza `docs/transcripcion_palabras.json`).
3. **Música y efectos** (síntesis propia, sin samples externos): `python3 scripts/synth_audio.py 290`.
4. **Documentos derivados:** `npx tsx scripts/export_docs.ts`.

## Notas

- **Tipografía provisional:** las presentaciones fuente declaran Avantt y Satoshi; aquí se usan Outfit y DM Sans
  (licencia abierta). Ver `docs/fuentes_y_clasificacion.md`.
- Remotion requiere licencia de empresa para organizaciones de más de 3 personas: https://www.remotion.dev/docs/license
