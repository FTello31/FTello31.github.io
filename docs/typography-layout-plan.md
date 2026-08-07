# Plan: Tipografía y Layout — Mejoras basadas en referencia somepage.com

## Contexto

Se revisó la página de referencia [somepage.com](https://www.somepage.com/) y se comparó con el proyecto actual. Se identificaron dos familias de problemas:

1. **Font sizes demasiado pequeños** en varios componentes
2. **Exceso de margen izquierda/derecha** en desktop (el contenido tiene mucho espacio vacío lateral)

---

## Análisis comparativo

### Referencia (somepage.com)

| Elemento | Tamaño |
|---|---|
| `body` base | `15px` |
| Hero headline | `clamp(46px, 9vw, 132px)` |
| Hero sub párrafo | `clamp(17px, 1.5vw, 20px)` |
| Section titles (h2) | `clamp(34px, 5vw, 64px)` |
| Row item names | `clamp(20px, 2vw, 26px)` |
| Row item description | `14px` |
| Contact big text | `clamp(36px, 4.5vw, 56px)` |
| Max-width container | `1240px` |
| Padding horizontal | `clamp(20px, 3vw, 40px)` |

### Tu sitio — Problemas detectados

| Elemento | Tamaño actual | Problema |
|---|---|---|
| `body` base | `14px` | 1px menos que referencia, efecto acumulado en toda la UI |
| `--page-width` | `1120px` | Deja ~160px vacíos a cada lado en 1440px |
| `commercial-hero__lead` | `clamp(0.95rem, 1.4vw, 1.12rem)` | Algo pequeño |
| `proof-strip strong` | `12px` | Muy pequeño |
| `proof-strip span` | `9px` | Demasiado pequeño |
| `services-grid h3` | `18px` | Podría ser mayor |
| `services-grid p` | `12px` | Muy pequeño — principal queja |
| `faq-list summary` | `13px` | Pequeño para ser la pregunta principal |
| `about-commercial__facts span` | `9px` | Muy pequeño |
| `note-card__description` | `11px` | Muy pequeño |
| `content-card h3` | `14px` | Pequeño para un título de card |
| `content-card p` | `11px` | Muy pequeño |
| `section-heading h2` | `clamp(1.7rem, 3vw, 2.6rem)` | Podría ganar algo |

**Layout — causa del margen lateral excesivo:**

```css
/* Actual */
#main, .site-footer {
  width: min(calc(100% - 32px), var(--page-width));  /* max 1120px */
  margin-inline: auto;
}
```

Con viewport 1440px → ~160px de margen a cada lado. La referencia usa 1240px y padding interno fluido.

---

## Cambios propuestos

### 1. Body base font-size
**Archivo:** `src/styles/global.css`, línea ~77

```diff
- font-size: 14px;
+ font-size: 15px;
```

Sube toda la escala tipográfica uniformemente.

### 2. Page width — ampliar contenedor
**Archivo:** `src/styles/global.css`, línea ~41 (`:root`)

```diff
- --page-width: 1120px;
+ --page-width: 1280px;
```

Reduce el margen lateral vacío en pantallas de 1440px+.

### 3. Site section — padding horizontal
**Archivo:** `src/styles/global.css`, línea ~417

```diff
- padding: clamp(56px, 8vw, 96px) clamp(22px, 5vw, 56px);
+ padding: clamp(56px, 8vw, 96px) clamp(24px, 4vw, 48px);
```

### 4. Services grid — font sizes
**Archivo:** `src/styles/global.css`, líneas ~475–489

```diff
  .services-grid h3 {
    margin: 44px 0 15px;
-   font-size: 18px;
+   font-size: 20px;
  }
  .services-grid p {
    color: var(--color-muted);
-   font-size: 12px;
+   font-size: 14px;
  }
```

### 5. Proof strip — aumentar tamaños
**Archivo:** `src/styles/global.css`, líneas ~1965–1971

```diff
  .proof-strip strong {
-   font-size: 12px;
+   font-size: 14px;
  }
  .proof-strip span {
    color: var(--color-muted);
-   font-size: 9px;
+   font-size: 11px;
  }
```

### 6. FAQ list — summary font size
**Archivo:** `src/styles/global.css`, línea ~2175

```diff
  .faq-list summary {
-   font-size: 13px;
+   font-size: 15px;
  }
```

### 7. FAQ list — answer font size
**Archivo:** `src/styles/global.css`, línea ~2189

```diff
  .faq-list details p {
    max-width: 760px;
    margin: -4px 0 22px;
    color: var(--color-muted);
+   font-size: 14px;
  }
```

### 8. About commercial facts — label size
**Archivo:** `src/styles/global.css`, línea ~2159

```diff
  .about-commercial__facts span {
    color: var(--color-muted);
-   font-size: 9px;
+   font-size: 11px;
  }
```

### 9. Note card description
**Archivo:** `src/styles/global.css`, línea ~748

```diff
  .note-card__description {
    color: var(--color-muted);
-   font-size: 11px;
+   font-size: 13px;
  }
```

### 10. Content card — h3 y descripción
**Archivo:** `src/styles/global.css`, líneas ~720–733

```diff
  .content-card h3 {
    margin: 8px 0;
-   font-size: 14px;
+   font-size: 15px;
    line-height: 1.45;
  }
  .content-card p {
    margin: 0 0 14px;
    color: var(--color-muted);
-   font-size: 11px;
+   font-size: 13px;
  }
```

### 11. Commercial hero lead — desktop
**Archivo:** `src/styles/global.css`, líneas ~1891–1897

```diff
  .commercial-hero__lead {
-   font-size: clamp(0.95rem, 1.4vw, 1.12rem);
+   font-size: clamp(1rem, 1.4vw, 1.15rem);
  }
```

### 12. Section heading h2 — ligeramente mayor
**Archivo:** `src/styles/global.css`, línea ~432

```diff
  .section-heading h2 {
-   font-size: clamp(1.7rem, 3vw, 2.6rem);
+   font-size: clamp(1.8rem, 3vw, 2.8rem);
  }
```

### 13. Closing CTA h2
**Archivo:** `src/styles/global.css`, línea ~765

```diff
  .closing-cta h2 {
-   font-size: clamp(2.2rem, 5vw, 4.6rem);
+   font-size: clamp(2.4rem, 5vw, 4.8rem);
  }
```

### 14. Page intro description
**Archivo:** `src/styles/global.css`, línea ~811

```diff
  .page-intro__description {
-   font-size: 15px;
+   font-size: 16px;
  }
```

### 15. Experience list — párrafo de descripción
**Archivo:** `src/styles/global.css`, línea ~625

```diff
  .experience-list article > p {
    max-width: 800px;
    margin: 16px 0 20px;
    color: var(--color-muted);
+   font-size: 14px;
  }
```

---

## Orden de implementación

1. `--page-width: 1280px` — impacto inmediato en el layout lateral
2. `font-size: 15px` en body — sube toda la escala base
3. `.services-grid p: 14px` — el texto más notoriamente pequeño
4. `.faq-list summary: 15px` — preguntas más legibles
5. `.proof-strip` — ambos strong y span
6. `.content-card` y `.note-card` — cards de contenido
7. `.about-commercial__facts span` — etiquetas en sección About
8. Resto de ajustes menores (hero lead, section heading, closing CTA, etc.)

---

## Verificación

- [ ] Revisar en viewport 1440px — comprobar márgenes laterales reducidos
- [ ] Revisar en viewport 1280px — sin overflow horizontal
- [ ] Revisar en viewport 768px — breakpoints intermedios OK
- [ ] Revisar en mobile 375px — escala mobile adecuada
- [ ] Comparar hero, services, FAQ y about con somepage.com side by side

---

## Notas

- Los tamaños muy pequeños (`8px`, `9px`) en etiquetas decorativas (metadatos de certificados, tags) se mantienen intencionalmente — son detalles de UI, no texto de lectura.
- El cambio de `--page-width` de 1120px→1280px es conservador. La referencia usa 1240px pero con un estilo de página completamente diferente.
- Al subir `body font-size` a 15px, todos los valores en `rem` se escalan automáticamente.
