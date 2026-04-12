// -- Carousel -------------------------------------------------
// Scroll-snap carousel with keyboard navigation and prev/next buttons.

document.querySelectorAll('.carousel:not([data-init])').forEach((carousel) => {
  carousel.dataset.init = '';
  const viewport = carousel.querySelector('.carousel-viewport');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  if (!viewport) return;

  const isVertical = carousel.dataset.orientation === 'vertical';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reducedMotion ? 'auto' : 'smooth';

  const scrollBy = (dir) => {
    const slide = viewport.querySelector('.carousel-slide');
    if (!slide) return;
    const amount = isVertical ? slide.offsetHeight : slide.offsetWidth;
    viewport.scrollBy({
      [isVertical ? 'top' : 'left']: dir * amount,
      behavior,
    });
  };

  if (prev) prev.addEventListener('click', () => scrollBy(-1));
  if (next) next.addEventListener('click', () => scrollBy(1));

  // Keyboard navigation — arrow keys when carousel is focused
  carousel.addEventListener('keydown', (e) => {
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    if (e.key === prevKey) { e.preventDefault(); scrollBy(-1); }
    if (e.key === nextKey) { e.preventDefault(); scrollBy(1); }
  });

  // Make carousel focusable if not already
  if (!carousel.hasAttribute('tabindex')) {
    carousel.setAttribute('tabindex', '0');
  }
});
