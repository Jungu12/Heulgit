import React from 'react';
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { colors } from '@constants/colors';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
);

type CommitGraphProps = {
	labels: string[];
	datas: number[];
};

export const CommitGraph = ({ labels, datas }: CommitGraphProps) => {
	const data = {
		labels: labels,
		datasets: [
			{
				data: datas,
				backgroundColor: 'rgba(197,212,245,0.25)',
				borderColor: colors.primary.primary,
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			r: {
				beginAtZero: true, // 시작 값을 0으로 설정
				ticks: {
					stepSize: 1, // 축 간격 설정
				},
			},
		},
	};

	return (
		<div>
			<Radar data={data} options={options} />
		</div>
	);
};

export default CommitGraph;
