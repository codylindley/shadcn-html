(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.avatar-image').forEach(function (img) {
      img.addEventListener('error', function () {
        img.setAttribute('data-error', '');
        img.style.display = 'none';
      });
    });
  });
})();
