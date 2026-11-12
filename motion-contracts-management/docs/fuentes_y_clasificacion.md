# Fuentes y clasificación de las afirmaciones

## Documentos leídos

| Abrev. | Documento | Uso |
|---|---|---|
| **PRE** | `Contracts_Management_Finance_Tech_Propuesta_ToBe_v3.2.pdf` (lectura previa, 19 págs.) | Fuente principal de cifras, metas y decisiones |
| **TOBE** | `TO-BE_Contracts_Management_Finance_Tech.md` (v3.2, 11-nov-2026, "En revisión") | Detalle del proceso, estados, reglas |
| **EJE** | `Contracts_Management_Finance_Tech_Presentacion_Ejecutiva_v3.2.pptx` (16 láminas; son imágenes, con notas) | Narrativa, identidad visual |
| **SES** | `Session_Contracts_Management_Finance_Tech_Propuesta_v3.2.pptx` (7 láminas editables) | Paleta y tipografías declaradas, escenarios A/B |

Estado de la iniciativa en todas las fuentes: **propuesta de consultoría para Vo.Bo.** del 17-nov-2026.

## Clasificación (lo que dice el video y cómo se presenta)

| Escena | Afirmación | Tipo | Fuente |
|---|---|---|---|
| 2 | ~220 servicios y ~170 contratos | Hecho documentado (**cifras declaradas**, así se rotula) | PRE §1.1 · TOBE ficha |
| 2 | Dos Excel, un correo automático y dos personas | Hecho documentado | PRE resumen ejecutivo |
| 2 | El mismo dato se captura 3 veces (Ariba y dos Excel) | Hecho documentado | PRE §1.3 |
| 2 | Dashboard y alertas pueden mostrar fechas distintas | Hecho documentado (riesgo, no caso medido; se muestra como "fecha A ≠ fecha B", sin fechas inventadas) | PRE §1.3 |
| 3 | Correo martes y jueves desde 90 días antes; hasta ~26 por contrato; sin acuse ni cierre; sigue como "Urgente: vencido" | Hecho documentado | PRE §1.4 |
| 3 | 0 decisiones de renovación registradas ("el ciclo nunca registra una decisión") | Hecho documentado | PRE §1.2 · SES lám. 1 |
| 4 | Contratos fuera de Ariba / en correos de exempleados; vencidos sin decisión; sin dueño desde Vendor Management | Hecho documentado | PRE §1.5 · SES lám. 1 |
| 5 | Orden optimizar → automatizar → agentizar; 10 cambios, 8 automatizaciones, 5 agentes | Hecho documentado (diseño de la propuesta) | PRE §2.1–2.5 |
| 6 | 3 bloques, 7 fases, 37 tarjetas, 7 compuertas; estados del contrato | Hecho documentado (diseño) | PRE §3.1, §3.9 |
| 7 | Tarjeta en Teams con tres botones, recordatorio semanal, escalamiento a 60 y 30 días | Hecho documentado (diseño) | PRE §3.6 |
| 7 | Preaviso de 90 días por defecto | **Condición**: lo fija una política de Value Creation, aún por definir (P18) | PRE §3.4, §6.5 |
| 8 | Modelo de tres dueños | **Propuesta por aprobar** en el Vo.Bo. (así se rotula) | PRE §2.3 |
| 9 | La IA propone con cita; una persona valida todas las fichas; límites de la IA | Hecho documentado (diseño) | PRE §2.5, §3.4 |
| 9 | La IA llega en Olas 2 y 3 | Alcance futuro, no inicial | PRE §5, §6.2 |
| 10 | MVP = Olas 0 y 1, sin agentes de IA, sobre Microsoft 365 | Alcance inicial propuesto | PRE §5 |
| 10 | Ola 2: piloto de 20 contratos; aval de Seguridad y Compliance | **Condición** | PRE §6.2, §6.3 · SES lám. 4 |
| 10 | Una ola arranca cuando la anterior cumple su salida | **Condición** | PRE §6.2 |
| 11 | 3 → 1 capturas · ~26 → 1 aviso · 100 % vigentes con PDF en Ariba · ≥ 95 % alertas con decisión | **Metas** (rotuladas META) | PRE §3.12 |
| 11 | 12 % → 62 % de pasos no humanos (4 de 34; 56 de 90) | **Característica del diseño**, no resultado medido (rotulada DISEÑO; "mide pasos, no horas") | PRE §4.1 |
| 11 | El impacto de la IA (reducir el tiempo de lectura, captura y validación) llega después del MVP, en las Olas 2 y 3; su meta se fija con un piloto de 20 contratos | **Beneficio cualitativo documentado**, sin cifra; la meta queda sujeta al piloto (TL7) | PRE §3.4, §3.12 · SES lám. 5 |
| 12 | Tres decisiones: diseño, alcance del MVP, gobierno | Decisión solicitada | PRE §7 · EJE lám. 2 y 16 |
| 12 | Elegir el equipo; MVP hacia fines de enero de 2027 (4 personas) o mediados de marzo (2) | **Estimación** preliminar, por validar con el Tech Lead (así se rotula) | SES lám. 6 y 7 |
| 12 | La Ola 0 arranca el 18 de noviembre | **Condición**: sujeta al Vo.Bo. | PRE §7 |

No hay **resultados medidos** en las fuentes (la iniciativa no se ha implementado) y el video no presenta ninguno.

## Lo que se dejó fuera a propósito

- **Antecedente de ~USD 600.000** en consolidación on-site: las fuentes insisten en que es un caso pasado, no una meta ni un ahorro comprometido. Se omitió para que no se lea como promesa.
- **Duraciones por ola** ("~3", "~6–8 semanas") y "MVP en unas 9 a 11 semanas": ver la discrepancia de abajo.
- **Nombres propios** del equipo: el video habla de roles.
- Detalle de umbrales de la DAG, bandas de aprobación y arquitectura de tres capas: están en la lectura previa.

## Discrepancia entre fuentes (resuelta de forma conservadora)

- **PRE y EJE** piden **tres decisiones** y describen el MVP como "unas 9 a 11 semanas" (orden de magnitud).
- **SES** (el archivo más reciente, 11-nov 22:20 UTC) pide **cinco cosas** — las mismas tres, más elegir el Escenario A o B
  y cerrar reglas y responsables de dependencias — y estima el MVP en ~10 semanas con 4 personas (~27-ene-2027)
  o ~17 semanas con 2 (~17-mar-2027), como **estimación preliminar pendiente de validar con el Tech Lead**.

Cómo quedó en el video: las **tres decisiones** comunes a todas las fuentes son el llamado a la acción; la elección del
equipo aparece como cuarto punto "para fijar el calendario", con las fechas de SES rotuladas como estimación preliminar.
No se afirma "9 a 11 semanas". Si la sesión va a usar solo una de las dos versiones, basta editar `src/scenes/S12.tsx`.

## Identidad visual

- **Colores:** tomados de los valores del tema de las presentaciones (`F5E003` amarillo, `14161A` tinta, `591B9D` morado para IA, grises `525966`/`666F80`/`E0E2E6`).
- **Logotipo:** las fuentes no incluyen ninguno; el video no usa ni reconstruye logotipos.
- **Tipografía — PROVISIONAL:** las presentaciones declaran **Avantt** (títulos) y **Satoshi** (texto), pero no vienen
  incrustadas y no se pudieron obtener en este entorno. Se usan sustitutos de licencia abierta: **Outfit**, **DM Sans** y
  **DM Mono**. Para usar las oficiales: copiar sus `.woff2` a `public/assets/fonts/` y cambiar las rutas en `src/theme.ts`.

## Terminología

- En el video se usa **"respuesta"** en lugar de "acuse" (término de las fuentes): significa que el dueño del servicio
  oprime cualquier botón de la tarjeta, lo que detiene los recordatorios. Cambio pedido para facilitar la comprensión.
