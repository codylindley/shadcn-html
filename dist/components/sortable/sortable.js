(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.sortable').forEach(function (list) {
      var dragged = null;
      list.querySelectorAll('.sortable-item').forEach(function (item) {
        item.addEventListener('dragstart', function (e) { dragged = item; item.setAttribute('data-dragging', ''); e.dataTransfer.effectAllowed = 'move'; });
        item.addEventListener('dragend', function () { item.removeAttribute('data-dragging'); list.querySelectorAll('[data-over]').forEach(function (el) { el.removeAttribute('data-over'); }); dragged = null; });
        item.addEventListener('dragover', function (e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (dragged && dragged !== item) item.setAttribute('data-over', ''); });
        item.addEventListener('dragleave', function () { item.removeAttribute('data-over'); });
        item.addEventListener('drop', function (e) {
          e.preventDefault(); item.removeAttribute('data-over');
          if (!dragged || dragged === item) return;
          var items = Array.from(list.children);
          if (items.indexOf(dragged) < items.indexOf(item)) list.insertBefore(dragged, item.nextSibling);
          else list.insertBefore(dragged, item);
        });
      });
    });
  });
})();
