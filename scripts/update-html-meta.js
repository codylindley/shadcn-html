#!/usr/bin/env node
/**
 * Bulk-update all doc HTML pages:
 *  1. Add favicon <link>
 *  2. Add <meta name="description"> + OG + Twitter tags
 *  3. Add defer + SRI to marked.min.js
 *  4. Pin lucide@latest → lucide@1.8.0 + SRI
 *  5. Add SRI crossorigin to CDN scripts
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'dist', 'documentation');
const SITE_URL = 'https://shadcn-html.netlify.app/documentation';

// Meta descriptions per page
const META = {
  'index.html': 'A design system built with semantic HTML, shadcn design tokens, and plain CSS. No frameworks, no build step — just native web platform.',
  'installation.html': 'Install shadcn-html — copy CSS files, link tokens, and start building. No npm, no bundler required.',
  'theming.html': 'Customize shadcn-html with CSS custom properties. Drop in any tweakcn.com theme for instant restyling.',
  'data-attribute-api.html': 'Use data attributes to configure component variants, sizes, and states directly in HTML markup.',
  'cascade-layers.html': 'How shadcn-html uses CSS @layer to keep component styles predictable and easy to override.',
  'es-modules.html': 'How shadcn-html uses native ES modules for interactive components — no bundler needed.',
  'changelog.html': 'Release history and changelog for shadcn-html.',
  // Primitives
  'typography.html': 'Typography utilities — headings, paragraphs, lists, and inline styles with shadcn design tokens.',
  'separator.html': 'Separator component — horizontal and vertical dividers using native <hr> elements.',
  'icon.html': 'Icon component — Lucide icons sized and colored with CSS custom properties.',
  'link.html': 'Link component — styled anchor elements with variant and underline options.',
  'label.html': 'Label component — accessible form labels styled with shadcn tokens.',
  // Actions
  'button.html': 'Button component — multiple variants (default, destructive, outline, secondary, ghost, link) and sizes.',
  'toggle.html': 'Toggle component — a two-state button using native checkbox or button elements.',
  'toggle-group.html': 'Toggle Group component — a set of toggles that work together with single or multi-select.',
  'button-group.html': 'Button Group component — group related buttons with shared borders and spacing.',
  'toolbar.html': 'Toolbar component — a container for grouping action buttons, toggles, and separators.',
  // Forms & Inputs
  'input.html': 'Input component — text inputs with variants, sizes, icons, and validation states.',
  'textarea.html': 'Textarea component — multi-line text input with auto-growing via field-sizing.',
  'checkbox.html': 'Checkbox component — native checkboxes with custom styling and indeterminate state.',
  'radio.html': 'Radio Group component — native radio buttons with card and button-style variants.',
  'switch.html': 'Switch component — toggle switches built on native checkboxes.',
  'slider.html': 'Slider component — range inputs with custom track and thumb styling.',
  'select.html': 'Select component — native <select> dropdowns with custom styling.',
  'number-input.html': 'Number Input component — increment/decrement controls with native input[type=number].',
  'file-input.html': 'File Input component — styled file upload inputs with drag-and-drop zones.',
  'color-picker.html': 'Color Picker component — native color input with swatch preview.',
  'date-picker.html': 'Date Picker component — native date inputs with calendar popover.',
  'combobox.html': 'Combobox component — searchable dropdown with keyboard navigation.',
  'form.html': 'Form component — form layouts with validation, error messages, and accessibility.',
  // Data Display
  'badge.html': 'Badge component — small status indicators with variant styling.',
  'tag.html': 'Tag component — removable labels for categories and filters.',
  'avatar.html': 'Avatar component — circular user images with fallback initials.',
  'card.html': 'Card component — content containers with header, body, and footer sections.',
  'image.html': 'Image component — responsive images with aspect ratio and loading states.',
  'list.html': 'List component — styled ordered and unordered lists.',
  'descriptions.html': 'Descriptions component — key-value pairs in a definition list layout.',
  'statistic.html': 'Statistic component — display numbers with labels, trends, and formatting.',
  'table.html': 'Table component — data tables with sorting, striping, and responsive scroll.',
  'empty-state.html': 'Empty State component — placeholder content for empty data views.',
  'collapsible.html': 'Collapsible component — expandable content sections using <details>/<summary>.',
  'timeline.html': 'Timeline component — vertical timeline for events and activity feeds.',
  'tree-view.html': 'Tree View component — hierarchical data display with expand/collapse.',
  'calendar.html': 'Calendar component — month-view calendar grid built with native HTML table.',
  // Feedback & Status
  'spinner.html': 'Spinner component — loading indicators with CSS animations.',
  'skeleton.html': 'Skeleton component — placeholder loading states with pulse animation.',
  'progress.html': 'Progress component — native <progress> bars with custom styling.',
  'alert.html': 'Alert component — contextual messages for success, warning, error, and info.',
  'alert-dialog.html': 'Alert Dialog component — confirmation dialogs using native <dialog> element.',
  'toast.html': 'Toast component — ephemeral notifications using popover API.',
  // Overlays
  'popover.html': 'Popover component — floating content panels using native popover API.',
  'tooltip.html': 'Tooltip component — hover hints using popover and CSS anchor positioning.',
  'context-menu.html': 'Context Menu component — right-click menus with keyboard navigation.',
  'dialog.html': 'Dialog component — modal dialogs using native <dialog> with showModal().',
  'sheet.html': 'Sheet component — slide-out panels using native <dialog> element.',
  'accordion.html': 'Accordion component — collapsible sections using <details>/<summary>.',
  'command.html': 'Command component — searchable command palette with keyboard navigation.',
  // Navigation
  'breadcrumb.html': 'Breadcrumb component — navigation trail with separator customization.',
  'pagination.html': 'Pagination component — page navigation controls with prev/next and page numbers.',
  'steps.html': 'Steps component — multi-step progress indicator for workflows.',
  'tabs.html': 'Tabs component — tabbed content panels with keyboard navigation.',
  'dropdown.html': 'Dropdown Menu component — action menus using native popover API.',
  'navigation-menu.html': 'Navigation Menu component — site-level navigation with dropdowns.',
  // Layout
  'aspect-ratio.html': 'Aspect Ratio component — constrain elements to a specific width-to-height ratio.',
  'container.html': 'Container component — centered, max-width content wrapper.',
  'scroll-area.html': 'Scroll Area component — custom-styled scrollable containers.',
  'carousel.html': 'Carousel component — scrollable content slider with CSS scroll-snap.',
  'sidebar.html': 'Sidebar component — collapsible side navigation panel.',
  'sortable.html': 'Sortable component — drag-and-drop reorderable lists.',
};

const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(DOCS_DIR, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Extract title for OG tags
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const pageTitle = titleMatch ? titleMatch[1] : 'shadcn-html';
  const description = META[file] || 'shadcn-html — A design system built with semantic HTML, shadcn tokens, and plain CSS.';

  // 1. Add favicon + meta tags after <meta name="color-scheme">
  if (!html.includes('rel="icon"')) {
    const metaBlock = [
      `  <link rel="icon" href="favicon.svg" type="image/svg+xml">`,
      `  <meta name="description" content="${description}">`,
      `  <meta property="og:title" content="${pageTitle}">`,
      `  <meta property="og:description" content="${description}">`,
      `  <meta property="og:type" content="website">`,
      `  <meta property="og:url" content="${SITE_URL}/${file}">`,
      `  <meta property="og:site_name" content="shadcn-html">`,
      `  <meta name="twitter:card" content="summary">`,
      `  <meta name="twitter:title" content="${pageTitle}">`,
      `  <meta name="twitter:description" content="${description}">`,
    ].join('\n');

    html = html.replace(
      /<meta name="color-scheme" content="light dark">\n/,
      `<meta name="color-scheme" content="light dark">\n${metaBlock}\n`
    );
  }

  // 2. Add defer + SRI to marked.min.js
  html = html.replace(
    /<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/marked\/15\.0\.7\/marked\.min\.js"><\/script>/g,
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.7/marked.min.js" defer integrity="sha384-H+hy9ULve6xfxRkWIh/YOtvDdpXgV2fmAGQkIDTxIgZwNoaoBal14Di2YTMR6MzR" crossorigin="anonymous"></script>'
  );

  // 3. Pin lucide@latest → lucide@1.8.0 + SRI
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/lucide@latest"><\/script>/g,
    '<script src="https://unpkg.com/lucide@1.8.0" integrity="sha384-+8nbzwDAyu5kAjqtR/XKxIgPHQD2TflvbZgeDZn5t3JP+OOogNH1jXnfel8ZAgzS" crossorigin="anonymous"></script>'
  );

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✓ ${file}`);
}

console.log(`\nUpdated ${files.length} files.`);
