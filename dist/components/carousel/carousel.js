// -- Carousel -------------------------------------------------
// Scroll-snap carousel with keyboard navigation, prev/next buttons,
// dot indicators, loop, autoplay, and ARIA.

function init() {
document.querySelectorAll('.carousel:not([data-init])').forEach((carousel) => {
  carousel.dataset.init = '';

  const viewport = carousel.querySelector('.carousel-viewport');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const counter = carousel.querySelector('.carousel-counter');
  if (!viewport) return;

  const slides = () => Array.from(viewport.querySelectorAll('.carousel-slide'));
  const isVertical = carousel.dataset.orientation === 'vertical';
  const isLoop = carousel.hasAttribute('data-loop');
  const autoplayDelay = carousel.dataset.autoplay ? parseInt(carousel.dataset.autoplay, 10) : 0;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reducedMotion ? 'auto' : 'smooth';

  let currentIndex = 0;
  let autoplayTimer = null;

  // ── ARIA setup ───────────────────────────────
  if (!carousel.hasAttribute('role')) carousel.setAttribute('role', 'region');
  carousel.setAttribute('aria-roledescription', 'carousel');
  if (!carousel.hasAttribute('aria-label')) carousel.setAttribute('aria-label', 'Carousel');

  slides().forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    if (!slide.hasAttribute('aria-label')) {
      slide.setAttribute('aria-label', `${i + 1} of ${slides().length}`);
    }
  });

  // ── Scroll to index ─────────────────────────
  const scrollToIndex = (index) => {
    const allSlides = slides();
    if (!allSlides.length) return;

    let target = index;
    if (isLoop) {
      target = ((index % allSlides.length) + allSlides.length) % allSlides.length;
    } else {
      target = Math.max(0, Math.min(index, allSlides.length - 1));
    }

    const slide = allSlides[target];
    if (isVertical) {
      viewport.scrollTo({ top: slide.offsetTop - viewport.offsetTop, behavior });
    } else {
      viewport.scrollTo({ left: slide.offsetLeft - viewport.offsetLeft, behavior });
    }
  };

  // ── Update state (buttons, dots, counter) ───
  const updateState = (index) => {
    const allSlides = slides();
    if (!allSlides.length) return;
    currentIndex = index;

    // Prev/next disabled states (non-loop)
    if (!isLoop) {
      if (prevBtn) prevBtn.disabled = currentIndex <= 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= allSlides.length - 1;
    }

    // Dot indicators
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
      });
    }

    // Counter
    if (counter) {
      counter.textContent = `Slide ${currentIndex + 1} of ${allSlides.length}`;
    }

    // ARIA labels on slides
    allSlides.forEach((slide, i) => {
      slide.setAttribute('aria-label', `${i + 1} of ${allSlides.length}`);
    });
  };

  // ── IntersectionObserver for current slide ──
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const idx = slides().indexOf(entry.target);
          if (idx !== -1) updateState(idx);
        }
      }
    },
    { root: viewport, threshold: 0.5 }
  );

  slides().forEach((slide) => observer.observe(slide));

  // ── Navigation ──────────────────────────────
  const goNext = () => scrollToIndex(currentIndex + 1);
  const goPrev = () => scrollToIndex(currentIndex - 1);

  if (prevBtn) prevBtn.addEventListener('click', goPrev);
  if (nextBtn) nextBtn.addEventListener('click', goNext);

  // ── Dot click handlers ──────────────────────
  if (dotsContainer) {
    const allSlides = slides();
    // Generate dots if empty
    if (!dotsContainer.children.length && allSlides.length) {
      allSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
        dotsContainer.appendChild(dot);
      });
    }

    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (!dot) return;
      const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
      const idx = dots.indexOf(dot);
      if (idx !== -1) scrollToIndex(idx);
    });
  }

  // ── Keyboard navigation ─────────────────────
  carousel.addEventListener('keydown', (e) => {
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    if (e.key === prevKey) { e.preventDefault(); goPrev(); }
    if (e.key === nextKey) { e.preventDefault(); goNext(); }
    if (e.key === 'Home') { e.preventDefault(); scrollToIndex(0); }
    if (e.key === 'End') { e.preventDefault(); scrollToIndex(slides().length - 1); }
  });

  // Make carousel focusable if not already
  if (!carousel.hasAttribute('tabindex')) {
    carousel.setAttribute('tabindex', '0');
  }

  // ── Autoplay ────────────────────────────────
  const startAutoplay = () => {
    if (!autoplayDelay) return;
    stopAutoplay();
    autoplayTimer = setInterval(goNext, autoplayDelay);
    viewport.setAttribute('aria-live', 'off');
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    viewport.setAttribute('aria-live', 'polite');
  };

  if (autoplayDelay) {
    startAutoplay();
    // Pause on hover and focus (WAI-ARIA APG requirement)
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);
  } else {
    viewport.setAttribute('aria-live', 'polite');
  }

  // ── Initial state ───────────────────────────
  updateState(0);
});
}

init();
new MutationObserver(init).observe(document, { childList: true, subtree: true });
