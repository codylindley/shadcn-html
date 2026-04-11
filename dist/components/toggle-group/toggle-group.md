# Pattern: Toggle Group

## Native basis
`role="group"` container with `.toggle` buttons. Supports single and multiple selection modes.

---

## Native Web APIs
- [`role="group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role) — groups related interactive elements
- [`aria-pressed`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed) — toggle state on each item
- [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) — accessible name for the group

---

## Structure

### Single selection
```html
<div class="toggle-group" role="group" aria-label="Text alignment" data-type="single">
  <button class="toggle" aria-pressed="true" value="left">
    <svg aria-hidden="true" ...>...</svg>
  </button>
  <button class="toggle" aria-pressed="false" value="center">
    <svg aria-hidden="true" ...>...</svg>
  </button>
  <button class="toggle" aria-pressed="false" value="right">
    <svg aria-hidden="true" ...>...</svg>
  </button>
</div>
```

### Multiple selection
```html
<div class="toggle-group" role="group" aria-label="Text formatting" data-type="multiple">
  <button class="toggle" aria-pressed="true" value="bold">
    <svg aria-hidden="true" ...>...</svg>
  </button>
  <button class="toggle" aria-pressed="false" value="italic">
    <svg aria-hidden="true" ...>...</svg>
  </button>
  <button class="toggle" aria-pressed="false" value="underline">
    <svg aria-hidden="true" ...>...</svg>
  </button>
</div>
```

---

## Variants

Inherits variants from `.toggle`:

| `data-variant` (on group) | Visual |
|---------------------------|--------|
| *(default)*               | Transparent background toggles |
| `outline`                 | Border + shadow on each toggle |

---

## Sizes

| `data-size` (on group) | Effect |
|------------------------|--------|
| `sm`                   | Smaller toggles |
| *(default)*            | Standard size |
| `lg`                   | Larger toggles |

---

## ARIA

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="group"` | Container | Groups related toggles |
| `aria-label` | Container | Accessible name for the group |
| `aria-pressed` | Each button | Toggle state |
| `aria-orientation` | Container | `vertical` for vertical layout |

---

## Notes

- `data-type="single"` enforces one-at-a-time selection (radio-like behavior).
- `data-type="multiple"` allows any combination of pressed states (checkbox-like).
- The group propagates `data-variant` and `data-size` to child toggles via CSS.
- Keyboard: Tab focuses the group, arrow keys navigate between items.
