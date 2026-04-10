# Pattern: Toggle

## Native basis
`<button>` element with `aria-pressed`. The browser provides click and keyboard
(Enter/Space) handling automatically. No extra JavaScript needed for basic usage.

A two-state button that can be either on or off. Common for toolbar formatting
buttons (bold, italic, underline) or feature toggles.

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

## CSS

```css
@layer components {
  .toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: var(--font-sans);
    line-height: 1;
    white-space: nowrap;
    border-radius: var(--radius-md);
    border: 1px solid transparent;
    background: transparent;
    color: var(--muted-foreground);
    cursor: pointer;
    transition: color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
    outline: none;
    flex-shrink: 0;
    height: 2.25rem;
    padding: 0 0.5rem;
    min-width: 2.25rem;

    &:hover {
      background-color: var(--muted);
      color: var(--muted-foreground);
    }

    &[aria-pressed="true"] {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }

    &:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    & svg {
      pointer-events: none;
      flex-shrink: 0;

      &:not([class*="size-"]) { width: 1rem; height: 1rem; }
    }

    /* ── Variants ──────────────────────────────────────────── */
    &[data-variant="outline"] {
      border: 1px solid var(--input);
      background: transparent;
      box-shadow: var(--shadow-xs);

      &:hover {
        background-color: var(--accent);
        color: var(--accent-foreground);
      }

      &[aria-pressed="true"] {
        background-color: var(--accent);
        color: var(--accent-foreground);
      }
    }

    /* ── Sizes ─────────────────────────────────────────────── */
    &[data-size="sm"]  { height: 2rem;  padding: 0 0.375rem; min-width: 2rem; }
    &[data-size="lg"]  { height: 2.5rem; padding: 0 0.625rem; min-width: 2.5rem; }
  }
}
```

---

## JavaScript

```js
// Toggle: wire aria-pressed
document.querySelectorAll('.toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const pressed = toggle.getAttribute('aria-pressed') === 'true';
    toggle.setAttribute('aria-pressed', !pressed);
  });
});
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
