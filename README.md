# The Guardian PG — Premium Website Concept

<p align="center">
  <a href="https://guardian-pg-vayora.netlify.app/">
    <strong>🌐 View Live Website</strong>
  </a>
</p>

A modern, premium website concept for **The Guardian PG — Feel Home**, a girls' accommodation provider in Dehradun, Uttarakhand. Designed and developed by **Vayora**, this project reimagines the property's online presence with an elegant visual identity, responsive layouts, refined animations, interactive room enquiries, and direct WhatsApp communication.

The experience is designed to help prospective residents explore accommodation options, learn about the property, find its location, and enquire directly with the Guardian PG team.

> **Project status:** Independent website concept and live demo created by Vayora. This is not the official website of The Guardian PG.

## 🌐 Live Demo

**Website:** https://guardian-pg-vayora.netlify.app/

## ✨ Key Features

### Premium UI/UX Design
- Editorial-inspired layout with a refined visual hierarchy.
- Carefully considered typography using DM Sans, Manrope, and Playfair Display.
- Deep green, neutral, and warm accent colours.
- Large visual sections, distinctive headings, spacious layouts, and subtle motion.
- Responsive design for mobile phones, tablets, laptops, and desktop screens.

### Interactive Website Experience
- Responsive navigation with mobile menu support.
- Animated hero section and scroll-based reveals.
- GSAP and ScrollTrigger enhancements with CSS and IntersectionObserver fallbacks.
- Reduced-motion support for users who prefer fewer animations.
- Scroll progress indicator and interactive image gallery.
- Keyboard-accessible gallery lightbox with previous and next controls.

### Room Options
Visitors can explore enquiry options for:
- Private rooms
- Double-sharing rooms
- Triple-sharing rooms
- Quad-sharing rooms

Room pricing and availability are intentionally left for direct confirmation with the property team. The website does not present unverified rates or vacancies as facts.

### WhatsApp Enquiry System
The custom enquiry form collects preferences such as:
- Name and phone number
- Student or working-professional status
- University or workplace
- Preferred move-in date and length of stay
- Room preference and number of occupants
- Meal preferences and additional questions

The form validates the visitor's input and generates a WhatsApp message preview. Visitors can review the message and explicitly choose to open WhatsApp to send it.

**No enquiry form data is submitted to a website backend.** The visitor initiates the WhatsApp handoff.

### Location and Contact Integration
- Google Maps embed and directions link.
- Click-to-call telephone link.
- Direct WhatsApp enquiry links.
- Links to the property's existing website and Instagram profile.
- Google Business Profile review link and attributed rating information.

### Performance, Accessibility and SEO Foundations
- Semantic HTML structure and responsive viewport configuration.
- Descriptive image alternative text and accessible navigation labels.
- Lazy loading for supporting images.
- Reduced-motion handling and progressive enhancement.
- Basic page metadata and Open Graph tags.
- Structured data for the accommodation business.
- A lightweight static architecture without an application framework or backend.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure and content |
| CSS3 | Responsive layouts, design system, transitions and animations |
| JavaScript (ES Modules) | Form validation, navigation, gallery and interactive behaviour |
| GSAP 3.13.0 | Animation enhancements |
| GSAP ScrollTrigger | Scroll-based animation effects |
| IntersectionObserver | Progressive enhancement and reveal behaviour |
| Google Maps | Location display and directions |
| WhatsApp | Direct visitor-initiated enquiries |
| Node.js | Local development server and build tooling |
| Netlify | Live demo hosting and deployment |

The project uses vanilla HTML, CSS, and JavaScript instead of introducing a framework that would add unnecessary complexity for this static, content-focused experience.

## 📍 Property Information

**Business:** The Guardian PG / Guardian Girls Hostel  
**Location:** 1027, Pondha Village, UPES University Road, Dehradun, Uttarakhand, India  
**Contact:** +91 95601 66155  
**Live concept:** https://guardian-pg-vayora.netlify.app/  
**Existing website:** https://guardianhostel.com/

Property prices, availability, facilities, house rules, and other operational details should be confirmed directly with the business.

## 🚀 Run Locally

### Prerequisites
- Node.js 18 or later; Node.js 20+ is recommended.
- Git, if cloning the repository.

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

Replace the placeholders with your repository's actual URL and folder name.

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the website

Visit:

```text
http://localhost:4173
```

No additional npm packages are required for the supplied setup. GSAP and ScrollTrigger are loaded from a public CDN, with fallback behaviour for essential interactions when those scripts are unavailable.

## 🧪 Available Commands

```bash
npm run dev
```
Starts the local development server.

```bash
npm run check
```
Runs the project's source-level validation checks.

```bash
npm test
```
Runs the configured validation checks.

```bash
npm run build
```
Validates the project and creates a deployment-ready `dist/` directory.

## 📂 Project Structure

```text
.
├── assets/
│   ├── brand/
│   │   ├── guardian-logo.png
│   │   ├── guardian-logo.webp
│   │   └── favicon.svg
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   ├── room-bedroom.svg
│   │   ├── room-lounge.svg
│   │   ├── room-study.svg
│   │   └── room-terrace.svg
│   └── js/
│       ├── business-data.js
│       └── main.js
├── docs/
│   ├── ANIMATION_GUIDE.md
│   ├── ASSET_CREDITS.md
│   ├── BUILD_AND_RUN.md
│   ├── CONTENT_VERIFICATION.md
│   ├── DESIGN_AND_SKILL_AUDIT.md
│   └── TEST_REPORT.md
├── scripts/
│   ├── build.js
│   └── check.js
├── qa/
│   ├── browser-results.json
│   ├── qa-responsive.py
│   └── screenshots/
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── robots.txt
├── MANIFEST.txt
└── server.mjs
```

The build process generates `dist/`, which contains the static website files ready for deployment.

## ☁️ Deployment

The live concept is hosted on Netlify.

The included `netlify.toml` configures the build command and publish directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

To prepare a production build:

```bash
npm run build
```

Deploy the resulting `dist/` directory through Netlify or connect the GitHub repository to Netlify for continuous deployment.

Before production publication, review `robots.txt`, configure the canonical domain, add an appropriate sitemap, and verify the website content and assets.

## 🎨 Design and Content Notes

- The Guardian logo is included in PNG and WebP formats, along with a favicon.
- Representative interior images are used as visual references and are not verified photographs of the actual Dehradun property.
- Room types are enquiry prompts, not guarantees of current availability.
- Facilities and inclusions are presented as details to confirm with the business.
- No payment gateway, online booking engine, user account system, or backend enquiry database is included.
- The form prepares a message locally and gives visitors control over when to open WhatsApp.
- Current business information, imagery, review figures, and property details should be reviewed before any official launch.

## 🔮 Potential Future Improvements

- Replace illustrative imagery with approved, authentic property photography.
- Add verified room pricing, availability, and facility information.
- Introduce an enquiry management dashboard if the business requires one.
- Add consent-based analytics and conversion tracking.
- Complete production-domain SEO configuration and sitemap generation.
- Add further performance testing and cross-device verification.

## 👨‍💻 Built by Vayora

This project demonstrates Vayora's approach to modern website design and development, combining visual storytelling, responsive engineering, thoughtful interactions, accessibility considerations, and practical customer enquiry flows.

**Explore the live concept:** https://guardian-pg-vayora.netlify.app/

---

*An independent design and development concept by Vayora. All property details remain subject to confirmation by The Guardian PG.*
