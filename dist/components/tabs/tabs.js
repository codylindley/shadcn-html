// ── Tabs ─────────────────────────────────────────────────────
// ARIA-compliant keyboard navigation for [role="tablist"] elements.
// Include via <script src="js/components/tabs.js" defer></script>

(function () {
  'use strict';

  function activateTab(tab, triggers) {
    triggers.forEach(function (t) {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = true;
    });
    tab.setAttribute('aria-selected', 'true');
    tab.removeAttribute('tabindex');
    var panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.hidden = false;
  }

  window.onPageReady(function () {
    document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
      if (!tablist.querySelector('.tab-trigger')) return;
      var triggers = Array.from(tablist.querySelectorAll('[role="tab"]'));
      var orientation = tablist.getAttribute('aria-orientation') || 'horizontal';

      triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () { activateTab(trigger, triggers); });
        trigger.addEventListener('keydown', function (e) {
          var current = triggers.indexOf(trigger);
          var next;
          var forward = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
          var backward = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
          switch (e.key) {
            case forward:
              e.preventDefault();
              for (var i = 1; i <= triggers.length; i++) {
                var c = triggers[(current + i) % triggers.length];
                if (!c.disabled) { next = c; break; }
              }
              break;
            case backward:
              e.preventDefault();
              for (var i = 1; i <= triggers.length; i++) {
                var c = triggers[(current - i + triggers.length) % triggers.length];
                if (!c.disabled) { next = c; break; }
              }
              break;
            case 'Home':
              e.preventDefault();
              next = triggers.find(function (t) { return !t.disabled; });
              break;
            case 'End':
              e.preventDefault();
              next = triggers.slice().reverse().find(function (t) { return !t.disabled; });
              break;
          }
          if (next && !next.disabled) {
            activateTab(next, triggers);
            next.focus();
          }
        });
      });
    });
  });
})();
