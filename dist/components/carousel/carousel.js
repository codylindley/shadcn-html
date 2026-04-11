(function () {
  'use strict';
  window.onPageReady(function () {
    document.querySelectorAll('.carousel').forEach(function (carousel) {
      var viewport = carousel.querySelector('.carousel-viewport');
      var prev = carousel.querySelector('.carousel-prev');
      var next = carousel.querySelector('.carousel-next');
      if (!viewport) return;
      function scrollBy(dir) {
        var slide = viewport.querySelector('.carousel-slide');
        if (!slide) return;
        viewport.scrollBy({ left: dir * slide.offsetWidth, behavior: 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { scrollBy(-1); });
      if (next) next.addEventListener('click', function () { scrollBy(1); });
    });
  });
})();
