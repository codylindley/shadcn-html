#!/usr/bin/env node
// Add Component Skill <details> section to pages that are missing it.
// The section contains the summary bar (with clickable spec link) and
// a div that gets populated from the embedded markdown at page load.

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
  if (!fs.existsSync(path.join(compDir, compName))) continue;
  if (!fs.existsSync(path.join(compDir, compName, `component-skill.md`))) continue;

  const filePath = path.join(docDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already has the spec section
  if (html.includes('Component Skill')) continue;

  // Build the skill details section
  const specSection = `
        <!-- Component Skill -->
        <details style="margin-bottom:2rem;border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden;">
          <summary style="padding:0.875rem 1.25rem;background:var(--muted);cursor:pointer;font-size:0.8125rem;font-weight:600;font-family:var(--font-mono);color:var(--muted-foreground);list-style:none;display:flex;align-items:center;gap:0.5rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 200ms;"><path d="m9 18 6-6-6-6"/></svg>
            Component Skill — <span data-spec-href="../components/${compName}/component-skill.md" style="text-decoration:underline;text-underline-offset:3px;">components/${compName}/component-skill.md</span>
          </summary>
          <div class="spec-inline-body" style="padding:1.5rem;font-size:0.875rem;line-height:1.85;"></div>
        </details>
`;

  // Insert after the description paragraph (the <p class="text-muted-foreground leading-relaxed mb-6"> block)
  // Find the closing </p> of that paragraph, then the next line
  const descEndRe = /(<p class="text-muted-foreground leading-relaxed mb-6">[^]*?<\/p>\s*\n)/;
  const match = html.match(descEndRe);
  if (match) {
    html = html.replace(descEndRe, match[1] + specSection);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  OK ${file}`);
    count++;
  } else {
    console.log(`  WARN ${file} — could not find insertion point`);
  }
}

console.log(`\nDone: ${count} files updated`);
