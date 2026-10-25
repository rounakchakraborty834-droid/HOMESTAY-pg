# Animation Guide

## Goals

Motion should support the visitor's understanding and give the page a calm editorial rhythm. It must not hide essential copy or trap scroll input.

## Implemented motion

- **Entry:** title and copy reveal with opacity + vertical transform; if GSAP fails, IntersectionObserver reveals sections as they enter the viewport.
- **Hero depth:** GSAP/ScrollTrigger adds a small `yPercent` drift to the hero image when the relevant CDN scripts are available. There is no forced scroll length or pinned scene.
- **Section entrances:** once-only ScrollTrigger reveals at `top 88%` on desktop; the fallback uses `IntersectionObserver` and unobserves each reveal after it enters.
- **Room rows and amenity content:** concise upward opacity reveals, not large spatial movements or repeated loops.
- **Micro-interactions:** underline reveals, CTA hover/press states, menu drawer, dialog lightbox and subtle header/scroll-progress feedback use CSS/JavaScript without adding an animation engine.
- **Rating / review count:** a one-time count-up starts near the lower-page review/location journey. Static values remain in markup and screen-reader text is not changed per frame.

## Reduced motion and fallback behavior

- `prefers-reduced-motion: reduce` disables transitions/animations, marks reveal content visible and immediately sets the final review values.
- Core copy and controls are normal HTML and remain present without JavaScript. Initial hidden styles apply only after `main.js` adds its motion class.
- If GSAP/ScrollTrigger cannot load, the page does not throw away content; it uses native reveal behavior.
- No WebGL, continuous particle system, forced smooth scrolling or pinned sequence is used.
- Only transforms and opacity are animated by GSAP. Scroll work is passive and throttled through `requestAnimationFrame`.

## QA checklist

- [ ] Test mouse-wheel, trackpad, touch, keyboard and the reduced-motion media preference on actual devices.
- [ ] Confirm CDN success and fallback by testing with the CDN blocked.
- [ ] Inspect the hero at initial, partial-scroll and exit frames to ensure headline readability.
- [ ] Ensure no reveal remains hidden if a script fails.
- [ ] Check low-end phone frame rate and image loading after approved local photography is added.
- [ ] Confirm each ScrollTrigger is one-time or scrub-only as intended and that no unexpected pins are created.

Runtime limitation: the isolated shell failed DNS lookups for public website/CDN hosts, so the GSAP/CDN-success path could not be confirmed in the current run. The code-level fallback was browser-tested separately; see `TEST_REPORT.md`.
