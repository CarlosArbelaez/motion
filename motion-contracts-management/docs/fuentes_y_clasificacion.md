# Fuentes y clasificación de las afirmaciones (To-Be v4.0)

## Documentos leídos

| Abrev. | Documento | Uso |
|---|---|---|
| **PRE** | `Contracts_Management_Finance_Tech_Propuesta_ToBe_v4.0.pdf` (lectura previa, 22 págs., 17-nov-2026) | Fuente principal |
| **SES** | `Contracts_Management_Finance_Tech_Propuesta_v4.0.pptx` (7 láminas) | Narrativa, peticiones de la sesión |
| **TOBE** | `TO-BE_Contracts_Management_Finance_Tech.md` (v4.0, "En revisión") | Detalle del proceso |
| **ARQ** | Plano de arquitectura (imagen) | Leído; no se usa en el video por decisión editorial |

Las tres fuentes coinciden entre sí (peticiones, fechas y cifras). Estado de la iniciativa: **propuesta para Vo.Bo.**
del 19-nov-2026, con inicio previsto el 23-nov-2026.

## Clasificación

| Escena | Afirmación | Tipo | Fuente |
|---|---|---|---|
| 2 | ~220 servicios y ~170 contratos | Hecho documentado (**cifras declaradas**) | PRE §1.1 |
| 2 | Dos Excel, un correo y dos personas; el dato se captura 3 veces; fechas distintas posibles | Hecho documentado | PRE resumen, §1.3 |
| 3 | Hasta ~26 correos por contrato, sin respuesta ni cierre; siguen tras el vencimiento | Hecho documentado | PRE §1.4 |
| 3 | Ninguna decisión de renovación registrada; contratos fuera de Ariba; proceso sin dueño | Hecho documentado | PRE §1.2, §1.5 |
| 4 | Orden optimizar → automatizar → agentizar; 10 cambios, 8 automatizaciones dentro de la plataforma, 5 agentes | Diseño de la propuesta | PRE §2.1–2.5 |
| 5 | 3 bloques, 7 fases, 37 tarjetas, 7 compuertas; estados del contrato; se aprueba en Ariba | Diseño de la propuesta | PRE §3.1, §3.9 · SES lám. 2 |
| 6 | Plataforma propia con registro, dashboard con descarga, alertas, decisiones e histórico de aprobaciones; entrada con usuario corporativo y permisos por rol | Diseño de la propuesta (**por construir**) | PRE §3.10 · SES lám. 2 |
| 6 | Ariba sigue siendo la fuente oficial y ahí se aprueba; la plataforma lo refleja y verifica el PDF | Diseño de la propuesta | PRE resumen, §3.10–3.11 |
| 7 | Alerta en la plataforma y por correo; tres botones; recordatorio semanal; escalamiento a 60 y 30 días | Diseño de la propuesta | PRE §3.6 |
| 7 | Preaviso de 90 días por defecto | **Condición**: política de Value Creation por definir (P18) | PRE §3.4, §6.5 |
| 8 | Modelo de tres dueños | **Propuesta por aprobar** en el Vo.Bo. | PRE §2.3 |
| 9 | La IA propone con cita; una persona valida todas las fichas; límites de la IA | Diseño de la propuesta | PRE §2.5, §3.4 |
| 10 | Siete entregas: MVP = v0.1.0 a v1.0.0, sin IA; v1.1.0 alta con la regla; v1.2.0 y v1.3.0 con IA; piloto de 20 contratos | Alcance propuesto | PRE §5, §6.2 |
| 11 | Cada entrega resuelve un dolor completo; una arranca cuando la anterior cumple su salida | **Condición** | PRE §5.1, §6.2 |
| 11 | Cinco criterios de salida del MVP | **Condición** verificable | PRE §5.3 |
| 12 | Inicio el 23-nov-2026 | **Condición**: sujeta al Vo.Bo. | PRE §6.1 |
| 12 | 2 personas: MVP ~24 semanas (~10-may-2027), To-Be completo ~43 semanas (~20-sep-2027) · 4 personas: MVP ~14 semanas (~1-mar-2027), To-Be completo ~25 semanas (~17-may-2027) | **Estimación** preliminar, por validar con el Tech Lead | PRE §6.2 · SES lám. 6 |
| 13 | 3 → 1 · ~26 → 1 · 100 % con PDF en Ariba · ≥ 95 % de alertas con decisión · 100 % de aprobaciones y decisiones en un histórico | **Metas** | PRE §3.13 |
| 13 | 12 % → 63 % de pasos no humanos (4 de 34; 57 de 91) | **Característica del diseño**, no resultado medido (va al pie) | PRE §4.1 |
| 13 | Impacto de la IA: reducir tiempo de lectura, captura y validación; meta tras el piloto | **Beneficio cualitativo**, sin cifra (TL7) | PRE §3.4, §3.13 |
| 14 | Seis peticiones de la sesión | Decisión solicitada | PRE §7 · SES lám. 7 |
| 14 | La primera entrega (v0.1.0) arranca el 23 de noviembre | **Condición**: sujeta al Vo.Bo. | PRE §7 |

No hay **resultados medidos** en las fuentes y el video no presenta ninguno.

## Lo que se dejó fuera a propósito

- **Arquitectura técnica** (Postgres, LangGraph, BrewDat, hospedaje): tema del Tech Lead.
- **Nombre provisional** "BrewTech New Platform": se dice "la plataforma que diseñaremos".
- **Costos, semanas-persona y esfuerzo adicional por coordinación**: van en la presentación.
- **Duración de cada entrega por escenario**: el video muestra solo los hitos (MVP y To-Be completo).
- **Antecedente de ~USD 600.000**: caso pasado, no meta ni ahorro comprometido.
- **Nombres propios** del equipo: el video habla de roles.

## Terminología

- **"Respuesta"** en lugar de "acuse" (término de las fuentes): el dueño del servicio oprime cualquier botón de la
  alerta, lo que detiene los recordatorios.

## Identidad visual

- **Sistema de diseño de AB InBev** (artefacto "AB InBev Design System", sincronizado desde `ux-react-designsystem`).
- **Tipografía oficial:** Avantt (display en bold, títulos en semibold) y Satoshi (texto), con los archivos del sistema.
- **Color:** roles del tema claro (`colors-status-brand-base`, `colors-text-*`, `colors-background-*`, estados de
  éxito, error e información). El amarillo de marca se usa como señalador (elemento activo o acción principal).
- **Superficies planas:** sin degradados ni sombras; jerarquía por peso tipográfico y una línea fina.
- **Excepciones declaradas:** las portadas amarillas de apertura y cierre siguen las presentaciones de la propuesta;
  el morado para "versiones con IA" es el código de color de esas presentaciones, no un rol del sistema.
- **Logotipo:** el sistema no incluye un logotipo corporativo completo; el video no usa ni reconstruye ninguno.
