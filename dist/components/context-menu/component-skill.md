# Context Menu

## Native basis

Popover API triggered by right-click.

## Native Web APIs

- [`popover` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) — native popover
- [`contextmenu` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event) — right-click trigger

## Structure

```html
<div class="context-menu-trigger" data-context-menu="my-ctx">Right click here</div>
<div class="context-menu" id="my-ctx" popover>
  <button class="context-menu-item" role="menuitem">Cut</button>
  <button class="context-menu-item" role="menuitem">Copy</button>
  <button class="context-menu-item" role="menuitem">Paste</button>
</div>
```
