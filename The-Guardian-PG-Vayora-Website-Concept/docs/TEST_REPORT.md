# Test Report

**Date:** 24 October 2026  
**Overall local status:** PASS for source checks, static output build, and isolated-browser QA. **Netlify production deployment has not been performed from this environment.**

## Environment

- Node.js: 22.16.0
- npm: 10.9.2
- Python: 3.13.5
- Chromium executable: `/usr/bin/chromium`
- External network was blocked for the offline browser run. Live remote image, Google Maps/reviews, Google Fonts, and GSAP CDN behavior could not be fully verified in that run.

## Commands run

| Command / check | Result |
|---|---|
| `npm run check` | PASS — source assertions passed, including Netlify configuration and build-script checks. |
| `npm test` | PASS — all source-level assertions passed. |
| `npm run build` | PASS — checks source and creates `dist/`. |
| `dist/` output audit | PASS — includes `index.html`, all `assets/`, and `robots.txt`; source docs and server code are excluded from the publish output. |
| Local static server smoke test | PASS on this Linux QA runtime — homepage returned 200, stylesheet returned 200, and an encoded traversal request did not escape the project root. Windows path handling was corrected but not executed on a Windows runtime here. |
| Netlify config audit | PASS — `netlify.toml` runs `npm run build` and publishes `dist`. |
| Offline Chromium responsive QA | PASS — 360, 390, 430, 768, 1024, 1280, 1440, and 1920 px viewport widths showed no horizontal overflow. |
| Mobile navigation | PASS — open, navigate, close. |
| Gallery dialog | PASS — open, keyboard-next, close. |
| Inquiry form | PASS — validation, WhatsApp message preview, details included, explicit WhatsApp hand-off URL prepared. No server submission is claimed. |
| Local illustrative image fallback | PASS — local SVG illustration fallbacks loaded in the offline run. |
| Rating counter | PASS — settled at 4.6 and 145 in the tested static content. Verify live figures before release. |
| Reduced motion | PASS — reveal content stays visible. |
| Browser JavaScript errors | None recorded in the offline run. |
| ZIP integrity | PASS — final source archive passed `unzip -t` verification after packaging. |

Detailed dimensions and interaction outcomes are recorded in `qa/browser-results.json`. Screenshots for desktop hero, rooms, location, reviews and inquiry, plus mobile hero, gallery and reduced-motion states, are in `qa/screenshots/`. Browser QA used local illustration fallbacks and intentionally omitted live maps and remote stock images.

## Netlify deployment status

- Added root `netlify.toml` with build command `npm run build` and publish directory `dist`.
- Added `scripts/build.js` to create the deploy-ready output from `index.html`, `assets/`, and `robots.txt`.
- Updated package scripts so `npm run build` creates the exact directory Netlify is configured to publish.
- Fixed static-server path containment to work across Windows and POSIX path separators.
- The Netlify CLI was not authenticated to the user's Netlify account in this environment. The preview and production deploy commands are documented in `docs/BUILD_AND_RUN.md`; final account deployment must be run from the user's VS Code terminal.

## Manual QA still required before launch

- Validate exact remote photo IDs and creator/license pages; replace remote-only photo use with optimized local copies after confirmation.
- Confirm Google Maps and Google review URLs in an ordinary network-enabled browser.
- Confirm GSAP / ScrollTrigger from its pinned CDN in a network-enabled browser; also verify the native fallback when blocked.
- Run real-device reduced-motion, keyboard and screen-reader checks.
- Confirm the address PIN, room inventory/pricing/inclusions, amenities and authentic property photographs with the client.
- Reverify the Google rating and review count on launch day.

Passing local source/browser checks does not certify external services, current inventory, property details or live third-party data.
