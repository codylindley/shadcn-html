# Pattern: Label

## Native basis
`<label>` element. Browser provides built-in click-to-focus association with form controls.

---

## Native Web APIs
- [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) — associates text with a form control via `for`/`id`
- [`:has()` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — auto-detects disabled state from adjacent control
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode support

---

## Structure

### Basic
```html
<label class="label" for="email">Email</label>
<input class="input" id="email" type="email">
```

### With required indicator
```html
<label class="label" for="name">
  Name <span aria-hidden="true" class="text-destructive">*</span>
</label>
<input class="input" id="name" type="text" required>
```

### With optional indicator
```html
<label class="label" for="bio">
  Bio <span class="label-hint">(optional)</span>
</label>
<textarea class="input" id="bio"></textarea>
```

### Disabled (explicit)
```html
<label class="label" data-disabled for="disabled-field">Disabled field</label>
<input class="input" id="disabled-field" disabled>
```

### Disabled (auto-detected)
The label auto-dims when the adjacent control is disabled — no `data-disabled` needed:
```html
<label class="label" for="auto-disabled">Auto-disabled</label>
<input class="input" id="auto-disabled" disabled>
```

### With checkbox (inline)
```html
<div class="flex items-center gap-2">
  <input class="checkbox" type="checkbox" id="terms">
  <label class="label" for="terms" style="margin:0;">Accept terms and conditions</label>
</div>
```

### With switch (inline)
```html
<div class="flex items-center gap-2">
  <input class="switch" type="checkbox" role="switch" id="airplane">
  <label class="label" for="airplane" style="margin:0;">Airplane Mode</label>
</div>
```

### Form field (label + input + description)
```html
<div>
  <label class="label" for="username">Username</label>
  <input class="input" id="username" type="text" placeholder="shadcn">
  <p class="field-description">This is your public display name.</p>
</div>
```

---

## Accessibility

| Attribute | When | Value |
|-----------|------|-------|
| `for` | Always | Matches the `id` of the associated form control |

- Clicking the label focuses the associated input — this is native `<label>` behavior.
- The required indicator `*` uses `aria-hidden="true"` since the `required` attribute on the input already conveys the requirement to assistive technology.
- Do not use `<label>` without a `for` attribute or a nested input.
- In `forced-colors` mode, label text maps to system `LinkText` color.

---

## Notes

- The `.label` class is intentionally minimal — it styles the label text with appropriate font size, weight, and color.
- Labels auto-detect disabled state from adjacent controls via `:has(+ :disabled)` — the explicit `data-disabled` attribute is also supported.
- For inline use with checkboxes, switches, or radios, add `style="margin:0;"` to remove the default bottom margin.
- Labels compose with Input, Textarea, Select, Checkbox, Radio, Switch, and all other form controls.
