# Collapsible

## Native basis

`<details>` element providing native expand/collapse behavior with animated transitions.

## Native Web APIs

- [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) — native disclosure widget
- [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) — visible heading/trigger
- [`::details-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/::details-content) — pseudo-element for content animation
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation starting values

## Structure

```html
<details class="collapsible">
  <summary class="collapsible-trigger">
    <span>Click to expand</span>
    <svg class="collapsible-chevron"><!-- chevron icon --></svg>
  </summary>
  <div class="collapsible-content">
    <p>Collapsible content goes here.</p>
  </div>
</details>
```

## Accessibility

- `<details>`/`<summary>` is natively accessible — keyboard and screen reader support built in
- No additional ARIA attributes needed
- Summary text should clearly describe the hidden content
