# Pattern: Button

## Native basis
`<button>` element. Also works on `<a>` for link-style buttons.

---

## Native Web APIs
- [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) — native clickable element with built-in keyboard and form support
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring, avoids showing focus on mouse clicks
- [`commandfor` / `command`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command) — declarative button→dialog/popover triggers without JS click handlers
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses hover/focus transitions

---

## Structure

```html
<button class="btn" data-variant="default">Click me</button>
```

### With icon
```html
<button class="btn" data-variant="default">
  <svg aria-hidden="true" width="16" height="16" ...>...</svg>
  Save
</button>
```

### Icon-only
```html
<button class="btn" data-variant="outline" data-size="icon" aria-label="Settings">
  <svg aria-hidden="true" width="16" height="16" ...>...</svg>
</button>
```

---

## Variants

| `data-variant`  | Surface              | Text                     | Hover                          |
|-----------------|----------------------|--------------------------|--------------------------------|
| `default`       | `--primary`          | `--primary-foreground`   | `opacity: 0.88`               |
| `secondary`     | `--secondary`        | `--secondary-foreground` | `opacity: 0.8`                |
| `outline`       | `--background` + border + shadow-xs | `--foreground`  | `--accent` bg                  |
| `ghost`         | transparent          | `--foreground`           | `--accent` bg                  |
| `destructive`   | `--destructive`      | `--destructive-foreground` | `opacity: 0.88`             |
| `link`          | transparent          | `--primary`              | underline                      |

---

## Sizes

| `data-size` | Height    | Padding       | Font size    | Border radius       |
|-------------|-----------|---------------|--------------|---------------------|
| `xs`        | `1.75rem` | `0 0.5rem`    | `0.75rem`    | `var(--radius-sm)`  |
| `sm`        | `2rem`    | `0 0.75rem`   | `0.8125rem`  | `var(--radius-md)`  |
| *(default)* | `2.25rem` | `0 1rem`      | `0.875rem`   | `var(--radius-md)`  |
| `lg`        | `2.75rem` | `0 2rem`      | `1rem`       | `var(--radius-md)`  |
| `icon`      | `2.25rem` | `0` (square)  | —            | `var(--radius-md)`  |
| `icon-sm`   | `2rem`    | `0` (square)  | —            | `var(--radius-md)`  |
| `icon-lg`   | `2.75rem` | `0` (square)  | —            | `var(--radius-md)`  |

---

## Accessibility

- Use `<button>` for actions, `<a>` for navigation.
- Icon-only buttons require `aria-label`.
- Disabled buttons use `disabled` attribute or `aria-disabled="true"`.
- Loading state: add `aria-busy="true"` and swap icon for a spinner.

---

## Notes

- The `link` variant resets height and padding — it flows inline.
- SVGs inside buttons auto-size to 1rem unless they have a `size-*` class.
- The button works on `<a>` tags for styled navigation links.
