// ── Number Input ─────────────────────────────────────────────
// Increment/decrement buttons for .number-input containers.
// Include via <script src="components/number-input/number-input.js" defer></script>

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.number-input').forEach(function (wrapper) {
      var input = wrapper.querySelector('input[type="number"]');
      var decBtn = wrapper.querySelector('[data-action="decrement"]');
      var incBtn = wrapper.querySelector('[data-action="increment"]');
      if (!input) return;

      function update(delta) {
        var step = parseFloat(input.step) || 1;
        var min = input.min !== '' ? parseFloat(input.min) : -Infinity;
        var max = input.max !== '' ? parseFloat(input.max) : Infinity;
        var val = parseFloat(input.value) || 0;
        var next = Math.round((val + delta * step) * 1e10) / 1e10;
        if (next >= min && next <= max) {
          input.value = next;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }

      if (decBtn) decBtn.addEventListener('click', function () { update(-1); });
      if (incBtn) incBtn.addEventListener('click', function () { update(1); });
    });
  });
})();
