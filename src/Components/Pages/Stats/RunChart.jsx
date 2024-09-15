import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RunChart = ({ sessions }) => {
    // Prepare data for the chart
    const labels = [];
    const correctRates = [];

    // Loop through sessions and gather correct rates for each run
    sessions.forEach((session, sessionIndex) => {
        session.runs.forEach((run, runIndex) => {
            labels.push(`Session ${sessionIndex + 1}, Run ${runIndex + 1}`);
            correctRates.push(run.correctRate);
        });
    });

    // Chart.js data structure
    const data = {
        labels: labels, // X-axis labels
        datasets: [
            {
                label: 'Correct Answer Percentage',
                data: correctRates, // Y-axis data
                borderColor: '#2fa6a6', // Line color
                backgroundColor: '#2fa6a6',
                fill: false, // Don't fill the area under the line
            },
        ],
    };

    // Chart.js options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Correct Answer Percentage by Runs',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Correct Answer Percentage (%)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Sessions and Runs',
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default RunChart;
