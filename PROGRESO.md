# PROGRESO — "Mi 2026 en BrewTech" (video estilo Wrapped)

## Fase actual
**Rehaciendo guion tras comentarios de Carlos al video completo (v1 de 60 s en `review/completo-v1.mp4`).** `guion.md` v3 (90 s) ENTREGADO, pendiente de GO. Con el GO: regenerar voz (Yohan) de las tarjetas del top, la #1 y la sección de áreas; actualizar `data/guion.json`; rehacer escenas.
Comentarios de Carlos: (1) no se distinguen las secciones; (2) el resumen no se diferencia del top 5; (3) no queda claro de qué trata cada iniciativa ni su impacto: usar problema / solución / impacto; (4) los agradecimientos deben ser un recopilado de todas las áreas con las que se trabajó, para comunicar que BrewAI trabaja con cualquier dependencia.
Decisiones de Carlos (25-nov): video de ~90 s con las 5 iniciativas; solo áreas de negocio (sin equipos de TI); cifras de impacto esperado según la tabla del guion v3.

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
