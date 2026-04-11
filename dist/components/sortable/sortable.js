// ── Sortable ─────────────────────────────────────────────────
// Drag-and-drop reordering for sortable lists.

document.querySelectorAll('.sortable').forEach((list) => {
  let dragged = null;
  list.querySelectorAll('.sortable-item').forEach((item) => {
    item.addEventListener('dragstart', (e) => { dragged = item; item.setAttribute('data-dragging', ''); e.dataTransfer.effectAllowed = 'move'; });
    item.addEventListener('dragend', () => { item.removeAttribute('data-dragging'); list.querySelectorAll('[data-over]').forEach((el) => { el.removeAttribute('data-over'); }); dragged = null; });
    item.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (dragged && dragged !== item) item.setAttribute('data-over', ''); });
    item.addEventListener('dragleave', () => { item.removeAttribute('data-over'); });
    item.addEventListener('drop', (e) => {
      e.preventDefault(); item.removeAttribute('data-over');
      if (!dragged || dragged === item) return;
      const items = Array.from(list.children);
      if (items.indexOf(dragged) < items.indexOf(item)) list.insertBefore(dragged, item.nextSibling);
      else list.insertBefore(dragged, item);
    });
  });
});
