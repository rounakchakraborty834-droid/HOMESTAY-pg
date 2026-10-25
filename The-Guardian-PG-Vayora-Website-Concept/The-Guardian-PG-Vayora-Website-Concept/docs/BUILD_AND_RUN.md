# Build, Run and Deploy

## Local setup

The site is plain HTML/CSS/JavaScript and does not need a bundler. Requirements: Node.js 18+.

```bash
npm run dev
```

Open `http://localhost:4173`. Port override: `PORT=5000 npm run dev` (macOS/Linux) or `$env:PORT=5000; npm run dev` (PowerShell).

Checks:

```bash
npm run check
npm run build
npm test
```

All three run the dependency-free source validation script. There is no API server or database. The static Node server is only for local preview.

## Production hosting

Upload the project folder to any static hosting provider, or publish it as a static site via a configured Git repository. `index.html` is the entry page and all asset paths are relative. Keep the following files together: `index.html`, `assets/`, `robots.txt`, and the documentation required by the handoff.

Before production:

1. Replace pending Pexels CDN images with verified local WebP/AVIF asset copies and update `docs/ASSET_CREDITS.md`.
2. Use client-approved property photographs; don't imply stock images show the actual premises.
3. Confirm Google links/rating, business hours if published, address and pin, branch-specific inventory/amenities and all rates.
4. Configure the final canonical host and Open Graph share image. Add canonical metadata and `sitemap.xml` only after the production domain is confirmed.
5. Remove `Disallow: /` from `robots.txt` only after approval and launch.
6. Run the responsive browser QA with a network connection and real devices.

## Dependencies and environment variables

No installable npm package is required. `package-lock.json` records the zero-dependency Node package. GSAP 3.13.0 and ScrollTrigger are included from a pinned CDN in `index.html`; a native animation fallback is included in `assets/js/main.js`. If local-only or strict-CSP deployment is required, download/host the exact GSAP scripts locally after verifying the license and file integrity.

No environment variables are currently needed, so an `.env.example` is intentionally omitted. No credentials or API keys are bundled. The 21st.dev MCP integration is not configured because no MCP setup tool or 21st.dev connector was available in the current session.

## Form and data handling

The inquiry form validates name and phone locally, creates an encoded WhatsApp message preview, and only opens a WhatsApp URL after the visitor explicitly clicks its confirmation button. It does not send a request to this static server, persist the form, or claim that the enquiry has been delivered. The visitor completes sending inside WhatsApp.
