import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import chartTrendline from 'chartjs-plugin-trendline';

import { Line } from 'react-chartjs-2';
import BarChar from './components/chart/bar-char/BarChar';
import { externalTooltipHandler } from './util/common-function';
import AntdSelect from './components/antdComps/select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, chartTrendline);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      align: 'end',
      padding: {
        bottom: 30,
      },
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 30,
        boxHeight: 8,
        pointStyleWidth: 10,
      },
    },
    title: {
      display: true,
      align: 'start',
      text: 'Chart.js Line Chart',
      font: {
        size: 10,
      },
      padding: {
        bottom: -150,
        left: 10,
      },
    },
    tooltip: {
      enabled: false,
      position: 'nearest',
      external: externalTooltipHandler,
    },
  },
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
        padding: 20,
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
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      trendlineLinear: {
        colorMin: 'red',
        lineStyle: 'dotted',
        width: 1,
        projection: true,
      },
    },
    {
      label: 'Dataset 2',
      data: [67, 80, 53, 10, 10, 50],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      trendlineLinear: {
        colorMax: 'green',
        lineStyle: 'dotted',
        width: 2,
        projection: true,
      },
    },
  ],
};

const App = () => {
  setTimeout(() => {
    const canvas = document.getElementById('ngoclias');
    console.log(canvas);
  }, 100);

  return (
    <div style={{ width: '1000px', height: '200px' }}>
      {/* <Line id='ngoclias' options={options} data={data} />
      <span>Group of user</span>
      <BarChar /> */}
      <AntdSelect />
    </div>
  );
};

export default App;
