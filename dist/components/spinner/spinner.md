# Spinner

## Native basis

CSS `@keyframes` animation on an SVG element. No JavaScript required.

## Native Web APIs

- [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) — CSS animation for continuous rotation
- [`role="status"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) — ARIA live region for loading state
- [`<svg>`](https://developer.mozilla.org/en-US/docs/Web/SVG) — scalable vector graphic for the spinner icon

## Structure

```html
<!-- Basic spinner -->
<svg class="spinner" role="status" aria-label="Loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
</svg>
```

## Sizes (`data-size`)

| Value     | Dimensions |
|-----------|------------|
| `sm`      | 0.875rem   |
| `default` | 1rem       |
| `md`      | 1.25rem    |
| `lg`      | 1.5rem     |

## Accessibility

- Must have `role="status"` and `aria-label="Loading"` (or contextual label)
- Screen readers announce the loading state via the ARIA live region
