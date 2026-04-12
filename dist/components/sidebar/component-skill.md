# Sidebar

## Native basis

`<aside>` + `<nav>` + `<dialog>` for a full application sidebar with collapsible state, mobile sheet overlay, collapsible groups, submenus, and keyboard shortcut.

## Native Web APIs

- [`<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) — complementary content landmark
- [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) — navigation landmark for assistive technology
- [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — native modal for mobile sidebar overlay
- [`<details>/<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) — collapsible groups and submenus without JS toggle logic
- [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop) — dialog overlay styling
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — slide-in animation for mobile dialog
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring on nav links
- [`overscroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior) — prevents scroll chaining in nav area
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses all transitions

## Structure

### Full application layout
```html
<div class="sidebar-layout">
  <aside class="app-sidebar" id="main-sidebar" data-state="expanded">
    <div class="sidebar-header">
      <a class="sidebar-logo" href="/">
        <i data-lucide="command"></i>
        <span class="sidebar-logo-text">MyApp</span>
      </a>
    </div>
    <div class="sidebar-content">
      <details class="sidebar-group" open>
        <summary>
          <span>Platform</span>
          <i data-lucide="chevron-right"></i>
        </summary>
        <nav class="sidebar-nav">
          <a class="sidebar-link" href="#" aria-current="page">
            <i data-lucide="home"></i> <span>Dashboard</span>
          </a>
          <a class="sidebar-link" href="#">
            <i data-lucide="inbox"></i> <span>Inbox</span>
            <span class="sidebar-badge">12</span>
          </a>
          <details class="sidebar-submenu">
            <summary>
              <i data-lucide="settings"></i> <span>Settings</span>
              <i data-lucide="chevron-right"></i>
            </summary>
            <nav class="sidebar-nav">
              <a class="sidebar-link" href="#"><span>General</span></a>
              <a class="sidebar-link" href="#"><span>Team</span></a>
            </nav>
          </details>
        </nav>
      </details>
    </div>
    <div class="sidebar-footer">user@example.com</div>
  </aside>

  <dialog class="sidebar-mobile" id="mobile-sidebar">
    <button class="sidebar-mobile-close" aria-label="Close">
      <i data-lucide="x"></i>
    </button>
    <!-- same nav content as desktop -->
  </dialog>

  <main style="flex:1;min-width:0;">
    <button class="sidebar-trigger" data-sidebar-trigger="main-sidebar">
      <i data-lucide="panel-left"></i>
    </button>
  </main>
</div>
```

## Variants

| `data-state`   | Width    | Behavior                              |
| -------------- | -------- | ------------------------------------- |
| `expanded`     | 16rem    | Full sidebar with labels              |
| `collapsed`    | 3.5rem   | Icons only, text hidden               |

| `data-side`    | Position                              |
| -------------- | ------------------------------------- |
| *(none)*       | Left (default)                        |
| `right`        | Right side, border on left            |

## ARIA

| Attribute        | Element            | Purpose                            |
| ---------------- | ------------------ | ---------------------------------- |
| `<aside>`        | `.app-sidebar`     | Complementary landmark             |
| `<nav>`          | `.sidebar-nav`     | Navigation landmark                |
| `aria-current`   | `.sidebar-link`    | `"page"` for current page link     |
| `<dialog>`       | `.sidebar-mobile`  | Modal with focus trap + Escape     |

## Keyboard

| Key          | Action                                |
| ------------ | ------------------------------------- |
| `Cmd+B`      | Toggle sidebar collapse (macOS)       |
| `Ctrl+B`     | Toggle sidebar collapse (Windows)     |
| `Escape`     | Close mobile sidebar (native dialog)  |

## Notes

- **Mobile**: Desktop sidebar hidden below 768px. Use `<dialog class="sidebar-mobile">` for slide-in sheet.
- **Collapsible groups**: `<details class="sidebar-group">` — native toggle, no JS.
- **Submenus**: `<details class="sidebar-submenu">` for nested nav with left border.
- **Badges**: `<span class="sidebar-badge">` for notification counts.
- **Collapsed state**: Labels, titles, badges, footer, logo text hidden — icons remain.
- **Sidebar tokens**: Uses `--sidebar-*` token group.
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
