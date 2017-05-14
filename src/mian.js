(function () {
    var datepicker = window.datepicker;
    var monthData;
    var $input;

    datepicker.buildUI = function (year, month) {

        monthData = datepicker.getMonthData(year, month);
        var html = '<div class="ul-datepicker-header">' +
            '    <a href="#" class="ul-datepicker-btn ul-datepicker-prv-btn">&lt</a>' +
            '    <a href="#" class="ul-datepicker-btn ul-datepicker-next-btn">&gt</a>' +
            '    <span class="ul-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
            '</div>' +

            '<div class="ul-datepicker-body">' +
            '    <table>' +
            '<thead>' +
            '    <tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>日</th>' +
            '    </tr>' +
            '</thead>' +

            '<tbody>';

        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];
            if (i % 7 === 0) {
                html += '<tr>'
            }
            html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';
            if (i % 7 === 6) {
                html += '</tr>'
            }
        }

        html += '</tbody>' +
            '    </table>' +
            '</div>'

        return html;
    };


    datepicker.render = function (direction) {

        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }

        if (direction === 'prev') {
            month--;
            if (month === 0) {
                month = 12;
                year--;
            };
        };
        if (direction === 'next') month++;

        var html = datepicker.buildUI(year, month);
        $wrapper = document.querySelector('.ul-datepicker-wrapper')
        // $dom.innerHTML = html;
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            $wrapper.className = 'ul-datepicker-wrapper';
        }
        $wrapper.innerHTML = html;

        document.body.appendChild($wrapper);

        datepicker.show();
    }

    datepicker.init = function (input) {
        datepicker.render();
        // datepicker.show();

        var $input = document.querySelector(input);
        var isOpen = false;

        $input.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove('ul-datepicker-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ul-datepicker-wrapper-show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';
                isOpen = true;
            }
        }, false);

        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if (!$target.classList.contains('ul-datepicker-btn'))
                return;
            if ($target.classList.contains('ul-datepicker-prv-btn')) {
                // $wrapper.style.display = 'block';
                datepicker.render('prev');
            } else if ($target.classList.contains('ul-datepicker-next-btn')) {
                datepicker.render('next');
            }
        }, false)
        //先调渲染函数，渲染之后月份加了一，再调监听函数导致相差一个月
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if ($target.tagName.toLowerCase() !== 'td') return;
            // if(datepicker.render()){
            //     var date = new Date(monthData.year, monthData.month, $target.dataset.date);
            // }
            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

            $input.value = format(date);
        }, false)

        function format(date) {
            ret = '';

            function padding(num) {
                if (num > 9) {
                    return num
                } else {
                    return "0" + num;
                }
            }
            ret += date.getFullYear() + '-';
            ret += padding(date.getMonth() + 1) + '-';
            ret += padding(date.getDate());

            return ret;
        }
    }

    datepicker.show = function() {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();
        var $td = document.getElementsByTagName('td');

        for (var i=0;i<$td.length;i++){
            //显示今日
            if(monthData.year === year && monthData.days[i].month === month && monthData.days[i].date === date) {
                $td[i].classList.add('ul-datepicker-today-show')
            }
            // 显示当月
            if(monthData.days[i].month !== monthData.month) {
                $td[i].classList.add('ul-datepicker-month-show');

                $td[i].addEventListener('click',function(){
                    datepicker.render('next');//渲染数据没有错，但是与期望值相差一个月
                },false)
            }
        }

    };

})();