define(['data'], function (data) {
    var monthData = data.getMonthDataForG2();
    function createG2Instance(mountId,width,height) {
        const chart = new G2.Chart({
            container: mountId, // 指定图表容器 ID
            width: width, // 指定图表宽度
            height: height
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
            }
        });
        //TODO add text for chart
        chart
            .polygon()
            .position("weekDay*weekIndex")
            .label("date", {
                offset: 0,
                textStyle: { fontSize: 14 }
            }).style({
                lineWidth: 1,
                stroke: '#fff'
            });
        chart.render();
    }
    return {
        createG2Instance: createG2Instance
    }
});
