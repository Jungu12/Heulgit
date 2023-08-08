import { HeulGitPostType } from '@typedef/home/heulgit.types';
import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import FeedItem from './FeedItem';

const StyledFeedListSection = styled.section`
	max-width: 640px;
	overflow-y: scroll;
	margin-top: 40px;
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
	feedList: HeulGitPostType[];
	onClickComment?: (id: number) => void;
};

const FeedItemListTablet = ({ feedList, onClickComment }: Props) => {
	return (
		<StyledFeedListSection>
			{feedList.map((feed, index) => (
				<div key={index}>
					<FeedItem
						feed={feed}
						type="summary"
						onClickComment={onClickComment}
					/>
					<Separation />
				</div>
			))}
		</StyledFeedListSection>
	);
};

export default FeedItemListTablet;
