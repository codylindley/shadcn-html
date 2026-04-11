(function () {
  'use strict';

  window.onPageReady(function () {
    document.querySelectorAll('.avatar-image').forEach(function (img) {
      img.addEventListener('error', function () {
        img.setAttribute('data-error', '');
        img.style.display = 'none';
      });
    });
  });
})();
