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

## Native Web APIs
- [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — native modal element with built-in focus trap and Escape-to-close
- [`HTMLDialogElement.showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) — opens sheet as modal in the top layer with backdrop
- [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop) — pseudo-element for the overlay behind the sheet
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — defines entry animation starting values for slide-in transition

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
