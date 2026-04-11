(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('dialog.command').forEach(function (dialog) {
      var input = dialog.querySelector('.command-input');
      var list = dialog.querySelector('.command-list');
      var empty = dialog.querySelector('.command-empty');
      if (!input || !list) return;
      var items = Array.from(list.querySelectorAll('.command-item'));

      function filter(q) {
        var query = q.toLowerCase(); var hasVisible = false;
        items.forEach(function (item) {
          var match = !query || item.textContent.toLowerCase().includes(query);
          item.hidden = !match; if (match) hasVisible = true;
        });
        list.querySelectorAll('.command-group').forEach(function (g) {
          g.hidden = g.querySelectorAll('.command-item:not([hidden])').length === 0;
        });
        if (empty) empty.hidden = hasVisible;
      }

      input.addEventListener('input', function () { filter(input.value); });
      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) dialog.close();
        if (e.target.closest('.command-item')) dialog.close();
      });
      dialog.addEventListener('close', function () { input.value = ''; filter(''); });

      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          if (dialog.open) dialog.close();
          else { dialog.showModal(); input.focus(); }
        }
      });
    });

    document.querySelectorAll('[data-command-trigger]').forEach(function (trigger) {
      var dialog = document.getElementById(trigger.dataset.commandTrigger);
      if (!dialog) return;
      trigger.addEventListener('click', function () {
        dialog.showModal();
        var input = dialog.querySelector('.command-input');
        if (input) input.focus();
      });
    });
  });
})();
