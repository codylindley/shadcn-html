#!/usr/bin/env node
// Add CSS source and JS source sections to the bottom of each component doc page.
// CSS section always comes first (before JS section if present).
// Skips pages that already have these sections.
// Also ensures "Full component skill" link is present.

const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..', 'dist', 'documentation');
const compDir = path.join(__dirname, '..', 'dist', 'components');

const htmlFiles = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));
const overviewPages = new Set([
  'index.html', 'installation.html', 'theming.html',
  'data-attribute-api.html', 'changelog.html'
]);

// HTML-escape for embedding source code in <code> blocks
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Generate a brief description from the first comment line in CSS/JS, or a default
function cssDescription(compName, cssContent) {
  // Try to pull from the first comment
  const match = cssContent.match(/\/\*[*\s]*([^*\n][^\n]*)/);
  if (match) return match[1].trim().replace(/\*\/.*/, '').trim();
  return `Styles for the ${compName} component. Uses design tokens for colors, spacing, and radius.`;
}

function jsDescription(compName, jsContent) {
  // Try to pull from the first comment
  const match = jsContent.match(/\/\/\s*[-─]*\s*(.+?)(?:\s*[-─]*\s*$)/m);
  if (match && match[1].length > 10) return match[1].trim();
  const match2 = jsContent.match(/\/\/\s+(.{15,})/);
  if (match2) return match2[1].trim();
  return `Interaction logic for the ${compName} component. Uses data attributes for wiring.`;
}

const copyBtnHtml =
  '<button class="copy-btn">' +
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>' +
    'Copy' +
  '</button>';

let stats = { cssAdded: 0, jsAdded: 0, specAdded: 0, skipped: 0 };

for (const file of htmlFiles) {
  if (overviewPages.has(file)) continue;

  const compName = file.replace('.html', '');
  const compDirPath = path.join(compDir, compName);
  if (!fs.existsSync(compDirPath)) continue;

  const cssFile = path.join(compDirPath, `${compName}.css`);
  const jsFile = path.join(compDirPath, `${compName}.js`);
  const hasCss = fs.existsSync(cssFile);
  const hasJs = fs.existsSync(jsFile);

  if (!hasCss && !hasJs) continue;

  const filePath = path.join(docDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  const hasCssSection = /<!-- ── CSS|<!-- ── Stylesheet/.test(html);
  const hasJsSection = /<!-- ── JavaScript/.test(html);
  const hasSpecLink = /Full component skill/.test(html);

  // If everything is already there, skip
  if (hasCssSection && (!hasJs || hasJsSection) && hasSpecLink) {
    stats.skipped++;
    continue;
  }

  // Build the sections to insert
  let insertHtml = '';

  // ── CSS section ──
  if (!hasCssSection && hasCss) {
    const cssContent = fs.readFileSync(cssFile, 'utf8');
    insertHtml += `
        <!-- ── CSS ─────────────────────────────────────── -->
        <section style="margin-top:3rem;" id="source-css">
          <h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:400;letter-spacing:-0.025em;margin:0 0 0.375rem;">CSS</h2>
          <div style="position:relative;margin-top:0.5rem;">
            ${copyBtnHtml}
            <pre><code class="language-scss">${escapeHtml(cssContent.trimEnd())}</code></pre>
          </div>
        </section>`;
    stats.cssAdded++;
  }

  // ── JS section ──
  if (!hasJsSection && hasJs) {
    const jsContent = fs.readFileSync(jsFile, 'utf8');
    const desc = jsDescription(compName, jsContent);
    insertHtml += `

        <!-- ── JavaScript ──────────────────────────────── -->
        <section style="margin-top:3rem;" id="source-js">
          <h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:400;letter-spacing:-0.025em;margin:0 0 0.375rem;">JavaScript</h2>
          <p class="text-muted-foreground text-sm mb-4">${escapeHtml(desc)}</p>
          <div style="position:relative;margin-top:0.5rem;">
            ${copyBtnHtml}
            <pre><code class="language-javascript">${escapeHtml(jsContent.trimEnd())}</code></pre>
          </div>
        </section>`;
    stats.jsAdded++;
  }

  // ── Spec link ──
  if (!hasSpecLink) {
    insertHtml += `
        <p class="text-xs text-muted-foreground" style="margin-top:1rem;">
            Full component skill → <a href="../components/${compName}/component-skill.md" style="color:var(--primary);text-decoration:underline;text-underline-offset:4px;">components/${compName}/component-skill.md</a>
          </p>`;
    stats.specAdded++;
  }

  if (!insertHtml) {
    stats.skipped++;
    continue;
  }

  // Find insertion point: before </main> but after last existing section
  // If there's already a JS section, insert CSS before it
  // If there's a "Full component skill" link, insert before it
  // Otherwise insert before </main>

  if (hasCssSection || hasJsSection) {
    // There's already a JS section but no CSS section — insert CSS before it
    if (!hasCssSection && hasJsSection && hasCss) {
      html = html.replace(
        /(\n\s*<!-- ── JavaScript)/,
        insertHtml.split('<!-- ── JavaScript')[0] + '$1'
      );
      // If we also needed to add spec link, handle separately
    } else if (!hasSpecLink) {
      // Just add spec link before </main>
      html = html.replace(/(\s*<\/main>)/, insertHtml + '$1');
    }
  } else {
    // No existing source sections — insert everything before </main>
    // But we need to find the right spot: after the last demo section, before </main>
    html = html.replace(/(\s*<\/main>)/, '\n' + insertHtml + '$1');
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  OK ${file}`);
}

console.log(`\nDone: CSS added=${stats.cssAdded}, JS added=${stats.jsAdded}, spec links added=${stats.specAdded}, skipped=${stats.skipped}`);
