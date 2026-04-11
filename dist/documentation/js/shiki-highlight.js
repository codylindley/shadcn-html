// -- shiki-highlight.js ----------------------------------------
// Doc-site syntax highlighting via Shiki CDN.
// Loaded as <script type="module"> — highlights all <pre><code> blocks.
// Uses dual themes (github-light / github-dark) with CSS-variable output
// so dark mode toggles instantly via html.dark class.

import { codeToHtml } from 'https://esm.sh/shiki@3.0.0'

var langMap = {
  'language-scss': 'css',
  'language-css': 'css',
  'language-javascript': 'javascript',
  'language-js': 'javascript',
  'language-markup': 'html',
  'language-html': 'html'
}

var opts = {
  themes: { light: 'github-light', dark: 'github-dark' },
  defaultColor: false
}

async function highlightAll() {
  var blocks = document.querySelectorAll('pre > code[class*="language-"]')
  var jobs = []

  blocks.forEach(function (code) {
    var pre = code.parentElement
    var lang = null
    var classes = code.className.split(/\s+/)
    for (var i = 0; i < classes.length; i++) {
      if (langMap[classes[i]]) {
        lang = langMap[classes[i]]
        break
      }
    }
    if (!lang) return

    // Decode HTML entities back to raw text for Shiki
    var raw = code.textContent

    jobs.push(
      codeToHtml(raw, Object.assign({ lang: lang }, opts)).then(function (html) {
        // Parse the generated HTML to extract the new <pre>
        var tmp = document.createElement('div')
        tmp.innerHTML = html
        var newPre = tmp.querySelector('pre')
        if (!newPre) return

        // Preserve the copy button if present
        var copyBtn = pre.parentElement.querySelector('.copy-btn')

        // Replace old <pre> content with Shiki output
        pre.className = newPre.className
        pre.setAttribute('style', newPre.getAttribute('style') || '')
        pre.innerHTML = newPre.innerHTML
      })
    )
  })

  await Promise.all(jobs)
}

// Highlight on initial load
highlightAll()

// Expose globally for spec modal and SPA re-init
window.__shikiHighlightAll = highlightAll

// Re-highlight after SPA navigation
if (window.onPageReady) {
  window.onPageReady(function () {
    highlightAll()
  })
}
