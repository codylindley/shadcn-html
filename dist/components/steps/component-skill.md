# Steps

## Native basis

`<ol>` with step indicators for multi-step processes.

## Native Web APIs

- [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) — ordered list providing sequential numbering semantics
- [`aria-current="step"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) — identifies the current step for screen readers
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) — thickens indicator borders and connector lines
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — maps indicator and connector to system colors

---

## Structure

### Horizontal (default)
```html
<ol class="steps">
  <li class="step" data-status="complete">
    <div class="step-indicator">
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
    </div>
    <div class="step-content">
      <p class="step-title">Account</p>
      <p class="step-description">Create credentials</p>
    </div>
  </li>
  <li class="step" data-status="current" aria-current="step">
    <div class="step-indicator">2</div>
    <div class="step-content">
      <p class="step-title">Profile</p>
      <p class="step-description">Personal details</p>
    </div>
  </li>
  <li class="step">
    <div class="step-indicator">3</div>
    <div class="step-content">
      <p class="step-title">Complete</p>
      <p class="step-description">Review &amp; confirm</p>
    </div>
  </li>
</ol>
```

### Vertical
```html
<ol class="steps" data-orientation="vertical">
  <li class="step" data-status="complete">
    <div class="step-indicator">
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
    </div>
    <div class="step-content">
      <p class="step-title">Account</p>
      <p class="step-description">Create credentials</p>
    </div>
  </li>
  <li class="step" data-status="current" aria-current="step">
    <div class="step-indicator">2</div>
    <div class="step-content">
      <p class="step-title">Profile</p>
    </div>
  </li>
  <li class="step">
    <div class="step-indicator">3</div>
    <div class="step-content">
      <p class="step-title">Complete</p>
    </div>
  </li>
</ol>
```

---

## States

| `data-status` | Indicator | Connector |
|---------------|-----------|-----------|
| `complete` | Primary fill, white text/checkmark | Primary color line |
| `current` | Primary border, primary text | Default border color |
| *(none)* | Border only, muted text | Default border color |

---

## ARIA

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `aria-current="step"` | Current `<li>` | Identifies the active step for screen readers |
| `aria-hidden="true"` | Checkmark `<svg>` | Decorative indicator |

---

## Notes

- Use `<ol>` for semantic ordering — screen readers announce "item 1 of 3", etc.
- Complete steps can show a checkmark SVG or the step number.
- Add `aria-current="step"` to the `data-status="current"` step for accessibility.
- The connector line between steps uses `::after` pseudo-element positioned absolutely.
- For vertical orientation, add `data-orientation="vertical"` to the `.steps` container.
- No JavaScript required — this is a CSS-only component. Step state is set via `data-status` attributes.
