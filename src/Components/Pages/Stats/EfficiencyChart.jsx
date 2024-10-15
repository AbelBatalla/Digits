import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './RunChart.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EfficiencyChart = ({ sessions }) => {
    // Prepare data for the chart
    const labels = [];
    const efficiencyRates = [];

    // Loop through sessions and gather correct rates for each run
    sessions.forEach((session, sessionIndex) => {
        session.runs.forEach((run, runIndex) => {
            labels.push(`Session ${sessionIndex + 1}, Run ${runIndex + 1}`);
            console.log("run.avgResponseTime", run.avgResponseTime);
            console.log("run.correctRate", run.correctRate);
            efficiencyRates.push(run.correctRate/(((run.avgResponseTime+1) / 1000).toFixed(3)));
        });
    });

    // Chart.js data structure
    const data = {
        labels: labels, // X-axis labels
        datasets: [
            {
                label: 'Efficiency',
                data: efficiencyRates, // Y-axis data
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
                text: 'Efficiency by runs',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Efficiency (correct answers / response time)',
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

    return (
        <div className={styles.chartContainer}>
            <Line data={data} options={options} />
        </div>
    );};

export default EfficiencyChart;
