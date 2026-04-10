# Pattern: Input

## Native basis
`<input>` element. Browser provides built-in validation, autofill, and accessibility.

---

## Structure

```html
<label class="label" for="email">Email</label>
<input class="input" type="email" id="email" placeholder="you@example.com">
```

### Sizes
```html
<input class="input" data-size="sm" type="text" placeholder="Small">
<input class="input" type="text" placeholder="Default">
<input class="input" data-size="lg" type="text" placeholder="Large">
```

---

## Sizes

| `data-size` | Height    | Padding       | Font size    |
|-------------|-----------|---------------|--------------|
| `sm`        | `2rem`    | `0 0.625rem`  | `0.8125rem`  |
| *(default)* | `2.5rem`  | `0 0.75rem`   | `0.875rem`   |
| `lg`        | `2.75rem` | `0 1rem`      | `1rem`       |

---

## CSS

```css
@layer components {
  .input {
    height: 2.5rem;
    width: 100%;
    border: 1px solid var(--input);
    border-radius: var(--radius-md);
    background: transparent;
    padding: 0 0.75rem;
    font-size: 0.875rem;
    font-family: var(--font-sans);
    color: var(--foreground);
    outline: none;
    transition: border-color 150ms;

    &:focus {
      border-color: var(--ring);
      box-shadow: 0 0 0 2px oklch(from var(--ring) l c h / 0.2);
    }

    &::placeholder { color: var(--muted-foreground); }

    /* ── Sizes ─────────────────────────────────────────────── */
    &[data-size="sm"] { height: 2rem;    padding: 0 0.625rem; font-size: 0.8125rem; }
    &[data-size="lg"] { height: 2.75rem; padding: 0 1rem;     font-size: 1rem; }
  }

  /* ── Auto-growing textarea ───────────────────────────────── */
  textarea.input {
    field-sizing: content;
    min-height: 5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  /* ── Label ───────────────────────────────────────────────── */
  label.label {
    font-size: 0.875rem;
    font-weight: 500;
    display: block;
    margin-bottom: 0.375rem;

    /* Highlight label when its associated input is focused */
    &:has(+ .input:focus) {
      color: var(--foreground);
    }
  }
}
```

---

## States

### Disabled
```html
<input class="input" type="text" disabled placeholder="Disabled">
```
The `:disabled` state inherits `opacity: 0.5; pointer-events: none` from global styles.

### With icon
Wrap in a relative container and position the icon:
```html
<div class="relative">
  <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
       width="16" height="16" aria-hidden="true">...</svg>
  <input class="input pl-9" type="search" placeholder="Search...">
</div>
```

### Textarea
Use `<textarea>` with the same `.input` class. It auto-grows with content via `field-sizing: content`:
```html
<textarea class="input" placeholder="Your message..."></textarea>
```

---

## Accessibility

- Always pair with a `<label>` using matching `for`/`id`.
- For hidden labels, use `sr-only` class on the label.
- Use appropriate `type` attribute (`email`, `tel`, `url`, `search`, etc.).
