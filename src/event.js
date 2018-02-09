define(["render","uilt"], function(render,uilt) {
  var isOpen = false;
  function showInput() {
    if (isOpen) {
      $wrapper.classList.remove("ul-datepicker-wrapper-show");
      isOpen = false;
    } else {
      $wrapper.classList.add("ul-datepicker-wrapper-show");
      var left = $input.offsetLeft;
      var top = $input.offsetTop;
      var height = $input.offsetHeight;
      $wrapper.style.top = top + height + 2 + "px";
      $wrapper.style.left = left + "px";
      isOpen = true;
    }
  }

  function changeMonthData(e) {
    var $target = e.target;
    if (!$target.classList.contains("ul-datepicker-btn")) return;
    if ($target.classList.contains("ul-datepicker-prv-btn")) {
      render.render("prev");
    } else if ($target.classList.contains("ul-datepicker-next-btn")) {
      render.render("next");
    }
  }

  function getDate(e) { 
      var $target = e.target;
      if ($target.tagName.toLowerCase() !== "td") return;
      var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

      $input.value = uilt.format(date);    
  }

  return {
    showInput: showInput,
    changeMonthData: changeMonthData,
    getDate:getDate,
  };
});
