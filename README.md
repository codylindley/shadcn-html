# shadcn-html

A semantic HTML / Tailwind v4 / vanilla JS component system using the [shadcn/ui](https://ui.shadcn.com) token model. No React. No build step. Drop it into a project and let an AI build prototypes with it.

## What this is

A portable design system that an AI agent can read and use to generate HTML prototypes. The system provides:

- **Design tokens** — semantic CSS custom properties (colors, radius, shadows, spacing)
- **Theme bridge** — maps tokens to Tailwind v4 utility classes
- **Pattern specs** — HTML structure blueprints for each component (markup, attributes, ARIA)
- **Documentation site** — working reference implementations that double as a public website

The output is plain HTML that runs directly in any browser with no build step, no framework, and no dependencies beyond the Tailwind v4 CDN.

## Quick start

### For AI prototyping

Copy the `dist/` folder into your project, then point your AI agent at the component specs:

```
Read dist/components/{name}/{name}.md for component HTML patterns.
Use dist/theme/semantic-tokens.css for design tokens.
```

The AI will use the tokens, theme bridge, and pattern specs to build components. The documentation pages serve as reference implementations.

### For browsing the documentation

Open any HTML file in `dist/documentation/` in a browser. No server required (works with `file://`).

## Project structure

```
ai-web-prototyper/
├── dist/                              ← the distributable system
│   ├── theme/semantic-tokens.css      ← design tokens (colors, radius, shadows)
│   ├── components/                    ← self-contained component folders
│   │   └── {name}/
│   │       ├── {name}.md              ← specification (HTML structure & ARIA reference)
│   │       ├── {name}.css             ← component stylesheet (edit directly)
│   │       └── {name}.js              ← interaction JS (only for interactive components)
│   └── documentation/                 ← reference implementations + public website
│       ├── *.html                     ← one page per component + overview pages
│       ├── css/docs-theme.css         ← doc-site font overrides
│       ├── css/layout.css             ← doc-site layout
│       └── js/site.js                 ← doc-site-only JS (dark mode, hljs, copy buttons)
│
├── .github/instructions/              ← AI instructions for maintaining this repo
│   ├── specifications.instructions.md  ← rules for editing component specification files
│   ├── documentation.instructions.md  ← rules for editing documentation HTML
│   └── tokens.instructions.md         ← rules for editing tokens/theme
│
├── AGENTS.md                          ← AI instructions for maintaining this repo
└── README.md                          ← this file
```

### Two AGENTS.md files — two audiences

| File | Who reads it | Purpose |
|------|-------------|---------|
| `AGENTS.md` (root) | AI maintaining this repo | How to add and edit components |

## Components

| Component | Specification | Native basis |
|-----------|--------------|-------------|
| Accordion | `dist/components/accordion/accordion.md` | `<details>/<summary>` |
| Badge | `dist/components/badge/badge.md` | `<span>` |
| Button | `dist/components/button/button.md` | `<button>` |
| Card | `dist/components/card/card.md` | `<div>` / `<article>` |
| Combobox | `dist/components/combobox/combobox.md` | `<input>` + `role="listbox"` |
| Dialog | `dist/components/dialog/dialog.md` | `<dialog>` + `showModal()` |
| Dropdown | `dist/components/dropdown/dropdown.md` | `popover` API |
| Input | `dist/components/input/input.md` | `<input>` |
| Sheet | `dist/components/sheet/sheet.md` | `<dialog>` + `showModal()` |
| Tabs | `dist/components/tabs/tabs.md` | `role="tablist"` + ARIA |
| Toast | `dist/components/toast/toast.md` | `popover` API |
| Toggle | `dist/components/toggle/toggle.md` | `<button>` + `aria-pressed` |
| Icon | `dist/components/icon/icon.md` | `<span>` + Lucide SVGs |

## Theming

Tokens are compatible with [tweakcn.com](https://tweakcn.com) theme exports. To retheme:

1. Export a theme from tweakcn.com
2. Replace the `:root` and `.dark` blocks in `dist/theme/semantic-tokens.css`
3. Everything updates automatically — the doc site, all components

The system uses generic font stacks by default. The documentation site overrides fonts in `docs-theme.css`.

## Maintaining the system

### Editing a component

Each component lives in `dist/components/{name}/` with three files:
- `{name}.md` — specification (HTML structure & ARIA reference)
- `{name}.css` — stylesheet (edit directly)
- `{name}.js` — interaction JS (only for interactive components, edit directly)

Edit the `.css` and `.js` files directly — no build step. If the spec's variant/size
tables drift from the CSS, update the spec to match.

### Adding a new component

1. Create the component folder → `dist/components/{name}/`
2. Write the specification → `dist/components/{name}/{name}.md`
3. Write the CSS → `dist/components/{name}/{name}.css`
4. Write the JS (if interactive) → `dist/components/{name}/{name}.js`
5. Create the doc page → `dist/documentation/{name}.html`
6. Add sidebar nav link + CSS/JS imports to ALL HTML files
7. Add row to `dist/AGENTS.md` specification table

## Design principles

### Native web platform first

Every component starts from a native HTML element or browser API. If the browser
can do it, we don't write JavaScript for it.

| Instead of... | We use... |
|---------------|----------|
| JS modal with overlay div | `<dialog>` + `showModal()` + `::backdrop` |
| JS show/hide dropdowns | `popover` API |
| JS accordion toggle | `<details>` / `<summary>` |
| JS enter animations | `@starting-style` |
| Floating UI / Popper.js | CSS anchor positioning |
| JS class toggling for parent state | `:has()` selector |
| JS textarea auto-resize | `field-sizing: content` |
| Sass / Less / PostCSS | Native CSS nesting, `@layer`, container queries |

JavaScript is only for behavior that HTML and CSS cannot express: keyboard
navigation, focus management, and state coordination between elements.

### Other principles

- **No frameworks** — no React, no Vue, no Alpine, no build tools for the consumer
- **Token-driven** — every color, radius, and shadow comes from CSS custom properties
- **AI-optimized** — patterns are structured for machine consumption, not human tutorials
- **Dark mode automatic** — the token cascade handles it, no `dark:` overrides needed
- **Variant via data attributes** — `data-variant="primary"`, not `btn-primary`
