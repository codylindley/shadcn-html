// ── Toggle Group ─────────────────────────────────────────────
// Manages single/multiple selection across .toggle buttons in a group.

document.querySelectorAll('.toggle-group').forEach((group) => {
  const type = group.getAttribute('data-type') || 'single';
  const toggles = Array.from(group.querySelectorAll('.toggle'));

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const pressed = toggle.getAttribute('aria-pressed') === 'true';

      if (type === 'single') {
        toggles.forEach((t) => {
          t.setAttribute('aria-pressed', 'false');
        });
        if (!pressed) {
          toggle.setAttribute('aria-pressed', 'true');
        }
      } else {
        toggle.setAttribute('aria-pressed', String(!pressed));
      }
    });

    toggle.addEventListener('keydown', (e) => {
      const idx = toggles.indexOf(toggle);
      let next;
      const vertical = group.getAttribute('aria-orientation') === 'vertical';
      const fwd = vertical ? 'ArrowDown' : 'ArrowRight';
      const bwd = vertical ? 'ArrowUp' : 'ArrowLeft';

      if (e.key === fwd) {
        e.preventDefault();
        next = toggles[(idx + 1) % toggles.length];
      } else if (e.key === bwd) {
        e.preventDefault();
        next = toggles[(idx - 1 + toggles.length) % toggles.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = toggles[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        next = toggles[toggles.length - 1];
      }

      if (next && !next.disabled) {
        next.focus();
      }
    });
  });
});
