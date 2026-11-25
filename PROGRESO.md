# PROGRESO — "Mi 2026 en BrewTech" (video estilo Wrapped)

## Fase actual
**Fase 1 — Guion: ENTREGADA, pendiente de GO.** `guion.md` v1 (local, no versionado: contiene cifras internas).
Fase 0 aprobada con GO el 25-nov-2026 (ranking v2 por impacto en el negocio).

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
