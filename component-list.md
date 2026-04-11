# Component List

> **Ordered by dependency** — primitives first, then categories that build on them.

## Primitives

| Component | Status | Native basis |
|-----------|--------|-------------|
| Typography | ✅ | `<h1>`–`<h6>`, `<p>`, `<code>` |
| Separator | ✅ | `<hr>` |
| Icon | ✅ | `<svg>` wrapper |
| Link | ✅ | `<a>` |
| Label | ✅ | `<label>` |

## Actions

| Component | Status | Native basis |
|-----------|--------|-------------|
| Button | ✅ | `<button>` |
| Toggle | ✅ | `<button>` |
| Toggle Group | ✅ | `role="group"` + buttons |
| Button Group | ✅ | `<div>` + buttons |
| Toolbar | ✅ | `role="toolbar"` |

## Forms & Inputs

| Component | Status | Native basis |
|-----------|--------|-------------|
| Input | ✅ | `<input>` |
| Textarea | ✅ | `<textarea>` |
| Checkbox | ✅ | `<input type="checkbox">` |
| Radio Group | ✅ | `<input type="radio">` |
| Switch | ✅ | `<input type="checkbox">` |
| Slider | ✅ | `<input type="range">` |
| Select | ✅ | `<select>` or custom |
| Number Input | ✅ | `<input type="number">` |
| File Input | ✅ | `<input type="file">` |
| Color Picker | ✅ | `<input type="color">` or custom |
| Date Picker | ✅ | `<input type="date">` or custom |
| Combobox | ✅ | `<input>` + `role="listbox"` |
| Form | ✅ | `<form>` + field layout |

## Data Display

| Component | Status | Native basis |
|-----------|--------|-------------|
| Badge | ✅ | `<span>` |
| Tag | ✅ | `<span>` |
| Avatar | ✅ | `<img>` + fallback |
| Card | ✅ | `<article>` |
| Image | ✅ | `<img>` + aspect ratio |
| List | ✅ | `<ul>` / `<ol>` |
| Descriptions | ✅ | `<dl>` |
| Statistic | ✅ | `<div>` |
| Table | ✅ | `<table>` |
| Empty State | ✅ | `<div>` |
| Collapsible | ✅ | `<details>` |
| Timeline | ✅ | `<ol>` |
| Tree View | ✅ | `<ul>` nested + ARIA |
| Calendar | ✅ | `<table>` or grid |

## Feedback & Status

| Component | Status | Native basis |
|-----------|--------|-------------|
| Spinner | ✅ | CSS animation |
| Skeleton | ✅ | CSS animation |
| Progress | ✅ | `<progress>` |
| Alert | ✅ | `<div role="alert">` |
| Alert Dialog | ✅ | `<dialog>` |
| Toast | ✅ | `popover` API |

## Overlays

| Component | Status | Native basis |
|-----------|--------|-------------|
| Popover | ✅ | `popover` API |
| Tooltip | ✅ | `popover` API |
| Context Menu | ✅ | `popover` API |
| Dialog | ✅ | `<dialog>` |
| Sheet | ✅ | `<dialog>` |
| Accordion | ✅ | `<details>` |
| Command | ✅ | `<dialog>` + search |

## Navigation

| Component | Status | Native basis |
|-----------|--------|-------------|
| Breadcrumb | ✅ | `<nav>` + `<ol>` |
| Pagination | ✅ | `<nav>` + links |
| Steps | ✅ | `<ol>` + ARIA |
| Tabs | ✅ | `role="tablist"` |
| Dropdown Menu | ✅ | `popover` API |
| Navigation Menu | ✅ | `<nav>` + `<ul>` |

## Layout

| Component | Status | Native basis |
|-----------|--------|-------------|
| Aspect Ratio | ✅ | CSS `aspect-ratio` |
| Container | ✅ | `<div>` |
| Scroll Area | ✅ | CSS overflow + custom scrollbar |
| Carousel | ✅ | scroll snap + buttons |
| Sidebar | ✅ | `<aside>` + `<nav>` |
| Sortable | ✅ | Drag and Drop API |
