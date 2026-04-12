// -- Tag ------------------------------------------------------
// Dismiss behavior for removable tags.

if (!document.__tagInit) {
  document.__tagInit = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.tag-dismiss');
    if (!btn) return;
    const tag = btn.closest('.tag');
    if (!tag) return;
    tag.remove();
  });
}
