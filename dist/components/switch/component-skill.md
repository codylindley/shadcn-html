# Pattern: Switch

## Native basis
`<input type="checkbox" role="switch">` element styled as a toggle switch.

---

## Native Web APIs
- [`<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) — native toggle control
- [`role="switch"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role) — communicates on/off semantics
- [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) — matches the on state
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring
- [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — parent-state styling for disabled label
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppress transitions for motion-sensitive users
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode support

---

## Structure

### Default

```html
<div class="switch-item flex items-center gap-2">
  <input class="switch" type="checkbox" role="switch" id="airplane">
  <label for="airplane">Airplane Mode</label>
</div>
```

### With description

```html
<div class="switch-item" style="display:grid;grid-template-columns:1fr auto;gap:0 0.75rem;align-items:center;">
  <label for="share" style="font-size:0.875rem;font-weight:500;">Share across devices</label>
  <input class="switch" type="checkbox" role="switch" id="share" style="grid-row:1/3;">
  <span style="font-size:0.8125rem;color:var(--muted-foreground);">Sync settings across all your devices.</span>
</div>
```

---

## Sizes

| `data-size` | Track width | Track height |
|-------------|-------------|--------------|
| `sm`        | `1.75rem`   | `1rem`       |
| *(default)* | `2.25rem`   | `1.25rem`    |

---

## ARIA

| Attribute | Element | Purpose |
|---|---|---|
| `type="checkbox"` | `<input>` | Native toggle behavior |
| `role="switch"` | `<input>` | Communicates on/off semantics |
| `checked` | `<input>` | Default on state |
| `disabled` | `<input>` | Disables interaction |
| `aria-invalid="true"` | `<input>` | Marks invalid/error state |
| `<label for="...">` | `<label>` | Associates label with switch |

### Keyboard

| Key | Action |
|---|---|
| `Space` | Toggle the switch on/off |
| `Tab` / `Shift+Tab` | Move focus to/from the switch |

---

## Notes

- Pure CSS — no JavaScript needed.
- The thumb slides via `:checked` and `translateX()`.
- Uses `appearance: none` with `::after` for the thumb.
- Wrap in `.switch-item` for automatic disabled label styling via `:has(.switch:disabled)`.
- `aria-invalid="true"` shows the track in the destructive color.
