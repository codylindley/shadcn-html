# Pattern: Card

## Native basis
`<div>` for layout grouping. `<article>` for standalone self-contained content.
No JavaScript required.

---

## Structure

```html
<!-- Standard card -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
    <p class="card-description">Supporting description.</p>
  </div>
  <div class="card-content">
    <!-- body content -->
  </div>
  <div class="card-footer">
    <button class="btn" data-variant="outline">Cancel</button>
    <button class="btn" data-variant="default">Save</button>
  </div>
</div>

<!-- Standalone content (use article) -->
<article class="card">
  <div class="card-header">
    <h2 class="card-title">Article Heading</h2>
    <p class="card-description">Published January 1, 2025</p>
  </div>
  <div class="card-content">
    <p>Body text...</p>
  </div>
</article>

<!-- Header only (no footer) -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Notifications</h3>
    <p class="card-description">You have 3 unread messages.</p>
  </div>
  <div class="card-content">
    <!-- content with internal actions -->
  </div>
</div>
```

---

## CSS classes

| Class                | Token usage                                       | Notes                          |
|----------------------|---------------------------------------------------|--------------------------------|
| `.card`              | `--card` bg, `--card-foreground` text, `--border` | `border-radius: var(--radius-xl)` |
| `.card-header`       | padding 1.5rem, padding-bottom 0                  | flex col, gap 0.25rem           |
| `.card-title`        | `--card-foreground`, font-size 1.25rem, weight 600 | No margin                      |
| `.card-description`  | `--muted-foreground`, font-size 0.875rem           | No margin                      |
| `.card-content`      | padding 1.5rem                                    | Full padding all sides          |
| `.card-footer`       | padding 1.5rem, padding-top 0                     | flex row, align-center, gap 0.5rem |

---

## Token usage

```css
.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
}

.card-description {
  color: var(--muted-foreground);
}
```

Dark mode is automatic — `--card` and `--border` shift with the token cascade.

---

## Semantic element selection

| Use case                          | Element    |
|-----------------------------------|------------|
| UI grouping (form, settings panel)| `<div>`    |
| Blog post, news article           | `<article>`|
| Product in a listing              | `<article>`|
| Dashboard metric                  | `<div>`    |
| Navigation section group          | `<section>`|

---

## Composition patterns

### Card with image
```html
<div class="card" style="overflow:hidden;">
  <img src="..." alt="..." style="width:100%;aspect-ratio:16/9;object-fit:cover;">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-content">...</div>
</div>
```

### Card with header action
```html
<div class="card">
  <div class="card-header" style="flex-direction:row;align-items:center;justify-content:space-between;">
    <div>
      <h3 class="card-title">Title</h3>
      <p class="card-description">Description</p>
    </div>
    <button class="btn" data-variant="ghost" data-size="icon" aria-label="More options">
      <svg>...</svg>
    </button>
  </div>
  <div class="card-content">...</div>
</div>
```

### Metric card
```html
<div class="card">
  <div class="card-header" style="flex-direction:row;align-items:center;justify-content:space-between;padding-bottom:0.5rem;">
    <p class="card-description" style="font-size:0.875rem;font-weight:500;">Total Revenue</p>
    <svg aria-hidden="true">...</svg>
  </div>
  <div class="card-content" style="padding-top:0.5rem;">
    <p style="font-size:1.75rem;font-weight:700;">$45,231.89</p>
    <p class="card-description">+20.1% from last month</p>
  </div>
</div>
```

---

## Notes

- Card is a container pattern — its children define its purpose
- Avoid deeply nesting cards (card inside card) — use `--muted` surface instead
- For interactive cards (click to navigate), wrap in `<a>` and apply card classes to it
- `card-footer` uses `padding-top: 0` to avoid double-spacing with `card-content`
- For a card grid, use CSS Grid on the parent — the card itself has no layout opinion
