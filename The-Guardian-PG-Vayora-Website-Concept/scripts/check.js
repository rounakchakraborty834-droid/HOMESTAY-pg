import { readFile, access, stat } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const checks = [];
const mustExist = [
  'index.html', 'assets/css/styles.css', 'assets/js/main.js', 'assets/js/business-data.js',
  'assets/brand/guardian-logo.png', 'assets/brand/guardian-logo.webp', 'assets/brand/guardian-logo-original.png',
  'assets/brand/favicon.svg', 'assets/images/room-bedroom.svg', 'assets/images/room-lounge.svg',
  'assets/images/room-study.svg', 'assets/images/room-terrace.svg', 'README.md', 'docs/CONTENT_VERIFICATION.md',
  'docs/DESIGN_AND_SKILL_AUDIT.md', 'docs/ASSET_CREDITS.md', 'docs/ANIMATION_GUIDE.md',
  'docs/BUILD_AND_RUN.md', 'docs/TEST_REPORT.md', 'netlify.toml', 'scripts/build.js'
];
for (const path of mustExist) {
  try { await access(join(root, path)); checks.push(`PASS file exists: ${path}`); }
  catch { errors.push(`Missing required file: ${path}`); }
}
const html = await readFile(join(root, 'index.html'), 'utf8');
const js = await readFile(join(root, 'assets/js/main.js'), 'utf8');
const css = await readFile(join(root, 'assets/css/styles.css'), 'utf8');
const business = await readFile(join(root, 'assets/js/business-data.js'), 'utf8');
const docs = await readFile(join(root, 'docs/CONTENT_VERIFICATION.md'), 'utf8');
const mustHaveSections = ['hero', 'about', 'rooms', 'living', 'amenities', 'gallery', 'location', 'review-band', 'inquiry'];
for (const section of mustHaveSections) {
  if (html.includes(`class="${section}`) || html.includes(`id="${section}"`)) checks.push(`PASS section present: ${section}`);
  else errors.push(`Missing section: ${section}`);
}
for (const [pattern, label, source] of [
  ['wa.me/919560166155', 'WhatsApp phone link', html],
  ['encodeURIComponent(message)', 'URL-safe WhatsApp message encoding', js],
  ['whatsapp-preview', 'WhatsApp preview/explicit confirmation', html],
  ['prefers-reduced-motion', 'reduced-motion support', css],
  ['IntersectionObserver', 'native animation fallback', js],
  ['registerPlugin', 'GSAP ScrollTrigger registration', js],
  ['ChIJp4nKNwrVCDkRtq6zyvlvRxQ', 'verified Google Place ID reference', business],
  ['postalCode: null', 'conflicting PIN held out of publication', business],
  ['postal code is intentionally omitted', 'PIN disclosure on page', html],
  ['not a verified Guardian PG', 'stock imagery disclosure', html],
  ['awaiting client confirmation', 'verification checklist present', docs]
]) {
  if ((label === 'verification checklist present' ? source.toLowerCase() : source).includes((label === 'verification checklist present' ? pattern.toLowerCase() : pattern))) checks.push(`PASS ${label}`);
  else errors.push(`Missing expected behavior/text: ${label}`);
}
const netlifyConfig = await readFile(join(root, 'netlify.toml'), 'utf8');
if (netlifyConfig.includes('publish = "dist"') && netlifyConfig.includes('command = "npm run build"')) checks.push('PASS Netlify builds and publishes dist/');
else errors.push('Netlify config must build and publish dist/.');
const buildScript = await readFile(join(root, 'scripts/build.js'), 'utf8');
if (buildScript.includes("join(output, 'index.html')") && buildScript.includes("join(output, 'assets')") && buildScript.includes("join(output, 'robots.txt')")) checks.push('PASS static build copies page, assets, and robots.txt to dist/');
else errors.push('Static build script does not copy the expected deploy assets.');
if (html.includes('₹17,999') || html.includes('₹11,999') || html.includes('₹14,999') || html.includes('₹7,999')) {
  errors.push('Unverified prices from the wider brand site must not be assigned to the Dehradun property.');
} else checks.push('PASS no unverified prices published');
if (!/meta property="og:title"/.test(html) || !/meta name="description"/.test(html)) errors.push('Missing search/social metadata');
else checks.push('PASS SEO and Open Graph metadata');
if (!/target="_blank" rel="noopener noreferrer"/.test(html)) errors.push('External new-tab links must include noopener/noreferrer');
else checks.push('PASS external-link opener safeguards');
for (const match of html.matchAll(/<img\b([^>]+)>/g)) {
  if (!/\balt=/.test(match[1])) errors.push(`Image missing alt attribute: ${match[0].slice(0,80)}`);
}
if (!errors.some((e) => e.startsWith('Image missing'))) checks.push('PASS images include alt attributes');
const packageLock = join(root, 'package-lock.json');
try { const lock = JSON.parse(await readFile(packageLock, 'utf8')); if (lock.lockfileVersion >= 3) checks.push('PASS package lockfile parses'); else errors.push('package-lock.json version not expected'); }
catch { errors.push('Missing or invalid package-lock.json'); }
const logoStats = await stat(join(root, 'assets/brand/guardian-logo.png'));
if (logoStats.size < 1_500_000) checks.push(`PASS optimized trimmed logo (${Math.round(logoStats.size/1024)} KB)`);
else checks.push(`NOTE logo PNG is ${Math.round(logoStats.size/1024)} KB; consider additional optimization`);
console.log('\nGUARDIAN PG CONCEPT — STATIC CHECKS\n');
checks.forEach((line) => console.log(line));
if (errors.length) {
  console.error('\nFAILURES'); errors.forEach((line) => console.error(`FAIL ${line}`));
  process.exitCode = 1;
} else console.log('\nAll source-level checks passed. Browser-level checks are documented separately.');
