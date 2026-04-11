// ── site.js ─────────────────────────────────────────────────
// Doc-site-only script for the shadcn-html documentation site.
// Component behavior lives in js/components/*.js (importable individually).
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

  // ── Highlight.js theme sync ─────────────────────────────
  function syncHljsTheme() {
    var isDark = document.documentElement.classList.contains('dark');
    var light = document.getElementById('hljs-light');
    var dark = document.getElementById('hljs-dark');
    if (light) light.disabled = isDark;
    if (dark) dark.disabled = !isDark;
  }
  syncHljsTheme(); // sync on initial load (before DOMContentLoaded)

  function toggleDark() {
    var isDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    document.getElementById('icon-sun').style.display  = isDark ? 'block' : 'none';
    document.getElementById('icon-moon').style.display = isDark ? 'none'  : 'block';
    localStorage.setItem('shadcn-html-theme', isDark ? 'light' : 'dark');
    syncHljsTheme();
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

    // ── Syntax highlighting (highlight.js) ──────────────
    if (window.hljs) hljs.highlightAll();

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

    // ── Token swatches (tokens page only) ───────────────
    var swatchContainer = document.getElementById('swatch-container');
    if (swatchContainer) {
      var pairs = [['background','foreground'],['primary','primary-foreground'],['secondary','secondary-foreground'],['muted','muted-foreground'],['accent','accent-foreground'],['card','card-foreground'],['popover','popover-foreground'],['destructive','destructive-foreground']];
      pairs.forEach(function (p) {
        var surface = p[0], fg = p[1];
        var row = document.createElement('div'); row.className = 'swatch-row';
        row.innerHTML = '<div style="display:flex;gap:0.375rem;flex-shrink:0;"><div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + surface + ');border:1px solid var(--border);"></div><div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + fg + ');border:1px solid var(--border);"></div></div><div><p style="margin:0;font-size:0.8125rem;font-family:var(--font-mono);">--' + surface + '</p><p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);font-family:var(--font-mono);">--' + fg + '</p></div><span style="margin-left:auto;font-size:0.75rem;color:var(--muted-foreground);font-family:var(--font-mono);">var(--' + surface + ') var(--' + fg + ')</span>';
        swatchContainer.appendChild(row);
      });
    }
    var sidebarSwatchContainer = document.getElementById('sidebar-swatch-container');
    if (sidebarSwatchContainer) {
      [['sidebar','sidebar-foreground'],['sidebar-primary','sidebar-primary-foreground'],['sidebar-accent','sidebar-accent-foreground']].forEach(function (p) {
        var surface = p[0], fg = p[1];
        var row = document.createElement('div'); row.className = 'swatch-row';
        row.innerHTML = '<div style="display:flex;gap:0.375rem;flex-shrink:0;"><div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + surface + ');border:1px solid var(--border);"></div><div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + fg + ');border:1px solid var(--border);"></div></div><div><p style="margin:0;font-size:0.8125rem;font-family:var(--font-mono);">--' + surface + '</p><p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);font-family:var(--font-mono);">--' + fg + '</p></div><span style="margin-left:auto;font-size:0.75rem;color:var(--muted-foreground);font-family:var(--font-mono);">var(--' + surface + ') var(--' + fg + ')</span>';
        sidebarSwatchContainer.appendChild(row);
      });
      [['sidebar-border','border-sidebar-border'],['sidebar-ring','ring-sidebar-ring']].forEach(function (p) {
        var token = p[0], utility = p[1];
        var row = document.createElement('div'); row.className = 'swatch-row';
        row.innerHTML = '<div style="width:1.875rem;height:1.875rem;border-radius:var(--radius-sm);background:var(--' + token + ');border:1px solid var(--border);flex-shrink:0;"></div><code>--' + token + '</code><span class="text-sm text-muted-foreground ml-auto">var(--' + token + ')</span>';
        sidebarSwatchContainer.appendChild(row);
      });
    }
  });
})();
