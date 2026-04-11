# Descriptions

## Native basis

`<dl>` (description list) element with `<dt>` (term) and `<dd>` (details) pairs.

## Native Web APIs

- [`<dl>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) — description list
- [`<dt>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt) — term/name
- [`<dd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) — value/details

## Structure

```html
<!-- Vertical descriptions (default) -->
<dl class="descriptions">
  <div class="descriptions-item">
    <dt class="descriptions-term">Name</dt>
    <dd class="descriptions-detail">John Doe</dd>
  </div>
  <div class="descriptions-item">
    <dt class="descriptions-term">Email</dt>
    <dd class="descriptions-detail">john@example.com</dd>
  </div>
</dl>

<!-- Horizontal descriptions -->
<dl class="descriptions" data-layout="horizontal">
  <div class="descriptions-item">
    <dt class="descriptions-term">Name</dt>
    <dd class="descriptions-detail">John Doe</dd>
  </div>
</dl>
```

## Layout (`data-layout`)

| Value        | Description                          |
|--------------|--------------------------------------|
| `vertical`   | Terms stacked above details (default)|
| `horizontal` | Terms beside details in a row        |

## Accessibility

- `<dl>` is natively accessible — screen readers announce term-detail associations
- Wrapping `<dt>`/`<dd>` pairs in `<div>` is valid HTML and aids styling
