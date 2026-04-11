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
4. Add `<script src="../components/{name}/{name}.js" defer></script>` if interactive
5. In `layout.js`: add the page href to the `BUILT` set

No need to update sidebar nav links in other files — `<site-nav>` handles it globally.

## Sidebar nav order

The sidebar is ordered by dependency (primitives first):
1. Primitives (Typography, Separator, Icon, Link, Label)
2. Actions (Button, Toggle, Toggle Group, Button Group, Toolbar)
3. Forms & Inputs
4. Data Display
5. Feedback & Status
6. Overlays
7. Navigation
8. Layout

To reorder, edit the `NAV` array in `layout.js`.

## CSS and JS imports

Every page imports ALL component CSS and JS files (not just its own). This ensures
components used in demos on other pages render correctly. CSS and JS files live in
`../components/{name}/{name}.css` and `../components/{name}/{name}.js` respectively.

## Doc-site Tailwind CSS

The doc site uses Tailwind utility classes for layout in page content.
These are compiled to a static CSS file (`css/docs-tailwind.css`) — there is no CDN
or runtime dependency. If new Tailwind classes are added to HTML, rebuild with:
`npm run docs:build-css`
