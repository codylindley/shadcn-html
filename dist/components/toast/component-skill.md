# Pattern: Toast

## Native basis
`popover` API for top-layer rendering and non-modal behavior.
Requires JavaScript for triggering, auto-dismiss, stacking, and ARIA live
region announcements. Follows `role="status"` with `aria-live="polite"`.

---

## Native Web APIs
- [Popover API (`popover="manual"`)](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — top-layer rendering without light-dismiss for persistent notifications
- [`aria-live` regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) — announces toast content changes to screen readers

---

## Structure

```html
<!-- Toast container — place once in the page -->
<div id="toast-container"
     class="toast-container"
     aria-label="Notifications"
     data-position="bottom-right">
</div>

<!-- Individual toast (injected by JS) -->
<div class="toast" role="status" aria-live="polite" aria-atomic="true"
     popover="manual">
  <div class="toast-content">
    <div class="toast-text">
      <p class="toast-title">Event created</p>
      <p class="toast-description">Monday, January 3rd at 6:00pm</p>
    </div>
    <button class="toast-close" aria-label="Dismiss" data-toast-close>
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
  <div class="toast-actions">
    <button class="btn" data-variant="outline" data-size="sm"
            data-toast-action>Undo</button>
  </div>
</div>
```

### Variant: with icon

```html
<div class="toast" data-variant="success" role="status"
     aria-live="polite" popover="manual">
  <div class="toast-content">
    <svg class="toast-icon" aria-hidden="true" width="16" height="16">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
    <div class="toast-text">
      <p class="toast-title">Saved successfully</p>
    </div>
    <button class="toast-close" aria-label="Dismiss" data-toast-close>
      <svg aria-hidden="true" width="14" height="14">...</svg>
    </button>
  </div>
</div>
```

---

## ARIA

| Attribute           | Where            | Value                       |
|---------------------|------------------|-----------------------------|
| `role="status"`     | each toast       | Implicit live region        |
| `aria-live="polite"`| each toast       | Screen reader announces it  |
| `aria-atomic="true"`| each toast       | Announce entire toast, not just changes |
| `aria-label`        | toast container  | e.g. "Notifications"       |

---

## Positions

Set `data-position` on the `.toast-container`:
- `bottom-right` (default)
- `bottom-left`
- `bottom-center`
- `top-right`
- `top-left`
- `top-center`

---

## Auto-dismiss timing

| Behavior    | Duration value     |
|-------------|-------------------|
| Default     | `4000` (4 seconds)|
| Long        | `8000`            |
| Persistent  | `Infinity`        |

---

## Notes

- The toast container should be a direct child of `<body>`
- Toasts use `popover="manual"` so they don't auto-dismiss on outside click
- The stacking order is newest on top (CSS `flex-direction: column-reverse` for bottom positions)
- Maximum visible toasts defaults to 3 — older toasts are dismissed
- Swipe-to-dismiss can be added with touch event handling but is not required for MVP
- For forms, show success/error toasts after submission rather than inline messages
- The `toast()` API is imperative — call it from any event handler
