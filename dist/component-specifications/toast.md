# Pattern: Toast

## Native basis
`popover` API for top-layer rendering and non-modal behavior.
Requires JavaScript for triggering, auto-dismiss, stacking, and ARIA live
region announcements. Follows `role="status"` with `aria-live="polite"`.

---

## Structure

```html
<!-- Toast container — place once in the page -->
<div id="toast-container"
     class="toast-container"
     aria-label="Notifications"
     data-position="bottom-right">
</div>

<!-- Individual toast (injected by JS) -->
<div class="toast" role="status" aria-live="polite" aria-atomic="true"
     popover="manual">
  <div class="toast-content">
    <div class="toast-text">
      <p class="toast-title">Event created</p>
      <p class="toast-description">Monday, January 3rd at 6:00pm</p>
    </div>
    <button class="toast-close" aria-label="Dismiss" data-toast-close>
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
  <div class="toast-actions">
    <button class="btn" data-variant="outline" data-size="sm"
            data-toast-action>Undo</button>
  </div>
</div>
```

### Variant: with icon

```html
<div class="toast" data-variant="success" role="status"
     aria-live="polite" popover="manual">
  <div class="toast-content">
    <svg class="toast-icon" aria-hidden="true" width="16" height="16">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
    <div class="toast-text">
      <p class="toast-title">Saved successfully</p>
    </div>
    <button class="toast-close" aria-label="Dismiss" data-toast-close>
      <svg aria-hidden="true" width="14" height="14">...</svg>
    </button>
  </div>
</div>
```

---

## CSS classes

| Class                | Token usage                                              | Notes                     |
|----------------------|----------------------------------------------------------|---------------------------|
| `.toast-container`   | fixed positioning                                        | Holds stacked toasts      |
| `.toast`             | `--popover` bg, `--popover-foreground` text, `--border`  | `border-radius: var(--radius-lg)`, shadow |
| `.toast[data-variant="destructive"]` | `--destructive` bg, `--destructive-foreground` text | — |
| `.toast[data-variant="success"]`     | `--border` green accent, `.toast-icon` green         | Border + icon color only |
| `.toast[data-variant="warning"]`     | `--border` amber accent, `.toast-icon` amber         | Border + icon color only |
| `.toast[data-variant="info"]`        | `--border` blue accent, `.toast-icon` blue           | Border + icon color only |
| `.toast-icon`                        | inherits variant color                               | 1.125rem, flex-shrink: 0 |
| `.toast-content`     | —                                                        | flex row, gap 0.75rem     |
| `.toast-title`       | `--foreground`, `font-weight: 500`                       | 0.875rem                  |
| `.toast-description` | `--muted-foreground`                                     | 0.8125rem                 |
| `.toast-close`       | `--muted-foreground`                                     | hover: `--foreground`     |
| `.toast-actions`     | —                                                        | flex row, gap 0.5rem      |

---

## Token usage (CSS)

```css
@layer components {
  /* ── Container ──────────────────────────────────────────────── */
  .toast-container {
    position: fixed;
    z-index: 100;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;
    padding: 1rem;
    max-height: 100vh;
    pointer-events: none;

    &[data-position="bottom-right"] { bottom: 0; right: 0; }
    &[data-position="bottom-left"]  { bottom: 0; left: 0; }
    &[data-position="top-right"]    { top: 0; right: 0; flex-direction: column; }
    &[data-position="top-left"]     { top: 0; left: 0; flex-direction: column; }
    &[data-position="top-center"]   { top: 0; left: 50%; transform: translateX(-50%); flex-direction: column; align-items: center; }
    &[data-position="bottom-center"]{ bottom: 0; left: 50%; transform: translateX(-50%); align-items: center; }
  }

  /* ── Toast ──────────────────────────────────────────────────── */
  .toast {
    background-color: var(--popover);
    color: var(--popover-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1rem;
    min-width: 20rem;
    max-width: 26rem;
    box-shadow: 0 4px 16px oklch(0 0 0 / 0.12);
    pointer-events: auto;
    opacity: 0;
    transform: translateY(0.5rem);
    transition: opacity 200ms ease, transform 200ms ease;

    &:popover-open {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── Variants ───────────────────────────────────────────────── */
    &[data-variant="destructive"] {
      background-color: var(--destructive);
      color: var(--destructive-foreground);
      border-color: var(--destructive);

      & .toast-description {
        color: var(--destructive-foreground);
        opacity: 0.85;
      }
    }

    /* ── Semantic variants (border + icon color) ───────────────── */
    &[data-variant="success"] {
      border-color: oklch(0.65 0.2 145);

      & .toast-icon { color: oklch(0.65 0.2 145); }
    }

    &[data-variant="warning"] {
      border-color: oklch(0.75 0.18 75);

      & .toast-icon { color: oklch(0.75 0.18 75); }
    }

    &[data-variant="info"] {
      border-color: oklch(0.6 0.15 250);

      & .toast-icon { color: oklch(0.6 0.15 250); }
    }
  }

  @starting-style {
    .toast:popover-open {
      opacity: 0;
      transform: translateY(0.5rem);
    }
  }

  /* ── Inner elements ─────────────────────────────────────────── */
  .toast-content {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .toast-text {
    flex: 1;
    min-width: 0;
  }

  .toast-title {
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0;
    line-height: 1.4;
  }

  .toast-description {
    font-size: 0.8125rem;
    color: var(--muted-foreground);
    margin: 0.125rem 0 0;
    line-height: 1.5;
  }

  .toast-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border: none;
    background: transparent;
    color: var(--muted-foreground);
    cursor: pointer;
    flex-shrink: 0;
    border-radius: calc(var(--radius) * 0.5);
    transition: color 150ms, background 150ms;

    &:hover {
      color: var(--foreground);
      background: var(--accent);
    }
  }

  .toast-icon {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .toast-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
}
```

---

## JavaScript

```js
// ── Toast API ───────────────────────────────────────────────
const toast = (() => {
  const DURATION = 4000;
  const MAX_VISIBLE = 3;
  let container = document.getElementById('toast-container');

  // Create container if it doesn't exist
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    container.setAttribute('aria-label', 'Notifications');
    container.setAttribute('data-position', 'bottom-right');
    document.body.appendChild(container);
  }

  // Variant icons (SVG strings)
  const icons = {
    success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    warning: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    destructive: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
  };

  function create(options) {
    const {
      title,
      description,
      variant,
      duration = DURATION,
      action,
      onDismiss,
    } = typeof options === 'string' ? { title: options } : options;

    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', variant === 'destructive' ? 'alert' : 'status');
    el.setAttribute('aria-live', variant === 'destructive' ? 'assertive' : 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.setAttribute('popover', 'manual');
    if (variant) el.setAttribute('data-variant', variant);

    const icon = variant && icons[variant] ? icons[variant] : '';

    el.innerHTML = `
      <div class="toast-content">
        ${icon}
        <div class="toast-text">
          ${title ? `<p class="toast-title">${title}</p>` : ''}
          ${description ? `<p class="toast-description">${description}</p>` : ''}
        </div>
        <button class="toast-close" aria-label="Dismiss" data-toast-close>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      ${action ? `<div class="toast-actions">
        <button class="btn" data-variant="outline" data-size="sm"
                data-toast-action>${action.label}</button>
      </div>` : ''}
    `;

    container.appendChild(el);
    el.showPopover();

    // Close button
    el.querySelector('[data-toast-close]').addEventListener('click', () => {
      dismiss(el, onDismiss);
    });

    // Action button
    if (action) {
      el.querySelector('[data-toast-action]').addEventListener('click', () => {
        action.onClick?.();
        dismiss(el);
      });
    }

    // Auto-dismiss
    if (duration !== Infinity) {
      setTimeout(() => dismiss(el, onDismiss), duration);
    }

    // Enforce max visible
    const toasts = container.querySelectorAll('.toast');
    if (toasts.length > MAX_VISIBLE) {
      dismiss(toasts[0]);
    }

    return el;
  }

  function dismiss(el, callback) {
    if (!el || !el.parentNode) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(0.5rem)';
    setTimeout(() => {
      try { el.hidePopover(); } catch {}
      el.remove();
      callback?.();
    }, 200);
  }

  function dismissAll() {
    container.querySelectorAll('.toast').forEach(el => dismiss(el));
  }

  return {
    show: create,
    success: opts => create({ ...(typeof opts === 'string' ? { title: opts } : opts), variant: 'success' }),
    warning: opts => create({ ...(typeof opts === 'string' ? { title: opts } : opts), variant: 'warning' }),
    info: opts => create({ ...(typeof opts === 'string' ? { title: opts } : opts), variant: 'info' }),
    error: opts => create({ ...(typeof opts === 'string' ? { title: opts } : opts), variant: 'destructive' }),
    dismiss: dismissAll,
  };
})();
```

### API methods

| Method            | Behavior                                              |
|-------------------|-------------------------------------------------------|
| `toast.show(opts)`   | Default toast (no icon, neutral border)            |
| `toast.success(opts)`| Green border + check-circle icon                   |
| `toast.warning(opts)`| Amber border + triangle-alert icon                 |
| `toast.info(opts)`   | Blue border + info-circle icon                     |
| `toast.error(opts)`  | Destructive variant (red bg, x-circle icon)        |
| `toast.dismiss()`    | Dismiss all visible toasts                         |

All methods accept either a string (used as `title`) or an options object:
`{ title, description, variant, duration, action: { label, onClick }, onDismiss }`

---

## ARIA

| Attribute           | Where            | Value                       |
|---------------------|------------------|-----------------------------|
| `role="status"`     | each toast       | Implicit live region        |
| `aria-live="polite"`| each toast       | Screen reader announces it  |
| `aria-atomic="true"`| each toast       | Announce entire toast, not just changes |
| `aria-label`        | toast container  | e.g. "Notifications"       |

---

## Positions

Set `data-position` on the `.toast-container`:
- `bottom-right` (default)
- `bottom-left`
- `bottom-center`
- `top-right`
- `top-left`
- `top-center`

---

## Auto-dismiss timing

| Behavior    | Duration value     |
|-------------|-------------------|
| Default     | `4000` (4 seconds)|
| Long        | `8000`            |
| Persistent  | `Infinity`        |

---

## Notes

- The toast container should be a direct child of `<body>`
- Toasts use `popover="manual"` so they don't auto-dismiss on outside click
- The stacking order is newest on top (CSS `flex-direction: column-reverse` for bottom positions)
- Maximum visible toasts defaults to 3 — older toasts are dismissed
- Swipe-to-dismiss can be added with touch event handling but is not required for MVP
- For forms, show success/error toasts after submission rather than inline messages
- The `toast()` API is imperative — call it from any event handler
