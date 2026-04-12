# shadcn-html

[![GitHub stars](https://img.shields.io/github/stars/codylindley/shadcn-html?style=flat&logo=github)](https://github.com/codylindley/shadcn-html)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![No dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![HTML CSS JS](https://img.shields.io/badge/stack-HTML%20·%20CSS%20·%20JS-orange)

**A UI component system that scales with AI.** Themeable components built on semantic HTML, modern CSS, and vanilla JavaScript. No framework. No build step. No abstraction layers to get wrong. The simplest possible foundation for AI-driven prototyping.

**[Documentation & Live Demos →](https://shadcn-html.netlify.app/documentation/)**

## What this is

A portable UI component system built on the [shadcn/ui](https://ui.shadcn.com) token model.

- **Themeable** — full shadcn semantic token model. Swap a [tweakcn](https://tweakcn.com) theme and every component updates instantly
- **Component Skills** — every component includes a structured skill — markup, variants, ARIA, and wiring conventions — grounded in web standards
- **Accessible** — built on native HTML elements and WAI-ARIA patterns. Keyboard navigation, focus management, and screen reader support by default
- **Framework Free** — runs in any browser, zero dependencies, no build pipeline required

## Quick start

### Via CDN

```html
<!-- 1. Add a theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/codylindley/shadcn-html@latest/dist/theme/default-semantic-tokens.css">

<!-- 2. Add the icons -->
<script src="https://unpkg.com/lucide@1.8.0"></script>
<script>lucide.createIcons();</script>

<!-- 3. Select the components you want -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/codylindley/shadcn-html@latest/dist/components/button/button.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/codylindley/shadcn-html@latest/dist/components/dialog/dialog.css">
<script type="module" src="https://cdn.jsdelivr.net/gh/codylindley/shadcn-html@latest/dist/components/dialog/dialog.js"></script>
```

### Self-hosting

Download the full system and drop it into any project. All the files are static — no build step, no dependencies. Point an AI at the folder and it has everything it needs: component skills to read, CSS to include, JS to wire up, and the entire documentation site with working examples of every component.

**[Download latest (.zip)](https://github.com/codylindley/shadcn-html/archive/refs/heads/main.zip)**

## Built on five layers

Each component is a self-contained folder with up to five layers:

```
components/
└── dialog/
    ├── component-skill.md    ← structured skill: HTML structure, attributes, ARIA
    ├── dialog.css            ← stylesheet (uses design tokens)
    └── dialog.js             ← interaction behavior (when needed)
```

1. **Semantic tokens** — `default-semantic-tokens.css` defines every design token for the default light and dark theme. To switch themes, you just switch this file.
2. **Component CSS** — each component's stylesheet, built entirely on tokens.
3. **Semantic HTML** — native HTML elements with data attributes for variants and wiring.
4. **Vanilla JavaScript** — interaction logic, only when HTML and CSS can't express the behavior.
5. **Component skill** — a structured instruction set that documents how to build the component: markup, variants, ARIA, and wiring conventions.

Some components — like Button and Badge — are CSS-only. No JavaScript needed.

## Theming

Tokens are compatible with [tweakcn.com](https://tweakcn.com) theme exports. To switch themes, you just switch the token file — that's all the theme selector in the documentation site is doing.

1. Export a theme from tweakcn.com
2. Replace the `:root` and `.dark` blocks in `dist/theme/default-semantic-tokens.css`
3. Everything updates automatically — all components, the doc site, dark mode

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

- **Token-driven** — every color, radius, and shadow comes from CSS custom properties
- **Dark mode automatic** — the token cascade handles it, no overrides needed
- **Variant via data attributes** — `data-variant="primary"`, not `btn-primary`

## Author

Built by [Cody Lindley](https://codylindley.com)

## License

Licensed under the [MIT License](LICENSE).
