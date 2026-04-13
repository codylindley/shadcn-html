---
description: "Use when editing, creating, or updating component skill files in dist/components/. Covers component skill template structure and HTML pattern documentation."
applyTo: "dist/components/**"
---
# Component Skill Editing

## Reference sites (REQUIRED)

Before writing or updating any component skill, fetch and review the component:

### Feature checklist (what to build)
1. **shadcn/ui** → `https://ui.shadcn.com/docs/components/{name}`
2. **Basecoat UI** → `https://basecoatui.com/components/{name}/`

Every variant, size, state, and composition pattern shown on those pages must be
accounted for in the component skill — adapted to our semantic HTML / CSS custom property /
vanilla JS model.

### Native implementation (how to build it)
3. **WAI-ARIA APG** → `https://www.w3.org/WAI/ARIA/apg/patterns/{name}/` — canonical keyboard navigation and ARIA patterns
4. **MDN Web Docs** → `https://developer.mozilla.org/` — authoritative reference for HTML elements, CSS properties, and JS APIs
5. **Open UI** → `https://open-ui.org` — W3C community group defining native component standards
6. **Base UI** → `https://base-ui.com/react/components/{name}` — headless component architecture reference

Always prefer native browser APIs over JS workarounds. Check MDN for support
status of newer APIs (`popover`, anchor positioning, `@starting-style`, etc.).

## Component skill template

Component skills document **how to build the HTML** for a component. CSS and JS live in
their own files alongside the skill — edit `.css` and `.js` directly.

Every component skill must include these sections in order:

1. **Native basis** — which HTML element/API it builds on
2. **Native Web APIs** — bulleted list of significant platform APIs with MDN links (see format below)
3. **Structure** — complete HTML markup with all attributes
4. **Variants** — variant table mapping `data-variant` values to visual behavior
5. **Sizes** — size table (if applicable)
6. **ARIA** — accessibility attributes table
7. **Notes** — edge cases, composition tips, caveats

Do NOT include CSS or JavaScript code blocks in the component skill. The `.css` and `.js` files
in the same folder are the source of truth for styles and behavior.

## Native Web APIs section format

Every component skill must include a `## Native Web APIs` section immediately after
`## Native basis`. This section lists the significant web platform APIs the component
relies on, with MDN links. Use this format:

```markdown
## Native Web APIs
- [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — native modal with focus trap and Escape-to-close
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation starting values
```

### What to include
- HTML elements that provide core behavior (`<dialog>`, `<details>`, `<summary>`, `<progress>`, `<meter>`, `<output>`)
- HTML attributes that replace JS (`popover`, `popover="hint"`, `commandfor`/`command`, `inert`, `autofocus`, `loading="lazy"`)
- Browser APIs (`Popover API`, `showModal()`, `View Transitions API`, `Navigation API`)
- Significant CSS features (`CSS Anchor Positioning`, `@starting-style`, `::backdrop`, `::details-content`, Container Queries, `:has()`, `field-sizing: content`, `interpolate-size`, `content-visibility`, `@property`, `scroll-driven animations`, `light-dark()`, `color-mix()`)
- Accessibility features (`prefers-reduced-motion`, `prefers-contrast`, `forced-colors`)
- JS APIs used (`IntersectionObserver`, `ResizeObserver`, `MutationObserver`, `Clipboard API`, `Intl.*`, `CloseWatcher`, `AbortController`, `FormData`, `structuredClone()`)
- WAI-ARIA patterns when the component follows a specific APG pattern

### What to exclude
- Basic DOM methods (`querySelector`, `classList`, `addEventListener`)
- Standard CSS layout (`flexbox`, `grid` unless using subgrid/container queries)
- Common pseudo-classes (`:hover`, `:disabled`) unless component-defining (`:focus-visible`, `:has()`)

## CSS authoring conventions

### `@layer components`
All component CSS must be wrapped in `@layer components { ... }`. This establishes
explicit cascade priority: tokens → components → utilities. Never write component CSS
outside a layer.

### Native CSS nesting
Use `&` nesting for all related selectors. Group variants, sizes, states, and child
element styles inside the base selector:
```css
@layer components {
  .btn {
    /* base styles */
    &[data-variant="outline"] { /* ... */ }
    &[data-size="sm"] { /* ... */ }
    &:hover { /* ... */ }
    &:disabled { /* ... */ }
    & svg { /* child styles */ }
  }
}
```

### Modern CSS features (use where applicable)
- **CSS anchor positioning** — for popover/dropdown/combobox placement (`position-anchor`, `anchor()`, `position-try-fallbacks: flip-block`). No JS positioning code needed.
- **`:has()` selector** — for parent/sibling state reactions (e.g., label styling when input is focused)
- **`field-sizing: content`** — for auto-growing textareas with zero JS
- **Container queries** — for components that adapt to their container width (`container-type: inline-size`, `@container`)
- **`@starting-style`** — for enter animations on elements added to DOM or moving to top layer
- **`interpolate-size: allow-keywords`** — for smooth height-to-`auto` transitions (accordion, collapsible)
- **`content-visibility`** — for expand/collapse transitions with `allow-discrete`
- **`@property`** — for typed, animatable custom properties (progress rings, gradient transitions)
- **`color-mix(in oklch, ...)`** — for deriving hover/disabled states from token colors
- **`light-dark()`** — for inline dark mode values when `color-scheme` is set
- **`accent-color`** — for theming native form controls (checkbox, radio, range, progress)
- **Scroll-driven animations** — `animation-timeline: scroll()` / `view()` for scroll-linked effects
- **View Transitions API** — `startViewTransition()` for smooth DOM state changes
- **Logical properties** — `margin-inline`, `padding-block`, `inset-inline-start` for RTL support
- **Subgrid** — `grid-template-columns: subgrid` for child alignment to parent grid tracks
- **`:is()` / `:where()`** — selector grouping; `:where()` has zero specificity (ideal for resets)
- **`@scope`** — bounded style scoping with upper and lower boundaries
- **Dynamic viewport units** — `dvh`, `svh`, `lvh` for mobile browser chrome awareness
- **CSS math** — `clamp()`, `min()`, `max()`, `round()` for responsive sizing

### Accessibility CSS (REQUIRED for all components)
- **`prefers-reduced-motion: reduce`** — suppress/simplify all transitions and animations
- **`prefers-contrast: more`** — increase contrast when requested by the user
- **`forced-colors: active`** — support Windows High Contrast Mode with system colors
- **`prefers-color-scheme`** — automatic dark mode defaults from OS preference

### After editing component CSS or JS

Doc pages display each component's CSS and JS in inline `<pre><code>` blocks.
After changing any `.css` or `.js` file, run the sync scripts to keep doc pages accurate:

```
node scripts/sync-css-snippets.js
node scripts/sync-js-snippets.js
```

## Accuracy requirements

- All CSS values must match what the documentation site actually renders
- All class names must match the CSS selectors exactly
- Token references must use `var(--*)` — never raw color values (see token boundary rule in tokens.instructions.md)
- `<dialog>` components must include `margin: auto; position: fixed; inset: 0;` for centering (Tailwind preflight strips the default)

## Variant and size API (data attributes)

Components use `data-*` attributes — never CSS class modifiers — for variants and sizes.

### Rules
- **`data-variant`** for visual variations (e.g., `default`, `outline`, `ghost`, `destructive`)
- **`data-size`** for size variations (e.g., `sm`, `lg`, `icon`)
- **`data-side`**, **`data-position`**, etc. for structural variations where applicable
- **One base class** per component (`.btn`, `.badge`, `.card`) — this identifies *what* it is
- **Data attributes** express *which version* — never add modifier classes like `.btn-primary` or `.btn--ghost`
- CSS selectors combine the base class with the attribute: `.btn[data-variant="outline"]`

### Why
- Flat specificity — all selectors have equal weight, no conflicts
- Uniform API — every component follows the same pattern, easy for AI to learn
- Independent axes — variant and size combine freely without combinatorial class names
- Clean `class` attribute — no long modifier chains

### Correct
```html
<button class="btn" data-variant="destructive" data-size="lg">Delete</button>
<span class="badge" data-variant="outline">Status</span>
```

### Wrong
```html
<button class="btn btn-destructive btn-lg">Delete</button>
<span class="badge badge-outline">Status</span>
```

## Reference

Check shadcn/ui (ui.shadcn.com) for the expected behavior and API of each component.
Translate React/Radix patterns into semantic HTML + vanilla JS.
