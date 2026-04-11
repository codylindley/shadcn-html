(function () {
  'use strict';

  var DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function firstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function isToday(year, month, day) {
    var now = new Date();
    return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
  }

  function renderCalendar(el, year, month, selectedDay) {
    var total = daysInMonth(year, month);
    var startDay = firstDayOfMonth(year, month);
    var prevTotal = daysInMonth(year, month - 1);

    /* Header */
    var heading = el.querySelector('.calendar-heading');
    if (heading) heading.textContent = MONTHS[month] + ' ' + year;

    /* Grid */
    var grid = el.querySelector('.calendar-grid');
    if (!grid) return;

    var html = '<thead><tr>';
    for (var d = 0; d < 7; d++) {
      html += '<th class="calendar-day-label" scope="col">' + DAYS[d] + '</th>';
    }
    html += '</tr></thead><tbody>';

    var dayNum = 1;
    var nextDayNum = 1;
    var rows = Math.ceil((startDay + total) / 7);

    for (var r = 0; r < rows; r++) {
      html += '<tr>';
      for (var c = 0; c < 7; c++) {
        var cellIndex = r * 7 + c;
        if (cellIndex < startDay) {
          var prevDay = prevTotal - startDay + cellIndex + 1;
          html += '<td class="calendar-day calendar-day-outside"><button tabindex="-1" data-day="' + prevDay + '" data-outside="prev">' + prevDay + '</button></td>';
        } else if (dayNum > total) {
          html += '<td class="calendar-day calendar-day-outside"><button tabindex="-1" data-day="' + nextDayNum + '" data-outside="next">' + nextDayNum + '</button></td>';
          nextDayNum++;
        } else {
          var cls = 'calendar-day';
          if (isToday(year, month, dayNum)) cls += ' calendar-day-today';
          if (dayNum === selectedDay) cls += ' calendar-day-selected';
          html += '<td class="' + cls + '"><button data-day="' + dayNum + '">' + dayNum + '</button></td>';
          dayNum++;
        }
      }
      html += '</tr>';
    }
    html += '</tbody>';
    grid.innerHTML = html;
  }

  window.onPageReady(function () {
    document.querySelectorAll('.calendar').forEach(function (cal) {
      var now = new Date();
      var state = {
        year: now.getFullYear(),
        month: now.getMonth(),
        selected: null
      };

      renderCalendar(cal, state.year, state.month, state.selected);

      /* Navigation */
      cal.addEventListener('click', function (e) {
        var nav = e.target.closest('.calendar-nav');
        if (nav) {
          var action = nav.dataset.action;
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
        var dayBtn = e.target.closest('.calendar-day button');
        if (dayBtn && !dayBtn.closest('.calendar-day-disabled')) {
          var day = parseInt(dayBtn.dataset.day, 10);
          var outside = dayBtn.dataset.outside;
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
      cal.addEventListener('keydown', function (e) {
        var dayBtn = e.target.closest('.calendar-day button');
        if (!dayBtn) return;

        var allBtns = Array.from(cal.querySelectorAll('.calendar-day button'));
        var idx = allBtns.indexOf(dayBtn);
        var next = null;

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
  });
})();
