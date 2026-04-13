// -- Command --------------------------------------------------
// Command palette dialog with search filtering, keyboard navigation, and Cmd/Ctrl+K shortcut.

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

function getVisibleItems(list) {
  return Array.from(list.querySelectorAll('.command-item:not([hidden]):not([aria-disabled="true"])'));
}

function highlightItem(list, index) {
  const visible = getVisibleItems(list);
  list.querySelectorAll('.command-item[data-highlighted]').forEach((el) => delete el.dataset.highlighted);
  if (visible.length === 0) return -1;
  const clamped = ((index % visible.length) + visible.length) % visible.length;
  visible[clamped].dataset.highlighted = '';
  visible[clamped].scrollIntoView({ block: 'nearest' });
  return clamped;
}

function init() {
document.querySelectorAll('dialog.command:not([data-init])').forEach((dialog) => {
    dialog.dataset.init = '';
    const input = dialog.querySelector('.command-input');
    const list = dialog.querySelector('.command-list');
    const empty = dialog.querySelector('.command-empty');
    if (!input || !list) return;
    const items = Array.from(list.querySelectorAll('.command-item'));
    let highlightIndex = -1;

    const filter = (q) => {
      const query = q.toLowerCase(); let hasVisible = false;
      items.forEach((item) => {
        const match = !query || item.textContent.toLowerCase().includes(query);
        item.hidden = !match; if (match) hasVisible = true;
      });
      list.querySelectorAll('.command-group').forEach((g) => {
        g.hidden = g.querySelectorAll('.command-item:not([hidden])').length === 0;
      });
      list.querySelectorAll('.command-separator').forEach((s) => {
        s.hidden = !!query;
      });
      if (empty) empty.hidden = hasVisible;
      highlightIndex = highlightItem(list, 0);
    };

    input.addEventListener('input', () => { filter(input.value); });

    input.addEventListener('keydown', (e) => {
      const visible = getVisibleItems(list);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightIndex = highlightItem(list, highlightIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightIndex = highlightItem(list, highlightIndex - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (visible[highlightIndex]) { visible[highlightIndex].click(); }
      } else if (e.key === 'Home') {
        e.preventDefault();
        highlightIndex = highlightItem(list, 0);
      } else if (e.key === 'End') {
        e.preventDefault();
        highlightIndex = highlightItem(list, visible.length - 1);
      }
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
      if (e.target.closest('.command-item')) dialog.close();
    });
    dialog.addEventListener('close', () => {
      input.value = '';
      filter('');
      list.querySelectorAll('.command-item[data-highlighted]').forEach((el) => delete el.dataset.highlighted);
      highlightIndex = -1;
    });
  });

document.querySelectorAll('[data-command-trigger]:not([data-init])').forEach((trigger) => {
  trigger.dataset.init = '';
  const dialog = document.getElementById(trigger.dataset.commandTrigger);
  if (!dialog) return;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    const input = dialog.querySelector('.command-input');
    if (input) input.focus();
  });
});
}

init();
new MutationObserver(init).observe(document, { childList: true, subtree: true });
