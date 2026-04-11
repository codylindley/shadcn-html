(function () {
  'use strict';
  window.onPageReady(function () {
    document.querySelectorAll('[data-context-menu]').forEach(function (trigger) {
      var menu = document.getElementById(trigger.dataset.contextMenu);
      if (!menu) return;
      trigger.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        menu.style.position = 'fixed';
        menu.style.top = e.clientY + 'px';
        menu.style.left = e.clientX + 'px';
        menu.showPopover();
      });
      menu.addEventListener('click', function (e) {
        if (e.target.closest('.context-menu-item')) menu.hidePopover();
      });
    });
  });
})();
