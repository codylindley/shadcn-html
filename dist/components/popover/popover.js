// -- Popover --------------------------------------------------
// CSS anchor positioning for popover components.

document.querySelectorAll('[popovertarget]:not([data-init])').forEach((trigger) => {
  trigger.dataset.init = '';
  const id = trigger.getAttribute('popovertarget');
  const popover = document.getElementById(id);
  if (!popover || !popover.classList.contains('popover')) return;

  // CSS anchor positioning - unique name per trigger-popover pair
  const anchorId = `--popover-${id}`;
  trigger.style.anchorName = anchorId;
  popover.style.positionAnchor = anchorId;
});
