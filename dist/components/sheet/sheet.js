// ── Sheet ────────────────────────────────────────────────────
// Wires [data-sheet-trigger] buttons to <dialog class="sheet"> elements.

document.querySelectorAll('[data-sheet-trigger]').forEach((trigger) => {
  const sheet = document.getElementById(trigger.dataset.sheetTrigger);
  if (!sheet) return;
  trigger.addEventListener('click', () => {
    sheet._trigger = trigger;
    sheet.showModal();
  });
});
document.querySelectorAll('dialog.sheet').forEach((sheet) => {
  sheet.addEventListener('click', (e) => {
    if (e.target === sheet) sheet.close();
  });
  sheet.querySelectorAll('[data-sheet-close]').forEach((btn) => {
    btn.addEventListener('click', () => { sheet.close(); });
  });
  sheet.addEventListener('close', () => {
    if (sheet._trigger) sheet._trigger.focus();
  });
});
