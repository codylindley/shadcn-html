# Pattern: Link

## Native basis
`<a>` element. Browser provides built-in navigation, visited state, and accessibility.

---

## Native Web APIs
- [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) — hyperlink element with built-in navigation and focus management
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring

---

## Structure

### Default
```html
<a class="link" href="/docs">Documentation</a>
```

### With icon
```html
<a class="link" href="/docs">
  Documentation
  <svg aria-hidden="true" width="14" height="14" ...>...</svg>
</a>
```

### External
```html
<a class="link" href="https://example.com" target="_blank" rel="noopener noreferrer">
  External link
  <svg aria-hidden="true" width="14" height="14" ...>...</svg>
</a>
```

---

## Variants

| `data-variant` | Visual |
|----------------|--------|
| *(default)*    | Primary color, underline on hover |
| `muted`        | Muted foreground color, subtle |

---

## Accessibility

- Use descriptive link text — avoid "click here" or "read more".
- External links should indicate they open in a new window (via icon or `aria-label`).
- Links have native keyboard support — no extra ARIA needed.
- Distinguish links (navigation) from buttons (actions).

---

## Notes

- The `.link` class is for styled text links within content. Navigation links in menus/navs use `.nav-link` or component-specific classes.
- SVGs inside links auto-size to match the text.
- The link inherits `font-size` and `font-weight` from its context.
