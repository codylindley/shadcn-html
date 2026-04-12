# Alert Dialog

## Native basis

`<dialog>` element used as a modal that requires user response. Unlike a standard dialog, it has no backdrop-close and no close button — the user must choose an action.

## Native Web APIs

- [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — native modal with focus trap and Escape-to-close
- [`showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) — opens as modal with backdrop
- [`::backdrop`](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop) — native backdrop pseudo-element
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) — entry animation starting values

## Structure

```html
<button class="btn" data-variant="outline" data-alert-dialog-trigger="my-alert-dialog">
  Delete Account
</button>

<dialog id="my-alert-dialog" class="alert-dialog" role="alertdialog" aria-modal="true"
        aria-labelledby="ad-title" aria-describedby="ad-desc">
  <div class="alert-dialog-content">
    <div class="alert-dialog-header">
      <h2 class="alert-dialog-title" id="ad-title">Are you absolutely sure?</h2>
      <p class="alert-dialog-description" id="ad-desc">
        This action cannot be undone. This will permanently delete your account.
      </p>
    </div>
    <div class="alert-dialog-footer">
      <button class="btn" data-variant="outline" data-alert-dialog-close>Cancel</button>
      <button class="btn" data-variant="destructive" data-alert-dialog-close>Delete</button>
    </div>
  </div>
</dialog>
```

## Accessibility

- Uses `role="alertdialog"` instead of `role="dialog"` — signals interruption
- `aria-labelledby` and `aria-describedby` link to title and description
- No backdrop click dismiss — user must make an explicit choice
- Escape key is disabled — user must use the action buttons
- Focus is trapped inside the dialog via native `showModal()`
