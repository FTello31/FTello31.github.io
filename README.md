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

Las notas permanecen en `content/notes`. Cada entrada localizada usa `lang` y `translationKey`.
Español se publica sin prefijo e inglés bajo `/en/`.

## Despliegue

Netlify compila la rama `main` con la configuración de `netlify.toml` y publica `dist/` en
`fernandotello.netlify.app`.

Cuando cambia contenido publicado, un webhook de Sanity invoca el Build Hook de Netlify. Netlify
recompila el sitio y el contenido aparece en producción unos minutos después.
