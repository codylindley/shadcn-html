// ── Dialog ───────────────────────────────────────────────────
// Wires [data-dialog-trigger] buttons to <dialog> elements.
// Include via <script src="js/components/dialog.js" defer></script>

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-dialog-trigger]').forEach(function (trigger) {
      var dialog = document.getElementById(trigger.dataset.dialogTrigger);
      if (!dialog) return;
      trigger.addEventListener('click', function () {
        dialog._trigger = trigger;
        dialog.showModal();
      });
    });
    document.querySelectorAll('dialog').forEach(function (dialog) {
      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) dialog.close();
      });
      dialog.querySelectorAll('[data-dialog-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { dialog.close(); });
      });
      dialog.addEventListener('close', function () {
        if (dialog._trigger) dialog._trigger.focus();
      });
    });
  });
})();
