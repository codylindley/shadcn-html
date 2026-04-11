// ── Color Picker ─────────────────────────────────────────────
// Syncs the hex value display with the color input.
// Include via <script src="components/color-picker/color-picker.js" defer></script>

(function () {
  'use strict';

  window.onPageReady(function () {
    document.querySelectorAll('.color-picker').forEach(function (picker) {
      var input = picker.querySelector('input[type="color"]');
      var display = picker.querySelector('.color-picker-value');
      if (!input || !display) return;

      display.textContent = input.value;
      input.addEventListener('input', function () {
        display.textContent = input.value;
      });
    });
  });
})();
