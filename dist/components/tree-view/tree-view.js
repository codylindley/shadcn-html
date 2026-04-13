// -- Tree View ------------------------------------------------
// Keyboard navigation and ARIA state for tree views.

function init() {
  document.querySelectorAll('.tree[role="tree"]:not([data-init])').forEach((tree) => {
    tree.dataset.init = '';
    /* Keep aria-expanded in sync with <details> open state */
    tree.querySelectorAll('.tree-branch').forEach((details) => {
      const treeitem = details.closest('[role="treeitem"]');
      if (!treeitem) return;

      details.addEventListener('toggle', () => {
        treeitem.setAttribute('aria-expanded', String(details.open));
      });
    });

    /* Keyboard navigation */
    tree.addEventListener('keydown', (e) => {
      const target = e.target.closest('.tree-branch-trigger, .tree-leaf');
      if (!target) return;

      const allItems = Array.from(tree.querySelectorAll('.tree-branch-trigger, .tree-leaf'));
      const visibleItems = allItems.filter((item) => item.checkVisibility());
      const index = visibleItems.indexOf(target);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (index < visibleItems.length - 1) visibleItems[index + 1].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (index > 0) visibleItems[index - 1].focus();
          break;
        case 'ArrowRight':
          e.preventDefault();
          { const detailsR = target.closest('details.tree-branch');
          if (detailsR && !detailsR.open) detailsR.open = true; }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          { const detailsL = target.closest('details.tree-branch');
          if (detailsL && detailsL.open) detailsL.open = false; }
          break;
        case 'Home':
          e.preventDefault();
          if (visibleItems.length) visibleItems[0].focus();
          break;
        case 'End':
          e.preventDefault();
          if (visibleItems.length) visibleItems[visibleItems.length - 1].focus();
          break;
      }
    });
});
}

init();
new MutationObserver(init).observe(document, { childList: true, subtree: true });
