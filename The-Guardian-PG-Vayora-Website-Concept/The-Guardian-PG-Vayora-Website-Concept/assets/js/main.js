(() => {
  'use strict';
  const data = window.GUARDIAN_DATA || {};
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const byId = (id) => document.getElementById(id);
  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // Core content remains visible without JavaScript. Motion only hides items once this file runs.
  if (!reducedMotion) document.body.classList.add('js-motion');

  // Replace blocked/expired remote stock-image URLs with clearly illustrative local fallbacks.
  all('img[data-fallback]').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.didFallback === 'true') return;
      img.dataset.didFallback = 'true';
      img.src = img.dataset.fallback;
      img.classList.add('is-illustration');
    });
    if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
  });

  // Accessible menu drawer, with Escape and focus restoration.
  const menuButton = document.querySelector('.menu-toggle');
  const nav = byId('primary-navigation');
  const openMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close navigation');
    const firstLink = nav.querySelector('a');
    if (firstLink) firstLink.focus({ preventScroll: true });
  };
  const closeMenu = (restoreFocus = false) => {
    if (!menuButton || !nav) return;
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (restoreFocus) menuButton.focus({ preventScroll: true });
  };
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => menuButton.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
    all('a', nav).forEach((link) => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('click', (event) => {
      if (menuButton.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true); });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); }, { passive: true });
  }

  // Quiet reveal choreography: use GSAP/ScrollTrigger when present; use IntersectionObserver as a lightweight fallback.
  const revealItems = all('[data-reveal]');
  const heroTitle = document.querySelector('[data-hero-title]');
  if (reducedMotion) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
    if (heroTitle) heroTitle.classList.add('is-visible');
  } else if (window.gsap && window.ScrollTrigger) {
    try {
      window.gsap.registerPlugin(window.ScrollTrigger);
      if (heroTitle) {
        window.gsap.fromTo(heroTitle, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.12, onComplete: () => heroTitle.classList.add('is-visible') });
      }
      window.gsap.utils.toArray('[data-reveal]').forEach((element, index) => {
        const delay = element.closest('.room-list') ? (index % 4) * 0.05 : 0;
        window.gsap.fromTo(element,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.72, delay, ease: 'power2.out', onComplete: () => element.classList.add('is-visible'),
            scrollTrigger: { trigger: element, start: 'top 88%', once: true }
          }
        );
      });
      const heroImage = document.querySelector('.hero__image-wrap .cover-image');
      if (heroImage) {
        window.gsap.to(heroImage, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 } });
      }
      const floatingNote = document.querySelector('[data-float]');
      if (floatingNote && window.matchMedia('(min-width: 901px)').matches) {
        window.gsap.to(floatingNote, { y: -9, duration: 3.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }
    } catch (error) {
      console.warn('GSAP enhancement failed; using native reveal fallback.', error);
      initObserverReveal(revealItems, heroTitle);
    }
  } else {
    initObserverReveal(revealItems, heroTitle);
  }

  function initObserverReveal(items, title) {
    if (title) {
      title.style.transition = 'opacity .72s ease, transform .72s ease';
      window.setTimeout(() => title.classList.add('is-visible'), 50);
    }
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => observer.observe(el));
  }

  // Header state and scroll progress do not intercept or control scrolling.
  const header = document.querySelector('.site-header');
  const progress = byId('scroll-progress-bar');
  let scrollQueued = false;
  const updateScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 30);
    if (progress) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0}%`;
    }
    scrollQueued = false;
  };
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();
  const year = byId('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // One-time public-review counter near the location section. Accessible text is static and never announces every increment.
  const reviewBand = document.querySelector('.review-band');
  let countersStarted = false;
  const animateCounters = () => {
    if (countersStarted) return;
    countersStarted = true;
    const values = { rating: Number(data.google?.rating ?? 4.6), reviews: Number(data.google?.reviewCount ?? 145) };
    all('[data-counter]').forEach((node) => {
      const key = node.getAttribute('data-counter');
      const target = values[key];
      if (!Number.isFinite(target)) return;
      if (reducedMotion) {
        node.textContent = key === 'rating' ? target.toFixed(1) : String(Math.round(target));
        return;
      }
      const duration = 1100;
      const started = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const current = target * eased;
        node.textContent = key === 'rating' ? current.toFixed(1) : String(Math.round(current));
        if (p < 1) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    });
  };
  if (reviewBand) {
    if (reducedMotion || !('IntersectionObserver' in window)) animateCounters();
    else {
      const reviewObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        animateCounters();
        observer.disconnect();
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.14 });
      reviewObserver.observe(reviewBand);
    }
  }

  // Room CTAs preselect the preference before the visitor reaches the form.
  const roomSelect = byId('room-preference');
  all('[data-room]').forEach((link) => link.addEventListener('click', () => {
    if (!roomSelect) return;
    const roomLabel = link.dataset.room;
    const option = Array.from(roomSelect.options).find((opt) => opt.textContent.trim().toLowerCase() === roomLabel.toLowerCase());
    if (option) roomSelect.value = option.value;
  }));

  // Inquiry form works without a backend: prepare a message, show a preview, and only open WhatsApp after a second explicit click.
  const form = byId('enquiry-form');
  const previewBox = byId('whatsapp-preview');
  const previewText = byId('whatsapp-message-preview');
  const status = byId('form-status');
  const openWhatsAppButton = byId('open-whatsapp');
  const editMessageButton = byId('edit-message');
  let preparedWhatsAppUrl = '';
  const clearErrors = () => {
    all('.field-error', form || document).forEach((el) => { el.textContent = ''; });
    all('.field input, .field select, .field textarea', form || document).forEach((el) => { el.classList.remove('invalid'); el.removeAttribute('aria-invalid'); });
    if (status) status.textContent = '';
  };
  const setError = (field, message) => {
    const error = byId(`${field.id}-error`);
    field.classList.add('invalid');
    field.setAttribute('aria-invalid', 'true');
    if (error) error.textContent = message;
  };
  const getVal = (id, fallback = '') => {
    const el = byId(id);
    return el && el.value.trim() ? el.value.trim() : fallback;
  };
  const formatDate = (value) => {
    if (!value) return 'Not specified';
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  const buildInquiryMessage = () => {
    const name = getVal('full-name');
    const phone = getVal('phone');
    const lines = [
      `Hello ${data.displayName || 'Guardian PG'} team,`,
      '',
      'I’m interested in accommodation at your Dehradun property. Here are my preferences:',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Enquiry type: ${getVal('resident-type', 'Not specified')}`,
      `University / workplace: ${getVal('university', 'Not specified')}`,
      `Preferred move-in date: ${formatDate(getVal('move-date'))}`,
      `Intended stay: ${getVal('duration', 'Not specified')}`,
      `Room preference: ${getVal('room-preference', 'Not sure yet')}`,
      `Number of occupants: ${getVal('occupants', 'Not specified')}`,
      `Meal preference: ${getVal('meal-preference', 'Please share current options')}`,
      `Additional questions: ${getVal('questions', 'None added')}`,
      '',
      'Could you please share the currently available room types, monthly pricing, deposit, inclusions and move-in requirements?',
      '',
      'Thank you.'
    ];
    return lines.join('\n');
  };
  if (form) {
    const dateInput = byId('move-date');
    if (dateInput) {
      const now = new Date();
      const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      dateInput.min = localToday;
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clearErrors();
      let firstInvalid = null;
      const nameField = byId('full-name');
      const phoneField = byId('phone');
      if (!nameField.value.trim() || nameField.value.trim().length < 2) {
        setError(nameField, 'Enter a name with at least 2 characters.');
        firstInvalid ||= nameField;
      }
      const phoneDigits = (phoneField.value.match(/\d/g) || []).length;
      if (phoneDigits < 10 || phoneDigits > 15) {
        setError(phoneField, 'Enter a valid phone number (10–15 digits, including country code if used).');
        firstInvalid ||= phoneField;
      }
      if (firstInvalid) {
        if (status) status.textContent = 'Please check the highlighted fields before continuing.';
        firstInvalid.focus();
        return;
      }
      const message = buildInquiryMessage();
      preparedWhatsAppUrl = `https://wa.me/${data.whatsappDigits || '919560166155'}?text=${encodeURIComponent(message)}`;
      if (previewText) previewText.textContent = message;
      if (previewBox) previewBox.hidden = false;
      if (status) status.textContent = 'Your message has been prepared in this page only. It has not been sent.';
      if (previewBox) previewBox.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
      if (openWhatsAppButton) openWhatsAppButton.focus({ preventScroll: true });
    });
    form.addEventListener('input', (event) => {
      const target = event.target;
      if (target && target.classList.contains('invalid')) {
        target.classList.remove('invalid');
        target.removeAttribute('aria-invalid');
        const error = byId(`${target.id}-error`);
        if (error) error.textContent = '';
      }
    });
    form.addEventListener('reset', () => {
      window.setTimeout(() => {
        clearErrors();
        if (previewBox) previewBox.hidden = true;
        preparedWhatsAppUrl = '';
      }, 0);
    });
  }
  if (openWhatsAppButton) {
    openWhatsAppButton.addEventListener('click', () => {
      if (!preparedWhatsAppUrl) return;
      const win = window.open(preparedWhatsAppUrl, '_blank');
      if (win) win.opener = null;
      else window.location.href = preparedWhatsAppUrl;
    });
  }
  if (editMessageButton) editMessageButton.addEventListener('click', () => {
    if (previewBox) previewBox.hidden = true;
    const name = byId('full-name');
    if (name) name.focus({ preventScroll: true });
  });

  // Keyboard-accessible gallery lightbox. It uses the selected image and respects local fallbacks.
  const dialog = byId('gallery-dialog');
  const lightboxImage = byId('lightbox-image');
  const lightboxCaption = byId('lightbox-caption');
  const lightboxCount = byId('lightbox-count');
  const galleryButtons = all('[data-gallery]');
  let activeGalleryIndex = 0;
  let previouslyFocused = null;
  const galleryCaptions = ['Bedroom style', 'Shared living', 'Study corner', 'Outdoor mood'];
  const openGallery = (index, trigger) => {
    if (!dialog || !lightboxImage || !galleryButtons.length) return;
    activeGalleryIndex = (index + galleryButtons.length) % galleryButtons.length;
    previouslyFocused = trigger || document.activeElement;
    const sourceImage = galleryButtons[activeGalleryIndex].querySelector('img');
    if (sourceImage) {
      lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
      lightboxImage.dataset.fallback = sourceImage.dataset.fallback || 'assets/images/room-bedroom.svg';
      lightboxImage.onerror = () => {
        if (lightboxImage.dataset.didFallback === 'true') return;
        lightboxImage.dataset.didFallback = 'true';
        lightboxImage.src = lightboxImage.dataset.fallback;
      };
      lightboxImage.alt = sourceImage.alt;
    }
    if (lightboxCaption) lightboxCaption.textContent = `Representative interior · ${galleryCaptions[activeGalleryIndex]}`;
    if (lightboxCount) lightboxCount.textContent = `${String(activeGalleryIndex + 1).padStart(2,'0')} / ${String(galleryButtons.length).padStart(2,'0')}`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.classList.add('dialog-open');
    const closeButton = dialog.querySelector('.lightbox__close');
    if (closeButton) closeButton.focus({ preventScroll: true });
  };
  const closeGallery = () => {
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
    document.body.classList.remove('dialog-open');
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus({ preventScroll: true });
  };
  const changeGallery = (step) => openGallery(activeGalleryIndex + step, document.activeElement);
  galleryButtons.forEach((button) => button.addEventListener('click', () => openGallery(Number(button.dataset.gallery) || 0, button)));
  const closeButton = dialog && dialog.querySelector('.lightbox__close');
  if (closeButton) closeButton.addEventListener('click', closeGallery);
  if (dialog) {
    dialog.addEventListener('click', (event) => { if (event.target === dialog) closeGallery(); });
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); changeGallery(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); changeGallery(-1); }
    });
  }
  const prev = byId('lightbox-prev');
  const next = byId('lightbox-next');
  if (prev) prev.addEventListener('click', () => changeGallery(-1));
  if (next) next.addEventListener('click', () => changeGallery(1));

  // Horizontal overflow guard for the concept; report, don't silently rewrite layout.
  if (window.location.search.includes('debug=layout')) {
    window.addEventListener('load', () => {
      const wide = document.documentElement.scrollWidth > window.innerWidth + 2;
      console.info(`Guardian layout overflow check (${window.innerWidth}px): ${wide ? 'OVERFLOW FOUND' : 'pass'}`);
    }, { once: true });
  }
})();
