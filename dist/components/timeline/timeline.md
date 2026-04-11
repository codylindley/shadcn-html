# Timeline

## Native basis

`<ol>` element with timeline items connected by a vertical line.

## Native Web APIs

- [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) — ordered list conveying sequence
- [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) — pseudo-element for connector line and dot

## Structure

```html
<ol class="timeline">
  <li class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <p class="timeline-title">Event title</p>
      <p class="timeline-description">Event description text.</p>
      <time class="timeline-time">January 2024</time>
    </div>
  </li>
  <li class="timeline-item">
    <div class="timeline-dot" data-variant="active"></div>
    <div class="timeline-content">
      <p class="timeline-title">Current event</p>
      <p class="timeline-description">This is the current step.</p>
      <time class="timeline-time">March 2024</time>
    </div>
  </li>
</ol>
```

## Dot variants (`data-variant`)

| Value     | Description                     |
|-----------|---------------------------------|
| `default` | Muted dot (default)             |
| `active`  | Primary-colored dot             |

## Accessibility

- `<ol>` provides sequential ordering for screen readers
- `<time>` element used for machine-readable dates
