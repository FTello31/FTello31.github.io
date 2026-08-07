# Netlify launch checklist

The repository is ready to build on Netlify with `bun run build` and publish `dist`.

## Preview deployment

1. Import the repository into Netlify without changing the current DNS.
2. Confirm the build settings loaded from `netlify.toml`.
3. In Netlify, enable **Form detection** and redeploy.
4. Submit both `project-inquiry-es` and `project-inquiry-en` from the Netlify subdomain.
5. Configure submission notifications to the owner's email.
6. Verify Sanity content, previews, redirects, RSS feeds, certificates and both confirmation pages.
7. Keep auto-recharge disabled and review credit usage monthly.

## Domain cutover

1. Add `fernandotello.me` to the validated Netlify site and verify SSL.
2. Change DNS only after the preview, forms and rollback path have been tested.
3. Confirm the production domain and forms once DNS has propagated.
4. Disable GitHub Pages and remove `public/CNAME` only after the Netlify domain is working. The current repository intentionally retains both.

## Plausible after launch

Start the Plausible trial after the first release. Set `PUBLIC_PLAUSIBLE_SCRIPT_SRC` in Netlify to the complete site-specific script URL shown by Plausible. The site already emits these event names without attaching form values or other personal data:

- `Hero Contact Click`
- `Case Study View`
- `Case Contact Click`
- `Service Contact Click`
- `WhatsApp Click`
- `Inquiry Start`
- `Inquiry Submit`
- `CV Download`

Keep Plausible's automatic form submission tracking disabled: `Inquiry Submit` is emitted only after Netlify redirects to the successful confirmation page.

Create matching custom-event goals in Plausible and configure these funnels:

- `Hero Contact Click` → `Inquiry Start` → `Inquiry Submit`
- `Case Study View` → `Case Contact Click` → `Inquiry Start` → `Inquiry Submit`
- `Service Contact Click` → `Inquiry Start` → `Inquiry Submit`

Treat `WhatsApp Click` as an alternative conversion. Each month, review Netlify submissions privately and classify them as `qualified`, `follow-up` or `not a fit`; do not send that classification or any inquiry content to Plausible.

If the recurring cost is not approved after the trial, remove the environment variable; no replacement tracker is required.
