# Statistic

## Native basis

`<div>` containers displaying a numeric value with a label and optional trend indicator.

## Native Web APIs

- [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) — generic container

## Structure

```html
<!-- Basic statistic -->
<div class="statistic">
  <p class="statistic-title">Total Revenue</p>
  <p class="statistic-value">$45,231.89</p>
  <p class="statistic-description">+20.1% from last month</p>
</div>

<!-- Statistic with trend -->
<div class="statistic">
  <p class="statistic-title">Subscriptions</p>
  <p class="statistic-value">+2,350</p>
  <p class="statistic-description">
    <span class="statistic-trend" data-trend="up">
      <svg><!-- arrow up icon --></svg>
      +12.5%
    </span>
    from last month
  </p>
</div>
```

## Trend (`data-trend`)

| Value  | Description                     |
|--------|---------------------------------|
| `up`   | Positive trend (green)          |
| `down` | Negative trend (red)            |

## Accessibility

- Use semantic text content — values are read inline
- Trends are conveyed by text, not color alone ("+12.5%")
