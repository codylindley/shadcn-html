# Empty State

## Native basis

`<div>` container with centered content for when there is no data to display.

## Native Web APIs

- [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) — generic container

## Structure

```html
<div class="empty-state">
  <div class="empty-state-icon">
    <svg><!-- illustration or icon --></svg>
  </div>
  <h3 class="empty-state-title">No results found</h3>
  <p class="empty-state-description">
    Try adjusting your search or filter to find what you're looking for.
  </p>
  <div class="empty-state-actions">
    <button class="btn" data-variant="default">Clear filters</button>
  </div>
</div>
```

## Accessibility

- Use heading hierarchy appropriate to the context
- Action buttons should be clearly labeled
- If the empty state conveys important status, consider `role="status"`
