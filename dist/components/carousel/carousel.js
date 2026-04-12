// -- Carousel -------------------------------------------------
// Previous/next slide navigation for carousels.

document.querySelectorAll('.carousel:not([data-init])').forEach((carousel) => {
  carousel.dataset.init = '';
  const viewport = carousel.querySelector('.carousel-viewport');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  if (!viewport) return;
  const scrollBy = (dir) => {
    const slide = viewport.querySelector('.carousel-slide');
    if (!slide) return;
    viewport.scrollBy({ left: dir * slide.offsetWidth, behavior: 'smooth' });
  };
  if (prev) prev.addEventListener('click', () => { scrollBy(-1); });
  if (next) next.addEventListener('click', () => { scrollBy(1); });
});
