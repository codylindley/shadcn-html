# Avatar

## Native basis

`<img>` element wrapped in a container `<span>` with a text fallback for when the image fails to load.

## Native Web APIs

- [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) — image element with `onerror` fallback
- [`:has()` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — toggle fallback visibility based on image state

## Structure

```html
<!-- Avatar with image -->
<span class="avatar" data-size="default">
  <img class="avatar-image" src="https://example.com/photo.jpg" alt="@username" />
  <span class="avatar-fallback">CN</span>
</span>

<!-- Avatar with fallback only -->
<span class="avatar" data-size="default">
  <span class="avatar-fallback">CN</span>
</span>

<!-- Avatar with badge (status indicator) -->
<span class="avatar" data-size="default">
  <img class="avatar-image" src="https://example.com/photo.jpg" alt="@username" />
  <span class="avatar-fallback">CN</span>
  <span class="avatar-badge"></span>
</span>

<!-- Avatar group -->
<div class="avatar-group">
  <span class="avatar">
    <img class="avatar-image" src="..." alt="..." />
    <span class="avatar-fallback">A</span>
  </span>
  <span class="avatar">
    <img class="avatar-image" src="..." alt="..." />
    <span class="avatar-fallback">B</span>
  </span>
  <span class="avatar-group-count">+3</span>
</div>
```

## Sizes (`data-size`)

| Value     | Dimensions |
|-----------|------------|
| `sm`      | 2rem       |
| `default` | 2.5rem     |
| `lg`      | 3rem       |

## Accessibility

- `<img>` must have an `alt` attribute describing the user
- Fallback text should be initials or a meaningful abbreviation
- Avatar badge should use `aria-label` to convey status when meaningful
