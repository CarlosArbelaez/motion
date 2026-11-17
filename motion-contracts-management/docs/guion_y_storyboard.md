# Contracts Management Finance Tech — Guion y storyboard (To-Be v4.0)

**Pieza:** motion graphic ejecutivo · 1920 × 1080 · 30 fps · 4:50 · español (voz de Colombia) con subtítulos.
**Audiencia:** stakeholders ejecutivos de la sesión de Vo.Bo. del 19-nov-2026.
**Estado de la iniciativa que comunica:** propuesta To-Be v4.0 para aprobación (no es un piloto ni una solución operativa).
**Estado de la pieza:** versión final, con locución, subtítulos sincronizados, música y efectos.

## Mensaje central

Hoy el ciclo de vida de un contrato de tecnología no se cierra. La propuesta lo cierra y lo reúne en un solo lugar:
la plataforma que diseñaremos, con un solo registro, alertas que exigen respuesta y un histórico de cada aprobación
y decisión. Ariba sigue siendo la fuente oficial. Primero se ordena, después se automatiza y solo al final entra la IA,
que propone mientras las personas validan y deciden.

## Decisiones editoriales acordadas

- Se dice **"respuesta"**, no "acuse".
- La plataforma se llama **"la plataforma que diseñaremos"**; no se usa el nombre provisional.
- **Sin arquitectura técnica**: es tema del Tech Lead. El video muestra qué encuentra cada persona.
- El plan se explica en tres escenas: **qué, cómo, y cuándo y con quién**. En la voz se dice "entregas"; el número de
  versión va en pantalla.
- Los dos escenarios (2 y 4 personas) se muestran con **solo los hitos** y como **estimación preliminar**; esfuerzo y
  costos quedan para la presentación.
- Duración objetivo: **hasta 5 minutos**.
- Identidad: **sistema de diseño de AB InBev** (Avantt, Satoshi y sus roles de color).

## Estructura

| Capítulo en pantalla | Escenas |
|---|---|
| 1 · Hoy | 2, 3 |
| 2 · La propuesta | 4, 5, 6, 7, 8 |
| 3 · IA con control | 9 |
| 4 · MVP y plan | 10, 11, 12, 13 |
| 5 · Decisiones | 14 |

Los tiempos por escena están en `tiempos.md` y los subtítulos en `subtitulos.srt` (ambos se regeneran con
`npx tsx scripts/export_docs.ts`).

---

## Escena 1 · Apertura

- **Locución:** Contracts Management Finance Tech. Hoy, el ciclo de vida de un contrato de tecnología no se cierra. Proponemos cerrarlo, con una plataforma donde todo se consulta en un solo lugar.
- **En pantalla:** título · "Hoy el ciclo no se cierra" → "El ciclo se cierra" · Un solo registro · Alertas que exigen respuesta · Histórico de cada aprobación y decisión.
- **Movimiento:** el anillo de 7 fases se dibuja y se detiene antes de "Decisión"; al decir "cerrarlo" se completa.

## Escena 2 · Punto de partida

- **Locución:** Hoy, cerca de doscientos veinte servicios y ciento setenta contratos se siguen con dos archivos de Excel, un correo automático y dos personas. El mismo dato se teclea tres veces. Por eso, el dashboard y las alertas pueden mostrar fechas distintas.
- **En pantalla:** ~220 · ~170 · 2 Excel · 1 correo · 2 personas · "El mismo dato se teclea 3 veces" · fecha A ≠ fecha B.
- **Movimiento:** el contrato recorre Ariba y los dos Excel dejando las marcas 1-2-3; al final las dos fechas se separan.

## Escena 3 · Alertas y riesgo

- **Locución:** Cada vencimiento genera hasta veintiséis correos, que no se pueden responder ni cerrar. Ninguna decisión de renovación queda registrada. Hay contratos fuera de Ariba, el repositorio oficial. Y nadie responde por el proceso de punta a punta.
- **En pantalla:** contador hasta ~26 · Sin respuesta / Sin cierre · «Urgente: vencido» · 0 decisiones registradas · Contratos fuera de Ariba · Proceso sin dueño.
- **Movimiento:** los sobres caen sobre la línea de tiempo y siguen llegando después del vencimiento; abajo aparecen las tres consecuencias.

## Escena 4 · El orden de la propuesta

- **Locución:** La propuesta sigue un orden. Primero, ordenar el proceso. Después, automatizar lo repetitivo. Y solo al final, inteligencia artificial. Porque automatizar un proceso roto solo hace más rápido el error.
- **En pantalla:** 1 Ordenar (10 cambios de proceso) · 2 Automatizar (8 automatizaciones en la plataforma) · 3 Usar IA (5 agentes).
- **Movimiento:** tres peldaños que suben, cada uno con su color (tinta, amarillo, morado = IA).

## Escena 5 · El nuevo ciclo

- **Locución:** Así recorre un contrato el nuevo ciclo. Primero se formaliza: con una sola captura, y la regla escrita decide si requiere contrato. Luego se registra: los datos clave nacen al firmar, los valida una persona, y se cruzan cada día con Ariba. Y después se vigila: con una alerta que exige respuesta y una decisión registrada. Si el servicio continúa, el ciclo vuelve al inicio.
- **En pantalla:** 3 bloques · 7 fases · estado del contrato · "Si el servicio continúa, vuelve a la Fase 1".
- **Movimiento:** el contrato avanza por el riel; la fase activa se enciende, cambia su estado y deja una etiqueta por mejora; la flecha de retorno cierra el ciclo.

## Escena 6 · La plataforma (nueva)

- **Locución:** Todo vive en un solo lugar: la plataforma que diseñaremos. Un registro único de servicios y contratos. Un dashboard, con descarga del reporte. Las alertas de cada persona. Y el histórico de aprobaciones: quién aprobó qué, cuándo y por qué. Ariba no se reemplaza: sigue siendo la fuente oficial, y ahí se sigue aprobando.
- **En pantalla:** una aplicación con navegación (Registro, Dashboard, Alertas, Decisiones, Histórico, Reglas) · "Se entra con el usuario corporativo" · tarjeta de SAP Ariba como fuente oficial.
- **Movimiento:** la navegación salta de módulo con la voz y el contenido cambia: tabla del registro, dashboard con "Descargar reporte", bandeja de alertas e histórico; al final entra Ariba, conectada a la plataforma.
- **Nota:** representación conceptual. Los datos de ejemplo se muestran como barras; solo se escriben módulos y estados documentados.

## Escena 7 · La alerta que exige respuesta

- **Locución:** La alerta cambia por completo. En lugar de veintiséis correos, una sola alerta, en la plataforma y por correo, para el dueño del servicio y su líder. Si no hay respuesta, escala a los sesenta y a los treinta días. Y siempre termina en una decisión: el dueño decide, su líder aprueba, y Procurement confirma.
- **En pantalla:** alerta con tres botones · 90 / 60 / 30 días · owner decide → líder aprueba → Procurement confirma.
- **Movimiento:** los 26 sobres se funden en una alerta; se dibuja el escalamiento y se completa la cadena de decisión.

## Escena 8 · Tres dueños

- **Locución:** Tres dueños responden por el proceso. El dueño del servicio y su líder, por cada contrato. Procurement, por la cobertura contractual y por Ariba. Y Value Creation, por el seguimiento y la calidad del dato.
- **Movimiento:** la casilla "nadie" se llena y se ramifica hacia tres tarjetas.

## Escena 9 · IA con control

- **Locución:** La inteligencia artificial llega después, y con límites claros. Lee el contrato y propone sus datos clave, cada uno con su cita. Una persona valida todas las fichas. La inteligencia artificial no decide, no aprueba, ni confirma ahorros.
- **En pantalla:** Contrato → la IA propone la ficha (con «cita») → una persona valida → registro · cuatro límites.

## Escena 10 · Qué haremos

- **Locución:** Esto es lo que haremos: siete entregas, sobre la misma plataforma. Las primeras cuatro forman el producto mínimo viable, sin inteligencia artificial. Los cimientos. El registro único y el dashboard. Las alertas. Y la decisión, con el histórico de aprobaciones. La quinta entrega trae el alta de solicitudes con la regla escrita. Y las dos últimas, la inteligencia artificial: la ficha del contrato, con un piloto de veinte contratos, y la consulta.
- **En pantalla:** siete entregas en fila, cada una con su número de versión: 1 a 4 (v0.1.0 a v1.0.0, MVP sin IA) · 5 (v1.1.0, sin IA) · 6 y 7 (v1.2.0 y v1.3.0, con IA).
- **Movimiento:** cada entrega entra al nombrarse, bajo la franja de su grupo.

## Escena 11 · Cómo lo haremos (nueva)

- **Locución:** Así lo haremos. Cada entrega resuelve un dolor completo, y solo arranca cuando la anterior cumple sus criterios de salida. Para el producto mínimo viable son cinco. Los dos Excel retirados. El dashboard y las alertas leyendo el mismo registro. Todos los contratos vigentes con su PDF en Ariba. La primera alerta cerrada con una decisión. Y los tres dueños operando.
- **En pantalla:** "Una entrega resuelve un dolor completo" → compuerta "Cumple sus criterios de salida" → "Arranca la siguiente entrega" · los cinco criterios de salida del MVP. Al pie: cómo se cubre lo que aún no llega.
- **Movimiento:** la compuerta se abre con la voz; cada criterio entra y se marca como cumplido.

## Escena 12 · Cuándo y con quién (nueva)

- **Locución:** Cuándo, y con quién. Arrancamos el veintitrés de noviembre, y hay dos escenarios. Con dos personas dedicadas, el producto mínimo viable estaría listo hacia el diez de mayo de dos mil veintisiete, y la propuesta completa, hacia el veinte de septiembre. Con cuatro personas dedicadas, el producto mínimo viable llegaría hacia el primero de marzo, y la propuesta completa, hacia el diecisiete de mayo. Es una estimación preliminar, por validar con el líder técnico.
- **En pantalla:** dos líneas de tiempo paralelas desde el 23-nov-2026 sobre un eje de meses: 2 personas (MVP ~24 semanas, ~10-may-2027; To-Be completo ~43 semanas, ~20-sep-2027) y 4 personas (MVP ~14 semanas, ~1-mar-2027; To-Be completo ~25 semanas, ~17-may-2027). Sello "Estimación preliminar · por validar con el Tech Lead".
- **Movimiento:** cada barra crece a escala real y los hitos se marcan al decir su fecha.
- **Fuera, por decisión editorial:** semanas-persona, esfuerzo adicional por coordinación y costos (van en la presentación); duración de cada entrega (solo hitos).

## Escena 13 · Metas e indicadores

- **Locución:** Estas son las metas. De tres capturas del mismo dato, a una. De veintiséis correos, a una sola alerta. Todos los contratos vigentes con su PDF en Ariba. Al menos el noventa y cinco por ciento de las alertas con decisión a tiempo. Y todas las aprobaciones y decisiones, en un solo histórico. El impacto de la inteligencia artificial llega después del producto mínimo viable: reducir el tiempo de lectura, captura y validación de cada contrato. Su meta se fija con un piloto.
- **En pantalla:** cinco metas "hoy → meta" y la tarjeta "El impacto de la IA · después del MVP". Al pie: 12 % → 63 % de pasos no humanos.

## Escena 14 · Lo que necesitamos

- **Locución:** Para arrancar, necesitamos seis definiciones. El visto bueno de la propuesta. Elegir el escenario: dos o cuatro personas. Cerrar las reglas de negocio pendientes. Aprobar los tres dueños. Nombrar un responsable para cada dependencia. Y validar el nombre de la plataforma. Con su visto bueno, la primera entrega arranca el veintitrés de noviembre.
- **En pantalla:** seis tarjetas numeradas · "Con el Vo.Bo., la primera entrega arranca el 23 de noviembre".
- **Movimiento:** vuelve el fondo amarillo de la apertura; el anillo se cierra con un visto bueno.

---

## Audio

- **Voz:** ElevenLabs, voz "Herduin" (español de Colombia), modelo `eleven_v4`. Una toma por escena, normalizada a −16 LUFS.
- **Música y efectos:** originales, sintetizados con `scripts/synth_audio.py` (sin samples ni pistas externas).
- **Mezcla:** la música baja bajo la voz y sube en el cierre; los efectos están atados a las palabras de la locución.
- **Subtítulos:** tiempos por palabra tomados de la transcripción de la voz real; máximo dos líneas, en franja propia.
