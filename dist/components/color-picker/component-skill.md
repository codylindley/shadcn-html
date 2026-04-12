# Pattern: Color Picker

## Native basis
`<input type="color">` element with label.

---

## Native Web APIs
- [`<input type="color">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color) — native color picker dialog

---

## Structure

```html
<label class="label" for="bg-color">Background Color</label>
<div class="color-picker">
  <input type="color" id="bg-color" value="#6366f1">
  <span class="color-picker-value">#6366f1</span>
</div>
```

---

## Notes

- The native color picker renders a full-featured dialog — no JS needed.
- The wrapper adds a styled border and displays the current hex value.
- The color swatch is provided by the browser's native `<input type="color">`.
