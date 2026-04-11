// ── Toast ─────────────────────────────────────────────────────
// Programmatic toast notification API.
// Exposes window.toast with show/success/warning/info/error/dismiss.

const DURATION = 4000;
const MAX_VISIBLE = 3;

let toastContainer = document.getElementById('toast-container');
if (!toastContainer) {
  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.className = 'toast-container';
  toastContainer.setAttribute('aria-label', 'Notifications');
  toastContainer.setAttribute('data-position', 'bottom-right');
  document.body.appendChild(toastContainer);
}

const toastDismiss = (el, callback) => {
  if (!el || !el.parentNode) return;
  el.style.opacity = '0'; el.style.transform = 'translateY(0.5rem)';
  setTimeout(() => { try { el.hidePopover(); } catch(e) {} el.remove(); if (callback) callback(); }, 200);
};

const toastCreate = (options) => {
  const o = typeof options === 'string' ? { title: options } : options;
  const { title, description, variant, action, onDismiss } = o;
  const duration = o.duration != null ? o.duration : DURATION;
  const el = document.createElement('div'); el.className = 'toast';
  el.setAttribute('role', variant === 'destructive' ? 'alert' : 'status');
  el.setAttribute('aria-live', variant === 'destructive' ? 'assertive' : 'polite');
  el.setAttribute('aria-atomic', 'true'); el.setAttribute('popover', 'manual');
  if (variant) el.setAttribute('data-variant', variant);
  const icons = {
    success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    warning: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    destructive: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>'
  };
  const icon = variant && icons[variant] ? icons[variant] : '';
  el.innerHTML = '<div class="toast-content">' + icon + '<div class="toast-text">' +
    (title ? '<p class="toast-title">' + title + '</p>' : '') +
    (description ? '<p class="toast-description">' + description + '</p>' : '') +
    '</div><button class="toast-close" aria-label="Dismiss" data-toast-close><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>' +
    (action ? '<div class="toast-actions"><button class="btn" data-variant="outline" data-size="sm" data-toast-action>' + action.label + '</button></div>' : '');
  toastContainer.appendChild(el); el.showPopover();
  el.querySelector('[data-toast-close]').addEventListener('click', () => { toastDismiss(el, onDismiss); });
  if (action) { el.querySelector('[data-toast-action]').addEventListener('click', () => { if (action.onClick) action.onClick(); toastDismiss(el); }); }
  if (duration !== Infinity) setTimeout(() => { toastDismiss(el, onDismiss); }, duration);
  const toasts = toastContainer.querySelectorAll('.toast');
  if (toasts.length > MAX_VISIBLE) toastDismiss(toasts[0]);
  return el;
};

window.toast = {
  show: toastCreate,
  success: (o) => toastCreate(Object.assign(typeof o === 'string' ? { title: o } : o, { variant: 'success' })),
  warning: (o) => toastCreate(Object.assign(typeof o === 'string' ? { title: o } : o, { variant: 'warning' })),
  info: (o) => toastCreate(Object.assign(typeof o === 'string' ? { title: o } : o, { variant: 'info' })),
  error: (o) => toastCreate(Object.assign(typeof o === 'string' ? { title: o } : o, { variant: 'destructive' })),
  dismiss: () => { toastContainer.querySelectorAll('.toast').forEach((el) => { toastDismiss(el); }); }
};
