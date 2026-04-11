#!/usr/bin/env node
// Embed markdown spec content into each component doc page as a hidden
// <script type="text/plain" id="spec-md-content"> block.
// This lets the modal viewer read it from the DOM instead of fetch().

const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..', 'dist', 'documentation');
const compDir = path.join(__dirname, '..', 'dist', 'components');
const htmlFiles = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));
const overviewPages = new Set([
  'index.html', 'installation.html', 'theming.html',
  'data-attribute-api.html', 'changelog.html'
]);

let count = 0;

for (const file of htmlFiles) {
  if (overviewPages.has(file)) continue;
  const compName = file.replace('.html', '');
  const mdFile = path.join(compDir, compName, `${compName}.md`);
  if (!fs.existsSync(mdFile)) continue;

  const filePath = path.join(docDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove any existing embedded spec
  html = html.replace(/\n?<script type="text\/plain" id="spec-md-content">[\s\S]*?<\/script>/g, '');

  // Read the markdown content and escape </script> if present
  const mdContent = fs.readFileSync(mdFile, 'utf8').replace(/<\/script>/gi, '<\\/script>');

  // Insert before </body>
  html = html.replace(
    '</body>',
    '<script type="text/plain" id="spec-md-content">' + mdContent + '</script>\n</body>'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  OK ${file}`);
  count++;
}

console.log(`\nDone: ${count} files updated`);
