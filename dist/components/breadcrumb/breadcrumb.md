# Breadcrumb

## Native basis

`<nav>` + `<ol>` for hierarchical path display.

## Native Web APIs

- [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark
- [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) — ordered list

## Structure

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item"><a class="breadcrumb-link" href="#">Home</a></li>
    <li class="breadcrumb-separator" aria-hidden="true">/</li>
    <li class="breadcrumb-item"><span class="breadcrumb-page" aria-current="page">Current</span></li>
  </ol>
</nav>
```
