#!/usr/bin/env node
// Generate hand-crafted HTML spec sections for the 38 pages that currently have
// the auto-rendered spec-inline-body. Parses each component's .md spec and
// generates HTML matching the style of the existing 24 hand-crafted pages.

const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..', 'dist', 'documentation');
const compDir = path.join(__dirname, '..', 'dist', 'components');

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Wrap backtick-quoted items in <code>
function inlineCode(s) {
  return s.replace(/`([^`]+)`/g, function (_, code) {
    return '<code>' + escHtml(code) + '</code>';
  });
}

// Parse markdown into sections by ## headings
function parseSections(md) {
  const sections = {};
  let current = null;
  for (const line of md.split('\n')) {
    const m = line.match(/^##\s+(.+)/);
    if (m) {
      current = m[1].replace(/---/g, '').trim();
      sections[current] = [];
    } else if (current) {
      sections[current].push(line);
    }
  }
  // Join each section's lines
  for (const k of Object.keys(sections)) {
    sections[k] = sections[k].join('\n').trim();
  }
  return sections;
}

// Parse "Native Web APIs" section — list of [text](url) — description
function parseApis(text) {
  const apis = [];
  const re = /[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*[-—]\s*(.*)/g;
  let m;
  while ((m = re.exec(text))) {
    apis.push({ label: m[1], url: m[2], desc: m[3].trim() });
  }
  return apis;
}

// Parse variant/size tables (markdown tables)
function parseTable(text) {
  const rows = [];
  const lines = text.split('\n').filter(l => l.includes('|') && !l.match(/^\|?\s*[-|]+\s*\|?$/));
  for (const line of lines) {
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length >= 2) {
      rows.push(cells);
    }
  }
  // Skip header row if it looks like "Value | Description"
  if (rows.length > 0 && rows[0][0].match(/value|variant|size|name/i)) {
    rows.shift();
  }
  return rows;
}

// Parse bullet list items
function parseBullets(text) {
  const items = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^[-*]\s+(.*)/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

const apiPillSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

function buildSpecHtml(compName, sections) {
  let html = '';

  // Native basis
  const basisKey = Object.keys(sections).find(k => k.match(/native basis/i));
  if (basisKey) {
    const basisText = sections[basisKey].split('\n')[0].replace(/^---\s*/, '').trim();
    html += `            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Native basis</p>\n`;
    html += `            <p class="text-muted-foreground" style="margin:0 0 1.25rem;">${inlineCode(basisText)}</p>\n`;
  }

  // Web Platform APIs
  const apiKey = Object.keys(sections).find(k => k.match(/native web api|web platform/i));
  if (apiKey) {
    const apis = parseApis(sections[apiKey]);
    if (apis.length > 0) {
      html += `\n            <p style="margin:0 0 0.625rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Web Platform APIs</p>\n`;
      html += `            <div style="display:flex;flex-wrap:wrap;gap:0.375rem;margin-bottom:1.25rem;">\n`;
      for (const api of apis) {
        const label = api.label.replace(/`/g, '');
        html += `              <a href="${escHtml(api.url)}" target="_blank" rel="noopener" title="${escHtml(api.desc)}" class="api-pill"><code>${escHtml(label)}</code>${apiPillSvg}</a>\n`;
      }
      html += `            </div>\n`;
    }
  }

  // Variants
  const variantKey = Object.keys(sections).find(k => k.match(/variant/i));
  if (variantKey) {
    const rows = parseTable(sections[variantKey]);
    if (rows.length > 0) {
      const heading = variantKey.match(/data-variant/i) ? 'Variants (data-variant)' : 'Variants';
      html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">${heading}</p>\n`;
      html += `            <div style="display:grid;grid-template-columns:auto 1fr;gap:0.25rem 1rem;margin-bottom:1.25rem;">\n`;
      for (const row of rows) {
        const val = row[0].replace(/`/g, '');
        const desc = row.slice(1).join(' — ').replace(/`/g, '');
        html += `              <code>${escHtml(val)}</code><span class="text-muted-foreground">${escHtml(desc)}</span>\n`;
      }
      html += `            </div>\n`;
    }
  }

  // Sizes
  const sizeKey = Object.keys(sections).find(k => k.match(/^sizes?\b/i));
  if (sizeKey) {
    const rows = parseTable(sections[sizeKey]);
    if (rows.length > 0) {
      html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Sizes (data-size)</p>\n`;
      html += `            <div style="display:grid;grid-template-columns:auto 1fr;gap:0.25rem 1rem;margin-bottom:1.25rem;">\n`;
      for (const row of rows) {
        const val = row[0].replace(/`/g, '');
        const desc = row.slice(1).join(' — ').replace(/`/g, '');
        html += `              <code>${escHtml(val)}</code><span class="text-muted-foreground">${escHtml(desc)}</span>\n`;
      }
      html += `            </div>\n`;
    }
  }

  // Wiring / Data attributes
  const wiringKey = Object.keys(sections).find(k => k.match(/wiring|data attr|conventions/i));
  if (wiringKey) {
    const bullets = parseBullets(sections[wiringKey]);
    if (bullets.length > 0) {
      html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Wiring conventions</p>\n`;
      for (let i = 0; i < bullets.length; i++) {
        const mb = i === bullets.length - 1 ? '1.25rem' : '0.25rem';
        html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• ${inlineCode(bullets[i])}</p>\n`;
      }
    }
  }

  // Accessibility / ARIA
  const ariaKey = Object.keys(sections).find(k => k.match(/access|aria|keyboard/i));
  if (ariaKey) {
    const bullets = parseBullets(sections[ariaKey]);
    if (bullets.length > 0) {
      const heading = ariaKey.match(/keyboard/i) ? 'Keyboard' : 'Accessibility';
      html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">${heading}</p>\n`;
      for (let i = 0; i < bullets.length; i++) {
        const mb = i === bullets.length - 1 ? '0' : '0.25rem';
        html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• ${inlineCode(bullets[i])}</p>\n`;
      }
      html += '\n';
    }
  }

  // Notes (brief)
  const notesKey = Object.keys(sections).find(k => k.match(/^notes$/i));
  if (notesKey) {
    const bullets = parseBullets(sections[notesKey]);
    if (bullets.length > 0) {
      html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Notes</p>\n`;
      for (let i = 0; i < bullets.length; i++) {
        const mb = i === bullets.length - 1 ? '0' : '0.25rem';
        html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• ${inlineCode(bullets[i])}</p>\n`;
      }
    }
  }

  return html;
}

// ── Main ──
let count = 0;

const htmlFiles = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
  const compName = file.replace('.html', '');
  const mdFile = path.join(compDir, compName, `component-skill.md`);
  if (!fs.existsSync(mdFile)) continue;

  const filePath = path.join(docDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Only process pages that have been auto-generated (not the original 24 hand-crafted)
  // Detect by checking if api-pill labels have backtick remnants or other auto-gen markers
  // For re-runs: match the details block we generated (doesn't have spec-inline-body anymore)
  if (html.includes('spec-inline-body')) {
    // Still has the auto-rendered version
    var oldRe = /\s*<!-- Component Skill -->[\s\S]*?<div class="spec-inline-body"[^>]*><\/div>\s*<\/details>/;
  } else {
    // Already replaced once — skip the 24 originals by checking for hand-crafted content
    // Original 24 don't have backtick issues in api-pill code
    // We'll match any details block that has our generated content
    // Skip if this is one of the original 24 (they have specific hand-crafted patterns)
    if (!needsRegeneration(html, compName)) continue;
    var oldRe = /\s*<!-- Component Skill -->[\s\S]*?<\/details>/;
  }

  const md = fs.readFileSync(mdFile, 'utf8');
  const sections = parseSections(md);
  const specContent = buildSpecHtml(compName, sections);

  if (!specContent.trim()) {
    console.log(`  SKIP ${file} — no parseable sections`);
    continue;
  }

  // Build the full details block
  const newDetails = `        <!-- Component Skill -->
        <details style="margin-bottom:2rem;border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden;">
          <summary style="padding:0.875rem 1.25rem;background:var(--muted);cursor:pointer;font-size:0.8125rem;font-weight:600;font-family:var(--font-mono);color:var(--muted-foreground);list-style:none;display:flex;align-items:center;gap:0.5rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 200ms;"><path d="m9 18 6-6-6-6"/></svg>
            Component Skill — <span data-spec-href="../components/${compName}/component-skill.md" style="text-decoration:underline;text-underline-offset:3px;">components/${compName}/component-skill.md</span>
          </summary>
          <div style="padding:1.5rem;font-size:0.875rem;line-height:1.85;">
${specContent}          </div>
        </details>`;

  // Replace the old auto-rendered details block
  const oldRe = /\s*<!-- Component Skill -->[\s\S]*?<div class="spec-inline-body"[^>]*><\/div>\s*<\/details>/;
  if (oldRe.test(html)) {
    html = html.replace(oldRe, '\n' + newDetails);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  OK ${file}`);
    count++;
  } else {
    console.log(`  WARN ${file} — could not match old details block`);
  }
}

console.log(`\nDone: ${count} files updated`);
