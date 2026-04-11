// ── Toggle ───────────────────────────────────────────────────
// Toggles aria-pressed on .toggle buttons.

document.querySelectorAll('.toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const pressed = toggle.getAttribute('aria-pressed') === 'true';
    toggle.setAttribute('aria-pressed', !pressed);
  });
});
