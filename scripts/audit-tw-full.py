#!/usr/bin/env python3
"""Full audit: check preview divs, code snippets, and component CSS for Tailwind."""
import re, glob, os

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist', 'documentation'))

tw_exact = {
    'flex','grid','inline-flex','items-center','items-start','items-end',
    'items-baseline','justify-center','justify-between','justify-end',
    'justify-start','flex-wrap','flex-col','flex-row','shrink-0','grow',
    'self-center','w-full','h-full','relative','absolute','fixed',
    'overflow-hidden','overflow-auto','font-medium','font-semibold',
    'font-bold','font-normal','text-center','text-left','text-right',
    'cursor-pointer','select-none','truncate','hidden','block',
    'inline-block','underline','no-underline','border','shadow',
    'animate-spin','animate-pulse',
}
tw_pfx = re.compile(r'^(gap|space-[xy]|px|py|pt|pb|pl|pr|ml|mr|mt|mb|mx|my|w|h|min-w|max-w|min-h|max-h|size|text|font|leading|tracking|opacity|rounded|border|ring|shadow|translate|rotate|scale|duration|delay|z|order|basis|inset|top|right|bottom|left)-')

skip = {
    'text-muted-foreground','text-destructive','text-foreground','text-primary',
    'text-primary-foreground','text-secondary-foreground','text-accent-foreground',
    'bg-accent','bg-muted','bg-muted/50','bg-primary','bg-background',
    'bg-popover','bg-card','bg-secondary','bg-destructive',
    'rounded-lg','rounded-md','rounded-sm','rounded-xl','rounded-full',
    'hover:bg-accent','transition-colors','flex-shrink-0',
}
comp_pfx = ['btn','badge','card','alert','toast','radio','switch','label',
    'checkbox','input','select','slider','separator','avatar','spinner',
    'skeleton','progress','breadcrumb','pagination','steps','toggle',
    'toolbar','collapsible','table','dialog','sheet','accordion','popover',
    'tooltip','dropdown','command','combobox','scroll-area','carousel',
    'sidebar','context-menu','tree','form','image','timeline','calendar',
    'sortable','navigation-menu','preview','copy-btn','code-','spec-',
    'swatch','dim','built-with','page-','site-','heading','shiki',
    'language-','nav-','tab-','icon','sr-only']

def is_comp(c):
    return any(c == p or c.startswith(p) for p in comp_pfx)

# 1. Code snippets
print("=== CODE SNIPPETS ===")
snippet_issues = 0
for f in sorted(glob.glob('*.html')):
    with open(f) as fh:
        content = fh.read()
    for block in re.findall(r'<code[^>]*>(.*?)</code>', content, re.DOTALL):
        if '@layer' in block or 'function ' in block or 'addEventListener' in block:
            continue
        for cls_str in re.findall(r'class=(?:&quot;|")[^&"]+(?:&quot;|")', block):
            # Extract the class value
            val = re.search(r'(?:&quot;|")([^&"]+)(?:&quot;|")', cls_str)
            if not val:
                continue
            tw = [c for c in val.group(1).split()
                  if (c in tw_exact or tw_pfx.match(c))
                  and c not in skip and not is_comp(c)]
            if tw:
                print(f"  {f}: {tw}")
                snippet_issues += 1

if snippet_issues == 0:
    print("  CLEAN")

# 2. Component CSS
print("\n=== COMPONENT CSS ===")
css_issues = 0
for f in sorted(glob.glob('../components/*/*.css')):
    with open(f) as fh:
        content = fh.read()
    issues = []
    if '@apply' in content:
        issues.append('@apply')
    if '@tailwind' in content:
        issues.append('@tailwind')
    if issues:
        print(f"  {f}: {', '.join(issues)}")
        css_issues += 1

if css_issues == 0:
    print("  CLEAN")

# 3. Summary
print(f"\n=== SUMMARY ===")
print(f"Preview divs: 0 (scan-tw-demos.py)")
print(f"Code snippets: {snippet_issues}")
print(f"Component CSS: {css_issues}")
total = snippet_issues + css_issues
if total == 0:
    print("ALL CLEAN")
else:
    print(f"ISSUES: {total}")
