// -- Toggle ---------------------------------------------------
// Toggles aria-pressed on .toggle buttons.
// Skips toggles inside .toggle-group — those are managed by toggle-group.js.

document.querySelectorAll('.toggle:not([data-init]):not(.toggle-group .toggle)').forEach((toggle) => {
  toggle.dataset.init = '';
  toggle.addEventListener('click', () => {
    const pressed = toggle.getAttribute('aria-pressed') === 'true';
    toggle.setAttribute('aria-pressed', !pressed);
  });
});
