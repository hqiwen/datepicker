define(["render","uilt"],function (render,uilt) {

    var init = function (input) {

        render.render();
        
        var $input = document.querySelector(input);
        var isOpen = false;

        $input.addEventListener("click", function() {
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
            }, false);

        $wrapper.addEventListener("click", function(e) {
            var $target = e.target;
            if (!$target.classList.contains("ul-datepicker-btn")) return;
            if ($target.classList.contains("ul-datepicker-prv-btn")) {
                // $wrapper.style.display = 'block';
                render.render("prev");
            } else if ($target.classList.contains("ul-datepicker-next-btn")) {
                render.render("next");
            }
            }, false);
        $wrapper.addEventListener("click", function(e) {
            var $target = e.target;
            if ($target.tagName.toLowerCase() !== "td") return;
            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

            $input.value = uilt.format(date);
            }, false);  

    }
    return {
        init:init,
    }
})