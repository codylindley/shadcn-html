// -- Sortable -------------------------------------------------
// Drag-and-drop + keyboard reordering for sortable lists.
// Keyboard: Arrow keys navigate, Alt+Arrow reorders, Home/End jump.
// Live region announces position changes to screen readers.

document.querySelectorAll('.sortable:not([data-init])').forEach((list) => {
  list.dataset.init = '';

  const isHorizontal = list.dataset.orientation === 'horizontal';
  const NEXT_KEY = isHorizontal ? 'ArrowRight' : 'ArrowDown';
  const PREV_KEY = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

  // -- Live region for announcements --
  let liveRegion = list.parentElement?.querySelector('.sortable-live');
  if (!liveRegion) {
    liveRegion = document.createElement('span');
    liveRegion.className = 'sortable-live';
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('role', 'status');
    list.parentElement
      ? list.parentElement.insertBefore(liveRegion, list.nextSibling)
      : list.after(liveRegion);
  }

  function announce(msg) {
    liveRegion.textContent = '';
    requestAnimationFrame(() => { liveRegion.textContent = msg; });
  }

  function getItems() {
    return Array.from(list.querySelectorAll('.sortable-item:not([aria-disabled="true"])'));
  }

  function getAllItems() {
    return Array.from(list.querySelectorAll('.sortable-item'));
  }

  function getActiveItem() {
    return list.querySelector('.sortable-item[data-active]');
  }

  function setActive(item) {
    getAllItems().forEach((el) => {
      el.removeAttribute('data-active');
      el.setAttribute('tabindex', '-1');
    });
    if (item) {
      item.setAttribute('data-active', '');
      item.setAttribute('tabindex', '0');
      item.focus();
    }
  }

  function getItemLabel(item) {
    const handle = item.querySelector('.sortable-handle');
    const clone = item.cloneNode(true);
    if (handle) {
      const handleClone = clone.querySelector('.sortable-handle');
      if (handleClone) handleClone.remove();
    }
    return clone.textContent.trim();
  }

  // -- Initialize tabindex --
  const allItems = getAllItems();
  allItems.forEach((item, i) => {
    item.setAttribute('tabindex', i === 0 ? '0' : '-1');
  });

  // -- Drag and drop --
  let dragged = null;

  list.querySelectorAll('.sortable-item').forEach((item) => {
    if (item.getAttribute('aria-disabled') === 'true') return;

    item.addEventListener('dragstart', (e) => {
      dragged = item;
      item.setAttribute('data-dragging', '');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
    });

    item.addEventListener('dragend', () => {
      item.removeAttribute('data-dragging');
      list.querySelectorAll('[data-over]').forEach((el) => el.removeAttribute('data-over'));
      dragged = null;
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (!dragged || dragged === item) return;
      const rect = item.getBoundingClientRect();
      const midpoint = isHorizontal
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;
      const pos = isHorizontal ? e.clientX : e.clientY;
      // Clear other indicators
      list.querySelectorAll('[data-over]').forEach((el) => {
        if (el !== item) el.removeAttribute('data-over');
      });
      item.setAttribute('data-over', pos < midpoint ? 'before' : 'after');
    });

    item.addEventListener('dragleave', () => {
      item.removeAttribute('data-over');
    });

    item.addEventListener('drop', (e) => {
      e.preventDefault();
      const position = item.getAttribute('data-over');
      item.removeAttribute('data-over');
      if (!dragged || dragged === item) return;

      if (position === 'before') {
        list.insertBefore(dragged, item);
      } else {
        list.insertBefore(dragged, item.nextSibling);
      }

      const items = getItems();
      const newIndex = items.indexOf(dragged);
      announce(`${getItemLabel(dragged)}, moved to position ${newIndex + 1} of ${items.length}`);
      setActive(dragged);

      list.dispatchEvent(new CustomEvent('sortable-change', {
        bubbles: true,
        detail: { item: dragged, index: newIndex }
      }));
    });
  });

  // -- Keyboard navigation --
  list.addEventListener('keydown', (e) => {
    const active = getActiveItem() || list.querySelector('.sortable-item[tabindex="0"]');
    if (!active) return;
    const items = getItems();
    const idx = items.indexOf(active);

    // Arrow navigation
    if (e.key === NEXT_KEY && !e.altKey) {
      e.preventDefault();
      const next = items[idx + 1];
      if (next) setActive(next);
    } else if (e.key === PREV_KEY && !e.altKey) {
      e.preventDefault();
      const prev = items[idx - 1];
      if (prev) setActive(prev);
    } else if (e.key === 'Home') {
      e.preventDefault();
      if (items.length) setActive(items[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      if (items.length) setActive(items[items.length - 1]);

    // Alt+Arrow reorders
    } else if (e.key === NEXT_KEY && e.altKey) {
      e.preventDefault();
      if (idx < items.length - 1) {
        const sibling = items[idx + 1];
        list.insertBefore(active, sibling.nextSibling);
        const newItems = getItems();
        const newIdx = newItems.indexOf(active);
        announce(`${getItemLabel(active)}, moved to position ${newIdx + 1} of ${newItems.length}`);
        setActive(active);
        list.dispatchEvent(new CustomEvent('sortable-change', {
          bubbles: true,
          detail: { item: active, index: newIdx }
        }));
      }
    } else if (e.key === PREV_KEY && e.altKey) {
      e.preventDefault();
      if (idx > 0) {
        const sibling = items[idx - 1];
        list.insertBefore(active, sibling);
        const newItems = getItems();
        const newIdx = newItems.indexOf(active);
        announce(`${getItemLabel(active)}, moved to position ${newIdx + 1} of ${newItems.length}`);
        setActive(active);
        list.dispatchEvent(new CustomEvent('sortable-change', {
          bubbles: true,
          detail: { item: active, index: newIdx }
        }));
      }
    }
  });

  // -- Focus management --
  list.addEventListener('focusin', (e) => {
    const item = e.target.closest('.sortable-item');
    if (item && list.contains(item)) setActive(item);
  });
});
