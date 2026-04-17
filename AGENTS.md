# shadcn-html — Maintainer Instructions

You are working on the **shadcn-html** design system repo.
The consumer-facing system lives in `dist/`.

---

## Project structure

```
shadcn-html/
├── dist/                              ← the distributable (drop into any project)
│   ├── theme/default-semantic-tokens.css      ← design tokens (source of truth for colors, radius, shadows)
│   ├── components/                    ← self-contained component folders
│   │   └── {name}/
│   │       ├── component-skill.md      ← component skill (HTML structure & ARIA reference)
│   │       ├── {name}.css             ← component stylesheet (edit directly)
│   │       └── {name}.js              ← interaction JS (only for interactive components)
│   └── documentation/                 ← reference implementations + public website
│       ├── *.html                     ← one page per component + overview pages
│       ├── css/docs-utilities.css    ← hand-written utility classes for doc pages
│       ├── css/docs-theme.css         ← doc-site font overrides (not part of the system)
│       ├── css/layout.css             ← doc-site layout (not part of the system)
│       ├── js/layout.js               ← SPA router, <site-header>/<site-nav> web components
│       ├── js/site.js                 ← doc-site-only JS (tabs, copy buttons, skill modal, code collapse)
│       ├── js/shiki-highlight.js      ← Shiki-based syntax highlighting (ES module, CDN)
│       ├── js/themes.js               ← tweakcn color theme presets (global THEMES array)
│       └── js/theme-switcher.js       ← applies theme overrides to CSS custom properties
│
├── .github/
│   ├── instructions/                  ← auto-attached instruction files for Copilot
│   │   ├── documentation.instructions.md
│   │   ├── specifications.instructions.md
│   │   └── tokens.instructions.md
│   └── prompts/                       ← reusable prompt files
│       └── component-review.prompt.md
│
├── scripts/                           ← build & deployment scripts
│
└── AGENTS.md                          ← this file (maintainer instructions)
```

---

## Critical rules

### Native web platform first

Every component starts from a native HTML element or browser API. If the browser
can do it, we don't write JavaScript for it.

**HTML elements & attributes**

- Use `<dialog>` for modals — not divs with JS show/hide
- Use `popover` API for dropdowns, tooltips, toasts — not JS positioning
- Use `popover="hint"` for tooltips — not `popover="auto"` (hints don't
  close other popovers)
- Use `<details>/<summary>` for accordions — not JS toggle logic
- Use `<details name="group">` for exclusive (single-open) accordions — not
  JS that closes siblings
- Use `commandfor` / `command` attributes for declarative button→dialog/popover
  triggers — not JS click handlers that call `showModal()` or `togglePopover()`
- Use `<progress>` for completion indicators — not div-based progress bars
- Use `<meter>` for scalar values in a range — not custom gauge components
- Use `<output>` for computed/live results — not manual `aria-live` regions
- Use `inert` attribute to disable interaction on background content — not
  JS focus traps or `aria-hidden` toggling
- Use `loading="lazy"` for images/iframes — not JS lazy load libraries
- Use `autofocus` in dialogs/popovers — not JS `.focus()` calls
- Use `inputmode` for mobile keyboard hints — not separate input types
- Use `enterkeyhint` for mobile Enter key labels (`search`, `send`, `go`)
- Use `autocomplete` with proper field names — not custom autofill
- Use `<datalist>` for native type-ahead suggestions — not custom dropdowns
- Use `fetchpriority` for resource priority hints (`high`/`low`)
- Use `disabled` / `readonly` for native form states — not JS class toggling

**CSS**

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
- Use `color-mix(in oklch, ...)` for hover/disabled color derivation — not
  Sass `darken()`/`lighten()` or hardcoded variants
- Use `light-dark()` for inline dark mode values — not media queries or
  class toggles when `color-scheme` is already set
- Use `color-scheme` property for dark mode browser defaults — not all-manual
  dark overrides on every native element
- Use `accent-color` for theming native form controls — not custom replacements
- Use `text-wrap: balance` for headings and labels — not JS text-balancing
- Use `text-wrap: pretty` for body text orphan prevention — not manual `&nbsp;`
- Use `overscroll-behavior: contain` on scroll containers inside overlays — not
  JS scroll-lock libraries
- Use `scroll-snap` for carousel/slider snap points — not JS snap calculations
- Use `scrollbar-gutter: stable` to prevent layout shift from scrollbars — not
  padding hacks
- Use individual transform properties (`rotate`, `scale`, `translate`) — not
  compound `transform` strings
- Use CSS nesting, `@layer`, container queries — not preprocessors
- Use `aspect-ratio` for intrinsic ratios — not padding-bottom hacks
- Use `content-visibility` for expand/collapse transitions — not JS lazy rendering
- Use `interpolate-size: allow-keywords` for animating to `auto` height — not
  JS measurement or `max-height` hacks
- Use `@property` for typed, animatable custom properties — not JS animation
  of CSS values
- Use scroll-driven animations (`animation-timeline: scroll()` / `view()`) for
  scroll-linked effects — not scroll listeners or IntersectionObserver
- Use View Transitions API for smooth DOM state changes — not JS crossfades
- Use `@supports` for CSS feature detection — not Modernizr or JS detection
- Use logical properties (`margin-inline`, `padding-block`) for RTL support — not
  separate LTR/RTL stylesheets
- Use subgrid for aligned child layouts — not manually synchronized columns
- Use dynamic viewport units (`dvh`, `svh`, `lvh`) — not JS `innerHeight` hacks
- Use CSS math functions (`clamp()`, `min()`, `max()`) for responsive sizing — not
  JS resize calculations
- Use `:is()` / `:where()` for selector grouping — not repeated selectors
- Use `hanging-punctuation` for optical quote alignment — not negative text-indent
- Use `@layer` + descriptive prefixed class names (`card-header`, `slider-track`) for
  style scoping — not `@scope` (generic class names lose context for AI generation)
  or Shadow DOM
- Use `@media (scripting)` for no-JS progressive enhancement — not `<noscript>` alone

**Accessibility (REQUIRED)**

- Use `prefers-reduced-motion: reduce` to suppress/simplify all animations — not
  ignoring motion preferences (this is an accessibility requirement, not optional)
- Use `prefers-contrast: more` to increase contrast when requested
- Use `forced-colors: active` to support Windows High Contrast Mode with system colors
- Use `prefers-color-scheme` for automatic dark mode defaults

**JavaScript (only when HTML/CSS cannot express it)**

- Use Web Animations API (`el.animate()`) for imperative animations — not CSS
  class toggling when JS needs to coordinate timing
- Use `Intl` APIs (`DateTimeFormat`, `NumberFormat`, `RelativeTimeFormat`,
  `ListFormat`) for locale-aware formatting — not moment.js or date-fns
- Use native Drag and Drop API for reordering — not SortableJS or drag libraries
- Use `CustomEvent` for component-to-component communication — not framework
  event systems
- Use `element.checkVisibility()` for visibility detection — not manual
  offset calculations
- Use `IntersectionObserver` for viewport-entry detection — not scroll listeners
  with `getBoundingClientRect()`
- Use `ResizeObserver` for element size changes — not window resize listeners
- Use `MutationObserver` for DOM change reactions — not polling loops
- Use `navigator.clipboard` for clipboard access — not `document.execCommand('copy')`
- Use `CloseWatcher` for platform close signals in custom UI — not manual
  Escape key listeners
- Use `AbortController` for canceling fetches/listeners — not boolean flags
- Use `FormData` for form serialization — not manual value collection loops
- Use `structuredClone()` for deep cloning — not `JSON.parse(JSON.stringify())`
- Use `ElementInternals` for custom form elements — not hidden input proxies
- Use Navigation API for SPA routing — not History API hacks

JavaScript is only for behavior that HTML and CSS cannot express: keyboard
navigation patterns, focus management, and state coordination between elements.
Use modern ECMAScript (ES modules, arrow functions, `const`/`let`, etc.) —
no libraries, no frameworks.

All `querySelectorAll` loops that add event listeners **must** guard against
double-initialization using `:not([data-init])` in the selector and setting
`element.dataset.init = ''` as the first line inside the loop.

Component JS files wrap initialization in an `init()` function, call it once,
then use a `MutationObserver` to auto-initialize new elements after SPA
navigation or dynamic DOM changes:

```js
function init() {
  document.querySelectorAll('.my-component:not([data-init])').forEach((el) => {
    el.dataset.init = '';
    el.addEventListener('click', () => { /* … */ });
  });
}

init();
new MutationObserver(init).observe(document, { childList: true, subtree: true });
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
   - Plain ES module — wrap initialization in an `init()` function
   - Call `init()` immediately, then add `new MutationObserver(init).observe(document, { childList: true, subtree: true });`
   - This auto-initializes new elements after SPA navigation or dynamic DOM changes
   - No `export`, no `window.onPageReady` — just the init function + MutationObserver

5. **Create the doc page** → `dist/documentation/{name}.html`
   - Copy an existing component page as template (e.g., badge.html)
   - Add `<link rel="stylesheet" href="../components/{name}/{name}.css">` to the head
   - Add `<script type="module" src="../components/{name}/{name}.js"></script>` if interactive
   - Replace demo content with working examples

6. **Update layout.js** → add the component to the `NAV` array and `BUILT` set
   in `dist/documentation/js/layout.js` (this is the single source of truth for sidebar nav)

7. **Add CSS/JS imports to all HTML pages** → add the new component's `<link>` and
   `<script>` tags to every HTML file in `dist/documentation/`

8. **Sync inline source snippets** → run `node scripts/sync-css-snippets.js` and
    `node scripts/sync-js-snippets.js` to replace the inline `<pre><code>` blocks in
    every doc page with the actual contents of each component's `.css` and `.js` files.
    This must be done after any change to a component's CSS or JS — not just for new components.

---

## Common pitfalls

- **Dialog/Sheet centering**: Always set `margin: auto; position: fixed; inset: 0;`
  explicitly for centered dialogs.
- **CSS drift**: If the component skill's variant/size tables don't match the `.css` file,
  update the component skill to stay in sync — the `.css` file is the source of truth for styles.
- **CSS/JS import drift**: When adding a component, you must add its `<link>` and
  `<script>` tags to ALL HTML pages. Missing imports cause components in cross-page
  demos to break silently.
- **SPA re-initialization**: Component JS modules use `MutationObserver` to
  auto-initialize new elements when the DOM changes — no manual re-import needed.
  Doc-site-only scripts (site.js) use `window.onPageReady(fn)` for their own re-init.
- **Font stacks**: The system tokens use generic font stacks. The doc site overrides
  them in `css/docs-theme.css`. Don't put custom fonts in `default-semantic-tokens.css`.
- **Inline source snippet drift**: Doc pages show the component's CSS and JS in
  `<pre><code>` blocks. These must always match the actual files. After editing any
  component `.css` or `.js`, run `node scripts/sync-css-snippets.js` and
  `node scripts/sync-js-snippets.js` to update all doc pages automatically.

