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

| `data-variant` | Purpose                          |
|----------------|----------------------------------|
| `default`      | Primary background, high emphasis |
| `secondary`    | Secondary background, medium emphasis |
| `outline`      | Border only, low emphasis         |

```html
<span class="badge" data-variant="default">New</span>
<span class="badge" data-variant="secondary">Draft</span>
<span class="badge" data-variant="outline">v0.1.0</span>
```

---

## CSS classes

| Class   | Token usage                                                  |
|---------|--------------------------------------------------------------|
| `badge` | pill shape (`border-radius: 9999px`), inline-flex, small text |

Variant styling via `data-variant`:
- `default` → `--primary` bg, `--primary-foreground` text
- `secondary` → `--secondary` bg, `--secondary-foreground` text
- `outline` → `--border` border, `--muted-foreground` text

---

## Accessibility

- Use descriptive text content — badges are read inline by screen readers.
- If the badge is purely decorative, add `aria-hidden="true"`.
