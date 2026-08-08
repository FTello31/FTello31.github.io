# Netlify production checklist

Netlify builds `main` with `bun run build` and publishes `dist`.

## Preview deployment

1. Import the repository into Netlify without changing the current DNS.
2. Confirm the build settings loaded from `netlify.toml`.
3. In Netlify, enable **Form detection** and redeploy.
4. Submit both `project-inquiry-es` and `project-inquiry-en` from the Netlify subdomain.
5. Configure submission notifications to the owner's email.
6. Verify Sanity content, previews, redirects, RSS feeds, certificates and both confirmation pages.
7. Keep auto-recharge disabled and review credit usage monthly.

## Production

1. Confirm `fernandotello.netlify.app` and both production forms.
2. Confirm the `Sanity content published` Build Hook targets `main`.
3. Confirm the Sanity webhook invokes that Build Hook only for published site content.

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
