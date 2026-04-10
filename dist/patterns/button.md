# Pattern: Button

## Native basis
`<button>` element. Also works on `<a>` for link-style buttons.

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
| `outline`       | transparent + border | `--foreground`           | `--accent` bg                  |
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

## CSS

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-sans);
  line-height: 1;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 150ms ease;
  outline: none;
  flex-shrink: 0;
  height: 2.25rem; padding: 0 1rem;
  background-color: var(--primary);
  color: var(--primary-foreground);
}
.btn svg { pointer-events: none; flex-shrink: 0; }
.btn svg:not([class*="size-"]) { width: 1rem; height: 1rem; }
.btn:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
.btn:disabled, .btn[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.5;
}

/* ── Variants ──────────────────────────────────────────── */
.btn[data-variant="default"] {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
.btn[data-variant="default"]:hover { opacity: 0.88; }

.btn[data-variant="secondary"] {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}
.btn[data-variant="secondary"]:hover { opacity: 0.8; }

.btn[data-variant="outline"] {
  background-color: transparent;
  color: var(--foreground);
  border: 1px solid var(--border);
}
.btn[data-variant="outline"]:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.btn[data-variant="ghost"] {
  background-color: transparent;
  color: var(--foreground);
}
.btn[data-variant="ghost"]:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.btn[data-variant="destructive"] {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}
.btn[data-variant="destructive"]:hover { opacity: 0.88; }

.btn[data-variant="link"] {
  background-color: transparent;
  color: var(--primary);
  height: auto; padding: 0;
  text-underline-offset: 4px;
}
.btn[data-variant="link"]:hover { text-decoration: underline; }

/* ── Sizes ─────────────────────────────────────────────── */
.btn[data-size="xs"]      { height: 1.75rem; padding: 0 0.5rem;  font-size: 0.75rem; border-radius: var(--radius-sm); }
.btn[data-size="sm"]      { height: 2rem;    padding: 0 0.75rem; font-size: 0.8125rem; }
.btn[data-size="lg"]      { height: 2.75rem; padding: 0 2rem;    font-size: 1rem; }
.btn[data-size="icon"]    { height: 2.25rem; width: 2.25rem;  padding: 0; }
.btn[data-size="icon-sm"] { height: 2rem;    width: 2rem;     padding: 0; }
.btn[data-size="icon-lg"] { height: 2.75rem; width: 2.75rem;  padding: 0; }
```

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
