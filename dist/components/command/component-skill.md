# Command

## Native basis

`<dialog>` + search input for a command palette. Uses `showModal()` for focus trap and Escape-to-close.

---

## Native Web APIs

- [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — modal with focus trap and Escape-to-close
- [`showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) — opens dialog as modal with backdrop
- [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop) — scrim overlay behind the dialog
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation starting values
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring on items
- [`overscroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior) — prevents scroll chaining in command list
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses open/close animations
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — maps highlights to system colors

---

## Structure

```html
<button class="btn" data-command-trigger="cmd">Open Command</button>
<dialog id="cmd" class="command" role="dialog" aria-modal="true" aria-label="Command menu">
  <div class="command-content">
    <div class="command-input-wrapper">
      <svg aria-hidden="true"><!-- search icon --></svg>
      <input class="command-input" type="text"
             placeholder="Type a command or search..."
             autocomplete="off" autocorrect="off" spellcheck="false">
    </div>
    <div class="command-list">
      <div class="command-group">
        <p class="command-group-heading">Suggestions</p>
        <button class="command-item">Calendar</button>
        <button class="command-item">Search Emoji</button>
      </div>
      <div class="command-separator"></div>
      <div class="command-group">
        <p class="command-group-heading">Settings</p>
        <button class="command-item">Profile <span class="command-shortcut">⌘P</span></button>
        <button class="command-item">Settings <span class="command-shortcut">⌘S</span></button>
      </div>
    </div>
    <div class="command-empty" hidden>No results found.</div>
  </div>
</dialog>
```

---

## ARIA

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="dialog"` | `<dialog>` | Identifies as a dialog |
| `aria-modal="true"` | `<dialog>` | Indicates modal behavior |
| `aria-label="Command menu"` | `<dialog>` | Labels the dialog for screen readers |
| `aria-hidden="true"` | Search icon `<svg>` | Hides decorative icon |
| `aria-disabled="true"` | Disabled `<button>` | Marks item as disabled |
| `data-highlighted` | Active `<button>` | JS-managed: visually highlights the keyboard-focused item |

---

## Keyboard

| Key | Action |
|-----|--------|
| `Cmd/Ctrl + K` | Opens/closes the command palette (global) |
| `Escape` | Closes the dialog (native `<dialog>` behavior) |
| `Arrow Down` | Highlights the next visible item |
| `Arrow Up` | Highlights the previous visible item |
| `Enter` | Activates the highlighted item |
| `Home` | Highlights the first visible item |
| `End` | Highlights the last visible item |

---

## Notes

- The search input filters items by text content — groups with no matching items are hidden automatically.
- When all items are filtered out, the `.command-empty` element is shown.
- Separators are hidden during filtering to avoid visual orphans.
- The `data-command-trigger` attribute on any element wires it as a trigger button via JS.
- `Cmd/Ctrl+K` is registered as a global keyboard shortcut.
- Items with `aria-disabled="true"` are excluded from keyboard navigation and filtering.
- The dialog uses `showModal()` — focus is trapped inside and Escape closes it natively.
- On close, the search input is cleared and all items are restored.
- No JavaScript positioning is needed — the dialog uses CSS `position: fixed` with `top: 15%`.
