# Pattern: Date Picker

## Native basis
`<input type="date">` element with native browser date picker.

---

## Native Web APIs
- [`<input type="date">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date) — native date picker with calendar UI
- [`<input type="datetime-local">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) — date and time picker

---

## Structure

### Date
```html
<label class="label" for="birthday">Birthday</label>
<input class="input" type="date" id="birthday">
```

### Date and time
```html
<label class="label" for="meeting">Meeting</label>
<input class="input" type="datetime-local" id="meeting">
```

### With constraints
```html
<input class="input" type="date" id="start" min="2024-01-01" max="2025-12-31">
```

---

## Notes

- Reuses the `.input` class — the native date picker provides the calendar UI.
- No custom calendar implementation needed — the browser handles it.
- The calendar popup is rendered by the OS/browser and cannot be styled.
- For a fully custom date picker, a custom calendar component would be needed.
