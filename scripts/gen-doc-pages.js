const fs = require('fs');
const path = require('path');
const docDir = path.join(__dirname, '..', 'dist/documentation');

// New components to create doc pages for
const newPages = [
  { name: 'popover', title: 'Popover', desc: 'Rich content in a floating panel, triggered by a button. Uses the native Popover API.', badge: 'JS',
    demo: `<button class="btn" data-variant="outline" popovertarget="demo-popover">Open Popover</button>\n          <div class="popover" id="demo-popover" popover>\n            <div class="popover-header">\n              <p class="popover-title">Dimensions</p>\n              <p class="popover-description">Set the dimensions for the layer.</p>\n            </div>\n            <div class="popover-content">\n              <p style="margin:0;font-size:0.8125rem;color:var(--muted-foreground);">Width: 100% &bull; Height: auto</p>\n            </div>\n          </div>`,
    code: `<button class="btn" popovertarget="my-popover">Open</button>\n<div class="popover" id="my-popover" popover>\n  <div class="popover-header">\n    <p class="popover-title">Title</p>\n    <p class="popover-description">Description</p>\n  </div>\n  <div class="popover-content">...</div>\n</div>` },
  { name: 'tooltip', title: 'Tooltip', desc: 'A popup showing information on hover or focus. Uses the Popover API.', badge: 'JS',
    demo: `<div class="flex gap-4">\n            <button class="btn" data-variant="outline" data-tooltip-trigger="tip-1">Hover me</button>\n            <div class="tooltip" id="tip-1" popover="hint" role="tooltip">Add to library</div>\n          </div>`,
    code: `<button class="btn" data-tooltip-trigger="my-tip">Hover</button>\n<div class="tooltip" id="my-tip" popover="hint" role="tooltip">Tooltip text</div>` },
  { name: 'context-menu', title: 'Context Menu', desc: 'A menu triggered by right-click. Uses the Popover API with contextmenu event.', badge: 'JS',
    demo: `<div class="context-menu-trigger" data-context-menu="demo-ctx">Right click here</div>\n          <div class="context-menu" id="demo-ctx" popover>\n            <button class="context-menu-item" role="menuitem">Cut</button>\n            <button class="context-menu-item" role="menuitem">Copy</button>\n            <button class="context-menu-item" role="menuitem">Paste</button>\n            <div class="context-menu-separator"></div>\n            <button class="context-menu-item" role="menuitem">Select All</button>\n          </div>`,
    code: `<div class="context-menu-trigger" data-context-menu="my-ctx">\n  Right click here\n</div>\n<div class="context-menu" id="my-ctx" popover>\n  <button class="context-menu-item" role="menuitem">Cut</button>\n  <button class="context-menu-item" role="menuitem">Copy</button>\n</div>` },
  { name: 'command', title: 'Command', desc: 'A searchable command palette for quick actions. Built on native <code>&lt;dialog&gt;</code> with search filtering. Open with <kbd>Cmd+K</kbd>.', badge: 'JS',
    demo: `<button class="btn" data-variant="outline" data-command-trigger="demo-cmd">Open Command Menu</button>\n          <dialog id="demo-cmd" class="command" role="dialog" aria-modal="true" aria-label="Command menu">\n            <div class="command-content">\n              <div class="command-input-wrapper">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>\n                <input class="command-input" type="text" placeholder="Type a command or search...">\n              </div>\n              <div class="command-list">\n                <div class="command-group">\n                  <p class="command-group-heading">Suggestions</p>\n                  <button class="command-item">Calendar</button>\n                  <button class="command-item">Search Emoji</button>\n                  <button class="command-item">Calculator</button>\n                </div>\n                <div class="command-separator"></div>\n                <div class="command-group">\n                  <p class="command-group-heading">Settings</p>\n                  <button class="command-item">Profile <span class="command-shortcut">\u2318P</span></button>\n                  <button class="command-item">Billing <span class="command-shortcut">\u2318B</span></button>\n                  <button class="command-item">Settings <span class="command-shortcut">\u2318S</span></button>\n                </div>\n              </div>\n              <div class="command-empty" hidden>No results found.</div>\n            </div>\n          </dialog>`,
    code: `<button class="btn" data-command-trigger="cmd">Open</button>\n<dialog id="cmd" class="command" role="dialog" aria-modal="true">\n  <div class="command-content">\n    <div class="command-input-wrapper">\n      <svg>...search...</svg>\n      <input class="command-input" type="text" placeholder="Type a command...">\n    </div>\n    <div class="command-list">\n      <div class="command-group">\n        <p class="command-group-heading">Suggestions</p>\n        <button class="command-item">Calendar</button>\n      </div>\n    </div>\n  </div>\n</dialog>` },
  { name: 'breadcrumb', title: 'Breadcrumb', desc: 'Displays the path to the current page. Built on <code>&lt;nav&gt;</code> + <code>&lt;ol&gt;</code>.', badge: 'CSS Only',
    demo: `<nav class="breadcrumb" aria-label="Breadcrumb">\n            <ol class="breadcrumb-list">\n              <li class="breadcrumb-item"><a class="breadcrumb-link" href="#">Home</a></li>\n              <li class="breadcrumb-separator" aria-hidden="true">/</li>\n              <li class="breadcrumb-item"><a class="breadcrumb-link" href="#">Components</a></li>\n              <li class="breadcrumb-separator" aria-hidden="true">/</li>\n              <li class="breadcrumb-item"><span class="breadcrumb-page" aria-current="page">Breadcrumb</span></li>\n            </ol>\n          </nav>`,
    code: `<nav class="breadcrumb" aria-label="Breadcrumb">\n  <ol class="breadcrumb-list">\n    <li class="breadcrumb-item"><a class="breadcrumb-link" href="#">Home</a></li>\n    <li class="breadcrumb-separator" aria-hidden="true">/</li>\n    <li class="breadcrumb-item"><span class="breadcrumb-page" aria-current="page">Current</span></li>\n  </ol>\n</nav>` },
  { name: 'pagination', title: 'Pagination', desc: 'Page navigation with previous/next links and page numbers.', badge: 'CSS Only',
    demo: `<nav class="pagination" aria-label="Pagination">\n            <ul class="pagination-list">\n              <li><a class="pagination-prev" href="#">&lsaquo; Previous</a></li>\n              <li><a class="pagination-link" href="#">1</a></li>\n              <li><a class="pagination-link pagination-active" href="#" aria-current="page">2</a></li>\n              <li><a class="pagination-link" href="#">3</a></li>\n              <li><span class="pagination-ellipsis">&hellip;</span></li>\n              <li><a class="pagination-next" href="#">Next &rsaquo;</a></li>\n            </ul>\n          </nav>`,
    code: `<nav class="pagination" aria-label="Pagination">\n  <ul class="pagination-list">\n    <li><a class="pagination-prev" href="#">Previous</a></li>\n    <li><a class="pagination-link pagination-active" href="#" aria-current="page">1</a></li>\n    <li><a class="pagination-link" href="#">2</a></li>\n    <li><a class="pagination-next" href="#">Next</a></li>\n  </ul>\n</nav>` },
  { name: 'steps', title: 'Steps', desc: 'Multi-step progress indicator with complete, current, and upcoming states.', badge: 'CSS Only',
    demo: `<ol class="steps" style="max-width:28rem;width:100%;">\n            <li class="step" data-status="complete"><div class="step-indicator">1</div><div class="step-content"><p class="step-title">Account</p></div></li>\n            <li class="step" data-status="current"><div class="step-indicator">2</div><div class="step-content"><p class="step-title">Profile</p></div></li>\n            <li class="step"><div class="step-indicator">3</div><div class="step-content"><p class="step-title">Complete</p></div></li>\n          </ol>`,
    code: `<ol class="steps">\n  <li class="step" data-status="complete">\n    <div class="step-indicator">1</div>\n    <div class="step-content"><p class="step-title">Account</p></div>\n  </li>\n  <li class="step" data-status="current">\n    <div class="step-indicator">2</div>\n    <div class="step-content"><p class="step-title">Profile</p></div>\n  </li>\n  <li class="step">\n    <div class="step-indicator">3</div>\n    <div class="step-content"><p class="step-title">Complete</p></div>\n  </li>\n</ol>` },
  { name: 'navigation-menu', title: 'Navigation Menu', desc: 'Site-level navigation with dropdown content panels.', badge: 'JS',
    demo: `<nav class="nav-menu" aria-label="Main">\n            <ul class="nav-menu-list">\n              <li class="nav-menu-item"><a class="nav-menu-link" href="#">Home</a></li>\n              <li class="nav-menu-item"><a class="nav-menu-link" href="#">About</a></li>\n              <li class="nav-menu-item"><a class="nav-menu-link" href="#">Contact</a></li>\n            </ul>\n          </nav>`,
    code: `<nav class="nav-menu" aria-label="Main">\n  <ul class="nav-menu-list">\n    <li class="nav-menu-item"><a class="nav-menu-link" href="#">Home</a></li>\n    <li class="nav-menu-item">\n      <button class="nav-menu-trigger" popovertarget="dd">Products</button>\n      <div class="nav-menu-content" id="dd" popover>...</div>\n    </li>\n  </ul>\n</nav>` },
  { name: 'aspect-ratio', title: 'Aspect Ratio', desc: 'Container with controlled proportions using CSS <code>aspect-ratio</code>.', badge: 'CSS Only',
    demo: `<div class="flex gap-4 flex-wrap">\n            <div class="aspect-ratio" data-ratio="16/9" style="width:200px;background:var(--muted);display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:var(--muted-foreground);">16:9</div>\n            <div class="aspect-ratio" data-ratio="4/3" style="width:150px;background:var(--muted);display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:var(--muted-foreground);">4:3</div>\n            <div class="aspect-ratio" data-ratio="1/1" style="width:100px;background:var(--muted);display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:var(--muted-foreground);">1:1</div>\n          </div>`,
    code: `<div class="aspect-ratio" data-ratio="16/9">\n  <img src="..." alt="..." />\n</div>` },
  { name: 'container', title: 'Container', desc: 'Centered content wrapper with responsive max-width sizes.', badge: 'CSS Only',
    demo: `<div style="width:100%;">\n            <div class="container" data-size="sm" style="background:var(--muted);padding:1rem;border-radius:var(--radius-md);text-align:center;font-size:0.8125rem;color:var(--muted-foreground);">Container (sm — 40rem max)</div>\n          </div>`,
    code: `<div class="container"><!-- page content --></div>\n<div class="container" data-size="sm"><!-- narrow --></div>\n<div class="container" data-size="lg"><!-- wide --></div>` },
  { name: 'scroll-area', title: 'Scroll Area', desc: 'Scrollable container with custom-styled thin scrollbars.', badge: 'CSS Only',
    demo: `<div class="scroll-area" style="height:10rem;width:16rem;border:1px solid var(--border);border-radius:var(--radius-lg);padding:1rem;">\n            <div style="font-size:0.8125rem;color:var(--foreground);">\n              <p style="margin:0 0 0.75rem;font-weight:500;">Tags</p>\n              <p style="margin:0 0 0.5rem;">v1.0.0-alpha</p><p style="margin:0 0 0.5rem;">v0.9.0</p><p style="margin:0 0 0.5rem;">v0.8.2</p><p style="margin:0 0 0.5rem;">v0.8.1</p><p style="margin:0 0 0.5rem;">v0.8.0</p><p style="margin:0 0 0.5rem;">v0.7.0</p><p style="margin:0 0 0.5rem;">v0.6.0</p><p style="margin:0 0 0.5rem;">v0.5.0</p><p style="margin:0 0 0.5rem;">v0.4.0</p><p style="margin:0;">v0.3.0</p>\n            </div>\n          </div>`,
    code: `<div class="scroll-area" style="height:12rem;">\n  <!-- long content -->\n</div>` },
  { name: 'carousel', title: 'Carousel', desc: 'Horizontal slide viewer with CSS scroll-snap and navigation buttons.', badge: 'JS',
    demo: `<div class="carousel" style="max-width:24rem;margin:0 2rem;">\n            <div class="carousel-viewport">\n              <div class="carousel-slide">Slide 1</div>\n              <div class="carousel-slide">Slide 2</div>\n              <div class="carousel-slide">Slide 3</div>\n            </div>\n            <button class="carousel-prev" aria-label="Previous">&lsaquo;</button>\n            <button class="carousel-next" aria-label="Next">&rsaquo;</button>\n          </div>`,
    code: `<div class="carousel">\n  <div class="carousel-viewport">\n    <div class="carousel-slide">Slide 1</div>\n    <div class="carousel-slide">Slide 2</div>\n  </div>\n  <button class="carousel-prev" aria-label="Previous">&lsaquo;</button>\n  <button class="carousel-next" aria-label="Next">&rsaquo;</button>\n</div>` },
  { name: 'sidebar', title: 'Sidebar', desc: 'Application sidebar navigation with links, sections, and collapsible state.', badge: 'CSS Only',
    demo: `<div style="border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;height:16rem;width:16rem;">\n            <aside class="app-sidebar" style="width:100%;border-right:none;">\n              <div class="sidebar-header"><span class="sidebar-logo">MyApp</span></div>\n              <nav class="sidebar-nav">\n                <a class="sidebar-link" data-active="true" href="#">Dashboard</a>\n                <a class="sidebar-link" href="#">Projects</a>\n                <a class="sidebar-link" href="#">Settings</a>\n              </nav>\n              <div class="sidebar-footer"><p>v1.0</p></div>\n            </aside>\n          </div>`,
    code: `<aside class="app-sidebar">\n  <div class="sidebar-header"><span class="sidebar-logo">App</span></div>\n  <nav class="sidebar-nav">\n    <a class="sidebar-link" data-active="true" href="#">Dashboard</a>\n    <a class="sidebar-link" href="#">Settings</a>\n  </nav>\n</aside>` },
  { name: 'sortable', title: 'Sortable', desc: 'Drag-and-drop reorderable list using the native HTML Drag and Drop API.', badge: 'JS',
    demo: `<ul class="sortable" role="listbox" aria-label="Reorder items" style="width:16rem;">\n            <li class="sortable-item" draggable="true" role="option"><span class="sortable-handle">\u2801\u2801</span><span>Build components</span></li>\n            <li class="sortable-item" draggable="true" role="option"><span class="sortable-handle">\u2801\u2801</span><span>Write documentation</span></li>\n            <li class="sortable-item" draggable="true" role="option"><span class="sortable-handle">\u2801\u2801</span><span>Deploy to production</span></li>\n            <li class="sortable-item" draggable="true" role="option"><span class="sortable-handle">\u2801\u2801</span><span>Run tests</span></li>\n          </ul>`,
    code: `<ul class="sortable" role="listbox">\n  <li class="sortable-item" draggable="true" role="option">\n    <span class="sortable-handle">\u2801\u2801</span>\n    <span>Item 1</span>\n  </li>\n</ul>` }
];

// Read spinner.html as template for head/footer
const template = fs.readFileSync(path.join(docDir, 'spinner.html'), 'utf8');

// Extract CSS imports section (everything between first component CSS and </head>)
const headMatch = template.match(/^[\s\S]*?<\/head>/);
const footerMatch = template.match(/<script src="js\/site\.js"[\s\S]*?<\/html>/);

if (!headMatch || !footerMatch) { console.error('Template parse failed'); process.exit(1); }

// New CSS imports to add to the head
const newCSS = [
  'popover', 'tooltip', 'context-menu', 'command',
  'breadcrumb', 'pagination', 'steps', 'navigation-menu',
  'aspect-ratio', 'container', 'scroll-area', 'carousel', 'sidebar', 'sortable'
].map(n => `  <link rel="stylesheet" href="../components/${n}/${n}.css">`).join('\n');

// New JS imports to add to footer  
const newJS = [
  'popover', 'tooltip', 'context-menu', 'command',
  'navigation-menu', 'carousel', 'sortable'
].map(n => `  <script src="../components/${n}/${n}.js" defer></script>`).join('\n');

// Build updated head and footer by inserting new imports
let updatedHead = headMatch[0].replace('</head>', newCSS + '\n</head>');
let updatedFooter = footerMatch[0].replace(
  '<script src="https://unpkg.com/lucide@latest"></script>',
  newJS + '\n  <script src="https://unpkg.com/lucide@latest"></script>'
);

// Generate each doc page
newPages.forEach(p => {
  const title = `${p.title} — shadcn-html`;
  let head = updatedHead.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  
  const body = `<body>
  <site-header></site-header>
  <div class="flex" style="margin-top: 3.5rem; min-height: calc(100vh - 3.5rem);">
    <site-nav></site-nav>
    <main style="flex: 1; min-width: 0; max-width: 54rem; padding: 3rem 3.5rem 8rem;">
        <div class="flex items-baseline justify-between mb-1">
          <p class="text-sm text-muted-foreground" style="font-family:var(--font-mono);">shadcn-html / ${p.name}</p>
          <span class="badge" data-variant="secondary">${p.badge}</span>
        </div>
        <h1 style="font-family:var(--font-display);font-size:2.5rem;font-weight:400;letter-spacing:-0.035em;margin:0 0 0.75rem;">${p.title}</h1>
        <p class="text-muted-foreground leading-relaxed mb-6">
          ${p.desc}
        </p>

        <p class="text-sm font-medium mb-2 mt-6">Default</p>
        <div class="preview">
          ${p.demo}
        </div>
        <div style="position:relative;margin-top:0.5rem;">
          <button class="copy-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Copy
          </button>
          <pre><code class="language-markup">${p.code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>
        </div>

        <p class="text-xs text-muted-foreground" style="margin-top:2rem;">
          Full component skill → <a href="../components/${p.name}/component-skill.md" style="color:var(--primary);text-decoration:underline;text-underline-offset:4px;">components/${p.name}/component-skill.md</a>
        </p>
    </main>
  </div>
  ${updatedFooter}`;

  const html = head + '\n' + body;
  fs.writeFileSync(path.join(docDir, `${p.name}.html`), html);
  console.log(`Created: ${p.name}.html`);
});

// Now update ALL existing HTML files with new CSS/JS imports
const allFiles = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));
const cssLines = newCSS;
const jsLines = newJS;

allFiles.forEach(f => {
  if (newPages.some(p => p.name + '.html' === f)) return; // skip newly created
  const filePath = path.join(docDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add CSS imports if not already present
  if (!content.includes('popover/popover.css')) {
    content = content.replace(
      /(<link rel="stylesheet" href="\.\.\/components\/alert-dialog\/alert-dialog\.css">)/,
      '$1\n' + cssLines
    );
  }
  
  // Add JS imports if not already present
  if (!content.includes('popover/popover.js')) {
    content = content.replace(
      /(<script src="https:\/\/unpkg\.com\/lucide@latest"><\/script>)/,
      jsLines + '\n  $1'
    );
  }
  
  fs.writeFileSync(filePath, content);
});

console.log(`Updated ${allFiles.length - newPages.length} existing pages with new imports`);
