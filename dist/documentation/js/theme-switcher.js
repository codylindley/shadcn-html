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

  // If themes.js loaded after this, apply pending theme
  document.addEventListener('DOMContentLoaded', function () {
    if (window.__pendingTheme && window.THEMES) {
      applyTheme(window.__pendingTheme);
      delete window.__pendingTheme;
    }
  });
})();
