# Pattern: Form

## Native basis
`<form>` element with consistent field layout using Label, Input, and description/error helpers.

---

## Native Web APIs
- [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) — native form with submission, validation, and reset
- [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) — groups related fields
- [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) — native browser validation

---

## Structure

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

---

## Notes

- `.form-field` provides consistent vertical spacing between fields.
- `.form-actions` provides a flex row for submit/reset buttons.
- No JavaScript needed for basic forms — use native validation.
- Compose with Label, Input, Textarea, Select, Checkbox, Radio, Switch, etc.
