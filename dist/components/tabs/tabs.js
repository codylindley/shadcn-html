// -- Tabs -----------------------------------------------------
// ARIA-compliant keyboard navigation for [role="tablist"] elements.

const activateTab = (tab, triggers) => {
  triggers.forEach((t) => {
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = true;
  });
  tab.setAttribute('aria-selected', 'true');
  tab.removeAttribute('tabindex');
  const panel = document.getElementById(tab.getAttribute('aria-controls'));
  if (panel) panel.hidden = false;
};

document.querySelectorAll('[role="tablist"]').forEach((tablist) => {
    if (!tablist.querySelector('.tab-trigger')) return;
    const triggers = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const orientation = tablist.getAttribute('aria-orientation') || 'horizontal';

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => { activateTab(trigger, triggers); });
      trigger.addEventListener('keydown', (e) => {
        const current = triggers.indexOf(trigger);
        let next;
        const forward = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
        const backward = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
        switch (e.key) {
          case forward:
            e.preventDefault();
            for (let i = 1; i <= triggers.length; i++) {
              const c = triggers[(current + i) % triggers.length];
              if (!c.disabled) { next = c; break; }
            }
            break;
          case backward:
            e.preventDefault();
            for (let i = 1; i <= triggers.length; i++) {
              const c = triggers[(current - i + triggers.length) % triggers.length];
              if (!c.disabled) { next = c; break; }
            }
            break;
          case 'Home':
            e.preventDefault();
            next = triggers.find((t) => !t.disabled);
            break;
          case 'End':
            e.preventDefault();
            next = triggers.slice().reverse().find((t) => !t.disabled);
            break;
        }
        if (next && !next.disabled) {
          activateTab(next, triggers);
          next.focus();
        }
      });
    });
});
