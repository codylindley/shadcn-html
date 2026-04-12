# Sortable

## Native basis

HTML Drag and Drop API for reorderable lists — no SortableJS or drag libraries needed.

## Native Web APIs

- [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) — native drag/drop with data transfer
- [`draggable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable) — makes elements draggable
- [`DataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) — drag operation data
- [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) — keyboard-only focus ring on items
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — suppresses opacity/shadow transitions

## Structure

```html
<ul class="sortable" role="listbox">
  <li class="sortable-item" draggable="true" role="option">
    <span class="sortable-handle">
      <i data-lucide="grip-vertical"></i>
    </span>
    <span>Item 1</span>
  </li>
  <li class="sortable-item" draggable="true" role="option">
    <span class="sortable-handle">
      <i data-lucide="grip-vertical"></i>
    </span>
    <span>Item 2</span>
  </li>
</ul>
```

## States

| `data-*`       | Element          | Visual                        |
| -------------- | ---------------- | ----------------------------- |
| `data-dragging` | `.sortable-item` | Reduced opacity + shadow     |
| `data-over`     | `.sortable-item` | Dashed primary border        |

## ARIA

| Attribute      | Element          | Purpose                       |
| -------------- | ---------------- | ----------------------------- |
| `role="listbox"`| `.sortable`     | Reorderable list container    |
| `role="option"` | `.sortable-item`| Individual draggable item     |
| `draggable`     | `.sortable-item`| Enables native drag           |

## Notes

- JS handles `dragstart`, `dragend`, `dragover`, `dragleave`, and `drop` events to reorder DOM elements.
- `user-select: none` prevents text selection during drag.
- `cursor: grab` / `cursor: grabbing` provides visual feedback.
- Uses native Drag and Drop API — no SortableJS or drag libraries.
- `prefers-reduced-motion: reduce` suppresses transitions.
