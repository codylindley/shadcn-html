// -- Command --------------------------------------------------
// Command palette dialog with search filtering and Cmd/Ctrl+K shortcut.

/* Cmd/Ctrl+K handler — added once at module level */
let commandKeydownAdded = false;
if (!commandKeydownAdded) {
  commandKeydownAdded = true;
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      const dialog = document.querySelector('dialog.command');
      if (!dialog) return;
      e.preventDefault();
      if (dialog.open) { dialog.close(); }
      else { dialog.showModal(); const input = dialog.querySelector('.command-input'); if (input) input.focus(); }
    }
  });
}

document.querySelectorAll('dialog.command').forEach((dialog) => {
    const input = dialog.querySelector('.command-input');
    const list = dialog.querySelector('.command-list');
    const empty = dialog.querySelector('.command-empty');
    if (!input || !list) return;
    const items = Array.from(list.querySelectorAll('.command-item'));

    const filter = (q) => {
      const query = q.toLowerCase(); let hasVisible = false;
      items.forEach((item) => {
        const match = !query || item.textContent.toLowerCase().includes(query);
        item.hidden = !match; if (match) hasVisible = true;
      });
      list.querySelectorAll('.command-group').forEach((g) => {
        g.hidden = g.querySelectorAll('.command-item:not([hidden])').length === 0;
      });
      if (empty) empty.hidden = hasVisible;
    };

    input.addEventListener('input', () => { filter(input.value); });
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
      if (e.target.closest('.command-item')) dialog.close();
    });
    dialog.addEventListener('close', () => { input.value = ''; filter(''); });
  });

document.querySelectorAll('[data-command-trigger]').forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.commandTrigger);
  if (!dialog) return;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    const input = dialog.querySelector('.command-input');
    if (input) input.focus();
  });
});
