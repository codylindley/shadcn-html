// ── Toggle Group ─────────────────────────────────────────────
// Manages single/multiple selection across .toggle buttons in a group.
// Include via <script src="components/toggle-group/toggle-group.js" defer></script>

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toggle-group').forEach(function (group) {
      var type = group.getAttribute('data-type') || 'single';
      var toggles = Array.from(group.querySelectorAll('.toggle'));

      toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
          var pressed = toggle.getAttribute('aria-pressed') === 'true';

          if (type === 'single') {
            // Depress all others, press this one (or depress if already pressed)
            toggles.forEach(function (t) {
              t.setAttribute('aria-pressed', 'false');
            });
            if (!pressed) {
              toggle.setAttribute('aria-pressed', 'true');
            }
          } else {
            // Multiple: just toggle this one
            toggle.setAttribute('aria-pressed', String(!pressed));
          }
        });

        // Keyboard navigation: arrow keys move focus between items
        toggle.addEventListener('keydown', function (e) {
          var idx = toggles.indexOf(toggle);
          var next;
          var vertical = group.getAttribute('aria-orientation') === 'vertical';
          var fwd = vertical ? 'ArrowDown' : 'ArrowRight';
          var bwd = vertical ? 'ArrowUp' : 'ArrowLeft';

          if (e.key === fwd) {
            e.preventDefault();
            next = toggles[(idx + 1) % toggles.length];
          } else if (e.key === bwd) {
            e.preventDefault();
            next = toggles[(idx - 1 + toggles.length) % toggles.length];
          } else if (e.key === 'Home') {
            e.preventDefault();
            next = toggles[0];
          } else if (e.key === 'End') {
            e.preventDefault();
            next = toggles[toggles.length - 1];
          }

          if (next && !next.disabled) {
            next.focus();
          }
        });
      });
    });
  });
})();
