# Table

## Native basis

`<table>` element with semantic `<thead>`, `<tbody>`, `<tfoot>`, and `<caption>`.

## Native Web APIs

- [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) — tabular data container
- [`<thead>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead) — table header group
- [`<tbody>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody) — table body group
- [`<tfoot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot) — table footer group
- [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption) — table caption

## Structure

```html
<div class="table-container">
  <table class="table">
    <caption class="table-caption">A list of recent invoices.</caption>
    <thead>
      <tr class="table-row">
        <th class="table-head">Invoice</th>
        <th class="table-head">Status</th>
        <th class="table-head">Method</th>
        <th class="table-head" style="text-align:right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-row">
        <td class="table-cell">INV001</td>
        <td class="table-cell">Paid</td>
        <td class="table-cell">Credit Card</td>
        <td class="table-cell" style="text-align:right">$250.00</td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="table-row">
        <td class="table-cell" colspan="3">Total</td>
        <td class="table-cell" style="text-align:right;font-weight:600">$2,500.00</td>
      </tr>
    </tfoot>
  </table>
</div>
```

## Accessibility

- Use `<th>` with appropriate `scope` for column/row headers
- `<caption>` provides an accessible name for the table
- Screen readers announce table structure (rows, columns, headers)
