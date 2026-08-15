# Fernando Tello Studio

Sitio bilingüe de Fernando Tello: estudio independiente de software, portfolio, experiencia,
certificados, artículos y notas.

## Desarrollo

```bash
bun install
bun run dev
```

Astro sirve el sitio en `http://localhost:4321`.

## Validación

```bash
bun run check
bun run build
```

El build genera el sitio estático en `dist/` y el `postbuild` crea los índices ES/EN de Pagefind.

## Contenido

Las Content Collections estructuradas se cargan desde el dataset público `production` de Sanity:

- `article`: enlaces externos del blog.
- `projects`: proyectos de portfolio.
- `experience`: experiencia profesional.
- `certificate`: certificados.
- `badge`: insignias profesionales.

Las notas locales permanecen en `content/notes`. También se pueden cargar notas desde una base
privada de Notion durante el build. Ambos orígenes conviven y se publican bajo `/notes/`.

### Notion

1. Crea una conexión interna de solo lectura y dale acceso únicamente a la base de notas.
2. Añade a la base `Slug` (text), `Descripción` (text), `Fecha` (date), `Publicar` (checkbox),
   `Curso` (Select) y `Orden` (Number). La columna principal de título puede conservar cualquier
   nombre, por ejemplo `Name`.
3. Configura `NOTION_TOKEN` y `NOTION_DATA_SOURCE_ID` en `.env` y en las variables de Netlify. El
   ID se obtiene desde `Manage data sources` → `Copy data source ID` en Notion.
4. Publica cada nota en la web desde Notion, activa `Publicar` y lanza un deploy manual de Netlify.

El slug debe usar minúsculas, números y guiones. El portfolio muestra los metadatos y enlaza a la
página pública de Notion, que sirve directamente su contenido y archivos sin añadirlos al bundle.

Para incluir una nota en un curso, crea primero `content/courses/<slug>.md`, usa exactamente ese
slug en `Curso` y asigna un `Orden` entero positivo. Las notas sin curso dejan ambos campos vacíos.

Cada entrada localizada usa `lang` y `translationKey`. Español se publica sin prefijo e inglés bajo
`/en/`.

## Despliegue

Netlify compila la rama `main` con la configuración de `netlify.toml` y publica `dist/` en
`fernandotello.netlify.app`.

Cuando cambia contenido publicado, un webhook de Sanity invoca el Build Hook de Netlify. Netlify
recompila el sitio y el contenido aparece en producción unos minutos después.
