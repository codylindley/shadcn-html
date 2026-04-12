// -- Sidebar --------------------------------------------------
// Toggle collapse, keyboard shortcut (Cmd+B), and mobile dialog.

document.querySelectorAll('.app-sidebar:not([data-init])').forEach((sidebar) => {
  sidebar.dataset.init = '';

  // -- Toggle button → collapse/expand -----------------------
  const triggerId = sidebar.id ? `[data-sidebar-trigger="${sidebar.id}"]` : '.sidebar-trigger';
  document.querySelectorAll(triggerId).forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const state = sidebar.dataset.state === 'collapsed' ? 'expanded' : 'collapsed';
      sidebar.dataset.state = state;
    });
  });
});

// -- Mobile dialog triggers ----------------------------------
document.querySelectorAll('[data-sidebar-mobile]:not([data-init])').forEach((trigger) => {
  trigger.dataset.init = '';
  const dialog = document.getElementById(trigger.dataset.sidebarMobile);
  if (!dialog) return;

  trigger.addEventListener('click', () => {
    dialog.showModal();
  });

  // Close button inside the dialog
  dialog.querySelectorAll('.sidebar-mobile-close').forEach((btn) => {
    btn.addEventListener('click', () => { dialog.close(); });
  });
});

// -- Keyboard shortcut: Cmd+B / Ctrl+B ----------------------
if (!document.__sidebarKbInit) {
  document.__sidebarKbInit = true;
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault();
      // Toggle the first sidebar found on the page
      const sidebar = document.querySelector('.app-sidebar');
      if (sidebar) {
        sidebar.dataset.state = sidebar.dataset.state === 'collapsed' ? 'expanded' : 'collapsed';
      }
    }
  });
}
