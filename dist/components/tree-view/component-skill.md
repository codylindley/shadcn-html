# Tree View

## Native basis

Nested `<ul>` elements with `role="tree"` / `role="treeitem"` ARIA pattern for hierarchical data.

## Native Web APIs

- [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) — nested list structure
- [Tree View WAI-ARIA pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) — ARIA tree roles and keyboard navigation
- [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) — native expand/collapse for branches

## Structure

```html
<ul class="tree" role="tree" aria-label="File explorer">
  <li class="tree-item" role="treeitem" aria-expanded="true">
    <details class="tree-branch" open>
      <summary class="tree-branch-trigger">
        <svg><!-- chevron --></svg>
        <svg><!-- folder icon --></svg>
        <span>src</span>
      </summary>
      <ul class="tree-group" role="group">
        <li class="tree-item" role="treeitem">
          <span class="tree-leaf">
            <svg><!-- file icon --></svg>
            <span>index.ts</span>
          </span>
        </li>
      </ul>
    </details>
  </li>
  <li class="tree-item" role="treeitem">
    <span class="tree-leaf">
      <svg><!-- file icon --></svg>
      <span>package.json</span>
    </span>
  </li>
</ul>
```

## Accessibility

- Root `<ul>` has `role="tree"` and `aria-label`
- Branch items have `role="treeitem"` and `aria-expanded`
- Leaf items have `role="treeitem"` without `aria-expanded`
- Nested groups use `role="group"`
- Keyboard: Arrow keys navigate, Enter/Space toggles branches
