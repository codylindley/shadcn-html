# Pattern: Combobox

## Native basis
`<input>` with `role="combobox"` + `<div role="listbox">` popup.
The `popover` API provides top-layer rendering and light-dismiss.
Requires JavaScript for filtering, keyboard navigation, selection, and
ARIA management. Follows the WAI-ARIA Combobox design pattern.

DOM focus stays on the `<input>` at all times. List navigation is
managed via `aria-activedescendant`.

---

## Structure

```html
<div class="combobox">
  <!-- Label -->
  <label class="label" for="framework-input">Framework</label>

  <!-- Input group -->
  <div class="combobox-input-group">
    <input id="framework-input"
           class="input"
           type="text"
           role="combobox"
           autocomplete="off"
           aria-expanded="false"
           aria-controls="framework-listbox"
           aria-activedescendant=""
           aria-autocomplete="list"
           placeholder="Search framework...">
    <button class="combobox-trigger" type="button"
            tabindex="-1" aria-label="Toggle suggestions">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  </div>

  <!-- Listbox popup -->
  <div id="framework-listbox"
       class="combobox-content"
       role="listbox"
       popover
       aria-label="Frameworks">
    <div class="combobox-empty" hidden>No results found.</div>
    <div role="option" id="opt-next" class="combobox-item"
         data-value="nextjs" aria-selected="false">
      Next.js
    </div>
    <div role="option" id="opt-svelte" class="combobox-item"
         data-value="sveltekit" aria-selected="false">
      SvelteKit
    </div>
    <div role="option" id="opt-nuxt" class="combobox-item"
         data-value="nuxt" aria-selected="false">
      Nuxt
    </div>
    <div role="option" id="opt-astro" class="combobox-item"
         data-value="astro" aria-selected="false">
      Astro
    </div>
  </div>
</div>
```

### With groups

```html
<div id="my-listbox" class="combobox-content" role="listbox" popover>
  <div role="group" aria-labelledby="group-frontend">
    <div class="combobox-group-label" id="group-frontend">Frontend</div>
    <div role="option" class="combobox-item" id="opt-react"
         data-value="react">React</div>
    <div role="option" class="combobox-item" id="opt-vue"
         data-value="vue">Vue</div>
  </div>
  <div class="combobox-separator"></div>
  <div role="group" aria-labelledby="group-backend">
    <div class="combobox-group-label" id="group-backend">Backend</div>
    <div role="option" class="combobox-item" id="opt-express"
         data-value="express">Express</div>
  </div>
</div>
```

---

## CSS classes

| Class                   | Token usage                                        | Notes                          |
|-------------------------|-----------------------------------------------------|--------------------------------|
| `.combobox`             | —                                                   | Wrapper, position: relative    |
| `.combobox-input-group` | —                                                   | flex row, position: relative   |
| `.combobox-trigger`     | `--muted-foreground`                                | Absolute right, inside input   |
| `.combobox-content`     | `--popover` bg, `--popover-foreground`, `--border`  | shadow, `border-radius: var(--radius-lg)` |
| `.combobox-item`        | transparent bg, `--foreground`                      | hover: `--accent` bg           |
| `.combobox-item[data-highlighted]` | `--accent` bg, `--accent-foreground`     | Currently keyboard-focused     |
| `.combobox-item[aria-selected="true"]` | —                                      | Shows check icon               |
| `.combobox-empty`       | `--muted-foreground`                                | centered text, 0.875rem        |
| `.combobox-group-label` | `--muted-foreground`                                | 0.75rem, font-weight 600       |
| `.combobox-separator`   | `--border` bg                                       | `height: 1px`                  |

---

## Token usage (CSS)

```css
@layer components {
  .combobox {
    position: relative;
    anchor-name: --combobox-anchor;
  }

  .combobox-input-group {
    position: relative;
    display: flex;

    & .input { padding-right: 2.25rem; }
  }

  .combobox-trigger {
    position: absolute;
    right: 0; top: 0;
    height: 100%;
    width: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--muted-foreground);
    cursor: pointer;

    &:hover { color: var(--foreground); }
  }

  .combobox-content {
    position-anchor: --combobox-anchor;
    top: anchor(bottom);
    left: anchor(left);
    width: anchor-size(width);
    margin: 0;
    margin-top: 4px;
    position-try: flip-block;
    background-color: var(--popover);
    color: var(--popover-foreground);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 0.25rem;
    min-width: 8rem;
    max-height: 16rem;
    overflow-y: auto;
    box-shadow: 0 4px 16px oklch(0 0 0 / 0.12);

    &:popover-open {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .combobox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.5rem;
    border-radius: calc(var(--radius) * 0.6);
    font-size: 0.875rem;
    cursor: pointer;
    outline: none;
    transition: background 100ms;

    &:hover, &[data-highlighted] {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }

    &[aria-selected="true"]::before {
      content: '';
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
      background-size: contain;
      flex-shrink: 0;
    }

    &[aria-disabled="true"] {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  .combobox-empty {
    padding: 1.5rem 0.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }

  .combobox-group-label {
    padding: 0.375rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-foreground);
  }

  .combobox-separator {
    height: 1px;
    background: var(--border);
    margin: 0.25rem -0.25rem;
  }
}
```

---

## JavaScript

```js
document.querySelectorAll('.combobox').forEach(wrapper => {
  const input = wrapper.querySelector('[role="combobox"]');
  const listbox = wrapper.querySelector('[role="listbox"]');
  const trigger = wrapper.querySelector('.combobox-trigger');
  const empty = wrapper.querySelector('.combobox-empty');
  if (!input || !listbox) return;

  const allItems = [...listbox.querySelectorAll('[role="option"]')];
  let highlighted = -1;

  function getVisibleItems() {
    return allItems.filter(item => !item.hidden);
  }

  function open() {
    listbox.showPopover();
    input.setAttribute('aria-expanded', 'true');
  }

  function close() {
    listbox.hidePopover();
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-activedescendant', '');
    clearHighlight();
  }

  function isOpen() {
    return listbox.matches(':popover-open');
  }

  function filter(query) {
    const q = query.toLowerCase();
    let hasVisible = false;
    allItems.forEach(item => {
      const match = !q || item.textContent.trim().toLowerCase().includes(q);
      item.hidden = !match;
      if (match) hasVisible = true;
    });
    if (empty) empty.hidden = hasVisible;
  }

  function clearHighlight() {
    allItems.forEach(item => delete item.dataset.highlighted);
    highlighted = -1;
  }

  function highlight(index) {
    const items = getVisibleItems();
    clearHighlight();
    if (index < 0 || index >= items.length) return;
    highlighted = index;
    items[index].dataset.highlighted = '';
    items[index].scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', items[index].id);
  }

  function selectItem(item) {
    // Clear previous selection
    allItems.forEach(i => i.setAttribute('aria-selected', 'false'));
    item.setAttribute('aria-selected', 'true');
    input.value = item.textContent.trim();
    close();
  }

  // Input events
  input.addEventListener('input', () => {
    filter(input.value);
    if (!isOpen()) open();
    highlight(0);
  });

  input.addEventListener('focus', () => {
    if (!isOpen()) {
      filter(input.value);
      open();
    }
  });

  input.addEventListener('keydown', e => {
    const items = getVisibleItems();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen()) { open(); highlight(0); return; }
        highlight(Math.min(highlighted + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen()) { open(); highlight(items.length - 1); return; }
        highlight(Math.max(highlighted - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlighted >= 0 && items[highlighted]) {
          selectItem(items[highlighted]);
        }
        break;
      case 'Escape':
        if (isOpen()) {
          e.preventDefault();
          close();
        }
        break;
      case 'Tab':
        close();
        break;
    }
  });

  // Trigger button
  if (trigger) {
    trigger.addEventListener('click', () => {
      if (isOpen()) { close(); } else { filter(''); open(); highlight(-1); }
      input.focus();
    });
  }

  // Click on item
  listbox.addEventListener('click', e => {
    const item = e.target.closest('[role="option"]');
    if (item && !item.hidden) selectItem(item);
  });

  // Hover highlight
  listbox.addEventListener('mousemove', e => {
    const item = e.target.closest('[role="option"]');
    if (item && !item.hidden) {
      const items = getVisibleItems();
      highlight(items.indexOf(item));
    }
  });

  // Close on outside click (popover handles this)
  listbox.addEventListener('toggle', e => {
    if (e.newState === 'closed') {
      input.setAttribute('aria-expanded', 'false');
      clearHighlight();
    }
  });
});
```

---

## ARIA

| Attribute                | Where            | Value                                   |
|--------------------------|------------------|-----------------------------------------|
| `role="combobox"`        | input            | Always                                  |
| `aria-expanded`          | input            | `true` when popup open, `false` when closed |
| `aria-controls`          | input            | ID of the listbox                       |
| `aria-activedescendant`  | input            | ID of the highlighted option            |
| `aria-autocomplete`      | input            | `list` (filters as you type)            |
| `aria-label` or label    | input            | Accessible name                         |
| `role="listbox"`         | popup            | Always                                  |
| `role="option"`          | each item        | Always                                  |
| `aria-selected`          | each option      | `true` for selected, `false` otherwise  |
| `aria-disabled`          | disabled options | `true` if option is disabled            |
| `role="group"`           | option groups    | With `aria-labelledby`                  |

---

## Keyboard interactions

### Focus on input:

| Key           | Behavior                                         |
|---------------|--------------------------------------------------|
| `ArrowDown`   | Open popup, highlight first/next item            |
| `ArrowUp`     | Open popup, highlight last/previous item         |
| `Enter`       | Select highlighted item, close popup             |
| `Escape`      | Close popup                                      |
| `Tab`         | Close popup, move focus to next element          |
| Typing        | Filter items, open popup if closed               |

---

## Notes

- DOM focus stays on the `<input>` at all times — never move focus into the listbox
- Use `aria-activedescendant` to communicate the highlighted item to screen readers
- The `popover` attribute on the listbox enables top-layer rendering and avoids overflow clipping
- Position the listbox with JS relative to the input wrapper
- The check icon for selected items can be done with a CSS `::before` pseudo-element
- For multi-select, toggle `aria-selected` on click and display selected items as chips/tags above the input
- Filter matching should be case-insensitive and support substring matching
- The empty state element should be shown when no items match the filter query
