#!/usr/bin/env node
// 1. Add marked.js CDN to all doc pages (if not already present)
// 2. Turn "Component Specification — components/X/X.md" into a clickable link

const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..', 'dist', 'documentation');
const htmlFiles = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));

const markedCdn = '<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.7/marked.min.js"></script>';

let updated = 0;

for (const file of htmlFiles) {
  const filePath = path.join(docDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Add marked CDN after highlight.js CDN (if not already present)
  if (!html.includes('marked')) {
    html = html.replace(
      /(<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/highlight\.js\/[^"]*"><\/script>)/,
      '$1\n  ' + markedCdn
    );
    changed = true;
  }

  // 2. Turn spec path into a clickable link
  // Match: "Component Specification — components/X/X.md" inside summary
  const specPathRe = /(Component Specification\s*—\s*)(components\/[a-z-]+\/[a-z-]+\.md)/g;
  if (specPathRe.test(html) && !html.includes('data-spec-href')) {
    html = html.replace(
      /(Component Specification\s*—\s*)(components\/[a-z-]+\/[a-z-]+\.md)/g,
      function (match, prefix, mdPath) {
        return prefix + '<span data-spec-href="../' + mdPath + '" style="text-decoration:underline;text-underline-offset:3px;">' + mdPath + '</span>';
      }
    );
    changed = true;
  }

  // 3. Turn "Full specification → <a href=...>" links into modal triggers
  const fullSpecRe = /Full specification → <a href="(\.\.\/components\/[a-z-]+\/[a-z-]+\.md)"[^>]*>(components\/[a-z-]+\/[a-z-]+\.md)<\/a>/g;
  if (fullSpecRe.test(html) && !html.includes('data-spec-full')) {
    html = html.replace(
      /Full specification → <a href="(\.\.\/components\/[a-z-]+\/[a-z-]+\.md)"[^>]*>(components\/[a-z-]+\/[a-z-]+\.md)<\/a>/g,
      function (match, href, label) {
        return 'Full specification → <a href="' + href + '" data-spec-href="' + href + '" data-spec-full style="color:var(--primary);text-decoration:underline;text-underline-offset:4px;">' + label + '</a>';
      }
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  OK ${file}`);
    updated++;
  }
}

console.log(`\nDone: ${updated} files updated`);
