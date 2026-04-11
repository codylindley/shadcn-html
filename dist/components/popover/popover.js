(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[popovertarget]').forEach(function (trigger) {
      var id = trigger.getAttribute('popovertarget');
      var popover = document.getElementById(id);
      if (!popover || !popover.classList.contains('popover')) return;
      function position() {
        var rect = trigger.getBoundingClientRect();
        popover.style.position = 'fixed';
        popover.style.top = (rect.bottom + 4) + 'px';
        popover.style.left = rect.left + 'px';
      }
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        position();
        popover.togglePopover();
      });
    });
  });
})();
