// ── Navigation Menu ─────────────────────────────────────────
// Popover positioning for dropdown navigation menus.

document.querySelectorAll('.nav-menu').forEach((nav) => {
  nav.querySelectorAll('.nav-menu-trigger[popovertarget]').forEach((trigger) => {
    const content = document.getElementById(trigger.getAttribute('popovertarget'));
    if (!content) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const rect = trigger.getBoundingClientRect();
      content.style.position = 'fixed';
      content.style.top = `${rect.bottom + 4}px`;
      content.style.left = `${rect.left}px`;
      content.togglePopover();
    });
  });
});
