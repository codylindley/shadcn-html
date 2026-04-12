# shadcn-html

[![GitHub stars](https://img.shields.io/github/stars/codylindley/shadcn-html?style=flat&logo=github)](https://github.com/codylindley/shadcn-html)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![No dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![HTML CSS JS](https://img.shields.io/badge/stack-HTML%20·%20CSS%20·%20JS-orange)

**The AI prototyping substrate.** Themeable, semantic HTML, modern CSS, and vanilla JavaScript. No framework. No build step. No npm install. Just the lowest-level web stuff assembled into a system any AI can understand and build from. Why? Because you can speak things into existence — so the substrate should be simple.

**[Documentation & Live Demos →](https://shadcn-html.netlify.app/documentation/)**

## What this is

A portable design system built on the [shadcn/ui](https://ui.shadcn.com) token model — designed for AI agents to read and use when generating HTML prototypes. The system provides:

- **Themeable** — full shadcn semantic token model; swap a [tweakcn](https://tweakcn.com) theme and every component updates instantly
- **AI Friendly** — no framework abstractions or build tools to get wrong; just HTML, CSS, and JS — the languages AI knows best
- **Framework Free** — runs in any browser, zero dependencies, no build pipeline required
- **Documentation site** — working reference implementations with live demos

The output is plain HTML that runs directly in any browser with no build step, no framework, and no dependencies.

## Quick start

### For AI prototyping

Copy the `dist/` folder into your project, then point your AI agent at the component specs:

```
Read dist/components/{name}/{name}.md for component HTML patterns.
Use dist/theme/semantic-tokens.css for design tokens.
```

The AI will use the tokens and pattern specs to build components. The documentation pages serve as reference implementations.

### For browsing the documentation

Visit **[shadcn-html.netlify.app/documentation/](https://shadcn-html.netlify.app/documentation/)** or open any HTML file in `dist/documentation/` locally.

## Components

### Primitives
Typography · Separator · Icon · Link · Label

### Layout
Aspect Ratio · Container · Scroll Area · Carousel · Sidebar · Sortable

### Actions
Button · Toggle · Toggle Group · Button Group · Toolbar

### Forms & Inputs
Input · Textarea · Checkbox · Radio Group · Switch · Slider · Select · Number Input · File Input · Color Picker · Date Picker · Combobox · Form

### Data Display
Badge · Tag · Avatar · Card · Image · List · Descriptions · Statistic · Table · Empty State · Collapsible · Timeline · Tree View · Calendar

### Feedback & Status
Spinner · Skeleton · Progress · Alert · Alert Dialog · Toast

### Overlays
Popover · Tooltip · Context Menu · Dialog · Sheet · Accordion · Command

### Navigation
Breadcrumb · Pagination · Steps · Tabs · Dropdown Menu · Navigation Menu

## Project structure

```
shadcn-html/
├── dist/                              ← the distributable system
│   ├── theme/semantic-tokens.css      ← design tokens (colors, radius, shadows)
│   ├── components/                    ← self-contained component folders
│   │   └── {name}/
│   │       ├── component-skill.md      ← component skill (HTML structure & ARIA)
│   │       ├── {name}.css             ← component stylesheet
│   │       └── {name}.js              ← interaction JS (interactive components only)
│   └── documentation/                 ← reference implementations + public website
│       ├── *.html                     ← one page per component + overview pages
│       ├── css/                       ← doc-site styles (not part of the system)
│       ├── fonts/                     ← self-hosted web fonts
│       └── js/                        ← doc-site JS (layout, dark mode, copy buttons)
│
├── AGENTS.md                          ← AI instructions for maintaining this repo
└── README.md                          ← this file
```

## Theming

Tokens are compatible with [tweakcn.com](https://tweakcn.com) theme exports. To retheme:

1. Export a theme from tweakcn.com
2. Replace the `:root` and `.dark` blocks in `dist/theme/semantic-tokens.css`
3. Everything updates automatically — all components, the doc site, dark mode

## Design principles

### Native web platform first

Every component starts from a native HTML element or browser API. If the browser can do it, we don't write JavaScript for it.

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

### Other principles

- **No frameworks** — no React, no Vue, no Alpine, no build tools for the consumer
- **Token-driven** — every color, radius, and shadow comes from CSS custom properties
- **AI-optimized** — patterns are structured for machine consumption, not human tutorials
- **Dark mode automatic** — the token cascade handles it, no `dark:` overrides needed
- **Variant via data attributes** — `data-variant="primary"`, not `btn-primary`

## Author

Built by [Cody Lindley](https://codylindley.com)

## License

Licensed under the [MIT License](LICENSE).
