# Aspect Ratio

## Native basis

CSS `aspect-ratio` property — the modern replacement for padding-bottom ratio hacks.

## Native Web APIs

- [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) — intrinsic aspect ratio for any element
- [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) — how replaced content fills its container (cover, contain, fill)
- [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) — alignment of replaced content within its box

## Structure

### Basic (16:9)
```html
<div class="aspect-ratio" data-ratio="16/9">
  <img src="..." alt="..." />
</div>
```

### Square
```html
<div class="aspect-ratio" data-ratio="1/1">
  <img src="..." alt="..." />
</div>
```

### With video
```html
<div class="aspect-ratio" data-ratio="16/9">
  <iframe src="..." title="Video"></iframe>
</div>
```

## Variants

### Ratio (`data-ratio`)

| Value   | Ratio | Use case                |
| ------- | ----- | ----------------------- |
| `1/1`   | 1:1   | Square avatars, icons   |
| `4/3`   | 4:3   | Classic photo, card     |
| `16/9`  | 16:9  | Video, hero images      |
| `21/9`  | 21:9  | Ultra-wide, cinematic   |
| `3/4`   | 3:4   | Portrait photo          |

## Accessibility

- Always include `alt` text on images inside the ratio container.
- Iframes should have a `title` attribute for screen readers.

## Notes

- Child `<img>`, `<video>`, and `<iframe>` elements are absolutely positioned with `object-fit: cover` to fill the container.
- The container has `overflow: hidden` and `border-radius: var(--radius-lg)` by default.
- Pure CSS — no JavaScript required.
