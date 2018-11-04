define(["uilt"], function (uilt) {
  //refactor the duplication code
    function getMonthData(year, month) {
        var ret = [];

        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        var firstDay = new Date(year, month - 1, 1);
        var firstDayWeekDay = firstDay.getDay();
        if (firstDayWeekDay === 0) firstDayWeekDay = 7;

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        var preMonthDayCount = firstDayWeekDay - 1;
        //计数

        var lastDay = new Date(year, month, 0);
        var lastDate = lastDay.getDate();
      //data = [{ weekDay: Number, weekIndex: Number, date: Number }]
        for (var i = 0; i < 7 * 6; i++) {
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;
            if (date <= 0) {
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }
          
            if (thisMonth === 0) thisMonth = 12;
            if (thisMonth === 13) thisMonth = 1;
          
            ret.push({ month: thisMonth, date: date, showDate: showDate });
        }
        return { year: year, month: month, days: ret };
    }
  function getMonthDataForG2(year, month) {
    var ret = [];

    if (!year || !month) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth();
    } 
    var firstDay = new Date(year, month, 1);
    var firstDayWeekDay = firstDay.getDay();
    if (firstDayWeekDay === 0) firstDayWeekDay = 7;

    year = firstDay.getFullYear();
    month = firstDay.getMonth();

    var lastDayOfLastMonth = new Date(year, month, 0);
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    var lastDay = new Date(year, month + 1, 0);
    var lastDate = lastDay.getDate();

    for (var i = 0; i < 7 * 6; i++) {
      var date = i - firstDayWeekDay + 1;
      var showDate = date;
      var thisMonth = month;

      if (date <= 0) {
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
        continue;
      } else if (date > lastDate) {
        thisMonth = month + 1;
        showDate = showDate - lastDate;
        continue;
      }
      if (thisMonth === 0) thisMonth = 12;
      if (thisMonth === 13) thisMonth = 1;

      var addDate = new Date(year, thisMonth, showDate);
      var intervalDays = Math.round((addDate.getTime() - firstDay.getTime()) / 86400000);
      var weekDay = (intervalDays + firstDayWeekDay) % 7;
      var weekIndex = Math.floor((intervalDays + firstDayWeekDay) / 7);
      var fullDate = uilt.format(addDate);

      ret.push({
          weekDay: weekDay,
          weekIndex: weekIndex,
          date: showDate,
          fullDate: fullDate
      });
    }
    return ret;
  }
  return { getMonthData: getMonthData, getMonthDataForG2: getMonthDataForG2 };
});
