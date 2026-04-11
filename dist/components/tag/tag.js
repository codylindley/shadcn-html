(function () {
  'use strict';

  window.onPageReady(function () {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.tag-dismiss');
      if (!btn) return;
      var tag = btn.closest('.tag');
      if (!tag) return;
      tag.remove();
    });
  });
})();
