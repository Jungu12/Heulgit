import React from 'react';
import { UserRankingType } from '@typedef/profile/user.types';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';

const StyledRankingItem = styled.div`
	display: flex;
	justify-content: space-between;

	width: 70vw;
	margin: 10px;
	padding: 10px;

	background-color: ${colors.primary.primary};
	border-radius: 10px;
`;

type RankingProps = {
	rank: UserRankingType;
};

const RankingItem = ({ rank }: RankingProps) => {
	return (
		<StyledRankingItem>
			<div>{rank.github_id}</div>
			<div>{rank.count}</div>
		</StyledRankingItem>
	);
};

export default RankingItem;
