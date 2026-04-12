// -- Toggle ---------------------------------------------------
// Toggles aria-pressed on .toggle buttons.

document.querySelectorAll('.toggle:not([data-init])').forEach((toggle) => {
  toggle.dataset.init = '';
  toggle.addEventListener('click', () => {
    const pressed = toggle.getAttribute('aria-pressed') === 'true';
    toggle.setAttribute('aria-pressed', !pressed);
  });
});
