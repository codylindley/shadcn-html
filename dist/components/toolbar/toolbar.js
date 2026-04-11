// ── Toolbar ──────────────────────────────────────────────────
// Roving tabindex for role="toolbar" containers.
// Arrow keys move focus between focusable children.
// Include via <script src="components/toolbar/toolbar.js" defer></script>

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toolbar[role="toolbar"]').forEach(function (toolbar) {
      var items = Array.from(
        toolbar.querySelectorAll('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')
      );
      if (items.length === 0) return;

      // Set initial roving tabindex
      items.forEach(function (item, i) {
        item.setAttribute('tabindex', i === 0 ? '0' : '-1');
      });

      toolbar.addEventListener('keydown', function (e) {
        var current = items.indexOf(document.activeElement);
        if (current === -1) return;

        var vertical = toolbar.getAttribute('aria-orientation') === 'vertical';
        var fwd = vertical ? 'ArrowDown' : 'ArrowRight';
        var bwd = vertical ? 'ArrowUp' : 'ArrowLeft';
        var next;

        if (e.key === fwd) {
          e.preventDefault();
          next = (current + 1) % items.length;
        } else if (e.key === bwd) {
          e.preventDefault();
          next = (current - 1 + items.length) % items.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          next = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          next = items.length - 1;
        }

        if (next !== undefined) {
          items[current].setAttribute('tabindex', '-1');
          items[next].setAttribute('tabindex', '0');
          items[next].focus();
        }
      });
    });
  });
})();
