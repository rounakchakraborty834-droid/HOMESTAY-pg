# Asset Credits and Image Usage

## Brand asset

- `assets/brand/guardian-logo-original.png` — supplied by the project owner in this conversation. It already contained alpha transparency despite appearing on black in the preview. Kept unchanged as the source.
- `assets/brand/guardian-logo.png` — trimmed transparent PNG export of the supplied logo; the original was not modified.
- `assets/brand/guardian-logo.webp` — trimmed lossless WebP copy for site use. Confirm the final appearance on both light/dark backgrounds before launch.
- `assets/brand/favicon.svg` — small, hand-authored favicon inspired by the house mark; it is not an official replacement brand asset.

## Representative stock images in `index.html`

These image URLs use Pexels-hosted CDN candidates as visual inspiration. The sandbox could not resolve image hosts, so I could not verify that each exact image ID is live, download a local photograph, inspect its creator page, or capture exact license metadata. Treat all of them as **pending asset verification** and replace them with approved local WebP/AVIF files before the public launch. The visible site labels state that these are representative interiors, not photographs of Guardian PG.

| Purpose | Current CDN candidate | Verification link |
|---|---|---|
| Hero / room inspiration | `https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1800` | [Pexels bedroom search](https://www.pexels.com/search/bedroom/) |
| Study / story image | `https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400` | [Pexels room search](https://www.pexels.com/search/room/) |
| Study / living card | `https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1300` | [Pexels study-room search](https://www.pexels.com/search/study%20room/) |
| Shared lounge | `https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1100` | [Pexels living-room search](https://www.pexels.com/search/living%20room/) |
| Terrace mood | `https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1100` | [Pexels terrace search](https://www.pexels.com/search/terrace/) |

**Release steps for each stock image:** confirm the exact Pexels photo page and creator; verify current Pexels License applicability; retain any attribution/usage notes required; download the approved source; create local responsive WebP/AVIF derivatives at the actual display widths; use an optimized local poster for the hero; update `index.html`; and preserve the “representative imagery” labels until actual Guardian property photos replace the illustrative stock.

## Local fallback art

- `assets/images/room-bedroom.svg`
- `assets/images/room-lounge.svg`
- `assets/images/room-study.svg`
- `assets/images/room-terrace.svg`

These are custom vector illustrations authored for this concept. They are not AI-generated photographs, are not claimed as actual property images, and exist so the page remains visually composed if a remote image fails. The page labels the associated visual content as illustrative.

## Video and external imagery

No video is used. There is no auto-playing footage, audio, or hidden video download. No actual Guardian PG property photographs were included among the uploaded assets; only the brand logo was supplied.
