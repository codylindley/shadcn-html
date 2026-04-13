// -- layout.js ------------------------------------------------
// Web Components for the shared site header and sidebar nav.
// SPA client-side router for flash-free navigation.
// Loaded synchronously in <head> so elements render without FOUC.

(function () {
  'use strict';

  /* -- Dark mode (must run before first paint) ----------------- */
  var saved = localStorage.getItem('shadcn-html-theme');
  var darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
  var prefersDark = darkMQ.matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }

  /* React to OS theme changes in real time (only if user hasn't set a manual preference) */
  darkMQ.addEventListener('change', function (e) {
    if (localStorage.getItem('shadcn-html-theme')) return;   // user chose manually — respect it
    document.documentElement.classList.toggle('dark', e.matches);
    document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
    var sun = document.getElementById('icon-sun');
    var moon = document.getElementById('icon-moon');
    if (sun) sun.style.display = e.matches ? 'none' : 'block';
    if (moon) moon.style.display = e.matches ? 'block' : 'none';
    if (window.applyTheme && window.__activeColorTheme && window.__activeColorTheme !== 'default') {
      window.applyTheme(window.__activeColorTheme);
    }
    if (window.updateFavicon) window.updateFavicon();
  });

  /* -- SPA page-ready helper ----------------------------------- */
  /* Doc-site scripts (site.js) call window.onPageReady(fn)      */
  /* to register functions that run on initial load AND after     */
  /* each SPA navigation. Component modules auto-reinitialize    */
  /* via MutationObserver when the DOM changes.                  */
  var domReady = false;
  document.addEventListener('DOMContentLoaded', function () { domReady = true; });

  window.onPageReady = function (fn) {
    if (domReady) {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
    (window.__spaInits = window.__spaInits || []).push(fn);
  };

  /* -- Navigation data ---------------------------------------- */
  var NAV = [
    { heading: 'Overview', items: [
      { label: 'Introduction', href: 'index.html' },
      { label: 'Installation', href: 'installation.html' },
      { label: 'Theming', href: 'theming.html' },
      { label: 'Dark Mode', href: 'dark-mode.html' },
      { label: 'Data Attribute API', href: 'data-attribute-api.html' },
      { label: 'Cascade Layers', href: 'cascade-layers.html' },
      { label: 'ES Modules', href: 'es-modules.html' },
      { label: 'Native Web APIs', href: 'native-web-apis.html' },
      { label: 'Animations', href: 'animations.html' },
      { label: 'Accessibility', href: 'accessibility.html' },
      { label: 'Component Skills', href: 'component-skills.html' },
      { label: 'Changelog', href: 'changelog.html' },
    ]},
    { heading: 'Primitives', items: [
      { label: 'Typography', href: 'typography.html' },
      { label: 'Separator', href: 'separator.html' },
      { label: 'Icon', href: 'icon.html' },
    ]},
    { heading: 'Actions', items: [
      { label: 'Button', href: 'button.html' },
      { label: 'Toggle', href: 'toggle.html' },
      { label: 'Toggle Group', href: 'toggle-group.html' },
      { label: 'Button Group', href: 'button-group.html' },
      { label: 'Toolbar', href: 'toolbar.html' },
    ]},
    { heading: 'Forms &amp; Inputs', items: [
      { label: 'Label', href: 'label.html' },
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
      { label: 'Avatar', href: 'avatar.html' },
      { label: 'Card', href: 'card.html' },
      { label: 'Image', href: 'image.html' },
      { label: 'Statistic', href: 'statistic.html' },
      { label: 'Table', href: 'table.html' },
      { label: 'Collapsible', href: 'collapsible.html' },
      { label: 'Timeline', href: 'timeline.html' },
      { label: 'Tree View', href: 'tree-view.html' },
      { label: 'Calendar', href: 'calendar.html' },
      { label: 'Carousel', href: 'carousel.html' },
      { label: 'Scroll Area', href: 'scroll-area.html' },
      { label: 'Sortable', href: 'sortable.html' },
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
    { heading: 'Application', items: [
      { label: 'Sidebar', href: 'sidebar.html' },
    ]},
  ];

  /* Pages that have been built (have a real doc page) */
  var BUILT = new Set([
    'index.html', 'installation.html', 'theming.html', 'dark-mode.html', 'data-attribute-api.html', 'cascade-layers.html', 'es-modules.html', 'native-web-apis.html', 'animations.html', 'accessibility.html', 'component-skills.html', 'changelog.html',
    'typography.html', 'separator.html', 'icon.html', 'label.html',
    'button.html', 'toggle.html', 'toggle-group.html', 'button-group.html', 'toolbar.html',
    'input.html', 'textarea.html', 'checkbox.html', 'radio.html', 'switch.html',
    'slider.html', 'select.html', 'number-input.html', 'file-input.html',
    'color-picker.html', 'date-picker.html', 'combobox.html', 'form.html',
    'badge.html', 'avatar.html', 'card.html', 'image.html',
    'statistic.html', 'table.html',
    'collapsible.html', 'timeline.html', 'tree-view.html', 'calendar.html',
    'spinner.html', 'skeleton.html', 'progress.html', 'alert.html', 'alert-dialog.html',
    'toast.html',
    'popover.html', 'tooltip.html', 'context-menu.html',
    'dialog.html', 'sheet.html', 'accordion.html', 'command.html',
    'breadcrumb.html', 'pagination.html', 'steps.html',
    'tabs.html', 'dropdown.html', 'navigation-menu.html',
    'scroll-area.html',
    'carousel.html', 'sidebar.html', 'sortable.html',
  ]);

  /* Detect current filename */
  var currentPage = location.pathname.split('/').pop() || 'index.html';

  /* -- <site-header> ------------------------------------------ */
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';
      this.innerHTML =
        '<header class="site-header">' +
          '<a href="index.html" style="display:flex;align-items:center;gap:0.625rem;text-decoration:none;">' +
            '<span style="font-family:var(--font-display);font-size:1.1875rem;font-weight:500;letter-spacing:-0.03em;color:var(--foreground);">shadcn<em>-html</em></span>' +
            '<span class="badge" data-variant="outline" style="font-family:var(--font-mono);">v0.7.4-alpha</span>' +
          '</a>' +
          '<div style="flex:1;"></div>' +
          '<nav style="display:flex;align-items:center;gap:0.25rem;">' +
            '<a href="https://github.com/codylindley/shadcn-html" target="_blank" rel="noopener" class="header-action">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>' +
              'GitHub' +
              '<span class="github-stars"></span>' +
            '</a>' +
            '<button id="theme-toggle" class="header-action theme-toggle-btn" aria-label="Toggle dark mode">' +
              '<svg id="icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>' +
              '<svg id="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>' +
            '</button>' +
            '<button id="theme-selector-btn" class="header-action theme-toggle-btn" aria-label="Change color theme" popovertarget="theme-popover">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>' +
            '</button>' +
          '</nav>' +
        '</header>' +
        '<div id="theme-popover" popover class="theme-popover">' +
          '<div class="theme-popover-header">' +
            '<span class="theme-popover-title">Theme</span>' +
            '<button class="theme-reset-btn" id="theme-reset-btn">Reset</button>' +
          '</div>' +
          '<div class="theme-grid" id="theme-grid"></div>' +
        '</div>';

      /* Build theme swatches */
      var grid = this.querySelector('#theme-grid');
      if (grid && window.THEMES) {
        var activeId = window.__activeColorTheme || 'default';
        window.THEMES.forEach(function (t) {
          var btn = document.createElement('button');
          btn.className = 'theme-swatch' + (t.id === activeId ? ' active' : '');
          btn.setAttribute('data-theme-id', t.id);

          var label = document.createElement('span');
          label.className = 'theme-swatch-label';
          label.textContent = t.label;
          btn.appendChild(label);

          var colors = document.createElement('div');
          colors.className = 'theme-swatch-colors';

          // Show 5 color dots: primary, secondary, accent, destructive, muted
          var dotKeys = ['primary', 'secondary', 'accent', 'destructive', 'muted'];
          var isDark = document.documentElement.classList.contains('dark');
          var mode = isDark ? 'dark' : 'light';
          dotKeys.forEach(function (key) {
            var dot = document.createElement('span');
            dot.className = 'theme-swatch-dot';
            var color = null;
            if (t.styles && t.styles[mode]) {
              color = t.styles[mode][key];
            }
            if (!color && t.id === 'default') {
              // Default theme colors from default-semantic-tokens.css
              var defaults = {
                light: { primary: 'oklch(0.205 0.005 285)', secondary: 'oklch(0.94 0.003 247)', accent: 'oklch(0.94 0.003 247)', destructive: 'oklch(0.577 0.245 27.325)', muted: 'oklch(0.94 0.003 247)' },
                dark: { primary: 'oklch(0.985 0.002 247)', secondary: 'oklch(0.22 0.006 285)', accent: 'oklch(0.22 0.006 285)', destructive: 'oklch(0.396 0.141 25.723)', muted: 'oklch(0.22 0.006 285)' }
              };
              color = defaults[mode][key];
            }
            if (color) dot.style.background = color;
            colors.appendChild(dot);
          });
          btn.appendChild(colors);

          btn.addEventListener('click', function () {
            if (window.applyTheme) window.applyTheme(t.id);
            var popover = document.getElementById('theme-popover');
            if (popover) popover.hidePopover();
          });

          grid.appendChild(btn);
        });
      }

      /* Reset button */
      var resetBtn = this.querySelector('#theme-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          if (window.applyTheme) window.applyTheme('default');
        });
      }
    }
  }

  /* -- <site-nav> --------------------------------------------- */
  class SiteNav extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';
      var html = '<aside class="site-sidebar">';
      html += '<div class="sidebar-scroll">';
      NAV.forEach(function (section, i) {
        html += '<div class="nav-section" style="margin-bottom:1.25rem;">';
        html += '<p class="nav-heading">' + section.heading + '</p>';
        var isComponentSection = (i > 0);
        section.items.forEach(function (item) {
          var cls = 'nav-link';
          if (item.href === currentPage) cls += ' active';
          else if (!BUILT.has(item.href)) cls += ' disabled';
          var badge = isComponentSection
            ? ' <span style="font-size:0.5625rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:var(--muted-foreground);opacity:0.7;margin-left:auto;flex-shrink:0;">PREVIEW</span>'
            : '';
          html += '<a class="' + cls + '" href="' + item.href + '" style="display:flex;align-items:center;gap:0.375rem;">' + item.label + badge + '</a>';
        });
        html += '</div>';
        /* Insert filter input after Overview section */
        if (i === 0) {
          html += '<div class="nav-filter-wrap" style="padding:0 0.375rem 0.75rem;">' +
            '<input type="text" class="nav-filter-input" placeholder="Filter components..." ' +
              'aria-label="Filter components" autocomplete="off" spellcheck="false" ' +
              'style="' +
                'width:100%;box-sizing:border-box;' +
                'padding:0.375rem 0.625rem;' +
                'font-size:0.8125rem;font-family:var(--font-sans);' +
                'border:1px solid var(--sidebar-border);' +
                'border-radius:var(--radius-md);' +
                'background:var(--sidebar);' +
                'color:var(--foreground);' +
                'outline:none;' +
              '">' +
          '</div>';
        }
      });
      html += '</div>';
      html += '<div class="sidebar-author">' +
        '<hr style="border:none;border-top:1px solid var(--sidebar-border);margin:0 0.75rem 0.875rem;">' +
        '<p style="padding:0 0.75rem 0;margin:0;font-size:0.75rem;color:var(--muted-foreground);line-height:1.6;">' +
          'Built by <a href="https://codylindley.com" target="_blank" rel="noopener" style="color:var(--foreground);text-decoration:underline;text-underline-offset:3px;font-weight:500;">Cody Lindley</a>' +
        '</p>' +
      '</div>';
      html += '</aside>';
      this.innerHTML = html;

      /* -- Filter logic --------------------------------------- */
      var input = this.querySelector('.nav-filter-input');
      var sections = this.querySelectorAll('.nav-section');
      if (input && sections.length) {
        input.addEventListener('input', function () {
          var q = input.value.toLowerCase().trim();
          /* Skip the first section (Overview) — always visible */
          for (var s = 1; s < sections.length; s++) {
            var sec = sections[s];
            var links = sec.querySelectorAll('.nav-link');
            var anyVisible = false;
            for (var l = 0; l < links.length; l++) {
              var match = !q || links[l].textContent.toLowerCase().indexOf(q) !== -1;
              links[l].style.display = match ? '' : 'none';
              if (match) anyVisible = true;
            }
            sec.style.display = anyVisible ? '' : 'none';
          }
        });
        /* Focus shortcut: Cmd/Ctrl+K focuses the filter */
        document.addEventListener('keydown', function (e) {
          if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            input.focus();
            input.select();
          }
        });
      }
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-nav', SiteNav);

  /* -- Sidebar scroll persistence ----------------------------- */
  /* Save scroll position before navigating, restore on load.   */
  /* (With SPA router, sidebar persists — this handles fallback */
  /* cases: first load, hard refresh, external navigation.)     */
  var SCROLL_KEY = 'shadcn-nav-scroll';

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a.nav-link, .site-header a[href="index.html"]');
    if (!link) return;
    var sidebar = document.querySelector('.sidebar-scroll');
    if (sidebar) sessionStorage.setItem(SCROLL_KEY, sidebar.scrollTop);
  });

  /* Restore sidebar scroll & scroll active link into view */
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.querySelector('.sidebar-scroll');
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

  /* -- Hover prefetch ----------------------------------------- */
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

  /* -- SPA Client-Side Router --------------------------------- */
  /* Intercepts nav link clicks and swaps <main> content         */
  /* without full-page reloads. Sidebar & header persist.        */

  var navigating = false;

  function navigateTo(href, pushState) {
    if (navigating) return;
    if (href === currentPage && pushState !== false) return;
    navigating = true;

    fetch(href)
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var newMain = doc.querySelector('main');
        var oldMain = document.querySelector('main');

        if (!newMain || !oldMain) {
          location.href = href;
          return;
        }

        var swap = function () {
          /* Swap main content */
          oldMain.innerHTML = newMain.innerHTML;

          /* Update document title */
          document.title = doc.title;

          /* Update current page tracker */
          currentPage = href;

          /* Update active nav link */
          document.querySelectorAll('.nav-link').forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === currentPage);
          });

          /* Push browser history */
          if (pushState !== false) {
            history.pushState({ page: href }, '', href);
          }

          /* Scroll main to top */
          window.scrollTo(0, 0);

          /* Re-initialize all page-ready handlers */
          /* (doc tabs, hljs, copy buttons, lucide, etc.) */
          (window.__spaInits || []).forEach(function (fn) { fn(); });

          /* Component ES modules auto-reinitialize via MutationObserver */
          /* when the DOM changes — no script re-import needed.         */

          navigating = false;
        };

        /* Use View Transitions API if available */
        if (document.startViewTransition) {
          document.startViewTransition(swap);
        } else {
          swap();
        }
      })
      .catch(function () {
        location.href = href;
        navigating = false;
      });
  }

  /* Intercept nav clicks (sidebar links, header logo, prev/next) */
  document.addEventListener('click', function (e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.defaultPrevented) return;
    var link = e.target.closest('a.nav-link:not(.disabled), .site-header a[href="index.html"], a.page-nav-link');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
    e.preventDefault();
    navigateTo(href, true);
  });

  /* Handle browser back/forward */
  window.addEventListener('popstate', function () {
    var page = location.pathname.split('/').pop() || 'index.html';
    navigateTo(page, false);
  });

  /* -- Page extras: footer, TOC, prev/next, edit link, stars -- */

  /* Flat ordered list of all navigable pages */
  var allPages = [];
  NAV.forEach(function (section) {
    section.items.forEach(function (item) {
      if (BUILT.has(item.href)) allPages.push(item);
    });
  });

  var tocObserver = null;

  function getHeadingText(el) {
    var clone = el.cloneNode(true);
    clone.querySelectorAll('a, span.badge, svg').forEach(function (c) { c.remove(); });
    return clone.textContent.trim();
  }

  function buildToc() {
    var tocContent = document.querySelector('.site-toc-content');
    if (!tocContent) return;
    var main = document.querySelector('main');
    if (!main) return;
    if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }

    /* Collect heading-like elements in document order */
    var candidates = main.querySelectorAll('h2, p.text-sm.font-medium');
    var headings = [];
    candidates.forEach(function (el) {
      /* Skip headings inside collapsed details/page-header */
      if (el.closest('.page-header details')) return;
      var text = getHeadingText(el);
      if (text) headings.push({ el: el, text: text });
    });

    if (headings.length < 2) {
      tocContent.innerHTML = '';
      tocContent.parentElement.style.display = 'none';
      return;
    }

    tocContent.parentElement.style.display = '';
    var html = '<p class="toc-title">On This Page</p>';
    headings.forEach(function (item) {
      var id = item.el.id || 'toc-' + item.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (!item.el.id) item.el.id = id;
      html += '<a class="toc-link" href="#' + id + '">' + item.text + '</a>';
    });
    tocContent.innerHTML = html;

    /* Active tracking via IntersectionObserver */
    var tocLinks = tocContent.querySelectorAll('.toc-link');
    tocObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function (l) { l.classList.remove('active'); });
          var active = tocContent.querySelector('.toc-link[href="#' + entry.target.id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });
    headings.forEach(function (item) { tocObserver.observe(item.el); });
  }

  function buildPrevNext() {
    var existing = document.querySelector('.page-nav');
    if (existing) existing.remove();
    var idx = -1;
    for (var i = 0; i < allPages.length; i++) {
      if (allPages[i].href === currentPage) { idx = i; break; }
    }
    if (idx === -1) return;
    var prev = idx > 0 ? allPages[idx - 1] : null;
    var next = idx < allPages.length - 1 ? allPages[idx + 1] : null;
    if (!prev && !next) return;
    var html = '<nav class="page-nav">';
    if (prev) {
      html += '<a class="page-nav-link page-nav-prev" href="' + prev.href + '">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>' +
        '<div><span class="page-nav-label">Previous</span>' +
        '<span class="page-nav-title">' + prev.label + '</span></div></a>';
    } else {
      html += '<div></div>';
    }
    if (next) {
      html += '<a class="page-nav-link page-nav-next" href="' + next.href + '">' +
        '<div><span class="page-nav-label">Next</span>' +
        '<span class="page-nav-title">' + next.label + '</span></div>' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>';
    }
    html += '</nav>';
    var main = document.querySelector('main');
    if (main) main.insertAdjacentHTML('beforeend', html);
  }



  function updateStarCount(count) {
    var el = document.querySelector('.github-stars');
    if (el) el.textContent = count;
  }

  /* One-time setup on DOMContentLoaded */
  document.addEventListener('DOMContentLoaded', function () {
    /* Inject TOC sidebar */
    var layoutWrap = document.querySelector('main') && document.querySelector('main').parentElement;
    if (layoutWrap) {
      layoutWrap.insertAdjacentHTML('beforeend',
        '<aside class="site-toc"><div class="site-toc-content"></div></aside>'
      );
    }

    /* Inject footer */
    if (layoutWrap) {
      layoutWrap.insertAdjacentHTML('afterend',
        '<footer class="site-footer">' +
          '<p class="site-footer-tagline">v0.7.0 — Written in two days, entirely by an AI, directed entirely by a human. The future is weird!</p>' +
          '<p class="site-footer-tagline" style="margin-top:0;">My AIs are open to your AIs\' <a href="https://github.com/codylindley/shadcn-html/pulls" target="_blank" rel="noopener">PRs</a> — but that doesn\'t mean this dumb human will accept them.</p>' +
          '<p>' +
            'MIT Licensed' +
            '<span class="site-footer-dot"> · </span>' +
            '<a href="https://github.com/codylindley/shadcn-html" target="_blank" rel="noopener">Source on GitHub</a>' +
          '</p>' +
        '</footer>'
      );
    }

    /* Fetch GitHub star count (cached in sessionStorage) */
    var cached = sessionStorage.getItem('gh-stars');
    if (cached) {
      updateStarCount(cached);
    } else {
      fetch('https://api.github.com/repos/codylindley/shadcn-html')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.stargazers_count != null) {
            var count = String(data.stargazers_count);
            sessionStorage.setItem('gh-stars', count);
            updateStarCount(count);
          }
        })
        .catch(function () { /* silent fail — star count is non-essential */ });
    }
  });

  /* Per-page init (runs on DOMContentLoaded + after each SPA navigation) */
  window.onPageReady(function () {
    buildToc();
    buildPrevNext();
  });
})();
