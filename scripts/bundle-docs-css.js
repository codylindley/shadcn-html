// Replace individual component CSS links with a single bundled file
// for the doc site (reduces 62 HTTP requests to 1)

const fs = require('fs');
const path = require('path');
const docDir = path.join(__dirname, '..', 'dist/documentation');

const files = fs.readdirSync(docDir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const filePath = path.join(docDir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove all individual component CSS links
  content = content.replace(/\s*<link rel="stylesheet" href="\.\.\/components\/[^"]+\.css">/g, '');

  // Add single bundled CSS link after layout.css
  if (!content.includes('css/components.css')) {
    content = content.replace(
      '<link rel="stylesheet" href="css/layout.css">',
      '<link rel="stylesheet" href="css/layout.css">\n  <link rel="stylesheet" href="css/components.css">'
    );
  }

  fs.writeFileSync(filePath, content);
});

console.log(`Updated ${files.length} files: replaced individual component CSS with bundled components.css`);
