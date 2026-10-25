from __future__ import annotations
import base64
import json
import re
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SCREENSHOTS = ROOT / 'qa' / 'screenshots'
SCREENSHOTS.mkdir(parents=True, exist_ok=True)
results: dict = {
    'mode': 'offline DOM render with local image fallbacks',
    'external_network_blocked_for_this_test': True,
    'viewport_checks': [], 'interaction_checks': [], 'page_errors': [], 'screenshots': []
}


def data_uri(path: Path, mime: str) -> str:
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')


def build_offline_html() -> str:
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    css = (ROOT / 'assets/css/styles.css').read_text(encoding='utf-8')
    js = (ROOT / 'assets/js/main.js').read_text(encoding='utf-8')
    business = (ROOT / 'assets/js/business-data.js').read_text(encoding='utf-8')
    html = html.replace('<link rel="stylesheet" href="assets/css/styles.css">', '<style>\n' + css + '\n</style>')
    html = re.sub(r'\s*<link[^>]+(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>', '', html)
    html = re.sub(r'\s*<link[^>]+rel="icon"[^>]*>', '', html)
    html = re.sub(r'\s*<script[^>]+src="https://cdn\.jsdelivr\.net/[^>]+></script>', '', html)
    html = html.replace('<script src="assets/js/business-data.js"></script>', '<script>\n' + business + '\n</script>')
    html = html.replace('<script defer src="assets/js/main.js"></script>', '<script>\ndocument.addEventListener("DOMContentLoaded", () => {\n' + js + '\n});\n</script>')
    logo = data_uri(ROOT / 'assets/brand/guardian-logo.png', 'image/png')
    html = html.replace('src="assets/brand/guardian-logo.webp"', f'src="{logo}"')
    svg_cache: dict[str, str] = {}

    def replace_img(match: re.Match) -> str:
        tag = match.group(0)
        fallback_match = re.search(r'data-fallback="([^"]+)"', tag)
        source_match = re.search(r'src="([^"]+)"', tag)
        local = fallback_match.group(1) if fallback_match else (source_match.group(1) if source_match else '')
        if not local.startswith('assets/images/'):
            return tag
        if local not in svg_cache:
            svg_cache[local] = data_uri(ROOT / local, 'image/svg+xml')
        tag = re.sub(r'src="[^"]+"', f'src="{svg_cache[local]}"', tag, count=1)
        class_match = re.search(r'class="([^"]*)"', tag)
        if class_match:
            classes = class_match.group(1).split()
            if 'is-illustration' not in classes:
                classes.append('is-illustration')
            tag = tag.replace(class_match.group(0), f'class="{" ".join(classes)}"', 1)
        else:
            tag = tag[:-1] + ' class="is-illustration">'
        return tag

    html = re.sub(r'<img\b[^>]*>', replace_img, html)
    html = re.sub(
        r'<iframe\b[^>]*title="Map location for The Guardian PG in Pondha, Dehradun"[^>]*></iframe>',
        '<div class="offline-map-placeholder" style="height:100%;display:grid;place-items:center;text-align:center;padding:28px;color:#173a2e;background:linear-gradient(135deg,#dbe3d4,#c4d2c2)"><p><strong>MAP PREVIEW</strong><br><small>External map intentionally omitted in offline QA.<br>Use the live Get directions link on a networked device.</small></p></div>',
        html, flags=re.I
    )
    return html


HTML = build_offline_html()

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox', '--disable-dev-shm-usage'])
    page = browser.new_page(viewport={'width': 1440, 'height': 950}, device_scale_factor=1)
    page_errors: list[str] = []
    page.on('pageerror', lambda error: page_errors.append(str(error)))

    def load(width: int, height: int = 900, reduced_motion: str | None = None):
        page.set_viewport_size({'width': width, 'height': height})
        page.emulate_media(reduced_motion=reduced_motion)
        page.set_content(HTML, wait_until='domcontentloaded')
        page.evaluate("document.documentElement.style.scrollBehavior = 'auto'; document.documentElement.scrollTop = 0; document.body.scrollTop = 0; window.scrollTo({top: 0, behavior: 'instant'})")
        page.wait_for_timeout(350)
        assert page.evaluate('window.scrollY') == 0, f'Offline render did not reset to top at width {width}'

    load(1440, 950)
    assert page.title().startswith('The Guardian PG'), f'Unexpected title: {page.title()}'
    assert page.locator('#hero-title').is_visible(), 'Hero headline not visible'
    results['interaction_checks'].append({'test': 'home page and hero render', 'status': 'PASS'})

    for width in [360, 390, 430, 768, 1024, 1280, 1440, 1920]:
        load(width, 900 if width >= 768 else 844)
        metrics = page.evaluate("""() => ({ viewport: innerWidth, doc: document.documentElement.scrollWidth, body: document.body.scrollWidth, heroH: Math.round(document.querySelector('.hero').getBoundingClientRect().height) })""")
        ok = metrics['doc'] <= width + 2 and metrics['body'] <= width + 2
        results['viewport_checks'].append({'width': width, **metrics, 'status': 'PASS' if ok else 'FAIL'})

    # Mobile navigation open/select/close.
    load(390, 844)
    menu = page.locator('.menu-toggle')
    menu.click()
    assert menu.get_attribute('aria-expanded') == 'true', 'Mobile menu did not open'
    assert page.locator('#primary-navigation.is-open').count() == 1, 'Nav drawer is not open'
    page.locator('#primary-navigation a[href="#location"]').click()
    assert menu.get_attribute('aria-expanded') == 'false', 'Mobile menu did not close after navigation'
    results['interaction_checks'].append({'test': 'mobile navigation open / select / close', 'status': 'PASS'})

    # Gallery dialog and keyboard interaction.
    page.locator('[data-gallery="0"]').click()
    assert page.locator('#gallery-dialog').evaluate('el => el.open'), 'Gallery dialog did not open'
    assert page.locator('#lightbox-count').inner_text() == '01 / 04', 'Initial gallery count incorrect'
    page.locator('#gallery-dialog').press('ArrowRight')
    assert page.locator('#lightbox-count').inner_text() == '02 / 04', 'Gallery next image failed'
    page.locator('.lightbox__close').click()
    assert not page.locator('#gallery-dialog').evaluate('el => el.open'), 'Gallery dialog did not close'
    results['interaction_checks'].append({'test': 'gallery dialog, keyboard next and close', 'status': 'PASS'})

    # Name/phone validation, message composition and explicit WhatsApp URL preparation.
    page.locator('#enquiry-form button[type=submit]').click()
    assert 'Enter a name' in page.locator('#full-name-error').inner_text(), 'Required-name validation missing'
    page.locator('#full-name').fill('Asha Sample')
    page.locator('#phone').fill('9876543210')
    page.locator('#room-preference').select_option(label='Double-sharing room')
    page.locator('#questions').fill('Please confirm deposit and included meals.')
    page.locator('#enquiry-form button[type=submit]').click()
    assert page.locator('#whatsapp-preview').is_visible(), 'WhatsApp preview did not appear'
    preview = page.locator('#whatsapp-message-preview').inner_text()
    assert 'Asha Sample' in preview and 'Double-sharing room' in preview and 'deposit' in preview.lower(), 'Message missing submitted details'
    assert 'not been sent' in page.locator('#form-status').inner_text(), 'Form boundary not communicated'
    page.evaluate("window.__openedUrl = ''; window.open = (url) => { window.__openedUrl = String(url); return { opener: null }; };")
    page.locator('#open-whatsapp').click()
    opened_url = page.evaluate('window.__openedUrl')
    assert 'https://wa.me/919560166155?text=' in opened_url, f'WhatsApp handoff URL incorrect: {opened_url}'
    assert 'Asha%20Sample' in opened_url, 'WhatsApp message is not URL encoded with name'
    results['interaction_checks'].append({'test': 'form validation, message preview and explicit WhatsApp handoff', 'status': 'PASS'})

    # The transformed render uses local vector fallbacks in place of unreachable stock URLs.
    local_fallbacks = page.locator('img.is-illustration').count()
    broken_images = page.locator('img').evaluate_all('imgs => imgs.filter(img => !img.complete || img.naturalWidth === 0).length')
    results['interaction_checks'].append({'test': 'local illustration fallback render', 'status': 'PASS' if local_fallbacks >= 4 and broken_images == 0 else 'FAIL', 'illustration_images': local_fallbacks, 'broken_images': broken_images})
    assert local_fallbacks >= 4 and broken_images == 0, 'Local image fallback failed to render'

    # Visual verification screenshots at important journey positions.
    def shot(name: str):
        path = SCREENSHOTS / name
        page.screenshot(path=str(path), full_page=False)
        results['screenshots'].append(str(path.relative_to(ROOT)))

    load(1440, 950)
    shot('desktop-hero.png')
    page.locator('#rooms').scroll_into_view_if_needed(); page.wait_for_timeout(750); shot('desktop-rooms.png')
    page.locator('#location').scroll_into_view_if_needed(); page.wait_for_timeout(750); shot('desktop-location.png')
    page.locator('.review-band').scroll_into_view_if_needed(); page.wait_for_timeout(1350)
    assert page.locator('[data-counter="rating"]').inner_text() == '4.6', 'Rating counter did not settle'
    assert page.locator('[data-counter="reviews"]').inner_text() == '145', 'Review counter did not settle'
    shot('desktop-reviews.png')
    page.locator('#inquiry').scroll_into_view_if_needed(); page.wait_for_timeout(750); shot('desktop-inquiry.png')
    load(390, 844); shot('mobile-hero.png')
    page.locator('#gallery').scroll_into_view_if_needed(); page.wait_for_timeout(750); shot('mobile-gallery.png')
    load(390, 844, reduced_motion='reduce')
    assert page.locator('#hero-title').is_visible(), 'Reduced-motion hero hidden'
    assert page.locator('[data-reveal]').first.evaluate("el => getComputedStyle(el).opacity") == '1', 'Reduced-motion content not visible'
    shot('mobile-reduced-motion.png')
    results['interaction_checks'].append({'test': 'review counter final values', 'status': 'PASS'})
    results['interaction_checks'].append({'test': 'reduced-motion state keeps all reveal content readable', 'status': 'PASS'})
    results['page_errors'] = page_errors
    results['browser_runtime_errors'] = 'none' if not page_errors else 'see page_errors'
    results['status'] = 'PASS' if all(v['status'] == 'PASS' for v in results['viewport_checks']) and not any(i['status'] == 'FAIL' for i in results['interaction_checks']) and not page_errors else 'NEEDS FIXES'
    browser.close()

(ROOT / 'qa' / 'browser-results.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
print(json.dumps(results, indent=2))
if results.get('status') != 'PASS':
    sys.exit(1)
