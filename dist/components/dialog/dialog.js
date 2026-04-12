// -- Dialog ---------------------------------------------------
// Wires [data-dialog-trigger] buttons to <dialog> elements.

document.querySelectorAll('[data-dialog-trigger]:not([data-init])').forEach((trigger) => {
  trigger.dataset.init = '';
  const dialog = document.getElementById(trigger.dataset.dialogTrigger);
  if (!dialog) return;
  trigger.addEventListener('click', () => {
    dialog._trigger = trigger;
    dialog.showModal();
  });
});
document.querySelectorAll('dialog:not(.alert-dialog):not(.sheet):not([data-init])').forEach((dialog) => {
  dialog.dataset.init = '';
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.querySelectorAll('[data-dialog-close]').forEach((btn) => {
    btn.addEventListener('click', () => { dialog.close(); });
  });
  dialog.addEventListener('close', () => {
    if (dialog._trigger) dialog._trigger.focus();
  });
});
