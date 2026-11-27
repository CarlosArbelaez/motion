# Contract Management Tech — Guion y storyboard (To-Be v5.1)

**Pieza:** motion graphic ejecutivo · 1920 × 1080 · 30 fps · español (voz de Colombia) con subtítulos.
**Duración total: 6:21 (11444 frames a 30 fps)**
**Audiencia:** negocio, para el Vo.Bo. de la propuesta y la elección del escenario.
**Estado de la iniciativa que comunica:** propuesta To-Be v5.1 para aprobación (no es un piloto ni una solución operativa).

## Mensaje central

Hoy el ciclo de vida de un contrato de tecnología no se cierra. La propuesta lo cierra con un proceso de 7 fases que
es el mismo en tres formas de construirlo: Completo (plataforma propia con IA), Lite A (herramientas de la compañía
con API de SAP Ariba) y Lite B (las mismas herramientas, sin API). El video no recomienda ninguno: muestra qué cambia
en tiempo, costo y trabajo manual, y pide a negocio su Vo.Bo. y la elección del escenario.

## Decisiones editoriales acordadas

- Los **tres escenarios se presentan por igual**; decide negocio.
- Se **muestran los costos** y los tiempos. Las tres estimaciones están **validadas con el Tech Lead** (dato confirmado por el equipo después de la v5.1). Los costos cubren **solo el trabajo del equipo**: no incluyen los costos de consultas en BrewDat.
- La duración no es restricción: prima que la información esté completa.
- El cierre pide **Vo.Bo. al proceso y a las estimaciones** y **elegir el escenario**; después, tres definiciones.
- Se **nombran las herramientas** del Lite (sin logotipos).
- Lite A depende de que SAP Ariba tenga una API que lea y escriba; si no, queda Lite B. **HighQ** va como definición pendiente.
- Nombre de la plataforma del Completo: **«BrewContracts», propuesto y marcado «por validar»**. Solo aparece en pantalla
  (constante `PLATFORM_NAME` en `src/scenes/S09.tsx`); la voz dice «la plataforma», así el nombre se cambia sin regrabar.
- Se dice **«respuesta»**, no «acuse». **PxQ** se dice tal cual.
- Después del MVP se habla de **«olas»**, como en la propuesta.
- Identidad: **sistema de diseño de AB InBev** (Avantt, Satoshi y sus roles de color).

## Estructura

| Capítulo en pantalla | Escenas |
|---|---|
| Apertura | 1 |
| 1 · Hoy | 2–3 |
| 2 · El proceso | 4–7 |
| 3 · Tres escenarios | 8–11 |
| 4 · Plan y costos | 12–14 |
| 5 · Decisiones | 15 |

## Escenas

### 1. Apertura

**Locución:** Contract Management Tech. Hoy, el ciclo de vida de un contrato de tecnología no se cierra. Proponemos un proceso que lo cierra, y tres formas de construirlo.

**En pantalla:** Portada amarilla: título, el ciclo que se cierra y tres rótulos (un mismo proceso · tres formas de construirlo · negocio elige el escenario).

### 2. Punto de partida

**Locución:** Hoy, cerca de doscientos veinte servicios y ciento setenta contratos se siguen con dos archivos de Excel, un correo automático y dos personas. El mismo dato se teclea tres veces. Por eso, el dashboard y las alertas pueden mostrar fechas distintas.

**En pantalla:** Cifras declaradas del punto de partida: ~220 servicios, ~170 contratos, 2 Excel, 1 correo, 2 personas; el dato se captura 3 veces.

### 3. Alertas y riesgo

**Locución:** Cada vencimiento genera hasta veintiséis correos, que no se pueden responder ni cerrar. Ninguna decisión de renovación queda registrada. Hay contratos fuera de Ariba, el repositorio oficial. Y nadie responde por el proceso de punta a punta.

**En pantalla:** Hasta ~26 correos por contrato sin respuesta ni cierre; decisiones sin registro; contratos fuera de Ariba; proceso sin dueño.

### 4. El orden de la propuesta

**Locución:** La propuesta sigue un orden. Primero, ordenar el proceso. Después, automatizar lo repetitivo. Y solo al final, inteligencia artificial. Porque automatizar un proceso roto solo hace más rápido el error.

**En pantalla:** Tres pasos en orden: ordenar, automatizar y, al final, IA (la IA solo aplica al escenario Completo).

### 5. El nuevo ciclo

**Locución:** Así recorre un contrato el nuevo ciclo, igual en los tres escenarios. Primero se formaliza: el área registra la necesidad una sola vez, su líder la aprueba, y la regla escrita decide si requiere contrato. Luego se registra: los datos clave nacen al firmar, los valida una persona, y cada día se cruzan con Ariba y con el PxQ. Y después se vigila: con una alerta que exige respuesta y una decisión registrada. Si el servicio continúa, el ciclo vuelve al inicio.

**En pantalla:** Las 7 fases en 3 bloques, iguales en los tres escenarios; un contrato las recorre. Rótulos: una sola captura, su líder la aprueba, la regla escrita decide, el dato nace al firmar, lo valida una persona, alerta que exige respuesta, decisión registrada.

### 6. La alerta que exige respuesta

**Locución:** La alerta cambia por completo. En lugar de veintiséis correos, una sola alerta, para el dueño del servicio y su líder. Si no hay respuesta, escala a los sesenta y a los treinta días. Y siempre termina en una decisión: el dueño decide, su líder aprueba, y Procurement confirma.

**En pantalla:** Una sola alerta con botones de respuesta; escalamiento a 60 y 30 días; el dueño decide, su líder aprueba y Procurement confirma.

### 7. Tres dueños

**Locución:** Tres dueños responden por el proceso. El dueño del servicio y su líder, por cada contrato. Procurement, por la cobertura contractual y por Ariba. Y Value Creation, por el seguimiento y la calidad del dato.

**En pantalla:** Los tres dueños del proceso y de qué responde cada uno.

### 8. Tres formas de construirlo

**Locución:** El proceso es el mismo. Lo que cambia es cómo se construye, y hay tres formas. El escenario Completo: una plataforma propia, con inteligencia artificial, donde todo se consulta en una sola pantalla. Lite A: sin plataforma propia, con herramientas que la compañía ya tiene, y conectado a SAP Ariba por API. Y Lite B: las mismas herramientas, pero sin esa conexión. Los datos de Ariba se leen desde BrewDat, y Procurement escribe en Ariba a mano. Lite A solo es posible si SAP Ariba tiene una API que lea y escriba. Si no, queda Lite B.

**En pantalla:** Tres columnas: Completo, Lite A (con bandera de supuesto) y Lite B. Franja final: definición pendiente sobre la API de SAP Ariba.

### 9. Escenario Completo

**Locución:** En el Completo, todo vive en una sola plataforma. El registro de servicios y contratos. El dashboard, con descarga del reporte. Las alertas de cada persona. Y el histórico de aprobaciones: quién aprobó qué, cuándo y por qué. Además, la inteligencia artificial lee cada contrato y propone sus datos, con su cita. Una persona valida todo.

**En pantalla:** Representación conceptual de la plataforma del Completo (registro, dashboard, alertas, histórico). Nombre propuesto «BrewContracts», marcado «por validar». Tarjeta de IA.

### 10. Escenarios Lite

**Locución:** En el Lite no se construye una plataforma: se conectan herramientas que la compañía ya usa. Una aplicación en Power Apps, que se abre desde Teams. Power Automate, para las reglas y los avisos. Las alertas llegan como tarjeta en Teams y por correo. El dashboard es el reporte de Power BI que ya existe. Y las consultas se hacen con Genie o Insights Copilot. No hay inteligencia artificial que lea los contratos: una persona captura los datos de cada contrato, y otra los valida.

**En pantalla:** Cinco herramientas con su papel: Power Apps, Power Automate, Teams y correo, Power BI, Genie o Insights Copilot; franja de BrewDat; sin IA que lea contratos (~170 fichas a mano); diferencia Lite A / Lite B.

### 11. Comparación

**Locución:** Los tres resuelven los mismos dolores. Cambian el tiempo, el costo y el trabajo manual que queda. El Completo tarda y cuesta más. A cambio, deja todo en un solo lugar y quita la lectura manual de contratos. El Lite sale antes y cuesta menos. A cambio, reparte la información entre varias herramientas y deja más trabajo manual. En pasos automáticos, los tres quedan cerca: entre el sesenta y el sesenta y cinco por ciento, frente al doce por ciento de hoy.

**En pantalla:** Tabla comparativa de siete filas: dónde se trabaja, lectura del contrato, consulta de cláusulas, SAP Ariba, trabajo manual, riesgo principal y pasos automáticos (62 %, 65 %, 60 %; hoy 12 %).

### 12. MVP y olas siguientes

**Locución:** El alcance inicial, el producto mínimo viable, es igual en los tres. Un solo registro, y adiós a los dos Excel. El dashboard. Una alerta que exige respuesta. Cada solicitud y cada renovación, aprobada por una persona. Y el cruce diario con SAP Ariba y el PxQ. Después vienen más olas. En los tres, el alta de solicitudes con la regla escrita. En el Completo, además, la inteligencia artificial que lee contratos y responde consultas. Y en el Lite, la consulta en lenguaje natural y la revisión de consolidación.

**En pantalla:** MVP igual en los tres (5 puntos; semana 16, 13 o 12) y olas posteriores: alta con la regla de la DAG en los tres; 3 olas más en el Completo; 2 olas más en el Lite. Al pie, lo que queda fuera de la cotización.

### 13. Tiempos y costos

**Locución:** Cuánto tarda, y cuánto cuesta. Los tres arrancan el siete de diciembre, con dos personas dedicadas. El Completo: producto mínimo viable en la semana dieciséis. Todo el alcance, en treinta y tres semanas, hacia el veintitrés de julio, por noventa y un mil trescientos ochenta y cinco dólares. Lite A: producto mínimo viable en la semana trece. Todo el alcance, en veintidós semanas, hacia el siete de mayo, por sesenta mil novecientos veintitrés dólares. Lite B: producto mínimo viable en la semana doce. Todo el alcance, en veinte semanas, hacia el veintitrés de abril, por cincuenta y cinco mil trescientos ochenta y cinco dólares. Las tres estimaciones están validadas con el líder técnico. Estos costos son únicamente de nuestro trabajo: no contemplan los costos de consultas en BrewDat.

**En pantalla:** Tres barras desde el 7-dic-2026 con MVP, contingencia y resto; semanas, fecha de cierre y costo total de cada escenario; costo y fecha del MVP. Rótulos: estimaciones validadas con el Tech Lead; solo cubren el trabajo del equipo y no incluyen los costos de consultas en BrewDat.

### 14. Metas

**Locución:** Con cualquiera de los tres, estas son las metas. De tres capturas del mismo dato, a una. De veintiséis correos, a una sola alerta. De dos personas imprescindibles para mantener la base, a ninguna. Todos los contratos vigentes con su PDF en Ariba. Ningún contrato vencido sin decisión. Y un solo histórico con todas las aprobaciones y decisiones. Los ahorros en horas y en dinero se medirán desde el arranque, porque hoy no existe una línea base.

**En pantalla:** Seis metas: 3→1, ~26→1, 2→0, 100 % con PDF en Ariba, 0 vencidos sin decisión, 1 histórico. Los ahorros se medirán desde el arranque (no hay línea base).

### 15. Lo que necesitamos de negocio

**Locución:** Para arrancar el siete de diciembre, necesitamos dos decisiones de negocio. Primera: su visto bueno al proceso y a las estimaciones. Segunda: elegir el escenario. Completo, o Lite. Y para sostenerlas, tres definiciones. Confirmar si SAP Ariba tiene una API, y si HighQ guarda contratos. Los datos en BrewDat: las tablas de Ariba, el PxQ y los contratos originales. Y las reglas de negocio pendientes. Ustedes eligen el escenario. Nosotros arrancamos el siete de diciembre.

**En pantalla:** Cierre amarillo: dos decisiones (Vo.Bo. al proceso y a las estimaciones; elegir el escenario) y tres definiciones (SAP Ariba y HighQ, datos en BrewDat, reglas de negocio).

Tiempos exactos por escena: `docs/tiempos.md`. Subtítulos: `docs/subtitulos.srt`.
