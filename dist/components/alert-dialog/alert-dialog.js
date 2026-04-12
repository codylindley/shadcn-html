// -- Alert Dialog ----------------------------------------------
// Wires [data-alert-dialog-trigger] buttons to <dialog class="alert-dialog">.
// Unlike regular dialogs: no backdrop-close, Escape key blocked.

/* Wire triggers */
document.querySelectorAll('[data-alert-dialog-trigger]:not([data-init])').forEach((trigger) => {
  trigger.dataset.init = '';
  const dialog = document.getElementById(trigger.dataset.alertDialogTrigger);
  if (!dialog) return;
  trigger.addEventListener('click', () => {
    dialog._trigger = trigger;
    dialog.showModal();
  });
});

/* Wire close buttons and block Escape */
document.querySelectorAll('dialog.alert-dialog:not([data-init])').forEach((dialog) => {
  dialog.dataset.init = '';
  /* Block Escape key */
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
  });

  /* Wire close buttons */
  dialog.querySelectorAll('[data-alert-dialog-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      dialog.close();
    });
  });

  /* Return focus to trigger */
  dialog.addEventListener('close', () => {
    if (dialog._trigger) dialog._trigger.focus();
  });
});
