# Pattern: Dropdown Menu

## Native basis
`popover` API + `<button>` trigger. The browser provides light-dismiss
(click outside to close) and top-layer rendering.
Requires JavaScript for keyboard navigation and ARIA management.

---

## Structure

```html
<!-- Trigger -->
<button class="btn" data-variant="outline"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="my-menu"
        data-dropdown-trigger="my-menu">
  Options
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2">
    <path d="m6 9 6 6 6-6"/>
  </svg>
</button>

<!-- Menu -->
<div id="my-menu" role="menu" popover
     class="dropdown-content"
     aria-label="Options menu">

  <div role="group" aria-label="Navigation">
    <button role="menuitem" class="dropdown-item" tabindex="-1">
      Profile
    </button>
    <button role="menuitem" class="dropdown-item" tabindex="-1">
      Settings
    </button>
  </div>

  <div class="dropdown-separator" role="separator"></div>

  <div role="group" aria-label="Actions">
    <button role="menuitem" class="dropdown-item" tabindex="-1">
      <svg aria-hidden="true" width="16" height="16">...</svg>
      Export
      <span class="dropdown-shortcut">⌘E</span>
    </button>
    <button role="menuitem" class="dropdown-item" data-variant="destructive" tabindex="-1">
      Delete
    </button>
  </div>
</div>
```

---

## CSS classes

| Class                | Token usage                                         | Notes                          |
|----------------------|-----------------------------------------------------|--------------------------------|
| `.dropdown-content`  | `--popover` bg, `--popover-foreground` text, shadow | `border-radius: var(--radius-lg)`, `border: 1px solid var(--border)` |
| `.dropdown-item`     | transparent bg, `--foreground` text                 | hover: `--accent` bg, `--accent-foreground` text |
| `.dropdown-item[data-variant="destructive"]` | — | hover: `--destructive` bg, `--destructive-foreground` text |
| `.dropdown-separator`| `--border` bg                                       | `height: 1px`, `margin: 0.25rem 0` |
| `.dropdown-label`    | `--muted-foreground` text                           | `font-size: 0.75rem`, `font-weight: 600`, `padding: 0.375rem 0.5rem` |
| `.dropdown-shortcut` | `--muted-foreground` text                           | `font-size: 0.75rem`, `margin-left: auto` |

---

## Token usage (CSS)

```css
.dropdown-content {
  background-color: var(--popover);
  color: var(--popover-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 0.25rem;
  min-width: 8rem;
  box-shadow: 0 4px 16px oklch(0 0 0 / 0.12), 0 0 0 1px var(--border);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.375rem 0.5rem;
  border-radius: calc(var(--radius) * 0.6);
  font-size: 0.875rem;
  border: none;
  background: transparent;
  color: var(--foreground);
  cursor: pointer;
  outline: none;
  text-align: left;
}

.dropdown-item:hover,
.dropdown-item[data-highlighted] {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.dropdown-item[data-variant="destructive"]:hover,
.dropdown-item[data-variant="destructive"][data-highlighted] {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

.dropdown-item:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.dropdown-separator {
  height: 1px;
  background: var(--border);
  margin: 0.25rem -0.25rem;
}

.dropdown-label {
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted-foreground);
}

.dropdown-shortcut {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--muted-foreground);
  letter-spacing: 0.05em;
}
```

---

## JavaScript

```js
// Wire all dropdown triggers
document.querySelectorAll('[data-dropdown-trigger]').forEach(trigger => {
  const menu = document.getElementById(trigger.dataset.dropdownTrigger);
  if (!menu) return;

  // Position menu below trigger
  function positionMenu() {
    const rect = trigger.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.top = rect.bottom + 4 + 'px';
    menu.style.left = rect.left + 'px';
    menu.style.margin = '0';
  }

  trigger.addEventListener('click', () => {
    positionMenu();
    menu.togglePopover();
  });

  // Update ARIA on toggle
  menu.addEventListener('toggle', e => {
    const open = e.newState === 'open';
    trigger.setAttribute('aria-expanded', open);
    if (open) {
      // Focus first item
      const first = menu.querySelector('[role="menuitem"]:not(:disabled)');
      if (first) first.focus();
    } else {
      trigger.focus();
    }
  });

  // Keyboard navigation (roving tabindex)
  menu.addEventListener('keydown', e => {
    const items = [...menu.querySelectorAll('[role="menuitem"]:not(:disabled)')];
    const current = items.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        items[(current + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        items[(current - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Escape':
        menu.hidePopover();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        document.activeElement?.click();
        menu.hidePopover();
        break;
    }
  });

  // Typeahead: focus item starting with typed character
  menu.addEventListener('keydown', e => {
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const items = [...menu.querySelectorAll('[role="menuitem"]:not(:disabled)')];
      const match = items.find(item =>
        item.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase())
      );
      if (match) match.focus();
    }
  });
});
```

---

## ARIA

| Attribute                  | Where            | Value                         |
|----------------------------|------------------|-------------------------------|
| `role="menu"`              | menu container   | Always                        |
| `role="menuitem"`          | each item        | Always                        |
| `role="separator"`         | dividers         | Always                        |
| `role="group"`             | item groups      | Optional, with `aria-label`   |
| `aria-haspopup="menu"`    | trigger button   | Always                        |
| `aria-expanded`            | trigger button   | `true` when open, `false` when closed |
| `aria-controls`            | trigger button   | ID of menu element            |
| `aria-label`               | menu container   | Description of menu purpose   |
| `tabindex="-1"`            | each menuitem    | Items not in tab order — use arrow keys |
| `data-highlighted`         | focused item     | Set by JS for styling          |

---

## Animations

```css
.dropdown-content {
  opacity: 0;
  transform: scale(0.96) translateY(-0.25rem);
  transition: opacity 150ms ease, transform 150ms ease,
              display 150ms allow-discrete;
}

.dropdown-content:popover-open {
  opacity: 1;
  transform: scale(1) translateY(0);
}

@starting-style {
  .dropdown-content:popover-open {
    opacity: 0;
    transform: scale(0.96) translateY(-0.25rem);
  }
}
```

---

## Checkbox and radio items

For checkbox/radio items in the menu, use `aria-checked`:

```html
<!-- Checkbox item -->
<button role="menuitemcheckbox" class="dropdown-item"
        aria-checked="true" tabindex="-1">
  <svg class="dropdown-check" aria-hidden="true" width="16" height="16">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
  Show Sidebar
</button>

<!-- Radio group -->
<div role="group" aria-label="Sort order">
  <div class="dropdown-label">Sort by</div>
  <button role="menuitemradio" class="dropdown-item"
          aria-checked="true" tabindex="-1">
    <svg class="dropdown-check" aria-hidden="true">...</svg>
    Date
  </button>
  <button role="menuitemradio" class="dropdown-item"
          aria-checked="false" tabindex="-1">
    Name
  </button>
</div>
```

---

## Notes

- Always use `popover` attribute for the menu — it renders in the top layer and avoids overflow clipping
- Position the menu with JS relative to the trigger — the popover API does not auto-position
- The `popover` API handles light-dismiss (click outside) automatically
- For submenus, nest another `[popover]` element triggered by a `menuitem` with `aria-haspopup="menu"`
- Escape closes the menu and returns focus to the trigger
- Menu items use `tabindex="-1"` — only arrow keys move focus (roving focus pattern)
