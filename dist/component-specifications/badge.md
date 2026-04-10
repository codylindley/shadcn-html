# Pattern: Badge

## Native basis
`<span>` element. No interactivity required — pure visual indicator.

---

## Structure

```html
<span class="badge" data-variant="default">Badge</span>
```

---

## Variants

| `data-variant` | Purpose                           |
|----------------|-----------------------------------|
| `default`      | Primary background, high emphasis  |
| `secondary`    | Secondary background, medium       |
| `outline`      | Border only, low emphasis          |

```html
<span class="badge" data-variant="default">New</span>
<span class="badge" data-variant="secondary">Draft</span>
<span class="badge" data-variant="outline">v0.1.0</span>
```

---

## CSS

```css
@layer components {
  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    padding: 0.125rem 0.625rem;
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.5rem;

    &[data-variant="outline"] {
      border: 1px solid var(--border);
      color: var(--muted-foreground);
    }

    &[data-variant="secondary"] {
      background: var(--secondary);
      color: var(--secondary-foreground);
    }

    &[data-variant="default"] {
      background: var(--primary);
      color: var(--primary-foreground);
    }
  }
}
```

---

## Accessibility

- Use descriptive text content — badges are read inline by screen readers.
- If the badge is purely decorative, add `aria-hidden="true"`.
