# Alert

## Native basis

`<div>` with `role="alert"` for important callout messages.

## Native Web APIs

- [`role="alert"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) — ARIA alert role for assertive announcements

## Structure

```html
<!-- Default alert -->
<div class="alert" role="alert">
  <svg class="alert-icon"><!-- icon --></svg>
  <div class="alert-content">
    <h5 class="alert-title">Heads up!</h5>
    <p class="alert-description">You can add components using the CLI.</p>
  </div>
</div>

<!-- Destructive alert -->
<div class="alert" data-variant="destructive" role="alert">
  <svg class="alert-icon"><!-- icon --></svg>
  <div class="alert-content">
    <h5 class="alert-title">Error</h5>
    <p class="alert-description">Your session has expired.</p>
  </div>
</div>

<!-- Alert with action -->
<div class="alert" role="alert">
  <svg class="alert-icon"><!-- icon --></svg>
  <div class="alert-content">
    <h5 class="alert-title">New feature available</h5>
    <p class="alert-description">Dark mode is now available.</p>
  </div>
  <div class="alert-action">
    <button class="btn" data-variant="outline" data-size="sm">Enable</button>
  </div>
</div>
```

## Variants (`data-variant`)

| Value         | Description                               |
|---------------|-------------------------------------------|
| `default`     | Standard informational alert              |
| `destructive` | Error or warning state with destructive styling |

## Accessibility

- Use `role="alert"` for important messages that should interrupt screen readers
- The alert role triggers an assertive live region announcement
- Icon should be decorative (`aria-hidden="true"`) when a title is present
