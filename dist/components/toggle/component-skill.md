# Pattern: Toggle

## Native basis
`<button>` element with `aria-pressed`. The browser provides click and keyboard
(Enter/Space) handling automatically. No extra JavaScript needed for basic usage.

A two-state button that can be either on or off. Common for toolbar formatting
buttons (bold, italic, underline) or feature toggles.

---

## Native Web APIs
- [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) — native clickable element with built-in keyboard handling
- [`aria-pressed`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed) — communicates toggle on/off state to assistive technology
- [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) — derived hover color for pressed state
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses color/background transitions

---

## Structure

```html
<button class="toggle" aria-pressed="false" aria-label="Toggle bold">
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/>
  </svg>
</button>
```

### With text
```html
<button class="toggle" aria-pressed="false">
  <svg aria-hidden="true" width="16" height="16" ...>...</svg>
  Italic
</button>
```

---

## Variants

| `data-variant` | Purpose                              |
|----------------|--------------------------------------|
| *(default)*    | Transparent background, subtle hover |
| `outline`      | Border, transparent background       |

```html
<button class="toggle" aria-pressed="false">Default</button>
<button class="toggle" data-variant="outline" aria-pressed="false">Outline</button>
```

---

## Sizes

| `data-size`  | Height    | Padding        | Min-width   |
|-------------|-----------|----------------|-------------|
| `sm`        | `2rem`    | `0 0.375rem`   | `2rem`      |
| *(default)* | `2.25rem` | `0 0.5rem`     | `2.25rem`   |
| `lg`        | `2.5rem`  | `0 0.625rem`   | `2.5rem`    |

```html
<button class="toggle" data-size="sm" aria-pressed="false" aria-label="Bold">
  <svg aria-hidden="true" ...>...</svg>
</button>
```

---

## ARIA

| Attribute         | Element    | Value               |
|--------------------|-----------|----------------------|
| `aria-pressed`     | `<button>` | `"true"` or `"false"` — toggled on click |
| `aria-label`       | `<button>` | Required for icon-only toggles |

---

## Notes

- The toggle is just a button with `aria-pressed` — no custom elements needed.
- Icon-only toggles must have `aria-label` for screen readers.
- For toggle groups (e.g., text alignment), wrap in a container with `role="group"` and `aria-label`.
- The pressed state uses `--accent` / `--accent-foreground` to match shadcn conventions.
