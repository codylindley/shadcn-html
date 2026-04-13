# Pattern: Toolbar

## Native basis
`role="toolbar"` container. Groups related controls (buttons, toggles, separators) into a single keyboard-navigable bar.

---

## Native Web APIs
- [`role="toolbar"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/toolbar_role) — a container for grouped controls
- [`aria-orientation`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation) — declares layout direction
- [WAI-ARIA Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) — keyboard navigation specification
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — maps toolbar border to system `ButtonText` in Windows High Contrast Mode

---

## Structure

```html
<div class="toolbar" role="toolbar" aria-label="Formatting" aria-orientation="horizontal">
  <div class="toggle-group" role="group" aria-label="Text style" data-type="multiple">
    <button class="toggle" aria-pressed="false">
      <svg aria-hidden="true" ...><!-- bold --></svg>
    </button>
    <button class="toggle" aria-pressed="false">
      <svg aria-hidden="true" ...><!-- italic --></svg>
    </button>
  </div>
  <div class="separator" data-orientation="vertical" role="separator"></div>
  <div class="toggle-group" role="group" aria-label="Alignment" data-type="single">
    <button class="toggle" aria-pressed="true">
      <svg aria-hidden="true" ...><!-- align-left --></svg>
    </button>
    <button class="toggle" aria-pressed="false">
      <svg aria-hidden="true" ...><!-- align-center --></svg>
    </button>
  </div>
  <div class="separator" data-orientation="vertical" role="separator"></div>
  <a class="btn" data-variant="link" href="#" target="_blank">Link</a>
</div>
```

---

## Accessibility

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="toolbar"` | Container | Identifies the toolbar pattern |
| `aria-label` | Container | Accessible name |
| `aria-orientation` | Container | `horizontal` (default) or `vertical` |

### Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Moves focus into/out of the toolbar (roving tabindex) |
| `→` / `←` | Moves focus between toolbar items (horizontal) |
| `↓` / `↑` | Moves focus between toolbar items (vertical) |
| `Home` / `End` | First / last item |

---

## Notes

- Toolbars compose Toggle Groups, Button Groups, Buttons, and Separators.
- The toolbar handles roving tabindex — only one item is in the tab order at a time.
- Use vertical separators between logical groups of controls.
- The toolbar does not enforce selection logic — that's handled by the child components.
