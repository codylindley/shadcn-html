---
description: "Use when editing HTML documentation pages in dist/documentation/. Covers boilerplate, sidebar nav, CSS imports, and the inline theme bridge."
applyTo: "dist/documentation/**/*.html"
---
# Documentation Pages

## Shared layout (Web Components)

The header and sidebar navigation are centralized in `dist/documentation/js/layout.js`
using two custom elements:

- `<site-header>` — renders the fixed header (logo, GitHub link, dark mode toggle)
- `<site-nav>` — renders the sidebar with navigation links, auto-detecting the active page

**To add/remove/reorder nav links or change the header, edit `layout.js` only.**
No need to touch individual HTML files for navigation changes.

`layout.js` is loaded **synchronously** in `<head>` (no `defer`) so the custom
elements render without FOUC when the parser encounters them in `<body>`.

### layout.js data structures

- `NAV` — array of `{ heading, items: [{ label, href }] }` defining the sidebar sections
- `BUILT` — `Set` of page filenames that have real doc pages (non-built pages render as disabled links)

## Adding a component page

1. Copy an existing component page (e.g., `badge.html`) as the template
2. Change the `<title>`, `<h1>`, breadcrumb, and main content
3. Add `<link rel="stylesheet" href="../components/{name}/{name}.css">` to the head
4. Add `<script type="module" src="../components/{name}/{name}.js"></script>` if interactive
5. In `layout.js`: add the page to the `NAV` array and the `BUILT` set

No need to update sidebar nav links in other files — `<site-nav>` handles it globally.

## Sidebar nav order

The sidebar is ordered by dependency (primitives first):
1. Overview (Introduction, Installation, Theming, Dark Mode, Data Attribute API, Cascade Layers, ES Modules, Native Web APIs, Animations, Accessibility, Component Skills, Changelog)
2. Primitives (Typography, Separator, Icon)
3. Layout (Scroll Area, Carousel, Sortable)
4. Actions (Button, Toggle, Toggle Group, Button Group, Toolbar)
5. Forms & Inputs (Label, Input, Textarea, Checkbox, Radio Group, Switch, Slider, Select, Number Input, File Input, Color Picker, Date Picker, Combobox, Form)
6. Data Display (Badge, Avatar, Card, Image, Statistic, Table, Collapsible, Timeline, Tree View, Calendar)
7. Feedback & Status (Spinner, Skeleton, Progress, Alert, Alert Dialog, Toast)
8. Overlays (Popover, Tooltip, Context Menu, Dialog, Sheet, Accordion, Command)
9. Navigation (Breadcrumb, Pagination, Steps, Tabs, Dropdown Menu, Navigation Menu)
10. Application (Sidebar)

To reorder, edit the `NAV` array in `layout.js`.

## CSS and JS imports

Every page imports ALL component CSS and JS files (not just its own). This ensures
components used in demos on other pages render correctly. CSS and JS files live in
`../components/{name}/{name}.css` and `../components/{name}/{name}.js` respectively.

## Inline source code snippets

Each component doc page displays the component's CSS and JS in `<pre><code>` blocks.
These inline snippets must always match the actual files in `dist/components/`.
After editing any component `.css` or `.js` file, run:

```
node scripts/sync-css-snippets.js
node scripts/sync-js-snippets.js
```

These scripts replace every inline snippet with the current file content.
Do NOT manually edit the `<pre><code>` blocks — they will be overwritten by the sync scripts.

## Doc-site Tailwind CSS

The doc site uses Tailwind utility classes for layout in page content.
These are compiled to a static CSS file (`css/docs-tailwind.css`) — there is no CDN
or runtime dependency. If new Tailwind classes are added to HTML, rebuild with:
`npm run docs:build-css`
