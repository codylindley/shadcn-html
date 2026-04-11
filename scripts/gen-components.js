const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, '..', 'dist/components');

const comps = [
  // OVERLAYS
  {
    name: 'popover',
    md: `# Popover\n\n## Native basis\n\nPopover API with CSS for positioning.\n\n## Native Web APIs\n\n- [\`popover\` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) — native popover API\n- [\`@starting-style\`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation\n\n## Structure\n\n\`\`\`html\n<button class="btn" data-variant="outline" popovertarget="my-popover">Open Popover</button>\n\n<div class="popover" id="my-popover" popover>\n  <div class="popover-header">\n    <p class="popover-title">Dimensions</p>\n    <p class="popover-description">Set the dimensions for the layer.</p>\n  </div>\n  <div class="popover-content"><!-- content --></div>\n</div>\n\`\`\`\n`,
    css: `@layer components {
  .popover {
    margin: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background-color: var(--popover);
    color: var(--popover-foreground);
    padding: 1rem;
    box-shadow: var(--shadow-md);
    width: 20rem;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 150ms ease, transform 150ms ease, display 150ms allow-discrete;

    &:popover-open {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @starting-style {
    .popover:popover-open {
      opacity: 0;
      transform: translateY(-4px);
    }
  }

  .popover-header { margin-bottom: 0.75rem; }
  .popover-title { margin: 0; font-size: 0.875rem; font-weight: 500; color: var(--foreground); }
  .popover-description { margin: 0.25rem 0 0; font-size: 0.8125rem; color: var(--muted-foreground); }
  .popover-content { font-size: 0.875rem; }
}
`,
    js: `(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[popovertarget]').forEach(function (trigger) {
      var id = trigger.getAttribute('popovertarget');
      var popover = document.getElementById(id);
      if (!popover || !popover.classList.contains('popover')) return;
      function position() {
        var rect = trigger.getBoundingClientRect();
        popover.style.position = 'fixed';
        popover.style.top = (rect.bottom + 4) + 'px';
        popover.style.left = rect.left + 'px';
      }
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        position();
        popover.togglePopover();
      });
    });
  });
})();
`
  },
  {
    name: 'tooltip',
    md: `# Tooltip\n\n## Native basis\n\nPopover API for hover/focus hints.\n\n## Native Web APIs\n\n- [\`popover\` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) — native popover\n- [\`@starting-style\`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation\n\n## Structure\n\n\`\`\`html\n<button class="btn" data-tooltip-trigger="my-tip">Hover me</button>\n<div class="tooltip" id="my-tip" popover="hint" role="tooltip">Tooltip text</div>\n\`\`\`\n`,
    css: `@layer components {
  .tooltip {
    margin: 0;
    border: none;
    border-radius: var(--radius-md);
    background-color: var(--primary);
    color: var(--primary-foreground);
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    line-height: 1.4;
    box-shadow: var(--shadow-sm);
    pointer-events: none;
    max-width: 16rem;
    opacity: 0;
    transform: translateY(-2px);
    transition: opacity 100ms ease, transform 100ms ease, display 100ms allow-discrete;

    &:popover-open { opacity: 1; transform: translateY(0); }
  }

  @starting-style {
    .tooltip:popover-open { opacity: 0; transform: translateY(-2px); }
  }
}
`,
    js: `(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-tooltip-trigger]').forEach(function (trigger) {
      var tip = document.getElementById(trigger.dataset.tooltipTrigger);
      if (!tip) return;
      function show() {
        var rect = trigger.getBoundingClientRect();
        tip.style.position = 'fixed';
        tip.style.top = (rect.top - tip.offsetHeight - 6) + 'px';
        tip.style.left = (rect.left + rect.width / 2 - tip.offsetWidth / 2) + 'px';
        tip.showPopover();
      }
      function hide() { try { tip.hidePopover(); } catch(e) {} }
      trigger.addEventListener('mouseenter', show);
      trigger.addEventListener('mouseleave', hide);
      trigger.addEventListener('focus', show);
      trigger.addEventListener('blur', hide);
    });
  });
})();
`
  },
  {
    name: 'context-menu',
    md: `# Context Menu\n\n## Native basis\n\nPopover API triggered by right-click.\n\n## Native Web APIs\n\n- [\`popover\` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) — native popover\n- [\`contextmenu\` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event) — right-click trigger\n\n## Structure\n\n\`\`\`html\n<div class="context-menu-trigger" data-context-menu="my-ctx">Right click here</div>\n<div class="context-menu" id="my-ctx" popover>\n  <button class="context-menu-item" role="menuitem">Cut</button>\n  <button class="context-menu-item" role="menuitem">Copy</button>\n  <button class="context-menu-item" role="menuitem">Paste</button>\n</div>\n\`\`\`\n`,
    css: `@layer components {
  .context-menu-trigger {
    display: flex; align-items: center; justify-content: center;
    border: 2px dashed var(--border); border-radius: var(--radius-lg);
    padding: 3rem; font-size: 0.875rem; color: var(--muted-foreground); cursor: default;
  }

  .context-menu {
    margin: 0; border: 1px solid var(--border); border-radius: var(--radius-lg);
    background-color: var(--popover); color: var(--popover-foreground);
    padding: 0.25rem; box-shadow: var(--shadow-md); min-width: 10rem;
    opacity: 0; transform: scale(0.95);
    transition: opacity 100ms ease, transform 100ms ease, display 100ms allow-discrete;

    &:popover-open { opacity: 1; transform: scale(1); }
  }

  @starting-style {
    .context-menu:popover-open { opacity: 0; transform: scale(0.95); }
  }

  .context-menu-item {
    display: flex; align-items: center; gap: 0.5rem; width: 100%;
    padding: 0.375rem 0.5rem; border: none; border-radius: var(--radius-md);
    background: transparent; color: var(--popover-foreground);
    font-size: 0.8125rem; font-family: inherit; text-align: left; cursor: pointer;
    transition: background-color 100ms ease;

    &:hover, &[data-highlighted] { background-color: var(--accent); color: var(--accent-foreground); }
    &:focus-visible { outline: 2px solid var(--ring); outline-offset: -2px; }
  }

  .context-menu-separator { height: 1px; background-color: var(--border); margin: 0.25rem -0.25rem; }
}
`,
    js: `(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-context-menu]').forEach(function (trigger) {
      var menu = document.getElementById(trigger.dataset.contextMenu);
      if (!menu) return;
      trigger.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        menu.style.position = 'fixed';
        menu.style.top = e.clientY + 'px';
        menu.style.left = e.clientX + 'px';
        menu.showPopover();
      });
      menu.addEventListener('click', function (e) {
        if (e.target.closest('.context-menu-item')) menu.hidePopover();
      });
    });
  });
})();
`
  },
  {
    name: 'command',
    md: `# Command\n\n## Native basis\n\n\`<dialog>\` + search input for a command palette.\n\n## Native Web APIs\n\n- [\`<dialog>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — modal with focus trap\n- [\`@starting-style\`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation\n\n## Structure\n\n\`\`\`html\n<button class="btn" data-command-trigger="cmd">Open Command</button>\n<dialog id="cmd" class="command" role="dialog" aria-modal="true">\n  <div class="command-content">\n    <div class="command-input-wrapper">\n      <svg><!-- search --></svg>\n      <input class="command-input" type="text" placeholder="Type a command...">\n    </div>\n    <div class="command-list">\n      <div class="command-group">\n        <p class="command-group-heading">Suggestions</p>\n        <button class="command-item">Calendar</button>\n      </div>\n    </div>\n    <div class="command-empty" hidden>No results found.</div>\n  </div>\n</dialog>\n\`\`\`\n`,
    css: `@layer components {
  dialog.command {
    border: none; border-radius: var(--radius-xl);
    background: var(--popover); color: var(--popover-foreground);
    padding: 0; max-width: 32rem; width: calc(100% - 2rem);
    box-shadow: var(--shadow-lg); margin: auto; position: fixed; inset: 0;
    top: 15%; bottom: auto; overflow: hidden;
    opacity: 0; transform: scale(0.98);
    transition: opacity 150ms ease, transform 150ms ease, display 150ms allow-discrete;

    &[open] { opacity: 1; transform: scale(1); }
    &::backdrop { background: oklch(0 0 0 / 0); transition: all 150ms ease, display 150ms allow-discrete; }
    &[open]::backdrop { background: oklch(0 0 0 / 0.45); }
  }

  @starting-style {
    dialog.command[open] { opacity: 0; transform: scale(0.98); }
    dialog.command[open]::backdrop { background: oklch(0 0 0 / 0); }
  }

  .command-input-wrapper {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 1rem; border-bottom: 1px solid var(--border);
    & svg { width: 1rem; height: 1rem; color: var(--muted-foreground); flex-shrink: 0; }
  }

  .command-input {
    flex: 1; border: none; background: transparent;
    font-size: 0.875rem; color: var(--foreground); outline: none; font-family: inherit;
    &::placeholder { color: var(--muted-foreground); }
  }

  .command-list { max-height: 18rem; overflow-y: auto; padding: 0.25rem; }
  .command-group { padding: 0.25rem 0; }
  .command-group-heading { margin: 0; padding: 0.375rem 0.5rem; font-size: 0.75rem; font-weight: 500; color: var(--muted-foreground); }

  .command-item {
    display: flex; align-items: center; gap: 0.5rem; width: 100%;
    padding: 0.5rem 0.5rem; border: none; border-radius: var(--radius-md);
    background: transparent; color: var(--foreground); font-size: 0.8125rem;
    font-family: inherit; text-align: left; cursor: pointer;
    &:hover, &[data-highlighted] { background-color: var(--accent); }
    & svg { width: 1rem; height: 1rem; color: var(--muted-foreground); flex-shrink: 0; }
  }

  .command-separator { height: 1px; background-color: var(--border); margin: 0.25rem -0.25rem; }
  .command-shortcut { margin-left: auto; font-size: 0.6875rem; color: var(--muted-foreground); font-family: var(--font-mono); }
  .command-empty { padding: 1.5rem; text-align: center; font-size: 0.875rem; color: var(--muted-foreground); }
}
`,
    js: `(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('dialog.command').forEach(function (dialog) {
      var input = dialog.querySelector('.command-input');
      var list = dialog.querySelector('.command-list');
      var empty = dialog.querySelector('.command-empty');
      if (!input || !list) return;
      var items = Array.from(list.querySelectorAll('.command-item'));

      function filter(q) {
        var query = q.toLowerCase(); var hasVisible = false;
        items.forEach(function (item) {
          var match = !query || item.textContent.toLowerCase().includes(query);
          item.hidden = !match; if (match) hasVisible = true;
        });
        list.querySelectorAll('.command-group').forEach(function (g) {
          g.hidden = g.querySelectorAll('.command-item:not([hidden])').length === 0;
        });
        if (empty) empty.hidden = hasVisible;
      }

      input.addEventListener('input', function () { filter(input.value); });
      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) dialog.close();
        if (e.target.closest('.command-item')) dialog.close();
      });
      dialog.addEventListener('close', function () { input.value = ''; filter(''); });

      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          if (dialog.open) dialog.close();
          else { dialog.showModal(); input.focus(); }
        }
      });
    });

    document.querySelectorAll('[data-command-trigger]').forEach(function (trigger) {
      var dialog = document.getElementById(trigger.dataset.commandTrigger);
      if (!dialog) return;
      trigger.addEventListener('click', function () {
        dialog.showModal();
        var input = dialog.querySelector('.command-input');
        if (input) input.focus();
      });
    });
  });
})();
`
  },
  // NAVIGATION
  { name: 'breadcrumb', md: `# Breadcrumb\n\n## Native basis\n\n\`<nav>\` + \`<ol>\` for hierarchical path display.\n\n## Native Web APIs\n\n- [\`<nav>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark\n- [\`<ol>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) — ordered list\n\n## Structure\n\n\`\`\`html\n<nav class="breadcrumb" aria-label="Breadcrumb">\n  <ol class="breadcrumb-list">\n    <li class="breadcrumb-item"><a class="breadcrumb-link" href="#">Home</a></li>\n    <li class="breadcrumb-separator" aria-hidden="true">/</li>\n    <li class="breadcrumb-item"><span class="breadcrumb-page" aria-current="page">Current</span></li>\n  </ol>\n</nav>\n\`\`\`\n`,
    css: `@layer components {
  .breadcrumb-list { display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem; list-style: none; margin: 0; padding: 0; font-size: 0.875rem; }
  .breadcrumb-item { display: inline-flex; align-items: center; gap: 0.375rem; }
  .breadcrumb-link { color: var(--muted-foreground); text-decoration: none; transition: color 150ms ease; &:hover { color: var(--foreground); } }
  .breadcrumb-separator { color: var(--muted-foreground); font-size: 0.75rem; & svg { width: 0.875rem; height: 0.875rem; } }
  .breadcrumb-page { color: var(--foreground); font-weight: 400; }
  .breadcrumb-ellipsis { display: flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; color: var(--muted-foreground); }
}
` },
  { name: 'pagination', md: `# Pagination\n\n## Native basis\n\n\`<nav>\` + links for page navigation.\n\n## Native Web APIs\n\n- [\`<nav>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark\n\n## Structure\n\n\`\`\`html\n<nav class="pagination" aria-label="Pagination">\n  <ul class="pagination-list">\n    <li><a class="pagination-prev" href="#">Previous</a></li>\n    <li><a class="pagination-link" href="#">1</a></li>\n    <li><a class="pagination-link pagination-active" href="#" aria-current="page">2</a></li>\n    <li><a class="pagination-next" href="#">Next</a></li>\n  </ul>\n</nav>\n\`\`\`\n`,
    css: `@layer components {
  .pagination { display: flex; justify-content: center; }
  .pagination-list { display: flex; align-items: center; gap: 0.25rem; list-style: none; margin: 0; padding: 0; }
  .pagination-link, .pagination-prev, .pagination-next {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 2.25rem; height: 2.25rem; padding: 0 0.5rem;
    border: 1px solid transparent; border-radius: var(--radius-md);
    font-size: 0.875rem; color: var(--foreground); text-decoration: none;
    transition: background-color 150ms ease, border-color 150ms ease; gap: 0.25rem;
    &:hover { background-color: var(--accent); }
    & svg { width: 1rem; height: 1rem; }
  }
  .pagination-prev, .pagination-next { padding: 0 0.75rem; gap: 0.375rem; }
  .pagination-active { border-color: var(--border); background-color: var(--background); font-weight: 500; }
  .pagination-ellipsis { display: inline-flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; color: var(--muted-foreground); }
}
` },
  { name: 'steps', md: `# Steps\n\n## Native basis\n\n\`<ol>\` with step indicators for multi-step processes.\n\n## Native Web APIs\n\n- [\`<ol>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) — ordered list\n\n## Structure\n\n\`\`\`html\n<ol class="steps">\n  <li class="step" data-status="complete"><div class="step-indicator">1</div><div class="step-content"><p class="step-title">Account</p></div></li>\n  <li class="step" data-status="current"><div class="step-indicator">2</div><div class="step-content"><p class="step-title">Profile</p></div></li>\n  <li class="step"><div class="step-indicator">3</div><div class="step-content"><p class="step-title">Complete</p></div></li>\n</ol>\n\`\`\`\n`,
    css: `@layer components {
  .steps { display: flex; gap: 0.5rem; list-style: none; margin: 0; padding: 0; }
  .step {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; position: relative; text-align: center;
    &:not(:last-child)::after { content: ''; position: absolute; top: 1rem; left: calc(50% + 1.25rem); right: calc(-50% + 1.25rem); height: 2px; background-color: var(--border); }
    &[data-status='complete']::after { background-color: var(--primary); }
  }
  .step-indicator {
    display: flex; align-items: center; justify-content: center; width: 2rem; height: 2rem;
    border-radius: 9999px; font-size: 0.75rem; font-weight: 500;
    border: 2px solid var(--border); color: var(--muted-foreground); background-color: var(--background); position: relative; z-index: 1;
    .step[data-status='current'] & { border-color: var(--primary); color: var(--primary); }
    .step[data-status='complete'] & { border-color: var(--primary); background-color: var(--primary); color: var(--primary-foreground); }
  }
  .step-content { display: flex; flex-direction: column; gap: 0.125rem; }
  .step-title { margin: 0; font-size: 0.8125rem; font-weight: 500; color: var(--foreground); }
  .step-description { margin: 0; font-size: 0.75rem; color: var(--muted-foreground); }
}
` },
  { name: 'navigation-menu', md: `# Navigation Menu\n\n## Native basis\n\n\`<nav>\` + \`<ul>\` for site-level navigation with dropdown panels.\n\n## Native Web APIs\n\n- [\`<nav>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark\n- [\`popover\` API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — dropdown panels\n\n## Structure\n\n\`\`\`html\n<nav class="nav-menu" aria-label="Main">\n  <ul class="nav-menu-list">\n    <li class="nav-menu-item"><a class="nav-menu-link" href="#">Home</a></li>\n    <li class="nav-menu-item">\n      <button class="nav-menu-trigger" popovertarget="nav-dd">Products</button>\n      <div class="nav-menu-content" id="nav-dd" popover>...</div>\n    </li>\n  </ul>\n</nav>\n\`\`\`\n`,
    css: `@layer components {
  .nav-menu-list { display: flex; align-items: center; gap: 0.25rem; list-style: none; margin: 0; padding: 0; }
  .nav-menu-link, .nav-menu-trigger {
    display: inline-flex; align-items: center; gap: 0.25rem;
    padding: 0.5rem 0.75rem; border: none; border-radius: var(--radius-md);
    background: transparent; color: var(--foreground); font-size: 0.875rem; font-weight: 500;
    font-family: inherit; text-decoration: none; cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
    &:hover { background-color: var(--accent); color: var(--accent-foreground); }
    & svg { width: 0.875rem; height: 0.875rem; color: var(--muted-foreground); transition: transform 200ms ease; }
  }
  .nav-menu-content {
    margin: 0; border: 1px solid var(--border); border-radius: var(--radius-xl);
    background-color: var(--popover); color: var(--popover-foreground);
    padding: 1rem; box-shadow: var(--shadow-md); min-width: 14rem;
    opacity: 0; transform: translateY(-4px);
    transition: opacity 150ms ease, transform 150ms ease, display 150ms allow-discrete;
    &:popover-open { opacity: 1; transform: translateY(0); }
  }
  @starting-style { .nav-menu-content:popover-open { opacity: 0; transform: translateY(-4px); } }
  .nav-menu-content-link {
    display: block; padding: 0.5rem 0.75rem; border-radius: var(--radius-md);
    text-decoration: none; color: var(--foreground); font-size: 0.875rem;
    transition: background-color 150ms ease;
    &:hover { background-color: var(--accent); }
    & p { margin: 0.125rem 0 0; font-size: 0.75rem; color: var(--muted-foreground); font-weight: 400; }
  }
}
`,
    js: `(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-menu').forEach(function (nav) {
      nav.querySelectorAll('.nav-menu-trigger[popovertarget]').forEach(function (trigger) {
        var content = document.getElementById(trigger.getAttribute('popovertarget'));
        if (!content) return;
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          var rect = trigger.getBoundingClientRect();
          content.style.position = 'fixed';
          content.style.top = (rect.bottom + 4) + 'px';
          content.style.left = rect.left + 'px';
          content.togglePopover();
        });
      });
    });
  });
})();
` },
  // LAYOUT
  { name: 'aspect-ratio', md: `# Aspect Ratio\n\n## Native basis\n\nCSS \`aspect-ratio\` property.\n\n## Native Web APIs\n\n- [\`aspect-ratio\`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) — intrinsic aspect ratio\n\n## Structure\n\n\`\`\`html\n<div class="aspect-ratio" data-ratio="16/9">\n  <img src="..." alt="..." />\n</div>\n\`\`\`\n`,
    css: `@layer components {
  .aspect-ratio {
    position: relative; overflow: hidden; border-radius: var(--radius-lg);
    &[data-ratio='1/1'] { aspect-ratio: 1 / 1; }
    &[data-ratio='4/3'] { aspect-ratio: 4 / 3; }
    &[data-ratio='16/9'] { aspect-ratio: 16 / 9; }
    &[data-ratio='21/9'] { aspect-ratio: 21 / 9; }
    &[data-ratio='3/4'] { aspect-ratio: 3 / 4; }
    & > img, & > video, & > iframe { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  }
}
` },
  { name: 'container', md: `# Container\n\n## Native basis\n\n\`<div>\` with \`max-width\`.\n\n## Native Web APIs\n\n- [\`max-width\`](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) — constrains content width\n\n## Structure\n\n\`\`\`html\n<div class="container"><!-- page content --></div>\n\`\`\`\n`,
    css: `@layer components {
  .container {
    width: 100%; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem;
    &[data-size='sm'] { max-width: 40rem; }
    &[data-size='md'] { max-width: 48rem; }
    &[data-size='default'], &:not([data-size]) { max-width: 64rem; }
    &[data-size='lg'] { max-width: 80rem; }
    &[data-size='xl'] { max-width: 96rem; }
  }
}
` },
  { name: 'scroll-area', md: `# Scroll Area\n\n## Native basis\n\nCSS overflow with custom-styled scrollbars.\n\n## Native Web APIs\n\n- [\`overflow\`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) — scrollable container\n- [\`::-webkit-scrollbar\`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar) — custom scrollbar styling\n\n## Structure\n\n\`\`\`html\n<div class="scroll-area" style="height:12rem;"><!-- long content --></div>\n\`\`\`\n`,
    css: `@layer components {
  .scroll-area {
    overflow: auto; position: relative;
    &::-webkit-scrollbar { width: 6px; height: 6px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background-color: var(--border); border-radius: 3px; &:hover { background-color: var(--muted-foreground); } }
    scrollbar-width: thin; scrollbar-color: var(--border) transparent;
  }
}
` },
  { name: 'carousel', md: `# Carousel\n\n## Native basis\n\nCSS scroll-snap with navigation buttons.\n\n## Native Web APIs\n\n- [\`scroll-snap-type\`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) — snap scrolling\n- [\`scroll-snap-align\`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align) — snap point alignment\n\n## Structure\n\n\`\`\`html\n<div class="carousel">\n  <div class="carousel-viewport">\n    <div class="carousel-slide">Slide 1</div>\n    <div class="carousel-slide">Slide 2</div>\n  </div>\n  <button class="carousel-prev" aria-label="Previous">&lt;</button>\n  <button class="carousel-next" aria-label="Next">&gt;</button>\n</div>\n\`\`\`\n`,
    css: `@layer components {
  .carousel { position: relative; width: 100%; }
  .carousel-viewport {
    display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 1rem;
    scrollbar-width: none; &::-webkit-scrollbar { display: none; }
  }
  .carousel-slide {
    flex: 0 0 100%; scroll-snap-align: start; min-height: 12rem;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border); border-radius: var(--radius-xl);
    background-color: var(--card); font-size: 0.875rem; color: var(--foreground);
  }
  .carousel-prev, .carousel-next {
    position: absolute; top: 50%; transform: translateY(-50%);
    display: inline-flex; align-items: center; justify-content: center;
    width: 2rem; height: 2rem; border: 1px solid var(--border); border-radius: 9999px;
    background-color: var(--background); color: var(--foreground); cursor: pointer;
    box-shadow: var(--shadow-sm); transition: background-color 150ms ease; font-size: 0.875rem;
    &:hover { background-color: var(--accent); }
    & svg { width: 1rem; height: 1rem; }
  }
  .carousel-prev { left: -1rem; }
  .carousel-next { right: -1rem; }
}
`,
    js: `(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.carousel').forEach(function (carousel) {
      var viewport = carousel.querySelector('.carousel-viewport');
      var prev = carousel.querySelector('.carousel-prev');
      var next = carousel.querySelector('.carousel-next');
      if (!viewport) return;
      function scrollBy(dir) {
        var slide = viewport.querySelector('.carousel-slide');
        if (!slide) return;
        viewport.scrollBy({ left: dir * slide.offsetWidth, behavior: 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { scrollBy(-1); });
      if (next) next.addEventListener('click', function () { scrollBy(1); });
    });
  });
})();
` },
  { name: 'sidebar', md: `# Sidebar\n\n## Native basis\n\n\`<aside>\` + \`<nav>\` for application sidebar navigation.\n\n## Native Web APIs\n\n- [\`<aside>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) — complementary content\n- [\`<nav>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark\n\n## Structure\n\n\`\`\`html\n<aside class="app-sidebar">\n  <div class="sidebar-header"><span class="sidebar-logo">App</span></div>\n  <nav class="sidebar-nav">\n    <a class="sidebar-link" data-active="true" href="#">Dashboard</a>\n    <a class="sidebar-link" href="#">Settings</a>\n  </nav>\n</aside>\n\`\`\`\n`,
    css: `@layer components {
  .app-sidebar {
    display: flex; flex-direction: column; width: 16rem; height: 100%;
    background-color: var(--sidebar); border-right: 1px solid var(--sidebar-border);
    flex-shrink: 0; transition: width 200ms ease;
    &[data-state='collapsed'] { width: 3.5rem; overflow: hidden; }
  }
  .sidebar-header { display: flex; align-items: center; padding: 1rem; gap: 0.5rem; border-bottom: 1px solid var(--sidebar-border); }
  .sidebar-logo { font-size: 0.875rem; font-weight: 600; color: var(--sidebar-foreground); }
  .sidebar-nav { display: flex; flex-direction: column; padding: 0.5rem; gap: 0.125rem; flex: 1; overflow-y: auto; }
  .sidebar-link {
    display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md); font-size: 0.875rem; color: var(--sidebar-foreground);
    text-decoration: none; transition: background-color 150ms ease;
    &:hover { background-color: var(--sidebar-accent); color: var(--sidebar-accent-foreground); }
    &[data-active='true'] { background-color: var(--sidebar-accent); color: var(--sidebar-accent-foreground); font-weight: 500; }
    & svg { width: 1rem; height: 1rem; flex-shrink: 0; }
  }
  .sidebar-section-title { padding: 0.75rem 0.75rem 0.375rem; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted-foreground); }
  .sidebar-footer { padding: 1rem; border-top: 1px solid var(--sidebar-border); font-size: 0.75rem; color: var(--muted-foreground); & p { margin: 0; } }
}
` },
  { name: 'sortable', md: `# Sortable\n\n## Native basis\n\nHTML Drag and Drop API for reorderable lists.\n\n## Native Web APIs\n\n- [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) — native drag/drop\n- [\`draggable\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable) — makes elements draggable\n\n## Structure\n\n\`\`\`html\n<ul class="sortable" role="listbox">\n  <li class="sortable-item" draggable="true" role="option">\n    <span class="sortable-handle">⠿</span>\n    <span>Item 1</span>\n  </li>\n</ul>\n\`\`\`\n`,
    css: `@layer components {
  .sortable { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.25rem; }
  .sortable-item {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: var(--radius-md);
    background-color: var(--card); font-size: 0.875rem; color: var(--foreground);
    cursor: grab; transition: box-shadow 150ms ease, opacity 150ms ease; user-select: none;
    &:active { cursor: grabbing; }
    &[data-dragging] { opacity: 0.5; box-shadow: var(--shadow-md); }
    &[data-over] { border-color: var(--primary); border-style: dashed; }
  }
  .sortable-handle { color: var(--muted-foreground); cursor: grab; font-size: 1rem; line-height: 1; flex-shrink: 0; & svg { width: 1rem; height: 1rem; } }
}
`,
    js: `(function () {
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
` }
];

comps.forEach(c => {
  const dir = path.join(base, c.name);
  fs.writeFileSync(path.join(dir, c.name + '.md'), c.md);
  fs.writeFileSync(path.join(dir, c.name + '.css'), c.css);
  if (c.js) fs.writeFileSync(path.join(dir, c.name + '.js'), c.js);
  console.log('Created: ' + c.name + (c.js ? ' (md, css, js)' : ' (md, css)'));
});
