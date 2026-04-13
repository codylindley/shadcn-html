# Pattern: Form

## Native basis
`<form>` element with consistent field layout using Label, Input, and description/error helpers. Composes with all form control components (Input, Textarea, Select, Checkbox, Radio, Switch, Slider, etc.).

---

## Native Web APIs
- [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) — native form with submission, validation, and reset
- [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) — groups related fields with `<legend>`
- [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) — native browser validation (`required`, `pattern`, `min`, `max`, `minlength`, `maxlength`)
- [`:user-valid` / `:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) — post-interaction validation styling without JS
- [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) — connects descriptions and errors to inputs
- [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid) — marks invalid form controls for assistive technology
- [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) — native form serialization

---

## Structure

### Default form
```html
<form class="form">
  <div class="form-field">
    <label class="label" for="f-name">Name</label>
    <input class="input" type="text" id="f-name" required>
    <p class="field-description">Your full name.</p>
  </div>
  <div class="form-field">
    <label class="label" for="f-email">Email</label>
    <input class="input" type="email" id="f-email" required>
  </div>
  <div class="form-actions">
    <button class="btn" type="submit" data-variant="default">Submit</button>
    <button class="btn" type="reset" data-variant="outline">Reset</button>
  </div>
</form>
```

### Inline field (checkbox, switch)
```html
<div class="form-field-inline">
  <input class="checkbox" type="checkbox" id="terms">
  <label for="terms">Accept terms</label>
</div>
```

### Horizontal field (label beside control)
```html
<div class="form-field" data-orientation="horizontal">
  <label class="label" for="f-user">Username</label>
  <div>
    <input class="input" type="text" id="f-user">
    <p class="field-description">Your public display name.</p>
  </div>
</div>
```

### Switch row (notification-style)
```html
<div class="form-field-row">
  <div>
    <label class="label" for="f-marketing">Marketing emails</label>
    <p class="field-description">Receive emails about new products and features.</p>
  </div>
  <input class="switch" type="checkbox" role="switch" id="f-marketing">
</div>
```

### Fieldset grouping
```html
<fieldset class="form-fieldset">
  <legend>Notifications</legend>
  <p class="field-description">Choose what you want to be notified about.</p>
  <div class="form-group">
    <div class="form-field-inline">
      <input class="checkbox" type="checkbox" id="opt-1">
      <label for="opt-1">All new messages</label>
    </div>
    <div class="form-field-inline">
      <input class="checkbox" type="checkbox" id="opt-2">
      <label for="opt-2">Direct messages only</label>
    </div>
  </div>
</fieldset>
```

### Invalid field with error
```html
<div class="form-field" data-invalid>
  <label class="label" for="f-email">Email</label>
  <input class="input" type="email" id="f-email" aria-invalid="true" aria-describedby="f-email-err">
  <p class="field-error" id="f-email-err" role="alert">Please enter a valid email address.</p>
</div>
```

---

## Data Attributes

| Attribute | Element | Values | Description |
|---|---|---|---|
| `data-orientation` | `.form-field` | `horizontal` | Places label beside the control instead of stacked above |
| `data-invalid` | `.form-field` | (presence) | Marks field as invalid — description text turns destructive color |
| `data-disabled` | `.form-field-row` | (presence) | Reduces opacity on the row |

---

## ARIA

| Attribute | Element | Purpose |
|---|---|---|
| `for` / `id` | `<label>` → `<input>` | Associates label with control |
| `aria-describedby` | `<input>` | Points to `.field-description` or `.field-error` `id` |
| `aria-invalid="true"` | `<input>` | Marks control as invalid for assistive technology |
| `role="alert"` | `.field-error` | Announces error messages to screen readers |
| `role="group"` | container | Groups related controls (optional on `.form-field`) |
| `required` | `<input>` | Native required validation |

---

## Notes

- `.form-field` provides consistent vertical spacing between fields.
- `.form-field-inline` aligns checkbox/switch/radio horizontally with their label.
- `.form-field-row` creates a card-like row for notification-style switch items (label + description on left, switch on right).
- `.form-actions` provides a flex row for submit/reset buttons.
- `.form-fieldset` styles native `<fieldset>` with legend and description.
- `.form-group` is a vertical stack for grouping multiple inline fields.
- No JavaScript needed for basic forms — use native Constraint Validation.
- Prefer `:user-valid` / `:user-invalid` for post-interaction validation styling (defined in input.css).
- Compose with Label, Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, etc.
- `data-invalid` on `.form-field` turns the description text to destructive color; use alongside `aria-invalid="true"` on the control.
- For custom JS validation, set `data-invalid` on the field wrapper and `aria-invalid="true"` on the input programmatically.
