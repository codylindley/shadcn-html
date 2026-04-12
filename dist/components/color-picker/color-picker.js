// -- Color Picker ---------------------------------------------
// Syncs the hex value display with the color input.

document.querySelectorAll('.color-picker:not([data-init])').forEach((picker) => {
  picker.dataset.init = '';
  const input = picker.querySelector('input[type="color"]');
  const display = picker.querySelector('.color-picker-value');
  if (!input || !display) return;

  display.textContent = input.value;
  input.addEventListener('input', () => {
    display.textContent = input.value;
  });
});
