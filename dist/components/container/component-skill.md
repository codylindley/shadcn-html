# Container

## Native basis

`<div>` with `max-width` and auto margins for centered page content.

## Native Web APIs

- [`max-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width) — constrains content width
- [`margin-inline: auto`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline) — logical centering (RTL-safe)

## Structure

### Default
```html
<div class="container"><!-- page content --></div>
```

### With size variant
```html
<div class="container" data-size="sm"><!-- narrow content --></div>
<div class="container" data-size="lg"><!-- wide content --></div>
```

## Variants

### Size (`data-size`)

| Value       | Max width | Use case                |
| ----------- | --------- | ----------------------- |
| `sm`        | 40rem     | Blog posts, articles    |
| `md`        | 48rem     | Forms, narrow layouts   |
| *(default)* | 64rem     | Standard page content   |
| `lg`        | 80rem     | Dashboards, wide layouts|
| `xl`        | 96rem     | Full-width applications |

## Notes

- Uses `padding-left/right: 1rem` for consistent gutters.
- Centers itself with `margin-left/right: auto`.
- Pure CSS — no JavaScript required.
- Container queries (`container-type: inline-size`, `@container`) can be used on containers for component-level responsiveness.
