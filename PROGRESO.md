# PROGRESO — "Mi 2026 en BrewTech" (video estilo Wrapped)

## Fase actual
**Video completo v2 (guion v3, ~96 s): ENTREGADO, pendiente de GO.** `review/completo-v2.mp4` (540×960, con voz y subtítulos, sin música). La v1 de 60 s quedó en `review/completo-v1.mp4`.
Cambios por los comentarios de Carlos: cortinillas de sección numeradas (01 a 04) e indicador en la cabecera; resumen en fondo claro; tarjetas del top con Problema / Solución / Impacto esperado, sincronizadas con las pausas reales de la voz; sección "Con quién trabajamos" con 14 áreas de negocio.
Duración real: 95,7 s (Carlos aprobó ~90 s). La voz de Yohan es lenta: se acelera 18 % y se recortan pausas (`scripts/voz.sh`). Para bajar a 90 s habría que quitar texto.
Siguiente tras el GO: Fase 5 (música dubstep enérgica pero profesional, mezcla, efectos, checklist).
Composición `Pulso` en `src/Pulso.tsx`; tiempos y momentos de cada frase en `data/tiempos.json` (`scripts/tiempos.py`); vista previa con `scripts/preview.sh <salida> [desde-hasta]`.

**Ronda de comentarios 2 de Carlos (sobre `completo-v2.mp4`):** (1) no se entiende el impacto esperado que genera la IA → hecho con su GO: bloque "Con IA · esperado" con barra hoy → con IA y voz "Con IA, esperamos…" (`review/completo-v4.mp4`, 97,5 s); (2) voz un punto más baja → hecho (-17,5 LUFS); (3) tiene un zip de ilustraciones SVG → pendiente de que lo adjunte; (4) transiciones aburridas, referencia misterhorse.com (dominio bloqueado aquí) → hecho: 5 tipos de corte en `src/components/Cortes.tsx` (estela, persianas, columnas, diagonal, obturador). Vista previa: `review/completo-v3.mp4`.

**Ronda de comentarios 3 de Carlos (sobre `completo-v4.mp4`):** (1) problemas de legibilidad y textos montados → tarjetas rehechas (todo apilado, columnas separadas, rótulos en Avantt, más aire, cintas más pequeñas, subtítulos sin trozos huérfanos); (2) el cierre de áreas debe decir que resolvemos cualquier reto de cualquier equipo, pero con IA → "Cualquier equipo. Cualquier reto. Con IA, lo resolvemos." Vista previa: `review/completo-v5.mp4` (98,5 s). Pendiente de GO.

**Ilustraciones (25-nov):** Carlos adjuntó un zip de 25 doodles SVG ("Free Doodle Illustrations", de terceros; licencia por confirmar). Copiados a `input/ilustraciones/` (no versionados). Se usan 4, una por cortinilla de sección, recoloreadas a la paleta con `scripts/ilustraciones.py` (salida en `public/ilustraciones/`, no versionada): 01 persona en laptop, 02 ajedrez, 03 persona con chatbot, 04 persona caminando. Vista previa: `review/completo-v6.mp4`. Pendiente de GO.

**Ronda de comentarios 4 de Carlos (sobre `completo-v6.mp4`):** (1) las ilustraciones no aportan → quitadas; (2) eliminar la cortinilla 01 → hecho; (3) la cortinilla 04 no cumple función y el cierre debe mejorar → cortinilla quitada y cierre rehecho en dos tiempos (promesa y firma con logo); (4) usar la skill motion-pro → librería instalada en `src/motion/` (presets, texto, transiciones, galería `MotionPro` en Studio) y auditor en `scripts/motion-audit.mjs`; nota de movimiento de C a A. Aplicado: curvas de la librería (`src/curvas.ts`), nombres en cascada de letras, destello al revelar el impacto, deriva lenta por escena, salida del contenido antes de cada corte, firma con TrackingIn y Marquee. No hay assets de Mister Horse en este entorno (los sonidos se resuelven en la Fase 5). Vista previa: `review/completo-v7.mp4` (97,1 s). Pendiente de GO.

## Hecho
- No existía un proyecto de video previo en el repo (solo README y skills de Remotion). Se creó un proyecto **Remotion 4.0.547 + TypeScript** en la raíz.
- Carpetas creadas: `input/`, `input/fonts/`, `input/icons/`, `data/`, `review/stills/`, `output/`.
- `.env` agregado a `.gitignore`.
- Conector de ElevenLabs disponible en la sesión (se usará en la Fase 3; no hace falta clave en `.env`).

## Pendiente para cerrar la Fase 0
- [x] Fuente de datos: links de artefactos de claude.ai (sí se pueden leer). Cargado: Pareto Promos (https://claude.ai/artifact/KrHRsejG8vNxSojEwV2jKo).
- [x] Primer lote recibido como adjuntos (25-nov): Prometeo, OTC Invoice Reconciliation, Bloqueos/Desbloqueos (Master Data Control LITE), Gestión de Cambios ServiceNow, ATR Open Items. Copiados a `input/tobe/` (no versionados).
- [x] Lotes 2 y 3 recibidos: ATR TO-BE v3, Mix MACO, Spare Management II, Pagos MX (md + pptx), HE (md + pdf), Pareto v1.2, Contracts Management. Total: 11 iniciativas.
- [x] `data/iniciativas.json` con las 11 iniciativas, cifras del año y ranking propuesto. Resumen para revisar: `review/fase0-inventario.md`.
- [ ] Esperando GO de Carlos para la Fase 1 (y respuestas: título, cifras sensibles, ranking).
- [x] Fuentes: Avantt SemiBold y Satoshi Regular + tokens del sistema de diseño, tomados del deck de Pareto. Falta Satoshi Medium (opcional).
- [ ] Opcional: íconos de AB InBev en `input/icons/` y logo de BrewTech en `input/`.
- [ ] Extraer `data/iniciativas.json`, cifras del año, ranking y vacíos de datos.
- [ ] Pregunta de control: ¿hay cifras que no se puedan mostrar en redes públicas?

## Decisiones aprobadas
- El video habla como **el equipo de BrewAI** (no en primera persona). Carlos es AI Service Owner.
- Logo del cierre: BrewAI (versión clara para fondo oscuro, tomada del deck de Pareto; PNG 571×145, pedir SVG o PNG más grande).
- Título: **"Brew AI: Pulso 2026"**.
- Difusión solo en canales internos (no redes públicas): las cifras en dinero se pueden mostrar.
- Regla de cifras: como finales solo las que tengan certeza (líneas base y alcance reales); los impactos de los To-Be son estimados del equipo y se rotulan así.
- Ranking por impacto en el negocio (v2 propuesto: Pareto, HE, Prometeo, Pagos MX, ATR; pendiente de GO).
- Aún no hay cifras de ahorro real; Carlos verá si las consigue. Mientras tanto se trabaja con cifras de alcance y diseño.

## Cambios pedidos
- (ninguno todavía)

## Notas importantes
- **El repo de GitHub es público.** `input/`, `data/`, `review/` y `output/` están en `.gitignore`: datos internos, fuentes y videos NO se suben. Como el contenedor es efímero, en una sesión nueva hay que volver a leer los artefactos (los links quedan aquí).
- Pareto Promos es una propuesta To-Be (MVP sin construir): no tiene impacto realizado, solo cifras de alcance y estimación.
- Fuentes disponibles: Avantt SemiBold (no Bold) y Satoshi Regular (no Medium). Se usan esas mientras Carlos no pase otros pesos.
- Render en esta sesión: Remotion no puede descargar su navegador; se usa `--browser-executable` con el Chromium preinstalado (ver `scripts/stills.sh`).
- El código fuente no lleva cifras ni textos internos: todo sale de `data/guion.json`. Para compilar en una sesión nueva hay que restaurar `data/guion.json`, `public/fonts/` y `public/logo-brewai.png` (no versionados).
- Pedido de Carlos para la Fase 4: animación fluida tipo Wrapped con buenas prácticas de Remotion; debe verse como motion graphic profesional.
- La referencia de kittl.com no se pudo abrir (dominio bloqueado en este entorno).
- Música (Fase 5): Carlos quiere dubstep muy enérgico sin perder el tono profesional. El conector de ElevenLabs de esta sesión no genera música; evaluar el generador de música de Magnific o una pista que pase Carlos.
- Ajustes de voz: en la #1 se cortó la última frase del audio para caber en 60 s ("4 países" y la línea descriptiva quedan en pantalla); en la #2 la voz dice "High End Agentic Hub".
- **Contexto de BrewAI (dicho por Carlos, 25-nov):** BrewAI es un equipo multidisciplinario de IA que combina Tech y Data; todo el trabajo es interno de BrewAI, con ayuda de los equipos dueños de cada proceso (OTC, HE, ATR, etc.). No se agradece a equipos de TI o tecnología externos ni se dice que otros construyen la solución. En "Gracias" solo van equipos dueños de proceso: se quitó "Tecnología" (entró Value Creation, dueño del proceso de contratos) y la voz dice "equipos dueños de cada proceso".

## Ronda v8 (25 nov 2026)
- Fuera la escena "y además": solo las iniciativas del ranking. Total 94,7 s.
- Menos texto por cuadro: cada tarjeta muestra un bloque a la vez (Problema, Solución, Con IA); áreas en dos tiempos.
- Motion-pro: BounceIn en la cifra de impacto, StaggerFrom en las áreas, revisión con tiras de fotogramas, lista SOUND_CUES en `src/sonido.ts`. Auditor: nota A.
- Entregado `review/completo-v8.mp4`. Pendiente: GO para Fase 5 (música y sonido).

## Fase 5 · música y sonido (25 nov 2026)
- Música: pista dubstep a 140 BPM compuesta por código (`scripts/musica.py` → `public/musica/pulso.wav`), con secciones alineadas a los cortes. Magnific no pudo generarla (plan gratuito sin usos de música). Reemplazable por otra pista con el mismo nombre de archivo.
- Efectos: 25 sonidos sintéticos (`node scripts/motion-make-sfx.mjs` → `public/sfx/`), colocados en cortes, cambios de bloque, cifra de impacto y firma (`src/sonido.ts`).
- Mezcla: la música baja mientras habla la voz (≈10 dB por debajo) y sube en silencios y cortes.
- Entregado `review/completo-v9.mp4`. Pendiente: GO para Fase 6 (render final).

## Ronda v10 (25 nov 2026)
- Fuera la cortinilla 3 (solo queda la del ranking).
- Voz de las tarjetas regrabada con problema/reto → solución → resultado; ritmo más pausado (tempo 1,08). Total 115,4 s.
- Música regenerada para la nueva duración. Entregado `review/completo-v10.mp4`. Pendiente: GO para Fase 6.

## Fase 6 · entrega final (25 nov 2026)
- `output/BrewTech_2026_vertical_v1.mp4` (1080×1920, 30 fps, H.264, 115,4 s, 19,5 MB, −14,8 LUFS).
- `output/BrewTech_2026_vertical_v1_sin_voz.mp4` (música y efectos, subtítulos en pantalla).
- `output/BrewTech_2026_miniatura.png` y `output/BrewTech_2026_vertical_v1.srt`.
- Pendiente opcional: Fase 7 (versión 16:9).

## Brew AI Pulse 2026 · pills por pillar (27 nov 2026)
- Cambio de encargo: ya no hay Top 5. Son pills verticales, una por pillar, con las iniciativas al aire. El video del Top 5 queda archivado como referencia.
- Cada pill: cortinilla de entrada (solo cambia el pillar), y por iniciativa nombre + qué es, problema, solución con IA e impacto (dinero y proceso); cortinilla de cierre.
- Reglas: cifras en dinero del Excel de cifras, redondeadas, sin periodo y sin sumar entre iniciativas; fuera lo que no tenga ninguna cifra de impacto; Contact Model en una sola pill; logo BrewAI con su degradado (única excepción).
- Fuente de contenido: `output/BrewAI_Pulse_2026_recopilacion_v4.xlsx` (9 pills, 31 iniciativas; 13 documentadas).
- Código: `src/pulse/` (escenas y composición), `scripts/pulse.py <id>` (voz y tiempos), `scripts/musica.py <tiempos> <salida>`.
- Pill piloto entregada: Marketing & Revenue (`review/pulse-marketing-revenue-v1.mp4`, 65,6 s). Pendiente: aprobación del formato.
- 27 nov: formato de la pill piloto aprobado. Datos listos para Commercial & Martech y Finance (`data/pulse/`). BLOQUEO: se agotó la cuota de ElevenLabs (quedan 158 créditos). Voz ya descargada: intros de ambas y Label Hub. Faltan 5 clips: CCI Synapse, Modeloramas, ATR Intercompany, Tokens, Tornaguías (≈1.375 créditos por toma).
- 27 nov (tarde): cuota de ElevenLabs recargada; una sola toma por clip a pedido de Carlos. Pills producidas: Marketing & Revenue, Commercial & Martech y Finance (`output/BrewAI_Pulse_2026_<Pillar>.mp4` + `.srt`). Pendientes por falta de documentación: Contact Model (4 frentes), Logistics, Supply (3 SORBA), Procurement (Touchless PSS), Compliance, Technology & People.
