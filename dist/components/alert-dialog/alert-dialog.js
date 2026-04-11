// ── Alert Dialog ──────────────────────────────────────────────
// Wires [data-alert-dialog-trigger] buttons to <dialog class="alert-dialog">.
// Unlike regular dialogs: no backdrop-close, Escape key blocked.
// Include via <script src="components/alert-dialog/alert-dialog.js" defer></script>

(function () {
  'use strict';

  window.onPageReady(function () {
    /* Wire triggers */
    document.querySelectorAll('[data-alert-dialog-trigger]').forEach(function (trigger) {
      var dialog = document.getElementById(trigger.dataset.alertDialogTrigger);
      if (!dialog) return;
      trigger.addEventListener('click', function () {
        dialog._trigger = trigger;
        dialog.showModal();
      });
    });

    /* Wire close buttons and block Escape */
    document.querySelectorAll('dialog.alert-dialog').forEach(function (dialog) {
      /* Block Escape key */
      dialog.addEventListener('cancel', function (e) {
        e.preventDefault();
      });

      /* Wire close buttons */
      dialog.querySelectorAll('[data-alert-dialog-close]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          dialog.close();
        });
      });

      /* Return focus to trigger */
      dialog.addEventListener('close', function () {
        if (dialog._trigger) dialog._trigger.focus();
      });
    });
  });
})();
