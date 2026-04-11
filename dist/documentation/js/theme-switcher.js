// -- theme-switcher.js ----------------------------------------
// Applies tweakcn color themes by overriding CSS custom properties.
// Reads from the global THEMES array (themes.js must load first).
// Loaded synchronously so persisted themes apply before first paint.

(function () {
  'use strict';

  var STORAGE_KEY = 'shadcn-html-color-theme';

  // Token keys we apply (excludes fonts, shadows, spacing, letter-spacing)
  var TOKEN_KEYS = [
    'background', 'foreground',
    'card', 'card-foreground',
    'popover', 'popover-foreground',
    'primary', 'primary-foreground',
    'secondary', 'secondary-foreground',
    'muted', 'muted-foreground',
    'accent', 'accent-foreground',
    'destructive', 'destructive-foreground',
    'border', 'input', 'ring',
    'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
    'sidebar', 'sidebar-foreground',
    'sidebar-primary', 'sidebar-primary-foreground',
    'sidebar-accent', 'sidebar-accent-foreground',
    'sidebar-border', 'sidebar-ring'
  ];

  function getThemeById(id) {
    if (!window.THEMES) return null;
    for (var i = 0; i < window.THEMES.length; i++) {
      if (window.THEMES[i].id === id) return window.THEMES[i];
    }
    return null;
  }

  function applyTheme(themeId) {
    var root = document.documentElement;

    // Reset first
    resetTheme();

    if (!themeId || themeId === 'default') {
      localStorage.removeItem(STORAGE_KEY);
      window.__activeColorTheme = 'default';
      updateActiveState();
      updateFavicon();
      return;
    }

    var theme = getThemeById(themeId);
    if (!theme || !theme.styles) return;

    // Determine current mode from DOM or localStorage
    var isDark = root.classList.contains('dark');
    if (!isDark) {
      // Fallback: check localStorage (for initial load before layout.js sets the class)
      var savedMode = localStorage.getItem('shadcn-html-theme');
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDark = savedMode === 'dark' || (!savedMode && prefersDark);
    }
    var mode = isDark ? 'dark' : 'light';
    var tokens = theme.styles[mode];

    // Apply tokens as inline styles on :root
    if (tokens) {
      TOKEN_KEYS.forEach(function (key) {
        if (tokens[key] != null) {
          root.style.setProperty('--' + key, tokens[key]);
        }
      });
      if (tokens.radius != null) {
        root.style.setProperty('--radius', tokens.radius);
      }
    }

    // Store the full theme data for mode switches
    window.__activeThemeData = theme;

    localStorage.setItem(STORAGE_KEY, themeId);
    window.__activeColorTheme = themeId;
    updateActiveState();
    updateFavicon();
  }

  function resetTheme() {
    var root = document.documentElement;

    // Remove inline property overrides from :root
    TOKEN_KEYS.forEach(function (key) {
      root.style.removeProperty('--' + key);
    });
    root.style.removeProperty('--radius');

    window.__activeThemeData = null;
  }

  function updateActiveState() {
    var swatches = document.querySelectorAll('.theme-swatch');
    var active = window.__activeColorTheme || 'default';
    for (var i = 0; i < swatches.length; i++) {
      var id = swatches[i].getAttribute('data-theme-id');
      swatches[i].classList.toggle('active', id === active);
    }
  }

  /* -- Dynamic favicon --------------------------------------- */
  /* Reads --primary / --primary-foreground from live CSS and   */
  /* generates an SVG favicon as a data URI so the tab icon     */
  /* updates when the color theme or dark mode changes.         */
  var FAVICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
    '<rect width="32" height="32" rx="6" fill="{{BG}}"/>' +
    '<path fill="{{FG}}" d="M11 8h2.8v7.1c.5-.7 1.1-1.2 1.8-1.5.7-.3 1.4-.5 2.1-.5 1.2 0 2.1.4 2.8 1.1.7.8 1 1.8 1 3.1V24h-2.8v-6.3c0-.8-.2-1.4-.6-1.8-.4-.4-.9-.6-1.6-.6-.8 0-1.4.3-1.9.8-.5.5-.8 1.2-.8 2V24H11V8z"/>' +
    '</svg>';

  function updateFavicon() {
    var style = getComputedStyle(document.documentElement);
    var bg = style.getPropertyValue('--primary').trim();
    var fg = style.getPropertyValue('--primary-foreground').trim();
    if (!bg || !fg) return;
    var svg = FAVICON_SVG.replace('{{BG}}', bg).replace('{{FG}}', fg);
    var link = document.querySelector('link[rel="icon"]');
    if (link) link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  // Apply persisted theme on load (before first paint)
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved && saved !== 'default') {
    // Defer until THEMES is available (themes.js loads before this)
    if (window.THEMES) {
      applyTheme(saved);
    } else {
      window.__pendingTheme = saved;
    }
  }
  window.__activeColorTheme = saved || 'default';

  // Expose globally for the UI
  window.applyTheme = applyTheme;
  window.resetTheme = resetTheme;
  window.updateThemeActiveState = updateActiveState;
  window.updateFavicon = updateFavicon;

  // If themes.js loaded after this, apply pending theme
  // Also set initial favicon once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    if (window.__pendingTheme && window.THEMES) {
      applyTheme(window.__pendingTheme);
      delete window.__pendingTheme;
    }
    updateFavicon();
  });
})();
