# Netlify production checklist

Netlify builds `main` with Node 24, Bun 1.3.14 and `bun run build`, then publishes `dist`.
`fernandotello.netlify.app` remains provisional until the final domain is chosen.

## Automated readiness

- [x] `bun test`, `bun run check` and `bun run build` pass.
- [x] `bun audit --production` reports no known vulnerabilities.
- [x] Sitemap contains only indexable pages; 404 and confirmation pages are excluded.
- [x] `robots.txt` references the sitemap index using the configured canonical URL.
- [x] Indexable pages have a description, canonical URL, one `h1` and a unique title.
- [x] RSS feeds, manifest, generated icons and Pagefind output exist in `dist`.
- [x] Mobile layouts have no horizontal overflow at 390 px.
- [x] Search downloads Pagefind only after the user opens it.
- [x] Lighthouse production scores for home, services, case study, contact and a note are at least
  90 for performance and 100 for accessibility, best practices and SEO.

## Deploy Preview

- [ ] Import or reconnect the repository without changing production DNS.
- [ ] Confirm Netlify loads `netlify.toml`, uses `main`, and installs from `bun.lock`.
- [ ] Set required Notion variables and `PUBLIC_UMAMI_WEBSITE_ID` only in their intended contexts.
- [ ] Confirm Deploy Preview responses include `X-Robots-Tag: noindex`.
- [ ] Enable **Form detection**, redeploy, and submit `project-inquiry-es` and
  `project-inquiry-en` with non-sensitive test data.
- [ ] Confirm honeypot handling, confirmation pages, email notifications and deletion/retention
  of test submissions.
- [ ] Verify Sanity and Notion content, redirects, RSS, certificates, search, CV download, theme,
  language switching and the custom 404 page.
- [ ] Check response headers, keyboard navigation, visible focus, contrast and mobile layouts.

## Production release

- [ ] Choose the definitive domain; the release remains blocked until this is decided.
- [ ] Update `siteConfig.url`, the social card URL, Umami and any domain-specific copy.
- [ ] Configure the primary Netlify domain, DNS and HTTPS; redirect the Netlify subdomain and any
  aliases to the canonical domain with 301 responses.
- [ ] Rebuild and verify canonical URLs, `hreflang`, `robots.txt`, sitemap and Open Graph against
  the public HTTPS URL.
- [ ] Submit `sitemap-index.xml` to Google Search Console.
- [ ] Repeat both form submissions in production and remove the test records.
- [ ] Confirm the `Sanity content published` Build Hook targets `main` and only fires for published
  site content.
- [ ] Keep auto-recharge disabled and review Netlify and Umami usage monthly.

## Umami after launch

Configure Umami Cloud Hobby after the first release on Netlify:

1. Create a free Hobby account on [Umami Cloud](https://cloud.umami.is/signup) selecting the **EU** data region.
2. Register site `Fernando Tello` with domain `fernandotello.netlify.app` and timezone `Europe/Madrid`.
3. Set `PUBLIC_UMAMI_WEBSITE_ID` in Netlify limited strictly to the production context. Do not set it for deploy previews or branch builds.
4. Keep additional features (session replay, heatmaps, event properties) disabled.

The site emits these exact custom event names without attaching form input values or personal data:

- `Hero Contact Click`
- `Case Study View`
- `Case Contact Click`
- `Service Contact Click`
- `WhatsApp Click`
- `Inquiry Start`
- `Inquiry Submit`
- `CV Download`

In the Umami dashboard, configure goals and funnels:

- Primary Goal: `Completed Inquiry` (event: `Inquiry Submit`)
- Alternative Goal: `WhatsApp Contact` (event: `WhatsApp Click`)
- Funnels (60-minute window):
  - `Homepage inquiry`: `Hero Contact Click` → `Inquiry Start` → `Inquiry Submit`
  - `Case study inquiry`: `Case Study View` → `Case Contact Click` → `Inquiry Start` → `Inquiry Submit`
  - `Service inquiry`: `Service Contact Click` → `Inquiry Start` → `Inquiry Submit`

Review credit usage monthly to stay within the free Hobby tier limit. Keep lead classification (`qualified`, `follow-up`, `not a fit`) private within Netlify submission logs; do not send form content or lead classification to Umami.
