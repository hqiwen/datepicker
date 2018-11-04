define(['data'], function (data) {
    var monthData = data.getMonthDataForG2();
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
            date: {
                type:"cat"
            },
            fullDate: {
                type: "time",
                mask: 'YYYY-MM-DD'
            }
        });

        //TODO add text for chart
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
                    textAlign: "center", // 文本对齐方向，可取值为： start middle end
                    fill: "#404040", // 文本的颜色
                    fontSize: "14", // 文本大小
                    fontWeight: "bold", // 文本粗细
                    textBaseline: "middle"
                },
            })
            .tooltip("date", function(date) {
                return { name: "date", value: date };
            })
            .style({ lineWidth: 1, stroke: "gray" });
        chart.render();
    }
    return {
        createG2Instance: createG2Instance
    }
});
