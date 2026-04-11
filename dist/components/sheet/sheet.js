// ── Sheet ────────────────────────────────────────────────────
// Wires [data-sheet-trigger] buttons to <dialog class="sheet"> elements.
// Include via <script src="js/components/sheet.js" defer></script>

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-sheet-trigger]').forEach(function (trigger) {
      var sheet = document.getElementById(trigger.dataset.sheetTrigger);
      if (!sheet) return;
      trigger.addEventListener('click', function () {
        sheet._trigger = trigger;
        sheet.showModal();
      });
    });
    document.querySelectorAll('dialog.sheet').forEach(function (sheet) {
      sheet.addEventListener('click', function (e) {
        if (e.target === sheet) sheet.close();
      });
      sheet.querySelectorAll('[data-sheet-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { sheet.close(); });
      });
      sheet.addEventListener('close', function () {
        if (sheet._trigger) sheet._trigger.focus();
      });
    });
  });
})();
