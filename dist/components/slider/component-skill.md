# Pattern: Slider

## Native basis
`<input type="range">` — native range input with built-in keyboard, touch, and assistive technology support.

---

## Native Web APIs
- [`<input type="range">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) — native range control with keyboard and touch support
- [`::-webkit-slider-thumb`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-slider-thumb) — custom thumb styling (WebKit/Blink)
- [`::-webkit-slider-runnable-track`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-slider-runnable-track) — custom track styling (WebKit/Blink)
- [`::-moz-range-thumb`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-range-thumb) — custom thumb styling (Firefox)
- [`::-moz-range-track`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-range-track) — custom track styling (Firefox)
- [`::-moz-range-progress`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-range-progress) — filled portion of track (Firefox)
- [`<output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output) — displays computed/live result value
- [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) — hover state color derivation
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses animations for motion-sensitive users
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode support
- [WAI-ARIA Slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) — canonical keyboard and ARIA reference

---

## Structure

### Default
```html
<input class="slider" type="range" min="0" max="100" value="50">
```

### With label
```html
<label class="label" for="volume">Volume</label>
<input class="slider" type="range" id="volume" min="0" max="100" value="50">
```

### With label and value display
```html
<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">
  <label class="label" for="temp" style="margin:0;">Temperature</label>
  <output class="text-sm text-muted-foreground" style="font-family:var(--font-mono);" for="temp">0.5</output>
</div>
<input class="slider" type="range" id="temp" min="0" max="1" step="0.1" value="0.5">
```

### With steps
```html
<input class="slider" type="range" min="0" max="100" step="25" value="50">
```

### Vertical
```html
<input class="slider" type="range" data-orientation="vertical" min="0" max="100" value="50">
```

### Disabled
```html
<input class="slider" type="range" min="0" max="100" value="50" disabled>
```

---

## Data attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-orientation` | `vertical` | Renders as a vertical slider |

---

## Keyboard

All keyboard interaction is provided natively by `<input type="range">`.

| Key | Action |
|-----|--------|
| `Right Arrow` / `Up Arrow` | Increase value by one step |
| `Left Arrow` / `Down Arrow` | Decrease value by one step |
| `Home` | Set to minimum value |
| `End` | Set to maximum value |
| `Page Up` | Increase by larger step (browser-defined) |
| `Page Down` | Decrease by larger step (browser-defined) |

---

## ARIA

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="slider"` | `<input>` | Implicit from `type="range"` — do not add manually |
| `aria-valuenow` | `<input>` | Implicit from `value` attribute |
| `aria-valuemin` | `<input>` | Implicit from `min` attribute |
| `aria-valuemax` | `<input>` | Implicit from `max` attribute |
| `aria-valuetext` | `<input>` | Custom human-readable value (e.g., "50%", "Medium") |
| `aria-orientation` | `<input>` | Set to `vertical` for vertical sliders |
| `aria-label` | `<input>` | Accessible name when no visible `<label>` exists |
| `for` | `<label>` | Associates label with the slider input |
| `for` | `<output>` | Associates output display with the slider input |

---

## Notes

- **Filled track**: Firefox uses `::-moz-range-progress` natively. WebKit/Blink requires a `linear-gradient` on the track with a `--slider-value` custom property set by JS.
- **JS initialization**: `slider.js` sets `--slider-value` on each `.slider` element and updates it on `input` events. This powers the filled track gradient in WebKit.
- **Vertical**: Uses `writing-mode: vertical-lr; direction: rtl` to render vertically across all browsers. Add `data-orientation="vertical"` to activate.
- **Value display**: Use `<output for="slider-id">` to show the current value. Wire the update in your own script or inline `oninput`.
- **`accent-color`**: Set as a CSS fallback for browsers that don't fully support custom styling pseudo-elements.
- **Step attribute**: Use `step` to control increment granularity. Omit for continuous (default step is 1).
- **Form integration**: Native `<input type="range">` submits its value with forms automatically when given a `name` attribute.
