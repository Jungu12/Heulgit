import React from 'react';
import RankingItem from './RankingItem';
import { UserRankingType } from '@typedef/profile/user.types';

type RankingProps = {
	rankingList: UserRankingType[];
};

const RankingGraph = ({ rankingList }: RankingProps) => {
	const sortedRankingList = rankingList
		.slice()
		.sort((a, b) => b.count - a.count);
	const top5RankingList = sortedRankingList.slice(0, 5);

	return (
		<div>
			{top5RankingList.map((rank, index) => (
				<div key={index}>
					<RankingItem rank={rank} />
				</div>
			))}
		</div>
	);
};

export default RankingGraph;
