import React from 'react';
import RankingItem from './RankingItem';
import { UserRankingType } from '@typedef/profile/user.types';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { images } from '@constants/images';

const StyledRankingGraph = styled.div``;

type StyledRankingListItemProps = {
	rankingNumber: number;
};

const StyledRankingListItem = styled.div<StyledRankingListItemProps>`
	width: 70vw;
	margin: 10px;
	padding: 10px;
	border-radius: 10px;
	background-color: ${(props) =>
		props.rankingNumber === 1
			? colors.primary.primary
			: props.rankingNumber === 2
			? colors.primary.primaryLighten
			: colors.greyScale.grey2};
	color: ${(props) => (props.rankingNumber === 1 ? 'white' : 'black')};
	font-weight: ${(props) => (props.rankingNumber === 1 ? '500' : '100')};
	display: flex;
	align-items: center;
`;

const RankingNumber = styled.div`
	font-size: 16px;
	width: 20px;
	margin: 0 5px;
`;

const RankingImage = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 5px;
`;

type RankingProps = {
	rankingList: UserRankingType[];
};

const RankingGraph = ({ rankingList }: RankingProps) => {
	const sortedRankingList = rankingList
		.slice()
		.sort((a, b) => b.count - a.count);
	const top5RankingList = sortedRankingList.slice(0, 5);

	return (
		<StyledRankingGraph>
			{top5RankingList.map((rank, index) => (
				<StyledRankingListItem key={index} rankingNumber={index + 1}>
					{index + 1 === 1 ? (
						<>
							<RankingImage src={images.profile.crownIcon} alt="Ranking 1" />
						</>
					) : (
						<RankingNumber>{index + 1}</RankingNumber>
					)}
					<RankingItem rank={rank} />
				</StyledRankingListItem>
			))}
		</StyledRankingGraph>
	);
};

export default RankingGraph;
