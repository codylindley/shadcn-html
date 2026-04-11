# Pagination

## Native basis

`<nav>` + links for page navigation.

## Native Web APIs

- [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark

## Structure

```html
<nav class="pagination" aria-label="Pagination">
  <ul class="pagination-list">
    <li><a class="pagination-prev" href="#">Previous</a></li>
    <li><a class="pagination-link" href="#">1</a></li>
    <li><a class="pagination-link pagination-active" href="#" aria-current="page">2</a></li>
    <li><a class="pagination-next" href="#">Next</a></li>
  </ul>
</nav>
```
