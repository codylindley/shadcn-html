# Pattern: Badge

## Native basis
`<span>` element. No interactivity required — pure visual indicator.

---

## Native Web APIs
- [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) — inline container for phrasing content

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

## Accessibility

- Use descriptive text content — badges are read inline by screen readers.
- If the badge is purely decorative, add `aria-hidden="true"`.
