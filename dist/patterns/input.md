# Pattern: Input

## Native basis
`<input>` element. Browser provides built-in validation, autofill, and accessibility.

---

## Structure

```html
<label class="label" for="email">Email</label>
<input class="input" type="email" id="email" placeholder="you@example.com">
```

---

## CSS

```css
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
}
.input:focus {
  border-color: var(--ring);
  box-shadow: 0 0 0 2px oklch(from var(--ring) l c h / 0.2);
}
.input::placeholder { color: var(--muted-foreground); }
label.label {
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.375rem;
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
Use `<textarea>` with the same `.input` class. Override height with Tailwind:
```html
<textarea class="input h-24 py-2" placeholder="Your message..."></textarea>
```

---

## Accessibility

- Always pair with a `<label>` using matching `for`/`id`.
- For hidden labels, use `sr-only` class on the label.
- Use appropriate `type` attribute (`email`, `tel`, `url`, `search`, etc.).
