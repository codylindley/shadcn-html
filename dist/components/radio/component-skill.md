# Pattern: Radio Group

## Native basis
`<input type="radio">` elements with shared `name` attribute for mutual exclusivity, grouped by `<fieldset>` + `<legend>`.

---

## Native Web APIs
- [`<input type="radio">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) — native radio button with group exclusivity via `name`
- [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) — semantic group container with native `disabled` propagation
- [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) — accessible group label for fieldsets
- [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) — matches selected radio state
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring
- [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — parent-state styling (card highlight when radio is checked)
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppress transitions for motion-sensitive users
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode support

---

## Structure

### Default (simple)

```html
<fieldset class="radio-group">
  <legend class="label">Choose a plan</legend>
  <div class="radio-item">
    <input class="radio" type="radio" name="plan" id="free" value="free" checked>
    <label for="free">Free</label>
  </div>
  <div class="radio-item">
    <input class="radio" type="radio" name="plan" id="pro" value="pro">
    <label for="pro">Pro</label>
  </div>
  <div class="radio-item">
    <input class="radio" type="radio" name="plan" id="enterprise" value="enterprise">
    <label for="enterprise">Enterprise</label>
  </div>
</fieldset>
```

### With description

```html
<fieldset class="radio-group">
  <legend class="label">Spacing</legend>
  <div class="radio-item-block">
    <input class="radio" type="radio" name="spacing" id="default" value="default" checked>
    <label for="default">Default</label>
    <span class="radio-description">Standard spacing for most use cases.</span>
  </div>
  <div class="radio-item-block">
    <input class="radio" type="radio" name="spacing" id="comfortable" value="comfortable">
    <label for="comfortable">Comfortable</label>
    <span class="radio-description">More space between elements.</span>
  </div>
</fieldset>
```

### Card variant

```html
<fieldset class="radio-group">
  <legend class="label">Select a plan</legend>
  <label class="radio-card" for="c-plus">
    <input class="radio" type="radio" name="card-plan" id="c-plus" value="plus">
    <label for="c-plus">Plus</label>
    <span class="radio-description">For individuals and small teams.</span>
  </label>
  <label class="radio-card" for="c-pro">
    <input class="radio" type="radio" name="card-plan" id="c-pro" value="pro" checked>
    <label for="c-pro">Pro</label>
    <span class="radio-description">For growing businesses.</span>
  </label>
</fieldset>
```

### Horizontal layout

```html
<fieldset class="radio-group" data-orientation="horizontal">
  <legend class="label">Alignment</legend>
  <div class="radio-item">
    <input class="radio" type="radio" name="align" id="left" value="left" checked>
    <label for="left">Left</label>
  </div>
  <div class="radio-item">
    <input class="radio" type="radio" name="align" id="center" value="center">
    <label for="center">Center</label>
  </div>
  <div class="radio-item">
    <input class="radio" type="radio" name="align" id="right" value="right">
    <label for="right">Right</label>
  </div>
</fieldset>
```

---

## Layout

| Attribute | Value | Effect |
|---|---|---|
| `data-orientation` | `"horizontal"` | Items flow horizontally (row) |
| _(default)_ | — | Items stack vertically (column) |

---

## ARIA

| Attribute | Element | Purpose |
|---|---|---|
| `<fieldset>` | group wrapper | Provides implicit `role="group"` |
| `<legend>` | first child of fieldset | Accessible group label |
| `name` (shared) | all `<input type="radio">` | Mutual exclusivity |
| `checked` | `<input>` | Pre-selected option |
| `disabled` | `<input>` or `<fieldset>` | Disables one or all options |
| `aria-invalid="true"` | `<input>` | Marks invalid state |
| `aria-describedby` | `<input>` | Links to description/error text |

### Keyboard

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus into / out of the radio group |
| `↓` / `→` | Move to next radio, check it |
| `↑` / `←` | Move to previous radio, check it |
| `Space` | Check the focused radio |

---

## Notes

- Styled with `appearance: none` and a custom dot via `::after`.
- The `name` attribute is required for mutual exclusivity.
- No JavaScript needed — browsers handle group behavior natively.
- Use `.radio-item` for simple label. Use `.radio-item-block` for label + description.
- Use `.radio-card` for card-style selection (radio positioned top-right, card highlights on check via `:has()`).
- `<fieldset disabled>` disables all radios in the group natively.
- Add `data-orientation="horizontal"` to `.radio-group` for a horizontal layout.
