# Carousel

## Native basis

CSS scroll-snap for snap points with navigation buttons and keyboard support.

## Native Web APIs

- [`scroll-snap-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) — mandatory snap scrolling
- [`scroll-snap-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align) — snap point alignment per slide
- [`overscroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior) — prevents scroll chaining to parent
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring on nav buttons
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses smooth scroll for users who prefer reduced motion

## Structure

### Horizontal (default)
```html
<div class="carousel">
  <div class="carousel-viewport">
    <div class="carousel-slide">Slide 1</div>
    <div class="carousel-slide">Slide 2</div>
    <div class="carousel-slide">Slide 3</div>
  </div>
  <button class="carousel-prev" aria-label="Previous slide">
    <i data-lucide="chevron-left"></i>
  </button>
  <button class="carousel-next" aria-label="Next slide">
    <i data-lucide="chevron-right"></i>
  </button>
</div>
```

### Vertical
```html
<div class="carousel" data-orientation="vertical">
  <div class="carousel-viewport">
    <div class="carousel-slide">Slide 1</div>
    <div class="carousel-slide">Slide 2</div>
  </div>
  <button class="carousel-prev" aria-label="Previous slide">
    <i data-lucide="chevron-up"></i>
  </button>
  <button class="carousel-next" aria-label="Next slide">
    <i data-lucide="chevron-down"></i>
  </button>
</div>
```

## Variants

| `data-orientation` | Direction  | Keyboard       |
| ------------------ | ---------- | -------------- |
| *(default)*        | Horizontal | ← → arrows    |
| `vertical`         | Vertical   | ↑ ↓ arrows    |

## ARIA

| Attribute       | Element          | Purpose                        |
| --------------- | ---------------- | ------------------------------ |
| `aria-label`    | `.carousel-prev` | Announces "Previous slide"     |
| `aria-label`    | `.carousel-next` | Announces "Next slide"         |
| `tabindex="0"`  | `.carousel`      | Makes carousel keyboard-focusable (set by JS) |

## Notes

- **Keyboard navigation**: Arrow keys scroll the carousel when focused. Left/Right for horizontal, Up/Down for vertical.
- **Reduced motion**: `prefers-reduced-motion: reduce` disables smooth scrolling and transitions.
- **Scroll containment**: `overscroll-behavior-x: contain` prevents page scroll when reaching carousel edges.
- **Slide sizing**: Set `flex: 0 0 50%` or similar on `.carousel-slide` to show multiple slides at once.
- **No library**: Built on CSS scroll-snap — no Embla, Swiper, or any library needed.
