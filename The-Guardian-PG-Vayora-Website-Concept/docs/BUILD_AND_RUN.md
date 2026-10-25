# Build, Run and Deploy

## Local setup

Requirements: Node.js 18+. No project dependencies need to be installed.

```powershell
npm run dev
```

Open `http://localhost:4173`. Stop the server with `Ctrl+C`. Port override: `$env:PORT=5000; npm run dev`.

## Build and test

```powershell
npm run check
npm test
npm run build
```

`npm run check` and `npm test` validate the source. `npm run build` runs source checks and creates `dist/` containing `index.html`, `assets/`, and `robots.txt`. This is a static site; there is no backend, database, or application bundler.

## Deploy from VS Code to Netlify

The root `netlify.toml` sets `command = "npm run build"` and `publish = "dist"`. The build script creates that directory, so Netlify will no longer expect a missing output folder.

Install and connect the Netlify CLI from the VS Code terminal:

```powershell
npm run build
npm install -g netlify-cli
netlify login
netlify link
netlify deploy --dir=dist --no-build
```

When prompted by `netlify link`, select the existing site `rainbow-daffodil-7f17f8` (or create a new site if desired). Open the draft URL printed by the CLI and inspect it. To update the live production URL only after checking the draft, run:

```powershell
npm run build
netlify deploy --prod --dir=dist --no-build
```

For drag-and-drop deployment, run `npm run build` and drag the **dist folder** to Netlify Drop, rather than dragging the project root. Netlify's CLI documentation confirms `netlify deploy` supports publishing a specific directory and `--no-build` for already-built files.

## Before production

1. Replace pending Pexels CDN images with verified local WebP/AVIF asset copies and update `docs/ASSET_CREDITS.md`.
2. Use client-approved property photographs; don't imply stock images show the actual premises.
3. Confirm Google links/rating, business hours if published, address and PIN, property-specific inventory, amenities and prices.
4. Configure the final canonical host and Open Graph share image. Add canonical metadata and `sitemap.xml` only after the production domain is confirmed.
5. Remove `Disallow: /` from `robots.txt` only after approval and public launch.
6. Run responsive browser QA with a network connection and real devices.

## Dependencies and data handling

No npm package dependency is required by the website itself. GSAP 3.13.0 and ScrollTrigger load from pinned CDN URLs in `index.html`; native animation fallbacks remain available if the CDN is blocked. No API keys or environment variables are required.

The inquiry form validates the name and phone locally, builds a WhatsApp message preview, and only opens WhatsApp after the visitor explicitly clicks its confirmation CTA. It does not send a request to this static site, persist form details, or claim that the enquiry was delivered.
