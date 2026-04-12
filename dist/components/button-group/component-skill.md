# Pattern: Button Group

## Native basis
`<div>` container with `.btn` buttons. Visually merges adjacent buttons with connected borders.

---

## Native Web APIs
- [`role="group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role) — groups related buttons
- [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) — accessible name for the group

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

---

## Accessibility

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `role="group"` | Container | Groups related buttons |
| `aria-label` | Container | Accessible name for the group |

---

## Notes

- Button groups work best with the `outline` variant — the connected borders create a cohesive unit.
- Adjacent button borders collapse so only one border renders between buttons.
- The group removes internal border-radii to create seamless joins.
- No JavaScript required — this is purely a CSS layout component.
