// -- Number Input ---------------------------------------------
// Increment/decrement buttons for .number-input containers.

document.querySelectorAll('.number-input:not([data-init])').forEach((wrapper) => {
  wrapper.dataset.init = '';
  const input = wrapper.querySelector('input[type="number"]');
  const decBtn = wrapper.querySelector('[data-action="decrement"]');
  const incBtn = wrapper.querySelector('[data-action="increment"]');
  if (!input) return;

  const update = (direction) => {
    try {
      if (direction > 0) input.stepUp();
      else input.stepDown();
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } catch(e) { /* min/max boundary */ }
  };

  if (decBtn) decBtn.addEventListener('click', () => { update(-1); });
  if (incBtn) incBtn.addEventListener('click', () => { update(1); });
});
