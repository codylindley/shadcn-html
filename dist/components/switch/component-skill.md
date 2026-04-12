# Pattern: Switch

## Native basis
`<input type="checkbox" role="switch">` element styled as a toggle switch.

---

## Native Web APIs
- [`<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) — native toggle control
- [`role="switch"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role) — communicates on/off semantics
- [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) — matches the on state

---

## Structure

```html
<div class="flex items-center gap-2">
  <input class="switch" type="checkbox" role="switch" id="airplane">
  <label for="airplane">Airplane Mode</label>
</div>
```

---

## Sizes

| `data-size` | Track width | Track height |
|-------------|-------------|--------------|
| `sm`        | `1.75rem`   | `1rem`       |
| *(default)* | `2.25rem`   | `1.25rem`    |

---

## Accessibility

- `role="switch"` tells screen readers this is an on/off toggle, not a checkbox.
- `aria-checked` is automatically set by the browser for `type="checkbox"`.
- Use `<label>` with `for` to associate the label text.

---

## Notes

- Pure CSS — no JavaScript needed.
- The thumb slides via `:checked` and `translateX()`.
- Uses `appearance: none` with `::after` for the thumb.
