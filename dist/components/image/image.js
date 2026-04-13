/* -- Image component ----------------------------------------- */
/* Fallback on error + lightbox preview for [data-preview].    */

function init() {
/* -- Fallback: mark images that fail to load ----------------- */
document.querySelectorAll('.image:not([data-init]) > img').forEach((img) => {
  img.closest('.image').dataset.init = '';

  if (img.complete && img.naturalWidth === 0) {
    img.dataset.error = '';
  }

  img.addEventListener('error', () => {
    img.dataset.error = '';
  });

  img.addEventListener('load', () => {
    delete img.dataset.error;
  });
});
}

init();
new MutationObserver(init).observe(document, { childList: true, subtree: true });

/* -- Lightbox ------------------------------------------------ */
let lightbox = null;
let lightboxImg = null;
let zoom = 1;
let rotation = 0;

function getLightbox() {
  if (lightbox) return lightbox;

  lightbox = document.createElement('dialog');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-label', 'Image preview');

  lightbox.innerHTML = `
    <div class="image-lightbox-content">
      <img src="" alt="" />
    </div>
    <div class="image-lightbox-toolbar">
      <button class="image-lightbox-btn" data-action="zoom-in" aria-label="Zoom in">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </button>
      <button class="image-lightbox-btn" data-action="zoom-out" aria-label="Zoom out">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </button>
      <button class="image-lightbox-btn" data-action="rotate-left" aria-label="Rotate left">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 2v6h6"/><path d="M2.66 15.57a10 10 0 1 0 .57-8.38"/></svg>
      </button>
      <button class="image-lightbox-btn" data-action="rotate-right" aria-label="Rotate right">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>
      </button>
      <button class="image-lightbox-btn" data-action="reset" aria-label="Reset">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      </button>
      <button class="image-lightbox-btn" data-action="close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`;

  lightboxImg = lightbox.querySelector('.image-lightbox-content > img');

  /* Toolbar actions */
  lightbox.querySelector('.image-lightbox-toolbar').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    if (action === 'zoom-in')      zoom = Math.min(zoom + 0.25, 5);
    else if (action === 'zoom-out') zoom = Math.max(zoom - 0.25, 0.25);
    else if (action === 'rotate-left')  rotation -= 90;
    else if (action === 'rotate-right') rotation += 90;
    else if (action === 'reset') { zoom = 1; rotation = 0; }
    else if (action === 'close') { lightbox.close(); return; }

    applyTransform();
  });

  /* Close on backdrop click */
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });

  document.body.appendChild(lightbox);
  return lightbox;
}

function applyTransform() {
  if (lightboxImg) {
    lightboxImg.style.transform = `scale(${zoom}) rotate(${rotation}deg)`;
  }
}

function openLightbox(src, alt) {
  const lb = getLightbox();
  zoom = 1;
  rotation = 0;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxImg.style.transform = '';
  lb.showModal();
}

/* -- Attach preview click handlers --------------------------- */
if (!document.__imagePreviewInit) {
  document.__imagePreviewInit = true;

  document.addEventListener('click', (e) => {
    const figure = e.target.closest('.image[data-preview]');
    if (!figure) return;

    const img = figure.querySelector('img');
    if (!img || img.dataset.error !== undefined) return;

    openLightbox(img.src, img.alt);
  });
}
