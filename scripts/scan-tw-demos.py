#!/usr/bin/env python3
"""Scan for Tailwind utility classes inside .preview divs in doc pages.
Usage: python3 scripts/scan-tw-demos.py
"""
import re, glob, os

doc_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist', 'documentation')
os.chdir(doc_dir)

tw_exact = {
    'flex', 'grid', 'inline-flex', 'items-center', 'items-start', 'items-end',
    'items-baseline', 'justify-center', 'justify-between', 'justify-end',
    'justify-start', 'flex-wrap', 'flex-col', 'flex-row', 'shrink-0', 'grow',
    'self-center', 'w-full', 'h-full', 'relative', 'absolute',
    'overflow-hidden', 'overflow-auto', 'font-medium', 'font-semibold',
    'font-bold', 'font-normal', 'text-center', 'text-left', 'text-right',
    'cursor-pointer', 'select-none', 'border', 'shadow',
    'underline', 'no-underline', 'truncate', 'hidden', 'block', 'inline-block',
}

tw_pfx = re.compile(r'^(gap|space-[xy]|px|py|pt|pb|pl|pr|ml|mr|mt|mb|mx|my|w|h|min-w|max-w|min-h|max-h|size|text|font|leading|tracking|opacity|rounded|border|ring|shadow|translate|rotate|scale|duration|delay|z|order|basis|inset|top|right|bottom|left)-')

# Classes that look like TW but are part of our design system
skip = {
    'text-muted-foreground', 'text-destructive', 'text-foreground', 'text-primary',
    'text-primary-foreground', 'text-secondary-foreground', 'text-accent-foreground',
    'bg-accent', 'bg-muted', 'bg-muted/50', 'bg-primary', 'bg-background',
    'bg-popover', 'bg-card', 'bg-secondary', 'bg-destructive',
    'rounded-lg', 'rounded-md', 'rounded-sm', 'rounded-xl', 'rounded-full',
    'hover:bg-accent', 'transition-colors', 'flex-shrink-0',
    'animate-spin', 'animate-pulse',
}

# Icon sizing is part of icon API - skip these in icon.html
icon_skip = {'w-3','h-3','w-4','h-4','w-5','h-5','w-6','h-6','w-8','h-8',
             'text-green-500','text-amber-500','text-blue-500'}

comp_prefixes = [
    'btn','badge','card','alert','toast','radio','switch','label','checkbox',
    'input','select','slider','separator','avatar','spinner','skeleton',
    'progress','breadcrumb','pagination','steps','toggle','toolbar',
    'collapsible','table','dialog','sheet','accordion','popover','tooltip',
    'dropdown','command','combobox','scroll-area','carousel','sidebar',
    'context-menu','tree','form','image','timeline','calendar','sortable',
    'navigation-menu','preview','copy-btn','code-','spec-','swatch','dim',
    'built-with','page-','site-','checkbox-item','switch-item','radio-item',
    'radio-card','radio-description','switch-description','radio-group',
    'heading','shiki','language-','nav-','tab-','icon',
]

def is_comp(cls):
    return any(cls == p or cls.startswith(p) for p in comp_prefixes)

total_issues = 0
for f in sorted(glob.glob('*.html')):
    with open(f) as fh:
        lines = fh.readlines()

    extra_skip = icon_skip if f == 'icon.html' else set()
    in_preview = False
    depth = 0
    file_issues = []

    for i, line in enumerate(lines, 1):
        if '<div class="preview' in line:
            in_preview = True
            depth = 1
            continue
        if in_preview:
            depth += line.count('<div') + line.count('<fieldset') + line.count('<details') + line.count('<form') + line.count('<nav ') + line.count('<section') + line.count('<ul') + line.count('<ol') + line.count('<table')
            depth -= line.count('</div') + line.count('</fieldset') + line.count('</details') + line.count('</form') + line.count('</nav>') + line.count('</section') + line.count('</ul') + line.count('</ol') + line.count('</table')
            if depth <= 0:
                in_preview = False
                continue
            for m in re.findall(r'class="([^"]+)"', line):
                tw_found = [c for c in m.split()
                           if (c in tw_exact or tw_pfx.match(c))
                           and c not in skip
                           and c not in extra_skip
                           and not is_comp(c)]
                if tw_found:
                    file_issues.append((i, tw_found, m))

    if file_issues:
        print(f"\n{f} ({len(file_issues)} hits)")
        for ln, tw, full in file_issues:
            print(f"  L{ln}: {', '.join(tw)}  ← class=\"{full}\"")
        total_issues += len(file_issues)

print(f"\n{'='*50}")
print(f"Total: {total_issues} Tailwind occurrences in preview divs")
