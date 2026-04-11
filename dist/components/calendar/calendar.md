# Calendar

## Native basis

`<table>` element rendered as a month grid with navigation controls. Uses `role="grid"` for accessible day cell navigation.

## Native Web APIs

- [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) — tabular grid for the month
- [`role="grid"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/grid_role) — ARIA grid pattern for 2D keyboard navigation
- [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) — navigation and day selection buttons

## Structure

```html
<div class="calendar">
  <div class="calendar-header">
    <button class="calendar-nav" data-action="prev-month" aria-label="Previous month">
      <svg><!-- chevron left --></svg>
    </button>
    <span class="calendar-heading" aria-live="polite">April 2026</span>
    <button class="calendar-nav" data-action="next-month" aria-label="Next month">
      <svg><!-- chevron right --></svg>
    </button>
  </div>
  <table class="calendar-grid" role="grid">
    <thead>
      <tr>
        <th class="calendar-day-label" abbr="Sunday" scope="col">Su</th>
        <th class="calendar-day-label" abbr="Monday" scope="col">Mo</th>
        <!-- ... -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="calendar-day calendar-day-outside">29</td>
        <td class="calendar-day">1</td>
        <!-- ... -->
      </tr>
    </tbody>
  </table>
</div>
```

## Day cell states

| Class                   | Description                        |
|-------------------------|------------------------------------|
| `calendar-day`          | Base day cell                      |
| `calendar-day-today`    | Today's date                       |
| `calendar-day-selected` | Selected date                      |
| `calendar-day-outside`  | Day from adjacent month            |
| `calendar-day-disabled` | Non-selectable date                |

## Accessibility

- Month heading uses `aria-live="polite"` for navigation announcements
- Day cells are focusable buttons within the grid
- Arrow keys navigate the grid, Enter/Space selects a day
- Previous/next navigation buttons have `aria-label`
