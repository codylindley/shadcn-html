/**
 * Wraps the header section of each documentation page in a <div class="page-header">
 * to make it sticky. Skips index.html (introduction page).
 *
 * Component pages: wraps breadcrumb, h1, description, and spec <details>
 * Reference pages: wraps breadcrumb, h1, and description paragraph
 */

const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..', 'dist', 'documentation');
const files = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));

const skipPages = new Set(['index.html']);

let updated = 0;
let skipped = 0;

for (const file of files) {
  if (skipPages.has(file)) {
    console.log(`SKIP (excluded): ${file}`);
    skipped++;
    continue;
  }

  const filePath = path.join(docDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has page-header
  if (content.includes('page-header')) {
    console.log(`SKIP (already done): ${file}`);
    skipped++;
    continue;
  }

  // Change main padding from 3rem to 2rem top
  content = content.replace(
    /(<main\s[^>]*padding:\s*)3rem(\s+3\.5rem\s+8rem)/,
    '$12rem$2'
  );

  // Find the <main> tag
  const mainRegex = /<main\s[^>]*>/;
  const mainMatch = content.match(mainRegex);
  if (!mainMatch) {
    console.log(`SKIP (no main): ${file}`);
    skipped++;
    continue;
  }

  const mainIdx = content.indexOf(mainMatch[0]);
  const mainEnd = mainIdx + mainMatch[0].length;
  const afterMain = content.slice(mainEnd);

  // Is this a component page with a spec block?
  const hasSpec = afterMain.includes('Component Specification');

  let headerEndOffset;

  if (hasSpec) {
    // Component page — wrap up to and including </details>
    const detailsCloseIdx = afterMain.indexOf('</details>');
    if (detailsCloseIdx === -1) {
      console.log(`WARN (spec but no </details>): ${file}`);
      skipped++;
      continue;
    }
    headerEndOffset = detailsCloseIdx + '</details>'.length;
  } else {
    // Reference page — wrap up to the description paragraph
    const descRegex = /text-muted-foreground leading-relaxed[\s\S]*?<\/p>/;
    const descMatch = afterMain.match(descRegex);
    if (!descMatch) {
      console.log(`SKIP (no desc paragraph): ${file}`);
      skipped++;
      continue;
    }
    headerEndOffset = afterMain.indexOf(descMatch[0]) + descMatch[0].length;
  }

  // Insert wrapper
  const headerContent = afterMain.slice(0, headerEndOffset);
  const bodyContent = afterMain.slice(headerEndOffset);

  content = content.slice(0, mainEnd) +
    '\n      <div class="page-header">' +
    headerContent +
    '\n      </div>' +
    bodyContent;

  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${file}`);
  updated++;
}

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
