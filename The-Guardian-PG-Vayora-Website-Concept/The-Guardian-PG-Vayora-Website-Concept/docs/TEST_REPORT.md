# Test Report

**Date:** 24 October 2026  
**Overall local status:** PASS for source assertions and isolated-browser QA. **Not a production-launch certification.**

## Environment

- Node.js: 22.16.0
- npm: 10.9.2
- Python: 3.13.5
- Chromium executable: `/usr/bin/chromium`
- External network was blocked for the offline browser run. Live remote image, Google Maps/reviews, Google Fonts, and GSAP CDN behavior could not be fully verified in that run.

## Commands run

| Command / check | Result |
|---|---|
| `npm run check` | PASS — all source-level assertions passed. |
| `npm run build` | PASS — static-site validation passed. No bundler is required. |
| `npm test` | PASS — same source regression assertions passed. |
| Offline Chromium responsive QA | PASS — 360, 390, 430, 768, 1024, 1280, 1440, and 1920 px viewport widths showed no horizontal overflow. |
| Mobile navigation | PASS — open, navigate, close. |
| Gallery dialog | PASS — open, keyboard-next, close. |
| Inquiry form | PASS — validation, WhatsApp message preview, details included, explicit WhatsApp hand-off URL prepared. No server submission is claimed. |
| Local illustrative image fallback | PASS — 9 local illustration images, 0 broken images in the offline run. |
| Rating counter | PASS — settled at 4.6 and 145 in the tested static content. Verify live figures before release. |
| Reduced motion | PASS — reveal content stays visible. |
| Browser JavaScript errors | None recorded in the offline run. |
| ZIP integrity | Confirmed after packaging using `unzip -t`. |

Detailed dimensions and interaction outcomes are recorded in `qa/browser-results.json`. Screenshots for desktop hero, rooms, location, reviews and inquiry, plus mobile hero, gallery and reduced-motion states, are in `qa/screenshots/`. Browser QA used local illustration fallbacks and intentionally omitted live maps and remote stock images.

## Manual QA still required before launch

- Validate exact remote photo IDs and creator/license pages; replace remote-only photo use with optimized local copies after confirmation. The included SVGs are clearly illustrative fallbacks, not photos of the property.
- Confirm Google Maps and Google review URLs in an ordinary network-enabled browser.
- Confirm GSAP / ScrollTrigger from its pinned CDN in a network-enabled browser; also verify the native fallback when blocked.
- Run real-device reduced-motion, keyboard and screen-reader checks.
- Confirm the address PIN, room inventory/pricing/inclusions, amenities and authentic property photographs with the client.
- Reverify the Google rating and review count on launch day.

No production deployment was performed. Passing local source/browser checks does not certify external services, current inventory, property details or live third-party data.
