# Pattern: Tabs

## Native basis
`role="tablist"` + `role="tab"` + `role="tabpanel"`. No native HTML element
provides this pattern. Requires JavaScript for keyboard navigation and
panel switching. Follows the WAI-ARIA Tabs design pattern.

---

## Structure

```html
<div class="tabs">
  <!-- Tab list -->
  <div class="tab-list" role="tablist" aria-label="Account settings">
    <button class="tab-trigger" role="tab"
            aria-selected="true"
            aria-controls="panel-account"
            id="tab-account">
      Account
    </button>
    <button class="tab-trigger" role="tab"
            aria-selected="false"
            aria-controls="panel-password"
            id="tab-password"
            tabindex="-1">
      Password
    </button>
  </div>

  <!-- Tab panels -->
  <div class="tab-content" role="tabpanel"
       id="panel-account"
       aria-labelledby="tab-account"
       tabindex="0">
    Account settings content...
  </div>

  <div class="tab-content" role="tabpanel"
       id="panel-password"
       aria-labelledby="tab-password"
       tabindex="0"
       hidden>
    Password settings content...
  </div>
</div>
```

---

## CSS classes

| Class           | Token usage                                        | Notes                          |
|-----------------|----------------------------------------------------|--------------------------------|
| `.tabs`         | —                                                  | Wrapper, no visual styling     |
| `.tab-list`     | `--muted` bg                                       | `border-radius: var(--radius-lg)`, inline-flex, padding 0.25rem |
| `.tab-trigger`  | `--muted-foreground` text                          | Active: `--background` bg, `--foreground` text, shadow |
| `.tab-content`  | —                                                  | `margin-top: 0.75rem`, focus-visible ring |

### Line variant

| Class                        | Token usage                                   |
|------------------------------|-----------------------------------------------|
| `.tab-list[data-variant="line"]` | transparent bg, `--border` bottom border |
| `.tab-trigger` (inside line) | Active: `--primary` bottom border, `--foreground` text |

---

## Token usage (CSS)

```css
@layer components {
  /* ── Default (pill) variant ─────────────────────────────────── */
  .tab-list {
    display: inline-flex;
    align-items: center;
    background: var(--muted);
    border-radius: var(--radius-lg);
    padding: 0.25rem;
    gap: 0.125rem;

    /* ── Line variant ───────────────────────────────────────────── */
    &[data-variant="line"] {
      background: transparent;
      border-radius: 0;
      padding: 0;
      gap: 0;
      border-bottom: 1px solid var(--border);

      & .tab-trigger {
        border-radius: 0;
        padding: 0.5rem 1rem;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;

        &[aria-selected="true"] {
          background: transparent;
          color: var(--foreground);
          border-bottom-color: var(--primary);
          box-shadow: none;
        }
      }
    }

    /* ── Vertical orientation ──────────────────────────────────── */
    &[aria-orientation="vertical"] {
      flex-direction: column;
      width: auto;

      & .tab-trigger {
        justify-content: flex-start;
        width: 100%;
      }
    }
  }

  .tab-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    border-radius: calc(var(--radius) * 0.6);
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    background: transparent;
    color: var(--muted-foreground);
    cursor: pointer;
    transition: all 150ms ease;
    white-space: nowrap;
    outline: none;

    &[aria-selected="true"] {
      background: var(--background);
      color: var(--foreground);
      box-shadow: 0 1px 3px oklch(0 0 0 / 0.08), 0 0 0 1px var(--border);
    }

    &:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  /* ── Vertical layout container ───────────────────────────── */
  .tabs:has(.tab-list[aria-orientation="vertical"]) {
    display: flex;
    gap: 1rem;
    align-items: flex-start;

    & > .tab-content {
      margin-top: 0;
      flex: 1;
    }
  }

  /* ── Panel ──────────────────────────────────────────────────── */
  .tab-content {
    margin-top: 0.75rem;

    &:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }

    &[hidden] { display: none; }
  }
}
```

---

## JavaScript

```js
document.querySelectorAll('[role="tablist"]').forEach(tablist => {
  const triggers = [...tablist.querySelectorAll('[role="tab"]')];
  const orientation = tablist.getAttribute('aria-orientation') || 'horizontal';

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => activateTab(trigger));

    trigger.addEventListener('keydown', e => {
      const current = triggers.indexOf(trigger);
      let next;

      const forwardKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const backwardKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

      switch (e.key) {
        case forwardKey:
          e.preventDefault();
          // Loop through candidates to skip disabled tabs
          for (let i = 1; i <= triggers.length; i++) {
            const candidate = triggers[(current + i) % triggers.length];
            if (!candidate.disabled) { next = candidate; break; }
          }
          break;
        case backwardKey:
          e.preventDefault();
          for (let i = 1; i <= triggers.length; i++) {
            const candidate = triggers[(current - i + triggers.length) % triggers.length];
            if (!candidate.disabled) { next = candidate; break; }
          }
          break;
        case 'Home':
          e.preventDefault();
          next = triggers.find(t => !t.disabled);
          break;
        case 'End':
          e.preventDefault();
          next = [...triggers].reverse().find(t => !t.disabled);
          break;
      }

      if (next && !next.disabled) {
        activateTab(next);
        next.focus();
      }
    });
  });

  function activateTab(tab) {
    // Deactivate all
    triggers.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = true;
    });

    // Activate selected
    tab.setAttribute('aria-selected', 'true');
    tab.removeAttribute('tabindex');
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.hidden = false;
  }
});
```

---

## ARIA

| Attribute             | Where          | Value                                    |
|-----------------------|----------------|------------------------------------------|
| `role="tablist"`      | tab list       | Always                                   |
| `role="tab"`          | each trigger   | Always                                   |
| `role="tabpanel"`     | each panel     | Always                                   |
| `aria-selected`       | each tab       | `true` for active, `false` for inactive  |
| `aria-controls`       | each tab       | ID of the associated panel               |
| `aria-labelledby`     | each panel     | ID of the associated tab                 |
| `aria-label`          | tablist        | Description of the tab group             |
| `aria-orientation`    | tablist        | `horizontal` (default) or `vertical`     |
| `tabindex="0"`        | active tab     | In the tab order                         |
| `tabindex="-1"`       | inactive tabs  | Removed from tab order (arrow keys only) |
| `tabindex="0"`        | panels         | Panels are focusable for keyboard users  |

---

## Keyboard interactions

| Key         | Behavior                                              |
|-------------|-------------------------------------------------------|
| `Tab`       | Move focus to active tab, then into the active panel  |
| `ArrowRight`| Move to next tab (horizontal) and activate            |
| `ArrowLeft` | Move to previous tab (horizontal) and activate        |
| `ArrowDown` | Move to next tab (vertical) and activate              |
| `ArrowUp`   | Move to previous tab (vertical) and activate          |
| `Home`      | Move to first tab and activate                        |
| `End`       | Move to last tab and activate                         |
| `Space/Enter`| Activate focused tab (manual activation mode)        |

---

## Vertical layout

For vertical tabs, set `aria-orientation="vertical"` on the tablist. The CSS
uses `:has()` to detect the orientation and adjust layout automatically — no
inline styles needed:

```html
<div class="tabs">
  <div class="tab-list" role="tablist"
       aria-orientation="vertical"
       aria-label="Settings">
    <button class="tab-trigger" role="tab" aria-selected="true"
            aria-controls="panel-general" id="tab-general">General</button>
    <button class="tab-trigger" role="tab" aria-selected="false"
            aria-controls="panel-security" id="tab-security"
            tabindex="-1">Security</button>
  </div>

  <div class="tab-content" role="tabpanel"
       id="panel-general" aria-labelledby="tab-general" tabindex="0">
    General settings...
  </div>
  <div class="tab-content" role="tabpanel"
       id="panel-security" aria-labelledby="tab-security" tabindex="0" hidden>
    Security settings...
  </div>
</div>
```

### Vertical CSS

The vertical layout is handled automatically via `:has()` — when the tablist has
`aria-orientation="vertical"`, the `.tabs` container switches to flex row layout.
No additional CSS is needed beyond what's in the main CSS block above.

The JavaScript already handles vertical orientation — arrow keys switch to
Up/Down based on `aria-orientation`.

---

## Notes

- Only the active tab is in the tab order (`tabindex="0"`) — inactive tabs use `tabindex="-1"`
- Arrow keys cycle through tabs (wrap around) — this is the roving tabindex pattern
- The active panel uses `tabindex="0"` so it can receive focus from the tab trigger
- Use `hidden` attribute on inactive panels for accessibility (screen readers skip them)
- Disabled tabs should have `disabled` attribute and be skipped by keyboard navigation
- For lazy-loaded content, panels can be rendered empty and populated on activation
