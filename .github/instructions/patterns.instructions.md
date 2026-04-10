---
description: "Use when editing, creating, or updating component pattern files in dist/patterns/. Covers pattern template structure, CSS extraction, and sync workflow."
applyTo: "dist/patterns/**"
---
# Pattern Editing

## Pattern template

Every pattern must include these sections in order:

1. **Native basis** — which HTML element/API it builds on
2. **Structure** — complete HTML markup with all attributes
3. **CSS** — full component CSS in a ```css code block (this is extracted to generate component CSS files)
4. **JavaScript** — complete JS wiring code (if interactive)
5. **ARIA** — accessibility attributes table
6. **Notes** — edge cases, composition tips, caveats

## CSS code blocks are the source of truth

The ```css block(s) in a pattern are extracted by `scripts/sync-css.py` and written to
`dist/documentation/css/components/{name}.css`. Multiple CSS blocks in one pattern are
concatenated in order.

After editing CSS in a pattern, always run:
```
python3 scripts/sync-css.py
```

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
- **CSS anchor positioning** — for popover/dropdown/combobox placement (`position-anchor`, `anchor()`, `position-try: flip-block`). No JS positioning code needed.
- **`:has()` selector** — for parent/sibling state reactions (e.g., label styling when input is focused)
- **`field-sizing: content`** — for auto-growing textareas with zero JS
- **Container queries** — for components that adapt to their container width (`container-type: inline-size`, `@container`)
- **`@starting-style`** — for enter animations on elements added to DOM or moving to top layer

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
