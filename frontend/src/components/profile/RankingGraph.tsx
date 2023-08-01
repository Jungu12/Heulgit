import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

//기본 Bar 차트
//https://react-chartjs-2.js.org/components/bar

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
		},
	},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: '분류 1',
			data: [1, 2, 3, 4, 5, 6, 7],
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: '분류 2',
			data: [2, 3, 4, 5, 4, 7, 8],
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};

export default function BarChart() {
	return (
		<div className="contentWrap">
			<div className="contentInner">
				<Bar options={options} data={data} />
			</div>
		</div>
	);
}
