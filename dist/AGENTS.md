# shadcn-html — Agent Instructions

You are working inside the **shadcn-html** prototyping system. Read this file completely
before writing any HTML, CSS, or JavaScript. These rules are non-negotiable.

---

## What this system is

A semantic HTML / CSS custom property / vanilla JS component system using the shadcn/ui
token model. No React. No Vue. No Web Components. No runtime CSS-in-JS.
The output is plain HTML that runs directly in any browser with no build step.

---

## Design System Contract

### Colors
All colors are CSS custom properties defined in `theme/semantic-tokens.css`.
They follow the shadcn semantic pair model:

| Surface token         | Text/icon token              | CSS usage                  |
|-----------------------|------------------------------|----------------------------|
| `--background`        | `--foreground`               | `var(--background)` `var(--foreground)` |
| `--primary`           | `--primary-foreground`       | `var(--primary)` `var(--primary-foreground)` |
| `--secondary`         | `--secondary-foreground`     | `var(--secondary)` `var(--secondary-foreground)` |
| `--muted`             | `--muted-foreground`         | `var(--muted)` `var(--muted-foreground)` |
| `--accent`            | `--accent-foreground`        | `var(--accent)` `var(--accent-foreground)` |
| `--destructive`       | `--destructive-foreground`   | `var(--destructive)` `var(--destructive-foreground)` |
| `--card`              | `--card-foreground`          | `var(--card)` `var(--card-foreground)` |
| `--popover`           | `--popover-foreground`       | `var(--popover)` `var(--popover-foreground)` |

**NEVER** use raw color values (hex, rgb, hsl, oklch literals).
**ALWAYS** use token references: `var(--primary)`, `var(--muted-foreground)`, etc.

### Sidebar tokens
Full sidebar token set for sidebar-specific theming:

| Token                         | CSS usage                            |
|-------------------------------|--------------------------------------|
| `--sidebar`                   | `var(--sidebar)`                     |
| `--sidebar-foreground`        | `var(--sidebar-foreground)`          |
| `--sidebar-primary`           | `var(--sidebar-primary)`             |
| `--sidebar-primary-foreground`| `var(--sidebar-primary-foreground)`  |
| `--sidebar-accent`            | `var(--sidebar-accent)`              |
| `--sidebar-accent-foreground` | `var(--sidebar-accent-foreground)`   |
| `--sidebar-border`            | `var(--sidebar-border)`              |
| `--sidebar-ring`              | `var(--sidebar-ring)`                |

### Chart tokens
Five chart colors for data visualization:
`--chart-1` through `--chart-5` → `var(--chart-1)`, `var(--chart-2)`, etc.

### Utility-only tokens
- `--border` → `var(--border)`
- `--input` → `var(--input)`
- `--ring` → `var(--ring)` (focus rings)

### Typography tokens
Font stacks are CSS custom properties that can be overridden by themes:
- `--font-sans` → `var(--font-sans)`
- `--font-serif` → `var(--font-serif)`
- `--font-mono` → `var(--font-mono)`

### Radius scale
- `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-xl)`
- Derived from `--radius` using subtraction: `sm = radius - 4px`, `md = radius - 2px`, `lg = radius`, `xl = radius + 4px`
- Never hardcode border-radius values. Use `var(--radius-*)` in CSS.

### Shadow scale
Theme-aware shadows available as CSS custom properties:
- `var(--shadow-2xs)`, `var(--shadow-xs)`, `var(--shadow-sm)`, `var(--shadow)`, `var(--shadow-md)`, `var(--shadow-lg)`, `var(--shadow-xl)`, `var(--shadow-2xl)`
- Shadow composition tokens (`--shadow-x`, `--shadow-y`, `--shadow-blur`, `--shadow-spread`, `--shadow-opacity`, `--shadow-color`) allow themes to adjust shadow direction and intensity.

### Spacing and tracking
- `--spacing` — base spacing unit (default `0.25rem`)
- `--tracking-normal` — default letter-spacing

---

## Styling rules

1. Use CSS custom properties (`var(--*)`) from `semantic-tokens.css` for all design values
2. Use `data-variant` attributes for component variants — not separate CSS classes
3. Use `data-size` attributes for size variants
4. Component CSS uses `var(--*)` references to tokens
5. Dark mode is handled automatically by the token cascade — never add separate dark mode overrides
6. The token layer handles dark mode. Just use semantic token references.

---

## Component model

There is **no component library**. When building UI:

1. Use semantic HTML elements (`<button>`, `<dialog>`, `<details>`, `<article>`)
2. Apply component CSS classes and use `var(--*)` token references
3. Set variants via `data-*` attributes
4. Read the relevant `component-specifications/*.md` file before implementing interactivity
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

## Specification reference

Before implementing any component, read the spec in `component-specifications/`:

| Component   | Specification file             | Native basis                   |
|-------------|--------------------------------|--------------------------------|
| Accordion   | `component-specifications/accordion.md`  | `<details>/<summary>`          |
| Badge       | `component-specifications/badge.md`      | `<span>`                       |
| Button      | `component-specifications/button.md`     | `<button>`                     |
| Card        | `component-specifications/card.md`       | `<div>` / `<article>`          |
| Combobox    | `component-specifications/combobox.md`   | `<input>` + `role="listbox"`   |
| Dialog      | `component-specifications/dialog.md`     | `<dialog>` + `showModal()`     |
| Dropdown    | `component-specifications/dropdown.md`   | `popover` API                  |
| Input       | `component-specifications/input.md`      | `<input>`                      |
| Sheet       | `component-specifications/sheet.md`      | `<dialog>` + `showModal()`     |
| Tabs        | `component-specifications/tabs.md`       | `role="tablist"` + aria        |
| Toast       | `component-specifications/toast.md`      | `popover` API                  |
| Toggle      | `component-specifications/toggle.md`     | `<button>` + `aria-pressed`    |

The specification file defines: structure, ARIA attributes, event wiring, state model,
and token usage. Read it and implement from scratch. Do not import libraries.

---

## File structure

```
shadcn-html/
├── AGENTS.md                          ← this file
├── theme/semantic-tokens.css          ← CSS custom property definitions (the source of truth)
├── component-specifications/*.md                      ← component specifications (read before building)
└── documentation/                     ← reference implementations (working examples)
    ├── *.html                         ← one page per component + index, setup, tokens
    ├── css/
    │   ├── docs-theme.css             ← doc-site font overrides (not part of the system)
    │   ├── layout.css                 ← doc-site layout (not part of the system)
    │   └── components/*.css           ← component stylesheets (copy into your project)
    └── js/
        └── site.js                    ← doc-site JS + component interaction wiring
```

### Notes on specific files

- **`documentation/css/components/*.css`** — These are the actual component stylesheets.
  Copy the ones you need into your project. They use `var(--*)` references to tokens
  and are fully theme-aware.

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
