// -- Toolbar --------------------------------------------------
// Roving tabindex for role="toolbar" containers.
// Arrow keys move focus between focusable children.

document.querySelectorAll('.toolbar[role="toolbar"]').forEach((toolbar) => {
  const items = Array.from(
    toolbar.querySelectorAll('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')
  );
  if (items.length === 0) return;

  items.forEach((item, i) => {
    item.setAttribute('tabindex', i === 0 ? '0' : '-1');
  });

  toolbar.addEventListener('keydown', (e) => {
    const current = items.indexOf(document.activeElement);
    if (current === -1) return;

    const vertical = toolbar.getAttribute('aria-orientation') === 'vertical';
    const fwd = vertical ? 'ArrowDown' : 'ArrowRight';
    const bwd = vertical ? 'ArrowUp' : 'ArrowLeft';
    let next;

    if (e.key === fwd) {
      e.preventDefault();
      next = (current + 1) % items.length;
    } else if (e.key === bwd) {
      e.preventDefault();
      next = (current - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = items.length - 1;
    }

    if (next !== undefined) {
      items[current].setAttribute('tabindex', '-1');
      items[next].setAttribute('tabindex', '0');
      items[next].focus();
    }
  });
});
