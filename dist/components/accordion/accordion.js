// ── Accordion ───────────────────────────────────────────────
// Single-open accordion behavior using native <details> elements.
// Include via <script src="js/components/accordion.js" defer></script>

(function () {
  'use strict';

  window.onPageReady(function () {
    document.querySelectorAll('.accordion[data-type="single"]').forEach(function (accordion) {
      var items = accordion.querySelectorAll('.accordion-item');
      var collapsible = accordion.hasAttribute('data-collapsible');
      items.forEach(function (item) {
        item.addEventListener('toggle', function () {
          if (item.open) {
            items.forEach(function (sibling) {
              if (sibling !== item && sibling.open) sibling.open = false;
            });
          } else if (!collapsible) {
            var anyOpen = Array.from(items).some(function (i) { return i.open; });
            if (!anyOpen) item.open = true;
          }
        });
      });
    });
  });
})();
