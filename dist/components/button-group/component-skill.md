# Pattern: Button Group

## Native basis
`<div>` container with `.btn` buttons. Visually merges adjacent buttons with connected borders.

---

## Native Web APIs
- [`role="group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role) — groups related buttons
- [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) — accessible name for the group
- [`role="separator"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) — visually divides buttons within a group
- [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — restores border-radius on buttons adjacent to separators
- [Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) — `margin-inline-start`, `border-start-start-radius` for RTL support
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — maps separator to system `ButtonText` color

---

## Structure

### Horizontal (default)
```html
<div class="btn-group" role="group" aria-label="Actions">
  <button class="btn" data-variant="outline">Save</button>
  <button class="btn" data-variant="outline">Edit</button>
  <button class="btn" data-variant="outline">Delete</button>
</div>
```

### Vertical
```html
<div class="btn-group" data-orientation="vertical" role="group" aria-label="Actions">
  <button class="btn" data-variant="outline">Top</button>
  <button class="btn" data-variant="outline">Middle</button>
  <button class="btn" data-variant="outline">Bottom</button>
</div>
```

### With separator
```html
<div class="btn-group" role="group" aria-label="Actions">
  <button class="btn" data-variant="default">Copy</button>
  <hr role="separator">
  <button class="btn" data-variant="default">Paste</button>
</div>
```

---

## Accessibility

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="group"` | Container | Groups related buttons |
| `aria-label` | Container | Accessible name for the group |
| `role="separator"` | `<hr>` | Visually divides buttons |

---

## Notes

- Button groups work best with the `outline` variant — the connected borders create a cohesive unit.
- Adjacent button borders collapse so only one border renders between buttons.
- The group removes internal border-radii to create seamless joins.
- Use `<hr role="separator">` to visually divide non-outline buttons (e.g., `default` variant).
- Outline buttons already have visible borders and don't need separators.
- Uses CSS logical properties (`margin-inline-start`, `border-start-*-radius`) for automatic RTL support.
- No JavaScript required — this is purely a CSS layout component.
