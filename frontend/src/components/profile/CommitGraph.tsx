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

// export const data = {
// 	labels: [
// 		'Thing 1',
// 		'Thing 2',
// 		'Thing 3',
// 		'Thing 4',
// 		'Thing 5',
// 		'Thing 6',
// 		'Thing 7',
// 	],
// 	datasets: [
// 		{
// 			label: '# of Votes',
// 			data: [2, 9, 3, 5, 2, 3, 5],
// 			backgroundColor: 'rgba(255, 99, 132, 0.2)',
// 			borderColor: 'rgba(255, 99, 132, 1)',
// 			borderWidth: 1,
// 		},
// 	],
// };

// export function CommitGraph() {
// 	return <Radar data={data} />;
// }

type CommitGraphProps = {
	labels: string[];
};

// CommitGraph 컴포넌트에서 labels prop을 사용하여 라벨을 받음
export const CommitGraph = ({ labels }: CommitGraphProps) => {
	const data = {
		labels: labels,
		datasets: [
			{
				label: '# of Votes',
				data: [12, 9, 13, 5, 2, 3, 10],
				backgroundColor: 'rgba(197,212,245,0.25)',
				borderColor: colors.primary.primary,
				borderWidth: 1,
			},
		],
	};

	return <Radar data={data} />;
};

export default CommitGraph;
