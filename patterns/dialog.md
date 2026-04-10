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

## CSS classes

| Class                | Token usage                                          |
|----------------------|------------------------------------------------------|
| `dialog`             | `--popover` bg, `--popover-foreground` text, shadow  |
| `dialog-content`     | inner padding wrapper                                |
| `dialog-header`      | flex col, gap, bottom margin                         |
| `dialog-title`       | `--foreground`, font-size 1.125rem, font-weight 600  |
| `dialog-description` | `--muted-foreground`, font-size 0.875rem             |
| `dialog-body`        | main content region                                  |
| `dialog-footer`      | flex row, justify-end, gap, top margin               |

Backdrop: `dialog::backdrop` → `oklch(0 0 0 / 0.5)` + `backdrop-filter: blur(2px)`

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
document.querySelectorAll('dialog').forEach(dialog => {
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

| Attribute                  | Where              | Value                          |
|----------------------------|--------------------|--------------------------------|
| `role="dialog"`            | `<dialog>`         | Always                         |
| `aria-modal="true"`        | `<dialog>`         | Always (when using showModal)  |
| `aria-labelledby`          | `<dialog>`         | ID of the title element        |
| `aria-describedby`         | `<dialog>`         | ID of description (optional)   |
| `aria-haspopup="dialog"`   | trigger button     | Optional, good practice        |

---

## Animations

Enter: use `@starting-style` (CSS-native, no JS)
Exit: use `transition` on the dialog element

```css
dialog {
  transition: opacity 150ms ease, transform 150ms ease;
  transform: translateY(-0.5rem);
  opacity: 0;
}

dialog[open] {
  transform: translateY(0);
  opacity: 1;
}

@starting-style {
  dialog[open] {
    transform: translateY(-0.5rem);
    opacity: 0;
  }
}

dialog::backdrop {
  transition: opacity 150ms ease;
  opacity: 0;
}

dialog[open]::backdrop {
  opacity: 1;
}

@starting-style {
  dialog[open]::backdrop {
    opacity: 0;
  }
}
```

---

## Variants

Build variants by adding a `data-variant` to the dialog element:
- `data-variant="alert"` — no close on backdrop click, more prominent styling
- `data-variant="sheet"` — slides in from side (change transform axis)
- `data-variant="drawer"` — slides up from bottom (mobile pattern)

---

## Notes

- Always place `<dialog>` elements as direct children of `<body>`
- Do NOT put dialogs inside positioned parents (breaks backdrop)
- Escape key handling is automatic with `showModal()` — do not override it
- `dialog.returnValue` can be set before close to communicate which action was taken
- For confirm-style dialogs, use `data-variant="destructive"` on the confirm button
