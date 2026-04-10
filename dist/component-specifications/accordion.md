# Pattern: Accordion

## Native basis
`<details>` / `<summary>` elements. The browser provides:
- Click to toggle (automatically)
- Enter/Space to toggle when focused (automatically)
- `open` attribute for state (automatically)

For single-open behavior (closing others when one opens), minimal JavaScript
is required. For multi-open, pure HTML with no JS works.

---

## Structure

### Multi-open (zero JS)

```html
<div class="accordion">
  <details class="accordion-item" open>
    <summary class="accordion-trigger">
      <span>Is it accessible?</span>
      <svg class="accordion-chevron" aria-hidden="true" width="16" height="16"
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </summary>
    <div class="accordion-content">
      <p>Yes. It uses native HTML details/summary which are fully accessible
         by default. Keyboard and screen reader support are built in.</p>
    </div>
  </details>

  <details class="accordion-item">
    <summary class="accordion-trigger">
      <span>Is it styled?</span>
      <svg class="accordion-chevron" aria-hidden="true" width="16" height="16"
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </summary>
    <div class="accordion-content">
      <p>Yes. It follows the shadcn/ui token system for consistent theming.</p>
    </div>
  </details>

  <details class="accordion-item">
    <summary class="accordion-trigger">
      <span>Is it animated?</span>
      <svg class="accordion-chevron" aria-hidden="true" width="16" height="16"
           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </summary>
    <div class="accordion-content">
      <p>Yes. The chevron rotates and content can use CSS transitions.</p>
    </div>
  </details>
</div>
```

### Single-open (one item at a time)

```html
<div class="accordion" data-type="single">
  <!-- same structure — JS closes siblings on open -->
</div>
```

### Collapsible single (allow all closed)

```html
<div class="accordion" data-type="single" data-collapsible>
  <!-- same structure — can close active item -->
</div>
```

---

## CSS classes

| Class                 | Token usage                                     | Notes                          |
|-----------------------|-------------------------------------------------|--------------------------------|
| `.accordion`          | —                                               | Wrapper, flex column           |
| `.accordion-item`     | `--border` bottom border                        | Last child has no bottom border|
| `.accordion-trigger`  | `--foreground` text                             | flex row, justify-between, full width, cursor pointer |
| `.accordion-chevron`  | `--muted-foreground`                            | Rotates 180deg when open       |
| `.accordion-content`  | `--foreground` text                             | padding-bottom only            |

---

## Token usage (CSS)

```css
@layer components {
  .accordion {
    display: flex;
    flex-direction: column;
  }

  .accordion-item {
    border-bottom: 1px solid var(--border);

    &:last-child { border-bottom: none; }

    /* ── Content animation (CSS-only) ───────────────────────── */
    & ::details-content {
      block-size: 0;
      overflow-y: clip;
      transition: block-size 200ms ease, content-visibility 200ms allow-discrete;
    }

    &[open] ::details-content {
      block-size: auto;
    }
  }

  @starting-style {
    .accordion-item[open] ::details-content {
      block-size: 0;
    }
  }

  /* Remove default details marker */
  .accordion-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 0;
    font-size: 0.9375rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    list-style: none;
    color: var(--foreground);
    transition: color 150ms;

    &::-webkit-details-marker { display: none; }
    &::marker { content: ''; }
    &:hover { text-decoration: underline; }
  }

  /* Chevron rotation */
  .accordion-chevron {
    color: var(--muted-foreground);
    transition: transform 200ms ease;
    flex-shrink: 0;

    details[open] > .accordion-trigger & {
      transform: rotate(180deg);
    }
  }

  /* Content */
  .accordion-content {
    padding-bottom: 1rem;
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--muted-foreground);
    overflow: hidden;

    & p { margin: 0; }
  }
}
```

---

## JavaScript (only for single-open behavior)

```js
// Single-open accordion: close siblings when one opens
document.querySelectorAll('.accordion[data-type="single"]').forEach(accordion => {
  const items = accordion.querySelectorAll('.accordion-item');
  const collapsible = accordion.hasAttribute('data-collapsible');

  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        // Close all siblings
        items.forEach(sibling => {
          if (sibling !== item && sibling.open) {
            sibling.open = false;
          }
        });
      } else if (!collapsible) {
        // Non-collapsible: at least one must stay open
        const anyOpen = [...items].some(i => i.open);
        if (!anyOpen) item.open = true;
      }
    });
  });
});
```

- When `data-collapsible` is present, the user can close the last open item.
- When `data-collapsible` is absent (default), the toggle handler re-opens an
  item if closing it would leave none open.

For multi-open accordions, no JavaScript is needed — `<details>` handles
everything natively.

---

## ARIA

The `<details>/<summary>` elements provide built-in accessibility:

| Feature                    | How it works                                   |
|----------------------------|------------------------------------------------|
| Expand/collapse            | Native — `summary` is a button internally      |
| `aria-expanded`            | Implicit from `open` attribute                 |
| Focus management           | `summary` is focusable by default              |
| Keyboard (Enter/Space)     | Native — toggles the `<details>` element       |
| Screen reader announcement | Native — announces expanded/collapsed state    |

No additional ARIA attributes are needed when using `<details>/<summary>`.

---

## Keyboard interactions

| Key           | Behavior                                           |
|---------------|----------------------------------------------------|
| `Tab`         | Move focus between summary elements                |
| `Enter`       | Toggle the focused item                            |
| `Space`       | Toggle the focused item                            |

These are all browser-native — no JS needed.

---

## Variants

### Bordered

```html
<div class="accordion" style="border:1px solid var(--border);border-radius:var(--radius-lg);padding:0 1rem;">
  <!-- items -->
</div>
```

### Card-wrapped

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">FAQ</h3>
    <p class="card-description">Frequently asked questions.</p>
  </div>
  <div class="card-content">
    <div class="accordion">
      <!-- items -->
    </div>
  </div>
</div>
```

---

## Notes

- `<details>/<summary>` is the most accessible accordion implementation — it works with zero JS and zero ARIA
- For single-open behavior, the `toggle` event on `<details>` fires after the state changes
- The `open` attribute is the source of truth for whether an item is expanded
- Avoid nesting accordions — use a flat list with clear headings instead
- The chevron rotation relies on `details[open] >` selector — this is pure CSS
- Content height animation uses `::details-content` pseudo-element with `block-size` transition and `@starting-style` for the enter animation — fully CSS-only, no JS measurement needed
- Set `data-type="single"` for accordion behavior (only one open); omit for disclosure list (any number open)
- Set `data-collapsible` alongside `data-type="single"` to allow all items to be closed
