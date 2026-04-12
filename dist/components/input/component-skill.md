# Pattern: Input

## Native basis
`<input>` element. Browser provides built-in validation, autofill, and accessibility.
Also covers `<textarea>` with auto-grow via `field-sizing: content`.

---

## Native Web APIs
- [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) — native form control with built-in validation and autofill
- [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) — multi-line text input
- [`:has()` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — parent styling that reacts to child input state (focus, disabled)
- [`field-sizing: content`](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) — auto-growing textarea without JavaScript
- [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) — native validation styling after user interaction

---

## Structure

### Basic
```html
<label class="label" for="email">Email</label>
<input class="input" type="email" id="email" placeholder="you@example.com">
```

### With description
```html
<div>
  <label class="label" for="username">Username</label>
  <input class="input" type="text" id="username" placeholder="codylindley">
  <p class="field-description">Choose a unique username for your account.</p>
</div>
```

### Required
```html
<label class="label" for="name">
  Name <span class="text-destructive">*</span>
</label>
<input class="input" type="text" id="name" required placeholder="Jane Doe">
```

### Invalid
```html
<label class="label" for="bad-email">Email</label>
<input class="input" type="email" id="bad-email" aria-invalid="true" value="not-an-email">
<p class="field-error">Please enter a valid email address.</p>
```

### With icon
```html
<div class="relative">
  <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"></i>
  <input class="input pl-9" type="search" placeholder="Search...">
</div>
```

### File
```html
<label class="label" for="avatar">Picture</label>
<input class="input" type="file" id="avatar">
```

### Textarea (auto-grow)
```html
<label class="label" for="message">Message</label>
<textarea class="input" id="message" placeholder="Your message..."></textarea>
```

---

## Sizes

| `data-size` | Height    | Padding       | Font size    |
|-------------|-----------|---------------|--------------|
| `sm`        | `2rem`    | `0 0.625rem`  | `0.8125rem`  |
| *(default)* | `2.5rem`  | `0 0.75rem`   | `0.875rem`   |
| `lg`        | `2.75rem` | `0 1rem`      | `1rem`       |

---

## States

| State | How to apply | Visual |
|-------|-------------|--------|
| Default | — | Border `--input`, shadow-xs |
| Focus | Native `:focus` | Ring `--ring` with glow |
| Disabled | `disabled` attribute | 50% opacity |
| Invalid | `aria-invalid="true"` | Border `--destructive`, red ring on focus |
| Required | `required` attribute | Works with native validation |

---

## ARIA

| Attribute | When | Value |
|-----------|------|-------|
| `id` + `for` | Always | Links label to input |
| `aria-invalid="true"` | Validation error | Marks input as invalid |
| `aria-describedby` | Has description or error | Points to description/error element |
| `required` | Required field | Native browser validation |
| `type` | Always | Use semantic types: `email`, `tel`, `url`, `search`, `password`, `number` |

---

## Notes

- Always pair inputs with `<label>` using matching `for`/`id`
- Use `type="file"` for file inputs — styled via the `.input` class
- Textarea auto-grows via `field-sizing: content` — zero JavaScript
- The `:has()` selector highlights the label when its input is focused
- For hidden labels, use `sr-only` class on the label element
