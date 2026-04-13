# Pattern: Separator

## Native basis
`<hr>` element (horizontal rule) and `<div role="separator">` for vertical orientation.

---

## Native Web APIs
- [`<hr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr) — thematic break / horizontal rule with implicit `role="separator"`
- [`role="separator"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) — ARIA separator role for non-`<hr>` elements (vertical orientation)
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode support with system colors
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) — increased contrast when requested by the user

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

### Decorative (hidden from screen readers)
```html
<hr class="separator" role="none">
```

### In a list
```html
<ul>
  <li>Item 1</li>
  <li role="separator"><hr class="separator"></li>
  <li>Item 2</li>
</ul>
```

### Between menu items
```html
<div class="flex items-center gap-4" style="height:1.25rem;">
  <span>Blog</span>
  <div class="separator" data-orientation="vertical" role="separator"></div>
  <span>Docs</span>
  <div class="separator" data-orientation="vertical" role="separator"></div>
  <span>Source</span>
</div>
```

---

## Variants

| `data-orientation` | Direction  | Element                   |
|--------------------|------------|---------------------------|
| *(default)*        | Horizontal | `<hr>`                    |
| `vertical`         | Vertical   | `<div role="separator">` |

---

## ARIA

| Attribute          | Element     | Purpose                                           |
|--------------------|-------------|---------------------------------------------------|
| `role="separator"` | `<div>`     | Required on vertical separators (non-`<hr>`)      |
| `role="none"`      | `<hr>`      | Marks decorative separators — hidden from AT      |
| `aria-hidden="true"`| `<hr>`     | Alternative way to hide decorative separators     |
| `aria-orientation` | `<div>`     | Implicit from `role="separator"`; defaults to horizontal |

---

## Notes

- `<hr>` has implicit `role="separator"` — no extra ARIA needed for horizontal.
- Vertical separators use `<div role="separator">` since `<hr>` is semantic horizontal only.
- Decorative separators (purely visual with no semantic meaning) should use `role="none"` or `aria-hidden="true"` to hide from screen readers.
- The vertical separator requires the parent to be a flex container.
- The labeled separator uses a flex layout with two `<hr>` elements flanking the label text.
- In `forced-colors` mode, the separator uses `CanvasText` system color for visibility.
- In `prefers-contrast: more` mode, the separator uses `--foreground` and doubles in thickness (2px) for visibility.
- Separators are purely visual — no JavaScript required.
