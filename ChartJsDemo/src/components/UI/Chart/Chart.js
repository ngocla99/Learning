import React, { useRef, useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default function Chart({ id, data }) {
    const xAxisRef = useRef(null);
    const seriesRef = useRef(null);

    useLayoutEffect(() => {
        const root = am5.Root.new(id);

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = am5xy.XYChart.new(root, {
            panY: false,
            layout: root.verticalLayout,
            maxTooltipDistance: 0,
        });
        root.container.children.push(chart);

        const yAxis = am5xy.ValueAxis.new(root, {
            extraTooltipPrecision: 1,
            renderer: am5xy.AxisRendererY.new(root, {}),
        });
        chart.yAxes.push(yAxis);

        const xAxis = am5xy.DateAxis.new(root, {
            baseInterval: { timeUnit: 'day', count: 1 },
            renderer: am5xy.AxisRendererX.new(root, {}),
        });
        xAxisRef.current = xAxis;
        chart.xAxes.push(xAxis);

        xAxis.get('dateFormats')['day'] = 'MM/dd';
        xAxis.get('periodChangeDateFormats')['day'] = 'MMMM';

        function createSeries(name, field) {
            var series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: field,
                    valueXField: 'date',
                    tooltip: am5.Tooltip.new(root, {}),
                })
            );

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        radius: 5,
                        fill: series.get('fill'),
                    }),
                });
            });

            series.strokes.template.set('strokeWidth', 2);

            series.get('tooltip').label.set('text', '[bold]{name}[/]\n{valueX.formatDate()}: {valueY}');
            series.data.setAll(data);
        }

        createSeries('Series', 'value');

        chart.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                // behavior: 'zoomXY',
                xAxis: xAxis,
            })
        );

        xAxis.set(
            'tooltip',
            am5.Tooltip.new(root, {
                themeTags: ['axis'],
            })
        );

        yAxis.set(
            'tooltip',
            am5.Tooltip.new(root, {
                themeTags: ['axis'],
            })
        );

        return () => {
            root.dispose();
        };
    }, []);

    return <div id={id} style={{ width: '100%', height: '300px' }} />;
}
