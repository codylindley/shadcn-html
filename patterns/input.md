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

## CSS classes

| Class   | Token usage                                          |
|---------|------------------------------------------------------|
| `input` | `--input` border, `--radius-md` corners, `--foreground` text |
| `label` | `0.875rem` font-size, `font-weight: 500`, block display |

Focus state: `--ring` border color + ring shadow.

Placeholder: `--muted-foreground` color.

---

## Variants

### Sizes
Use Tailwind utilities to adjust height:

```html
<input class="input h-8 text-xs" type="text" placeholder="Small">
<input class="input" type="text" placeholder="Default (h-10)">
<input class="input h-12 text-base" type="text" placeholder="Large">
```

### With icon
Wrap in a relative container and position the icon:

```html
<div class="relative">
  <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
       width="16" height="16" aria-hidden="true">...</svg>
  <input class="input pl-9" type="search" placeholder="Search...">
</div>
```

---

## Accessibility

- Always pair with a `<label>` using matching `for`/`id`.
- For hidden labels, use `sr-only` class on the label.
- Use appropriate `type` attribute (`email`, `tel`, `url`, `search`, etc.).
