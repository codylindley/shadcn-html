# shadcn-html — Maintainer Instructions

You are working on the **shadcn-html** design system repo.
The consumer-facing system lives in `dist/`.

---

## Project structure

```
ai-web-prototyper/
├── dist/                              ← the distributable (drop into any project)
│   ├── theme/semantic-tokens.css      ← design tokens (source of truth for colors, radius, shadows)
│   ├── components/                    ← self-contained component folders
│   │   └── {name}/
│   │       ├── {name}.md              ← specification (HTML structure & ARIA reference)
│   │       ├── {name}.css             ← component stylesheet (edit directly)
│   │       └── {name}.js              ← interaction JS (only for interactive components)
│   └── documentation/                 ← reference implementations + public website
│       ├── *.html                     ← one page per component + overview pages
│       ├── css/docs-theme.css         ← doc-site font overrides (not part of the system)
│       ├── css/layout.css             ← doc-site layout (not part of the system)
│       └── js/site.js                 ← doc-site-only JS (dark mode, hljs, copy buttons)
│
└── AGENTS.md                          ← this file (maintainer instructions)
```

---

## Critical rules

### Native web platform first

Every component starts from a native HTML element or browser API. If the browser
can do it, we don't write JavaScript for it.

- Use `<dialog>` for modals — not divs with JS show/hide
- Use `popover` API for dropdowns, tooltips, toasts — not JS positioning
- Use `<details>/<summary>` for accordions — not JS toggle logic
- Use `@starting-style` for enter animations — not JS class toggling
- Use CSS anchor positioning for popover placement — not Floating UI / Popper
- Use `::backdrop` for overlays — not JS-managed overlay divs
- Use `:has()` for parent-state reactions — not JS class propagation
- Use `field-sizing: content` for auto-growing textareas — not JS resize
- Use CSS nesting, `@layer`, container queries — not preprocessors

JavaScript is only for behavior that HTML and CSS cannot express: keyboard
navigation patterns, focus management, and state coordination between elements.
Even then, prefer the smallest possible vanilla JS — no libraries, no frameworks.

### Each component is a self-contained folder

Each component at `dist/components/{name}/` contains:
- `{name}.md` — specification: HTML structure, attributes, ARIA, and usage notes
- `{name}.css` — the component stylesheet (edit directly)
- `{name}.js` — interaction JS (only for interactive components, edit directly)

The spec `.md` file documents **how to build the HTML**. The `.css` and `.js` files
are the actual implementation — edit them directly, no build step needed.

### Tokens are the source of truth for design values

`dist/theme/semantic-tokens.css` defines all CSS custom properties. These must match
the shape of tweakcn.com theme exports so themes are drop-in compatible.

The token file provides:
- Color pairs (surface + foreground) for light and dark modes
- `--radius` (base) — derived values (`--radius-sm/md/lg/xl`) are computed in the token file
- Shadow scale and composition tokens
- Font stacks (generic — overridden by doc site)
- Spacing and tracking

### Documentation HTML files share boilerplate

All HTML files in `dist/documentation/` share:
- The same `<head>` (CDN script, font imports, CSS links, inline theme block)
- The same header (logo, GitHub link, dark mode toggle)
- The same sidebar navigation

When adding a new component, update the sidebar nav in **every** HTML file.
Use `sed` or a script — the `active` class on the current page's nav link
can cause `sed` patterns to miss that file (as happened with dialog.html).

---

## Adding a new component

### Reference sites (REQUIRED)

Before writing any specification or documentation page, **fetch and review** the component on these sites:

#### Feature checklist (what to build)
1. **shadcn/ui** → `https://ui.shadcn.com/docs/components/{name}`
2. **Basecoat UI** → `https://basecoatui.com/components/{name}/`

These define the completeness bar. Every variant, size, state, and composition pattern
shown on those pages must be accounted for in the specification and doc page — adapted
to our semantic HTML / CSS custom property / vanilla JS model. Do not copy their markup;
use them as a feature checklist.

#### Native implementation (how to build it)
3. **WAI-ARIA APG** → `https://www.w3.org/WAI/ARIA/apg/patterns/{name}/` — canonical keyboard navigation and ARIA patterns
4. **MDN Web Docs** → `https://developer.mozilla.org/` — authoritative reference for HTML elements, CSS properties, and JS APIs
5. **Open UI** → `https://open-ui.org` — W3C community group defining native component standards
6. **Base UI** → `https://base-ui.com/react/components/{name}` — headless component architecture (closest to our approach in spirit)

Always prefer native browser APIs over JS workarounds. Check MDN for the latest
support status of newer APIs (`popover`, anchor positioning, `@starting-style`, etc.).

### Steps

1. **Create the component folder** → `dist/components/{name}/`

2. **Write the specification** → `dist/components/{name}/{name}.md`
   - Follow the template: Native basis → Native Web APIs → Structure → Variants → Sizes → ARIA → Notes
   - Documents the HTML pattern, not CSS/JS (those are the actual files)
   - Cross-check variants, sizes, and states against the reference sites above

3. **Write the CSS** → `dist/components/{name}/{name}.css`
   - Edit directly — no build step

4. **Write the JS** (if interactive) → `dist/components/{name}/{name}.js`
   - Self-contained IIFE, no ES modules (works with file:// protocol)

5. **Create the doc page** → `dist/documentation/{name}.html`
   - Copy an existing component page as template (e.g., dialog.html)
   - Add `<link rel="stylesheet" href="../components/{name}/{name}.css">` to the head
   - Add `<script src="../components/{name}/{name}.js" defer></script>` if interactive
   - Replace demo content with working examples

6. **Update sidebar nav** → add link in ALL HTML files
   - Also add the CSS/JS imports to all HTML files

7. **Update sidebar nav** CSS/JS imports in all HTML files

---

## Common pitfalls

- **Dialog/Sheet centering**: Tailwind preflight strips `margin: auto` from `<dialog>`.
  Always set `margin: auto; position: fixed; inset: 0;` explicitly for centered dialogs.
- **CSS drift**: If the spec's variant/size tables don't match the `.css` file,
  update the spec to stay in sync — the `.css` file is the source of truth for styles.
- **Nav link sed failures**: Pages where the component has `class="nav-link active"`
  won't match a sed pattern looking for `class="nav-link"`. Check all files after bulk updates.
- **Font stacks**: The system tokens use generic font stacks. The doc site overrides
  them in `css/docs-theme.css`. Don't put custom fonts in `semantic-tokens.css`.

