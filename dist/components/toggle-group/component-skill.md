# Pattern: Toggle Group

## Native basis
`role="group"` container with `<button class="toggle">` items using `aria-pressed` for state. Supports single (radio-like) and multiple (checkbox-like) selection modes with roving tabindex keyboard navigation.

---

## Native Web APIs
- [`role="group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role) — groups related interactive elements semantically
- [`aria-pressed`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed) — toggle pressed state on each button
- [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) — accessible name for the group
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus rings
- [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) — derived hover states from token colors
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses transitions for motion-sensitive users
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode support

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

### With text
```html
<div class="toggle-group" role="group" aria-label="View mode" data-type="single" data-variant="outline">
  <button class="toggle" aria-pressed="true" value="list">
    <svg aria-hidden="true" ...>...</svg> List
  </button>
  <button class="toggle" aria-pressed="false" value="grid">
    <svg aria-hidden="true" ...>...</svg> Grid
  </button>
</div>
```

### Vertical
```html
<div class="toggle-group" role="group" aria-label="Alignment" data-type="single" data-orientation="vertical">
  <button class="toggle" aria-pressed="true"><svg aria-hidden="true" ...>...</svg></button>
  <button class="toggle" aria-pressed="false"><svg aria-hidden="true" ...>...</svg></button>
  <button class="toggle" aria-pressed="false"><svg aria-hidden="true" ...>...</svg></button>
</div>
```

### Disabled group
```html
<div class="toggle-group" role="group" aria-label="Formatting" data-type="multiple" data-disabled>
  <button class="toggle" aria-pressed="true" disabled>...</button>
  <button class="toggle" aria-pressed="false" disabled>...</button>
  <button class="toggle" aria-pressed="false" disabled>...</button>
</div>
```

---

## Variants

Inherits variants from `.toggle`:

| `data-variant` (on group) | Visual |
|---------------------------|--------|
| *(default)*               | Transparent background, no border |
| `outline`                 | 1px border + shadow on each item |

---

## Sizes

| `data-size` (on group) | Height | Icon size |
|------------------------|--------|-----------|
| `sm`                   | 2rem   | 0.875rem  |
| *(default)*            | 2.25rem| 1rem      |
| `lg`                   | 2.5rem | 1.125rem  |

---

## Data attributes

| Attribute | Element | Values | Purpose |
|-----------|---------|--------|---------|
| `data-type` | Group | `single` (default), `multiple` | Selection mode |
| `data-variant` | Group | `outline` | Visual variant, propagated to children |
| `data-size` | Group | `sm`, `lg` | Size, propagated to children |
| `data-orientation` | Group | `vertical` | Layout direction (default: horizontal) |
| `data-spacing` | Group | (boolean) | Adds gap between items, restores individual radii |
| `data-disabled` | Group | (boolean) | Disables all items in the group |

---

## ARIA

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="group"` | Container | Groups related toggle buttons |
| `aria-label` | Container | Accessible name for the group |
| `aria-pressed` | Each `<button>` | `"true"` / `"false"` toggle state |

---

## Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Moves focus into/out of the group (one tab stop) |
| `ArrowRight` / `ArrowDown` | Moves focus to next item (wraps) |
| `ArrowLeft` / `ArrowUp` | Moves focus to previous item (wraps) |
| `Home` | Moves focus to first item |
| `End` | Moves focus to last item |
| `Space` / `Enter` | Toggles the focused item (native button behavior) |

Arrow direction follows `data-orientation`: horizontal uses Left/Right, vertical uses Up/Down.

---

## Notes

- Uses **roving tabindex**: only one item has `tabindex="0"` at a time; others have `tabindex="-1"`. Tab enters/exits the group as a single stop.
- `data-type="single"` enforces one-at-a-time selection (radio-like). Pressing the active item deselects it.
- `data-type="multiple"` allows any combination of pressed states (checkbox-like).
- The group propagates `data-variant`, `data-size` to child toggles via CSS selectors.
- Connected mode (default): adjacent toggle radii are collapsed; outline variant collapses double borders via negative margin.
- `data-spacing` adds gap and restores individual border-radius on each item.
- Disabled items are skipped during keyboard navigation.
- CSS uses logical properties (`border-start-start-radius`, `margin-inline-start`) for RTL support.
