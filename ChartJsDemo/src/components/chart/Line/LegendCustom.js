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
  LogarithmicScale,
} from 'chart.js';
import React from 'react';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LogarithmicScale,
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Logarithmic',
    },
  },
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
      type: 'logarithmic',
    },
  },
};

const DATA_COUNT = 7;
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const logNumbers = (num) => {
  const data = [];

  for (let i = 0; i < num; ++i) {
    data.push(Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5)));
  }

  return data;
};

export const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: logNumbers(DATA_COUNT),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      fill: false,
    },
  ],
};

const LineCustom = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div id='legend-container' className='whatever you wanna add'></div>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineCustom;
