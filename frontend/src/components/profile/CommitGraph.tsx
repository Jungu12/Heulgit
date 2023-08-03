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
};

export const CommitGraph = ({ labels }: CommitGraphProps) => {
	const data = {
		labels: labels,
		datasets: [
			{
				data: [12, 9, 13, 5, 2, 3, 10],
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
	};

	return <Radar data={data} options={options} />;
};

export default CommitGraph;
