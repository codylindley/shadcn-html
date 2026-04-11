(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.tree[role="tree"]').forEach(function (tree) {
      /* Keep aria-expanded in sync with <details> open state */
      tree.querySelectorAll('.tree-branch').forEach(function (details) {
        var treeitem = details.closest('[role="treeitem"]');
        if (!treeitem) return;

        details.addEventListener('toggle', function () {
          treeitem.setAttribute('aria-expanded', String(details.open));
        });
      });

      /* Keyboard navigation */
      tree.addEventListener('keydown', function (e) {
        var target = e.target.closest('.tree-branch-trigger, .tree-leaf');
        if (!target) return;

        var allItems = Array.from(tree.querySelectorAll('.tree-branch-trigger, .tree-leaf'));
        var visibleItems = allItems.filter(function (item) {
          return item.offsetParent !== null;
        });
        var index = visibleItems.indexOf(target);

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
            var detailsR = target.closest('details.tree-branch');
            if (detailsR && !detailsR.open) detailsR.open = true;
            break;
          case 'ArrowLeft':
            e.preventDefault();
            var detailsL = target.closest('details.tree-branch');
            if (detailsL && detailsL.open) {
              detailsL.open = false;
            }
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
  });
})();
