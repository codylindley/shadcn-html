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

## Accessibility

- Use heading levels in order (`h1` → `h2` → `h3`). Do not skip levels.
- Headings create the document outline used by screen readers for navigation.
- `<blockquote>` is announced as a quote by assistive technology.
- `<code>` is announced as code — no extra ARIA needed.

---

## Notes

- These are utility classes for prose content — not a component with variants/sizes.
- The `.h1`–`.h4` classes allow applying heading styles to non-heading elements when semantic headings aren't appropriate.
- Typography classes compose freely with other components (Card content, Dialog body, Alert description).
- `text-wrap: balance` is used on headings for better visual line distribution.
- For lists, use the List component (`list.css`) — typography does not ship its own list styles.
- For prose tables, use the Table component (`table.css`) — typography does not ship its own table styles.
