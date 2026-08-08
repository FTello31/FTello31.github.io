# Migración detallada de Plausible a Umami Cloud

## Resumen

Sustituir por completo la integración aún no publicada de Plausible por Umami Cloud Hobby, utilizando la región europea y activando la recopilación únicamente en el despliegue de producción de Netlify, después del cambio desde GitHub Pages.

La migración conservará los ocho eventos comerciales actuales, los pageviews automáticos y los embudos previstos. No se importarán datos históricos porque Plausible todavía no contiene información real. Umami funciona sin cookies, no recopila datos personales y ofrece un plan Hobby gratuito para proyectos personales según su documentación oficial. [Umami Cloud FAQ](https://docs.umami.is/docs/cloud/faq), [privacidad de Umami](https://docs.umami.is/docs/).

No se añadirán dependencias, API keys, base de datos, servidor propio, banner de cookies ni capa genérica de analítica.

## Configuración de Umami Cloud

1. Crear una cuenta en [Umami Cloud](https://cloud.umami.is/signup).
2. Seleccionar la región de datos **EU** durante el alta.
3. Confirmar en la interfaz que el plan elegido figura como **Hobby, 0 €** y no requiere activar una prueba de pago.
   - Si el plan gratuito ya no existe o exige un método de pago, detener el despliegue de analítica; no convertir automáticamente la migración en una suscripción.
4. Registrar un único sitio:
   - Nombre: `Fernando Tello`
   - Dominio: `fernandotello.netlify.app`
   - Zona horaria: `Europe/Madrid`
5. Copiar exclusivamente el `Website ID` público generado por Umami.
   - No crear API keys porque el sitio solo necesita enviar eventos mediante el tracker.
   - No guardar credenciales de Umami en el repositorio.
6. Mantener desactivadas las capacidades no solicitadas:
   - Session replay.
   - Heatmaps.
   - Identificación de sesiones o usuarios mediante `umami.identify`.
   - Datos personalizados de eventos.
   - Recopilación adicional de Web Vitals.
7. Comprobar en el panel Hobby los límites y retención vigentes. Umami contabiliza cada pageview, evento y propiedad adicional como uso; al no enviar propiedades se mantiene el consumo mínimo. [Medición de uso](https://docs.umami.is/docs/cloud/faq)

## Cambios de implementación

### Carga del tracker

- Renombrar `PlausibleAnalytics.astro` como `UmamiAnalytics.astro`.
- Sustituir `PUBLIC_PLAUSIBLE_SCRIPT_SRC` por una única variable pública opcional:
  - `PUBLIC_UMAMI_WEBSITE_ID`
  - Contexto: cliente.
  - Acceso: público.
  - Opcional: sí, para que builds locales, previews y GitHub Pages funcionen sin analítica.
- El componente leerá el ID desde `import.meta.env` y solo renderizará el tracker cuando tenga valor.
- Renderizar en el `<head>` el script oficial diferido:
  - Fuente: `https://cloud.umami.is/script.js`
  - Atributo: `data-website-id={websiteId}`
  - Sin inicializador inline: Umami registra automáticamente el pageview inicial. [Instalación del tracker](https://docs.umami.is/docs/collect-data)
- Actualizar `BaseHead.astro` para importar y renderizar `UmamiAnalytics`.
- No parametrizar la URL del script: el alojamiento elegido es Umami Cloud y la URL no varía entre entornos.
- No modificar el workflow de GitHub Pages. Al carecer de `PUBLIC_UMAMI_WEBSITE_ID`, el sitio actual seguirá compilando y publicándose sin tracker hasta el cambio a Netlify.

### Migración de eventos

Umami registra clics declarativos con `data-umami-event` y permite los eventos programáticos mediante `window.umami.track(...)`. [Eventos personalizados](https://docs.umami.is/docs/track-events), [funciones del tracker](https://docs.umami.is/docs/tracker-functions)

Conservar exactamente estos nombres para que la documentación, métricas y embudos sigan alineados:

| Evento | Origen | Implementación Umami |
|---|---|---|
| `Hero Contact Click` | CTA principal de inicio | `data-umami-event` |
| `Case Study View` | enlaces y CTA de casos de estudio | `data-umami-event` |
| `Case Contact Click` | CTA de contacto en un caso | `data-umami-event` |
| `Service Contact Click` | CTA de servicios | `data-umami-event` |
| `WhatsApp Click` | enlaces flotantes e integrados de WhatsApp | `data-umami-event` |
| `CV Download` | enlaces de descarga del CV | `data-umami-event` |
| `Inquiry Start` | primer foco dentro del formulario | `window.umami?.track(...)` |
| `Inquiry Submit` | carga de la página de confirmación | `window.umami?.track(...)` |

Aplicación concreta:

- Reemplazar todos los atributos `data-plausible-event` por `data-umami-event`, manteniendo sus valores y condiciones actuales.
- En `Base.astro`, eliminar únicamente:
  - El estado `commercialAnalyticsReady`.
  - El listener global delegado de clics.
  - La lectura de `dataset.plausibleEvent`.
  - La llamada a `window.plausible`.
- Conservar intactos el `IntersectionObserver`, la ocultación del botón flotante de WhatsApp y su inicialización.
- En el formulario:
  - Mantener el guard `data-inquiry-started` para emitir `Inquiry Start` solo una vez por carga.
  - Sustituir la llamada opcional a Plausible por `window.umami?.track("Inquiry Start")`.
  - No adjuntar nombre, email, empresa, presupuesto, servicio ni contenido del formulario.
- En la página de agradecimiento:
  - Mantener la limpieza de borradores de `sessionStorage`.
  - Emitir `Inquiry Submit` solo después de que Netlify haya redirigido al usuario a la confirmación.
  - No instrumentar directamente el evento `submit`, evitando contabilizar validaciones fallidas o envíos rechazados.
- No crear un helper o proveedor común de analítica: solo existen dos llamadas programáticas y el atributo nativo de Umami cubre los clics.

### Eliminación completa de Plausible

- Retirar `PUBLIC_PLAUSIBLE_SCRIPT_SRC` del esquema de entorno de Astro.
- Eliminar el componente y los imports con nombre Plausible una vez sustituido.
- Eliminar todos los identificadores:
  - `data-plausible-event`
  - `window.plausible`
  - `plausibleWindow`
  - `commercialAnalyticsReady`
- No conservar compatibilidad dual ni ejecutar ambos trackers durante una transición, ya que no existen datos históricos que proteger.
- No modificar ni revertir cambios no relacionados que ya estén staged o unstaged en el worktree.

## Panel, objetivos y embudos

Los eventos aparecerán automáticamente en Umami; no es necesario convertir cada evento en un objetivo.

Configurar únicamente:

- Objetivo principal:
  - Nombre: `Completed Inquiry`
  - Tipo: evento.
  - Valor: `Inquiry Submit`
- Objetivo alternativo:
  - Nombre: `WhatsApp Contact`
  - Tipo: evento.
  - Valor: `WhatsApp Click`

Crear estos embudos, con una ventana inicial de 60 minutos entre pasos:

1. `Homepage inquiry`
   - `Hero Contact Click`
   - `Inquiry Start`
   - `Inquiry Submit`
2. `Case study inquiry`
   - `Case Study View`
   - `Case Contact Click`
   - `Inquiry Start`
   - `Inquiry Submit`
3. `Service inquiry`
   - `Service Contact Click`
   - `Inquiry Start`
   - `Inquiry Submit`

Umami admite eventos como pasos y exige definir una ventana temporal para el embudo. [Documentación de funnels](https://docs.umami.is/docs/funnel)

Si el plan Hobby vigente no permite guardar objetivos o funnels:

- Mantener el tracker y los ocho eventos en el plan gratuito.
- No contratar automáticamente un plan superior.
- Documentar las definiciones anteriores en la checklist para consultarlas manualmente desde la lista de eventos.

## Privacidad y documentación

Actualizar la checklist de Netlify:

- Renombrar `Plausible after launch` a `Umami after launch`.
- Sustituir las instrucciones de trial y `PUBLIC_PLAUSIBLE_SCRIPT_SRC`.
- Documentar:
  - Alta en Hobby.
  - Selección de región EU.
  - Creación del sitio.
  - Configuración de `PUBLIC_UMAMI_WEBSITE_ID`.
  - Lista exacta de eventos.
  - Objetivos y embudos.
  - Revisión mensual del consumo.
  - Prohibición de enviar campos del formulario o clasificaciones comerciales.
- Eliminar la instrucción de retirar el tracker si no se aprueba el coste de Plausible; el nuevo límite operativo será permanecer en el plan gratuito.

Actualizar el aviso de privacidad en español e inglés:

- Identificar a Umami Cloud, operado por Umami Software, Inc., como proveedor de analítica.
- Indicar que se utilizará la región europea.
- Explicar de forma breve que se recopilan métricas anónimas de navegación y los eventos comerciales enumerados.
- Mantener explícito que el contenido del formulario y su clasificación posterior no se envían a Umami.
- Indicar que no se utilizan cookies ni identificación personal, de acuerdo con la configuración implementada.
- Actualizar la fecha del aviso a la fecha real de publicación.
- No añadir un banner de consentimiento técnico mientras la configuración siga siendo anónima y sin cookies; cualquier requisito legal adicional quedará fuera de esta migración técnica.

## Variables y despliegue

En Netlify:

1. Crear `PUBLIC_UMAMI_WEBSITE_ID` con el ID real.
2. Limitar su alcance al contexto de producción.
3. No exponerlo en deploy previews, branch deploys ni desarrollo local.
4. Eliminar `PUBLIC_PLAUSIBLE_SCRIPT_SRC` si ya estuviera configurada.
5. Lanzar un nuevo build de producción después del cambio de DNS y de verificar formularios.
6. Confirmar que GitHub Pages no recibe la variable y, por tanto, no genera tráfico duplicado durante el periodo previo al apagado.
7. No almacenar el ID en `.env`, archivos versionados o la configuración de GitHub Actions.

## Cambios de interfaces públicas

- Variable eliminada: `PUBLIC_PLAUSIBLE_SCRIPT_SRC`.
- Variable añadida: `PUBLIC_UMAMI_WEBSITE_ID`.
- Atributo DOM eliminado: `data-plausible-event`.
- Atributo DOM añadido: `data-umami-event`.
- API global eliminada: `window.plausible(name)`.
- API global utilizada: `window.umami.track(name)`.
- Los nombres de los ocho eventos permanecen sin cambios.
- No cambian rutas, formularios, contenido enviado a Netlify ni APIs del servidor.

## Plan de pruebas

### Comprobaciones estáticas

- Ejecutar `bun run check`.
- Ejecutar `bun run build` sin el ID:
  - El build debe finalizar correctamente.
  - Ningún HTML generado debe contener `cloud.umami.is`.
  - No debe quedar ninguna referencia a Plausible en `src`, configuración o documentación.
- Ejecutar un segundo build con un UUID de prueba:
  - Cada página HTML debe contener una sola etiqueta del tracker.
  - La etiqueta debe incluir `defer`, la URL oficial y `data-website-id`.
  - No debe generarse un inicializador inline adicional.
- Buscar expresamente referencias residuales a:
  - `plausible`
  - `data-plausible-event`
  - `PUBLIC_PLAUSIBLE_SCRIPT_SRC`
- Confirmar que los ocho nombres de evento siguen presentes y sin errores tipográficos.

### Comprobaciones funcionales

En el primer despliegue de producción de Netlify, con bloqueadores desactivados:

1. Abrir una página española y otra inglesa.
2. Confirmar que `https://cloud.umami.is/script.js` responde correctamente.
3. Verificar en Network que se envía un único pageview por carga.
4. Confirmar el pageview en tiempo real en Umami.
5. Probar una vez cada evento declarativo.
6. Entrar en el formulario:
   - El primer foco emite `Inquiry Start`.
   - Los focos posteriores no lo repiten.
7. Enviar una consulta de prueba claramente identificada:
   - No emitir `Inquiry Submit` antes de abandonar el formulario.
   - Emitirlo una vez al cargar la página de agradecimiento.
8. Inspeccionar los payloads:
   - Deben incluir el nombre del evento y metadatos estándar del tracker.
   - No deben contener valores de inputs, texto libre, email, empresa, presupuesto ni servicio.
9. Confirmar que navegación, enlaces, descarga de CV, WhatsApp, formulario y guardado temporal siguen funcionando aunque el tracker esté bloqueado.
10. Verificar que una deploy preview no contiene el script ni genera eventos.

## Lanzamiento, seguimiento y rollback

- Publicar la migración junto con el despliegue de Netlify; no activarla antes en GitHub Pages.
- Durante las primeras 24 horas:
  - Revisar pageviews.
  - Confirmar los ocho eventos.
  - Detectar duplicados de `Inquiry Start` o `Inquiry Submit`.
- Durante el primer mes:
  - Revisar consumo del plan Hobby.
  - Comparar `Inquiry Submit` con los envíos reales de Netlify.
  - Mantener la clasificación privada de leads fuera de Umami.
- Rollback:
  - Retirar `PUBLIC_UMAMI_WEBSITE_ID` de producción y reconstruir.
  - El componente dejará de emitir el tracker sin afectar el sitio.
  - No reactivar Plausible automáticamente.

## Criterios de aceptación

- Producción Netlify registra pageviews en Umami Cloud EU.
- Los ocho eventos existentes llegan con sus nombres exactos.
- `Inquiry Start` se registra una vez por formulario.
- `Inquiry Submit` solo se registra tras una confirmación real.
- No se transmite contenido del formulario ni información identificativa.
- Previews, desarrollo local y GitHub Pages no cargan Umami.
- No quedan referencias a Plausible.
- No se añaden paquetes, servidores ni almacenamiento.
- `bun run check` y `bun run build` terminan correctamente.
- El sitio continúa funcionando cuando Umami esté bloqueado o sin configurar.

## Supuestos cerrados

- Se utilizará Umami Cloud Hobby, no una instalación autohospedada.
- La cuenta se configurará en la región europea.
- No existe histórico de Plausible que migrar o exportar.
- El tracker se activará después del cambio a Netlify.
- Solo producción tendrá el Website ID.
- Se prioriza permanecer en la opción gratuita aunque alguna función avanzada del panel no esté incluida.
- Las modificaciones actuales del worktree pertenecen al usuario y deben preservarse.
