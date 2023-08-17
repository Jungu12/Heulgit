import React from 'react';
import { UserRankingType } from '@typedef/profile/user.types';
import { styled } from 'styled-components';
// import { colors } from '@constants/colors';

const StyledRankingItem = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

type RankingProps = {
	rank: UserRankingType;
};

const RankingItem = ({ rank }: RankingProps) => {
	return (
		<StyledRankingItem>
			<div>{rank.githubId}</div>
			<div>{rank.count} 개</div>
		</StyledRankingItem>
	);
};

export default RankingItem;
