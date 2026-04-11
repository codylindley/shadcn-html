// ── Combobox ─────────────────────────────────────────────────
// Searchable select with keyboard navigation and popover positioning.
// Include via <script src="js/components/combobox.js" defer></script>

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.combobox').forEach(function (wrapper) {
      var trigger = wrapper.querySelector('.combobox-trigger');
      var valueEl = wrapper.querySelector('.combobox-value');
      var popover = wrapper.querySelector('.combobox-content');
      var searchInput = wrapper.querySelector('.combobox-search-input');
      var listbox = wrapper.querySelector('[role="listbox"]');
      var empty = wrapper.querySelector('.combobox-empty');
      if (!trigger || !popover || !searchInput || !listbox) return;

      var allItems = Array.from(listbox.querySelectorAll('[role="option"]'));
      var placeholder = valueEl ? valueEl.getAttribute('data-placeholder') || '' : '';
      var highlighted = -1;

      function getVisibleItems() { return allItems.filter(function (item) { return !item.hidden && item.getAttribute('aria-disabled') !== 'true'; }); }
      function positionPopover() {
        var rect = trigger.getBoundingClientRect();
        popover.style.position = 'fixed';
        popover.style.top = rect.bottom + 4 + 'px';
        popover.style.left = rect.left + 'px';
        popover.style.width = rect.width + 'px';
      }
      function open() {
        positionPopover();
        popover.showPopover();
        trigger.setAttribute('aria-expanded', 'true');
        searchInput.value = '';
        filter('');
        searchInput.focus();
      }
      function close() {
        popover.hidePopover();
        trigger.setAttribute('aria-expanded', 'false');
        searchInput.setAttribute('aria-activedescendant', '');
        clearHighlight();
        trigger.focus();
      }
      function isOpen() { return popover.matches(':popover-open'); }
      function filter(query) {
        var q = query.toLowerCase(); var hasVisible = false;
        allItems.forEach(function (item) { var match = !q || item.textContent.trim().toLowerCase().includes(q); item.hidden = !match; if (match) hasVisible = true; });
        listbox.querySelectorAll('.combobox-group-label').forEach(function (label) {
          var next = label.nextElementSibling; var groupHasVisible = false;
          while (next && !next.classList.contains('combobox-group-label') && !next.classList.contains('combobox-separator')) {
            if (next.getAttribute('role') === 'option' && !next.hidden) groupHasVisible = true; next = next.nextElementSibling;
          }
          label.hidden = !groupHasVisible;
        });
        listbox.querySelectorAll('.combobox-separator').forEach(function (sep) { var prev = sep.previousElementSibling; var next = sep.nextElementSibling; sep.hidden = (prev && prev.hidden) || (next && next.hidden); });
        if (empty) empty.hidden = hasVisible;
      }
      function clearHighlight() { allItems.forEach(function (item) { delete item.dataset.highlighted; }); highlighted = -1; }
      function doHighlight(index) {
        var items = getVisibleItems(); clearHighlight();
        if (index < 0 || index >= items.length) return;
        highlighted = index; items[index].dataset.highlighted = '';
        items[index].scrollIntoView({ block: 'nearest' });
        searchInput.setAttribute('aria-activedescendant', items[index].id);
      }
      function selectItem(item) {
        if (item.getAttribute('aria-disabled') === 'true') return;
        allItems.forEach(function (i) { i.setAttribute('aria-selected', 'false'); });
        item.setAttribute('aria-selected', 'true');
        if (valueEl) { valueEl.textContent = item.textContent.trim(); valueEl.removeAttribute('data-placeholder'); }
        close();
      }
      trigger.addEventListener('click', function () { if (isOpen()) { close(); } else { open(); } });
      searchInput.addEventListener('input', function () { filter(searchInput.value); doHighlight(0); });
      searchInput.addEventListener('keydown', function (e) {
        var items = getVisibleItems();
        switch (e.key) {
          case 'ArrowDown': e.preventDefault(); doHighlight(Math.min(highlighted + 1, items.length - 1)); break;
          case 'ArrowUp': e.preventDefault(); doHighlight(Math.max(highlighted - 1, 0)); break;
          case 'Enter': e.preventDefault(); if (highlighted >= 0 && items[highlighted]) selectItem(items[highlighted]); break;
          case 'Escape': e.preventDefault(); close(); break;
        }
      });
      listbox.addEventListener('click', function (e) { var item = e.target.closest('[role="option"]'); if (item && !item.hidden && item.getAttribute('aria-disabled') !== 'true') selectItem(item); });
      listbox.addEventListener('mousemove', function (e) { var item = e.target.closest('[role="option"]'); if (item && !item.hidden) { var items = getVisibleItems(); doHighlight(items.indexOf(item)); } });
      popover.addEventListener('toggle', function (e) { if (e.newState === 'closed') { trigger.setAttribute('aria-expanded', 'false'); clearHighlight(); } });
    });
  });
})();
