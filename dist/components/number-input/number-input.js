// -- Number Input ---------------------------------------------
// Increment/decrement buttons for .number-input containers.

document.querySelectorAll('.number-input').forEach((wrapper) => {
  const input = wrapper.querySelector('input[type="number"]');
  const decBtn = wrapper.querySelector('[data-action="decrement"]');
  const incBtn = wrapper.querySelector('[data-action="increment"]');
  if (!input) return;

  const update = (delta) => {
    const step = parseFloat(input.step) || 1;
    const min = input.min !== '' ? parseFloat(input.min) : -Infinity;
    const max = input.max !== '' ? parseFloat(input.max) : Infinity;
    const val = parseFloat(input.value) || 0;
    const next = Math.round((val + delta * step) * 1e10) / 1e10;
    if (next >= min && next <= max) {
      input.value = next;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  if (decBtn) decBtn.addEventListener('click', () => { update(-1); });
  if (incBtn) incBtn.addEventListener('click', () => { update(1); });
});
