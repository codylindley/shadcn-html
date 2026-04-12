// -- Tooltip --------------------------------------------------
// Popover API tooltips with delay, group behavior, ARIA wiring,
// CSS anchor positioning, and scroll dismiss.

const DELAY_DEFAULT = 700;      // ms before first tooltip opens
const CLOSE_DELAY_DEFAULT = 0;  // ms before tooltip closes
const GROUP_TIMEOUT = 400;      // ms after last tooltip hides before delay resets

let groupOpen = false;       // true while any tooltip is visible
let groupTimer = null;       // timeout to reset groupOpen

function markGroupOpen() {
  groupOpen = true;
  clearTimeout(groupTimer);
}

function scheduleGroupReset() {
  clearTimeout(groupTimer);
  groupTimer = setTimeout(() => { groupOpen = false; }, GROUP_TIMEOUT);
}

document.querySelectorAll('[data-tooltip-trigger]:not([data-init])').forEach((trigger) => {
  trigger.dataset.init = '';
  const tip = document.getElementById(trigger.dataset.tooltipTrigger);
  if (!tip) return;

  // CSS anchor positioning — unique name per trigger-tooltip pair
  const anchorId = `--tooltip-${tip.id}`;
  trigger.style.anchorName = anchorId;
  tip.style.positionAnchor = anchorId;

  // ARIA — link trigger to tooltip
  trigger.setAttribute('aria-describedby', tip.id);

  const delay = Number(trigger.dataset.delay ?? DELAY_DEFAULT);
  const closeDelay = Number(trigger.dataset.closeDelay ?? CLOSE_DELAY_DEFAULT);

  let openTimer = null;
  let closeTimer = null;

  function show() {
    clearTimeout(closeTimer);
    clearTimeout(openTimer);
    const wait = groupOpen ? 0 : delay;
    openTimer = setTimeout(() => {
      try { tip.showPopover(); } catch (e) { /* already open */ }
      markGroupOpen();
    }, wait);
  }

  function hide() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      try { tip.hidePopover(); } catch (e) { /* already closed */ }
      scheduleGroupReset();
    }, closeDelay);
  }

  trigger.addEventListener('mouseenter', show);
  trigger.addEventListener('mouseleave', hide);
  trigger.addEventListener('focus', show);
  trigger.addEventListener('blur', hide);
});

// -- Scroll dismiss -------------------------------------------
// Hide any open tooltip when the page scrolls.
if (!document.__tooltipScrollInit) {
  document.__tooltipScrollInit = true;
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.tooltip:popover-open').forEach((tip) => {
      try { tip.hidePopover(); } catch (e) {}
    });
  }, { passive: true, capture: true });
}
