# The Guardian PG — Vayora Website Concept

A responsive, editorial one-page website concept for **The Guardian PG / Guardian Girls Hostel**, focused on the Dehradun property. This is a concept preview developed by Vayora; it is not the official live Guardian website.

## What is included

- Responsive navigation, hero and section choreography for mobile through wide desktop.
- Room-option enquiries without publishing unverified Dehradun pricing or vacancy claims.
- Amenity questions that explicitly ask the resident to confirm current inclusions.
- Gallery lightbox with keyboard controls and representative-image disclosures.
- Google Business review attribution and one-time rating/review-count counters.
- A Google Maps embed and directions link using the verified Place ID returned for the business listing.
- A validated inquiry form that creates a WhatsApp message preview in the browser. The visitor must explicitly select **Open WhatsApp to send**; the form does not post to a server.
- GSAP + ScrollTrigger progressive enhancement, IntersectionObserver/CSS fallback, and reduced-motion support.
- Transparent Guardian logo exports, illustrative local image fallbacks, and content/asset/QA notes.

## Run locally

**Requirements:** Node.js 18+ (Node 20+ recommended). There are no npm package dependencies to install; GSAP and ScrollTrigger are loaded from a pinned public CDN and the site has a native fallback if they are blocked.

```bash
npm run dev
```

Open `http://localhost:4173`.

Other commands:

```bash
npm run check  # source-level validation
npm run build  # same validation; this is a static site, so no bundler is required
npm test       # source-level regression checks
```

Change the port with `PORT=5000 npm run dev` (macOS/Linux) or `$env:PORT=5000; npm run dev` (PowerShell).

## Project structure

```text
assets/
  brand/       Original supplied logo, trimmed transparent exports, favicon
  css/         Responsive token-led visual system
  images/      Locally available illustrative fallbacks; remote representative image sources are documented
  js/          Central business data and interactive behavior

docs/          Design, content, motion, asset, build and QA records
scripts/       Source-level verification
qa/            Responsive browser screenshots and browser test script (generated during QA)
index.html     Complete semantic page
server.mjs    Small dependency-free static server
```

## Before publishing

1. Replace representative stock imagery with Guardian-approved Dehradun property photographs wherever possible. The CDN image URLs and verification blocker are recorded in `docs/ASSET_CREDITS.md`; confirm each original Pexels page and usage rights before publishing.
2. Confirm which room types are currently available at this property, their prices, deposits, inclusions and move-in requirements.
3. Confirm which facilities are currently offered at Dehradun (including Wi-Fi, meals, housekeeping, power backup, shared spaces, washrooms and any other advertised feature).
4. Confirm the complete address and postal code. Online listings currently surface both 248001 and 248007, so neither is hard-coded into the visible address.
5. Confirm whether any business attributes, house rules, visit hours, review excerpts or certifications may be presented. This concept uses no invented testimonials, safety guarantees or certifications.
6. Approve the final rating/review count and Google links on the day of launch. The supplied public listing was checked on 24 October 2026 and showed 4.6/5 from 145 reviews.
7. Set the production canonical URL, remove the concept-only `Disallow: /` in `robots.txt`, then create a sitemap for that confirmed domain.
8. Review `docs/TEST_REPORT.md`. Network-dependent visual asset and CDN checks could not be completed from the isolated runtime.

## Stack and dependency choices

This project was intentionally built as semantic HTML/CSS/JavaScript rather than introducing an empty React/Next.js shell without an existing repository or dependency access. `package.json` and `package-lock.json` define the zero-package local setup. GSAP 3.13.0 and ScrollTrigger are loaded via pinned CDN scripts for scroll reveals and hero parallax; CSS + IntersectionObserver maintain useful behavior if the CDN is blocked. A separate WebGL scene was intentionally skipped because it would add weight without improving this property-led, photography-first story.

No backend, analytics, API keys, environment variables or secret values are required. The only form behavior is client-side validation and an explicit WhatsApp hand-off.

See `docs/BUILD_AND_RUN.md` for deployment notes and `docs/CONTENT_VERIFICATION.md` for launch blockers.
