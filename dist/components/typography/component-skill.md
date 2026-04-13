# Pattern: Typography

## Native basis
Native HTML text elements: `<h1>`–`<h4>`, `<p>`, `<blockquote>`, `<code>`, `<small>`.
Pure CSS — no JavaScript or ARIA required.

---

## Native Web APIs
- [`<h1>`–`<h6>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) — semantic heading hierarchy
- [`<blockquote>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote) — quoted block content
- [`<code>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) — inline code fragment
- [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small) — side comments and small print
- [`text-wrap: balance`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap) — balanced line wrapping for headings
- [`text-wrap: pretty`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap) — orphan prevention for body text
- [`hanging-punctuation`](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation) — optical quote alignment for blockquotes
- [Logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) — `border-inline-start`, `padding-inline-start` for RTL support
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) — enhanced contrast for high-contrast preference
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode with system colors

---

## Structure

### Headings
```html
<h1 class="h1">Taxing Laughter: The Joke Tax Chronicles</h1>
<h2 class="h2">The People of the Kingdom</h2>
<h3 class="h3">The Joke Tax</h3>
<h4 class="h4">People stopped telling jokes</h4>
```

### Paragraph
```html
<p class="p">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
```

### Lead (large intro paragraph)
```html
<p class="lead">A modal dialog that interrupts the user with important content and expects a response.</p>
```

### Large text
```html
<div class="large">Are you absolutely sure?</div>
```

### Small text
```html
<small class="small">Email address</small>
```

### Muted text
```html
<p class="muted">Enter your email address.</p>
```

### Blockquote
```html
<blockquote class="blockquote">
  <p>"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."</p>
</blockquote>
```

### Inline code
```html
<code class="code">default-semantic-tokens.css</code>
```

---

## Classes

| Class | Element | Description |
|---|---|---|
| `.h1` | `<h1>` or any | 2.25rem extrabold heading, tight tracking, balanced wrapping |
| `.h2` | `<h2>` or any | 1.875rem semibold heading with bottom border |
| `.h3` | `<h3>` or any | 1.5rem semibold heading |
| `.h4` | `<h4>` or any | 1.25rem semibold heading |
| `.p` | `<p>` | Body text, 1.75 line-height, auto-spacing between siblings |
| `.lead` | `<p>` | 1.25rem muted intro paragraph |
| `.large` | `<div>` or any | 1.125rem semibold text |
| `.small` | `<small>` or any | 0.875rem medium text, line-height 1 |
| `.muted` | `<p>` or any | 0.875rem muted-foreground text |
| `.blockquote` | `<blockquote>` | Italic block with inline-start border, hanging punctuation |
| `.code` | `<code>` | Monospace inline code with muted background |

---

## Accessibility

- Use heading levels in order (`h1` → `h2` → `h3`). Do not skip levels.
- Headings create the document outline used by screen readers for navigation.
- `<blockquote>` is announced as a quote by assistive technology — no extra ARIA needed.
- `<code>` is announced as code — no extra ARIA needed.
- `prefers-contrast: more` — removes tight letter-spacing on headings, adds outline to inline code, thickens blockquote border, and promotes muted text to foreground color.
- `forced-colors: active` — blockquote border and inline code adapt to system colors (`CanvasText`, `Canvas`).

---

## Notes

- These are utility classes for prose content — not a component with variants/sizes.
- The `.h1`–`.h4` classes allow applying heading styles to non-heading elements when semantic headings aren't appropriate.
- Typography classes compose freely with other components (Card content, Dialog body, Alert description).
- `text-wrap: balance` is used on all headings (h1–h4) for better visual line distribution.
- `text-wrap: pretty` is used on paragraphs and lead text for orphan prevention.
- `hanging-punctuation: first last` is used on blockquotes for optical quote alignment.
- Blockquote uses `border-inline-start` / `padding-inline-start` (logical properties) for automatic RTL support.
- For lists, use the List component (`list.css`) — typography does not ship its own list styles.
- For prose tables, use the Table component (`table.css`) — typography does not ship its own table styles.
