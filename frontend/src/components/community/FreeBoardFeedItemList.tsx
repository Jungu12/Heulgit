import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import { FreeBoardPostType } from '@typedef/community/freeboard.types';
import FreeBoardFeedItem from './FreeBoardFeedItem';

const StyledFeedListSection = styled.section`
	overflow-y: scroll;
	margin-bottom: 70px;
	scrollbar-width: none; /* 파이어폭스 */
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Separation = styled.div`
	height: 1px;
	width: 100%;
	background-color: ${colors.greyScale.grey2};
	margin-top: 12px;
`;

type Props = {
	feedList: FreeBoardPostType[];
};

const FreeBoardFeedItemList = ({ feedList }: Props) => {
	return (
		<StyledFeedListSection>
			{feedList.map((feed, index) => (
				<div key={index}>
					<FreeBoardFeedItem feed={feed} />
					<Separation />
				</div>
			))}
		</StyledFeedListSection>
	);
};

export default FreeBoardFeedItemList;
