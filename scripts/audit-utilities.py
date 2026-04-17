#!/usr/bin/env python3
"""Audit doc pages and component files for utility-shaped classes
that are NOT defined in docs-utilities.css."""
import re, glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOC_DIR = os.path.join(ROOT, 'dist/documentation')
COMP_DIR = os.path.join(ROOT, 'dist/components')

# --- Load classes defined in docs-utilities.css ---
with open(os.path.join(DOC_DIR, 'css/docs-utilities.css')) as fh:
    util_css = fh.read()
defined = set(re.findall(r'\n\.([a-z][a-z0-9-]*)\s*\{', '\n' + util_css))
# Also match first line ".foo { ... }"
defined |= set(re.findall(r'^\.([a-z][a-z0-9-]*)\s*\{', util_css, re.M))

# --- Known non-utility class patterns to IGNORE (component class names etc.) ---
# These are component-owned classes found in dist/components/**/*.css
component_classes = set()
for css in glob.glob(os.path.join(COMP_DIR, '**/*.css'), recursive=True):
    with open(css) as fh:
        for m in re.finditer(r'\.([a-z][a-z0-9_-]*)', fh.read()):
            component_classes.add(m.group(1))

# --- Utility-shaped class pattern ---
TW = re.compile(
    r'^(?:'
    r'm[trblxy]?-[0-9]+|'
    r'p[trblxy]?-[0-9]+|'
    r'gap(?:-[xy])?-[0-9]+|'
    r'space-[xy]-[0-9]+|'
    r'text-(?:xs|sm|base|lg|xl|[0-9]xl|left|center|right|justify|balance|pretty|muted-foreground|destructive|primary|secondary|accent|foreground|card|popover|sidebar|background)|'
    r'font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black|mono|sans|serif)|'
    r'leading-(?:none|tight|snug|normal|relaxed|loose|[0-9]+)|'
    r'tracking-(?:tighter|tight|normal|wide|wider|widest)|'
    r'flex(?:-(?:row|col|wrap|nowrap|1|auto|initial|none|grow|shrink))?|'
    r'grid(?:-cols-[0-9]+|-rows-[0-9]+)?|'
    r'col-span-[0-9]+|row-span-[0-9]+|'
    r'items-(?:start|center|end|baseline|stretch)|'
    r'justify-(?:start|center|end|between|around|evenly|items)|'
    r'self-(?:start|center|end|auto|stretch)|'
    r'place-(?:items|content|self)-[a-z]+|'
    r'content-(?:start|center|end|between|around|evenly)|'
    r'order-[0-9]+|basis-[0-9a-z/]+|'
    r'(?:w|h|min-w|min-h|max-w|max-h|size)-[0-9a-z/]+|'
    r'bg-[a-z0-9-]+|'
    r'border(?:-[trbl]|-[0-9]|-[a-z]+)?|'
    r'rounded(?:-[a-z0-9]+)?|'
    r'shadow(?:-[a-z0-9]+)?|'
    r'ring(?:-[a-z0-9]+)?|'
    r'opacity-[0-9]+|z-[0-9]+|'
    r'overflow-[a-z-]+|'
    r'cursor-[a-z-]+|select-[a-z]+|pointer-events-[a-z]+|'
    r'(?:uppercase|lowercase|capitalize|truncate|italic|underline|antialiased)|'
    r'whitespace-[a-z]+|break-[a-z]+|'
    r'sr-only|not-sr-only|'
    r'(?:inset|top|left|right|bottom)-[0-9a-z]+|'
    r'(?:scale|rotate|translate|skew)(?:-[xy])?-[0-9]+|'
    r'transform|transition(?:-[a-z]+)?|'
    r'duration-[0-9]+|ease-[a-z-]+|delay-[0-9]+|'
    r'animate-[a-z-]+|origin-[a-z-]+|'
    r'hidden|block|inline|inline-block|inline-flex|inline-grid|'
    r'absolute|relative|fixed|sticky|static|'
    r'object-[a-z-]+|aspect-[a-z0-9/]+|'
    r'divide-[a-z0-9-]+|'
    r'mx-[0-9a-z]+|my-[0-9a-z]+|mt-[0-9a-z]+|mb-[0-9a-z]+|ml-[0-9a-z]+|mr-[0-9a-z]+|'
    r'px-[0-9a-z]+|py-[0-9a-z]+|pt-[0-9a-z]+|pb-[0-9a-z]+|pl-[0-9a-z]+|pr-[0-9a-z]+|'
    r'[a-z]+:[a-z]'  # responsive/variant prefix e.g. md:, hover:
    r')$'
)

def scan_files(paths, label):
    missing = {}
    for f in paths:
        try:
            with open(f) as fh:
                content = fh.read()
        except (UnicodeDecodeError, IsADirectoryError):
            continue
        for m in re.finditer(r'class="([^"]+)"', content):
            for c in m.group(1).split():
                if c in defined or c in component_classes:
                    continue
                if TW.match(c):
                    missing.setdefault(c, []).append(f)
    print(f"\n=== {label} ===")
    if not missing:
        print("  CLEAN — no undefined utility-shaped classes found")
        return 0
    for c, files in sorted(missing.items()):
        print(f"  {c}  ({len(files)} occurrences)")
        for p in sorted(set(files))[:3]:
            print(f"    - {os.path.relpath(p, ROOT)}")
    return len(missing)

# Scan doc pages (layout uses utilities — allowed)
doc_missing = scan_files(glob.glob(os.path.join(DOC_DIR, '*.html')), 'DOC PAGES (any file)')

# Scan component files (CSS/HTML demos in components/) — must be CLEAN
comp_files = []
for ext in ('*.html', '*.md'):
    comp_files.extend(glob.glob(os.path.join(COMP_DIR, '**', ext), recursive=True))
comp_missing = scan_files(comp_files, 'COMPONENT FILES (must be clean)')

sys.exit(0 if comp_missing == 0 else 1)
