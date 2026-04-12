# Image

## Native basis

`<img>` element wrapped in a `<figure>` with optional `<figcaption>`. Uses CSS `aspect-ratio` for controlled dimensions.

## Native Web APIs

- [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) — self-contained content with optional caption
- [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) — caption for the figure
- [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) — intrinsic aspect ratio control

## Structure

```html
<!-- Basic image -->
<figure class="image">
  <img src="https://example.com/photo.jpg" alt="Description" />
</figure>

<!-- Image with caption -->
<figure class="image">
  <img src="https://example.com/photo.jpg" alt="Description" />
  <figcaption class="image-caption">Photo caption text</figcaption>
</figure>

<!-- Image with aspect ratio -->
<figure class="image" data-ratio="16/9">
  <img src="https://example.com/photo.jpg" alt="Description" />
</figure>
```

## Ratios (`data-ratio`)

| Value   | Aspect ratio |
|---------|-------------|
| `1/1`   | Square       |
| `4/3`   | Standard     |
| `16/9`  | Widescreen   |
| `21/9`  | Ultra-wide   |

## Accessibility

- `<img>` must have a descriptive `alt` attribute
- Decorative images should use `alt=""`
- `<figcaption>` provides visible caption text
