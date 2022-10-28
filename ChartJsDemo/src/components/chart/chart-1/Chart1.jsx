import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useLayoutEffect } from 'react';

const Chart1 = () => {
    useLayoutEffect(() => {
        let root = am5.Root.new('chartdiv-1');

        root.setThemes([am5themes_Animated.new(root)]);

        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'panX',
                wheelY: 'zoomX',
                layout: root.verticalLayout,
            })
        );

        // Define data
        var colors = chart.get('colors');

        var data = [
            {
                country: 'US',
                visits: 725,
            },
            {
                country: 'UK',
                visits: 625,
            },
            {
                country: 'China',
                visits: 602,
            },
            {
                country: 'Japan',
                visits: 509,
            },
            {
                country: 'Germany',
                visits: 322,
            },
            {
                country: 'France',
                visits: 214,
            },
            {
                country: 'India',
                visits: 204,
            },
            {
                country: 'Spain',
                visits: 198,
            },
            {
                country: 'Netherlands',
                visits: 165,
            },
            {
                country: 'Russia',
                visits: 130,
            },
            {
                country: 'South Korea',
                visits: 93,
            },
            {
                country: 'Canada',
                visits: 41,
            },
        ];

        prepareParetoData();

        function prepareParetoData() {
            var total = 0;

            for (var i = 0; i < data.length; i++) {
                var value = data[i].visits;
                total += value;
            }

            var sum = 0;
            for (var i = 0; i < data.length; i++) {
                var value = data[i].visits;
                sum += value;
                data[i].pareto = (sum / total) * 100;
            }
        }

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: 'country',
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 30,
                }),
            })
        );

        xAxis.get('renderer').labels.template.setAll({
            paddingTop: 20,
        });

        xAxis.data.setAll(data);

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        );

        var paretoAxisRenderer = am5xy.AxisRendererY.new(root, { opposite: true });
        var paretoAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: paretoAxisRenderer,
                min: 0,
                max: 100,
                strictMinMax: true,
            })
        );

        paretoAxisRenderer.grid.template.set('forceHidden', true);
        paretoAxis.set('numberFormat', "#'%");

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'visits',
                categoryXField: 'country',
            })
        );

        series.columns.template.setAll({
            tooltipText: '{categoryX}: {valueY}',
            tooltipY: 0,
            strokeOpacity: 0,
            cornerRadiusTL: 6,
            cornerRadiusTR: 6,
        });

        series.columns.template.adapters.add('fill', function (fill, target) {
            return chart.get('colors').getIndex(series.dataItems.indexOf(target.dataItem));
        });

        // pareto series
        var paretoSeries = chart.series.push(
            am5xy.LineSeries.new(root, {
                xAxis: xAxis,
                yAxis: paretoAxis,
                valueYField: 'pareto',
                categoryXField: 'country',
                stroke: root.interfaceColors.get('alternativeBackground'),
                maskBullets: false,
            })
        );

        paretoSeries.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationY: 1,
                sprite: am5.Circle.new(root, {
                    radius: 5,
                    fill: series.get('fill'),
                    stroke: root.interfaceColors.get('alternativeBackground'),
                }),
            });
        });

        series.data.setAll(data);
        paretoSeries.data.setAll(data);

        // Add legend

        // Add cursor
        chart.set('cursor', am5xy.XYCursor.new(root, {}));

        root.current = root;

        return () => {
            root.dispose();
        };
    }, []);
    return <div id='chartdiv-1' style={{ width: '100%', height: '500px' }}></div>;
};

export default Chart1;
