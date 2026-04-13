# Pattern: Input

## Native basis
`<input>` element. Browser provides built-in validation, autofill, and accessibility.
Also covers `<textarea>` with auto-grow via `field-sizing: content`.

---

## Native Web APIs
- [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) — native form control with built-in validation and autofill
- [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) — multi-line text input
- [`field-sizing: content`](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) — auto-growing textarea without JavaScript
- [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) — native validation styling after user interaction
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring styling
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses focus/hover transitions
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) — thicker borders for high-contrast preference
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode with system colors

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
  Name <span aria-hidden="true" class="text-destructive">*</span>
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

### Password
```html
<label class="label" for="password">Password</label>
<input class="input" type="password" id="password" placeholder="Enter your password">
```

### Readonly
```html
<label class="label" for="api-key">API Key</label>
<input class="input" type="text" id="api-key" readonly value="sk-1234567890abcdef">
```

### With button
```html
<div style="display:flex;gap:0.5rem;">
  <input class="input" type="search" placeholder="Search...">
  <button class="btn" data-variant="default">Search</button>
</div>
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
| Readonly | `readonly` attribute | Muted background, 70% opacity, no focus ring change |
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
- Use `readonly` for non-editable values the user can still select/copy
- For hidden labels, use `sr-only` class on the label element
- Use semantic `type` values (`email`, `tel`, `url`, `search`, `password`, `number`) for mobile keyboards and validation
