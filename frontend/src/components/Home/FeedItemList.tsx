import { HeulgitPostResponseType } from '@typedef/home/heulgit.types';
import React from 'react';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';
import FeedItem from './FeedItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@components/common/Loading';
import { InfiniteData } from '@tanstack/react-query';

const StyledFeedListSection = styled.section`
	/* height: calc(100vh - 194px); */
	overflow-y: scroll;
	margin-top: 123px;
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
	feedList: InfiniteData<HeulgitPostResponseType>;
	onClickComment?: (id: number) => void;
	loadNextFeedList: () => void;
	hasMore: boolean;
};

const FeedItemList = ({
	feedList,
	hasMore,
	onClickComment,
	loadNextFeedList,
}: Props) => {
	return (
		<StyledFeedListSection>
			{feedList ? (
				<InfiniteScroll
					dataLength={feedList.pages.length}
					next={loadNextFeedList}
					hasMore={hasMore}
					style={{
						overflowX: 'hidden',
					}}
					loader={<Loading />}
					height={`calc(100vh - 193px)`}
				>
					{feedList.pages.map((feed) =>
						feed.content.map((item) => (
							<div key={item.heulgitId}>
								<FeedItem
									feed={item}
									type="summary"
									onClickComment={onClickComment}
								/>
								<Separation />
							</div>
						)),
					)}
				</InfiniteScroll>
			) : (
				<Loading />
			)}
		</StyledFeedListSection>
	);
};

export default FeedItemList;
