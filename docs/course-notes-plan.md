# Colección única de notas y cursos

## Resumen

- Mantener todas las notas en Markdown/MDX, sin `lang`, `translationKey`, traducciones ni filtros por idioma.
- Publicarlas bajo una única ruta canónica: `/notes/`.
- Usar inglés para la interfaz y metadatos generales de la sección; el contenido podrá mezclar inglés y español.
- No modificar Sanity ni integrar Hashnode.

## Cambios principales

- Crear la colección local `course` con `title` y `description`.
- Ampliar `note` con:
  - `course`: referencia opcional a un curso.
  - `order`: entero positivo obligatorio únicamente para lecciones.
  - Campos actuales `title`, `description` y `publishDate`.
- Reorganizar el contenido sin carpetas de idioma:
  - `content/courses/aws.md` → `/notes/aws/`
  - `content/notes/aws/iam.md` → `/notes/aws/iam/`
  - `content/notes/terminal-shortcut.md` → `/notes/terminal-shortcut/`
- Mantener imágenes junto al Markdown mediante `![alt](./image.png)` para que Astro las procese automáticamente. [Astro Images](https://docs.astro.build/en/guides/images/)
- Convertir `getNotes(locale)` en `getNotes()` y añadir consultas para cursos y lecciones ordenadas.
- Mostrar en `/notes/` los cursos alfabéticamente y las notas independientes por fecha.
- Crear portadas de curso con sus lecciones y un enlace de regreso al curso desde cada lección.
- Mostrar la colección compartida en ambas versiones de la bitácora, sin filtrarla.
- Consolidar las dos notas actuales de bienvenida en una sola entrada inglesa.

## URLs y compatibilidad

- Crear un único índice, detalle y RSS bajo `/notes/`.
- Hacer que los enlaces españoles e ingleses del sitio apunten a esa misma ruta.
- Redirigir permanentemente:
  - `/notas/` → `/notes/`
  - `/en/notes/` → `/notes/`
  - Sus rutas dinámicas equivalentes conservando el slug.
  - Las antiguas bienvenidas directamente a la entrada consolidada.
- No generar `hreflang` de traducción para esta sección compartida.
- Mantener `lang="en"` como idioma general del documento por accesibilidad, sin usarlo para clasificar o filtrar las notas.
- Usar un único feed `/notes/rss.xml`.

## Validación

- Verificar un curso con dos lecciones ordenadas y una imagen local.
- Verificar una nota independiente sin curso ni orden.
- Confirmar que una lección con curso pero sin `order` falla durante la validación.
- Confirmar que ambos diarios muestran las mismas notas y enlazan únicamente a `/notes/`.
- Probar las redirecciones antiguas y comprobar que no existen páginas duplicadas.
- Ejecutar `bun run check` y `bun run build`.

## Decisiones

- Astro Content Collections será la única fuente de contenido y validará las relaciones entre cursos y lecciones. [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- Sanity se conserva para el contenido estructurado actual del portafolio.
- Hashnode solo se reconsiderará para distribuir artículos terminados, no para almacenar estas notas.
- No se añaden dependencias, traducción automática, etiquetas de idioma ni navegación anterior/siguiente.
