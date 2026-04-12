# Image

## Native basis

`<figure>` element wrapping an `<img>` with optional `<figcaption>`. Uses `<dialog>` for fullscreen preview/lightbox.

## Native Web APIs

- [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) — self-contained content with optional caption
- [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) — caption for the figure
- [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — native modal for fullscreen lightbox preview
- [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop) — overlay behind lightbox dialog
- [`loading="lazy"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading) — native lazy loading
- [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) — how image fills its container
- [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) — intrinsic aspect ratio control
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation for lightbox

## Structure

### Basic image
```html
<figure class="image">
  <img src="photo.jpg" alt="Description" />
</figure>
```

### With caption
```html
<figure class="image">
  <img src="photo.jpg" alt="Description" />
  <figcaption class="image-caption">Photo caption text</figcaption>
</figure>
```

### With fallback
```html
<figure class="image">
  <img src="photo.jpg" alt="Description" />
  <div class="image-fallback">
    <svg><!-- fallback icon --></svg>
  </div>
</figure>
```

### With lightbox preview
```html
<figure class="image" data-preview>
  <img src="photo.jpg" alt="Description" />
</figure>
```

### With aspect ratio
```html
<figure class="image" data-ratio="16/9">
  <img src="photo.jpg" alt="Description" />
</figure>
```

## Variants

### Fit (`data-fit`)

| Value       | Behavior                        |
| ----------- | ------------------------------- |
| *(default)* | `object-fit: cover` (fills)     |
| `contain`   | Fits inside, preserves ratio    |
| `fill`      | Stretches to fill               |
| `none`      | No resizing, natural size       |

### Ratio (`data-ratio`)

| Value   | Aspect ratio  |
|---------|--------------|
| `1/1`   | Square        |
| `4/3`   | Standard      |
| `3/2`   | Classic photo |
| `16/9`  | Widescreen    |
| `21/9`  | Ultra-wide    |
| `3/4`   | Portrait      |

### Radius (`data-radius`)

| Value       | Border radius          |
| ----------- | ---------------------- |
| *(default)* | `var(--radius-lg)`     |
| `none`      | `0`                    |
| `sm`        | `var(--radius-sm)`     |
| `md`        | `var(--radius-md)`     |
| `full`      | `9999px` (pill/circle) |

## Attributes

| Attribute      | Effect                                    |
| -------------- | ----------------------------------------- |
| `data-preview` | Enables click-to-preview lightbox         |
| `data-ratio`   | Sets aspect ratio                         |
| `data-fit`     | Sets object-fit mode                      |
| `data-radius`  | Sets border radius variant                |

## Lightbox

When `data-preview` is set, clicking the image opens a fullscreen `<dialog>` lightbox with:
- Zoom in / zoom out controls
- Rotate left / rotate right
- Reset to original
- Close button and Escape key
- Click backdrop to close

The lightbox dialog is created once and shared by all preview-enabled images.

## Accessibility

- `<img>` must have a descriptive `alt` attribute
- Decorative images should use `alt=""`
- `<figcaption>` provides visible caption text
- Lightbox dialog uses `aria-label="Image preview"`
- Lightbox controls have `aria-label` attributes
- Escape key closes lightbox (native `<dialog>` behavior)

## Notes

- Fallback is shown automatically when the image fails to load, using `:has()` to detect error state.
- Use `loading="lazy"` on images below the fold for performance.
- Lightbox supports keyboard: Escape closes, Tab navigates controls.
- Multiple images with `data-preview` share a single dialog instance.
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
