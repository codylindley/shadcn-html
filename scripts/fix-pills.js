#!/usr/bin/env node
// Fix all component doc page pills to "Built with: CSS" / "Built with: CSS  JS"
// with each pill linking to the actual component file.

const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..', 'dist', 'documentation');
const compDir = path.join(__dirname, '..', 'dist', 'components');

// Get all HTML files
const htmlFiles = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));

// Overview pages (no component pills)
const overviewPages = new Set(['index.html', 'installation.html', 'theming.html', 'data-attribute-api.html', 'changelog.html']);

let updated = 0;
let skipped = 0;

for (const file of htmlFiles) {
  if (overviewPages.has(file)) {
    skipped++;
    continue;
  }

  const compName = file.replace('.html', '');
  const compDirPath = path.join(compDir, compName);

  // Check if component directory exists
  if (!fs.existsSync(compDirPath)) {
    console.log(`SKIP ${file} — no component dir`);
    skipped++;
    continue;
  }

  const hasCss = fs.existsSync(path.join(compDirPath, `${compName}.css`));
  const hasJs = fs.existsSync(path.join(compDirPath, `${compName}.js`));

  if (!hasCss && !hasJs) {
    console.log(`SKIP ${file} — no CSS or JS`);
    skipped++;
    continue;
  }

  const filePath = path.join(docDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Match the existing built-with pills block (links to files or anchors)
  const badgeRegex = /<div style="display:flex;align-items:baseline;gap:0\.375rem;"><span class="text-xs text-muted-foreground"[^>]*>Built with:<\/span>(?:\s*<a href="[^"]*" class="badge built-with-pill" data-variant="outline">(?:CSS|JS)<\/a>)+<\/div>/;

  if (!badgeRegex.test(html)) {
    console.log(`WARN ${file} — pill pattern not found`);
    skipped++;
    continue;
  }

  // Build new pills linking to on-page anchors
  let newPills = '<div style="display:flex;align-items:baseline;gap:0.375rem;"><span class="text-xs text-muted-foreground" style="font-family:var(--font-mono);white-space:nowrap;">Built with:</span>';

  if (hasCss) {
    newPills += ` <a href="#source-css" class="badge built-with-pill" data-variant="outline">CSS</a>`;
  }
  if (hasJs) {
    newPills += ` <a href="#source-js" class="badge built-with-pill" data-variant="outline">JS</a>`;
  }
  newPills += '</div>';

  html = html.replace(badgeRegex, newPills);

  fs.writeFileSync(filePath, html, 'utf8');
  const label = hasCss && hasJs ? 'CSS & JS' : hasCss ? 'CSS Only' : 'JS Only';
  console.log(`  OK ${file} → ${label}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
