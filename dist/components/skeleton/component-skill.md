# Skeleton

## Native basis

CSS `@keyframes` pulse animation on placeholder `<div>` elements. No JavaScript required.

## Native Web APIs

- [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) — CSS pulse animation for shimmer effect

## Structure

```html
<!-- Basic skeleton line -->
<div class="skeleton" style="height:1rem;width:12rem;"></div>

<!-- Skeleton with rounded shape (avatar placeholder) -->
<div class="skeleton skeleton-round" style="width:2.5rem;height:2.5rem;"></div>

<!-- Composition: card skeleton -->
<div style="display:flex;align-items:center;gap:1rem;">
  <div class="skeleton skeleton-round" style="width:2.5rem;height:2.5rem;"></div>
  <div style="display:flex;flex-direction:column;gap:0.5rem;flex:1;">
    <div class="skeleton" style="height:0.875rem;width:60%;"></div>
    <div class="skeleton" style="height:0.875rem;width:40%;"></div>
  </div>
</div>
```

## Accessibility

- Skeleton elements are decorative — screen readers should skip them
- Use `aria-hidden="true"` on skeleton containers if they sit alongside real content
- Announce the loading state separately with `role="status"` if needed
