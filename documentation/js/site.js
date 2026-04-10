// ── site.js ─────────────────────────────────────────────────
// Single script for the shadcn-html documentation site.
// No ES modules — works with file:// protocol.
// Include via <script src="js/site.js" defer></script>

(function () {
  'use strict';

  // ── Dark mode ───────────────────────────────────────────
  var saved = localStorage.getItem('shadcn-html-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }

  function toggleDark() {
    var isDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    document.getElementById('icon-sun').style.display  = isDark ? 'block' : 'none';
    document.getElementById('icon-moon').style.display = isDark ? 'none'  : 'block';
    localStorage.setItem('shadcn-html-theme', isDark ? 'light' : 'dark');
  }

  // ── On DOM ready ────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {

    // Sync dark mode icon state
    var isDark = document.documentElement.classList.contains('dark');
    var sun = document.getElementById('icon-sun');
    var moon = document.getElementById('icon-moon');
    if (sun) sun.style.display = isDark ? 'none' : 'block';
    if (moon) moon.style.display = isDark ? 'block' : 'none';

    // Bind toggle button
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleDark);

    // ── Doc tabs (Preview / Pattern / HTML) ─────────────
    document.querySelectorAll('.doc-tablist[role="tablist"]').forEach(function (tabList) {
      var buttons = Array.from(tabList.querySelectorAll('.tab-btn'));
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var panelId = btn.getAttribute('aria-controls');
          var group = btn.dataset.group;
          buttons.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
          btn.setAttribute('aria-selected', 'true');
          document.querySelectorAll('[data-tab-group="' + group + '"]').forEach(function (p) { p.classList.remove('active'); });
          var panel = document.getElementById(panelId);
          if (panel) panel.classList.add('active');
        });
      });
    });

    // ── Copy buttons ────────────────────────────────────
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pre = btn.nextElementSibling;
        if (!pre) return;
        navigator.clipboard.writeText(pre.innerText).then(function () {
          btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Copied';
          setTimeout(function () {
            btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Copy';
          }, 2000);
        });
      });
    });

    // ── Dialog wiring ───────────────────────────────────
    document.querySelectorAll('[data-dialog-trigger]').forEach(function (trigger) {
      var dialog = document.getElementById(trigger.dataset.dialogTrigger);
      if (!dialog) return;
      trigger.addEventListener('click', function () {
        dialog._trigger = trigger;
        dialog.showModal();
      });
    });
    document.querySelectorAll('dialog').forEach(function (dialog) {
      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) dialog.close();
      });
      dialog.querySelectorAll('[data-dialog-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { dialog.close(); });
      });
      dialog.addEventListener('close', function () {
        if (dialog._trigger) dialog._trigger.focus();
      });
    });

    // ── Accordion (single-open) ─────────────────────────

    // ── Sheet wiring ────────────────────────────────────
    document.querySelectorAll('[data-sheet-trigger]').forEach(function (trigger) {
      var sheet = document.getElementById(trigger.dataset.sheetTrigger);
      if (!sheet) return;
      trigger.addEventListener('click', function () {
        sheet._trigger = trigger;
        sheet.showModal();
      });
    });
    document.querySelectorAll('dialog.sheet').forEach(function (sheet) {
      sheet.addEventListener('click', function (e) {
        if (e.target === sheet) sheet.close();
      });
      sheet.querySelectorAll('[data-sheet-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { sheet.close(); });
      });
      sheet.addEventListener('close', function () {
        if (sheet._trigger) sheet._trigger.focus();
      });
    });

    // ── Accordion (single-open) ─────────────────────────
    document.querySelectorAll('.accordion[data-type="single"]').forEach(function (accordion) {
      var items = accordion.querySelectorAll('.accordion-item');
      var collapsible = accordion.hasAttribute('data-collapsible');
      items.forEach(function (item) {
        item.addEventListener('toggle', function () {
          if (item.open) {
            items.forEach(function (sibling) {
              if (sibling !== item && sibling.open) sibling.open = false;
            });
          } else if (!collapsible) {
            var anyOpen = Array.from(items).some(function (i) { return i.open; });
            if (!anyOpen) item.open = true;
          }
        });
      });
    });

    // ── Tabs (ARIA keyboard navigation) ─────────────────
    function activateTab(tab, triggers) {
      triggers.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });
      tab.setAttribute('aria-selected', 'true');
      tab.removeAttribute('tabindex');
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.hidden = false;
    }

    document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
      if (!tablist.querySelector('.tab-trigger')) return;
      var triggers = Array.from(tablist.querySelectorAll('[role="tab"]'));
      var orientation = tablist.getAttribute('aria-orientation') || 'horizontal';

      triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () { activateTab(trigger, triggers); });
        trigger.addEventListener('keydown', function (e) {
          var current = triggers.indexOf(trigger);
          var next;
          var forward = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
          var backward = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
          switch (e.key) {
            case forward:
              e.preventDefault();
              for (var i = 1; i <= triggers.length; i++) {
                var c = triggers[(current + i) % triggers.length];
                if (!c.disabled) { next = c; break; }
              }
              break;
            case backward:
              e.preventDefault();
              for (var i = 1; i <= triggers.length; i++) {
                var c = triggers[(current - i + triggers.length) % triggers.length];
                if (!c.disabled) { next = c; break; }
              }
              break;
            case 'Home':
              e.preventDefault();
              next = triggers.find(function (t) { return !t.disabled; });
              break;
            case 'End':
              e.preventDefault();
              next = triggers.slice().reverse().find(function (t) { return !t.disabled; });
              break;
          }
          if (next && !next.disabled) {
            activateTab(next, triggers);
            next.focus();
          }
        });
      });
    });

    // ── Dropdown menu wiring ────────────────────────────
    document.querySelectorAll('[data-dropdown-trigger]').forEach(function (trigger) {
      var menu = document.getElementById(trigger.dataset.dropdownTrigger);
      if (!menu) return;

      function positionMenu() {
        var rect = trigger.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = rect.bottom + 4 + 'px';
        menu.style.left = rect.left + 'px';
        menu.style.margin = '0';
      }
      function getItems() {
        return Array.from(menu.querySelectorAll('[role="menuitem"]:not(:disabled), [role="menuitemcheckbox"]:not(:disabled), [role="menuitemradio"]:not(:disabled)'));
      }
      function highlight(item) {
        getItems().forEach(function (i) { i.removeAttribute('data-highlighted'); });
        if (item) { item.setAttribute('data-highlighted', ''); item.focus(); }
      }
      trigger.addEventListener('click', function () { positionMenu(); menu.togglePopover(); });
      menu.addEventListener('toggle', function (e) {
        var open = e.newState === 'open';
        trigger.setAttribute('aria-expanded', open);
        if (open) { var first = getItems()[0]; if (first) highlight(first); }
        else { getItems().forEach(function (i) { i.removeAttribute('data-highlighted'); }); trigger.focus(); }
      });
      menu.addEventListener('mousemove', function (e) {
        var item = e.target.closest('[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]');
        if (item && !item.disabled) highlight(item);
      });
      menu.addEventListener('mouseleave', function () {
        getItems().forEach(function (i) { i.removeAttribute('data-highlighted'); });
      });
      menu.addEventListener('keydown', function (e) {
        var items = getItems();
        var current = items.indexOf(document.activeElement);
        switch (e.key) {
          case 'ArrowDown': e.preventDefault(); highlight(items[(current + 1) % items.length]); break;
          case 'ArrowUp': e.preventDefault(); highlight(items[(current - 1 + items.length) % items.length]); break;
          case 'Home': e.preventDefault(); highlight(items[0]); break;
          case 'End': e.preventDefault(); highlight(items[items.length - 1]); break;
          case 'Escape': menu.hidePopover(); break;
          case 'Enter': case ' ':
            e.preventDefault();
            if (document.activeElement) {
              var role = document.activeElement.getAttribute('role');
              if (role === 'menuitemcheckbox') {
                var checked = document.activeElement.getAttribute('aria-checked') === 'true';
                document.activeElement.setAttribute('aria-checked', !checked);
              } else if (role === 'menuitemradio') {
                var group = document.activeElement.closest('[role="group"]');
                if (group) group.querySelectorAll('[role="menuitemradio"]').forEach(function (r) { r.setAttribute('aria-checked', 'false'); });
                document.activeElement.setAttribute('aria-checked', 'true');
              } else { document.activeElement.click(); menu.hidePopover(); }
            }
            break;
          default:
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
              var match = items.find(function (item) { return item.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase()); });
              if (match) highlight(match);
            }
        }
      });
    });

    // ── Combobox wiring ─────────────────────────────────
    document.querySelectorAll('.combobox').forEach(function (wrapper) {
      var input = wrapper.querySelector('[role="combobox"]');
      var listbox = wrapper.querySelector('[role="listbox"]');
      var trigger = wrapper.querySelector('.combobox-trigger');
      var empty = wrapper.querySelector('.combobox-empty');
      if (!input || !listbox) return;
      var allItems = Array.from(listbox.querySelectorAll('[role="option"]'));
      var highlighted = -1;

      function getVisibleItems() { return allItems.filter(function (item) { return !item.hidden && item.getAttribute('aria-disabled') !== 'true'; }); }
      function positionListbox() {
        var rect = wrapper.getBoundingClientRect();
        listbox.style.position = 'fixed'; listbox.style.top = rect.bottom + 4 + 'px';
        listbox.style.left = rect.left + 'px'; listbox.style.width = rect.width + 'px';
      }
      function open() { positionListbox(); listbox.showPopover(); listbox.setAttribute('data-open', ''); input.setAttribute('aria-expanded', 'true'); }
      function close() { listbox.removeAttribute('data-open'); listbox.hidePopover(); input.setAttribute('aria-expanded', 'false'); input.setAttribute('aria-activedescendant', ''); clearHighlight(); }
      function isOpen() { return listbox.matches(':popover-open'); }
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
        input.setAttribute('aria-activedescendant', items[index].id);
      }
      function selectItem(item) {
        if (item.getAttribute('aria-disabled') === 'true') return;
        allItems.forEach(function (i) { i.setAttribute('aria-selected', 'false'); });
        item.setAttribute('aria-selected', 'true'); input.value = item.textContent.trim(); close();
      }
      input.addEventListener('input', function () { filter(input.value); if (!isOpen()) open(); doHighlight(0); });
      input.addEventListener('focus', function () { if (!isOpen()) { filter(input.value); open(); } });
      input.addEventListener('keydown', function (e) {
        var items = getVisibleItems();
        switch (e.key) {
          case 'ArrowDown': e.preventDefault(); if (!isOpen()) { open(); doHighlight(0); return; } doHighlight(Math.min(highlighted + 1, items.length - 1)); break;
          case 'ArrowUp': e.preventDefault(); if (!isOpen()) { open(); doHighlight(items.length - 1); return; } doHighlight(Math.max(highlighted - 1, 0)); break;
          case 'Enter': e.preventDefault(); if (highlighted >= 0 && items[highlighted]) selectItem(items[highlighted]); break;
          case 'Escape': if (isOpen()) { e.preventDefault(); close(); } break;
          case 'Tab': close(); break;
        }
      });
      if (trigger) { trigger.addEventListener('click', function () { if (isOpen()) { close(); } else { filter(''); open(); doHighlight(-1); } input.focus(); }); }
      listbox.addEventListener('click', function (e) { var item = e.target.closest('[role="option"]'); if (item && !item.hidden) selectItem(item); });
      listbox.addEventListener('mousemove', function (e) { var item = e.target.closest('[role="option"]'); if (item && !item.hidden) { var items = getVisibleItems(); doHighlight(items.indexOf(item)); } });
      listbox.addEventListener('toggle', function (e) { if (e.newState === 'closed') { input.setAttribute('aria-expanded', 'false'); clearHighlight(); } });
    });

    // ── Toast API ───────────────────────────────────────
    var DURATION = 4000, MAX_VISIBLE = 3;
    var toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container';
      toastContainer.setAttribute('aria-label', 'Notifications');
      toastContainer.setAttribute('data-position', 'bottom-right');
      document.body.appendChild(toastContainer);
    }
    function toastDismiss(el, callback) {
      if (!el || !el.parentNode) return;
      el.style.opacity = '0'; el.style.transform = 'translateY(0.5rem)';
      setTimeout(function () { try { el.hidePopover(); } catch(e) {} el.remove(); if (callback) callback(); }, 200);
    }
    function toastCreate(options) {
      var o = typeof options === 'string' ? { title: options } : options;
      var title = o.title, description = o.description, variant = o.variant, duration = o.duration != null ? o.duration : DURATION, action = o.action, onDismiss = o.onDismiss;
      var el = document.createElement('div'); el.className = 'toast';
      el.setAttribute('role', variant === 'destructive' ? 'alert' : 'status');
      el.setAttribute('aria-live', variant === 'destructive' ? 'assertive' : 'polite');
      el.setAttribute('aria-atomic', 'true'); el.setAttribute('popover', 'manual');
      if (variant) el.setAttribute('data-variant', variant);
      var icons = {
        success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
        warning: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
        info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
        destructive: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>'
      };
      var icon = variant && icons[variant] ? icons[variant] : '';
      el.innerHTML = '<div class="toast-content">' + icon + '<div class="toast-text">' +
        (title ? '<p class="toast-title">' + title + '</p>' : '') +
        (description ? '<p class="toast-description">' + description + '</p>' : '') +
        '</div><button class="toast-close" aria-label="Dismiss" data-toast-close><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
        (action ? '<div class="toast-actions"><button class="btn" data-variant="outline" data-size="sm" data-toast-action>' + action.label + '</button></div>' : '');
      toastContainer.appendChild(el); el.showPopover();
      el.querySelector('[data-toast-close]').addEventListener('click', function () { toastDismiss(el, onDismiss); });
      if (action) { el.querySelector('[data-toast-action]').addEventListener('click', function () { if (action.onClick) action.onClick(); toastDismiss(el); }); }
      if (duration !== Infinity) setTimeout(function () { toastDismiss(el, onDismiss); }, duration);
      var toasts = toastContainer.querySelectorAll('.toast');
      if (toasts.length > MAX_VISIBLE) toastDismiss(toasts[0]);
      return el;
    }
    window.toast = {
      show: toastCreate,
      success: function (o) { return toastCreate(Object.assign(typeof o === 'string' ? { title: o } : o, { variant: 'success' })); },
      warning: function (o) { return toastCreate(Object.assign(typeof o === 'string' ? { title: o } : o, { variant: 'warning' })); },
      info: function (o) { return toastCreate(Object.assign(typeof o === 'string' ? { title: o } : o, { variant: 'info' })); },
      error: function (o) { return toastCreate(Object.assign(typeof o === 'string' ? { title: o } : o, { variant: 'destructive' })); },
      dismiss: function () { toastContainer.querySelectorAll('.toast').forEach(function (el) { toastDismiss(el); }); }
    };

    // ── Token swatches (tokens page only) ───────────────
    var swatchContainer = document.getElementById('swatch-container');
    if (swatchContainer) {
      var pairs = [['background','foreground'],['primary','primary-foreground'],['secondary','secondary-foreground'],['muted','muted-foreground'],['accent','accent-foreground'],['card','card-foreground'],['popover','popover-foreground'],['destructive','destructive-foreground']];
      pairs.forEach(function (p) {
        var surface = p[0], fg = p[1];
        var row = document.createElement('div'); row.className = 'swatch-row';
        row.innerHTML = '<div style="display:flex;gap:0.375rem;flex-shrink:0;"><div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + surface + ');border:1px solid var(--border);"></div><div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + fg + ');border:1px solid var(--border);"></div></div><div><p style="margin:0;font-size:0.8125rem;font-family:var(--font-mono);">--' + surface + '</p><p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);font-family:var(--font-mono);">--' + fg + '</p></div><span style="margin-left:auto;font-size:0.75rem;color:var(--muted-foreground);font-family:var(--font-mono);">bg-' + surface + ' text-' + fg + '</span>';
        swatchContainer.appendChild(row);
      });
    }
    var sidebarSwatchContainer = document.getElementById('sidebar-swatch-container');
    if (sidebarSwatchContainer) {
      [['sidebar','sidebar-foreground'],['sidebar-primary','sidebar-primary-foreground'],['sidebar-accent','sidebar-accent-foreground']].forEach(function (p) {
        var surface = p[0], fg = p[1];
        var row = document.createElement('div'); row.className = 'swatch-row';
        row.innerHTML = '<div style="display:flex;gap:0.375rem;flex-shrink:0;"><div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + surface + ');border:1px solid var(--border);"></div><div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + fg + ');border:1px solid var(--border);"></div></div><div><p style="margin:0;font-size:0.8125rem;font-family:var(--font-mono);">--' + surface + '</p><p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);font-family:var(--font-mono);">--' + fg + '</p></div><span style="margin-left:auto;font-size:0.75rem;color:var(--muted-foreground);font-family:var(--font-mono);">bg-' + surface + ' text-' + fg + '</span>';
        sidebarSwatchContainer.appendChild(row);
      });
      [['sidebar-border','border-sidebar-border'],['sidebar-ring','ring-sidebar-ring']].forEach(function (p) {
        var token = p[0], utility = p[1];
        var row = document.createElement('div'); row.className = 'swatch-row';
        row.innerHTML = '<div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + token + ');border:1px solid var(--border);flex-shrink:0;"></div><code>--' + token + '</code><span class="text-sm text-muted-foreground ml-auto">' + utility + '</span>';
        sidebarSwatchContainer.appendChild(row);
      });
    }
  });
})();
