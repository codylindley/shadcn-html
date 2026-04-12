#!/usr/bin/env node
// Regenerate spec sections for the 38 auto-generated pages with comprehensive
// content extracted from CSS, JS, and MD files. Matches the quality of the
// original 24 hand-crafted pages (dialog, button, badge, etc.)

const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, '..', 'dist', 'documentation');
const compDir = path.join(__dirname, '..', 'dist', 'components');

// No exclusions — regenerate ALL component spec sections
const ORIGINALS = new Set([]);

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function inlineCode(s) { return s.replace(/`([^`]+)`/g, (_, c) => '<code>' + esc(c) + '</code>'); }

const apiSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>';

// ── Parse CSS for data attribute values ──────────────────
function extractDataAttrs(css) {
  const attrs = {};
  // data-variant="value", data-size="value", etc.
  const re = /\[data-([a-z-]+)="([^"]+)"\]/g;
  let m;
  while ((m = re.exec(css))) {
    const key = 'data-' + m[1];
    if (!attrs[key]) attrs[key] = [];
    if (!attrs[key].includes(m[2])) attrs[key].push(m[2]);
  }
  // Also check for bare [data-xxx] (boolean attrs)
  const re2 = /\[data-([a-z-]+)\](?!=)/g;
  while ((m = re2.exec(css))) {
    const key = 'data-' + m[1];
    if (!attrs[key]) attrs[key] = [];
  }
  return attrs;
}

// ── Parse CSS for class names ────────────────────────────
function extractClasses(css, compName) {
  const classes = new Set();
  const re = /\.([a-z][a-z0-9-]*)/g;
  let m;
  while ((m = re.exec(css))) {
    // Skip generic TW/utility classes
    if (!m[1].match(/^(flex|items|gap|grid|text|font|mt|mb|pt|pb|px|py|mx|my|sr|w3|org)$/)) {
      classes.add(m[1]);
    }
  }
  return Array.from(classes);
}

// ── Parse JS for data-* wiring attributes ────────────────
function extractJsDataAttrs(js) {
  const attrs = [];
  const re = /data-([a-z-]+)/g;
  const seen = new Set();
  let m;
  while ((m = re.exec(js))) {
    const attr = 'data-' + m[1];
    if (!seen.has(attr) && !['data-dragging','data-over','data-highlighted','data-outside','data-day'].includes(attr)) {
      seen.add(attr);
      attrs.push(attr);
    }
  }
  return attrs;
}

// ── Parse JS for ARIA attributes ─────────────────────────
function extractAriaFromJs(js) {
  const attrs = new Set();
  const re = /aria-([a-z-]+)/g;
  let m;
  while ((m = re.exec(js))) attrs.add('aria-' + m[1]);
  const re2 = /role=['"]([^'"]+)['"]/g;
  while ((m = re2.exec(js))) attrs.add('role="' + m[1] + '"');
  return Array.from(attrs);
}

// ── Parse markdown sections ──────────────────────────────
function parseSections(md) {
  const sections = {};
  let current = null;
  for (const line of md.split('\n')) {
    const m = line.match(/^##\s+(.+)/);
    if (m) { current = m[1].trim(); sections[current] = []; }
    else if (current) sections[current].push(line);
  }
  for (const k of Object.keys(sections)) sections[k] = sections[k].join('\n').trim();
  return sections;
}

function parseApis(text) {
  const apis = [];
  const re = /[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*[-—]\s*(.*)/g;
  let m;
  while ((m = re.exec(text))) apis.push({ label: m[1].replace(/`/g,''), url: m[2], desc: m[3].trim() });
  return apis;
}

function parseBullets(text) {
  const items = [];
  for (const line of text.split('\n')) {
    const m = line.match(/^[-*]\s+(.*)/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

function parseTable(text) {
  const rows = [];
  const lines = text.split('\n').filter(l => l.includes('|') && !l.match(/^\|?\s*[-|:]+\s*\|?$/));
  for (const line of lines) {
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length >= 2) rows.push(cells);
  }
  if (rows.length > 0 && rows[0][0].match(/value|variant|size|name|attribute|class/i)) rows.shift();
  return rows;
}

// ── Describe data-attr values from CSS ───────────────────
function describeDataValue(attr, val, css) {
  // Try to extract a meaningful description from the CSS context
  const re = new RegExp('\\[' + attr.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '="' + val.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '"\\]\\s*\\{([^}]+)\\}', 'i');
  const m = css.match(re);
  if (!m) return '';
  const props = m[1].trim();
  // Try to extract key visual properties
  if (props.includes('background')) return 'Alternate background styling';
  if (props.includes('color')) return 'Color variation';
  if (props.includes('max-width')) {
    const mw = props.match(/max-width:\s*([^;]+)/);
    return mw ? 'max-width: ' + mw[1].trim() : 'Size constraint';
  }
  if (props.includes('height')) {
    const h = props.match(/height:\s*([^;]+)/);
    return h ? 'Height: ' + h[1].trim() : 'Height variation';
  }
  return '';
}

// ── Main builder ─────────────────────────────────────────
function buildSpecHtml(compName, md, css, js) {
  const sections = parseSections(md);
  const cssDataAttrs = extractDataAttrs(css);
  const cssClasses = extractClasses(css, compName);
  const jsDataAttrs = js ? extractJsDataAttrs(js) : [];
  const jsAria = js ? extractAriaFromJs(js) : [];
  const cssAria = [];
  if (css.includes('aria-invalid')) cssAria.push('aria-invalid');

  let html = '';

  // ── Native basis ──
  const basisKey = Object.keys(sections).find(k => /native basis/i.test(k));
  if (basisKey) {
    const text = sections[basisKey].split('\n').filter(l => l.trim() && !l.startsWith('---'))[0] || '';
    html += `            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Native basis</p>\n`;
    html += `            <p class="text-muted-foreground" style="margin:0 0 1.25rem;">${inlineCode(text)}</p>\n`;
  }

  // ── Web Platform APIs ──
  const apiKey = Object.keys(sections).find(k => /native web api|web platform/i.test(k));
  if (apiKey) {
    const apis = parseApis(sections[apiKey]);
    if (apis.length > 0) {
      html += `\n            <p style="margin:0 0 0.625rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Web Platform APIs</p>\n`;
      html += `            <div style="display:flex;flex-wrap:wrap;gap:0.375rem;margin-bottom:1.25rem;">\n`;
      for (const api of apis) {
        html += `              <a href="${esc(api.url)}" target="_blank" rel="noopener" title="${esc(api.desc)}" class="api-pill"><code>${esc(api.label)}</code>${apiSvg}</a>\n`;
      }
      html += `            </div>\n`;
    }
  }

  // ── Classes ──
  if (cssClasses.length > 0) {
    html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Classes</p>\n`;
    html += `            <div style="display:flex;flex-wrap:wrap;gap:0.375rem;margin-bottom:1.25rem;">\n`;
    for (const cls of cssClasses) {
      html += `              <code>.${esc(cls)}</code>\n`;
    }
    html += `            </div>\n`;
  }

  // ── Data attributes (variants, sizes, etc.) ──
  const allDataAttrs = { ...cssDataAttrs };
  for (const attr of jsDataAttrs) {
    if (!allDataAttrs[attr]) allDataAttrs[attr] = [];
  }

  // Internal state attrs — list separately
  const stateAttrs = ['data-dragging', 'data-over', 'data-highlighted', 'data-outside', 'data-active', 'data-day'];
  
  const configAttrs = Object.keys(allDataAttrs).filter(k => !stateAttrs.includes(k));
  const stateAttrsList = Object.keys(allDataAttrs).filter(k => stateAttrs.includes(k));

  // Variants
  if (allDataAttrs['data-variant'] && allDataAttrs['data-variant'].length > 0) {
    html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Variants (data-variant)</p>\n`;
    html += `            <div style="display:grid;grid-template-columns:auto 1fr;gap:0.25rem 1rem;margin-bottom:1.25rem;">\n`;
    for (const val of allDataAttrs['data-variant']) {
      const desc = describeDataValue('data-variant', val, css) || val.charAt(0).toUpperCase() + val.slice(1) + ' styling';
      html += `              <code>${esc(val)}</code><span class="text-muted-foreground">${esc(desc)}</span>\n`;
    }
    html += `            </div>\n`;
  }

  // Sizes
  if (allDataAttrs['data-size'] && allDataAttrs['data-size'].length > 0) {
    html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Sizes (data-size)</p>\n`;
    html += `            <div style="display:grid;grid-template-columns:auto 1fr;gap:0.25rem 1rem;margin-bottom:1.25rem;">\n`;
    for (const val of allDataAttrs['data-size']) {
      const desc = describeDataValue('data-size', val, css) || val.toUpperCase();
      html += `              <code>${esc(val)}</code><span class="text-muted-foreground">${esc(desc)}</span>\n`;
    }
    html += `            </div>\n`;
  }

  // Other data attributes (trigger/close/wiring)
  const otherConfigAttrs = configAttrs.filter(k => k !== 'data-variant' && k !== 'data-size');
  if (otherConfigAttrs.length > 0) {
    html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Data attributes</p>\n`;
    for (let i = 0; i < otherConfigAttrs.length; i++) {
      const attr = otherConfigAttrs[i];
      const vals = allDataAttrs[attr];
      const valStr = vals.length > 0 ? ' — values: ' + vals.map(v => '<code>' + esc(v) + '</code>').join(', ') : '';
      const mb = i === otherConfigAttrs.length - 1 ? '1.25rem' : '0.25rem';
      html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• <code>${esc(attr)}</code>${valStr}</p>\n`;
    }
  }

  // State attributes (set by JS)
  if (stateAttrsList.length > 0) {
    html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">State attributes (managed by JS)</p>\n`;
    for (let i = 0; i < stateAttrsList.length; i++) {
      const attr = stateAttrsList[i];
      const mb = i === stateAttrsList.length - 1 ? '1.25rem' : '0.25rem';
      html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• <code>${esc(attr)}</code></p>\n`;
    }
  }

  // ── Wiring conventions (from MD or JS) ──
  const wiringKey = Object.keys(sections).find(k => /wiring|data attr|conventions/i.test(k));
  if (wiringKey) {
    const bullets = parseBullets(sections[wiringKey]);
    if (bullets.length > 0) {
      html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Wiring conventions</p>\n`;
      for (let i = 0; i < bullets.length; i++) {
        const mb = i === bullets.length - 1 ? '1.25rem' : '0.25rem';
        html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• ${inlineCode(bullets[i])}</p>\n`;
      }
    }
  } else if (jsDataAttrs.filter(a => a.match(/trigger|close/)).length > 0) {
    // Auto-generate wiring from JS data attrs
    html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Wiring conventions</p>\n`;
    const wiringAttrs = jsDataAttrs.filter(a => a.match(/trigger|close|action/));
    for (let i = 0; i < wiringAttrs.length; i++) {
      const attr = wiringAttrs[i];
      let desc = '';
      if (attr.includes('trigger')) desc = 'on any element — opens the component';
      else if (attr.includes('close')) desc = 'on any element inside — closes the component';
      else if (attr.includes('action')) desc = 'identifies an interactive action element';
      const mb = i === wiringAttrs.length - 1 ? '1.25rem' : '0.25rem';
      html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• <code>${esc(attr)}</code> ${desc}</p>\n`;
    }
  }

  // ── Variants from MD table (if not already from CSS) ──
  if (!allDataAttrs['data-variant'] || allDataAttrs['data-variant'].length === 0) {
    const vKey = Object.keys(sections).find(k => /variant/i.test(k));
    if (vKey) {
      const rows = parseTable(sections[vKey]);
      if (rows.length > 0) {
        html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Variants</p>\n`;
        html += `            <div style="display:grid;grid-template-columns:auto 1fr;gap:0.25rem 1rem;margin-bottom:1.25rem;">\n`;
        for (const row of rows) {
          html += `              <code>${esc(row[0].replace(/`/g,''))}</code><span class="text-muted-foreground">${esc(row.slice(1).join(' — ').replace(/`/g,''))}</span>\n`;
        }
        html += `            </div>\n`;
      }
    }
  }

  // ── Accessibility ──
  const ariaKey = Object.keys(sections).find(k => /access|aria/i.test(k));
  const allAria = [...new Set([...jsAria, ...cssAria])];
  
  if (ariaKey) {
    const bullets = parseBullets(sections[ariaKey]);
    if (bullets.length > 0) {
      html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Accessibility</p>\n`;
      for (let i = 0; i < bullets.length; i++) {
        const mb = i === bullets.length - 1 ? '0' : '0.25rem';
        html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• ${inlineCode(bullets[i])}</p>\n`;
      }
    }
  } else if (allAria.length > 0) {
    html += `\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Accessibility</p>\n`;
    for (let i = 0; i < allAria.length; i++) {
      const mb = i === allAria.length - 1 ? '0' : '0.25rem';
      html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• <code>${esc(allAria[i])}</code></p>\n`;
    }
  }

  // ── Keyboard (from MD) ──
  const kbKey = Object.keys(sections).find(k => /keyboard/i.test(k));
  if (kbKey) {
    const bullets = parseBullets(sections[kbKey]);
    const rows = parseTable(sections[kbKey]);
    if (rows.length > 0) {
      html += `\n\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Keyboard</p>\n`;
      html += `            <div style="display:grid;grid-template-columns:auto 1fr;gap:0.25rem 1rem;margin-bottom:1.25rem;">\n`;
      for (const row of rows) {
        html += `              <code>${esc(row[0].replace(/`/g,''))}</code><span class="text-muted-foreground">${esc(row.slice(1).join(' — ').replace(/`/g,''))}</span>\n`;
      }
      html += `            </div>\n`;
    } else if (bullets.length > 0) {
      html += `\n\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Keyboard</p>\n`;
      for (let i = 0; i < bullets.length; i++) {
        const mb = i === bullets.length - 1 ? '0' : '0.25rem';
        html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• ${inlineCode(bullets[i])}</p>\n`;
      }
    }
  }

  // ── Notes ──
  const notesKey = Object.keys(sections).find(k => /^notes$/i.test(k));
  if (notesKey) {
    const bullets = parseBullets(sections[notesKey]);
    if (bullets.length > 0) {
      html += `\n\n            <p style="margin:0 0 0.5rem;font-weight:600;font-size:0.8125rem;font-family:var(--font-mono);">Notes</p>\n`;
      for (let i = 0; i < bullets.length; i++) {
        const mb = i === bullets.length - 1 ? '0' : '0.25rem';
        html += `            <p class="text-muted-foreground" style="margin:0 0 ${mb};">• ${inlineCode(bullets[i])}</p>\n`;
      }
    }
  }

  return html;
}

// ── Run ──────────────────────────────────────────────────
let count = 0;

for (const file of fs.readdirSync(docDir).filter(f => f.endsWith('.html'))) {
  const compName = file.replace('.html', '');
  if (ORIGINALS.has(compName)) continue;
  
  const mdFile = path.join(compDir, compName, `component-skill.md`);
  const cssFile = path.join(compDir, compName, `${compName}.css`);
  const jsFile = path.join(compDir, compName, `${compName}.js`);
  
  if (!fs.existsSync(mdFile) || !fs.existsSync(cssFile)) continue;

  const filePath = path.join(docDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('Component Skill')) continue;

  const md = fs.readFileSync(mdFile, 'utf8');
  const css = fs.readFileSync(cssFile, 'utf8');
  const js = fs.existsSync(jsFile) ? fs.readFileSync(jsFile, 'utf8') : null;

  const specContent = buildSpecHtml(compName, md, css, js);
  if (!specContent.trim()) { console.log(`  SKIP ${file}`); continue; }

  const newDetails = `        <!-- Component Skill -->
        <details style="margin-bottom:2rem;border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden;">
          <summary style="padding:0.875rem 1.25rem;background:var(--muted);cursor:pointer;font-size:0.8125rem;font-weight:600;font-family:var(--font-mono);color:var(--muted-foreground);list-style:none;display:flex;align-items:center;gap:0.5rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 200ms;"><path d="m9 18 6-6-6-6"/></svg>
            Component Skill — <span data-spec-href="../components/${compName}/component-skill.md" style="text-decoration:underline;text-underline-offset:3px;">components/${compName}/component-skill.md</span>
          </summary>
          <div style="padding:1.5rem;font-size:0.875rem;line-height:1.85;">
${specContent}          </div>
        </details>`;

  const oldRe = /\s*<!--[─ ]*Component Skill[─ ]*-->[\s\S]*?<\/details>/;
  if (oldRe.test(html)) {
    html = html.replace(oldRe, '\n' + newDetails);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  OK ${file}`);
    count++;
  }
}

console.log(`\nDone: ${count} files updated`);
