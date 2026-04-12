# Tag

## Native basis

`<span>` element containing text and an optional dismiss `<button>`. A tag is a badge with a removable action.

## Native Web APIs

- [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) — inline container for phrasing content
- [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) — native dismiss trigger

## Structure

```html
<!-- Basic tag -->
<span class="tag" data-variant="default">
  Label
</span>

<!-- Dismissible tag -->
<span class="tag" data-variant="default">
  Label
  <button class="tag-dismiss" aria-label="Remove Label">
    <svg><!-- X icon --></svg>
  </button>
</span>
```

## Variants (`data-variant`)

| Value         | Description                              |
|---------------|------------------------------------------|
| `default`     | Primary background, high emphasis        |
| `secondary`   | Secondary background, medium emphasis    |
| `outline`     | Border only, low emphasis                |

## Accessibility

- Dismiss button must have `aria-label` describing the action (e.g., "Remove Label")
- If purely decorative, add `aria-hidden="true"` to the tag
