# Pattern: Checkbox

## Native basis
`<input type="checkbox">` element styled with CSS `appearance: none`.

---

## Native Web APIs
- [`<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) — native toggle control
- [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) — matches checked state
- [`accent-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) — tints native form controls

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

---

## Accessibility

- The native `<input type="checkbox">` provides all keyboard and screen reader support.
- Use `<label>` with `for` to associate the label text.
- Use `aria-invalid="true"` for validation errors.
- Use `indeterminate` property via JS for the indeterminate state.

---

## Notes

- Styled with `appearance: none` and a custom checkmark via `::after` pseudo-element.
- The checkmark uses a CSS-only approach — no SVG or icon font needed.
- Indeterminate state is set via JavaScript: `checkbox.indeterminate = true;`.
