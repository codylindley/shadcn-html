# Sortable

## Native basis

HTML Drag and Drop API + keyboard reordering for accessible drag-and-drop lists. Uses native `draggable`, `DataTransfer`, and DOM manipulation — no SortableJS or drag libraries.

## Native Web APIs

- [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) — native drag/drop with `dragstart`, `dragover`, `drop`, `dragend` events
- [`draggable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable) — makes elements natively draggable
- [`DataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) — drag operation data and `effectAllowed`/`dropEffect`
- [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) — `sortable-change` event dispatched on reorder
- [`aria-live`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) — live region announces position changes to screen readers
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring on items
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses transitions
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) — Windows High Contrast Mode support
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) — enhanced contrast support

## Structure

### Default (vertical)

```html
<ul class="sortable" role="listbox" aria-label="Reorder items">
  <li class="sortable-item" draggable="true" role="option" tabindex="0">
    <span class="sortable-handle"><i data-lucide="grip-vertical"></i></span>
    <span>Item 1</span>
  </li>
  <li class="sortable-item" draggable="true" role="option" tabindex="-1">
    <span class="sortable-handle"><i data-lucide="grip-vertical"></i></span>
    <span>Item 2</span>
  </li>
  <li class="sortable-item" draggable="true" role="option" tabindex="-1">
    <span class="sortable-handle"><i data-lucide="grip-vertical"></i></span>
    <span>Item 3</span>
  </li>
</ul>
```

### Horizontal

```html
<ul class="sortable" role="listbox" aria-label="Reorder items" data-orientation="horizontal">
  <li class="sortable-item" draggable="true" role="option" tabindex="0">
    <span>Item A</span>
  </li>
  <li class="sortable-item" draggable="true" role="option" tabindex="-1">
    <span>Item B</span>
  </li>
</ul>
```

### Disabled item

```html
<li class="sortable-item" aria-disabled="true" tabindex="-1">
  <span class="sortable-handle"><i data-lucide="grip-vertical"></i></span>
  <span>Locked item</span>
</li>
```

## Orientation

| `data-orientation` | Direction | Nav keys | Reorder keys |
| --- | --- | --- | --- |
| _(default)_ | Vertical (column) | `↑` / `↓` | `Alt + ↑` / `Alt + ↓` |
| `horizontal` | Horizontal (row) | `←` / `→` | `Alt + ←` / `Alt + →` |

## States

| `data-*` / attribute | Element | Visual |
| --- | --- | --- |
| `data-dragging` | `.sortable-item` | Reduced opacity + shadow + dashed border |
| `data-over="before"` | `.sortable-item` | Primary-colored top (or start) border |
| `data-over="after"` | `.sortable-item` | Primary-colored bottom (or end) border |
| `data-active` | `.sortable-item` | Ring border + accent background (keyboard focus) |
| `aria-disabled="true"` | `.sortable-item` | Reduced opacity, not draggable |

## Keyboard

| Key | Action |
| --- | --- |
| `↓` / `→` | Move focus to next item |
| `↑` / `←` | Move focus to previous item |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |
| `Alt + ↓` / `Alt + →` | Move focused item down / right |
| `Alt + ↑` / `Alt + ←` | Move focused item up / left |

Arrow direction depends on orientation — vertical uses `↑`/`↓`, horizontal uses `←`/`→`.

## ARIA

| Attribute | Element | Purpose |
| --- | --- | --- |
| `role="listbox"` | `.sortable` | Identifies container as a reorderable list |
| `aria-label` | `.sortable` | Accessible name for the list |
| `role="option"` | `.sortable-item` | Individual draggable item |
| `draggable="true"` | `.sortable-item` | Enables native drag |
| `tabindex` | `.sortable-item` | Roving tabindex: `0` on active, `-1` on others |
| `aria-disabled="true"` | `.sortable-item` | Marks item as non-interactive |
| `aria-live="assertive"` | `.sortable-live` | Live region announces reorder to screen readers |

## Events

| Event | Target | `detail` |
| --- | --- | --- |
| `sortable-change` | `.sortable` | `{ item: HTMLElement, index: number }` |

Dispatched via `CustomEvent` after every reorder (drag-drop or keyboard).

## Notes

- JS handles `dragstart`, `dragend`, `dragover`, `dragleave`, and `drop` for mouse/touch reordering.
- Keyboard reordering uses `Alt + Arrow` following the WAI-ARIA APG rearrangeable listbox pattern.
- A `.sortable-live` region is auto-created by JS if not present in the markup.
- `user-select: none` prevents text selection during drag.
- `cursor: grab` / `cursor: grabbing` provides visual feedback.
- Drop position is calculated from pointer midpoint — items drop before or after the target.
- `prefers-reduced-motion: reduce` suppresses transitions.
- `forced-colors: active` maps to system colors for High Contrast Mode.
- Disabled items (`aria-disabled="true"`) are skipped by keyboard navigation and cannot be dragged.
- The `sortable-change` event bubbles so ancestors can listen for reorder events.
