# Command

## Native basis

`<dialog>` + search input for a command palette.

## Native Web APIs

- [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — modal with focus trap
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation

## Structure

```html
<button class="btn" data-command-trigger="cmd">Open Command</button>
<dialog id="cmd" class="command" role="dialog" aria-modal="true">
  <div class="command-content">
    <div class="command-input-wrapper">
      <svg><!-- search --></svg>
      <input class="command-input" type="text" placeholder="Type a command...">
    </div>
    <div class="command-list">
      <div class="command-group">
        <p class="command-group-heading">Suggestions</p>
        <button class="command-item">Calendar</button>
      </div>
    </div>
    <div class="command-empty" hidden>No results found.</div>
  </div>
</dialog>
```
