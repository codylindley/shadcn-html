// ── Context Menu ─────────────────────────────────────────────
// Right-click context menu using the Popover API.

document.querySelectorAll('[data-context-menu]').forEach((trigger) => {
  const menu = document.getElementById(trigger.dataset.contextMenu);
  if (!menu) return;
  trigger.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.style.position = 'fixed';
    menu.style.top = `${e.clientY}px`;
    menu.style.left = `${e.clientX}px`;
    menu.showPopover();
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.context-menu-item')) menu.hidePopover();
  });
});
