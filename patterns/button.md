# Pattern: Button

## Native basis
`<button>` element. For navigation, `<a>` with `.btn` class is acceptable.
No JavaScript required for any button variant.

---

## Structure

```html
<button class="btn" data-variant="[variant]" data-size="[size]">
  Label
</button>

<!-- With leading icon -->
<button class="btn" data-variant="default">
  <svg aria-hidden="true" width="16" height="16">...</svg>
  Label
</button>

<!-- Icon only (must have aria-label) -->
<button class="btn" data-variant="outline" data-size="icon"
        aria-label="Open settings">
  <svg aria-hidden="true" width="16" height="16">...</svg>
</button>

<!-- As link -->
<a href="/destination" class="btn" data-variant="default">
  Navigate
</a>
```

---

## Variants (`data-variant`)

| Value         | Surface token      | Foreground token              | Hover behavior       |
|---------------|--------------------|-------------------------------|----------------------|
| `default`     | `--primary`        | `--primary-foreground`        | opacity 0.9          |
| `secondary`   | `--secondary`      | `--secondary-foreground`      | opacity 0.8          |
| `outline`     | transparent        | `--foreground`                | `--accent` fill      |
| `ghost`       | transparent        | `--foreground`                | `--accent` fill      |
| `destructive` | `--destructive`    | `--destructive-foreground`    | opacity 0.9          |
| `link`        | transparent        | `--primary`                   | underline            |

---

## Sizes (`data-size`)

| Value     | Height   | Padding    | Font size |
|-----------|----------|------------|-----------|
| `xs`      | 1.75rem  | 0 0.5rem   | 0.75rem   |
| `sm`      | 2rem     | 0 0.75rem  | 0.8125rem |
| `default` | 2.5rem   | 0 1rem     | 0.875rem  |
| `lg`      | 2.75rem  | 0 2rem     | 1rem      |
| `icon`    | 2.5rem   | 0 (square) | —         |
| `icon-sm` | 2rem     | 0 (square) | —         |
| `icon-lg` | 2.75rem  | 0 (square) | —         |

---

## ARIA

- Use `disabled` attribute (not `aria-disabled`) to disable interaction
- `aria-label` required on icon-only buttons
- If button controls a disclosure: `aria-expanded`, `aria-controls`
- If button triggers a dialog: `aria-haspopup="dialog"` (optional but good)

---

## Token usage (CSS)

```css
.btn[data-variant="default"] {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.btn[data-variant="outline"] {
  background-color: transparent;
  color: var(--foreground);
  border: 1px solid var(--border);
}

.btn[data-variant="outline"]:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

/* Focus ring — same for all variants */
.btn:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.btn:disabled {
  pointer-events: none;
  opacity: 0.5;
}
```

---

## State model

No JS state required. Browser handles:
- `:hover` — CSS
- `:focus-visible` — CSS + outline
- `:disabled` — CSS + pointer-events: none
- `:active` — CSS (optional press feedback)

---

## Notes

- Buttons inside forms default to `type="submit"` — always set `type="button"` for non-submit buttons
- Loading state: add `disabled` + swap inner content (spinner + "Loading...")
- Never rely on color alone to communicate variant meaning — the shape/context should do that too
