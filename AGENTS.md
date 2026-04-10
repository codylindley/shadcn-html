# shadcn-html — Agent Instructions

You are working inside the **shadcn-html** prototyping system. Read this file completely
before writing any HTML, CSS, or JavaScript. These rules are non-negotiable.

---

## What this system is

A semantic HTML / Tailwind v4 / vanilla JS component system using the shadcn/ui
token model. No React. No Vue. No Web Components. No runtime CSS-in-JS.
The output is plain HTML that runs directly in any browser with no build step.

---

## Design System Contract

### Colors
All colors are CSS custom properties defined in `tokens/tokens.css`.
They follow the shadcn semantic pair model:

| Surface token         | Text/icon token              | Tailwind utility          |
|-----------------------|------------------------------|---------------------------|
| `--background`        | `--foreground`               | `bg-background text-foreground` |
| `--primary`           | `--primary-foreground`       | `bg-primary text-primary-foreground` |
| `--secondary`         | `--secondary-foreground`     | `bg-secondary text-secondary-foreground` |
| `--muted`             | `--muted-foreground`         | `bg-muted text-muted-foreground` |
| `--accent`            | `--accent-foreground`        | `bg-accent text-accent-foreground` |
| `--destructive`       | `--destructive-foreground`   | `bg-destructive text-destructive-foreground` |
| `--card`              | `--card-foreground`          | `bg-card text-card-foreground` |
| `--popover`           | `--popover-foreground`       | `bg-popover text-popover-foreground` |

**NEVER** use raw color values (hex, rgb, hsl, oklch literals).
**ALWAYS** use token utilities: `bg-primary`, `text-muted-foreground`, etc.

### Sidebar tokens
Full sidebar token set for sidebar-specific theming:

| Token                         | Tailwind utility                     |
|-------------------------------|--------------------------------------|
| `--sidebar`                   | `bg-sidebar`                         |
| `--sidebar-foreground`        | `text-sidebar-foreground`            |
| `--sidebar-primary`           | `bg-sidebar-primary`                 |
| `--sidebar-primary-foreground`| `text-sidebar-primary-foreground`    |
| `--sidebar-accent`            | `bg-sidebar-accent`                  |
| `--sidebar-accent-foreground` | `text-sidebar-accent-foreground`     |
| `--sidebar-border`            | `border-sidebar-border`              |
| `--sidebar-ring`              | `ring-sidebar-ring`                  |

### Chart tokens
Five chart colors for data visualization:
`--chart-1` through `--chart-5` → `bg-chart-1`, `text-chart-1`, etc.

### Utility-only tokens
- `--border` → `border-border`
- `--input` → `border-input`
- `--ring` → `ring-ring` (focus rings)

### Typography tokens
Font stacks are CSS custom properties that can be overridden by themes:
- `--font-sans` → `font-sans`
- `--font-serif` → `font-serif`
- `--font-mono` → `font-mono`

### Radius scale
- `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`
- Derived from `--radius` using subtraction: `sm = radius - 4px`, `md = radius - 2px`, `lg = radius`, `xl = radius + 4px`
- Never hardcode border-radius values. Use `rounded-*` utilities or `var(--radius-*)` in CSS.

### Shadow scale
Theme-aware shadows are available as both tokens and utilities:
- `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
- Shadow composition tokens (`--shadow-x`, `--shadow-y`, `--shadow-blur`, `--shadow-spread`, `--shadow-opacity`, `--shadow-color`) allow themes to adjust shadow direction and intensity.

### Spacing and tracking
- `--spacing` — base spacing unit (default `0.25rem`), controls all `p-*`, `m-*`, `gap-*` utilities
- `--tracking-normal` — default letter-spacing

---

## Styling rules

1. Use Tailwind v4 utility classes for all styling
2. Use `data-variant` attributes for component variants — not separate CSS classes
3. Use `data-size` attributes for size variants
4. CSS `@apply` is acceptable inside component stylesheets for compound patterns
5. Dark mode is handled automatically by the token cascade — never add `dark:` color overrides
6. The token layer handles dark mode. Just use semantic utilities.

---

## Component model

There is **no component library**. When building UI:

1. Use semantic HTML elements (`<button>`, `<dialog>`, `<details>`, `<article>`)
2. Apply Tailwind utility classes from the token bridge
3. Set variants via `data-*` attributes
4. Read the relevant `patterns/*.md` file before implementing interactivity
5. Build the interaction from scratch using vanilla JS

### Variant pattern
```html
<!-- Correct: data attribute variant -->
<button class="btn" data-variant="primary">Save</button>
<button class="btn" data-variant="destructive">Delete</button>

<!-- Wrong: separate classes -->
<button class="btn btn-primary">Save</button>
```

---

## Interactivity priority

Always prefer the simplest approach that achieves correct, accessible behavior:

1. **Native HTML first** — `<dialog>`, `<details>/<summary>`, `<input type="checkbox">`, `popover` attribute
2. **Minimal vanilla JS** — `addEventListener`, `classList`, `dataset`, `setAttribute`
3. **No libraries** — no jQuery, no Alpine, no HTMX, no frameworks

### Available browser APIs (use freely)

#### HTML elements & attributes
- `<dialog>` — `.showModal()` / `.close()`, `::backdrop`, native focus trap
- `<details>` / `<summary>` — disclosure/accordion with zero JS
- `popover` attribute — `popovertarget` for declarative toggle, light dismiss, top layer
- `<select>` with `appearance: base-select` — fully stylable native select (Chrome, evolving spec)

#### JavaScript APIs
- `document.startViewTransition()` — animate DOM state changes; cross-document via `@view-transition { navigation: auto; }`
- `IntersectionObserver`, `MutationObserver`, `ResizeObserver`
- `fetch`, `AbortController`
- `localStorage`, `sessionStorage`

#### CSS layout & query
- Container Queries — `@container` size queries for component-intrinsic responsive design
- CSS Nesting — native selector nesting, no preprocessor needed
- CSS Layers — `@layer` for explicit cascade control
- `:has()` selector — parent/previous-sibling selection based on descendants
- Subgrid — `grid-template-rows: subgrid` / `grid-template-columns: subgrid`
- `@scope` — scoped styling without BEM or shadow DOM

#### CSS positioning & floating
- Anchor Positioning — `anchor-name`, `position-anchor`, `anchor()` function, `position-try` fallbacks; replaces Floating UI / Popper.js

#### CSS animation & transitions
- `@starting-style` — enter animations for elements added to DOM or moving to top layer
- `transition` — exit animations
- Scroll-Driven Animations — `animation-timeline: scroll()` / `view()`, `animation-range`; runs on compositor thread
- View Transitions — CSS `@view-transition` for cross-document, `::view-transition-*` pseudo-elements for named element morphing

#### CSS values & functions
- `@property` — registered custom properties with type, inheritance, and initial value
- `color-mix()` — blend two colors in any color space
- `field-sizing: content` — auto-grow `<textarea>` and `<input>` without JS

#### CSS scroll
- Scroll State Queries — `@container scroll-state(stuck: top)`, `scroll-state(snapped: x)`, `scroll-state(scrollable: top)` (Chrome 133+)

---

## Pattern reference

Before implementing any interactive component, read the spec in `patterns/`:

| Component   | Pattern file             | Native basis                   |
|-------------|--------------------------|--------------------------------|
| Button      | `patterns/button.md`     | `<button>`                     |
| Dialog      | `patterns/dialog.md`     | `<dialog>` + `showModal()`     |
| Card        | `patterns/card.md`       | `<div>` / `<article>`          |
| Dropdown    | `patterns/dropdown.md`   | `popover` API                  |
| Tabs        | `patterns/tabs.md`       | `role="tablist"` + aria        |
| Toast       | `patterns/toast.md`      | `popover` API                  |
| Combobox    | `patterns/combobox.md`   | `<input>` + `role="listbox"`   |
| Accordion   | `patterns/accordion.md`  | `<details>/<summary>`          |

The pattern file defines: structure, ARIA attributes, event wiring, state model,
and token usage. Read it and implement from scratch. Do not import libraries.

---

## File structure

```
shadcn-html/
├── tokens/tokens.css      ← CSS custom property definitions
├── theme/theme.css        ← Tailwind v4 @theme inline bridge
├── base/reset.css         ← baseline reset
├── base/typography.css    ← prose type scale
├── patterns/*.md          ← behavioral specs (read before building)
├── documentation/*.html   ← reference implementations
└── AGENTS.md              ← this file
```

---

## What good output looks like

```html
<!-- A complete, correct button -->
<button class="btn" data-variant="outline" data-size="sm"
        aria-label="Delete item">
  <svg aria-hidden="true">...</svg>
  Delete
</button>

<!-- A complete, correct card -->
<article class="card">
  <div class="card-header">
    <h2 class="card-title">Title</h2>
    <p class="card-description">Description</p>
  </div>
  <div class="card-content">...</div>
  <div class="card-footer">
    <button class="btn" data-variant="default">Action</button>
  </div>
</article>
```

---

## What to avoid

- ❌ Raw color values: `style="color: #333"` or `class="text-zinc-900"`
- ❌ Framework imports: React, Vue, Solid, Alpine
- ❌ Library imports for UI: Radix, Headless UI, Floating UI
- ❌ Separate class modifiers for variants: `btn-primary`, `btn-lg`
- ❌ `dark:` color overrides in HTML — the token cascade handles this
- ❌ Inline style for anything a token utility covers
- ❌ `!important` anywhere

---

## Prototyping speed tips

- Start from an example in `documentation/` and modify it
- For new pages: structure first with semantic HTML, add classes second
- For new interactive patterns: write the HTML structure, then wire JS last
- Use `<dialog>` for anything modal — it's accessible by default
- Use `<details>/<summary>` for accordions and disclosure patterns — zero JS
- The token system means visual consistency is automatic — focus on structure
