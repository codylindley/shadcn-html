# Sidebar

## Native basis

`<aside>` + `<nav>` for application sidebar navigation with collapsible state.

## Native Web APIs

- [`<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) — complementary content landmark
- [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark for assistive technology
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring on nav links
- [`overscroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior) — prevents scroll chaining in nav area
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses width transition

## Structure

```html
<aside class="app-sidebar">
  <div class="sidebar-header">
    <span class="sidebar-logo">App</span>
  </div>
  <nav class="sidebar-nav">
    <span class="sidebar-section-title">Main</span>
    <a class="sidebar-link" data-active="true" href="#">
      <i data-lucide="home"></i> Dashboard
    </a>
    <a class="sidebar-link" href="#">
      <i data-lucide="settings"></i> Settings
    </a>
  </nav>
  <div class="sidebar-footer">
    <p>© 2026 App</p>
  </div>
</aside>
```

### Collapsed
```html
<aside class="app-sidebar" data-state="collapsed">
  <!-- content truncates at 3.5rem width -->
</aside>
```

## Variants

| `data-state`   | Width    | Behavior                    |
| -------------- | -------- | --------------------------- |
| *(default)*    | 16rem    | Full sidebar with labels    |
| `collapsed`    | 3.5rem   | Icons only, overflow hidden |

## ARIA

- `<aside>` provides complementary landmark automatically.
- `<nav>` provides navigation landmark automatically.
- Active link uses `data-active="true"` for styling; consider `aria-current="page"` for better screen reader support.

## Notes

- Sidebar uses design tokens from the `--sidebar-*` token group.
- The nav area has `overflow-y: auto` and `overscroll-behavior: contain` for scroll containment.
- Width transition is suppressed for users who prefer reduced motion.
- Pure CSS — no JavaScript required for rendering. Collapse toggle would need JS to toggle `data-state`.
