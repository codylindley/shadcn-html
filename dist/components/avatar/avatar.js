// -- Avatar ---------------------------------------------------
// Hides broken avatar images and shows the fallback.

document.querySelectorAll('.avatar-image').forEach((img) => {
  img.addEventListener('error', () => {
    img.setAttribute('data-error', '');
    img.style.display = 'none';
  });
});
