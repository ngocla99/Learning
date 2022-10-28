import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    indexAxis: 'y',
    // responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            align: 'start',
            text: 'Chart.js Line Chart',
            font: {
                size: 30,
            },
            padding: {
                bottom: 40,
            },
        },
    },
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    scales: {
        y: {
            grid: {
                borderDash: (context) => {
                    console.log(context);
                    if (context.type === 'scale') return [];
                    if (context.tick.label !== '') return [0, 1];
                    return [4, 4];
                },
                color: '#348632',
                drawTicks: false,
            },
            title: {
                display: false,
            },
            ticks: {
                padding: 0,
                crossAlign: 'far',
                align: 'start',
                labelOffset: 14,
            },
        },

        x: {
            grid: {
                display: true,
                color: (context) => {
                    if (context.index === 0) return '#000';
                    return '#fff';
                },
                drawTicks: false,
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

const labels = ['Series', '', 'February', '', 'March', '', 'April'];
const data = {
    labels: labels,
    datasets: [
        {
            axis: 'y',
            label: 'My First Dataset',
            data: [65, 0, 59, 0, 80, 0, 81],
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
            barPercentage: 1,
            categoryPercentage: 1,
        },
    ],
};

const BarChar = () => {
    return <Bar options={options} data={data} />;
};

export default BarChar;
