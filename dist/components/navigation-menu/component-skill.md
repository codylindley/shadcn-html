# Navigation Menu

## Native basis

`<nav>` + `<ul>` for site-level navigation with dropdown panels.

## Native Web APIs

- [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark
- [`popover` API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — dropdown panels

## Structure

```html
<nav class="nav-menu" aria-label="Main">
  <ul class="nav-menu-list">
    <li class="nav-menu-item"><a class="nav-menu-link" href="#">Home</a></li>
    <li class="nav-menu-item">
      <button class="nav-menu-trigger" popovertarget="nav-dd">Products</button>
      <div class="nav-menu-content" id="nav-dd" popover>...</div>
    </li>
  </ul>
</nav>
```
