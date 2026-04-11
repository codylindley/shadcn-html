#!/usr/bin/env node
// Add file links underneath CSS/JS section headings in component doc pages.
// Transforms:
//   <h2 ...>CSS</h2>
// Into:
//   <h2 ...>CSS <a href="..." ...>↗ view file</a></h2>

const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..', 'dist', 'documentation');
const compDir = path.join(__dirname, '..', 'dist', 'components');
const htmlFiles = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));
const overviewPages = new Set([
  'index.html', 'installation.html', 'theming.html',
  'data-attribute-api.html', 'changelog.html'
]);

const linkStyle = 'font-size:0.75rem;font-weight:400;color:var(--muted-foreground);text-decoration:underline;text-underline-offset:3px;margin-left:0.5rem;';

let count = 0;

for (const file of htmlFiles) {
  if (overviewPages.has(file)) continue;
  const compName = file.replace('.html', '');
  if (!fs.existsSync(path.join(compDir, compName))) continue;

  const filePath = path.join(docDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Add file link to CSS heading (if not already present)
  const cssHeadingRe = /(<section[^>]*id="source-css"[^>]*>\s*<h2[^>]*>CSS)((?:\s*<a[^>]*>.*?<\/a>)?<\/h2>)/;
  if (cssHeadingRe.test(html) && !html.match(cssHeadingRe)[0].includes('view file')) {
    html = html.replace(cssHeadingRe, `$1 <a href="../components/${compName}/${compName}.css" target="_blank" style="${linkStyle}">view file</a>$2`);
    changed = true;
  }

  // Add file link to JS heading (if not already present)
  const jsHeadingRe = /(<section[^>]*id="source-js"[^>]*>\s*<h2[^>]*>JavaScript)((?:\s*<a[^>]*>.*?<\/a>)?<\/h2>)/;
  if (jsHeadingRe.test(html) && !html.match(jsHeadingRe)[0].includes('view file')) {
    html = html.replace(jsHeadingRe, `$1 <a href="../components/${compName}/${compName}.js" target="_blank" style="${linkStyle}">view file</a>$2`);
    changed = true;
  }

  // Also handle existing JS sections that don't have id="source-js" (the original 8)
  const jsHeadingAltRe = /(<section style="margin-top:3rem;">\s*<h2[^>]*>JavaScript)((?:\s*<a[^>]*>.*?<\/a>)?<\/h2>)/;
  if (jsHeadingAltRe.test(html) && !html.match(jsHeadingAltRe)[0].includes('view file')) {
    html = html.replace(jsHeadingAltRe, `$1 <a href="../components/${compName}/${compName}.js" target="_blank" style="${linkStyle}">view file</a>$2`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  OK ${file}`);
    count++;
  }
}

console.log(`\nDone: ${count} files updated`);
