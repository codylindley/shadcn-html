---
description: "Use when editing design tokens in dist/theme/semantic-tokens.css or any component pattern/CSS. Covers token shape, tweakcn compatibility, and the token boundary rule."
applyTo: ["dist/theme/**", "dist/component-specifications/**", "dist/documentation/css/components/**"]
---
# Tokens & Theme

## Token boundary rule (CRITICAL)

**Components must only use the tokens that exist in the TweakCN export shape.**

- `semantic-tokens.css` defines the complete set of available CSS custom properties.
- No new custom properties may be added to `semantic-tokens.css` beyond what TweakCN provides.
- Components CSS (`dist/component-specifications/*.md` and `dist/documentation/css/components/*.css`)
  must reference only these tokens via `var(--*)`.
- If a component needs a color that has no token (e.g., status colors like
  green/amber/blue), use a hardcoded CSS value directly in the component CSS.
  Do NOT invent a new `--*` token for it.

### Why
TweakCN themes are drop-in replacements. If we add tokens that TweakCN doesn't
export, swapping a theme will leave those tokens undefined and break components.
The token file must be a pure subset of what TweakCN produces.

### Allowed token list (exhaustive)

**Color pairs** (surface + foreground):
`--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`,
`--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`,
`--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`,
`--accent-foreground`, `--destructive`, `--destructive-foreground`

**Utility tokens**: `--border`, `--input`, `--ring`

**Sidebar tokens**: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`,
`--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`,
`--sidebar-border`, `--sidebar-ring`

**Chart tokens**: `--chart-1` through `--chart-5`

**Typography**: `--font-sans`, `--font-serif`, `--font-mono`

**Radius**: `--radius` (base), `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` (derived)

**Shadow scale**: `--shadow-2xs` through `--shadow-2xl`

**Shadow composition**: `--shadow-x`, `--shadow-y`, `--shadow-blur`, `--shadow-spread`, `--shadow-opacity`, `--shadow-color`

**Spacing**: `--spacing`

**Tracking**: `--tracking-normal`

**Nothing else.** If a value is not on this list, it cannot be a `var(--*)` reference
in component CSS. Use a literal CSS value instead.

## Token shape (tweakcn compatible)

`dist/theme/semantic-tokens.css` must match the shape of theme exports from tweakcn.com:

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
