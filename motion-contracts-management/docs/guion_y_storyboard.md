# Contracts Management Finance Tech — Guion y storyboard

**Pieza:** motion graphic ejecutivo · 1920 × 1080 · 30 fps · 4:28 · español (voz de Colombia) con subtítulos.
**Audiencia:** stakeholders ejecutivos de la sesión de Vo.Bo. (Procurement, Value Creation, Tecnología MAZ).
**Estado de la iniciativa que comunica:** propuesta To-Be v3.2 para aprobación (no es un piloto ni una solución operativa).

## Mensaje central

Hoy el ciclo de vida de un contrato de tecnología no se cierra. La propuesta lo cierra con un solo registro,
alertas que se responden y una decisión siempre registrada: primero se ordena el proceso, después se automatiza
lo repetitivo y solo al final entra la IA, que propone mientras las personas validan y deciden.

## Estructura narrativa

Punto de partida → riesgo → criterio de la propuesta → cómo funciona → gobierno → IA con control →
alcance inicial y evolución → metas → decisión. El hilo conductor es **un contrato** (el mismo ícono) que
se sigue desde la triple captura de hoy hasta el ciclo cerrado del To-Be.

| Capítulo en pantalla | Escenas |
|---|---|
| 1 · Hoy | 2, 3, 4 |
| 2 · La propuesta | 5, 6, 7, 8 |
| 3 · IA con control | 9 |
| 4 · MVP y plan | 10, 11 |
| 5 · Decisiones | 12 |

Los tiempos exactos por escena están en `tiempos.md`; los subtítulos, en `subtitulos.srt`. Ambos se generan
desde la locución real con `npx tsx scripts/export_docs.ts`.

---

## Escena 1 · Apertura (0:00–0:15)

- **Locución:** Contracts Management Finance Tech. Hoy, el ciclo de vida de un contrato de tecnología no se cierra. Esta propuesta lo cierra: con un solo registro, alertas que se responden, y una decisión siempre registrada.
- **Texto principal:** título de la iniciativa · "Hoy el ciclo no se cierra" → "El ciclo se cierra" · tres promesas.
- **Movimiento:** el título entra línea a línea; el anillo de 7 fases se dibuja y se detiene antes de "Decisión"; al decir "lo cierra" el trazo se completa. Las tres promesas aparecen con la voz.

## Escena 2 · Punto de partida (0:15–0:35)

- **Locución:** Hoy, cerca de doscientos veinte servicios y ciento setenta contratos de tecnología se siguen con dos archivos de Excel, un correo automático y dos personas. El mismo dato se teclea tres veces: en Ariba y en los dos Excel. Por eso, el dashboard y las alertas pueden mostrar fechas distintas para el mismo contrato.
- **Texto principal:** ~220 servicios · ~170 contratos · 2 Excel · 1 correo · 2 personas · "El mismo dato se teclea 3 veces".
- **Movimiento:** las cifras entran al nombrarse; el contrato recorre Ariba → Excel de la base → Excel del dashboard y deja una marca 1-2-3 en cada captura; al final se separan "fecha A ≠ fecha B".

## Escena 3 · Alertas hoy (0:35–0:54)

- **Locución:** Cuando un contrato se acerca a su vencimiento, llega un correo cada martes y cada jueves, desde noventa días antes. Son hasta veintiséis correos por contrato, que no se pueden responder ni cerrar. Después del vencimiento, siguen llegando. Y ninguna decisión de renovación queda registrada.
- **Texto principal:** contador hasta ~26 · "Sin acuse / Sin cierre" · «Urgente: vencido» · 0 decisiones registradas.
- **Movimiento:** los sobres caen uno a uno sobre la línea de tiempo mientras sube el contador; pasado el vencimiento siguen llegando en rojo; cierra la tarjeta "0 decisiones".

## Escena 4 · Riesgo para el negocio (0:54–1:07)

- **Locución:** El riesgo no es solo trabajo manual. Hay contratos fuera de Ariba, el repositorio auditable. Hay contratos que vencen sin una decisión. Y nadie responde por el proceso de punta a punta.
- **Texto principal:** tres riesgos: fuera de Ariba · vencen sin decisión · proceso sin dueño.
- **Movimiento:** el trabajo manual queda como contexto arriba; las tres tarjetas de riesgo suben una por frase.

## Escena 5 · El orden de la propuesta (1:07–1:29)

- **Locución:** La propuesta sigue un orden. Primero, ordenar: reglas escritas, dueños con nombre y un solo registro. Después, automatizar lo repetitivo: calcular fechas, conciliar, avisar y escalar. Y solo al final, inteligencia artificial, donde hay que leer documentos. Porque automatizar un proceso roto solo hace más rápido el error.
- **Texto principal:** 1 Ordenar (10 cambios de proceso) · 2 Automatizar (8 automatizaciones, Microsoft 365) · 3 Usar IA (5 agentes, de complejidad distinta).
- **Movimiento:** tres peldaños que suben en escalera, cada uno con su color (tinta, amarillo, morado = IA); cierra la frase criterio.
- **Capas diferenciadas:** optimización (proceso, reglas, responsabilidades), automatización (reglas fijas) e IA (lectura de documentos con validación humana).

## Escena 6 · El nuevo ciclo (1:29–2:00)

- **Locución:** Así recorre un contrato el nuevo ciclo. Primero se formaliza: la solicitud se captura una sola vez, la regla escrita de la política decide si requiere contrato, y su espacio en Ariba se abre desde el día uno. Luego se registra: los datos clave nacen al firmar, los valida una persona, y se concilian cada día con Ariba. Y después se vigila: con una alerta que exige acuse y una decisión registrada. Si el servicio continúa, el ciclo vuelve al inicio.
- **Texto principal:** 3 bloques · 7 fases · estado del contrato · "Si el servicio continúa, vuelve a la Fase 1".
- **Movimiento:** el contrato avanza por un riel bajo las 7 fases; el bloque activo se enciende en amarillo, el estado del contrato cambia (Solicitud → … → Vigente → En renovación) y cada mejora deja una etiqueta; al final la flecha de retorno cierra el ciclo y el contrato vuelve a la Fase 1.

## Escena 7 · La alerta que exige respuesta (2:00–2:22)

- **Locución:** La alerta cambia por completo. En lugar de veintiséis correos, una sola tarjeta en Teams, para el dueño del servicio y su líder. Un recordatorio semanal, solo hasta que alguien responde. Si no hay respuesta, escala a los sesenta y a los treinta días. Y toda alerta termina en una decisión: el dueño decide, su líder aprueba, y Procurement confirma.
- **Texto principal:** tarjeta con tres botones · 90 / 60 / 30 días · owner decide → líder aprueba → Procurement confirma.
- **Movimiento:** los 26 sobres se funden en una sola tarjeta; la línea de escalamiento se dibuja con sus hitos; la cadena de decisión se completa y queda registrada.
- **Nota:** la tarjeta es una representación conceptual; los botones son los documentados.

## Escena 8 · Tres dueños (2:22–2:38)

- **Locución:** Para que funcione, tres dueños llenan el vacío de hoy. El dueño del servicio y su líder responden por cada contrato. Procurement, por la cobertura contractual y por Ariba. Y Value Creation, por el seguimiento y la calidad del dato.
- **Texto principal:** "Dueño del proceso: nadie" → tres dueños y de qué responde cada uno.
- **Movimiento:** la casilla vacía (punteada) se llena y se ramifica hacia tres tarjetas.

## Escena 9 · IA con control (2:38–2:58)

- **Locución:** La inteligencia artificial llega después, y con límites claros. Lee el contrato y propone sus datos clave, cada uno con la cita de donde sale. Una persona valida todas las fichas antes de publicarlas. La inteligencia artificial no decide, no aprueba, no interpreta cláusulas, ni confirma ahorros.
- **Texto principal:** Contrato → la IA propone la ficha (con «cita») → una persona valida → registro · cuatro límites.
- **Movimiento:** el flujo avanza de izquierda a derecha con la voz; las citas se encienden; los cuatro "no" caen uno a uno.

## Escena 10 · Alcance inicial y evolución (2:58–3:28)

- **Locución:** El alcance inicial es el producto mínimo viable: las olas cero y uno. Cierra el ciclo sin agentes de inteligencia artificial, con herramientas de Microsoft tres sesenta y cinco que la compañía ya tiene. Después, la ola dos trae la ficha del contrato con inteligencia artificial, empezando con un piloto de veinte contratos. Y la ola tres, la consulta, el resumen de renovación y la búsqueda de servicios similares. Cada ola arranca solo cuando la anterior cumple sus criterios de salida.
- **Texto principal:** Ahora (MVP, Olas 0 y 1) · Después (Ola 2) · Luego (Ola 3) · compuertas de salida.
- **Movimiento:** tres columnas Now–Next–Later que entran en orden; las compuertas (✓) aparecen entre columnas al mencionar los criterios de salida.

## Escena 11 · Metas e indicadores (3:28–3:59)

- **Locución:** Estas son las metas. De tres capturas del mismo dato, a una. De veintiséis correos, a una tarjeta con acuse. El cien por ciento de los contratos vigentes con su PDF en Ariba. Al menos el noventa y cinco por ciento de las alertas con decisión antes del preaviso. Y los pasos automáticos del proceso pasan del doce al sesenta y dos por ciento. Lo que aún no prometemos: ahorros de tiempo con inteligencia artificial. Primero se mide la línea base, en el piloto.
- **Texto principal:** cinco indicadores "hoy → meta" y una tarjeta "Aún no se promete".
- **Movimiento:** cada tarjeta entra con su frase; las metas llevan la etiqueta META y el 12 % → 62 % la etiqueta DISEÑO.

## Escena 12 · Decisiones (3:59–4:28)

- **Locución:** Hoy pedimos tres decisiones. Uno: aprobar el diseño del proceso, versión tres punto dos. Dos: aprobar el alcance del producto mínimo viable, sin agentes de inteligencia artificial. Tres: aprobar el modelo de tres dueños y nombrar a sus responsables. Y para fijar el calendario, elegir con cuántas personas se construye. Con su visto bueno, la ola cero arranca el dieciocho de noviembre.
- **Texto principal:** 1 El diseño · 2 El MVP · 3 El gobierno · elección del equipo (estimación preliminar) · "Con el Vo.Bo., la Ola 0 arranca el 18 de noviembre".
- **Movimiento:** vuelve el fondo amarillo de la apertura; las tres decisiones entran al nombrarse; el anillo se cierra con un visto bueno y la pieza sostiene el cierre 3,5 s para leerlo.

---

## Audio

- **Voz:** ElevenLabs, voz "Herduin" (español de Colombia), modelo `eleven_v4`. Una toma por escena, normalizada a −16 LUFS.
- **Música y efectos:** originales, sintetizados con `scripts/synth_audio.py` (numpy, sin samples ni pistas externas).
- **Mezcla:** la música baja bajo la voz y sube en el cierre; los efectos son discretos y están atados a las palabras de la locución.
- **Subtítulos:** tiempos por palabra tomados de la transcripción de la voz real (ElevenLabs Scribe); máximo dos líneas, en franja propia.
