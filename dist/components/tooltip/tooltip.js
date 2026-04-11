// -- Tooltip --------------------------------------------------
// CSS anchor positioning + hover/focus show/hide for tooltip popovers.

document.querySelectorAll('[data-tooltip-trigger]').forEach((trigger) => {
  const tip = document.getElementById(trigger.dataset.tooltipTrigger);
  if (!tip) return;

  // CSS anchor positioning - unique name per trigger-tooltip pair
  const anchorId = `--tooltip-${tip.id}`;
  trigger.style.anchorName = anchorId;
  tip.style.positionAnchor = anchorId;

  const show = () => { tip.showPopover(); };
  const hide = () => { try { tip.hidePopover(); } catch(e) {} };
  trigger.addEventListener('mouseenter', show);
  trigger.addEventListener('mouseleave', hide);
  trigger.addEventListener('focus', show);
  trigger.addEventListener('blur', hide);
});
