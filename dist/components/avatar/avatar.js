// -- Avatar ---------------------------------------------------
// Hides broken avatar images and shows the fallback.

document.querySelectorAll('.avatar-image:not([data-init])').forEach((img) => {
  img.dataset.init = '';
  img.addEventListener('error', () => {
    img.setAttribute('data-error', '');
    img.style.display = 'none';
  });
});
