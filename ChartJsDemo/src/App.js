import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import chartTrendline from 'chartjs-plugin-trendline';
import React from 'react';

import { Line } from 'react-chartjs-2';
import BarChar from './components/chart/bar-char/BarChar';
import LineCustom from './components/chart/Line/LegendCustom';
// import { htmlLegendPlugin } from './util/common-function';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  chartTrendline,
  // htmlLegendPlugin,
);

export const options = {
  responsive: true,
  plugins: {
    // htmlLegend: {
    //   containerID: 'legend-container',
    // },
    legend: {
      // align: 'end',
      // padding: {
      //   bottom: 30,
      // },
      // labels: {
      //   usePointStyle: true,
      //   pointStyle: 'circle',
      //   padding: 30,
      //   boxHeight: 8,
      //   pointStyleWidth: 10,
      // },
      display: false,
    },
    legendCallback: function (chart) {
      // Return the HTML string here.
      console.log(chart.data.datasets);
      var text = [];
      text.push('<ul class="' + chart.id + '-legend">');
      for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
        text.push(
          '<li><span id="legend-' +
            i +
            '-item" style="background-color:' +
            chart.data.datasets[0].backgroundColor[i] +
            '"   onclick="updateDataset(event, ' +
            "'" +
            i +
            "'" +
            ')">',
        );
        if (chart.data.labels[i]) {
          text.push(chart.data.labels[i]);
        }
        text.push('</span></li>');
      }
      text.push('</ul>');
      return text.join('');
    },
    title: {
      display: true,
      align: 'start',
      text: 'Chart.js Line Chart',
      font: {
        size: 20,
      },
      padding: {
        bottom: 50,
      },
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      // external: externalTooltipHandler,
    },
  },
  // plugins: [htmlLegendPlugin],
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
        drawTicks: false,
      },
      ticks: {
        align: 'start',
        maxTicksLimit: 4,
      },
      title: {
        display: true,
        text: 'Time',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    y: {
      grid: {
        borderDash: (context) => {
          if (context.tick.value === 0) return [];
          return [4, 4];
        },
        color: '#348632',
        drawTicks: false,
      },
      ticks: {
        crossAlign: 'center',
        align: 'center',
      },
      title: {
        display: true,
        text: 'Time',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  },
};

const labels = [
  '09:07:30',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  '09:07:30',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [17, 18, 153, 106, 10, 95, 17, 18, 153, 106, 10, 95, 10, 95],
      borderColor: 'rgb(255, 99, 132)',
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      // trendlineLinear: {
      //   colorMin: 'red',
      //   lineStyle: 'dotted',
      //   width: 1,
      //   projection: true,
      // },
    },
    {
      label: 'Dataset 2',
      data: [67, 80, 53, 10, 10, 50],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: false,
      // trendlineLinear: {
      //   colorMax: 'green',
      //   lineStyle: 'dotted',
      //   width: 2,
      //   projection: true,
      // },
    },
  ],
};

const App = () => {
  return (
    <div style={{ width: '1000px', height: '200px' }}>
      {/* <Line id='ngoclias' options={options} data={data} /> */}
      <LineCustom />
      {/* <BarChar /> */}
      {/* <AntdSelect /> */}
    </div>
  );
};

export default App;
