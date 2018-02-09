define(["render","event"],function (render,event) {

    var init = function (input) {
        $input = document.querySelector(input);
        $wrapper = document.querySelector(".ul-datepicker-wrapper");
        
        render.render();
        
        $input.addEventListener("click", event.showInput, false);
        
        $wrapper.addEventListener("click", event.changeMonthData, false);
        $wrapper.addEventListener("click", event.getDate, false);      

    }
    return {
        init:init,
    }
})