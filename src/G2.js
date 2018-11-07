define(['data'], function (data) {
    var getMonthDataForG2 = data.getMonthDataForG2;
    var monthData = getMonthDataForG2().days;
    var year = getMonthDataForG2().year;
    var month = getMonthDataForG2().month;
    function createG2Instance(mountId,width,height) {
        const chart = new G2.Chart({
            container: mountId, // 指定图表容器 ID
            width: width, // 指定图表宽度
            height: height,
        });
        console.log(monthData);
        chart.source(monthData, {
            weekDay: {
                type: "cat",
                values: ["日", "一", "二", "三", "四", "五", "六"]
            },
            weekIndex: {
                type: "cat",
                values: ["0", "1", "2", "3", "4", "5", "6"]
            },
            fullDate: {
                type: "time",
                mask: 'YYYY-MM-DD'
            },
        });
        chart.axis("weekIndex", { label: null });
        chart.legend(false);
        chart
            .point()
            .shape("square")
            .position("weekDay*weekIndex")
            .size(7)
            .color("date")
            .label("date", {
                textStyle: {
                    textAlign: "center",
                    fill: "#404040",
                    fontSize: "14",
                    fontWeight: "bold",
                    textBaseline: "middle"
                }
            })
            .tooltip("fullDate", function (fullDate) {
                return {
                    name: "date",
                    value: fullDate
                }
            })
            .style({ lineWidth: 1, stroke: "gray" });
        const nextMonthPoint = [4.5, -2.2]
        const prevMonthPoint = [0.5, -2.2]
        chart.guide().text({
            position: prevMonthPoint,
            content: "上个月",
            style: {
                fill: '#666', 
                fontSize: '12', 
                fontWeight: 'bold' 
            },
            alignX: "left",
            alignY: "bottom",
            offsetX: 10,
            appendInfo: {
                id: 'prevMonth',
            }
        });
        chart.guide().text({
            position: nextMonthPoint,
            content: "下个月",
            style: {
                fill: '#666', 
                fontSize: '12', 
                fontWeight: 'bold' 
            },
            alignX: "right",
            alignY: "bottom",
            offsetX: 10,
            appendInfo: {
                id: 'nextMonth'
            }
        });
        chart.render();
        // 事件监听
        chart.on('guide-text:click', ev => {
            if (ev.appendInfo.id == "prevMonth") { 
                month = month - 1;
                if (month === 0) {
                    month = 12;
                    year = year -1;
                }
                monthData = getMonthDataForG2(year, month).days;
                chart.changeData(monthData);
            } else if (ev.appendInfo.id == "nextMonth") { 
                month = month + 1;
                if (month === 13) {
                    month = 1;
                    year = year + 1;
                }
                monthData = getMonthDataForG2(year, month).days;
                chart.changeData(monthData);
            }
        });
    }
    return {
        createG2Instance: createG2Instance
    }
});
