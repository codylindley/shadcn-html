// -- Calendar -------------------------------------------------
// Interactive calendar grid with month navigation and day selection.

const DAYS = Array.from({ length: 7 }, (_, i) =>
  new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(2024, 0, i))
);
const MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Intl.DateTimeFormat(undefined, { month: 'long' }).format(new Date(2024, i, 1))
);

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const isToday = (year, month, day) => {
  const now = new Date();
  return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
};

const renderCalendar = (el, year, month, selectedDay) => {
  const total = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);
  const prevTotal = daysInMonth(year, month - 1);

  /* Header */
  const heading = el.querySelector('.calendar-heading');
  if (heading) heading.textContent = `${MONTHS[month]} ${year}`;

  /* Grid */
  const grid = el.querySelector('.calendar-grid');
  if (!grid) return;

  let html = '<thead><tr>';
  for (let d = 0; d < 7; d++) {
    html += `<th class="calendar-day-label" scope="col">${DAYS[d]}</th>`;
  }
  html += '</tr></thead><tbody>';

  let dayNum = 1;
  let nextDayNum = 1;
  const rows = Math.ceil((startDay + total) / 7);

  for (let r = 0; r < rows; r++) {
    html += '<tr>';
    for (let c = 0; c < 7; c++) {
      const cellIndex = r * 7 + c;
      if (cellIndex < startDay) {
        const prevDay = prevTotal - startDay + cellIndex + 1;
        html += `<td class="calendar-day" data-outside><button tabindex="-1" data-day="${prevDay}" data-outside="prev">${prevDay}</button></td>`;
      } else if (dayNum > total) {
        html += `<td class="calendar-day" data-outside><button tabindex="-1" data-day="${nextDayNum}" data-outside="next">${nextDayNum}</button></td>`;
        nextDayNum++;
      } else {
        let cls = 'calendar-day';
        let attrs = '';
        if (isToday(year, month, dayNum)) attrs += ' data-today';
        if (dayNum === selectedDay) attrs += ' data-selected';
        html += `<td class="${cls}"${attrs}><button data-day="${dayNum}">${dayNum}</button></td>`;
        dayNum++;
      }
    }
    html += '</tr>';
  }
  html += '</tbody>';
  grid.innerHTML = html;
};

document.querySelectorAll('.calendar:not([data-init])').forEach((cal) => {
    cal.dataset.init = '';
    const now = new Date();
    const state = {
      year: now.getFullYear(),
      month: now.getMonth(),
      selected: null
    };

    renderCalendar(cal, state.year, state.month, state.selected);

    /* Navigation */
    cal.addEventListener('click', (e) => {
      const nav = e.target.closest('.calendar-nav');
      if (nav) {
        const action = nav.dataset.action;
        if (action === 'prev-month') {
          state.month--;
          if (state.month < 0) { state.month = 11; state.year--; }
          state.selected = null;
        } else if (action === 'next-month') {
          state.month++;
          if (state.month > 11) { state.month = 0; state.year++; }
          state.selected = null;
        }
        renderCalendar(cal, state.year, state.month, state.selected);
        return;
      }

      /* Day selection */
      const dayBtn = e.target.closest('.calendar-day button');
      if (dayBtn && !dayBtn.closest('[data-disabled]')) {
        const day = parseInt(dayBtn.dataset.day, 10);
        const outside = dayBtn.dataset.outside;
        if (outside === 'prev') {
          state.month--;
          if (state.month < 0) { state.month = 11; state.year--; }
          state.selected = day;
        } else if (outside === 'next') {
          state.month++;
          if (state.month > 11) { state.month = 0; state.year++; }
          state.selected = day;
        } else {
          state.selected = day;
        }
        renderCalendar(cal, state.year, state.month, state.selected);

        /* Dispatch custom event */
        cal.dispatchEvent(new CustomEvent('calendar:select', {
          detail: { date: new Date(state.year, state.month, state.selected) },
          bubbles: true
        }));
      }
    });

    /* Keyboard navigation in grid */
    cal.addEventListener('keydown', (e) => {
      const dayBtn = e.target.closest('.calendar-day button');
      if (!dayBtn) return;

      const allBtns = Array.from(cal.querySelectorAll('.calendar-day button'));
      const idx = allBtns.indexOf(dayBtn);
      let next = null;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          next = allBtns[idx + 1];
          break;
        case 'ArrowLeft':
          e.preventDefault();
          next = allBtns[idx - 1];
          break;
        case 'ArrowDown':
          e.preventDefault();
          next = allBtns[idx + 7];
          break;
        case 'ArrowUp':
          e.preventDefault();
          next = allBtns[idx - 7];
          break;
      }
      if (next) next.focus();
    });
});
