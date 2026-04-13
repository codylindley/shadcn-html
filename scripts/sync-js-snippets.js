#!/usr/bin/env node
// sync-js-snippets.js — Replaces inline <pre><code class="language-javascript"> blocks
// in each doc page with the actual component JS file content.

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'dist', 'documentation');
const COMP_DIR = path.join(__dirname, '..', 'dist', 'components');

// Map: doc HTML filename (without .html) → component JS file path
// We discover these from each HTML page's "view file" link
function findJsSourceLink(html) {
  // Look for: <a href="../components/{name}/{name}.js" ... >view file</a>
  const match = html.match(/<a\s+href="(\.\.\/components\/[^"]+\.js)"\s+target="_blank"[^>]*>view file<\/a>/);
  return match ? match[1] : null;
}

function htmlEncode(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Find the JS code block and replace it
function replaceJsSnippet(html, newCode) {
  // Match: <pre><code class="language-javascript">...CONTENT...</code></pre>
  // But NOT ones with data-src (those load dynamically)
  const regex = /(<pre><code class="language-javascript">)([\s\S]*?)(<\/code><\/pre>)/g;
  let replaced = false;

  const result = html.replace(regex, (match, opening, oldContent, closing) => {
    // Skip data-src blocks (like image.html)
    if (opening.includes('data-src')) return match;
    if (replaced) return match; // Only replace the first match per page
    replaced = true;
    return opening + htmlEncode(newCode) + closing;
  });

  return { result, replaced };
}

// Process all HTML files
const htmlFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.html'));

let updated = 0;
let skipped = 0;
let errors = [];

for (const htmlFile of htmlFiles) {
  const htmlPath = path.join(DOCS_DIR, htmlFile);
  const html = fs.readFileSync(htmlPath, 'utf8');

  const jsLink = findJsSourceLink(html);
  if (!jsLink) {
    continue; // No JS source link on this page
  }

  // Resolve the JS file path relative to the doc page
  const jsPath = path.resolve(DOCS_DIR, jsLink);
  if (!fs.existsSync(jsPath)) {
    errors.push(`${htmlFile}: JS file not found: ${jsPath}`);
    continue;
  }

  const jsContent = fs.readFileSync(jsPath, 'utf8').trimEnd();

  // Check if this page has a language-javascript code block (not data-src)
  const hasInlineBlock = /<pre><code class="language-javascript">[\s\S]*?<\/code><\/pre>/.test(html) &&
    !/<pre><code class="language-javascript" data-src=/.test(html);

  if (!hasInlineBlock) {
    skipped++;
    continue;
  }

  const { result, replaced } = replaceJsSnippet(html, jsContent);

  if (replaced) {
    fs.writeFileSync(htmlPath, result, 'utf8');
    updated++;
    console.log(`✓ ${htmlFile} → synced with ${path.basename(jsPath)}`);
  } else {
    skipped++;
  }
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
if (errors.length) {
  console.log('Errors:');
  errors.forEach(e => console.log(`  ✗ ${e}`));
}
