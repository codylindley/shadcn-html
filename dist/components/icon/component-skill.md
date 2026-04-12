# Pattern: Icon

## Native basis
`<i>` element with `data-lucide` attribute. Icons are provided by the [Lucide](https://lucide.dev) icon library via CDN. Lucide replaces each `<i data-lucide="name">` with an inline SVG on page load.

---

## Native Web APIs
- [`<svg>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) — inline scalable vector graphics (injected by Lucide)
- [`aria-hidden`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden) — hides decorative icons from screen readers

---

## Setup

Include the Lucide CDN script and call `createIcons()`:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

---

## Structure

### Decorative icon (default)
```html
<i data-lucide="sun"></i>
```

### With accessible label
```html
<i data-lucide="alert-triangle" aria-label="Warning" role="img"></i>
```

### Inside a button
```html
<button class="btn" data-variant="outline" data-size="icon" aria-label="Settings">
  <i data-lucide="settings"></i>
</button>
```

### With text
```html
<button class="btn" data-variant="default">
  <i data-lucide="save"></i>
  Save
</button>
```

---

## Sizing

Lucide icons default to 24×24. Control size with inline CSS or Tailwind classes:

```html
<i data-lucide="sun" style="width:16px;height:16px;"></i>
<i data-lucide="sun" class="w-4 h-4"></i>
<i data-lucide="sun" class="w-5 h-5"></i>
<i data-lucide="sun" class="w-6 h-6"></i>
```

---

## ARIA

| Attribute | When | Value |
|-----------|------|-------|
| (none) | Decorative (icon next to text) | Lucide adds `aria-hidden` by default |
| `role="img"` | Meaningful (icon conveys info alone) | Add with `aria-label` |
| `aria-label` | Meaningful icon | Describes the icon's purpose |

---

## Notes

- Icons inherit `currentColor` for stroke — they automatically match the parent's text color
- Browse all available icons at [lucide.dev/icons](https://lucide.dev/icons/)
- Lucide provides ~1,500 icons covering every common web app need
- The CDN script replaces `<i data-lucide="name">` elements with inline SVGs on page load
