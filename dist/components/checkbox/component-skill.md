# Pattern: Checkbox

## Native basis
`<input type="checkbox">` element styled with CSS `appearance: none`.

---

## Native Web APIs
- [`<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) — native toggle control with built-in keyboard and form support
- [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) — matches checked state
- [`:indeterminate`](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate) — matches the indeterminate (mixed) state
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring
- [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) — post-interaction validation styling
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses transitions
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) — thicker borders for high-contrast preference
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — reverts to native checkbox in Windows High Contrast Mode

---

## Structure

### Basic
```html
<div class="flex items-center gap-2">
  <input class="checkbox" type="checkbox" id="terms">
  <label class="label" for="terms" style="margin:0;">Accept terms and conditions</label>
</div>
```

### With description
```html
<div class="flex items-start gap-2">
  <input class="checkbox" type="checkbox" id="notify" style="margin-top:0.125rem;">
  <div>
    <label class="label" for="notify" style="margin:0;">Enable notifications</label>
    <p class="field-description">You can enable or disable notifications at any time.</p>
  </div>
</div>
```

### Checked by default
```html
<input class="checkbox" type="checkbox" id="checked" checked>
```

### Disabled
```html
<input class="checkbox" type="checkbox" disabled>
<input class="checkbox" type="checkbox" disabled checked>
```

### Invalid
```html
<input class="checkbox" type="checkbox" aria-invalid="true" required>
```

### Checkbox group
```html
<fieldset>
  <legend>Select items to display</legend>
  <div class="flex items-center gap-2">
    <input class="checkbox" type="checkbox" id="item-1" checked>
    <label for="item-1">Item 1</label>
  </div>
  <div class="flex items-center gap-2">
    <input class="checkbox" type="checkbox" id="item-2">
    <label for="item-2">Item 2</label>
  </div>
</fieldset>
```

---

## Keyboard

| Key     | Action                         |
| ------- | ------------------------------ |
| `Space` | Toggles checked / unchecked    |
| `Tab`   | Moves focus to the next control |

All keyboard behavior is provided natively by `<input type="checkbox">`.

---

## Accessibility

- The native `<input type="checkbox">` provides all keyboard and screen reader support.
- Use `<label>` with `for` to associate the label text.
- Use `<fieldset>` + `<legend>` for checkbox groups.
- Use `aria-invalid="true"` for validation errors.
- Use `indeterminate` property via JS for the indeterminate (mixed) state.

---

## Notes

- Styled with `appearance: none` and a custom checkmark via `::after` pseudo-element.
- The checkmark uses a CSS-only approach — no SVG or icon font needed.
- Indeterminate state is set via JavaScript: `checkbox.indeterminate = true;`.
- In `forced-colors: active`, the checkbox reverts to `appearance: auto` so Windows High Contrast Mode controls rendering.
