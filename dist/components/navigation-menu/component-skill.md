# Navigation Menu

## Native basis

`<nav>` + `<ul>` for site-level navigation with dropdown panels.

## Native Web APIs

- [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark
- [`popover` API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — dropdown panels without JS show/hide
- [`popovertarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#popovertarget) — declarative button→popover trigger
- [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) — positions dropdown relative to trigger
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation for popover
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring
- [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — rotates chevron when dropdown is open
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses animations
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — maps dropdown border to system color

---

## Structure

```html
<nav class="nav-menu" aria-label="Main">
  <ul class="nav-menu-list">
    <li class="nav-menu-item"><a class="nav-menu-link" href="#">Home</a></li>
    <li class="nav-menu-item">
      <button class="nav-menu-trigger" popovertarget="nav-dd">
        Products
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="nav-menu-content" id="nav-dd" popover>
        <a class="nav-menu-content-link" href="#">
          <strong>Analytics</strong>
          <p>View your dashboard</p>
        </a>
        <a class="nav-menu-content-link" href="#">
          <strong>Reports</strong>
          <p>Generate custom reports</p>
        </a>
      </div>
    </li>
  </ul>
</nav>
```

---

## ARIA

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `aria-label` | `<nav>` | Accessible name for the navigation |
| `aria-hidden="true"` | chevron `<svg>` | Decorative indicator, hidden from screen readers |

---

## Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Moves focus between nav items |
| `Enter` / `Space` | Opens dropdown (on trigger) |
| `Escape` | Closes dropdown (native popover behavior) |

---

## Notes

- The `popover` API handles open/close — no JS click handlers needed.
- `popovertarget` on the button declaratively toggles the popover. No `togglePopover()` calls.
- CSS anchor positioning aligns the dropdown to its trigger. The JS only sets unique `anchor-name` / `position-anchor` pairs.
- The chevron rotates via `:has(+ .nav-menu-content:popover-open)` — no JS class toggling.
- Icon-only triggers must have `aria-label`.
- Dropdown content typically contains `nav-menu-content-link` items with a title and optional description.
