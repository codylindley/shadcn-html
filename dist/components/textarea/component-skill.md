# Pattern: Textarea

## Native basis
`<textarea>` element with `field-sizing: content` for auto-growing.

---

## Native Web APIs
- [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) — multi-line text input
- [`field-sizing: content`](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) — auto-growing textarea without JavaScript

---

## Structure

```html
<label class="label" for="message">Message</label>
<textarea class="textarea" id="message" placeholder="Your message..."></textarea>
```

---

## Accessibility

| Attribute | When | Value |
|-----------|------|-------|
| `id` + `for` | Always | Links label to textarea |
| `aria-invalid="true"` | Validation error | Marks as invalid |
| `aria-describedby` | Has description | Points to description element |

---

## Notes

- Uses `field-sizing: content` for auto-growing — no JavaScript needed.
- Shares the same border, focus, disabled, and invalid styles as `.input`.
- The textarea has a minimum height of 5rem (about 4 lines).
