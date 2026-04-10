# Pattern: Sheet

## Native basis
`<dialog>` element + `showModal()`. Same native benefits as Dialog:
- Focus trap (automatically)
- Escape key to close (automatically)
- `::backdrop` for overlay
- `aria-modal` behavior when opened with `showModal()`

A sheet is a dialog variant that slides in from an edge of the screen.
Uses `data-side` attribute to control which edge: `top`, `right`, `bottom`, `left`.

---

## Structure

```html
<!-- Trigger -->
<button class="btn" data-variant="outline"
        data-sheet-trigger="my-sheet"
        aria-haspopup="dialog">
  Open Sheet
</button>

<!-- Sheet -->
<dialog id="my-sheet"
        class="sheet"
        data-side="right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-sheet-title">

  <div class="sheet-content">
    <div class="sheet-header">
      <h2 class="sheet-title" id="my-sheet-title">Sheet Title</h2>
      <p class="sheet-description">Supporting description.</p>
    </div>

    <div class="sheet-body">
      <!-- Content goes here -->
    </div>

    <div class="sheet-footer">
      <button class="btn" data-variant="outline" data-sheet-close>
        Cancel
      </button>
      <button class="btn" data-variant="default">
        Save changes
      </button>
    </div>
  </div>

  <button class="sheet-close-x" data-sheet-close aria-label="Close">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  </button>
</dialog>
```

---

## Sides

| `data-side` | Behavior                           |
|-------------|------------------------------------|
| `right`     | Slides in from right edge (default) |
| `left`      | Slides in from left edge            |
| `top`       | Slides down from top edge           |
| `bottom`    | Slides up from bottom edge          |

---

## CSS

```css
@layer components {
  /* ── Base ────────────────────────────────────────────────── */
  dialog.sheet {
    border: none;
    border-radius: 0;
    background-color: var(--background);
    color: var(--foreground);
    padding: 0;
    margin: 0;
    max-width: none;
    max-height: none;
    opacity: 0;
    transition: opacity 300ms ease, transform 300ms ease, display 300ms allow-discrete;

    &[open] { opacity: 1; }

    /* ── Side: right (default) ───────────────────────────────── */
    &, &[data-side="right"] {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 24rem;
      max-width: 100vw;
      max-height: 100vh;
      height: 100%;
      border-left: 1px solid var(--border);
      transform: translateX(100%);
    }

    &[open], &[data-side="right"][open] {
      transform: translateX(0);
    }

    /* ── Side: left ──────────────────────────────────────────── */
    &[data-side="left"] {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      right: auto;
      width: 24rem;
      max-width: 100vw;
      max-height: 100vh;
      height: 100%;
      border-left: none;
      border-right: 1px solid var(--border);
      transform: translateX(-100%);

      &[open] { transform: translateX(0); }
    }

    /* ── Side: top ───────────────────────────────────────────── */
    &[data-side="top"] {
      position: fixed;
      top: 0; left: 0; right: 0;
      bottom: auto;
      width: 100%;
      max-width: 100vw;
      max-height: 100vh;
      height: auto;
      border-left: none;
      border-bottom: 1px solid var(--border);
      transform: translateY(-100%);

      &[open] { transform: translateY(0); }
    }

    /* ── Side: bottom ────────────────────────────────────────── */
    &[data-side="bottom"] {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      top: auto;
      width: 100%;
      max-width: 100vw;
      max-height: 100vh;
      height: auto;
      border-left: none;
      border-top: 1px solid var(--border);
      transform: translateY(100%);

      &[open] { transform: translateY(0); }
    }

    /* ── Backdrop ────────────────────────────────────────────── */
    &::backdrop {
      background: oklch(0 0 0 / 0);
      backdrop-filter: blur(0px);
      transition: all 300ms ease, display 300ms allow-discrete;
    }

    &[open]::backdrop {
      background: oklch(0 0 0 / 0.45);
      backdrop-filter: blur(3px);
    }
  }

  @starting-style {
    dialog.sheet[open],
    dialog.sheet[data-side="right"][open] {
      opacity: 0;
      transform: translateX(100%);
    }

    dialog.sheet[data-side="left"][open] {
      opacity: 0;
      transform: translateX(-100%);
    }

    dialog.sheet[data-side="top"][open] {
      opacity: 0;
      transform: translateY(-100%);
    }

    dialog.sheet[data-side="bottom"][open] {
      opacity: 0;
      transform: translateY(100%);
    }

    dialog.sheet[open]::backdrop {
      background: oklch(0 0 0 / 0);
      backdrop-filter: blur(0px);
    }
  }

  /* ── Content sections ────────────────────────────────────── */
  .sheet-content     { padding: 1.5rem; position: relative; }
  .sheet-header      { margin-bottom: 1rem; padding-right: 2rem; }
  .sheet-title       { font-size: 1.0625rem; font-weight: 600; margin: 0 0 0.375rem; letter-spacing: -0.01em; }
  .sheet-description { font-size: 0.875rem; color: var(--muted-foreground); margin: 0; line-height: 1.6; }
  .sheet-body        { margin-top: 1rem; }
  .sheet-footer      { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.5rem; }

  /* ── Close button ────────────────────────────────────────── */
  .sheet-close-x {
    position: absolute;
    top: 1rem; right: 1rem;
    width: 1.75rem; height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--muted-foreground);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: color 150ms, background-color 150ms;

    &:hover {
      color: var(--foreground);
      background-color: var(--accent);
    }
  }
}
```

---

## JavaScript (minimal — wire once for all sheets)

```js
// Open: wire all triggers
document.querySelectorAll('[data-sheet-trigger]').forEach(trigger => {
  const sheet = document.getElementById(trigger.dataset.sheetTrigger);
  if (!sheet) return;
  trigger.addEventListener('click', () => {
    sheet._trigger = trigger;
    sheet.showModal();
  });
});

// Close: backdrop click + [data-sheet-close] elements
document.querySelectorAll('dialog.sheet').forEach(sheet => {
  sheet.addEventListener('click', e => {
    if (e.target === sheet) sheet.close();
  });

  sheet.querySelectorAll('[data-sheet-close]').forEach(btn => {
    btn.addEventListener('click', () => sheet.close());
  });

  sheet.addEventListener('close', () => {
    if (sheet._trigger) sheet._trigger.focus();
  });
});
```

---

## ARIA

| Attribute            | Element          | Value                |
|----------------------|------------------|----------------------|
| `role="dialog"`      | `<dialog>`       | Identifies as dialog |
| `aria-modal="true"`  | `<dialog>`       | Content behind is inert |
| `aria-labelledby`    | `<dialog>`       | Points to title `id` |
| `aria-haspopup="dialog"` | trigger     | Indicates dialog will open |
| `aria-label="Close"` | `sheet-close-x`  | Labels the X button  |

---

## Wiring conventions

- `data-sheet-trigger="[id]"` on any element → opens that sheet
- `data-sheet-close` on any element inside → closes the sheet
- Click on backdrop → closes (click lands on `<dialog>` itself)
- Place `<dialog>` elements as direct children of `<body>`

---

## Notes

- Right/left sheets have a fixed width of `24rem` with `max-width: 100vw` for small screens.
- Top/bottom sheets are full width with `height: auto` — they size to their content.
- The selector is `dialog.sheet` (element + class) to avoid conflicts with `dialog.dialog`.
- The `sheet-header` has `padding-right: 2rem` to avoid overlapping the close button.
