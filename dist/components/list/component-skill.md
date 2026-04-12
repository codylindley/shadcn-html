# List

## Native basis

`<ul>` and `<ol>` elements with styled list items. Supports icon-prefixed items.

## Native Web APIs

- [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) — unordered list
- [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) — ordered list
- [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) — list item

## Structure

```html
<!-- Basic unordered list -->
<ul class="list">
  <li class="list-item">Item one</li>
  <li class="list-item">Item two</li>
  <li class="list-item">Item three</li>
</ul>

<!-- Ordered list -->
<ol class="list">
  <li class="list-item">First step</li>
  <li class="list-item">Second step</li>
  <li class="list-item">Third step</li>
</ol>

<!-- List with icons -->
<ul class="list" data-variant="icon">
  <li class="list-item">
    <svg><!-- check icon --></svg>
    <span>Feature included</span>
  </li>
</ul>
```

## Variants (`data-variant`)

| Value    | Description                              |
|----------|------------------------------------------|
| `default`| Standard bullet/number list              |
| `icon`   | Icon-prefixed items, no bullets          |
| `none`   | No markers, clean layout                 |

## Accessibility

- Lists convey structure to screen readers automatically
- Use `<ul>` for unordered content, `<ol>` for sequential/ranked content
