# Component List

## Forms & Inputs

| Component | Status | Native basis |
|-----------|--------|-------------|
| Input | ✅ | `<input>` |
| Textarea | ❌ | `<textarea>` |
| Select | ❌ | `<select>` or custom |
| Checkbox | ❌ | `<input type="checkbox">` |
| Radio Group | ❌ | `<input type="radio">` |
| Switch | ❌ | `<input type="checkbox">` |
| Slider | ❌ | `<input type="range">` |
| Label | ❌ | `<label>` |
| Combobox | ✅ | `<input>` + `role="listbox"` |
| Number Input | ❌ | `<input type="number">` |
| Date Picker | ❌ | `<input type="date">` or custom |
| File Input | ❌ | `<input type="file">` |
| Color Picker | ❌ | `<input type="color">` or custom |
| Form | ❌ | `<form>` + field layout |

## Data Display

| Component | Status | Native basis |
|-----------|--------|-------------|
| Badge | ✅ | `<span>` |
| Card | ✅ | `<article>` |
| Table | ❌ | `<table>` |
| Avatar | ❌ | `<img>` + fallback |
| Separator | ❌ | `<hr>` |
| List | ❌ | `<ul>` / `<ol>` |
| Descriptions | ❌ | `<dl>` |
| Empty State | ❌ | `<div>` |
| Collapsible | ❌ | `<details>` |
| Typography | ❌ | `<h1>`–`<h6>`, `<p>`, `<code>` |
| Image | ❌ | `<img>` + aspect ratio |
| Icon | ✅ | `<svg>` wrapper |
| Tag | ❌ | `<span>` |
| Statistic | ❌ | `<div>` |
| Timeline | ❌ | `<ol>` |
| Tree View | ❌ | `<ul>` nested + ARIA |
| Calendar | ❌ | `<table>` or grid |

## Feedback & Status

| Component | Status | Native basis |
|-----------|--------|-------------|
| Toast | ✅ | `popover` API |
| Alert | ❌ | `<div role="alert">` |
| Progress | ❌ | `<progress>` |
| Skeleton | ❌ | CSS animation |
| Spinner | ❌ | CSS animation |
| Alert Dialog | ❌ | `<dialog>` |

## Overlays

| Component | Status | Native basis |
|-----------|--------|-------------|
| Dialog | ✅ | `<dialog>` |
| Sheet | ✅ | `<dialog>` |
| Accordion | ✅ | `<details>` |
| Popover | ❌ | `popover` API |
| Tooltip | ❌ | `popover` API |
| Command | ❌ | `<dialog>` + search |
| Context Menu | ❌ | `popover` API |

## Navigation

| Component | Status | Native basis |
|-----------|--------|-------------|
| Tabs | ✅ | `role="tablist"` |
| Dropdown Menu | ✅ | `popover` API |
| Breadcrumb | ❌ | `<nav>` + `<ol>` |
| Pagination | ❌ | `<nav>` + links |
| Steps | ❌ | `<ol>` + ARIA |
| Navigation Menu | ❌ | `<nav>` + `<ul>` |
| Link | ❌ | `<a>` |

## Actions

| Component | Status | Native basis |
|-----------|--------|-------------|
| Button | ✅ | `<button>` |
| Toggle | ✅ | `<button>` |
| Toggle Group | ❌ | `role="group"` + buttons |
| Button Group | ❌ | `<div>` + buttons |
| Toolbar | ❌ | `role="toolbar"` |

## Layout

| Component | Status | Native basis |
|-----------|--------|-------------|
| Sidebar | ❌ | `<aside>` + `<nav>` |
| Container | ❌ | `<div>` |
| Scroll Area | ❌ | CSS overflow + custom scrollbar |
| Carousel | ❌ | scroll snap + buttons |
| Sortable | ❌ | Drag and Drop API |
| Aspect Ratio | ❌ | CSS `aspect-ratio` |
