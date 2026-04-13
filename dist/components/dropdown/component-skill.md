# Pattern: Dropdown Menu

## Native basis
`popover` API + `<button>` trigger. The browser provides light-dismiss
(click outside to close) and top-layer rendering.
Requires JavaScript for keyboard navigation and ARIA management.

---

## Native Web APIs
- [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — top-layer rendering and light-dismiss (click outside to close)
- [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) — positions dropdown relative to trigger without JavaScript
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation for popover
- [WAI-ARIA Menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) — keyboard navigation and role contract for menu items
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses open/close animation
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — maps border and highlight to system colors

---

## Structure

```html
<!-- Trigger -->
<button class="btn" data-variant="outline"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="my-menu"
        data-dropdown-trigger="my-menu">
  Options
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2">
    <path d="m6 9 6 6 6-6"/>
  </svg>
</button>

<!-- Menu -->
<div id="my-menu" role="menu" popover
     class="dropdown-content"
     aria-label="Options menu">

  <div role="group" aria-label="Navigation">
    <button role="menuitem" class="dropdown-item" tabindex="-1">
      Profile
    </button>
    <button role="menuitem" class="dropdown-item" tabindex="-1">
      Settings
    </button>
  </div>

  <div class="dropdown-separator" role="separator"></div>

  <div role="group" aria-label="Actions">
    <button role="menuitem" class="dropdown-item" tabindex="-1">
      <svg aria-hidden="true" width="16" height="16">...</svg>
      Export
      <span class="dropdown-shortcut">⌘E</span>
    </button>
    <button role="menuitem" class="dropdown-item" data-variant="destructive" tabindex="-1">
      Delete
    </button>
  </div>
</div>
```

---

## ARIA

| Attribute                  | Where            | Value                         |
|----------------------------|------------------|-------------------------------|
| `role="menu"`              | menu container   | Always                        |
| `role="menuitem"`          | each item        | Always                        |
| `role="separator"`         | dividers         | Always                        |
| `role="group"`             | item groups      | Optional, with `aria-label`   |
| `aria-haspopup="menu"`    | trigger button   | Always                        |
| `aria-expanded`            | trigger button   | `true` when open, `false` when closed |
| `aria-controls`            | trigger button   | ID of menu element            |
| `aria-label`               | menu container   | Description of menu purpose   |
| `tabindex="-1"`            | each menuitem    | Items not in tab order — use arrow keys |
| `data-highlighted`         | focused item     | Set by JS for styling          |

---

## Animations

```css
@layer components {
  .dropdown-content {
    opacity: 0;
    transform: scale(0.96) translateY(-0.25rem);
    transition: opacity 150ms ease, transform 150ms ease,
                display 150ms allow-discrete;

    &:popover-open {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @starting-style {
    .dropdown-content:popover-open {
      opacity: 0;
      transform: scale(0.96) translateY(-0.25rem);
    }
  }
}
```

---

## Checkbox and radio items

For checkbox/radio items in the menu, use `aria-checked`:

```html
<!-- Checkbox item -->
<button role="menuitemcheckbox" class="dropdown-item"
        aria-checked="true" tabindex="-1">
  <svg class="dropdown-check" aria-hidden="true" width="16" height="16">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
  Show Sidebar
</button>

<!-- Radio group -->
<div role="group" aria-label="Sort order">
  <div class="dropdown-label">Sort by</div>
  <button role="menuitemradio" class="dropdown-item"
          aria-checked="true" tabindex="-1">
    <svg class="dropdown-check" aria-hidden="true">...</svg>
    Date
  </button>
  <button role="menuitemradio" class="dropdown-item"
          aria-checked="false" tabindex="-1">
    Name
  </button>
</div>
```

---

## Notes

- Always use `popover` attribute for the menu — it renders in the top layer and avoids overflow clipping
- CSS anchor positioning (`position-anchor`, `anchor()`) handles placement — no JS positioning needed
- `position-try: flip-block` automatically flips the menu above the trigger if there's no room below
- The `popover` API handles light-dismiss (click outside) automatically
- For submenus, nest another `[popover]` element triggered by a `menuitem` with `aria-haspopup="menu"`
- Escape closes the menu and returns focus to the trigger
- Menu items use `tabindex="-1"` — only arrow keys move focus (roving focus pattern)
