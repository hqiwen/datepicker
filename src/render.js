define(["data"], function(data) {
  monthData = data.getMonthData();
  function buildUI(monthData) {
    var html =
      '<div class="ul-datepicker-header">' +
      '    <a href="#" class="ul-datepicker-btn ul-datepicker-prv-btn">&lt</a>' +
      '    <a href="#" class="ul-datepicker-btn ul-datepicker-next-btn">&gt</a>' +
      '    <span class="ul-datepicker-curr-month">' +
      monthData.year +
      "-" +
      monthData.month +
      "</span>" +
      "</div>" +
      '<div class="ul-datepicker-body">' +
      "    <table>" +
      "<thead>" +
      "    <tr>" +
      "<th>一</th>" +
      "<th>二</th>" +
      "<th>三</th>" +
      "<th>四</th>" +
      "<th>五</th>" +
      "<th>六</th>" +
      "<th>日</th>" +
      "    </tr>" +
      "</thead>" +
      "<tbody>";

    for (var i = 0; i < monthData.days.length; i++) {
      var date = monthData.days[i];
      if (i % 7 === 0) {
        html += "<tr>";
      }
      html += '<td data-date="' + date.date + '">' + date.showDate + "</td>";
      if (i % 7 === 6) {
        html += "</tr>";
      }
    }

    html += "</tbody>" + "</table>" + "</div>";

    return html;
  }
  function direction(dir) {
    if (dir === "prev") {
      monthData.month--;
      if (monthData.month === 0) {
        monthData.month = 12;
        monthData.year--;
      }
    }
    if (dir === "next") {
      monthData.month++;
      if (monthData.month === 13) {
        monthData.month = 1;
        monthData.year++;
      }
    }
  }
  function render(dir) {
    if (monthData) {
      monthData = data.getMonthData(monthData.year, monthData.month);
    }
    direction(dir);
    var html = buildUI(monthData);
    if (!$wrapper) {
      $wrapper = document.createElement("div");
      $wrapper.className = "ul-datepicker-wrapper";
    }
    $wrapper.innerHTML = html;

    document.body.appendChild($wrapper);
  }

  return {
    render: render
  };
});
