// ── Popover ──────────────────────────────────────────────────
// Positions popover content relative to its trigger.

document.querySelectorAll('[popovertarget]').forEach((trigger) => {
  const id = trigger.getAttribute('popovertarget');
  const popover = document.getElementById(id);
  if (!popover || !popover.classList.contains('popover')) return;
  const position = () => {
    const rect = trigger.getBoundingClientRect();
    popover.style.position = 'fixed';
    popover.style.top = `${rect.bottom + 4}px`;
    popover.style.left = `${rect.left}px`;
  };
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    position();
    popover.togglePopover();
  });
});
