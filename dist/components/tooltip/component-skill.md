# Tooltip

## Native basis

Popover API (`popover="hint"`) for hover/focus hint popups with CSS anchor positioning for placement.

## Native Web APIs

- [`popover` attribute (`hint`)](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) — native popover with light dismiss, doesn't close `auto` popovers
- [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) — tether tooltip to trigger element
- [`position-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/position-area) — declarative anchor-relative placement on a 3×3 grid
- [`position-try-fallbacks`](https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks) — automatic collision avoidance (flip-block, flip-inline)
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation starting values
- [`transition-behavior: allow-discrete`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior) — animate `display: none` transitions

## Structure

### Basic

```html
<button class="btn" data-tooltip-trigger="my-tip">Hover me</button>
<div class="tooltip" id="my-tip" popover="hint" role="tooltip">Tooltip text</div>
```

### With arrow

```html
<button class="btn" data-tooltip-trigger="my-tip">Hover me</button>
<div class="tooltip" id="my-tip" popover="hint" role="tooltip">
  Tooltip text
  <div data-arrow></div>
</div>
```

### Side placement

```html
<div class="tooltip" id="tip-bottom" popover="hint" role="tooltip" data-side="bottom">Below</div>
<div class="tooltip" id="tip-left" popover="hint" role="tooltip" data-side="left">Left</div>
<div class="tooltip" id="tip-right" popover="hint" role="tooltip" data-side="right">Right</div>
```

### Side + alignment

```html
<div class="tooltip" id="tip-top-start" popover="hint" role="tooltip" data-align="start">Top start</div>
<div class="tooltip" id="tip-bottom-end" popover="hint" role="tooltip" data-side="bottom" data-align="end">Bottom end</div>
```

### Custom delay

```html
<button class="btn" data-tooltip-trigger="my-tip" data-delay="300">Fast tooltip</button>
<button class="btn" data-tooltip-trigger="my-tip2" data-delay="0">Instant tooltip</button>
```

## Variants

### Side (`data-side`)

| Value    | Placement                | position-area |
| -------- | ------------------------ | ------------- |
| *(none)* | Above trigger (default)  | `top`         |
| `top`    | Above trigger            | `top`         |
| `bottom` | Below trigger            | `bottom`      |
| `left`   | Left of trigger          | `left`        |
| `right`  | Right of trigger         | `right`       |

### Alignment (`data-align`)

| Value      | Alignment                         |
| ---------- | --------------------------------- |
| *(none)*   | Centered on trigger axis (default)|
| `center`   | Centered on trigger axis          |
| `start`    | Aligned to start edge             |
| `end`      | Aligned to end edge               |

## ARIA

| Attribute          | Element  | Purpose                                   |
| ------------------ | -------- | ----------------------------------------- |
| `role="tooltip"`   | `.tooltip` | Identifies the element as a tooltip       |
| `aria-describedby` | trigger  | Links trigger to tooltip (set by JS)      |
| `popover="hint"`   | `.tooltip` | Hint popover semantics                   |

## Notes

- **Delay**: Default open delay is 700 ms. Set `data-delay` on the trigger to override. Set to `0` for instant.
- **Close delay**: Default is 0 ms (instant close). Set `data-close-delay` on the trigger to override.
- **Group behavior**: Once any tooltip becomes visible, subsequent tooltips in the document open instantly (skip delay). After 400 ms with no tooltip visible, the delay resets.
- **Collision avoidance**: Uses `position-try-fallbacks: flip-block, flip-inline` to automatically reposition when near viewport edges.
- **Scroll dismiss**: Open tooltips are automatically hidden when the page scrolls.
- **Escape dismiss**: Handled natively by `popover="hint"` — no extra JS needed.
- **Keyboard**: Tooltip shows on focus, hides on blur. Focus stays on trigger.
- **Disabled triggers**: Wrap a disabled button in a `<span>` with `data-tooltip-trigger` since disabled elements don't fire mouse/focus events.
- **Arrow**: Add `<div data-arrow></div>` inside the tooltip for a connecting caret. Arrow positioning is automatic based on `data-side`.
