// -- Combobox -------------------------------------------------
// Searchable select with keyboard navigation and popover positioning.

function init() {
  document.querySelectorAll('.combobox:not([data-init])').forEach((wrapper) => {
    wrapper.dataset.init = '';
    const trigger = wrapper.querySelector('.combobox-trigger');
    const valueEl = wrapper.querySelector('.combobox-value');
    const popover = wrapper.querySelector('.combobox-content');
    const searchInput = wrapper.querySelector('.combobox-search-input');
    const listbox = wrapper.querySelector('[role="listbox"]');
    const empty = wrapper.querySelector('.combobox-empty');
    if (!trigger || !popover || !searchInput || !listbox) return;

    const allItems = Array.from(listbox.querySelectorAll('[role="option"]'));
    let highlighted = -1;

    // CSS anchor positioning - unique name per trigger-popover pair
    const anchorId = `--combobox-${popover.id}`;
    trigger.style.anchorName = anchorId;
    popover.style.positionAnchor = anchorId;

    const getVisibleItems = () => allItems.filter((item) => !item.hidden && item.getAttribute('aria-disabled') !== 'true');
    const open = () => {
      popover.showPopover();
      trigger.setAttribute('aria-expanded', 'true');
      searchInput.value = '';
      filter('');
      searchInput.focus();
    };
    const close = () => {
      popover.hidePopover();
      trigger.setAttribute('aria-expanded', 'false');
      searchInput.setAttribute('aria-activedescendant', '');
      clearHighlight();
      trigger.focus();
    };
    const isOpen = () => popover.matches(':popover-open');
    const filter = (query) => {
      const q = query.toLowerCase(); let hasVisible = false;
      allItems.forEach((item) => { const match = !q || item.textContent.trim().toLowerCase().includes(q); item.hidden = !match; if (match) hasVisible = true; });
      listbox.querySelectorAll('.combobox-group-label').forEach((label) => {
        let next = label.nextElementSibling; let groupHasVisible = false;
        while (next && !next.classList.contains('combobox-group-label') && !next.classList.contains('combobox-separator')) {
          if (next.getAttribute('role') === 'option' && !next.hidden) groupHasVisible = true; next = next.nextElementSibling;
        }
        label.hidden = !groupHasVisible;
      });
      listbox.querySelectorAll('.combobox-separator').forEach((sep) => { const prev = sep.previousElementSibling; const next = sep.nextElementSibling; sep.hidden = (prev && prev.hidden) || (next && next.hidden); });
      if (empty) empty.hidden = hasVisible;
    };
    const clearHighlight = () => { allItems.forEach((item) => { delete item.dataset.highlighted; }); highlighted = -1; };
    const doHighlight = (index) => {
      const items = getVisibleItems(); clearHighlight();
      if (index < 0 || index >= items.length) return;
      highlighted = index; items[index].dataset.highlighted = '';
      items[index].scrollIntoView({ block: 'nearest' });
      searchInput.setAttribute('aria-activedescendant', items[index].id);
    };
    const selectItem = (item) => {
      if (item.getAttribute('aria-disabled') === 'true') return;
      allItems.forEach((i) => { i.setAttribute('aria-selected', 'false'); });
      item.setAttribute('aria-selected', 'true');
      if (valueEl) { valueEl.textContent = item.textContent.trim(); valueEl.removeAttribute('data-placeholder'); }
      close();
    };
    trigger.addEventListener('click', () => { if (isOpen()) { close(); } else { open(); } });
    searchInput.addEventListener('input', () => { filter(searchInput.value); doHighlight(0); });
    searchInput.addEventListener('keydown', (e) => {
      const items = getVisibleItems();
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); doHighlight(Math.min(highlighted + 1, items.length - 1)); break;
        case 'ArrowUp': e.preventDefault(); doHighlight(Math.max(highlighted - 1, 0)); break;
        case 'Home': e.preventDefault(); doHighlight(0); break;
        case 'End': e.preventDefault(); doHighlight(items.length - 1); break;
        case 'Enter': e.preventDefault(); if (highlighted >= 0 && items[highlighted]) selectItem(items[highlighted]); break;
        case 'Escape': e.preventDefault(); close(); break;
        case 'Tab': close(); break;
      }
    });
    listbox.addEventListener('click', (e) => { const item = e.target.closest('[role="option"]'); if (item && !item.hidden && item.getAttribute('aria-disabled') !== 'true') selectItem(item); });
    listbox.addEventListener('mousemove', (e) => { const item = e.target.closest('[role="option"]'); if (item && !item.hidden) { const items = getVisibleItems(); doHighlight(items.indexOf(item)); } });
    popover.addEventListener('toggle', (e) => { if (e.newState === 'closed') { trigger.setAttribute('aria-expanded', 'false'); clearHighlight(); } });
  });
}

init();
new MutationObserver(init).observe(document, { childList: true, subtree: true });

