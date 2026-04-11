# Popover

## Native basis

Popover API with CSS for positioning.

## Native Web APIs

- [`popover` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) — native popover API
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation

## Structure

```html
<button class="btn" data-variant="outline" popovertarget="my-popover">Open Popover</button>

<div class="popover" id="my-popover" popover>
  <div class="popover-header">
    <p class="popover-title">Dimensions</p>
    <p class="popover-description">Set the dimensions for the layer.</p>
  </div>
  <div class="popover-content"><!-- content --></div>
</div>
```
