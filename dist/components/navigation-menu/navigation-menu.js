(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-menu').forEach(function (nav) {
      nav.querySelectorAll('.nav-menu-trigger[popovertarget]').forEach(function (trigger) {
        var content = document.getElementById(trigger.getAttribute('popovertarget'));
        if (!content) return;
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          var rect = trigger.getBoundingClientRect();
          content.style.position = 'fixed';
          content.style.top = (rect.bottom + 4) + 'px';
          content.style.left = rect.left + 'px';
          content.togglePopover();
        });
      });
    });
  });
})();
