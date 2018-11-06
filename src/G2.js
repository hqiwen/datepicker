define(['data'], function (data) {
    var getMonthDataForG2 = data.getMonthDataForG2;
    var monthData = getMonthDataForG2(2018, 0).days;
    var year = getMonthDataForG2().year;
    var month = getMonthDataForG2().month;
    console.log(month);
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
            }
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
                fill: '#666', // 文本颜色
                fontSize: '12', // 文本大小
                fontWeight: 'bold' // 文本粗细
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
                fill: '#666', // 文本颜色
                fontSize: '12', // 文本大小
                fontWeight: 'bold' // 文本粗细
            },
            alignX: "right",
            alignY: "bottom",
            offsetX: 10,
            appendInfo: {
                id: 'nextMonth'
            }
        });
        chart.render();
        chart.on('guide-text:click', ev => {
            if (ev.appendInfo.id == "prevMonth") { 
                month = month - 1;
                monthData = getMonthDataForG2(year, month).days;
                console.log(monthData);
                chart.changeData(monthData);
            } else if (ev.appendInfo.id == "nextMonth") { 
                month = month + 1;
                monthData = getMonthDataForG2(year, month).days;
                console.log(monthData);
                chart.changeData(monthData);
            }
            console.log('guide-text:click', ev.appendInfo);
        });
    }
    return {
        createG2Instance: createG2Instance
    }
});
