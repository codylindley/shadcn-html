#!/usr/bin/env python3
"""sync-css.py -- Extract CSS from specification markdown files into component CSS files.

Reads all component-specifications/*.md files, extracts ```css code blocks, and writes them
to documentation/css/components/{name}.css.

Run from the project root:
    python3 scripts/sync-css.py
"""

import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SCRIPT_DIR)
DIST = os.path.join(ROOT, 'dist')
PATTERNS_DIR = os.path.join(DIST, 'component-specifications')
CSS_DIR = os.path.join(DIST, 'documentation', 'css', 'components')

# Regex to match ```css ... ``` blocks
CSS_BLOCK_RE = re.compile(r'```css\s*\n(.*?)```', re.DOTALL)


def extract_css(md_path):
    """Extract all CSS code blocks from a markdown file and concatenate them."""
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    blocks = CSS_BLOCK_RE.findall(content)
    if not blocks:
        return None

    return '\n'.join(block.strip() for block in blocks)


def get_component_name(md_filename):
    """Get component name from markdown filename: button.md -> button"""
    return os.path.splitext(md_filename)[0]


def format_css(name, css_content):
    """Wrap CSS content with a component header comment."""
    title = name.capitalize()
    return f'/* ── {title} component {"─" * (46 - len(title))}── */\n\n{css_content}\n'


def main():
    if not os.path.isdir(PATTERNS_DIR):
        print(f'Error: component-specifications directory not found: {PATTERNS_DIR}', file=sys.stderr)
        sys.exit(1)

    os.makedirs(CSS_DIR, exist_ok=True)

    updated = []
    skipped = []

    for filename in sorted(os.listdir(PATTERNS_DIR)):
        if not filename.endswith('.md'):
            continue

        name = get_component_name(filename)
        md_path = os.path.join(PATTERNS_DIR, filename)
        css_path = os.path.join(CSS_DIR, f'{name}.css')

        css_content = extract_css(md_path)
        if css_content is None:
            skipped.append(name)
            continue

        output = format_css(name, css_content)

        # Check if file needs updating
        existing = None
        if os.path.exists(css_path):
            with open(css_path, 'r', encoding='utf-8') as f:
                existing = f.read()

        if existing == output:
            skipped.append(name)
            continue

        with open(css_path, 'w', encoding='utf-8') as f:
            f.write(output)

        updated.append(name)

    # Summary
    if updated:
        print(f'Updated {len(updated)} component(s):')
        for name in updated:
            print(f'  ✓ {name}.css')
    if skipped:
        print(f'Skipped {len(skipped)} (no changes or no CSS):')
        for name in skipped:
            print(f'  · {name}')

    if not updated:
        print('Everything is in sync.')


if __name__ == '__main__':
    main()
