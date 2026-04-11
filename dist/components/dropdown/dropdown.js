// -- Dropdown Menu --------------------------------------------
// Wires [data-dropdown-trigger] buttons to popover menus with
// full keyboard navigation and ARIA support.

document.querySelectorAll('[data-dropdown-trigger]').forEach((trigger) => {
    const menu = document.getElementById(trigger.dataset.dropdownTrigger);
    if (!menu) return;

    const positionMenu = () => {
      const rect = trigger.getBoundingClientRect();
      menu.style.position = 'fixed';
      menu.style.top = `${rect.bottom + 4}px`;
      menu.style.left = `${rect.left}px`;
      menu.style.margin = '0';
    };
    const getItems = () => {
      return Array.from(menu.querySelectorAll('[role="menuitem"]:not(:disabled), [role="menuitemcheckbox"]:not(:disabled), [role="menuitemradio"]:not(:disabled)'));
    };
    const highlight = (item) => {
      getItems().forEach((i) => { i.removeAttribute('data-highlighted'); });
      if (item) { item.setAttribute('data-highlighted', ''); item.focus(); }
    };
    trigger.addEventListener('click', () => { positionMenu(); menu.togglePopover(); });
    menu.addEventListener('toggle', (e) => {
      const open = e.newState === 'open';
      trigger.setAttribute('aria-expanded', open);
      if (open) { const first = getItems()[0]; if (first) highlight(first); }
      else { getItems().forEach((i) => { i.removeAttribute('data-highlighted'); }); trigger.focus(); }
    });
    menu.addEventListener('mousemove', (e) => {
      const item = e.target.closest('[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]');
      if (item && !item.disabled) highlight(item);
    });
    menu.addEventListener('mouseleave', () => {
      getItems().forEach((i) => { i.removeAttribute('data-highlighted'); });
    });
    menu.addEventListener('keydown', (e) => {
      const items = getItems();
      const current = items.indexOf(document.activeElement);
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); highlight(items[(current + 1) % items.length]); break;
        case 'ArrowUp': e.preventDefault(); highlight(items[(current - 1 + items.length) % items.length]); break;
        case 'Home': e.preventDefault(); highlight(items[0]); break;
        case 'End': e.preventDefault(); highlight(items[items.length - 1]); break;
        case 'Escape': menu.hidePopover(); break;
        case 'Enter': case ' ':
          e.preventDefault();
          if (document.activeElement) {
            const role = document.activeElement.getAttribute('role');
            if (role === 'menuitemcheckbox') {
              const checked = document.activeElement.getAttribute('aria-checked') === 'true';
              document.activeElement.setAttribute('aria-checked', !checked);
            } else if (role === 'menuitemradio') {
              const group = document.activeElement.closest('[role="group"]');
              if (group) group.querySelectorAll('[role="menuitemradio"]').forEach((r) => { r.setAttribute('aria-checked', 'false'); });
              document.activeElement.setAttribute('aria-checked', 'true');
            } else { document.activeElement.click(); menu.hidePopover(); }
          }
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            const match = items.find((item) => item.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase()));
            if (match) highlight(match);
          }
      }
    });
});
