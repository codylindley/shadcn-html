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

| `data-side` | Behavior                        |
|-------------|----------------------------------|
| `right`     | Slides in from right edge (default) |
| `left`      | Slides in from left edge          |
| `top`       | Slides down from top edge         |
| `bottom`    | Slides up from bottom edge        |

```html
<dialog class="sheet" data-side="left" ...>
<dialog class="sheet" data-side="right" ...>
<dialog class="sheet" data-side="top" ...>
<dialog class="sheet" data-side="bottom" ...>
```

---

## CSS classes

| Class                | Token usage                                          |
|----------------------|------------------------------------------------------|
| `sheet`              | `--background` bg, `--foreground` text, `--border` edge border |
| `sheet-content`      | inner padding wrapper                                |
| `sheet-header`       | bottom margin for spacing                            |
| `sheet-title`        | `--foreground`, font-size 1.0625rem, font-weight 600 |
| `sheet-description`  | `--muted-foreground`, font-size 0.875rem             |
| `sheet-body`         | main content region, top margin                      |
| `sheet-footer`       | flex row, justify-end, gap, top margin               |
| `sheet-close-x`      | absolute-positioned X button, top-right corner       |

Backdrop: `dialog.sheet::backdrop` → `oklch(0 0 0 / 0.45)` + `backdrop-filter: blur(3px)`

### Side positioning
- `right` / `left`: full height, fixed width (24rem), no border-radius
- `top` / `bottom`: full width, auto height, no border-radius

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
  // Backdrop click
  sheet.addEventListener('click', e => {
    if (e.target === sheet) sheet.close();
  });

  // [data-sheet-close] elements
  sheet.querySelectorAll('[data-sheet-close]').forEach(btn => {
    btn.addEventListener('click', () => sheet.close());
  });

  // Return focus to trigger on close
  sheet.addEventListener('close', () => {
    if (sheet._trigger) sheet._trigger.focus();
  });
});
```

---

## Accessibility

- Same as Dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- The `sheet-close-x` button must have `aria-label="Close"`
- Focus trap and Escape key are browser-native via `showModal()`
- Focus returns to trigger element on close
