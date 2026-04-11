# Pattern: Radio Group

## Native basis
`<input type="radio">` elements with shared `name` attribute for mutual exclusivity.

---

## Native Web APIs
- [`<input type="radio">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) — native radio button with group exclusivity via `name`
- [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) — matches selected state

---

## Structure

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

---

## Accessibility

- Native `<fieldset>` + `<legend>` provides group labeling.
- Radio buttons sharing the same `name` are mutually exclusive by default.
- Arrow keys navigate between options (native browser behavior).

---

## Notes

- Styled with `appearance: none` and a custom dot via `::after`.
- The `name` attribute is required for mutual exclusivity.
- No JavaScript needed — browsers handle group behavior natively.
