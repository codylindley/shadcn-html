// ── Toggle ───────────────────────────────────────────────────
// Toggles aria-pressed on .toggle buttons.
// Include via <script src="js/components/toggle.js" defer></script>

(function () {
  'use strict';

  window.onPageReady(function () {
    document.querySelectorAll('.toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var pressed = toggle.getAttribute('aria-pressed') === 'true';
        toggle.setAttribute('aria-pressed', !pressed);
      });
    });
  });
})();
