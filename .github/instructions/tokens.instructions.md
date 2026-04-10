---
description: "Use when editing design tokens in dist/tokens/tokens.css or the theme bridge in dist/theme/theme.css. Covers token shape, tweakcn compatibility, and the theme bridge relationship."
applyTo: ["dist/tokens/**", "dist/theme/**"]
---
# Tokens & Theme

## Token shape (tweakcn compatible)

`dist/tokens/tokens.css` must match the shape of theme exports from tweakcn.com:

### `:root` block provides:
- Color pairs: `--primary` / `--primary-foreground` (and all other semantic pairs)
- Utility tokens: `--border`, `--input`, `--ring`
- Sidebar tokens: `--sidebar`, `--sidebar-foreground`, etc.
- Chart tokens: `--chart-1` through `--chart-5`
- Font stacks: `--font-sans`, `--font-serif`, `--font-mono` (generic defaults)
- Base radius: `--radius`
- Derived radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` (computed from `var(--radius)`)
- Shadow composition: `--shadow-x`, `--shadow-y`, `--shadow-blur`, etc.
- Shadow scale: `--shadow-2xs` through `--shadow-2xl`
- Spacing: `--spacing`
- Tracking: `--tracking-normal`

### `.dark` block overrides:
- All color pairs for dark mode
- Same tokens, different values

### Derived radius values

Tweakcn themes only provide `--radius`. The derived values must use `var(--radius)`:
```css
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
```

These exist as real CSS custom properties because component CSS uses `var(--radius-md)` directly.
The `@theme inline` block creates Tailwind utilities but NOT CSS custom properties.

## Theme bridge

`dist/theme/theme.css` maps tokens to Tailwind utilities via `@theme inline`.
This file is a reference template — the actual bridge is inlined in each HTML file's
`<style type="text/tailwindcss">` tag.

If you change the theme bridge, update ALL HTML files in `dist/documentation/`.
