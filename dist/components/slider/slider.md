# Pattern: Slider

## Native basis
`<input type="range">` element with custom styling.

---

## Native Web APIs
- [`<input type="range">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) — native range control with keyboard and touch support
- [`::-webkit-slider-thumb`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-slider-thumb) — custom thumb styling
- [`::-webkit-slider-runnable-track`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-slider-runnable-track) — custom track styling

---

## Structure

```html
<label class="label" for="volume">Volume</label>
<input class="slider" type="range" id="volume" min="0" max="100" value="50">
```

---

## Accessibility

- Native `<input type="range">` provides full keyboard support (arrow keys, Home, End).
- Use `<label>` with `for` for description.
- `min`, `max`, `step` attributes define the range.
- `aria-valuetext` for custom value descriptions (e.g., "50%").

---

## Notes

- Styled with `-webkit-appearance: none` and custom pseudo-elements.
- Uses CSS accent-color as fallback for unsupported browsers.
- The track fill effect is achieved via a gradient trick.
