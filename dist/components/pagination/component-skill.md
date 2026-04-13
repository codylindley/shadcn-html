# Pagination

## Native basis

`<nav>` + `<ul>` + `<a>` links for page navigation. Pure CSS — no JavaScript required.

---

## Native Web APIs

- [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark for screen readers
- [`aria-current="page"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) — identifies the active page
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses hover transitions
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) — thickens borders when high-contrast requested
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — maps active page border and hover to system colors

---

## Structure

```html
<nav class="pagination" aria-label="Pagination">
  <ul class="pagination-list">
    <li><a class="pagination-prev" href="#" aria-label="Go to previous page">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
      Previous
    </a></li>
    <li><a class="pagination-link" href="#">1</a></li>
    <li><a class="pagination-link pagination-active" href="#" aria-current="page">2</a></li>
    <li><a class="pagination-link" href="#">3</a></li>
    <li><span class="pagination-ellipsis" aria-hidden="true">&hellip;</span></li>
    <li><a class="pagination-next" href="#" aria-label="Go to next page">
      Next
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
    </a></li>
  </ul>
</nav>
```

### Simple (page numbers only)

```html
<nav class="pagination" aria-label="Pagination">
  <ul class="pagination-list">
    <li><a class="pagination-link" href="#">1</a></li>
    <li><a class="pagination-link pagination-active" href="#" aria-current="page">2</a></li>
    <li><a class="pagination-link" href="#">3</a></li>
    <li><a class="pagination-link" href="#">4</a></li>
    <li><a class="pagination-link" href="#">5</a></li>
  </ul>
</nav>
```

### Icons only (compact)

```html
<nav class="pagination" aria-label="Pagination">
  <ul class="pagination-list">
    <li><a class="pagination-prev" href="#" aria-label="Go to previous page" aria-disabled="true">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
    </a></li>
    <li><span style="font-size:0.875rem;color:var(--muted-foreground);padding:0 0.5rem;">Page 1 of 10</span></li>
    <li><a class="pagination-next" href="#" aria-label="Go to next page">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
    </a></li>
  </ul>
</nav>
```

---

## ARIA

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `aria-label="Pagination"` | `<nav>` | Names the navigation region |
| `aria-current="page"` | Active link | Identifies the current page |
| `aria-label="Go to previous/next page"` | Prev/Next | Descriptive label for icon-only triggers |
| `aria-disabled="true"` | Prev/Next | Disables at page boundaries |
| `aria-hidden="true"` | Ellipsis `<span>` | Hides decorative ellipsis from screen readers |

---

## Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the next pagination link |
| `Shift + Tab` | Moves focus to the previous pagination link |
| `Enter` | Activates the focused link |

All links are native `<a>` elements — keyboard navigation works automatically.

---

## Notes

- Use `<a>` elements for page links — they support native keyboard focus and navigation.
- Mark the active page with `aria-current="page"` and the `.pagination-active` class.
- On the first page, add `aria-disabled="true"` to the Previous link. On the last page, add it to Next.
- Use `<span class="pagination-ellipsis" aria-hidden="true">` for the "…" indicator — it's not a link.
- Chevron SVG icons are preferred over text arrows for visual consistency.
- CSS uses logical properties (`padding-inline`) for automatic RTL support.
- No JavaScript required — this is a purely CSS component.
