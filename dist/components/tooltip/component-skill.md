# Tooltip

## Native basis

Popover API for hover/focus hints.

## Native Web APIs

- [`popover` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) — native popover
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation

## Structure

```html
<button class="btn" data-tooltip-trigger="my-tip">Hover me</button>
<div class="tooltip" id="my-tip" popover="hint" role="tooltip">Tooltip text</div>
```
