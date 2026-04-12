# Progress

## Native basis

`<progress>` element with CSS styling for the track and indicator bar.

## Native Web APIs

- [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) — native HTML progress indicator
- [`::-webkit-progress-bar`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-progress-bar) — track pseudo-element (WebKit)
- [`::-webkit-progress-value`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-progress-value) — indicator pseudo-element (WebKit)
- [`::-moz-progress-bar`](https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-progress-bar) — indicator pseudo-element (Firefox)

## Structure

```html
<!-- Determinate progress -->
<progress class="progress" value="66" max="100">66%</progress>

<!-- Indeterminate progress (no value attribute) -->
<progress class="progress" max="100">Loading...</progress>
```

## Accessibility

- `<progress>` is natively accessible — screen readers announce the percentage
- The text content inside `<progress>` is the fallback for non-supporting browsers
- Use `aria-label` if the progress bar lacks a visible label
