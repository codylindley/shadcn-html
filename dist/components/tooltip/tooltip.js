(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-tooltip-trigger]').forEach(function (trigger) {
      var tip = document.getElementById(trigger.dataset.tooltipTrigger);
      if (!tip) return;
      function show() {
        var rect = trigger.getBoundingClientRect();
        tip.style.position = 'fixed';
        tip.style.top = (rect.top - tip.offsetHeight - 6) + 'px';
        tip.style.left = (rect.left + rect.width / 2 - tip.offsetWidth / 2) + 'px';
        tip.showPopover();
      }
      function hide() { try { tip.hidePopover(); } catch(e) {} }
      trigger.addEventListener('mouseenter', show);
      trigger.addEventListener('mouseleave', hide);
      trigger.addEventListener('focus', show);
      trigger.addEventListener('blur', hide);
    });
  });
})();
