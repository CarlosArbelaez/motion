# HE Agentic Hub — motion graphic de 30 s (Remotion)

Video ejecutivo para pedir el VoBo de la VP de High End para iniciar el desarrollo de HE Agentic Hub.
1920 × 1080 · 30 fps · 900 fotogramas · MP4 H.264 + AAC.

**Archivo final:** `Renders/HE_Agentic_Hub_Final.mp4`

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/` | Composición `HEAgenticHub` (`HEAgenticHub.tsx`), seis placas en `scenes/`, componentes en `components/`, línea de tiempo única en `timeline.ts`, marca en `brand.ts` |
| `assets/` | Fuentes Avantt y Satoshi (AB InBev Design System), locución, música y efectos |
| `previews/` | Imagen principal de cada placa |
| `Renders/` | MP4 final |
| `scripts/synth_audio.py` | Genera la música y los efectos originales por síntesis (numpy) |

## Guion

| Placa | Intervalo | Texto principal | Locución |
|---|---|---|---|
| 1 | 00:00–00:04 | Hoy: demasiadas tareas manuales | Hoy, un contrato exige transcribir, cruzar datos y perseguir aprobaciones. |
| 2 | 00:04–00:11 | NOW · Ordenar, automatizar y consultar | El MVP reúne contrato, soportes y reglas; automatiza cálculos y habilita consultas con IA. |
| 3 | 00:11–00:17 | NEXT · Más capacidad, con control humano | Después, la IA propone; las personas validan y aprueban. Finanzas paga. |
| 4 | 00:17–00:21 | LATER · Negociar con evidencia | Luego, un brief con evidencia fortalece la negociación. |
| 5 | 00:21–00:27 | Impacto esperado | La meta: cincuenta por ciento menos trabajo manual a seis meses. |
| 6 | 00:27–00:30 | HE Agentic Hub · VoBo para iniciar desarrollo | Aprobemos el inicio del desarrollo. |

Código visual (tomado de la presentación To-Be v4.0): **amarillo = regla automática**, **contorno punteado = agente de IA (propone)**, **contorno negro sólido = persona (valida, aprueba, decide)**.

## Fuentes de contenido

- `AS-IS_HE_Agentic_Hub.md`, `TO-BE_HE_Gestion_Contratos_Cumplimiento_Pagos_v4.0.md`, `HE_Agentic_Hub_Propuesta_To-Be_v4.0.pptx`.
- KPIs: "−50 % de horas manuales a 6 meses" (meta, KPI de guarda) y "≈13 h/mes de la analista" (estimación de carga To-Be). La línea base se mide en el experimento E5.
- Condiciones de despliegue: MVP en paralelo con el Excel + VoBo de negocio (Compuerta 2); pagos en el flujo + agentes en su meta (Compuerta 3); agentes solo si su experimento lo justifica.

## Marca

- Colores medidos en píxeles del deck: `#F5E003`, `#14161A`, `#F7F8F9`, `#FDF9CD`, `#F0F1F2`, `#E0E2E6`, `#525966`, `#666F80`; coinciden con el AB InBev Design System.
- Fuentes: Avantt (títulos) y Satoshi (texto), archivos del AB InBev Design System.
- Logo: ni el deck (rasterizado) ni el design system incluyen un logo corporativo completo de AB InBev; por eso no se usa ninguno ni se reconstruye. Si se entrega el archivo oficial, puede añadirse en `scenes/P6Decision.tsx`.

## Audio

- Voz: ElevenLabs, voz "Herduin" (español de Colombia), modelo eleven_v4. Tomas originales en `assets/audio/voice/source_takes/`; frases cortadas y normalizadas a −16 LUFS en `vo1…vo6.wav`. Sin cambios de velocidad.
- Música y efectos: síntesis propia (`scripts/synth_audio.py`), sin samples externos. La música baja automáticamente bajo la voz (`MUSIC` en `timeline.ts`).
- Mezcla final: −16,4 LUFS integrados, pico −2,5 dBFS.

## Comandos

```bash
npm i
npx remotion studio
python3 -I scripts/synth_audio.py
npx remotion render HEAgenticHub Renders/HE_Agentic_Hub_Final.mp4 --codec=h264 --audio-codec=aac --audio-bitrate=192k --crf=18
```
