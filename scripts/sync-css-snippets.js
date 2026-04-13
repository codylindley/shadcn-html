#!/usr/bin/env node
// sync-css-snippets.js — Replaces inline <pre><code class="language-scss"> blocks
// in each doc page with the actual component CSS file content.

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'dist', 'documentation');

// Find the CSS "view file" link → ../components/{name}/{name}.css
function findCssSourceLink(html) {
  const match = html.match(/<a\s+href="(\.\.\/components\/[^"]+\.css)"\s+target="_blank"[^>]*>view file<\/a>/);
  return match ? match[1] : null;
}

function htmlEncode(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Find the CSS code block and replace it
function replaceCssSnippet(html, newCode) {
  // Match: <pre><code class="language-scss">...CONTENT...</code></pre>
  // But NOT ones with data-src (those load dynamically)
  const regex = /(<pre><code class="language-scss">)([\s\S]*?)(<\/code><\/pre>)/g;
  let replaced = false;

  const result = html.replace(regex, (match, opening, oldContent, closing) => {
    if (opening.includes('data-src')) return match;
    if (replaced) return match; // Only replace the first match per page
    replaced = true;
    return opening + htmlEncode(newCode) + closing;
  });

  return { result, replaced };
}

// Also handle pages that use language-css instead of language-scss for component CSS
function replaceCssSnippetAlt(html, newCode) {
  // For pages using <pre><code class="language-css"> inside an #source-css section
  // We need to be careful not to replace non-component CSS blocks (like on index.html, dark-mode.html, etc.)
  // Only target blocks that are within the source-css section context
  const regex = /(<pre><code class="language-css">)([\s\S]*?)(<\/code><\/pre>)/g;
  let replaced = false;

  const result = html.replace(regex, (match, opening, oldContent, closing) => {
    if (opening.includes('data-src')) return match;
    if (replaced) return match;
    replaced = true;
    return opening + htmlEncode(newCode) + closing;
  });

  return { result, replaced };
}

const htmlFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.html'));

let updated = 0;
let skipped = 0;
let errors = [];

for (const htmlFile of htmlFiles) {
  const htmlPath = path.join(DOCS_DIR, htmlFile);
  const html = fs.readFileSync(htmlPath, 'utf8');

  const cssLink = findCssSourceLink(html);
  if (!cssLink) {
    continue; // No CSS source link on this page
  }

  const cssPath = path.resolve(DOCS_DIR, cssLink);
  if (!fs.existsSync(cssPath)) {
    errors.push(`${htmlFile}: CSS file not found: ${cssPath}`);
    continue;
  }

  const cssContent = fs.readFileSync(cssPath, 'utf8').trimEnd();

  // Check for data-src blocks first (skip those)
  if (/<pre><code class="language-scss" data-src=/.test(html)) {
    skipped++;
    console.log(`⊘ ${htmlFile} → uses data-src (skipped)`);
    continue;
  }

  // Try language-scss first
  const hasScssBlock = /<pre><code class="language-scss">[\s\S]*?<\/code><\/pre>/.test(html);

  if (hasScssBlock) {
    const { result, replaced } = replaceCssSnippet(html, cssContent);
    if (replaced) {
      fs.writeFileSync(htmlPath, result, 'utf8');
      updated++;
      console.log(`✓ ${htmlFile} → synced with ${path.basename(cssPath)}`);
    } else {
      skipped++;
    }
    continue;
  }

  // Try language-css as fallback (carousel.html uses this)
  const hasCssBlock = /<pre><code class="language-css">[\s\S]*?<\/code><\/pre>/.test(html);
  if (hasCssBlock) {
    // Only replace if this page has a CSS source section (not a general CSS example page)
    if (!html.includes('id="source-css"')) {
      skipped++;
      continue;
    }
    const { result, replaced } = replaceCssSnippetAlt(html, cssContent);
    if (replaced) {
      fs.writeFileSync(htmlPath, result, 'utf8');
      updated++;
      console.log(`✓ ${htmlFile} → synced with ${path.basename(cssPath)} (language-css)`);
    } else {
      skipped++;
    }
    continue;
  }

  skipped++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
if (errors.length) {
  console.log('Errors:');
  errors.forEach(e => console.log(`  ✗ ${e}`));
}
