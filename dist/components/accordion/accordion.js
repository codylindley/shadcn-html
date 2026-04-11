// -- Accordion -----------------------------------------------
// Single-open accordion behavior using native <details> elements.

document.querySelectorAll('.accordion[data-type="single"]').forEach((accordion) => {
  const items = accordion.querySelectorAll('.accordion-item');
  const collapsible = accordion.hasAttribute('data-collapsible');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((sibling) => {
          if (sibling !== item && sibling.open) sibling.open = false;
        });
      } else if (!collapsible) {
        const anyOpen = Array.from(items).some((i) => i.open);
        if (!anyOpen) item.open = true;
      }
    });
  });
});
