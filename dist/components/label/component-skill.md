# Pattern: Label

## Native basis
`<label>` element. Browser provides built-in click-to-focus association with form controls.

---

## Native Web APIs
- [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) — associates text with a form control via `for`/`id`
- [`:has()` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — parent styling that reacts to associated input state

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

### Disabled
```html
<label class="label label-disabled" for="disabled-field">Disabled field</label>
<input class="input" id="disabled-field" disabled>
```

---

## Accessibility

| Attribute | When | Value |
|-----------|------|-------|
| `for` | Always | Matches the `id` of the associated form control |

- Clicking the label focuses the associated input — this is native `<label>` behavior.
- The required indicator `*` uses `aria-hidden="true"` since the `required` attribute on the input already conveys the requirement to assistive technology.
- Do not use `<label>` without a `for` attribute or a nested input.

---

## Notes

- The `.label` class is intentionally minimal — it styles the label text and provides a `:has()` enhancement to respond to focused inputs.
- The label already exists in `input.css` as `label.label` — this component extracts it into its own file for standalone use.
- Labels compose with Input, Textarea, Select, Checkbox, Radio, Switch, and all other form controls.
