# The Guardian PG — Vayora Website Concept

<p align="center">
  <a href="https://guardian-pg-vayora.netlify.app/">
    <strong>🌐 VIEW LIVE WEBSITE</strong>
  </a>
</p>

<p align="center">
  A premium, responsive website concept for The Guardian PG / Guardian Girls Hostel in Dehradun, designed and developed by Vayora.
</p>

<p align="center">
  <a href="https://guardian-pg-vayora.netlify.app/">Live Demo</a> ·
  <a href="https://github.com/rounakchakraborty834-droid/LOCO_MOTION-ANIMATED-SITE">Explore Loco Motion</a>
</p>

---

## 📖 About the Project

**The Guardian PG — Feel Home** is a responsive, editorial-style, one-page website concept focused on the Dehradun property of Guardian PG / Guardian Girls Hostel.

Developed by **Vayora**, the project reimagines the property's online experience through refined typography, considered layouts, smooth animation, interactive room enquiries, location information, and direct WhatsApp communication.

The experience is designed for students and working women exploring accommodation in Dehradun. Visitors can discover room options, explore illustrative interiors, review location information, and prepare an enquiry for the property team.

> **Project status:** Independent website concept and live preview. This is not the official live website of The Guardian PG.

## 🌐 Live Website

**Guardian PG — Vayora Concept:**  
https://guardian-pg-vayora.netlify.app/

**Existing Guardian website:**  
https://guardianhostel.com/

## ✨ Key Features

### 🎨 Premium UI/UX Design

- Editorial-inspired layout with a strong visual hierarchy.
- Responsive design for mobile phones, tablets, laptops, and desktop screens.
- Typography using DM Sans, Manrope, and Playfair Display.
- A considered colour system with deep green, neutral tones, and warm accents.
- Large visual sections, expressive headings, generous spacing, and refined interactions.
- A cohesive design system implemented using semantic HTML and CSS.

### 📱 Responsive Navigation and Page Layout

- Responsive navigation with mobile menu support.
- Hero section with prominent messaging and calls to action.
- Structured content sections with scroll-based visual choreography.
- Dedicated sections for room options, everyday living, amenities, gallery, location, reviews, and enquiries.
- Footer navigation and persistent WhatsApp access.

### 🛏️ Room Options and Enquiries

The website presents four room categories to help visitors begin an accommodation enquiry:

- Private room
- Double-sharing room
- Triple-sharing room
- Quad-sharing room

Room pricing, deposits, availability, inclusions, and move-in requirements are left for direct confirmation with the property team.

The concept does not present unverified rates or vacancies as confirmed facts.

### 🏠 Interactive Gallery

- Editorial-style interior gallery.
- Gallery lightbox with previous and next navigation.
- Keyboard-accessible gallery controls.
- Representative-image disclosures.
- Locally available illustrative fallback assets.

**Image note:** The current interiors are representative visual references, not verified photographs of the Guardian PG property. Client-approved photographs should replace them before an official launch.

### 🧾 Accommodation and Amenities Information

The amenities section helps visitors ask the property team about:

- Wi-Fi
- Meals and meal timings
- Housekeeping
- Power backup
- Shared spaces
- Room furnishings, washrooms, and ventilation

These are enquiry prompts rather than guarantees that the facilities are currently available or included.

### 📍 Location and Contact Integration

- Google Maps embed.
- Directions link using the business listing's Place ID.
- Click-to-call telephone link.
- Direct WhatsApp links.
- Links to the existing website and Instagram profile.
- Google Business Profile review link and attributed review information.

**Property location:** 1027, Pondha Village, UPES University Road, Dehradun, Uttarakhand, India.

**Contact:** +91 95601 66155

### 💬 Interactive WhatsApp Enquiry Form

The custom enquiry form helps prospective residents prepare a structured message with details such as:

- Name and phone number.
- Student or working-professional status.
- University or workplace.
- Preferred move-in date.
- Intended duration of stay.
- Room preference and number of occupants.
- Meal preferences and additional questions.

The form validates the visitor's input and prepares a WhatsApp message preview in the browser.

The visitor must explicitly choose **Open WhatsApp to send** before the message is handed off to WhatsApp.

**Privacy and behaviour:** The form does not submit information to a website backend or create an online booking. The visitor controls whether to open WhatsApp and send the prepared message.

### 🎞️ Animation and Motion

- GSAP and ScrollTrigger enhancements.
- Scroll-based reveals and hero parallax.
- IntersectionObserver and CSS fallback behaviour.
- Reduced-motion support for visitors who prefer fewer animations.
- Scroll progress indication and floating interface elements.

Animation is used to support the page's visual hierarchy while keeping essential content and contact links accessible if the animation libraries are unavailable.

### 🔎 SEO and Accessibility Foundations

- Semantic HTML structure.
- Responsive viewport configuration.
- Page description and Open Graph metadata.
- Structured data for the accommodation business.
- Descriptive image alternative text.
- Accessible navigation labels and gallery controls.
- Lazy loading for supporting images.
- Progressive enhancement and reduced-motion handling.

Production-domain SEO configuration and content verification remain part of the launch checklist.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure and content |
| CSS3 | Responsive layouts, styling, and design system |
| Vanilla JavaScript | Navigation, validation, gallery, and interactions |
| GSAP 3.13.0 | Animation enhancements |
| GSAP ScrollTrigger | Scroll-based animations and parallax |
| IntersectionObserver | Progressive enhancement |
| HTML Dialog API | Gallery lightbox |
| Google Maps | Property location and directions |
| WhatsApp | Visitor-initiated enquiries |
| Node.js | Local development server and build tooling |
| Netlify | Website hosting and deployment |

### Architecture and Dependencies

The project uses semantic HTML, CSS, and JavaScript rather than adding a React or Next.js framework without a practical requirement.

There are no npm package dependencies to install for the current setup. GSAP and ScrollTrigger are loaded from pinned public CDN URLs, with native CSS and IntersectionObserver fallbacks for essential visual enhancements.

No backend, analytics, API keys, environment variables, or secret values are required.

## 🚀 Run Locally

### Prerequisites

- Node.js 18 or later.
- Node.js 20+ recommended.
- A terminal or command prompt.

The project does not require a separate npm package installation for its current zero-package setup.

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

Replace the placeholders with the repository's actual URL and folder name.

### 2. Start the Development Server

```bash
npm run dev
```

### 3. Open the Website

Visit:

```text
http://localhost:4173
```

The local server uses port `4173` by default.

### Available Commands

Run source-level validation:

```bash
npm run check
```

Build the deployment-ready website:

```bash
npm run build
```

Run the configured regression checks:

```bash
npm test
```

The build process validates the source and creates a `dist/` directory containing the static website files and assets.

### Change the Development Port

**PowerShell:**

```powershell
$env:PORT=5000; npm run dev
```

**macOS / Linux:**

```bash
PORT=5000 npm run dev
```

Then visit `http://localhost:5000`.

## ☁️ Deploy to Netlify

The project is a static HTML/CSS/JavaScript website. The included `netlify.toml` configures Netlify to build the project and publish the generated `dist/` directory.

### Deploy Using the Netlify CLI

Build the project:

```powershell
npm run build
```

Install the Netlify CLI if necessary:

```powershell
npm install -g netlify-cli
```

Authenticate with Netlify:

```powershell
netlify login
```

Connect the local project to an existing or new Netlify site:

```powershell
netlify link
```

Create a draft deployment:

```powershell
netlify deploy --dir=dist --no-build
```

Open the draft URL returned by Netlify and inspect the site before publishing.

When the draft is ready, publish it using:

```powershell
netlify deploy --prod --dir=dist --no-build
```

If connecting an existing Netlify site, select the intended site during the linking process.

### Deploy Using Netlify Drop

1. Run `npm run build`.
2. Locate the generated `dist/` folder.
3. Upload the **contents of the `dist/` folder** using Netlify Drop.
4. Open and test the resulting deployment URL.

Do not upload the project root as a substitute for the generated deployment directory.

## 📂 Project Structure

```text
.
├── assets/
│   ├── brand/
│   │   ├── favicon.svg
│   │   ├── guardian-logo-original.png
│   │   ├── guardian-logo.png
│   │   └── guardian-logo.webp
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   ├── images/
│   │   ├── room-bedroom.svg
│   │   ├── room-lounge.svg
│   │   ├── room-study.svg
│   │   └── room-terrace.svg
│   │
│   └── js/
│       ├── business-data.js
│       └── main.js
│
├── docs/
│   ├── ANIMATION_GUIDE.md
│   ├── ASSET_CREDITS.md
│   ├── BUILD_AND_RUN.md
│   ├── CONTENT_VERIFICATION.md
│   ├── DESIGN_AND_SKILL_AUDIT.md
│   └── TEST_REPORT.md
│
├── scripts/
│   ├── build.js
│   └── check.js
│
├── qa/
│   ├── browser-results.json
│   ├── qa-responsive.py
│   └── screenshots/
│
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── robots.txt
├── MANIFEST.txt
├── server.mjs
└── dist/                 # Generated by npm run build
```

The `docs/` directory records design, animation, asset, verification, and deployment decisions. The `qa/` directory contains browser test results, the responsive QA script, and screenshots.

The `dist/` folder is generated during the build process; it is not the primary source directory.

## ✅ Before Publishing Officially

The concept should be reviewed with the business before being used as its official website.

### Content and Assets

1. Replace representative stock imagery with Guardian-approved photographs of the actual Dehradun property wherever possible.
2. Verify image sources and usage rights, as documented in `docs/ASSET_CREDITS.md`.
3. Confirm current room categories, vacancies, prices, deposits, inclusions, and move-in requirements.
4. Confirm all facilities currently provided by the property.
5. Verify the complete postal address and PIN code. Available online listings have shown conflicting PIN codes, so neither should be hard-coded without confirmation.
6. Confirm which business attributes, house rules, visiting hours, certifications, and other claims may be published.

### Reviews and Business Information

7. Reconfirm the Google Business Profile rating, review count, and links immediately before launch. The supplied listing was checked on 24 October 2026 and showed 4.6/5 from 145 reviews at that time; these figures may change.
8. Confirm the telephone number, Instagram profile, existing website link, and map destination.
9. Ensure that all published statements are supported by approved business information.

### Production Readiness

10. Configure the correct production canonical URL.
11. Review and update the concept-only `Disallow: /` rule in `robots.txt` when the site is approved for search indexing.
12. Create a sitemap for the confirmed production domain.
13. Review `docs/TEST_REPORT.md`, `docs/BUILD_AND_RUN.md`, and `docs/CONTENT_VERIFICATION.md`.
14. Test the production deployment on desktop and mobile devices and verify the network-dependent imagery and CDN scripts.

Network-dependent visual asset and CDN checks were not fully completed in the isolated development environment, so these checks should be repeated on the deployed site.

## 🏗️ Design and Dependency Decisions

This project was intentionally implemented using semantic HTML, CSS, and JavaScript.

GSAP 3.13.0 and ScrollTrigger are loaded through pinned public CDN scripts to support scroll reveals and hero parallax. CSS and IntersectionObserver provide fallback behaviour for essential visual enhancements.

A separate WebGL scene was intentionally omitted because it would add complexity and rendering cost without a clear benefit for this property-focused, photography-led experience.

The project does not require a backend, analytics platform, API keys, environment variables, or server-side enquiry processing.

The enquiry flow is deliberately client-side: visitors validate their details, review a prepared message, and choose when to open WhatsApp.

For detailed technical information, see:

- `docs/BUILD_AND_RUN.md`
- `docs/CONTENT_VERIFICATION.md`
- `docs/ANIMATION_GUIDE.md`
- `docs/ASSET_CREDITS.md`
- `docs/DESIGN_AND_SKILL_AUDIT.md`
- `docs/TEST_REPORT.md`

## 🔮 Potential Future Improvements

- Introduce authentic, client-approved property photography.
- Add verified room information, pricing, and facility details.
- Improve asset optimization and page-loading performance.
- Extend cross-device and accessibility testing.
- Add an enquiry management system if the business requires backend processing.
- Introduce consent-based analytics if needed.
- Complete production SEO configuration, including the canonical URL and sitemap.

## 🌟 More Projects

### Loco Motion — Animated Website

An experimental web development website exploring scroll-driven animation, kinetic typography, smooth scrolling, pinned sections, and canvas-based image sequences.

**Live demo:**  
https://rounakchakraborty834-droid.github.io/LOCO_MOTION-ANIMATED-SITE/

**GitHub repository:**  
https://github.com/rounakchakraborty834-droid/LOCO_MOTION-ANIMATED-SITE

**Technology:** HTML, CSS, JavaScript, GSAP, ScrollTrigger, Locomotive Scroll, and HTML Canvas.

The two projects demonstrate different aspects of frontend development: Guardian PG focuses on responsive business presentation and practical enquiry flows, while Loco Motion explores motion-led visual storytelling and scroll interaction.

## 👨‍💻 Developed by Vayora

The Guardian PG concept demonstrates Vayora's approach to modern website design and development through visual storytelling, responsive engineering, purposeful interactions, accessibility considerations, and customer-focused enquiry flows.

**Live project:**  
https://guardian-pg-vayora.netlify.app/

**Additional project:**  
https://rounakchakraborty834-droid.github.io/LOCO_MOTION-ANIMATED-SITE/

---

*The Guardian PG website is an independent concept by Vayora and is not the official live Guardian website. All property information remains subject to confirmation by the business.*
