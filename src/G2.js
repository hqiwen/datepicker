require(['data'], function (data) {
    let data = data.getMonthWeekForG2();
    function createG2Instance(mountId,width,height){
        const chart = new G2.Chart({
            container: mountId, // 指定图表容器 ID
            width: width, // 指定图表宽度
            height: height
        });
        chart.source(data, {
            weekDay: {
                type: 'cat',
                values: ["日", "一", "二", "三", "四", "五", "六"]
            },
            date: {
                type: 'cat'
            },
            weekIndex: {
                type: 'cat',
                values: ['5', '4', '3', '2', '1', '0']
            }
        })
        chart.polygon().position('weekday*weekIndex').color('date');
        chart.render();
    }
    return {
        createG2Instance: createG2Instance
    }
});
