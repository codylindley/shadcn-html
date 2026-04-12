# shadcn-html — Maintainer Instructions

You are working on the **shadcn-html** design system repo.
The consumer-facing system lives in `dist/`.

---

## Project structure

```
ai-web-prototyper/
├── dist/                              ← the distributable (drop into any project)
│   ├── theme/default-semantic-tokens.css      ← design tokens (source of truth for colors, radius, shadows)
│   ├── components/                    ← self-contained component folders
│   │   └── {name}/
│   │       ├── component-skill.md      ← component skill (HTML structure & ARIA reference)
│   │       ├── {name}.css             ← component stylesheet (edit directly)
│   │       └── {name}.js              ← interaction JS (only for interactive components)
│   └── documentation/                 ← reference implementations + public website
│       ├── *.html                     ← one page per component + overview pages
│       ├── css/docs-tailwind.css      ← compiled Tailwind utilities for doc pages
│       ├── css/docs-theme.css         ← doc-site font overrides (not part of the system)
│       ├── css/layout.css             ← doc-site layout (not part of the system)
│       ├── js/layout.js               ← SPA router, <site-header>/<site-nav> web components
│       └── js/site.js                 ← doc-site-only JS (hljs, tabs, copy buttons, skill modal)
│
└── AGENTS.md                          ← this file (maintainer instructions)
```

---

## Critical rules

### Native web platform first

Every component starts from a native HTML element or browser API. If the browser
can do it, we don't write JavaScript for it.

**HTML & CSS**

- Use `<dialog>` for modals — not divs with JS show/hide
- Use `popover` API for dropdowns, tooltips, toasts — not JS positioning
- Use `<details>/<summary>` for accordions — not JS toggle logic
- Use `commandfor` / `command` attributes for declarative button→dialog/popover
  triggers — not JS click handlers that call `showModal()` or `togglePopover()`
- Use `@starting-style` + `transition-behavior: allow-discrete` for
  enter/exit animations on `display: none` elements — not JS class toggling
- Use CSS anchor positioning for popover placement — not Floating UI / Popper
- Use `::backdrop` + `backdrop-filter` for dialog/sheet overlays — not
  JS-managed overlay divs or canvas blur
- Use `:has()` for parent-state reactions — not JS class propagation
- Use `:focus-visible` for keyboard-only focus rings — not JS focus detection
- Use `:user-valid` / `:user-invalid` for post-interaction validation
  styling — not JS blur listeners with class toggling
- Use `field-sizing: content` for auto-growing textareas — not JS resize
- Use `oklch()` and relative color syntax for wide-gamut, derived colors — not
  hardcoded hex/hsl palettes
- Use `color-scheme` property for dark mode browser defaults — not all-manual
  dark overrides on every native element
- Use `text-wrap: balance` for headings and labels — not JS text-balancing
- Use `overscroll-behavior: contain` on scroll containers inside overlays — not
  JS scroll-lock libraries
- Use `scroll-snap` for carousel/slider snap points — not JS snap calculations
- Use `scrollbar-gutter: stable` to prevent layout shift from scrollbars — not
  padding hacks
- Use individual transform properties (`rotate`, `scale`, `translate`) — not
  compound `transform` strings
- Use CSS nesting, `@layer`, container queries — not preprocessors

**JavaScript (only when HTML/CSS cannot express it)**

- Use Web Animations API (`el.animate()`) for imperative animations — not CSS
  class toggling when JS needs to coordinate timing
- Use `Intl` APIs (`DateTimeFormat`, `NumberFormat`, etc.) for locale-aware
  formatting — not moment.js or date-fns
- Use native Drag and Drop API for reordering — not SortableJS or drag libraries
- Use `CustomEvent` for component-to-component communication — not framework
  event systems
- Use `element.checkVisibility()` for visibility detection — not manual
  offset calculations

JavaScript is only for behavior that HTML and CSS cannot express: keyboard
navigation patterns, focus management, and state coordination between elements.
Use modern ECMAScript (ES modules, arrow functions, `const`/`let`, etc.) —
no libraries, no frameworks.

All `querySelectorAll` loops that add event listeners **must** guard against
double-initialization using `:not([data-init])` in the selector and setting
`element.dataset.init = ''` as the first line inside the loop:

```js
document.querySelectorAll('.my-component:not([data-init])').forEach((el) => {
  el.dataset.init = '';
  el.addEventListener('click', () => { /* … */ });
});
```

For document-level event delegation (no per-element loop), use a global flag:
```js
if (!document.__myComponentInit) {
  document.__myComponentInit = true;
  document.addEventListener('click', (e) => { /* … */ });
}
```

### Each component is a self-contained folder

Each component at `dist/components/{name}/` contains:
- `component-skill.md` — component skill: HTML structure, attributes, ARIA, and usage notes
- `{name}.css` — the component stylesheet (edit directly)
- `{name}.js` — interaction JS (only for interactive components, edit directly)

The component skill `.md` file documents **how to build the HTML**. The `.css` and `.js` files
are the actual implementation — edit them directly, no build step needed.

### Tokens are the source of truth for design values

`dist/theme/default-semantic-tokens.css` defines all CSS custom properties. These must match
the shape of tweakcn.com theme exports so themes are drop-in compatible.

The token file provides:
- Color pairs (surface + foreground) for light and dark modes
- `--radius` (base) — derived values (`--radius-sm/md/lg/xl`) are computed in the token file
- Shadow scale and composition tokens
- Font stacks (generic — overridden by doc site)
- Spacing and tracking

### Documentation site architecture

The doc site dev server runs on `http://localhost:3000/` via `npm run dev` (Vite).
When testing, use the existing dev server — don't start a new one.

The doc site is a **SPA-style multi-page app**. `layout.js` loads synchronously in
`<head>` and provides:

- `<site-header>` — renders the fixed header (logo, GitHub link, dark mode toggle)
- `<site-nav>` — renders the sidebar from a centralized `NAV` array, auto-detecting the active page
- **SPA router** — intercepts nav clicks, fetches HTML, swaps `<main>` content
  without full-page reloads (uses View Transitions API for smooth crossfade)

**Sidebar nav is centralized in `layout.js`.** To add or reorder nav links, edit
the `NAV` array and the `BUILT` set in that one file — individual HTML pages
do not contain nav markup.

Each HTML page duplicates the full list of component CSS `<link>` tags in `<head>`
and component JS `<script>` tags at end of `<body>`. When adding a new component,
these imports must be added to **every** HTML file.

---

## Adding a new component

### Reference sites (REQUIRED)

Before writing any component skill or documentation page, **fetch and review** the component on these sites:

#### Feature checklist (what to build)
1. **shadcn/ui** → `https://ui.shadcn.com/docs/components/{name}`
2. **Basecoat UI** → `https://basecoatui.com/components/{name}/`

These define the completeness bar. Every variant, size, state, and composition pattern
shown on those pages must be accounted for in the component skill and doc page — adapted
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

2. **Write the component skill** → `dist/components/{name}/component-skill.md`
   - Follow the template: Native basis → Native Web APIs → Structure → Variants → Sizes → ARIA → Notes
   - Documents the HTML pattern, not CSS/JS (those are the actual files)
   - Cross-check variants, sizes, and states against the reference sites above

3. **Write the CSS** → `dist/components/{name}/{name}.css`
   - Edit directly — no build step

4. **Write the JS** (if interactive) → `dist/components/{name}/{name}.js`
   - Plain ES module — initialization code runs at top level, no wrapper function
   - No `export`, no `init()`, no `window.onPageReady` — just top-level code
   - The doc site SPA router re-imports component modules after navigation

5. **Create the doc page** → `dist/documentation/{name}.html`
   - Copy an existing component page as template (e.g., badge.html)
   - Add `<link rel="stylesheet" href="../components/{name}/{name}.css">` to the head
   - Add `<script type="module" src="../components/{name}/{name}.js"></script>` if interactive
   - Replace demo content with working examples

6. **Update layout.js** → add the component to the `NAV` array and `BUILT` set
   in `dist/documentation/js/layout.js` (this is the single source of truth for sidebar nav)

7. **Add CSS/JS imports to all HTML pages** → add the new component's `<link>` and
   `<script>` tags to every HTML file in `dist/documentation/`

8. **Update README.md** → add the component to the appropriate category in the Components section

9. **Rebuild doc CSS** (if new Tailwind classes were used) → `npm run docs:build-css`

---

## Common pitfalls

- **Dialog/Sheet centering**: Always set `margin: auto; position: fixed; inset: 0;`
  explicitly for centered dialogs.
- **CSS drift**: If the component skill's variant/size tables don't match the `.css` file,
  update the component skill to stay in sync — the `.css` file is the source of truth for styles.
- **CSS/JS import drift**: When adding a component, you must add its `<link>` and
  `<script>` tags to ALL HTML pages. Missing imports cause components in cross-page
  demos to break silently.
- **SPA re-initialization**: Component JS modules run at top level and are
  re-imported by the SPA router after navigation (with cache-busting). Doc-site-only
  scripts (site.js) use `window.onPageReady(fn)` for their own re-init.
- **Font stacks**: The system tokens use generic font stacks. The doc site overrides
  them in `css/docs-theme.css`. Don't put custom fonts in `default-semantic-tokens.css`.

