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

El workflow `deploy.yml` valida, compila y publica `dist/` en GitHub Pages. `public/CNAME` conserva
el dominio `fernandotello.me`.

Un webhook de Sanity dispara manualmente este workflow cuando cambia contenido publicado.
