---
description: "Use when editing HTML documentation pages in dist/documentation/. Covers boilerplate, sidebar nav, CSS imports, and the inline theme bridge."
applyTo: "dist/documentation/**/*.html"
---
# Documentation Pages

## Shared boilerplate

All HTML files share identical:
- `<head>` block (Tailwind CDN, Google Fonts, CSS imports, inline `@theme` block)
- Header (logo, GitHub link, dark mode toggle)
- Sidebar navigation

When modifying any of these, update ALL HTML files — not just the current one.

## Adding a component page

1. Copy an existing component page (e.g., `dialog.html`) as the template
2. Change the `<title>`, `<h1>`, breadcrumb, and `active` class on the sidebar nav link
3. Add `<link rel="stylesheet" href="css/components/{name}.css">` to the head
4. Add the sidebar nav link to ALL other HTML files
5. The inline `@theme` block must remain unchanged — it's the Tailwind theme bridge

## Sidebar nav order

Components are listed after the Overview section:
1. Button
2. Dialog
3. Sheet
4. Card
5. Accordion
6. Tabs
7. Dropdown
8. Toast
9. Combobox

New components: add alphabetically or group logically after existing entries.

## CSS imports

Every page imports ALL component CSS files (not just its own). This ensures
components used in demos on other pages render correctly.

## The inline theme bridge

The `<style type="text/tailwindcss">` block in each file IS the theme bridge.
It cannot be `<link>`-ed — the Tailwind CDN browser build requires it inline.
If `dist/theme/theme.css` changes, update this block in every HTML file.
