# HE Gestión de Contratos, Cumplimiento y Pagos — video de apertura (Remotion)

Video que abre la sesión con Mariana Cárdenas (Premium Brands & High End Director). Alineado con el To-Be v4.1 y la presentación "HE Propuesta To-Be · Mariana Cárdenas · final v2" (10 diapositivas): suma el desempeño del canal y cierra con las tres decisiones de High End, sin fechas, costos ni detalle de los escenarios de equipo.
1920 × 1080 · 30 fps · 2800 fotogramas (93,3 s) · MP4 H.264 (yuv420p, BT.709) + AAC.

**Archivo final:** `Renders/HE_Agentic_Hub_Final.mp4`

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/` | Composición `HEAgenticHub` (`HEAgenticHub.tsx`), seis placas en `scenes/`, componentes en `components/`, línea de tiempo única en `timeline.ts`, marca en `brand.ts` |
| `assets/` | Fuentes Avantt y Satoshi (AB InBev Design System), locución, música y efectos |
| `previews/` | Imagen principal de cada placa |
| `Renders/` | MP4 final |
| `scripts/synth_audio.py` | Genera la música y los efectos originales por síntesis (numpy) |

## Guion (versión 6, To-Be v4.1)

| Placa | Intervalo | Texto principal | Locución |
|---|---|---|---|
| 1 | 00:00–00:13 | Hoy: un Excel que ya no cuadra · los 5 dolores del deck v2 | Hoy partimos de cinco dolores: el contrato no está en datos, el volumen y el desempeño se arman a mano, la regla de pago no está escrita, los pagos no dejan rastro y nadie ve el estado real. |
| 2 | 00:13–00:20 | Hoja de ruta: paso a paso (Hoy → Ola 0 · Preparar → MVP → Completar → Validar → Sistema oficial → Escalar) | Avanzamos paso a paso: cada etapa arranca cuando la anterior ya demostró que funciona. |
| 3 | 00:20–00:31,5 | Ola 0 · Preparar las bases (4 puntos del deck + línea base de horas) | Primero, en la ola cero, preparamos las bases: reglas de pago aprobadas, cada contrato con su código, los indicadores del canal priorizados y los accesos a los datos. |
| 4 | 00:31,5–00:52 | MVP · el ciclo mensual completo y el canal cada día (6 pasos) | Luego construimos el MVP con el ciclo mensual completo, del contrato al pago. La IA prellena la ficha y la analista la valida; las reglas calculan el cumplimiento; trade da el OK, cada aprobador aprueba por correo y Finanzas paga. Y cada día, el desempeño del canal se ve en un tablero. |
| 5 | 00:52–01:07 | Después del MVP · completamos, conectamos y retiramos el Excel | Después completamos el resto: consulta por chat, alertas y un brief para negociar. Cuando los cortes coinciden con el Excel y High End da el visto bueno, el sistema pasa a ser oficial. Luego conectamos las demás fuentes del canal. |
| 6 | 01:07–01:19 | Impacto: cada peso pagado con regla, soporte y aprobador | Así, cada peso se paga con regla, soporte y aprobador, y el canal se ve cada día. La meta: cincuenta por ciento menos trabajo manual a seis meses. |
| 7 | 01:19–01:33 | Para arrancar: tres decisiones | Para arrancar, necesitamos tres decisiones: el visto bueno y la opción de equipo, el libro de reglas, y los indicadores del canal priorizados. Las reglas calculan, la IA propone y las personas deciden. |

Sin fechas, costos ni cifras de negocio (las da el deck); las únicas cifras son las de impacto (−50 % a 6 meses, meta; ≈13 h/mes, estimación). El tablero diario se presenta como informativo: para pagar vale el corte del día 10. "MVP" se pronuncia en inglés.

Código visual (tomado de la presentación To-Be v4.0): **amarillo = regla automática**, **contorno punteado = agente de IA (propone)**, **contorno negro sólido = persona (valida, aprueba, decide)**.

## Fuentes de contenido

- **Fuentes principales (v6):** `HE_Propuesta_To-Be_Mariana_Cardenas_final_v2.pptx`, `TO-BE_HE_Gestion_Contratos_Cumplimiento_Pagos_v4.1.md` y `HE_Propuesta_To-Be_v4.1_Documentacion_Detallada.pdf`: 5 dolores, Ola 0 · Preparar, MVP con desempeño del canal v1, Completar, Validar, Sistema oficial, Escalar, impacto y las tres decisiones.
- Antecedentes: `AS-IS_HE_Agentic_Hub.md`, `TO-BE_HE_Gestion_Contratos_Cumplimiento_Pagos_v4.0.md`, `HE_Agentic_Hub_Propuesta_To-Be_v4.0.pptx`.
- KPIs: "−50 % de horas manuales a 6 meses" (meta) y "≈13 h/mes de la analista" (estimación de carga To-Be). La línea base de horas se mide en la Ola 0.
- La condición de la IA del alta se muestra sin cifra: "la IA entra solo si demuestra su precisión; si no, la analista llena la ficha a mano".

## Marca

- Colores medidos en píxeles del deck: `#F5E003`, `#14161A`, `#F7F8F9`, `#FDF9CD`, `#F0F1F2`, `#E0E2E6`, `#525966`, `#666F80`; coinciden con el AB InBev Design System.
- Fuentes: Avantt (títulos) y Satoshi (texto), archivos del AB InBev Design System.
- Logo: ni el deck (rasterizado) ni el design system incluyen un logo corporativo completo de AB InBev; por eso no se usa ninguno ni se reconstruye. Si se entrega el archivo oficial, puede añadirse en `scenes/P6Decision.tsx`.

## Audio

- Voz: ElevenLabs, voz "Herduin" (español de Colombia), modelo eleven_v4. Tomas originales en `assets/audio/voice/source_takes/` (versión 6: una sola toma, `v6A.mp3`, cortada en 8 frases solo dentro de silencios; transcrita con ElevenLabs Scribe y verificada palabra por palabra).
- Música y efectos: síntesis propia (`scripts/synth_audio.py`), sin samples externos. La música baja automáticamente bajo la voz (`MUSIC` en `timeline.ts`).
- Mezcla final: −16,7 LUFS integrados, pico −2,7 dBFS. Cada frase del MP4 coincide con su archivo original (correlación ≥ 0,98, sin caídas).

## Comandos

```bash
npm i
npx remotion studio
python3 -I scripts/synth_audio.py
npx remotion render HEAgenticHub Renders/HE_Agentic_Hub_Final.mp4 --codec=h264 --audio-codec=aac --audio-bitrate=192k --crf=18 --pixel-format=yuv420p --color-space=bt709
```
