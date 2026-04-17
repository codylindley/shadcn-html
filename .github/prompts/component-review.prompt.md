---
description: "Deep-dive review and implementation audit of a component against reference sites and AGENTS.md rules"
argument-hint: "component name (e.g., typography, tooltip, sidebar)"
agent: "agent"
model: ['Claude Opus 4.6 (1M context)(Internal only)']
---

Review the **$1** component at http://localhost:3000/documentation/$1.html

## 1. Read project rules first

Before making any changes, read these instruction files:
- `.github/instructions/specifications.instructions.md` (component skill template)
- `.github/instructions/documentation.instructions.md` (doc page boilerplate)
- `.github/instructions/tokens.instructions.md` (token boundary rule — components must ONLY use tokens from the allowed list; never invent new `--*` tokens)

## 2. Read the current implementation

If `dist/components/$1/` exists, read in this order:
1. `dist/components/$1/component-skill.md`
2. `dist/components/$1/$1.css`
3. `dist/components/$1/$1.js` (if it exists)
4. `dist/documentation/$1.html`
5. `dist/theme/default-semantic-tokens.css` (for available tokens)

If the component folder doesn't exist, this is a **new component** — follow the full creation workflow from AGENTS.md.

## 3. Fetch reference sites

Fetch these to understand the full feature set:

- https://ui.shadcn.com/docs/components/$1
- https://basecoatui.com/components/$1/
- https://base-ui.com/react/components/$1
- https://www.w3.org/WAI/ARIA/apg/patterns/$1/ (if 404, try alternate slugs: e.g., `dialog-modal`, `menu-button`, `listbox`)

If you can't find this component on one of those sites, search modern UI component libraries in this order:

**Tier 1: Headless / Behavior-Only Primitives**
Radix UI, Ark UI, React Aria, Headless UI, Kobalte, Ariakit, Zag.js, TanStack (Table, Form, Virtual), Base UI

**Tier 2: Copy-Paste / Ownership Model**
Origin UI, Tremor, Magic UI, Aceternity UI, Catalyst, AlignUI, Untitled UI React, DaisyUI

**Tier 3: Full-Featured Styled Libraries**
MUI (Material UI), Mantine, Chakra UI, Ant Design, HeroUI, PrimeReact

**Tier 4: Web Components / Framework-Agnostic Runtime**
Shoelace / Web Awesome, Microsoft FAST, Adobe Spectrum Web Components, Ionic

## 4. Audit

- Audit against [AGENTS.md](../../AGENTS.md) rules and the Native Web APIs page in the documentation — identify every native web API that could replace JS workarounds or improve the component (e.g., `position-area`, `popover`, `<dialog>`, `<details>`, `:has()`, `field-sizing`, `@starting-style`, `commandfor`/`command`, `scroll-snap`, `overscroll-behavior`, `prefers-reduced-motion`, `color-mix()`, `:focus-visible`, `:user-valid`/`:user-invalid`, anchor positioning, etc.).
- Compare features against the reference sites — every variant, size, state, and composition pattern shown on shadcn/Basecoat must be accounted for. Identify what's missing.
- **Cross-check data attributes between CSS and component skill (CRITICAL).** Extract every `data-*` selector from the CSS file (e.g., `[data-variant="..."]`, `[data-size="..."]`, `[data-animate="..."]`). Then check the component skill's **Data Attributes** table. Every `data-*` attribute in the CSS must appear in the skill table with all its valid values, and vice versa — no attribute may exist in one file but not the other. If the skill has no Data Attributes table, create one. This is the #1 source of drift between the CSS and skill.

## 5. Keep utility classes out of demos

The doc site uses a tiny set of hand-written utility classes (see
`dist/documentation/css/docs-utilities.css`) for page layout only. **Component
demos must not rely on them.**

Scan the doc page (`dist/documentation/$1.html`) for any utility classes
(`mb-*`, `mt-*`, `gap-*`, `flex`, `flex-col`, `items-*`, `justify-*`,
`text-sm`, `text-muted-foreground`, `font-medium`, `leading-relaxed`, etc.)
used inside demo/example markup (the `.preview` sections and any code shown
to users).

For each utility class found in demo markup:
- If it controls **component-level styling** (colors, borders, radius, shadows, typography tied to the component), move it into the component's `.css` file as a proper rule using design tokens.
- If it controls **demo layout or spacing** (centering a preview, adding gaps between examples), replace it with an inline `style` attribute on the demo wrapper.
- Remove the utility class from the element.

Do **not** touch utility classes used in the doc-site layout scaffolding (outside of demo sections).

## 6. Implement all changes

- Update the CSS (add missing modern CSS, `prefers-reduced-motion`, any new variants/states)
- Update or create the JS (if interactive behavior is needed)
- Rewrite the component-skill.md with full variant tables, ARIA section, keyboard section, and notes
  - The **Data Attributes** table is mandatory — list every `data-*` attribute the CSS targets, with all accepted values and a description. When you add a new `data-*` selector to the CSS, you **must** add it to this table in the same edit pass.
- Update the doc page: API pills, inline source code, embedded spec markdown
  - The `<details>` summary's "Data attributes" section must list the same attributes as the skill table.
  - The embedded `<script type="text/plain" id="spec-md-content">` must include the Data Attributes table.
- If the doc page demos are insufficient, add the missing demo sections

## 7. Complete the full checklist

- Update `dist/documentation/js/layout.js` — add to `NAV` array and `BUILT` set (if new component)
- Add the new component's `<link>` and `<script>` tags to ALL HTML pages in `dist/documentation/` (if new component)
- Run `node scripts/sync-css-snippets.js` and `node scripts/sync-js-snippets.js` to sync inline source code blocks in all doc pages with the actual component files (required after ANY CSS or JS change)

## 8. Verify in the browser

Use the Chrome MCP tools to verify:
- Navigate to `http://localhost:3000/documentation/$1.html`
- Take screenshots to verify visual rendering
- Test every interactive feature (click, keyboard, hover)
- Toggle dark mode and verify it renders correctly
- Check the browser console for errors

## 9. Exit criteria

Before finishing, confirm:
- [ ] `prefers-reduced-motion` is handled in the CSS
- [ ] No JS is used where a native API (`popover`, `<dialog>`, `<details>`, `commandfor`) would work
- [ ] The doc page loads without console errors
- [ ] Dark mode renders correctly
- [ ] No new `--*` tokens were invented (token boundary rule)
- [ ] No doc-site utility classes (`mb-*`, `flex`, `gap-*`, `text-muted-foreground`, etc.) in demo/example markup (replaced with inline styles or component CSS)
- [ ] Data attribute parity — every `data-*` selector in the CSS appears in the component skill's Data Attributes table (and vice versa), in the doc page `<details>` summary, and in the embedded spec markdown
- [ ] Inline source snippets synced (`node scripts/sync-css-snippets.js` and `node scripts/sync-js-snippets.js`)

Ask questions only if you have to — make good decisions based on the reference sites and AGENTS.md. Implement everything and verify.
