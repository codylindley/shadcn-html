# Pattern: Icon

## Native basis
`<i>` element with `data-lucide` attribute. Icons are provided by the [Lucide](https://lucide.dev) icon library via CDN. Lucide replaces each `<i data-lucide="name">` with an inline SVG on page load.

---

## Native Web APIs
- [`<svg>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg) — inline scalable vector graphics (injected by Lucide)
- [`aria-hidden`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden) — hides decorative icons from screen readers (Lucide sets this by default)
- [`currentColor`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword) — icons inherit stroke color from the parent's `color` property
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses icon animations (e.g., spinning loaders) when user prefers reduced motion
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — maps icon color to system `CanvasText` in Windows High Contrast Mode
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) — increases stroke width when user requests more contrast

---

## Setup

Include the Lucide CDN script and call `createIcons()`:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

---

## Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-lucide` | any icon name | Icon to render (required) |
| `data-size` | `xs`, `sm`, `md`, `lg`, `xl` | Controls icon dimensions |
| `data-animate` | `spin` | Applies continuous rotation animation |

---

## Structure

### Decorative icon (default)
```html
<i data-lucide="sun"></i>
```

### With accessible label (aria-label)
```html
<i data-lucide="alert-triangle" aria-label="Warning" role="img"></i>
```

### With visually-hidden text (preferred for accessibility)
```html
<span style="display:inline-flex;align-items:center;">
  <i data-lucide="phone" aria-hidden="true"></i>
  <span class="sr-only">Phone number</span>
</span>
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

Control icon size with `data-size`, inline styles, or HTML attributes:

| Method | Example |
|--------|--------|
| `data-size` attribute | `<i data-lucide="star" data-size="lg"></i>` |
| Inline style | `<i data-lucide="star" style="width:16px;height:16px;"></i>` |
| HTML attributes | `<i data-lucide="star" width="16" height="16"></i>` |
| `em` units (font-relative) | `<i data-lucide="star" style="width:1em;height:1em;"></i>` |

The component CSS sets a default size of `1rem` (16px). Available sizes via `data-size`:

| `data-size` | Size |
|-------------|------|
| `xs` | 12px (0.75rem) |
| `sm` | 14px (0.875rem) |
| *(default)* | 16px (1rem) |
| `md` | 20px (1.25rem) |
| `lg` | 24px (1.5rem) |
| `xl` | 32px (2rem) |

---

## Stroke width

Adjust stroke weight with the `stroke-width` attribute on the `<i>` element:

```html
<i data-lucide="heart" stroke-width="1"></i>
<i data-lucide="heart" stroke-width="1.5"></i>
<i data-lucide="heart" stroke-width="2"></i>
<i data-lucide="heart" stroke-width="3"></i>
```

Default stroke width is `2`.

---

## Filled icons

Use the `fill` attribute for filled icon variants. Set `stroke-width="0"` for fill-only, or keep a stroke for a fill+outline look. Works well with simple shapes (star, heart, circle, bookmark).

```html
<i data-lucide="star" fill="currentColor" stroke-width="0"></i>
<i data-lucide="heart" fill="currentColor" stroke-width="1"></i>
```

---

## Color

Icons inherit `currentColor` for stroke. Change color with inline styles or token references:

```html
<i data-lucide="star" style="color:var(--primary);"></i>
<i data-lucide="star" style="color:var(--muted-foreground);"></i>
<i data-lucide="star" style="color:var(--destructive);"></i>
<i data-lucide="star" style="color:oklch(0.72 0.19 142);"></i>
```

---

## ARIA

| Attribute | When | Value |
|-----------|------|-------|
| (none) | Decorative (icon next to text) | Lucide adds `aria-hidden="true"` by default |
| `role="img"` + `aria-label` | Meaningful (icon conveys info alone) | Describes the icon's purpose |
| Visually-hidden `<span>` | Meaningful (preferred alternative) | Provides screen reader text via `.sr-only` |

---

## Notes

- Icons inherit `currentColor` for stroke — they automatically match the parent's text color
- Browse all available icons at [lucide.dev/icons](https://lucide.dev/icons/)
- Lucide provides ~1,500 icons covering every common web app need
- The CDN script replaces `<i data-lucide="name">` elements with inline SVGs on page load
- Use `stroke-width` attribute to adjust line thickness (default: `2`)
- Prefer visually-hidden text (`.sr-only`) over `aria-label` for accessible standalone icons — `aria-label` may not be translated by browser translation tools
- Add `pointer-events: none` is set in CSS — icons don't capture clicks, so the parent element handles interaction
- Animations (e.g., `data-animate="spin"` on a loader icon) are suppressed when the user has `prefers-reduced-motion` enabled
- `prefers-contrast: more` increases stroke width to 2.5 for better visibility
