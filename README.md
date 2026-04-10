# shadcn-html

A semantic HTML / Tailwind v4 / vanilla JS component system using the [shadcn/ui](https://ui.shadcn.com) token model. No React. No build step. Drop it into a project and let an AI build prototypes with it.

## What this is

A portable design system that an AI agent can read and use to generate HTML prototypes. The system provides:

- **Design tokens** — semantic CSS custom properties (colors, radius, shadows, spacing)
- **Theme bridge** — maps tokens to Tailwind v4 utility classes
- **Pattern specs** — complete behavioral blueprints for each component (structure, CSS, JS, ARIA)
- **Documentation site** — working reference implementations that double as a public website

The output is plain HTML that runs directly in any browser with no build step, no framework, and no dependencies beyond the Tailwind v4 CDN.

## Quick start

### For AI prototyping

Copy the `dist/` folder into your project, then point your AI agent at it:

```
Read dist/AGENTS.md before writing any UI code.
```

The AI will use the tokens, theme bridge, and pattern specs to build components. The documentation pages serve as reference implementations.

### For browsing the documentation

Open any HTML file in `dist/documentation/` in a browser. No server required (works with `file://`).

## Project structure

```
ai-web-prototyper/
├── dist/                              ← the distributable system
│   ├── AGENTS.md                      ← AI instructions for consuming the system
│   ├── theme/semantic-tokens.css      ← design tokens (colors, radius, shadows)
│   ├── component-specifications/*.md             ← component specifications (source of truth for CSS)
│   └── documentation/                 ← reference implementations + public website
│       ├── *.html                     ← one page per component + overview pages
│       ├── css/docs-theme.css         ← doc-site font overrides
│       ├── css/layout.css             ← doc-site layout
│       ├── css/components/*.css       ← component CSS (generated from component specifications)
│       └── js/site.js                 ← doc-site JS + component interaction wiring
│
├── scripts/
│   └── sync-css.py                    ← extracts CSS from component specifications → component CSS files
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
| `AGENTS.md` (root) | AI maintaining this repo | How to add, edit, and sync components |
| `dist/AGENTS.md` | AI consuming the system | How to use tokens, component specifications, and components |

The root instructions are never shipped. The consumer only sees `dist/`.

## Components

| Component | Specification | Native basis |
|-----------|--------------|-------------|
| Accordion | `dist/component-specifications/accordion.md` | `<details>/<summary>` |
| Badge | `dist/component-specifications/badge.md` | `<span>` |
| Button | `dist/component-specifications/button.md` | `<button>` |
| Card | `dist/component-specifications/card.md` | `<div>` / `<article>` |
| Combobox | `dist/component-specifications/combobox.md` | `<input>` + `role="listbox"` |
| Dialog | `dist/component-specifications/dialog.md` | `<dialog>` + `showModal()` |
| Dropdown | `dist/component-specifications/dropdown.md` | `popover` API |
| Input | `dist/component-specifications/input.md` | `<input>` |
| Sheet | `dist/component-specifications/sheet.md` | `<dialog>` + `showModal()` |
| Tabs | `dist/component-specifications/tabs.md` | `role="tablist"` + ARIA |
| Toast | `dist/component-specifications/toast.md` | `popover` API |

## Theming

Tokens are compatible with [tweakcn.com](https://tweakcn.com) theme exports. To retheme:

1. Export a theme from tweakcn.com
2. Replace the `:root` and `.dark` blocks in `dist/theme/semantic-tokens.css`
3. Everything updates automatically — the doc site, all components

The system uses generic font stacks by default. The documentation site overrides fonts in `docs-theme.css`.

## Maintaining the system

### Editing a component

1. Edit the specification file: `dist/component-specifications/{name}.md`
2. Run: `python3 scripts/sync-css.py`
3. The component CSS file updates automatically

**Never edit `dist/documentation/css/components/*.css` directly.** Those files are generated from the component specifications. Your changes will be overwritten.

### Adding a new component

1. Write the specification → `dist/component-specifications/{name}.md`
2. Run `python3 scripts/sync-css.py` to generate the CSS
3. Create the doc page → `dist/documentation/{name}.html`
4. Add JS wiring to `dist/documentation/js/site.js` (if interactive)
5. Add sidebar nav link to ALL HTML files
6. Add CSS import to ALL HTML files
7. Add row to `dist/AGENTS.md` specification table

### The sync script

```
python3 scripts/sync-css.py
```

Extracts all ` ```css ` code blocks from each pattern markdown file and writes them to the corresponding component CSS file. The script is idempotent — running it when nothing changed produces no output.

## Design principles

- **Semantic HTML first** — `<dialog>`, `<details>`, `popover`, native form elements
- **No frameworks** — no React, no Vue, no Alpine, no build tools for the consumer
- **Token-driven** — every color, radius, and shadow comes from CSS custom properties
- **AI-optimized** — patterns are structured for machine consumption, not human tutorials
- **Dark mode automatic** — the token cascade handles it, no `dark:` overrides needed
- **Variant via data attributes** — `data-variant="primary"`, not `btn-primary`
