// ── layout.js ────────────────────────────────────────────────
// Web Components for the shared site header and sidebar nav.
// Loaded synchronously in <head> so elements render without FOUC.
// No ES modules — works with file:// protocol.

(function () {
  'use strict';

  /* ── Dark mode (must run before first paint) ───────────────── */
  var saved = localStorage.getItem('shadcn-html-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }

  /* Sync highlight.js theme sheets */
  function syncHljsTheme() {
    var isDark = document.documentElement.classList.contains('dark');
    var light = document.getElementById('hljs-light');
    var dark  = document.getElementById('hljs-dark');
    if (light) light.disabled = isDark;
    if (dark)  dark.disabled  = !isDark;
  }
  syncHljsTheme();

  /* ── Navigation data ──────────────────────────────────────── */
  var NAV = [
    { heading: 'Overview', items: [
      { label: 'Introduction', href: 'index.html' },
      { label: 'Installation', href: 'installation.html' },
      { label: 'Theming', href: 'theming.html' },
      { label: 'Data Attribute API', href: 'data-attribute-api.html' },
      { label: 'Changelog', href: 'changelog.html' },
    ]},
    { heading: 'Primitives', items: [
      { label: 'Typography', href: 'typography.html' },
      { label: 'Separator', href: 'separator.html' },
      { label: 'Icon', href: 'icon.html' },
      { label: 'Link', href: 'link.html' },
      { label: 'Label', href: 'label.html' },
    ]},
    { heading: 'Actions', items: [
      { label: 'Button', href: 'button.html' },
      { label: 'Toggle', href: 'toggle.html' },
      { label: 'Toggle Group', href: 'toggle-group.html' },
      { label: 'Button Group', href: 'button-group.html' },
      { label: 'Toolbar', href: 'toolbar.html' },
    ]},
    { heading: 'Forms &amp; Inputs', items: [
      { label: 'Input', href: 'input.html' },
      { label: 'Textarea', href: 'textarea.html' },
      { label: 'Checkbox', href: 'checkbox.html' },
      { label: 'Radio Group', href: 'radio.html' },
      { label: 'Switch', href: 'switch.html' },
      { label: 'Slider', href: 'slider.html' },
      { label: 'Select', href: 'select.html' },
      { label: 'Number Input', href: 'number-input.html' },
      { label: 'File Input', href: 'file-input.html' },
      { label: 'Color Picker', href: 'color-picker.html' },
      { label: 'Date Picker', href: 'date-picker.html' },
      { label: 'Combobox', href: 'combobox.html' },
      { label: 'Form', href: 'form.html' },
    ]},
    { heading: 'Data Display', items: [
      { label: 'Badge', href: 'badge.html' },
      { label: 'Tag', href: 'tag.html' },
      { label: 'Avatar', href: 'avatar.html' },
      { label: 'Card', href: 'card.html' },
      { label: 'Image', href: 'image.html' },
      { label: 'List', href: 'list.html' },
      { label: 'Descriptions', href: 'descriptions.html' },
      { label: 'Statistic', href: 'statistic.html' },
      { label: 'Table', href: 'table.html' },
      { label: 'Empty State', href: 'empty-state.html' },
      { label: 'Collapsible', href: 'collapsible.html' },
      { label: 'Timeline', href: 'timeline.html' },
      { label: 'Tree View', href: 'tree-view.html' },
      { label: 'Calendar', href: 'calendar.html' },
    ]},
    { heading: 'Feedback &amp; Status', items: [
      { label: 'Spinner', href: 'spinner.html' },
      { label: 'Skeleton', href: 'skeleton.html' },
      { label: 'Progress', href: 'progress.html' },
      { label: 'Alert', href: 'alert.html' },
      { label: 'Alert Dialog', href: 'alert-dialog.html' },
      { label: 'Toast', href: 'toast.html' },
    ]},
    { heading: 'Overlays', items: [
      { label: 'Popover', href: 'popover.html' },
      { label: 'Tooltip', href: 'tooltip.html' },
      { label: 'Context Menu', href: 'context-menu.html' },
      { label: 'Dialog', href: 'dialog.html' },
      { label: 'Sheet', href: 'sheet.html' },
      { label: 'Accordion', href: 'accordion.html' },
      { label: 'Command', href: 'command.html' },
    ]},
    { heading: 'Navigation', items: [
      { label: 'Breadcrumb', href: 'breadcrumb.html' },
      { label: 'Pagination', href: 'pagination.html' },
      { label: 'Steps', href: 'steps.html' },
      { label: 'Tabs', href: 'tabs.html' },
      { label: 'Dropdown Menu', href: 'dropdown.html' },
      { label: 'Navigation Menu', href: 'navigation-menu.html' },
    ]},
    { heading: 'Layout', items: [
      { label: 'Aspect Ratio', href: 'aspect-ratio.html' },
      { label: 'Container', href: 'container.html' },
      { label: 'Scroll Area', href: 'scroll-area.html' },
      { label: 'Carousel', href: 'carousel.html' },
      { label: 'Sidebar', href: 'sidebar.html' },
      { label: 'Sortable', href: 'sortable.html' },
    ]},
  ];

  /* Pages that have been built (have a real doc page) */
  var BUILT = new Set([
    'index.html', 'installation.html', 'theming.html', 'data-attribute-api.html', 'changelog.html',
    'typography.html', 'separator.html', 'icon.html', 'link.html', 'label.html',
    'button.html', 'toggle.html', 'toggle-group.html', 'button-group.html', 'toolbar.html',
    'input.html', 'textarea.html', 'checkbox.html', 'radio.html', 'switch.html',
    'slider.html', 'select.html', 'number-input.html', 'file-input.html',
    'color-picker.html', 'date-picker.html', 'combobox.html', 'form.html',
    'badge.html', 'tag.html', 'avatar.html', 'card.html', 'image.html',
    'list.html', 'descriptions.html', 'statistic.html', 'table.html',
    'empty-state.html', 'collapsible.html', 'timeline.html', 'tree-view.html', 'calendar.html',
    'spinner.html', 'skeleton.html', 'progress.html', 'alert.html', 'alert-dialog.html',
    'toast.html',
    'popover.html', 'tooltip.html', 'context-menu.html',
    'dialog.html', 'sheet.html', 'accordion.html', 'command.html',
    'breadcrumb.html', 'pagination.html', 'steps.html',
    'tabs.html', 'dropdown.html', 'navigation-menu.html',
    'aspect-ratio.html', 'container.html', 'scroll-area.html',
    'carousel.html', 'sidebar.html', 'sortable.html',
  ]);

  /* Detect current filename */
  var currentPage = location.pathname.split('/').pop() || 'index.html';

  /* ── <site-header> ────────────────────────────────────────── */
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';
      this.innerHTML =
        '<header class="site-header">' +
          '<a href="index.html" style="display:flex;align-items:center;gap:0.625rem;text-decoration:none;">' +
            '<span style="font-family:var(--font-display);font-size:1.1875rem;font-weight:500;letter-spacing:-0.03em;color:var(--foreground);">shadcn<em>-html</em></span>' +
            '<span class="badge" data-variant="outline" style="font-family:var(--font-mono);">v0.3.0</span>' +
          '</a>' +
          '<div style="flex:1;"></div>' +
          '<nav style="display:flex;align-items:center;gap:0.25rem;">' +
            '<a href="https://github.com" target="_blank" rel="noopener" class="header-action">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>' +
              'GitHub' +
            '</a>' +
            '<button id="theme-toggle" class="header-action theme-toggle-btn" aria-label="Toggle dark mode">' +
              '<svg id="icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>' +
              '<svg id="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>' +
            '</button>' +
          '</nav>' +
        '</header>';
    }
  }

  /* ── <site-nav> ───────────────────────────────────────────── */
  class SiteNav extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';
      var html = '<aside class="site-sidebar">';
      NAV.forEach(function (section) {
        html += '<div style="margin-bottom:1.25rem;">';
        html += '<p class="nav-heading">' + section.heading + '</p>';
        section.items.forEach(function (item) {
          var cls = 'nav-link';
          if (item.href === currentPage) cls += ' active';
          else if (!BUILT.has(item.href)) cls += ' disabled';
          html += '<a class="' + cls + '" href="' + item.href + '">' + item.label + '</a>';
        });
        html += '</div>';
      });
      html += '<div class="sidebar-author">' +
        '<hr style="border:none;border-top:1px solid var(--sidebar-border);margin:0.75rem 0.75rem 0.875rem;">' +
        '<p style="padding:0 0.75rem;margin:0;font-size:0.75rem;color:var(--muted-foreground);line-height:1.6;">' +
          'Built by <a href="https://codylindley.com" target="_blank" rel="noopener" style="color:var(--foreground);text-decoration:underline;text-underline-offset:3px;font-weight:500;">Cody Lindley</a>' +
        '</p>' +
      '</div>';
      html += '</aside>';
      this.innerHTML = html;
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-nav', SiteNav);

  /* ── Sidebar scroll persistence ───────────────────────────── */
  /* Save scroll position before navigating, restore on load.   */
  var SCROLL_KEY = 'shadcn-nav-scroll';

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a.nav-link');
    if (!link) return;
    var sidebar = document.querySelector('.site-sidebar');
    if (sidebar) sessionStorage.setItem(SCROLL_KEY, sidebar.scrollTop);
  });

  /* Also save on logo click */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.site-header a[href="index.html"]')) {
      var sidebar = document.querySelector('.site-sidebar');
      if (sidebar) sessionStorage.setItem(SCROLL_KEY, sidebar.scrollTop);
    }
  });

  /* Restore sidebar scroll & scroll active link into view */
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.querySelector('.site-sidebar');
    if (!sidebar) return;
    var saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      sidebar.scrollTop = parseInt(saved, 10);
      sessionStorage.removeItem(SCROLL_KEY);
    } else {
      /* First visit — scroll active link into view */
      var active = sidebar.querySelector('.nav-link.active');
      if (active) active.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  });

  /* ── Hover prefetch ───────────────────────────────────────── */
  var prefetched = {};
  document.addEventListener('mouseover', function (e) {
    var link = e.target.closest('a.nav-link:not(.disabled)');
    if (!link) return;
    var href = link.getAttribute('href');
    if (href && !prefetched[href] && href !== currentPage && !href.startsWith('http')) {
      prefetched[href] = true;
      var l = document.createElement('link');
      l.rel = 'prefetch';
      l.href = href;
      document.head.appendChild(l);
    }
  });
})();
