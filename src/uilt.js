define(function() {

  function padding(num) {
    if (num > 9) {
      return num;
    } else {
      return "0" + num;
    }
  }
//data{getYear,getMonth,getDate}
//传入data对象    
  function format(date) {
    ret = "";

    ret += date.getFullYear() + "-";
    ret += padding(date.getMonth() + 1) + "-";
    ret += padding(date.getDate());

    return ret;
  }

  return {
    padding: padding,
    format:format 
  };
});
