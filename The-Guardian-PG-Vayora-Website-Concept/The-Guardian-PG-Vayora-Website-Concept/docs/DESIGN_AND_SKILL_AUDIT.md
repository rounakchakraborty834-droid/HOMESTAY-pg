# Design and Skill Audit — Guardian PG / Vayora

**Prepared:** 24 October 2026  
**Project context:** A concept for a real Dehradun girls' PG, focused on enquiry quality and resident understanding rather than a booking engine. No existing source repository was included in the accessible workspace, so the implementation is a self-contained static project.

## Creative direction and visitor journey

The page grammar deliberately alternates quiet editorial sections, a dark room-selection section, an amenities checklist, a mosaic gallery, the location/reviews sequence and a functional inquiry form. It avoids repeating identical feature cards throughout. The cream/forest/terracotta/gold system, high-contrast editorial serif, compact utility labels and large photographic blocks are intended to feel like a small hospitality brand rather than generic real estate.

**Journey:** understand the welcome → see Dehradun context → compare room enquiry prompts → understand daily-life questions → browse explicitly illustrative interiors → read an attributed public rating → find the property → prepare a WhatsApp enquiry.

**Signature moment:** the hero uses an arched image crop, an offset floating “FEEL HOME” plaque, a rotating decorative orbit and a small scroll-driven image drift on desktop. The rest of the page changes device and rhythm (numbered room list, open editorial image/quote split, amenity grid, mosaic lightbox and review/location split); the hero effect is not repeated on every section. Phones use a shorter image crop and remove the side label rather than simply shrinking the desktop composition.

## Reference workflow: what was inspected and applied

| Reference | Inspection / useful principle | Application in this project |
|---|---|---|
| [Scroll Craft](https://github.com/nateherkai/scroll-craft) — README, `SKILL.md`, `references/devices.md`, `references/hero-depth.md`, `references/approved-collection.md` | Vary section behavior; plan independent depth planes; preserve text as semantic HTML; avoid continuous camera flights; art-direct phone layouts independently; inspect actual scroll frames. | Distinct section grammars, responsive hero, one restrained parallax layer, non-pinned flow and local fallbacks. Relevant code: `index.html`, `assets/css/styles.css`, `assets/js/main.js`. |
| [GSAP Skills](https://github.com/greensock/gsap-skills) — README, `gsap-scrolltrigger/SKILL.md`, `gsap-performance/SKILL.md` | Register ScrollTrigger; trigger one-time reveals; favor transform/opacity over layout mutation; limit pinned work; keep a lightweight fallback. | `gsap.registerPlugin(ScrollTrigger)`, viewport triggers with `once: true`, transform-based hero drift, no pinned scenes. `assets/js/main.js`. |
| [WebGL Animation Skills](https://github.com/iart-ai/webgl-animation-skills) — README and `threejs-animation/SKILL.md` | Use WebGL only for a justified 3D need; cap render density, respect page visibility, dispose GPU resources if used. | No WebGL renderer is used: the brief is photography-led and does not need a GPU scene. This is a deliberate performance choice, not an unimplemented requirement hidden as complete. |
| [shadcn/ui](https://github.com/shadcn-ui/ui) — README and component approach | Use accessible, adaptable primitives rather than shipping an unchanged component-library theme. | Native semantic navigation, form fields, buttons and `<dialog>` gallery with visible focus states. No React framework existed in the provided workspace, so shadcn/ui was not installed as a runtime dependency. |
| [Anthropic Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) — `SKILL.md` | Subject-specific visual choices; typography with intent; avoid templated dashboard/stat-gradient defaults; make the opening frame characteristic. | Editorial hospitality layout, warm material palette, custom asymmetric compositions, concise section copy and limited type families. |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — README, installation and design-system guidance | Establish design tokens and test responsive/accessibility details; run a review rather than relying on a style prompt alone. | Tokens are centralized in `:root`; mobile-specific layout rules; reduced-motion and focus handling; `scripts/check.js` and `qa/qa-responsive.py`. CLI installation was blocked by the runtime network limitation. |
| [Ponytail](https://github.com/DietrichGebert/ponytail) — README, `skills/ponytail/SKILL.md`, install notes and MIT license metadata | Prefer the smallest complete solution; keep trust-boundary validation, accessibility, error handling and at least one check for nontrivial logic. | Zero npm packages, no fake backend, browser-side phone/name validation and static source checks. It is a coding-agent plugin, not a page dependency; it was inspected but not installed into this session. |
| [Sweet Tape](https://sweettape.com/) | The supplied domain was attempted but the web fetch timed out; no claim is made that its live page was fully inspected. | No specific visual asset or layout was copied from it. |
| [Era Residence](https://www.era-residence.com/) | Identified from the supplied reference context; contemporary residence storytelling, varied image sequencing and motion. | Used only as a reminder to vary photographic beats and section rhythm, not copied layout or code. |
| [Nick Ho](https://nickho-motorsports.nl/) | The supplied reference was resolved through public design-reference results to the motorsports portfolio; its use of numbered/vertical metadata and distinct dark/bright acts informed the pacing. | Applied as restrained small numbering/edge metadata rather than importing motorsports imagery or visual identity. |
| [Awwwards hotel sites](https://www.awwwards.com/websites/hotels/), [htmlBurger hotel examples](https://htmlburger.com/blog/best-hotel-website-design/), [Hotel Tech Report design examples](https://hoteltechreport.com/news/hotel-website-designs) | Hotel-design overview pages reviewed where accessible; visual inspiration only. Awwwards itself was inaccessible through the web viewer during this run. | Image-led hierarchy and clear direct contact paths; no reference code, copy or brand assets reused. |
| [Pexels photos](https://www.pexels.com/) and [Pexels videos](https://www.pexels.com/videos/) | Use relevant stock imagery only as representative inspiration, not claimed as property photography. Exact photo-page/creator details could not be verified from the isolated runtime. | Direct Pexels CDN candidates are used with visible “representative interior” labels; vector fallbacks are local. See `ASSET_CREDITS.md`; the photo URLs still need a release check and local optimization. |

## Installation and integration blockers

- **Workspace source:** no prior Vayora project repository or application source was present in the mounted workspace. The only supplied assets were the logo and the request brief. No existing application was overwritten.
- **Repository downloads/package installation:** shell DNS resolution failed for `guardianhostel.com` and `images.pexels.com`; the runtime therefore cannot fetch packages/assets normally. GitHub reference text was inspected through the connected public repository reader, but the full skills repositories could not be installed into an agent skill directory.
- **Ponytail:** inspected with MIT license metadata; not installed as a host plugin because this runtime exposes no supported command to register the agent plugin, and package network access fails. Its minimal-change/testing principles were applied manually.
- **21st.dev MCP:** no 21st.dev tool or MCP configuration control is exposed in this session's available tool list. No connection is claimed and no credentials are embedded. If a credential was shared outside this accessible brief, rotate it before any future use.
- **WebGL:** not added because a heavyweight 3D scene would increase load and not improve the visitor task. Motion uses GSAP + ScrollTrigger when available, with IntersectionObserver fallback.
- **Photography:** this runtime cannot download the stock images for local self-hosting. Local vector images are only fallbacks, not a substitute for client-approved property photos. Do not treat this package as final-photo-ready until `ASSET_CREDITS.md` has been cleared.

## Design system decisions

- **Color:** warm ivory, deep forest, sage, muted terracotta and a restrained gold, with contrasting light/dark acts.
- **Type:** Playfair Display for editorial statements; DM Sans/Manrope for navigation, labels and form text; generic fallbacks preserve readability offline.
- **Layout:** content max 1320px; fluid gutters; responsive composition changes under 900px and 640px; room list becomes a single-column metadata pattern.
- **Interaction:** clear hover/focus states, accessible menu drawer, gallery dialog with arrow keys, form errors by field, review values static in no-JS markup, and two-step WhatsApp hand-off.
- **Content integrity:** no fabricated testimonial quotes, inventory counters, prices, safety guarantees or made-up policies. Unknown prices and availability become direct questions.
