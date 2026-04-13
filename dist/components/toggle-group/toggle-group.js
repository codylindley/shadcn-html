// -- Toggle Group ---------------------------------------------
// Manages single/multiple selection and roving tabindex across .toggle buttons.

function init() {
  document.querySelectorAll('.toggle-group:not([data-init])').forEach((group) => {
  group.dataset.init = '';
  const type = group.getAttribute('data-type') || 'single';

  const getToggles = () => Array.from(group.querySelectorAll('.toggle:not(:disabled)'));

  // Roving tabindex: only one item tabbable at a time
  const initTabindex = () => {
    const toggles = getToggles();
    if (toggles.length === 0) return;
    const pressed = toggles.find((t) => t.getAttribute('aria-pressed') === 'true');
    const active = pressed || toggles[0];
    toggles.forEach((t) => {
      t.setAttribute('tabindex', t === active ? '0' : '-1');
    });
  };

  initTabindex();

  group.addEventListener('click', (e) => {
    const toggle = e.target.closest('.toggle');
    if (!toggle || toggle.disabled || group.hasAttribute('data-disabled')) return;

    const toggles = getToggles();
    const pressed = toggle.getAttribute('aria-pressed') === 'true';

    if (type === 'single') {
      toggles.forEach((t) => t.setAttribute('aria-pressed', 'false'));
      if (!pressed) toggle.setAttribute('aria-pressed', 'true');
    } else {
      toggle.setAttribute('aria-pressed', String(!pressed));
    }

    // Update roving tabindex to current item
    toggles.forEach((t) => t.setAttribute('tabindex', t === toggle ? '0' : '-1'));
  });

  group.addEventListener('keydown', (e) => {
    const toggle = e.target.closest('.toggle');
    if (!toggle || group.hasAttribute('data-disabled')) return;

    const toggles = getToggles();
    const idx = toggles.indexOf(toggle);
    if (idx === -1) return;

    const vertical = group.getAttribute('data-orientation') === 'vertical';
    const fwd = vertical ? 'ArrowDown' : 'ArrowRight';
    const bwd = vertical ? 'ArrowUp' : 'ArrowLeft';
    let next;

    if (e.key === fwd) {
      e.preventDefault();
      next = (idx + 1) % toggles.length;
    } else if (e.key === bwd) {
      e.preventDefault();
      next = (idx - 1 + toggles.length) % toggles.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = toggles.length - 1;
    }

    if (next !== undefined) {
      toggles[idx].setAttribute('tabindex', '-1');
      toggles[next].setAttribute('tabindex', '0');
      toggles[next].focus();
    }
  });
});
}

init();
new MutationObserver(init).observe(document, { childList: true, subtree: true });
