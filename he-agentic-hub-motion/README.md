# HE Agentic Hub — motion graphic de 30 s (Remotion)

Video ejecutivo para pedir el VoBo de la VP de High End para iniciar el desarrollo de HE Agentic Hub.
1920 × 1080 · 30 fps · 1910 fotogramas (63,7 s) · MP4 H.264 (yuv420p, BT.709) + AAC.

**Archivo final:** `Renders/HE_Agentic_Hub_Final.mp4`

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/` | Composición `HEAgenticHub` (`HEAgenticHub.tsx`), seis placas en `scenes/`, componentes en `components/`, línea de tiempo única en `timeline.ts`, marca en `brand.ts` |
| `assets/` | Fuentes Avantt y Satoshi (AB InBev Design System), locución, música y efectos |
| `previews/` | Imagen principal de cada placa |
| `Renders/` | MP4 final |
| `scripts/synth_audio.py` | Genera la música y los efectos originales por síntesis (numpy) |

## Guion (versión 4)

| Placa | Intervalo | Texto principal | Locución |
|---|---|---|---|
| 1 | 00:00–00:09,7 | Hoy: demasiadas tareas manuales · Punto de partida: dolores actuales | Hoy, cada contrato exige transcribir, cruzar datos y perseguir aprobaciones. Esos dolores son nuestro punto de partida. |
| 2 | 00:09,7–00:17,7 | Hoja de ruta: avanzar por olas (Hoy · dolores actuales → Ola 0 → Ola 1 → Ola 2 → Ola 3) | Avanzamos paso a paso: cada ola arranca cuando la anterior ya demostró que funciona. |
| 3 | 00:17,7–00:24,2 | Ola 0 · Validar antes de construir | Primero, en la ola cero, validamos reglas y datos, y medimos la línea base. |
| 4 | 00:24,2–00:36,7 | Ola 1 · MVP: ordenar, automatizar y consultar | Luego, en la ola uno, desarrollamos el MVP: una ficha única con contrato, soportes y reglas; el cálculo automático del cumplimiento, y consultas con IA. |
| 5 | 00:36,7–00:45,2 | Ola 2 · Pago y agentes, con control humano | Después, en la ola dos, la IA propone; las personas validan y aprueban. Finanzas paga. |
| 6 | 00:45,2–00:51,7 | Ola 3 · Evolución: negociar con evidencia | Finalmente, en la ola tres, un brief con evidencia fortalece la negociación. |
| 7 | 00:51,7–00:59,2 | Impacto esperado | La meta: cincuenta por ciento menos trabajo manual a seis meses. |
| 8 | 00:59,2–01:03,7 | HE Agentic Hub · VoBo para iniciar desarrollo | Aprobemos el inicio del desarrollo. |

"MVP" se pronuncia en inglés (em-vi-pi), sin énfasis: la frase pone el peso en lo que se construye. En pantalla aparece solo "MVP".

En la placa 1 cada tarea manual muestra su consecuencia, tomada de la matriz de dolor del AS-IS.

Código visual (tomado de la presentación To-Be v4.0): **amarillo = regla automática**, **contorno punteado = agente de IA (propone)**, **contorno negro sólido = persona (valida, aprueba, decide)**.

## Fuentes de contenido

- `AS-IS_HE_Agentic_Hub.md`, `TO-BE_HE_Gestion_Contratos_Cumplimiento_Pagos_v4.0.md`, `HE_Agentic_Hub_Propuesta_To-Be_v4.0.pptx`.
- KPIs: "−50 % de horas manuales a 6 meses" (meta, KPI de guarda) y "≈13 h/mes de la analista" (estimación de carga To-Be). La línea base se mide en el experimento E5.
- Olas y condiciones para avanzar (en el deck, "compuertas"; en pantalla, "Para avanzar"): Ola 0 Validar (reglas aprobadas, contratos con código, saldos conciliados) → Ola 1 MVP (coincide con el Excel + VoBo de negocio) → Ola 2 Pago y agentes (pagos en el flujo + agentes en su meta) → Ola 3 Evolución. Sin fechas: se fijan con el equipo técnico (V-21).

## Marca

- Colores medidos en píxeles del deck: `#F5E003`, `#14161A`, `#F7F8F9`, `#FDF9CD`, `#F0F1F2`, `#E0E2E6`, `#525966`, `#666F80`; coinciden con el AB InBev Design System.
- Fuentes: Avantt (títulos) y Satoshi (texto), archivos del AB InBev Design System.
- Logo: ni el deck (rasterizado) ni el design system incluyen un logo corporativo completo de AB InBev; por eso no se usa ninguno ni se reconstruye. Si se entrega el archivo oficial, puede añadirse en `scenes/P6Decision.tsx`.

## Audio

- Voz: ElevenLabs, voz "Herduin" (español de Colombia), modelo eleven_v4. Tomas originales en `assets/audio/voice/source_takes/` (versión 4: frases 3 y 5–8 de `v2A.mp3`; frase 1 de `v3A.mp3`; frase 4 de `v3B.mp3`, sin ediciones internas; frase 2 de `v4A.mp3`). Cada frase se corta y se funde solo dentro de silencios (márgenes por debajo de −40 dB). Las tres tomas se transcribieron con ElevenLabs Scribe y coinciden palabra por palabra con los subtítulos.; frases cortadas y normalizadas a −16 LUFS en `vo1…vo8.wav`. Sin cambios de velocidad.
- Música y efectos: síntesis propia (`scripts/synth_audio.py`), sin samples externos. La música baja automáticamente bajo la voz (`MUSIC` en `timeline.ts`).
- Mezcla final: −17,1 LUFS integrados, pico −2,5 dBFS. Cada frase del MP4 coincide con su archivo original (correlación ≥ 0,96, sin caídas).

## Comandos

```bash
npm i
npx remotion studio
python3 -I scripts/synth_audio.py
npx remotion render HEAgenticHub Renders/HE_Agentic_Hub_Final.mp4 --codec=h264 --audio-codec=aac --audio-bitrate=192k --crf=18 --pixel-format=yuv420p --color-space=bt709
```
