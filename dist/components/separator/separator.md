# Pattern: Separator

## Native basis
`<hr>` element (horizontal rule) and `<div role="separator">` for vertical orientation.

---

## Native Web APIs
- [`<hr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr) — thematic break / horizontal rule
- [`role="separator"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) — ARIA separator role for non-`<hr>` elements

---

## Structure

### Horizontal (default)
```html
<hr class="separator">
```

### Vertical
```html
<div class="separator" data-orientation="vertical" role="separator"></div>
```

### With label
```html
<div class="separator-label">
  <hr class="separator">
  <span>or continue with</span>
  <hr class="separator">
</div>
```

---

## Variants

| `data-orientation` | Direction | Element |
|--------------------|-----------|---------|
| *(default)*        | Horizontal | `<hr>` |
| `vertical`         | Vertical  | `<div role="separator">` |

---

## Accessibility

- `<hr>` has implicit `role="separator"` — no extra ARIA needed for horizontal.
- Vertical separators use `<div role="separator">` since `<hr>` is horizontal-only semantically.
- Decorative separators can use `role="none"` or `aria-hidden="true"` to hide from screen readers.

---

## Notes

- The vertical separator requires the parent to be a flex container.
- The labeled separator uses a flex layout with two `<hr>` elements flanking the label text.
- Separators are purely visual — no JavaScript required.
