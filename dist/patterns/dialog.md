# Pattern: Dialog

## Native basis
`<dialog>` element + `showModal()`. The browser provides:
- Focus trap (automatically)
- Escape key to close (automatically)
- `::backdrop` for overlay
- `aria-modal` behavior when opened with `showModal()`

Requires minimal JavaScript — only for trigger wiring and backdrop-click-to-close.

---

## Structure

```html
<!-- Trigger -->
<button class="btn" data-variant="default"
        data-dialog-trigger="my-dialog"
        aria-haspopup="dialog">
  Open
</button>

<!-- Dialog -->
<dialog id="my-dialog"
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title">

  <div class="dialog-content">
    <div class="dialog-header">
      <h2 class="dialog-title" id="my-dialog-title">Dialog Title</h2>
      <p class="dialog-description">Supporting description.</p>
    </div>

    <div class="dialog-body">
      <!-- Content goes here -->
    </div>

    <div class="dialog-footer">
      <button class="btn" data-variant="outline" data-dialog-close>
        Cancel
      </button>
      <button class="btn" data-variant="default">
        Confirm
      </button>
    </div>
  </div>
</dialog>
```

---

## CSS

```css
dialog.dialog {
  border: none;
  border-radius: var(--radius-xl);
  background-color: var(--popover);
  color: var(--popover-foreground);
  padding: 0;
  margin: auto;
  position: fixed;
  inset: 0;
  max-width: 28rem;
  width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  box-shadow: 0 25px 80px oklch(0 0 0 / 0.25), 0 0 0 1px var(--border);
  opacity: 0;
  transform: translateY(-0.5rem) scale(0.98);
  transition: opacity 200ms ease, transform 200ms ease, display 200ms allow-discrete;
}
dialog.dialog[open] {
  opacity: 1;
  transform: translateY(0) scale(1);
}
@starting-style {
  dialog.dialog[open] {
    opacity: 0;
    transform: translateY(-0.5rem) scale(0.98);
  }
}

/* ── Backdrop ───────────────────────────────────────────── */
dialog.dialog::backdrop {
  background: oklch(0 0 0 / 0);
  backdrop-filter: blur(0px);
  transition: all 200ms ease, display 200ms allow-discrete;
}
dialog.dialog[open]::backdrop {
  background: oklch(0 0 0 / 0.45);
  backdrop-filter: blur(3px);
}
@starting-style {
  dialog.dialog[open]::backdrop {
    background: oklch(0 0 0 / 0);
    backdrop-filter: blur(0px);
  }
}

/* ── Content sections ───────────────────────────────────── */
.dialog-content { padding: 1.5rem; }
.dialog-header  { margin-bottom: 1rem; }
.dialog-title   { font-size: 1.0625rem; font-weight: 600; margin: 0 0 0.375rem; letter-spacing: -0.01em; }
.dialog-description { font-size: 0.875rem; color: var(--muted-foreground); margin: 0; line-height: 1.6; }
.dialog-body    { margin-top: 1rem; }
.dialog-footer  { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.5rem; }
```

### Centering note
Tailwind v4's preflight strips `margin: auto` from `<dialog>`, so `margin: auto; position: fixed; inset: 0;` must be set explicitly to center the dialog.

---

## JavaScript (minimal — wire once for all dialogs)

```js
// Open: wire all triggers
document.querySelectorAll('[data-dialog-trigger]').forEach(trigger => {
  const dialog = document.getElementById(trigger.dataset.dialogTrigger);
  if (!dialog) return;
  trigger.addEventListener('click', () => {
    dialog._trigger = trigger;   // store for focus return
    dialog.showModal();
  });
});

// Close: backdrop click + [data-dialog-close] elements
document.querySelectorAll('dialog.dialog').forEach(dialog => {
  // Backdrop click (click lands on the dialog element itself, not content)
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });

  // [data-dialog-close] elements
  dialog.querySelectorAll('[data-dialog-close]').forEach(btn => {
    btn.addEventListener('click', () => dialog.close());
  });

  // Return focus to trigger on close
  dialog.addEventListener('close', () => {
    if (dialog._trigger) dialog._trigger.focus();
  });
});
```

---

## ARIA

| Attribute            | Element     | Value                |
|----------------------|-------------|----------------------|
| `role="dialog"`      | `<dialog>`  | Identifies as dialog |
| `aria-modal="true"`  | `<dialog>`  | Content behind is inert |
| `aria-labelledby`    | `<dialog>`  | Points to title `id` |
| `aria-haspopup="dialog"` | trigger | Indicates dialog will open |

---

## Wiring conventions

- `data-dialog-trigger="[id]"` on any element → opens that dialog
- `data-dialog-close` on any element inside → closes the dialog
- Click on backdrop → closes (click lands on `<dialog>` itself)
- Place `<dialog>` elements as direct children of `<body>`

---

## Notes

- Animation uses CSS-only enter via `@starting-style` and exit via `transition` + `allow-discrete`.
- The selector is `dialog.dialog` (element + class) to avoid styling native `<dialog>` elements used elsewhere.
- For forms inside dialogs, use the `dialog-body` wrapper for the form content.
