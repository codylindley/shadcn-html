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

## Accuracy requirements

- All CSS values must match what the documentation site actually renders
- All class names must match the CSS selectors exactly
- Token references must use `var(--*)` — never raw color values
- `<dialog>` components must include `margin: auto; position: fixed; inset: 0;` for centering (Tailwind preflight strips the default)

## Reference

Check shadcn/ui (ui.shadcn.com) for the expected behavior and API of each component.
Translate React/Radix patterns into semantic HTML + vanilla JS.
